#!/bin/bash

action=${1}
app=${2}


if [[ ${action} == "heal" ]]; then
  cmd='curl localhost:8080/api/dynamic | jq ".apis[0].conf | .statuses=[]" | curl -v localhost:8080/api/dynamic/microservice_mesh  --data-binary @- -H "Content-Type: application/json"'
elif [[ "${action}" == "break" ]]; then
  cmd='curl localhost:8080/api/dynamic | jq ".apis[0].conf | .statuses=[{\"code\": \"500\", \"ratio\": 100000}]" | curl -v localhost:8080/api/dynamic/microservice_mesh  --data-binary @- -H "Content-Type: application/json"'
else
  echo "invalid options ${1} ${2}"
  exit 1
fi

kubectl debug -n microservice-mesh "$(kubectl get pods -n microservice-mesh -l app="${app}" -o name | head -1)"  -it --image=nicolaka/netshoot -- /bin/bash -c "${cmd}"
