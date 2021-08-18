#!/usr/bin/env bash

# regular paid user
kubectl create secret generic user1-apikey --from-literal=kongCredType=key-auth --from-literal=key=please🙏

# Chuck norris, nuff said!
kubectl create secret generic chuck-apikey --from-literal=kongCredType=key-auth --from-literal=key=roundhouse-kick
