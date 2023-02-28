#!/usr/bin/env sh

kubectl create secret tls kong-cluster-cert -n kong --cert=./us/tls.crt --key=./us/tls.key

helm install kong-us kong/kong -n kong --values ./us/values.yaml