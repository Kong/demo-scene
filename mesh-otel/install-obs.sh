#!/bin/bash
kubectl create namespace observability

kubectl delete secret -n observability otel-providers
kubectl create secret generic -n observability otel-providers \
  --from-literal=grafana-key="$(head -1 .secrets/grafana-key)" \
  --from-literal=grafana-user="$(head -1 .secrets/grafana-user)" \
  --from-literal=honeycomb-api-key="$(head -1 .secrets/honeycomb-api-key)" \
  --from-literal=datadog-api-key="$(head -1 .secrets/datadog-api-key)"

kubectl apply -f otel-collectors.yaml

kubectl rollout restart -n observability deployment/otel-collector
