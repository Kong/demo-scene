#!/bin/bash
function setup_zone() {
ZONE=$1
gcloud container clusters get-credentials grl-demo-"${ZONE}" --region us-central1-c --project team-mesh
kubectl config use-context gke_team-mesh_us-central1-c_grl-demo-"${ZONE}"
kubectl create namespace kong-mesh-system
kubectl apply -f .secrets/"${ZONE}".yaml

helm upgrade --install --create-namespace -n kong-mesh-system kong-mesh kong-mesh/kong-mesh -f values-"${ZONE}".yaml
kubectl wait -n kong-mesh-system --timeout=60s --for condition=Ready --all pods

kubectl apply -f k8s-manifest.yaml
kubectl wait -n kuma-test --timeout=60s --for condition=Ready --all pods
}

function usage() {
  echo "Basic setup"
  exit 1
}

while [[ $# -gt 0 ]]; do
  flag=$1
  case $flag in
    --help)
      usage
      ;;
    --setup-zones)
      setup_zone zone1
      setup_zone zone2
      exit 0
      ;;
    --setup-clusters)
      gcloud container clusters create grl-demo-zone1 --num-nodes=2 --zone us-central1-c --machine-type n1-standard-4
      gcloud container clusters create grl-demo-zone2 --num-nodes=2 --zone us-central1-c --machine-type n1-standard-4
      exit 0
      ;;
    *)
      usage
      ;;
  esac
  shift
done

usage
