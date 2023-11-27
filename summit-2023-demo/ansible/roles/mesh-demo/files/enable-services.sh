#!/usr/bin/env bash

sudo cp ~/kuma-cp/cpTokenFile /etc/kong-mesh/cp-token

echo "==> Enabling Transparent Proxy"
sudo su -c "kumactl install transparent-proxy \
      --kuma-dp-user kuma-dp \
      --exclude-outbound-udp-ports-for-uids=53:0 \
      --exclude-outbound-tcp-ports-for-uids=80:0 \
      --exclude-outbound-tcp-ports-for-uids=443:0 \
      --exclude-inbound-ports 22 \
      --skip-dns-conntrack-zone-split --vnet docker0:172.17.0.1/16 \
      --redirect-dns 2>&1 >/dev/null"

echo "==> Starting Kuma CP"
sudo systemctl restart kuma-cp
sleep 3

echo "==> Starting Kuma DP"
kumactl generate dataplane-token \
  --name demo-dp \
  --mesh default \
  --valid-for 8760h | sudo tee /etc/kong-mesh/dp-token > /dev/null
sudo systemctl restart kuma-dp

echo "==> Starting Kuma Zone Ingress"
sudo systemctl restart kuma-zone-ingress

echo "==> Done ✅"