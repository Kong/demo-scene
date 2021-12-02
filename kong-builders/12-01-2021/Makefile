SHELL=/bin/bash
THIS_MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
THIS_MKFILE_DIR := $(dir $(THIS_MKFILE_PATH))

include $(THIS_MKFILE_DIR)../../common/Makefile
include $(THIS_MKFILE_DIR)../../common/Makefile.gke

GCP_PROJECT_ID ?= $(shell gcloud config list --format 'value(core.project)')
GKE_BASE_MACHINE_TYPE ?= e2-standard-2

CLUSTER_NAME=kong-builders
CLUSTER_ZONE=us-east1-c

CURRENT_WORKING_DIR=$(shell pwd)
WHO_AM_I=$(shell whoami)
TIMESTAMP=$(shell date)

DEMO_NAMESPACE ?= kong-builders

pad=$(printf '%0.1s' "-"{1..80})

ISTIO_VERSION ?= 1.12.0

.DEFAULT_GOAL := help

istio-install: gke-check-dependencies
	@echo "${GREEN}Installing Istio with default profile⛵${RESET}"
	@echo "To list all profiles run ${BOLD}istioctl profile list${RESET}"

	if [ -d "./istio-${ISTIO_VERSION}" ]; then \
		echo "${REST}${BLUE}Found ./istio-${ISTIO_VERSION} ${REST}"; \
		install -m 755 ./istio-${ISTIO_VERSION}/bin/istioctl ~/bin/istioctl; \
	else \
		echo "No Istio installation found"; \
		echo "${GREEN}Downloading Istio...${RESET}" ;\
		@curl -s -L https://istio.io/downloadIstio | ISTIO_VERSION=${ISTIO_VERSION} sh - ;\
	fi
	istioctl x precheck
	istioctl install --set profile=default -y

	@echo ""

istio-remove: check-dependencies
	kubectl delete namespaces istio-system

demo-app-deploy: check-dependencies
	@echo "${GREEN}Deploying Quote Services (Back to Future and chuck Norris) to ${BLUE}${DEMO_NAMESPACE}${RESET}"

	kubectl create namespace ${DEMO_NAMESPACE}     
	kubectl label namespace ${DEMO_NAMESPACE} istio-injection=enabled
	kubectl -n ${DEMO_NAMESPACE} apply -f 2_backtofuture_quote_service.yaml
	kubectl -n ${DEMO_NAMESPACE} wait --for=condition=Available deployment back2future-quote-service
	kubectl -n ${DEMO_NAMESPACE} apply -f 2_chuck_quote_service.yaml
	kubectl -n ${DEMO_NAMESPACE} wait --for=condition=Available deployment chuck-quote-service

	@echo ""
	
demo-app-gateway: check-dependencies
	@echo "${GREEN}Installing Gateway resource to ${BLUE}${DEMO_NAMESPACE}${RESET}"
	kubectl -n ${DEMO_NAMESPACE} apply -f 1_gateway.yaml
	@echo ""

demo-app-virtual-services: check-dependencies
	@echo "${GREEN}Installing Virtual Services resources to ${BLUE}${DEMO_NAMESPACE}${RESET}"
	kubectl -n ${DEMO_NAMESPACE} apply -f 3_backtofuture_virtual_service.yaml
	kubectl -n ${DEMO_NAMESPACE} apply -f 3_chuck_virtual_service.yaml
	@echo ""

demo-app-remove: check-dependencies
	kubectl delete namespaces ${DEMO_NAMESPACE}
	
autopilot: check-dependencies istio-install demo-app-deploy demo-app-gateway demo-app-virtual-services wait-for-ip

cleanup: demo-app-remove istio-remove

wait-for-ip:
	until kubectl get svc --namespace istio-system istio-ingressgateway --output=jsonpath='{.status.loadBalancer.ingress[0].ip}' > /dev/null; do echo "waiting 10 sec for external IP of LoadBalancer..."; sleep 10; done;

test: IP = $(shell kubectl get svc --namespace istio-system istio-ingressgateway -ojson | jq -r '.status.loadBalancer.ingress[0].ip')

test: 
	@echo "🛫 Let's fly..."
	@$(call check-dependency,http)
	http -v ${IP}
	http ${IP} Host:chuck.dev
	http ${IP} Host:backtofuture.dev
	
help:
	@echo ""
	@echo "    ${BLUE}:: ${GREEN} KONG BUILDERS Istio ⛵ Service Mesh demo ${RESET} ${BLUE}::${RESET}"
	@echo ""
	@echo "The demo setup demonstrates how to use Istio Service Mesh and Istio Gateway"
	@echo ""
	@echo "${BLUE}Targets${RESET} (in order to execute:)"
	@echo "  | ${BLUE}gke-create-cluster${RESET}:			☸ Creates Kubernetes cluster in GCP"
	@echo "  | ${BLUE}istio-install${RESET}:			⛵ Downloads and installs istioctl and istio control plane install Kubernetes"
	@echo "  | ${BLUE}demo-app-deploy${RESET}:			📚 Deploy Back to Future and Chuck Norris quote service apps"
	@echo "  | ${BLUE}demo-app-gateway${RESET}:			⛵ Deploy Gateway resource"
	@echo "  | ${BLUE}demo-app-virtual-services${RESET}:		⛵ Deploy virtual services for Back to Future and Chuck Norris quote service apps"
	@echo "  | ${BLUE}autopilot${RESET}:				🛫 Run demo in automatic mode"
	@echo "${BLUE}------------------------------------------------------------------------------------------------------${RESET}"