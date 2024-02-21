#!/bin/bash

KONNECT_CP_ID=75d840e0-4984-40da-8bb9-579d60525287
MACHINE_TYPE=${MACHINE_TYPE:-n1-standard-4}
NUM_NODES=${NUM_NODES:-2}
PROJECT=team-mesh
ALIASES=""
VERSION=0.0.0-preview.v90e406a58
KUMACTL="./kong-mesh-${VERSION}/bin/kumactl"

if [ ! -f "${KUMACTL}" ]; then
  curl -s https://docs.konghq.com/mesh/installer.sh | VERSION=${VERSION} sh -
else
  echo "Binary already installed"
fi
for i in us-east us-west europe-west; do
  CLUSTER_NAME=user-call-${i}
  REGION=${i}1-c
  CONTEXT="gke_${PROJECT}_${REGION}_${CLUSTER_NAME}"
  # shellcheck disable=SC2089
  ALIASES=${ALIASES}";alias k8s-${i}='kubectl config use-context ${CONTEXT}'"

  gcloud container clusters create "${CLUSTER_NAME}" --num-nodes="${NUM_NODES}" --zone "${REGION}" --preemptible --machine-type "${MACHINE_TYPE}"
  gcloud container clusters get-credentials "${CLUSTER_NAME}" --region "${REGION}"

  kubectl config use-context "${CONTEXT}"
  until kubectl wait -n kube-system --timeout=30s --for condition=Ready --all pods; do sleep 5; done

  kubectl create namespace observability
  kubectl create secret generic -n observability otel-providers \
    --from-literal=grafana-key="$(head -1 .secrets/grafana-key)" \
    --from-literal=grafana-user="$(head -1 .secrets/grafana-user)"

  kubectl apply -f k8s/otel-collectors.yaml

  kubectl create namespace kong-mesh-system
  kubectl apply -f .secrets/${i}-konnect.yaml

  "${KUMACTL}" install control-plane --set kuma.controlPlane.zone="${i}" --set kuma.controlPlane.konnect.cpId="${KONNECT_CP_ID}" --values zone-cp-values.yaml | kubectl apply -f -
  kubectl wait -n kong-mesh-system --timeout=30s --for condition=Ready --all pods

  kubectl apply -f k8s/workload-${i}.yaml
done

echo "----------- All setup! To get easy aliases to each clusters run:---"
echo "${ALIASES}"
