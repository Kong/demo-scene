docker run --name opentelemetry-collector \
  --network kong-quickstart-net \
  --hostname $(hostname) \
  -p 4318:4318 \
  -p 55679:55679 \
  -v $(pwd)/collector.yaml:/etc/otel-collector-config.yaml \
  otel/opentelemetry-collector-contrib:0.70.0 \
  --config=/etc/otel-collector-config.yaml
