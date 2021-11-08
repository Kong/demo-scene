echo_fail = printf "\e[31m✘ \033\e[0m$(1)\n"
echo_pass = printf "\e[32m✔ \033\e[0m$(1)\n"
echo_stdout_header = printf "\n========= $(1) \n"
echo_stdout_footer = printf "+++++++++++++ $(1)\n"
echo_stdout_footer_pass = printf "\e[32m✔ \033\e[0m ========= $(1) \n"

check-dependency = $(if $(shell command -v $(1)),$(call echo_pass,found $(1)),$(call echo_fail,$(1) not installed);exit 1)

install-kong: check-dependencies
	@$(call echo_stdout_header, 🦍 Installing Kong in kong namespace)
	helm install kong kong/kong -n kong

upgrade-kong: check-dependencies
	@$(call echo_stdout_header, 🦍 Upgrading Kong in kong namespace using values.yaml)
	helm upgrade kong kong/kong -n kong -f values.yaml

delete-kong: check-dependencies
	@$(call echo_stdout_header, 🦍 deleting kong release)
	helm del kong -n kong

netcat-quote: IP =  $(shell kubectl get service -n kong kong-kong-udp-proxy -ojson | jq -r '.status.loadBalancer.ingress[].ip') 
netcat-quote: 
	@echo "Press enter"
	ncat -u ${IP} 9999

check-dependencies:
	@$(call check-dependency,kubectl)
	@$(call check-dependency,helm)
	@$(call check-dependency,ncat)
	@$(call check-dependency,jq)
