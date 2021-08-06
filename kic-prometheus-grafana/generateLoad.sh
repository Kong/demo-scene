#!/usr/bin/env bash

# usage: ./generateLoad.sh kong.gamov.dev

HOST=$1
while true;
do
  curl "${HOST}"/billing/status/200
  curl "${HOST}"/billing/status/501
  curl "${HOST}"/invoice/status/201
  curl "${HOST}"/invoice/status/404
  curl "${HOST}"/comments/status/200
  curl "${HOST}"/comments/status/200
  sleep 0.01
done
