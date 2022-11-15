# Docker image

```bash
docker build -t random-response:latest .
docker tag random-response:latest gcr.io/summit-demo-2022/random-response
docker push gcr.io/summit-demo-2022/random-response
```

Deploy:

```
helm install random-response ./random-response
```

Running at:

```
http://random-response.default.svc.cluster.local
```
