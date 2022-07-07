SHELL=/bin/bash
THIS_MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
THIS_MKFILE_DIR := $(dir $(THIS_MKFILE_PATH))

include $(THIS_MKFILE_DIR)../common/Makefile

define print-prompt =
printf "\e[96m➜ \e[0m"
endef

define print-header =
printf "\n%-50s\n" $1 | tr ' ~' '- '
endef

eks-cluster-create:
	@echo "🐣 ${GREEN}Creating a new EKS cluster..."
	eksctl create cluster --config-file cluster.yaml 	 
	@echo ""

eks-cluster-delete:
	@echo "💣 ${RED} Destroying EKS cluster..."
	eksctl delete cluster -f cluster.yaml
	@echo ""

# Gateway API CRDs should be installed before CP is deployed 
mesh-install-gateway-crds: check-dependencies
	@echo "☸️ ${BLUE} Installing Gateway API CRDs..."
	kubectl apply -k "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.4.3"
	@echo ""

mesh-install-cp: mesh-install-gateway-crds
	@echo "🐻‍❄️ ${GREEN} Installing Kong Mesh with using Helm...${RESET}"
	kubectl create namespace kong-mesh-system --dry-run=client -o yaml | kubectl apply -f -
	kubectl create secret generic kong-mesh-license -n kong-mesh-system --from-file=/Users/vikgamov/Dropbox/license.json --dry-run=client -o yaml | kubectl apply -f -
	helm upgrade -i -n kong-mesh-system kong-mesh kong-mesh/kong-mesh \
       --set kuma.controlPlane.secrets[0].Env="KMESH_LICENSE_INLINE" \
       --set kuma.controlPlane.secrets[0].Secret="kong-mesh-license" \
       --set kuma.controlPlane.secrets[0].Key="license.json" \
       --set experimental.gatewayAPI=true
	@echo ""

mesh-delete-cp: check-dependencies
	@echo "${RED} Uninstalling Kong Mesh control plane..."
	helm delete -n kong-mesh-system kong-mesh
	@echo ""

mesh-install-kuma-demo: check-dependencies
	@echo "${GREEN} 🐻‍❄️ installing kuma-demo... ${RESET}"
	kubectl apply -f https://raw.githubusercontent.com/kumahq/kuma-counter-demo/master/demo.yaml
	@echo ""
	
