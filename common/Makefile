# define standard colors
ifneq (,$(findstring xterm,${TERM}))
	BLACK        := $(shell tput -Txterm setaf 0)
	RED          := $(shell tput -Txterm setaf 1)
	GREEN        := $(shell tput -Txterm setaf 2)
	YELLOW       := $(shell tput -Txterm setaf 3)
	LIGHTPURPLE  := $(shell tput -Txterm setaf 4)
	PURPLE       := $(shell tput -Txterm setaf 5)
	BLUE		:= $(shell tput -Txterm setaf 6)
	WHITE		:= $(shell tput -Txterm setaf 7)
	RESET		:= $(shell tput -Txterm sgr0)
	ITALIC		:= $(shell tput -Txterm sitm)
	BOLD		:= $(shell tput -Txterm bold)
else
	BLACK        := ""
	RED          := ""
	GREEN        := ""
	YELLOW       := ""
	LIGHTPURPLE  := ""
	PURPLE       := ""
	BLUE         := ""
	WHITE        := ""
	RESET        := ""
endif

colors: ## show all the colors
	@echo "${BLACK}BLACK${RESET}"
	@echo "${RED}RED${RESET}"
	@echo "${GREEN}GREEN${RESET}"
	@echo "${YELLOW}YELLOW${RESET}"
	@echo "${LIGHTPURPLE}LIGHTPURPLE${RESET}"
	@echo "${PURPLE}PURPLE${RESET}"
	@echo "${BLUE}BLUE${RESET}"
	@echo "${WHITE}WHITE${RESET}"
	@echo "${ITALIC}ITALIC${ITALIC}"
	@echo "${BOLD}BOLD${BOLD}"

echo_fail = printf "\e[31m✘ \033\e[0m$(1)\n"
echo_pass = printf "\e[32m✔ \033\e[0m$(1)\n"
echo_stdout_header = printf "\n+++++++++++++ $(1)\n"
echo_stdout_footer = printf "+++++++++++++ $(1)\n"
echo_stdout_footer_pass = printf "\e[32m✔ \033\e[0m ========= $(1) \n"

check-dependency = $(if $(shell command -v $(1)),$(call echo_pass,found $(1)),$(call echo_fail,$(1) not installed);exit 1)

check-var-defined = $(if $(strip $($1)),,$(error "$1" is not defined))

define print-prompt =
printf "\e[96m➜ \e[0m"
endef

define print-header =
printf "\n%-50s\n" $1 | tr ' ~' '- '
endef

check-dependencies:
	@$(call check-dependency,curl)
	@$(call check-dependency,kubectl)
	@$(call check-dependency,jq)
	@$(call check-dependency,envsubst)
	@$(call check-dependency,kumactl)
	@$(call check-dependency,helm)
	@echo ""

check-grpc-dependencies:
	@$(call check-dependency,kubectl)
	@$(call check-dependency,jq)
	@$(call check-dependency,grpcurl)
	@echo ""

brew-install-dependencies:
	brew bundle
