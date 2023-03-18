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

KONG_NAMESPACE ?= kong
KONG_HELM_RELEASE ?= kong
DEMO_NAMESPACE ?= default
LICENSE_PATH ?= ~/tmp/istio+kong
PUBLIC_DOMAIN ?= dune.kongproxy.me

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
			
kong-gateway-install: check-dependencies
	@echo "☸️  Installing Kong 🦍 to ${GREEN}${KONG_NAMESPACE}${RESET} namespace..."
	kubectl create namespace ${KONG_NAMESPACE}
	helm repo add kong https://charts.konghq.com && helm repo update
	helm install -n ${KONG_NAMESPACE} ${KONG_HELM_RELEASE} kong/kong -f kong-values.yaml
	kubectl -n ${KONG_NAMESPACE} wait --for=condition=Available deployment ${KONG_HELM_RELEASE}-kong
	@echo ""

kong-validate-ip: check-dependencies
	@echo "🌎 validating connection to kong"
	PROXY_IP=$(shell kubectl -n kong get service ${KONG_HELM_RELEASE}-kong-proxy -o=go-template='{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}')
	http $(PROXY_IP)

kong-gateway-uninstall: check-dependencies
	@echo "☸️  Uninstalling Kong from ${GREEN}${KONG_NAMESPACE}${RESET} namespace..."
	helm uninstall -n ${KONG_NAMESPACE} ${KONG_HELM_RELEASE}
	kubectl delete namespace ${KONG_NAMESPACE}
	@echo ""

demo-app-install: check-dependencies
	@echo "☸️  Installing 🐛 Dune Quote Generator ${GREEN}${DEMO_NAMESPACE}${RESET} namespace..."
	
	@echo "☸️  1) Generating 🤫 secrets  ${GREEN}${DEMO_NAMESPACE}${RESET} namespace..."
	openssl req -x509 -nodes -subj "/CN=kongproxy.me" -newkey rsa:4096 -sha256 -keyout server.key -out server.crt -days 3650
	kubectl create secret generic grpc-cert-chain --from-file=server.crt=server.crt
	kubectl create secret generic grpc-pk --from-file=server.key=server.key
	
	@echo "☸️  2) Installing deployment, service, ingress  ${GREEN}${DEMO_NAMESPACE}${RESET} namespace..."
	kubectl apply -k ./ingress
	kubectl -n ${DEMO_NAMESPACE} wait --for=condition=Available deployment dune-quote-deployment
	@echo ""
	kubectl get ingress -n ${DEMO_NAMESPACE} dune-quote-service

demo-app-uninstall: check-dependencies
	@echo "💦🐛 Uninstalling Demo App"
	kubectl delete secrets grpc-cert-chain grpc-pk
	kubectl delete -k ./ingress
dig:
	dig +short ${PUBLIC_DOMAIN}

demo-app-test: check-grpc-dependencies
	@echo "🌎 validating connection to demo app"
	@echo "🌪️  testing gRPC streaming because ${ITALIC}Spice Must Flow...${RESET}"
	PROXY_IP=$(shell kubectl -n kong get service ${KONG_HELM_RELEASE}-kong-proxy -o=go-template='{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}')
	grpcurl -servername $(PUBLIC_DOMAIN) $(PROXY_IP):443 io.kong.developer.quoteservice.QuoteService/GetQuoteStream 

demo-app-grpc-reflection: check-grpc-dependencies
	@echo "🌎 validating connection to demo app"
	@echo ""
	PROXY_IP=$(shell kubectl -n kong get service ${KONG_HELM_RELEASE}-kong-proxy -o=go-template='{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}')
	# grpcurl $(PUBLIC_DOMAIN):443 list
	grpcurl -servername $(PUBLIC_DOMAIN) $(PROXY_IP):443 list

validate-cert:
	openssl s_client -showcerts -verify 3 -servername ${PUBLIC_DOMAIN} -connect ${PUBLIC_DOMAIN}:443 > /dev/null

help:
	@echo ""
	@echo "    ${BLUE}:: ${GREEN}Kong Ingress Controller KIC demo${RESET} ${BLUE}::${RESET}"
	@echo ""
	@echo "demo of a capabilities of KIC 2.9"
	@echo ""
	@echo "${BLUE}Targets${RESET} (in order to execute:)"
	@echo "${BLUE}---------------------------------------------------------------------------------------------------${RESET}"
	@echo "  | ${BLUE}kong-gateway-install${RESET}:		Downloads and installs Kong Ingress Controller using Helm ⎈"
	@echo "  | ${BLUE}demo-app-install${RESET}:			Installs demo app - 🐛 Dune Quote Generator "
	@echo "  | ${BLUE}demo-app-uninstall${RESET}:			uninstall demo app"
	@echo "  | ${BLUE}demo-app-test${RESET}:			test connection to demo via gateway using grpcurl"
	@echo "${BLUE}---------------------------------------------------------------------------------------------------${RESET}"
