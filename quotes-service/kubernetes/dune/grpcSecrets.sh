#!/usr/bin/env bash

openssl req -x509 -nodes -subj "/CN=gamov.dev" -newkey rsa:4096 -sha256 -keyout server.key -out server.crt -days 3650

kubectl create secret generic grpc-cert-chain --from-file=server.crt=server.crt
kubectl create secret generic grpc-pk --from-file=server.key=server.key