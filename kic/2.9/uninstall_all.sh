#!/usr/bin/env bash
set +x

kubectl get gateways

echo -e "\n=== ❌ ☸️ Installing Gateway API CRDs ===\n"
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.6.2" | kubectl delete -f -

echo -e "\n=== ❌ 🦍 Installing Kong CRDs ===\n"
kubectl kustomize https://github.com/Kong/kubernetes-ingress-controller/config/crd | kubectl delete -f -
