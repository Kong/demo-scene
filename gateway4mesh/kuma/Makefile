SHELL=/bin/bash
THIS_MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
THIS_MKFILE_DIR := $(dir $(THIS_MKFILE_PATH))

include $(THIS_MKFILE_DIR)../../common/Makefile
include $(THIS_MKFILE_DIR)../../common/Makefile.gke

GCP_PROJECT_ID ?= $(shell gcloud config list --format 'value(core.project)')
GKE_BASE_MACHINE_TYPE ?= e2-standard-2

CLUSTER_NAME=kong-gateway-4-istio-mesh
CLUSTER_ZONE=us-central1-a

CURRENT_WORKING_DIR=$(shell pwd)
WHO_AM_I=$(shell whoami)
TIMESTAMP=$(shell date)

pad=$(printf '%0.1s' "-"{1..80})


KONG_MESH_VERSION ?= 2.0.0
KONG_NAMESPACE ?= kong
KONG_HELM_RELEASE ?= kong
DEMO_NAMESPACE ?= boutique
LICENSE_PATH ?= ~/tmp/istio+kong

define print-prompt =
printf "\e[96m➜ \e[0m"
endef

define print-header =
printf "\n%-50s\n" $1 | tr ' ~' '- '
endef

.DEFAULT_GOAL := help

minikube-create-cluster:
	@$(call print-header,"creating new minikube cluster")
	@$(call print-prompt)
	minikube start --cpus 6 --memory 8Gb
	@echo ""

minikube-destroy-cluster:
	@$(call print-header,"deleting minikube cluster")
	@$(call print-prompt)
	minikube delete --all
	@echo ""

kong-mesh-install:
	@echo "☸️  Installing Kuma 🐻‍❄️"

	if [ -d "./kong-mesh-${KONG_MESH_VERSION}" ]; then \
        echo "Found ./kong-mesh-${KONG_MESH_VERSION}"; \
        install -m 755 ./kong-mesh-${KONG_MESH_VERSION}/bin/kumactl ~/bin/kumactl ;\
    else \
        echo "No kuma / kong mesh installation found"; \
        echo "☸️  Downloading 🦍 Kong Mesh 𐄳 ..." ;\
        curl -L https://docs.konghq.com/mesh/installer.sh | sh - ;\
    fi
	@echo "${BLUE}𐄳${RESET} 🐻‍❄️ using kumactl..."
	which kumactl
	@echo "${BLUE}𐄳${RESET} Installing Kuma Control Plane..."
	kumactl install control-plane --license-path ${LICENSE_PATH}/license.json | kubectl apply -f -
	@echo ""

kong-mesh-validate: check-dependencies
	kumactl inspect meshes

kong-mesh-cp-ui-pf: check-dependencies
	kubectl port-forward svc/kong-mesh-control-plane -n kong-mesh-system 5681:5681 

kong-mesh-observability-ui: check-dependencies
	kubectl port-forward svc/grafana -n mesh-observability 3000:3000 

kong-mesh-policy: check-dependencies
	kubectl apply -f ./mesh/mesh.yaml
	#kubectl apply -k ./mesh

	
demo-microservices-install: check-dependencies
	@echo "${BLUE}𐄳${RESET} 🐻‍❄️ Preparing environment for microservices..."
	kubectl create namespace ${DEMO_NAMESPACE}     
	kubectl patch namespace ${DEMO_NAMESPACE} -p '{"metadata":{"annotations":{"kuma.io/sidecar-injection":"enabled"}}}'
	@echo ""
	@echo "☸️  Installing microservices Demo app"
	git clone https://github.com/GoogleCloudPlatform/microservices-demo.git 
	@echo "🧑‍🔧 patching demo..."
	cd microservices-demo && git apply --stat ../microservices.patch
	cd microservices-demo && git apply ../microservices.patch
	cd microservices-demo && skaffold run --namespace ${DEMO_NAMESPACE} 
	kubectl apply -f ingress.yaml 
			
kong-gateway-install: check-dependencies
	@echo "☸️  Installing Kong 🦍 to ${GREEN}${KONG_NAMESPACE}${RESET} namespace..."
	kubectl create namespace ${KONG_NAMESPACE}
	#kubectl patch namespace ${DEMO_NAMESPACE} -p '{"metadata":{"annotations":{"kuma.io/sidecar-injection":"enabled","kuma.io/mesh": "default"}}}'
	helm repo add kong https://charts.konghq.com && helm repo update
	helm install -n ${KONG_NAMESPACE} ${KONG_HELM_RELEASE} kong/kong
	kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${KONG_HELM_RELEASE}-kong
	@echo ""

