#!/usr/bin/env bash
set +x

kubectl get gateways

echo -e "\n=== ❌ 🦍 Uninstalling Kong Gateway Operator  ===\n"
kubectl apply -f https://docs.konghq.com/assets/gateway-operator/v1.0.2/all_controllers.yaml
kubectl apply -f https://docs.konghq.com/assets/gateway-operator/v1.0.2/crds.yaml 

echo -e "\n=== ❌ ☸️ Installing Gateway API CRDs ===\n"
kubectl delete -k "https://github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.8.1"

echo -e "\n=== ❌ 🦍 Installing Kong CRDs ===\n"
kubectl delete -k https://github.com/Kong/kubernetes-ingress-controller/config/crd
