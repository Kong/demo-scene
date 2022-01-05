# k8s Cluster Setup

### Chart setup

Add all charts:

```
helm repo add kong https://charts.konghq.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add deliveryhero https://charts.deliveryhero.io/
```

### Install MySQL

```
helm install database bitnami/mysql
echo Username: root
kubectl get secret --namespace default database-mysql -o jsonpath="{.data.mysql-root-password}" | base64 --decode
# 8aJSYXGcZm
```

Log into mysql pod and create user:

```
CREATE USER summit IDENTIFIED BY 'summit';
GRANT ALL ON *.* TO 'summit'@'%';
```

### Demo App

You **don’t** need to do this as the image is already built:

Build an image from `src`:

```
docker build -t summit-demo:latest .
docker tag summit-demo:latest gcr.io/your-project/summit-demo
docker push gcr.io/your-project/summit-demo
```

- `summit-demo` chart at https://github.com/Kong/demo-scene/tree/main/summit-2021-demo/tree/main/provisioning/helm/summit-demo

```
helm install summit-demo ./provisioning/helm/summit-demo/
```

Log into the pod and run:

```
npx prisma migrate deploy
node seed.js
```

### Kong Ingress

Via [Set up a Kong Gateway Runtime on Kubernetes | Kong Docs](https://docs.konghq.com/konnect/runtime-manager/gateway-runtime-kubernetes/)

- Get certs on [Konnect](https://konnect.konghq.com/runtime-manager/5cae6e7a-1f61-405d-b259-4444ee9b2a05/configuration)
- `values.yaml `on https://github.com/Kong/demo-scene/tree/main/summit-2021-demo/tree/main/provisioning/helm/kong

```
kubectl create secret tls kong-cluster-cert --cert ./tls.crt --key ./tls.key
kubectl create secret generic kong-cluster-ca  --from-file=ca.crt=./ca.crt
helm install my-kong kong/kong --values ./kong/values.yaml
```

```
HOST=$(kubectl get svc --namespace default my-kong-kong-proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
PORT=$(kubectl get svc --namespace default my-kong-kong-proxy -o jsonpath='{.spec.ports[0].port}')
export PROXY_IP=${HOST}:${PORT}
curl $PROXY_IP
```

### Locust

- `locustfile.py` at https://github.com/Kong/demo-scene/tree/main/blob/main/locust/locustfile.py

```
kubectl create configmap my-loadtest-locustfile --from-file=main.py=locustfile.py

helm install locust deliveryhero/locust \
  --set loadtest.name=my-loadtest \
  --set loadtest.locust_locustfile_configmap=my-loadtest-locustfile

kubectl --namespace default port-forward service/locust 8089:8089
```

Then start a test in the UI pointing at http://my-kong-kong-proxy.default.svc.cluster.local
