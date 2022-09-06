SHELL=/bin/bash
THIS_MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
THIS_MKFILE_DIR := $(dir $(THIS_MKFILE_PATH))

include $(THIS_MKFILE_DIR)../../common/Makefile

GCP_PROJECT_ID ?= $(shell gcloud config list --format 'value(core.project)')
GKE_BASE_MACHINE_TYPE ?= e2-standard-2

CLUSTER_NAME=kong-gateway-4-istio-mesh
CLUSTER_ZONE=us-central1-a

CURRENT_WORKING_DIR=$(shell pwd)
WHO_AM_I=$(shell whoami)
TIMESTAMP=$(shell date)

pad=$(printf '%0.1s' "-"{1..80})

ISTIO_VERSION ?= 1.14.3
KONG_NAMESPACE ?= kong-istio
DEMO_NAMESPACE ?= bookinfo
KONG_HELM_RELEASE ?= kong-istio

PUBLIC_DOMAIN ?= istio.kongproxy.me

#KONG_IP = $(shell minikube service -n kong-istio kong-istio-kong-proxy --url | head -1) 

define print-prompt =
printf "\e[96m➜ \e[0m"
endef

define print-header =
printf "\n%-50s\n" $1 | tr ' ~' '- '
endef

.DEFAULT_GOAL := help

cluster-minikube:
	@$(call print-header,"creating new minikube cluster")
	@$(call print-prompt)
	minikube start --cpus 4 --memory 8Gb
	@echo ""

destroy-cluster-minikube:
	@$(call print-header,"deleting minikube cluster")
	@$(call print-prompt)
	minikube delete --all
	@echo ""

install-istio:
	@echo "☸️  Installing Istio ⛵"
	@curl -s -L https://istio.io/downloadIstio | ISTIO_VERSION=${ISTIO_VERSION} sh -
	@sudo install -m 755 ./istio-${ISTIO_VERSION}/bin/istioctl ~/bin/istioctl
	#@rm -f istio-$ISTIO_VERSION
	istioctl x precheck
	istioctl install --set profile=minimal -y
	@echo ""

uninstall-istio:
	@echo "☸️  ${RED} Uninstalling Istio 🔥 ⛵..."
	istioctl x uninstall --purge -y
	@echo ""
install-kong: check-dependencies
	@echo "☸️  Installing Kong 🦍 to ${GREEN}${KONG_NAMESPACE}${RESET} namespace..."
	kubectl create namespace ${KONG_NAMESPACE}
	kubectl label namespace ${KONG_NAMESPACE} istio-injection=enabled
	helm repo add kong https://charts.konghq.com && helm repo update
	helm install -n ${KONG_NAMESPACE} ${KONG_HELM_RELEASE} kong/kong
	kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${KONG_HELM_RELEASE}-kong
	@echo ""

uninstall-kong: check-dependencies
	@echo "☸️ ${RED} Uninstalling Kong from ${GREEN}${KONG_NAMESPACE}${RESET} namespace...${RESET}"
	helm uninstall -n ${KONG_NAMESPACE} ${KONG_HELM_RELEASE}
	kubectl delete namespace ${KONG_NAMESPACE}
	@echo ""

get-kong-ip-minikube:
	minikube service -n kong-istio kong-istio-kong-proxy --url | head -1

get-kong-ip-k8s:
	kubectl get svc --namespace ${KONG_NAMESPACE} ${KONG_HELM_RELEASE}-kong-proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

dig:
	dig +short ${PUBLIC_DOMAIN}

validate-cert:
	openssl s_client -showcerts -verify 3 -servername ${PUBLIC_DOMAIN} -connect ${PUBLIC_DOMAIN}:443 > /dev/null

#test: #test target to call other targets
#	@$(MAKE) -f $(THIS_MKFILE_PATH) get-kong-ip-minikube

install-demo-app:
	@echo "☸️  Installing Bookinfo Demo app..."
	kubectl create namespace ${DEMO_NAMESPACE}     
	kubectl label namespace ${DEMO_NAMESPACE} istio-injection=enabled
	kubectl -n ${DEMO_NAMESPACE} apply -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/bookinfo/platform/kube/bookinfo.yaml
	kubectl -n ${DEMO_NAMESPACE} wait --timeout=180s --for=condition=Available deployment productpage-v1
	kubectl -n ${DEMO_NAMESPACE} apply -f ingress.yaml
	@echo ""
	@echo "Installing samples ${BLUE}DestinationRule${RESET}"
	kubectl -n ${DEMO_NAMESPACE} apply -f istio-${ISTIO_VERSION}/samples/bookinfo/networking/destination-rule-reviews.yaml
	@echo ""

