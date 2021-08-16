#!/usr/bin/env bash

for n in 'plugins' 'clusterplugins' 'consumers' 'ingresses'; do
  kubectl get crds kong${n}.configuration.konghq.com -oyaml >kong${n}.yaml
done
