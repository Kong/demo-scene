#!/usr/bin/env bash
. $(dirname "$0")./../common/colors.sh

echo -e "$BLUE\n=== ☸️ $BOLD Installing Gateway API CRDs $NOCOLOR $BLUE===\n$NOCOLOR"
set -x
#  0.6.x for GRPCRoute https://github.com/kubernetes-sigs/gateway-api/releases
kubectl kustomize "https://github.com/kubernetes-sigs/gateway-api/config/crd/experimental?ref=v0.6.2" | kubectl apply -f -
set +x

sleep 5

set -x
kubectl get gateways
set +x