uninstall-demo-app:
	@echo "📖 💣 ${RED} Uninstalling sample app... ${RESET}"
	kubectl -n ${DEMO_NAMESPACE} delete -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/bookinfo/platform/kube/bookinfo.yaml
	kubectl -n ${DEMO_NAMESPACE} delete -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/bookinfo/networking/destination-rule-reviews.yaml
	kubectl delete namespace ${DEMO_NAMESPACE} 
	@echo ""

install-obs-tools: check-dependencies
	@echo "☸️  Installing Observability Tools - Prometheus 🔥, Grafana 📊, Kiali 🕸️"
	kubectl apply -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/addons/prometheus.yaml
	kubectl apply -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/addons/jaeger.yaml
	kubectl apply -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/addons/kiali.yaml
	@echo ""

uninstall-obs-tools: check-dependencies
	@echo "☸️  💣  ${RED}Uninstalling Observability Tools... ${RESET}"
	kubectl delete -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/addons/prometheus.yaml
	kubectl delete -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/addons/jaeger.yaml
	kubectl delete -f ${THIS_MKFILE_DIR}istio-${ISTIO_VERSION}/samples/addons/kiali.yaml
	@echo ""

install-plugin-rate-limiting-simple:
	@echo "🦍 Installing Kong Rate Limiting Plugin"
	kubectl -n ${DEMO_NAMESPACE} apply -f plugin.yaml 
	kubectl -n ${DEMO_NAMESPACE} patch ingress productpage -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-limit"}}}'
	@echo ""

install-plugin-rate-limiting-sla-demo:
	@echo "🦍 Installing Kong Rate Limiting Plugin for Free, Paid and Platinum tiers..."
	kubectl -n ${DEMO_NAMESPACE} apply -f ./plugins
	@echo ""

uninstall-plugin-rate-limiting-sla-demo:
	@echo "🦍 ${RED} Removing Kong Rate Limiting Plugin for Free, Paid and Platinum tiers...${RESET}"
	kubectl -n ${DEMO_NAMESPACE} delete -f ./plugins 
	kubectl -n ${DEMO_NAMESPACE} apply -f ingress.yaml
	@echo ""

kong-ingress-enable-free-tier:
	@echo "${BLUE} Patching Ingress and enabling free Tier..." 
	kubectl -n ${DEMO_NAMESPACE} patch ingress productpage -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-free-tier"}}}'
	@echo ""	

kong-ingress-enable-paid-tier:
	@echo "${BLUE} Patching Ingress and enabling Paid 💰 Tier..." 
	kubectl -n ${DEMO_NAMESPACE} patch ingress productpage -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-free-tier,user1-auth,rate-paid-tier"}}}'
	@echo ""

kong-ingress-enable-platinum-tier:
	@echo "${BLUE} Patching Ingress and enabling Platinum 🤑 💰 🤑 Tier..." 
	kubectl -n ${DEMO_NAMESPACE} patch ingress productpage -p '{"metadata":{"annotations":{"konghq.com/plugins":"rate-free-tier,user1-auth,rate-paid-tier,platinum-paid-tier"}}}'
	@echo ""

nuke-all: uninstall-plugin-rate-limiting-sla-demo uninstall-demo-app uninstall-obs-tools uninstall-kong uninstall-istio

port-forwarding:
	@echo "Exposing Kiali..."
	kubectl port-forward -n istio-system services/kiali 20001:20001

autopilot: cluster-minikube install-istio install-kong install-obs-tools install-demo-app install-plugin-rate-limiting 
	@echo "🥳  Demo app is available $(shell minikube service -n kong-istio kong-istio-kong-proxy --url | head -1)"
	@echo "Run <make port-forwarding» to access Kiali GUI"
	@echo ""
	
help:
	@echo ""
	@echo "    ${BLUE}:: ${GREEN}Kong Gateway 🦍 for Istio ⛵ Service Mesh${RESET} ${BLUE}::${RESET}"
	@echo ""
	@echo "The demo setup demonstrates how to use Kong Gateway and Kong Ingress Controller with Istio Service Mesh"
	@echo ""
	@echo "${BLUE}Targets${RESET} (in order to execute:)"
	@echo "  | ${BLUE}install-istio${RESET}:			Downloads and installs istioctl and istio control plane install Kubernetes"
	@echo "  | ${BLUE}install-kong${RESET}:			Downloads and installs Kong Ingress Controller using Helm"
	@echo "  | ${BLUE}install-demo-app${RESET}:			Installs Bookinfo demo app from Istio and configures Kong Ingress"
	@echo "  | ${BLUE}install-obs-tools${RESET}:			Installs Kiali GUI tool"
	@echo "  | ${BLUE}install-plugin-rate-limiting${RESET}:	Enables Kong Rate Limiting plugin"
	@echo "${BLUE}-----------------------------------------------------------------------------${RESET}"