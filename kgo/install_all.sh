#!/usr/bin/env bash
. $(dirname "$0")./common/colors.sh

echo -e "$BLUE\n=== 🦍 $BOLD Installing Kong CRDs $NOCOLOR $BLUE===\n$NOCOLOR"

set -x
kubectl kustomize https://github.com/Kong/kubernetes-ingress-controller/config/crd | kubectl apply -f -
set +x

sleep 5

echo -e "$BLUE\n=== ☸️ $BOLD Installing Gateway API CRDs $NOCOLOR $BLUE===\n$NOCOLOR"
set -x
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.8.1" | kubectl apply -f -
set +x

sleep 5

echo -e "$BLUE\n=== 🦍 Installing Kong Gateway Operator $NOCOLOR $BLUE===\n$NOCOLOR"
set -x
kubectl apply -f https://docs.konghq.com/assets/gateway-operator/v1.0.0/crds.yaml --server-side
#kubectl apply -f https://docs.konghq.com/assets/gateway-operator/v1.0.0/all_controllers.yaml
kubectl kustomize "https://github.com/kong/gateway-operator/config/default" | kubectl apply -f -
set +x

sleep 5

echo -e "$BLUE\n=== Waiting for Kong Operator deployment Operator stabilize $NOCOLOR $BLUE===\n$NOCOLOR"
set -x
kubectl -n kong-system wait --for=condition=Available=true --timeout=120s deployment/gateway-operator-controller-manager
set +x

sleep 5

set -x
kubectl get gateways
set +x