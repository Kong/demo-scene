#!/usr/bin/env bash
set +x

kubectl get gateways

echo -e "\n=== ❌ 🦍 Uninstalling Kong Gateway Operator  ===\n"
kubectl kustomize "https://github.com/kong/gateway-operator-docs/config/default?submodules=false" | kubectl delete -f -

echo -e "\n=== ❌ ☸️ Installing Gateway API CRDs ===\n"
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.5.0" | kubectl delete -f -

echo -e "\n=== ❌ 🦍 Installing Kong CRDs ===\n"
kubectl kustomize https://github.com/Kong/kubernetes-ingress-controller/config/crd | kubectl delete -f -
