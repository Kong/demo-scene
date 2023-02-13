#!/usr/bin/env sh

# enable tracing and enable debug output (for demo purposes)
curl -Ls get.konghq.com/quickstart | sh -s -- -t 3.1.1.1-alpine -e KONG_OPENTELEMETRY_TRACING=all -e KONG_LOG_LEVEL=debug

# enable OpenTelemetry plugin
curl --request POST \
  --url http://localhost:8001/plugins \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "opentelemetry",
	"config": {
		"endpoint": "http://opentelemetry-collector:4318/v1/traces",
		"resource_attributes": {
			"service.name": "kong-builders"
		}
	}
}'

curl --request POST \
  --url http://localhost:8001/services/ \
  --data name=wow-service \
  --data url=https://owen-wilson-wow-api.onrender.com/wows/random
  
curl --request POST \
  --url http://localhost:8001/services/wow-service/routes \
  --data paths=/wow