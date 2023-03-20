#!/usr/bin/env bash
. $(dirname "$0")./../common/colors.sh

export GATEWAY_HELM_RELEASE=gateway
export CONTROLLER_HELM_RELEASE=controller
export KONG_NAMESPACE=kic

echo -e "$BLUE\n=== ☸️ $BOLD Installing gateway ONLY Pods $NOCOLOR $BLUE===\n$NOCOLOR"
set -x
helm upgrade --install ${GATEWAY_HELM_RELEASE} -n ${KONG_NAMESPACE} --create-namespace \
  --set ingressController.enabled=false \
  --set admin.enabled=true \
  --set admin.type=ClusterIP \
  --set admin.clusterIP=None \
  --set replicaCount=2 \
  -f kong-values.yaml ~/projects/kong/charts/charts/kong
kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${GATEWAY_HELM_RELEASE}-kong
set +x

sleep 5

#region get LoadBalancer service IP
echo -e "$BLUE\n=== ☸️ $BOLD Testing if Kong ready... $NOCOLOR $BLUE===\n$NOCOLOR"
export PROXY_IP=""
while [ -z $PROXY_IP ]; do
  echo "Waiting for External IP provisioning..."
  PROXY_IP=$(kubectl get svc -n ${KONG_NAMESPACE} ${GATEWAY_HELM_RELEASE}-kong-proxy --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
  [ -z "$PROXY_IP" ] && sleep 10
done
echo "External IP ready..."

set -x

PROXY_IP=$(kubectl get -o jsonpath="{.status.loadBalancer.ingress[0].ip}" service -n ${KONG_NAMESPACE} ${GATEWAY_HELM_RELEASE}-kong-proxy)
http $PROXY_IP
set +x

sleep 5
#endregion

echo -e "$BLUE\n=== ☸️ $BOLD Installing Ingress ingressController  $NOCOLOR $BLUE===\n$NOCOLOR"
set -x
# TODO when chart will be released replace with kong/kong

helm upgrade --install ${CONTROLLER_HELM_RELEASE} -n ${KONG_NAMESPACE} --create-namespace \
  --set ingressController.enabled=true \
  --set ingressController.gatewayDiscovery.enabled=true \
  --set ingressController.gatewayDiscovery.adminApiService.name=${GATEWAY_HELM_RELEASE}-kong-admin \
  --set deployment.kong.enabled=false \
  --set proxy.nameOverride=${GATEWAY_HELM_RELEASE}-kong-proxy \
  --set replicaCount=2 \
  -f kong-values.yaml ~/projects/kong/charts/charts/kong

kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${CONTROLLER_HELM_RELEASE}-kong

kubectl get deployment -n ${KONG_NAMESPACE}
set +x


# scalling deploy