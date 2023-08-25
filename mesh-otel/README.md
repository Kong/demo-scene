# OTEL demo

This demo showcases how you can leverage open telemetry in KongMesh and export the data to a set of providers.

In our example we show how to use:

- [Grafana Cloud](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/otlp/send-data-otlp/)
- [Datadog](https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/)
- [HoneyComb](https://docs.honeycomb.io/getting-data-in/otel-collector/)

## Run it yourself

Create secrets files in the `.secrets/` folder (look at the reference on install-obs.sh to see which keys are required).

Adapt env variables in `otel-collector` deployment in `otel-collectors.yaml`.

Install everything on your k8s cluster with:

```shell
./install-obs.sh
```

Apply the policies in Kuma:

```shell
kumactl apply -f telemetry.yaml
```

Go to any provider and look at traces and metrics.

> TIP: A good prometheus query to see data is: count by(kuma_io_service) (envoy_http_downstream_rq_completed)
