# Kafka Kuma

Example Kafka cluster on top of [Kuma](https://kuma.io).

The main setup complexity is using VirtualOutbound to get VIPs for individual pods (see [00-kuma.yaml](k8s/00-kuma.yaml)).
Once you have individual vips/hostnames you can set up advertised listeners and bootstrap quite easily.

We have 2 different setups of kafka:

- [`01-kraft-kafka.yaml`](k8s/01-kraft-kafka.yaml) which starts the statefulset `cluster1` which is kafka without zookeeper.
- [`03-zk-kafka.yaml`](k8s/03-zk-kafka.yaml) which starts the statefulset `cluster2` which is kafka with zookeeper.

## Usage

If you already have a k8s cluster with Kuma running just do: `kubectl apply -k k8s`
If you want to start an example cluster on GCP and install Kuma use: `curl -ls https://raw.githubusercontent.com/kumahq/kuma-tools/master/gcloud_standalone.sh | bash -`

Once everything is running (It's all in the namespace `kafka`).

You can look at the consumers receiving data:

For the cluster without zookeeper:

```shell
kubectl logs -n kafka -l app=cluster1-consumer  -f
{"timestamp":1696262103287,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":269}],"success":true}
{"timestamp":1696262103786,"name":"record_data","key":null,"value":"266","topic":"verifiable","partition":2,"offset":269}
{"timestamp":1696262103786,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":269,"maxOffset":269}]}
{"timestamp":1696262103788,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":270}],"success":true}
{"timestamp":1696262104286,"name":"record_data","key":null,"value":"267","topic":"verifiable","partition":2,"offset":270}
{"timestamp":1696262104286,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":270,"maxOffset":270}]}
{"timestamp":1696262104288,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":271}],"success":true}
{"timestamp":1696262104786,"name":"record_data","key":null,"value":"268","topic":"verifiable","partition":2,"offset":271}
{"timestamp":1696262104787,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":271,"maxOffset":271}]}
{"timestamp":1696262104789,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":272}],"success":true}
{"timestamp":1696262103258,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":267}],"success":true}
{"timestamp":1696262103756,"name":"record_data","key":null,"value":"270","topic":"verifiable","partition":1,"offset":267}
{"timestamp":1696262103756,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":267,"maxOffset":267}]}
{"timestamp":1696262103759,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":268}],"success":true}
{"timestamp":1696262104257,"name":"record_data","key":null,"value":"271","topic":"verifiable","partition":1,"offset":268}
{"timestamp":1696262104257,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":268,"maxOffset":268}]}
{"timestamp":1696262104260,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":269}],"success":true}
{"timestamp":1696262104757,"name":"record_data","key":null,"value":"272","topic":"verifiable","partition":1,"offset":269}
{"timestamp":1696262104757,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":269,"maxOffset":269}]}
{"timestamp":1696262104760,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":270}],"success":true}
{"timestamp":1696262105258,"name":"record_data","key":null,"value":"273","topic":"verifiable","partition":1,"offset":270}
{"timestamp":1696262105258,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":270,"maxOffset":270}]}
{"timestamp":1696262105260,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":271}],"success":true}
{"timestamp":1696262105287,"name":"record_data","key":null,"value":"269","topic":"verifiable","partition":2,"offset":272}
{"timestamp":1696262105287,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":272,"maxOffset":272}]}
{"timestamp":1696262105289,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":273}],"success":true}
{"timestamp":1696262105759,"name":"record_data","key":null,"value":"274","topic":"verifiable","partition":1,"offset":271}
{"timestamp":1696262105759,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":271,"maxOffset":271}]}
{"timestamp":1696262105761,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":272}],"success":true}
{"timestamp":1696262105788,"name":"record_data","key":null,"value":"270","topic":"verifiable","partition":2,"offset":273}
{"timestamp":1696262105788,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":273,"maxOffset":273}]}
{"timestamp":1696262105790,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":274}],"success":true}
```


For the cluster with zookeeper:

```shell
kubectl logs -n kafka -l app=cluster2-consumer  -f
{"timestamp":1696262202440,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":0,"offset":125}],"success":true}
{"timestamp":1696262202668,"name":"record_data","key":null,"value":"466","topic":"verifiable","partition":1,"offset":124}
{"timestamp":1696262202668,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":124,"maxOffset":124}]}
{"timestamp":1696262202670,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":125}],"success":true}
{"timestamp":1696262202939,"name":"record_data","key":null,"value":"464","topic":"verifiable","partition":0,"offset":125}
{"timestamp":1696262202939,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":0,"count":1,"minOffset":125,"maxOffset":125}]}
{"timestamp":1696262202941,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":0,"offset":126}],"success":true}
{"timestamp":1696262203169,"name":"record_data","key":null,"value":"467","topic":"verifiable","partition":1,"offset":125}
{"timestamp":1696262203169,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":125,"maxOffset":125}]}
{"timestamp":1696262203170,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":126}],"success":true}
{"timestamp":1696262139398,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":3,"offset":337}],"success":true}
{"timestamp":1696262139625,"name":"record_data","key":null,"value":"340","topic":"verifiable","partition":2,"offset":339}
{"timestamp":1696262139625,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":339,"maxOffset":339}]}
{"timestamp":1696262139627,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":340}],"success":true}
{"timestamp":1696262139896,"name":"record_data","key":null,"value":"338","topic":"verifiable","partition":3,"offset":337}
{"timestamp":1696262139896,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":3,"count":1,"minOffset":337,"maxOffset":337}]}
{"timestamp":1696262139897,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":3,"offset":338}],"success":true}
{"timestamp":1696262140126,"name":"record_data","key":null,"value":"341","topic":"verifiable","partition":2,"offset":340}
{"timestamp":1696262140126,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":2,"count":1,"minOffset":340,"maxOffset":340}]}
{"timestamp":1696262140127,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":2,"offset":341}],"success":true}
{"timestamp":1696262203439,"name":"record_data","key":null,"value":"465","topic":"verifiable","partition":0,"offset":126}
{"timestamp":1696262203439,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":0,"count":1,"minOffset":126,"maxOffset":126}]}
{"timestamp":1696262203441,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":0,"offset":127}],"success":true}
{"timestamp":1696262203669,"name":"record_data","key":null,"value":"468","topic":"verifiable","partition":1,"offset":126}
{"timestamp":1696262203669,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":126,"maxOffset":126}]}
{"timestamp":1696262203671,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":127}],"success":true}
{"timestamp":1696262203940,"name":"record_data","key":null,"value":"466","topic":"verifiable","partition":0,"offset":127}
{"timestamp":1696262203940,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":0,"count":1,"minOffset":127,"maxOffset":127}]}
{"timestamp":1696262203942,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":0,"offset":128}],"success":true}
{"timestamp":1696262204169,"name":"record_data","key":null,"value":"469","topic":"verifiable","partition":1,"offset":127}
{"timestamp":1696262204169,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":127,"maxOffset":127}]}
{"timestamp":1696262204171,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":128}],"success":true}
{"timestamp":1696262204440,"name":"record_data","key":null,"value":"467","topic":"verifiable","partition":0,"offset":128}
{"timestamp":1696262204440,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":0,"count":1,"minOffset":128,"maxOffset":128}]}
{"timestamp":1696262204442,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":0,"offset":129}],"success":true}
{"timestamp":1696262204670,"name":"record_data","key":null,"value":"470","topic":"verifiable","partition":1,"offset":128}
{"timestamp":1696262204670,"name":"records_consumed","count":1,"partitions":[{"topic":"verifiable","partition":1,"count":1,"minOffset":128,"maxOffset":128}]}
{"timestamp":1696262204672,"name":"offsets_committed","offsets":[{"topic":"verifiable","partition":1,"offset":129}],"success":true}
```

## Understanding the virtualOutbounds

Look at [`00-kuma.yaml`](k8s/00-kuma.yaml) for detailed explanation of each virtual outbound.
