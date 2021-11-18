#!/usr/bin/env bash

minikube start --cpus 4 --memory 8Gb

# install istio

curl -s -L https://istio.io/downloadIstio | ISTIO_VERSION=1.11.2 sh -

istioctl x precheck

istioctl install --set profile=demo -y

istioctl install --set profile=minimal -y


-- install kong

kubectl create namespace kong-istio
k create namespace kong-istio

k label namespace kong-istio istio-injection=enabled
kubectl label namespace kong-istio istio-injection=enabled

helm repo add kong https://charts.konghq.com && helm repo update

helm install -n kong-istio kong-istio kong/kong

# kubectl describe pod -n kong-istio -l app.kubernetes.io/instance=kong-istio

export KONG_IP=`minikube service -n kong-istio kong-istio-kong-proxy --url | head -1`

http $KONG_IP // or insomnia


-- install test app

kubectl create namespace bookinfo

kubectl label namespace bookinfo istio-injection=enabled
k label namespace bookinfo istio-injection=enabled

kubectl -n bookinfo apply -f istio-1.11.2/samples/bookinfo/platform/kube/bookinfo.yaml

kaf ingress.yaml

minikube service -n kong-istio kong-istio-kong-proxy --url | head -1


-- install observability addons

kaf ./istio-1.11.2/samples/addons/prometheus.yaml
kaf ./istio-1.11.2/samples/addons/jaeger.yaml
kaf ./istio-1.11.2/samples/addons/kiali.yaml

-- kong plugin

kaf plugin.yaml

kubectl -n bookinfo patch ingress productpage -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-limit"}}}'

