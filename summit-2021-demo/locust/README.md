Locust is used to generate traffic for Vitals

---

```
kubectl create configmap my-loadtest-locustfile --from-file=main.py=locustfile.py

helm repo add deliveryhero https://charts.deliveryhero.io/
helm install locust deliveryhero/locust \
  --set loadtest.name=my-loadtest \
  --set loadtest.locust_locustfile_configmap=my-loadtest-locustfile

kubectl --namespace default port-forward service/locust 8089:8089
```

Then visit http://localhost:8089 and start a test using http://my-kong-kong-proxy.default.svc.cluster.local as the host
