THIS_MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
THIS_MKFILE_DIR := $(dir $(THIS_MKFILE_PATH))

echo_fail = printf "\e[31m✘ \033\e[0m$(1)\n"
echo_pass = printf "\e[32m✔ \033\e[0m$(1)\n"
echo_stdout_header = printf "\n+++++++++++++ $(1)\n"
echo_stdout_footer = printf "+++++++++++++ $(1)\n"
echo_stdout_footer_pass = printf "\e[32m✔ \033\e[0m ========= $(1) \n"

check-dependency = $(if $(shell command -v $(1)),$(call echo_pass,found $(1)),$(call echo_fail,$(1) not installed);exit 1)

kong-postgres: check-dependencies
	docker-compose --file ./postgres/docker-compose.yaml up -d

kong-dbless: check-dependencies	
	docker-compose --file ./dbless/docker-compose.yaml up -d
 	
clean:
	cd ./dbless && docker-compose kill && docker-compose rm -f
	cd ./postgres && docker-compose kill && docker-compose rm -f
	docker ps -aq | xargs docker rm

check-dependencies:
	@$(call check-dependency,docker)
	@$(call check-dependency,docker compose)
	@$(call check-dependency,http)