kong-gateway-uninstall: check-dependencies
	@echo "☸️  Uninstalling Kong from ${GREEN}${KONG_NAMESPACE}${RESET} namespace..."
	helm uninstall -n ${KONG_NAMESPACE} ${KONG_HELM_RELEASE}
	kubectl delete namespace ${KONG_NAMESPACE}
	@echo ""

get-kong-ip-minikube:
	minikube service -n kong-istio kong-istio-kong-proxy --url | head -1

#kong-gateway-install: check-dependencies
#	@echo "☸️  Installing Kong 🦍 to using kumactl..."
#	#kumactl install gateway kong | kubectl apply -f -
#	# this is broken 
#	kubectl apply -f https://bit.ly/k4k8s
#	@echo ""
#
#kong-gateway-uninstall: check-dependencies
#	@echo "☸️  Uninstalling Kong 🦍 to using kumactl..."
#	#kumactl install gateway kong | kubectl delete -f -
#	kubectl delete -f https://bit.ly/k4k8s
#	@echo ""

locust-install: check-dependencies
	@echo "🦗 Installing ${GREEN}Locust${RESET}..."
	kubectl create configmap my-loadtest-locustfile --from-file=main.py=locust/locust.py
	helm repo add deliveryhero https://charts.deliveryhero.io/
	helm repo update
	helm install locust deliveryhero/locust --set loadtest.name=my-loadtest --set loadtest.locust_locustfile_configmap=my-loadtest-locustfile

OBS_COMPONENTS = metrics tracing logging
obs-tools-install: check-dependencies
	@echo "☸️  Installing Observability Tools - Prometheus 🔥, Grafana 📊, Jaeger, Loki"
	kumactl install metrics | kubectl apply -f -
	kumactl install tracing | kubectl apply -f -
	kumactl install logging | kubectl apply -f -
	@echo ""

obs-tools-uninstall: check-dependencies
	@echo "❌ Uninstalling Observability Tools"
	# $(foreach var,$(OBS_COMPONENTS),"kumactl install $(var) | kubectl delete -f - ";)
	kumactl install metrics | kubectl delete -f -
	kumactl install tracing | kubectl delete -f -
	kumactl install logging | kubectl delete -f -
	@echo ""

plugin-rate-limiting-install:
	@echo "🦍 Installing Kong Rate Limiting Plugin"
	kubectl -n ${DEMO_NAMESPACE} apply -f plugins/02_rate-limit.yaml 
	kubectl -n ${DEMO_NAMESPACE} patch ingress frontend -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-limit"}}}'
	@echo ""

autopilot: minikube-create-cluster kong-mesh-install kong-gateway-install obs-tools-install demo-microservices-install 
	@echo "🥳  Demo app is available $(shell minikube service -n kong-istio kong-istio-kong-proxy --url | head -1)"
	@echo "Open http://localhost:5681/gui to access Kuma UI"
	@echo ""
	
#help:
#	@echo ""
#	@echo "    ${BLUE}:: ${GREEN}Kong Gateway 🦍 for Istio ⛵ Service Mesh${RESET} ${BLUE}::${RESET}"
#	@echo ""
#	@echo "The demo setup demonstrates how to use Kong Gateway and Kong Ingress Controller with Istio Service Mesh"
#	@echo ""
#	@echo "${BLUE}Targets${RESET} (in order to execute:)"
#	@echo "  | ${BLUE}install-istio${RESET}:			Downloads and installs istioctl and istio control plane install Kubernetes"
#	@echo "  | ${BLUE}install-kong${RESET}:			Downloads and installs Kong Ingress Controller using Helm"
#	@echo "  | ${BLUE}install-demo-app${RESET}:			Installs Bookinfo demo app from Istio and configures Kong Ingress"
#	@echo "  | ${BLUE}install-obs-tools${RESET}:			Installs Kiali GUI tool"
#	@echo "  | ${BLUE}install-plugin-rate-limiting${RESET}:	Enables Kong Rate Limiting plugin"
#	@echo "${BLUE}-----------------------------------------------------------------------------${RESET}"
