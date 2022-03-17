kumactl install control-plane --license-path ~/tmp/istio+kong/license.json| kaf -

kubectl port-forward svc/kong-mesh-control-plane -n kong-mesh-system 5681:5681 

#open browser and show UI

#deploy services

kubectl create namespace boutique

#kubens
kubectl patch namespace boutique -p '{"metadata":{"annotations":{"kuma.io/sidecar-injection":"enabled"}}}'

export PROJECT_ID=`gcloud config list --format 'value(core.project)'`
skaffold run --default-repo=gcr.io/$PROJECT_ID

skaffold run -p gcb -n boutique --default-repo=gcr.io/gamovward

# -> show k9s

kumactl install metrics | kubectl apply -f -
kumactl install tracing | kubectl apply -f -
kumactl install logging | kubectl apply -f -

kumactl install gateway kong | kubectl apply -f -
kubectl apply -f ./ingress.yaml -n boutique
kubectl plugins/02_rate-limit.yaml
kubectl -n boutique patch ingress frontend -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-limit"}}}'

helm install locust deliveryhero/locust --set loadtest.name=my-loadtest --set loadtest.locust_locustfile_configmap=my-loadtest-locustfile


kubectl apply -f ./mesh.yaml

#show gateway UI