#!/usr/bin/env bash
set +x

kubectl get gateways

echo -e "\n=== ❌ 🦍 Uninstalling Kong Gateway Operator  ===\n"
kubectl delete -f https://docs.konghq.com/assets/gateway-operator/v1.0.0/crds.yaml
kubectl kustomize "https://github.com/kong/gateway-operator/config/default" | kubectl delete -f -

echo -e "\n=== ❌ ☸️ Installing Gateway API CRDs ===\n"
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.8.1" | kubectl delete -f -

echo -e "\n=== ❌ 🦍 Installing Kong CRDs ===\n"
kubectl kustomize https://github.com/Kong/kubernetes-ingress-controller/config/crd | kubectl delete -f -
