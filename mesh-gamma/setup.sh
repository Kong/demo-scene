#!/bin/bash

#helm repo add kuma https://kumahq.github.io/charts
#helm repo update

# Install Gateway API crds (we need to use experimental to have GAMMA support).
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v0.8.0/experimental-install.yaml

helm upgrade --install --create-namespace -n kuma-system kuma kuma/kuma --set experimental.gatewayAPI=true

echo "Waiting for cp pods to be ready"
kubectl wait -n kuma-system --timeout=60s --for condition=Ready --all pods
echo "Kuma CP is ready!"


# Install Kuma demo app
kubectl apply -f https://raw.githubusercontent.com/kumahq/kuma-demo/master/kubernetes/kuma-demo-aio.yaml
# Use regular Kubernetes host names instead of Kuma DNS
echo "Waiting for demo pods to be ready"
sleep 10
kubectl wait -n kuma-demo --timeout=60s --for condition=Ready --all pods
echo "Kuma demo is ready!"

kubectl patch -n kuma-demo deployment kuma-demo-app -p '{"spec":{"template":{"spec":{"containers":[{"name": "kuma-fe", "args":["-P", "http://backend:3001"]}]}}}}'
kubectl scale --replicas=1 deployment/kuma-demo-backend-v1 -n kuma-demo

echo "Waiting for patches to the demo to be applied"
sleep 10
kubectl wait -n kuma-demo --timeout=60s --for condition=Ready --all pods
kubectl get pods -n kuma-demo
echo "Patches applied"
