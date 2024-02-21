# Multizone zookeeper

## Requirements

- 1 global cluster, 3 zone clusters
  - Each zone has ingress enabled
- mTLS enabled `default` `Mesh`

* `virtual-outbound.yaml` applied on the global cluster
* Each `zk-*.yaml` should be applied on the corresponding zone cluster

For sidecar debug logging, requires at least commit
`14f82250b3e0e00da1e9107211d2c8cd947de82e`.
Each Zookeeper `kuma-sidecar` will have Envoy's `config` and `connection`
components logging on debug (via the `kuma.io/envoy-component-log-level`
`Pod` annotation)

## Explanation

The `pod-index` label and the `VirtualOutbound` gives each `Pod`
its stable, cross-zone identity.
Note, this means that it will only work as is when `StatefulSet.spec.replicas: 1`
