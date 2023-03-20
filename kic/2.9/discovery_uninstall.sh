#!/usr/bin/env bash
. $(dirname "$0")./../common/colors.sh

export GATEWAY_RELEASE_NAME=gateway
export CONTROLLER_RELEASE_NAME=controller
export KONG_NAMESPACE=kic

echo -e "$BLUE\n=== ☸️ $BOLD Uninstalling Releases $NOCOLOR $BLUE===\n$NOCOLOR"
tput -Txterm bold
set -x
helm delete ${GATEWAY_RELEASE_NAME} -n ${KONG_NAMESPACE}
helm delete ${CONTROLLER_RELEASE_NAME} -n ${KONG_NAMESPACE}
set +x
tput -Txterm sgr0
