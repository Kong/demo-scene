#!/usr/bin/env sh
# setup EU based cluster and connect to EU based Konnect CP

kubectl create secret tls kong-cluster-cert -n kong --cert=./eu/tls.crt --key=./eu/tls.key
helm install kong-eu kong/kong -n kong --values ./eu/values.yaml