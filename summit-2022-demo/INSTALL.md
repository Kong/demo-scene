# Prerequisites

- A running k8s cluster
- Access to the `Summit Demos (2022)` Google doc

## Deployment

There are three component parts to the demo deployment

1. **Kong Gateway** - Used to proxy requests + collect analytics data
2. **Random Response** - A service that responds with a random HTTP code
3. **Locust** - Used to generate traffic automatically
4. **OTel Collector** - Capture OpenTelemetry traffic and send to Datadog
5. Configure a domain - speak to @mheap about using the kongairways.com domain if needed. Otherwise point your domain to `$PROXY_IP` from the first section

### Kong Gateway

1. Log in to https://cloud.konghq.com with airways@konghq.com (credentials in 1Password)
2. Select `production-blue` runtime group
3. Create a new runtime group on Kubernetes
   1. Save the certificate as `tls.crt` and the key as `tls.key`
   2. Run `kubectl create secret tls kong-cluster-cert -n kong --cert=./tls.crt --key=./tls.key`
   3. Save the `values.yaml` provided, and add `fullnameOverride: kong-dp` to the top of the file. Add `opentelemetry_tracing: "all"` and `opentelemetry_tracing_sampling_rate: "1.0"` under the `env` key.
   4. Run `helm install my-kong kong/kong -n kong --values ./values.yaml`
4. Run the following to get your proxy IP

```bash
HOST=$(kubectl get svc --namespace kong kong-dp-proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
PORT=$(kubectl get svc --namespace kong kong-dp-proxy -o jsonpath='{.spec.ports[0].port}')
export PROXY_IP=${HOST}:${PORT}
echo $PROXY_IP
```

### Random Response Service

1. Open the `apps/random-response` folder
2. Deploy with `helm install -n kong random-response ./charts/random-response` (the image was already built + uploaded for production)

### Locust

1. Open the `apps/locust` folder
3. `kubectl create configmap my-loadtest-locustfile --from-file=main.py=./locustfile_staging.py`
4. `helm install locust deliveryhero/locust --set loadtest.name=my-loadtest --set loadtest.locust_locustfile_configmap=my-loadtest-locustfile`
5. `kubectl --namespace default port-forward service/locust 8089:8089`
6. Open http://localhost:8089
7. Set the Host field to `http://$PROXY_IP` (swap $PROXY_IP for the value you saved from the first step of these instructions)
8. Click `Start swarming`
9. You can now stop your port-forward. Traffic will be continuously generated

### OTel Collector

1. Edit `apps/otel-collector/values.yaml` and replace `DATADOG_API_KEY` with your API key.
2. `helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts`
3. `helm install my-opentelemetry-collector open-telemetry/opentelemetry-collector --values ./apps/otel-collector/values.yaml`

## Staging Cluster

### Kong Gateway

1. Log in to https://cloud.konghq.com with airways@konghq.com (credentials in 1Password)
2. Select `staging-blue` runtime group
3. Create a new runtime group on Kubernetes
   1. Save the certificate as `tls.crt` and the key as `tls.key`
   2. Run `kubectl create secret tls kong-cluster-cert -n kong --cert=./tls.crt --key=./tls.key`
   3. Save the `values.yaml` provided, and add `fullnameOverride: kong-dp` to the top of the file. Add `opentelemetry_tracing: "all"` and `opentelemetry_tracing_sampling_rate: "1.0"` under the `env` key.
   4. Run `helm install my-kong kong/kong -n kong --values ./values.yaml`
4. Run the following to get your proxy IP

```bash
HOST=$(kubectl get svc --namespace kong kong-dp-proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
PORT=$(kubectl get svc --namespace kong kong-dp-proxy -o jsonpath='{.spec.ports[0].port}')
export PROXY_IP=${HOST}:${PORT}
echo $PROXY_IP
```

### Random Response Service

1. Open the `apps/random-response` folder
2. Build the Docker image (replace `PROJECT_NAME` with your project name) - `docker build --platform=linux/amd64 . -t gcr.io/PROJECT_NAME/random-response`
3. Run `docker push gcr.io/PROJECT_NAME/random-response` (you might need to run `gcloud auth configure-docker` first)
4. Edit `charts/random-response/values.yaml` and replace `image.repository` with `gcr.io/PROJECT_NAME/random-response`
5. Deploy with `helm install -n kong random-response ./charts/random-response`

### Locust

1. Open the `apps/locust` folder
2. `helm repo add deliveryhero https://charts.deliveryhero.io/`
3. `kubectl create configmap my-loadtest-locustfile --from-file=main.py=./locustfile_production.py`
4. `helm install locust deliveryhero/locust --set loadtest.name=my-loadtest --set loadtest.locust_locustfile_configmap=my-loadtest-locustfile`
5. `kubectl --namespace default port-forward service/locust 8089:8089`
6. Open http://localhost:8089
7. Set the Host field to `http://$PROXY_IP` (swap $PROXY_IP for the value you saved from the first step of these instructions)
8. Click `Start swarming`
9. You can now stop your port-forward. Traffic will be continuously generated

### OTel Collector

1. Edit `apps/otel-collector/values.yaml` and replace `DATADOG_API_KEY` with your API key.
3. `helm install my-opentelemetry-collector open-telemetry/opentelemetry-collector --values ./apps/otel-collector/values.yaml`
