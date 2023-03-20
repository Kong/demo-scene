#!/usr/bin/env bash
. $(dirname "$0")./../common/colors.sh

export GATEWAY_HELM_RELEASE=gateway
export CONTROLLER_HELM_RELEASE=controller
export KONG_NAMESPACE=kic

set +x
tput -Txterm bold
kubectl scale deployment -n ${KONG_NAMESPACE} ${GATEWAY_HELM_RELEASE}-kong --replicas 4
kubectl scale deployment -n ${KONG_NAMESPACE} ${CONTROLLER_HELM_RELEASE}-kong --replicas 3

kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${GATEWAY_HELM_RELEASE}-kong
kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${CONTROLLER_HELM_RELEASE}-kong

kubectl get deployment -n ${KONG_NAMESPACE}
tput -Txterm sgr0