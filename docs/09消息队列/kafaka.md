
> **Kafka**和**Mysql**相比，都是需要
>
> * 先下载安装对应的包
> * 接着可以直接命令行调用
> * 也可以通过python、java这样的编程语言来调用
> * 都存在地址接口的概念，localhost:9092指的是本机地址的9092端口
> * 如果你想调用Docker里的端口，要提前通过--expose 暴露出这个端口
> * 如果你想调用服务器的kafka或者mysql，得填服务器的ip+端口

## kafka

### Kafka的应用场景

* 异步处理

  * 可以将一些比较耗时的操作放在其他系统中，通过消息队列将需要进行处理的消息进行存储，其他系统可以消费消息队列中的数据
  * 比较常见的：发送短信验证码、发送邮件
* 系统解耦

  * 原先一个微服务是通过接口（HTTP）调用另一个微服务，这时候耦合很严重，只要接口发生变化就会导致系统不可用
  * 使用消息队列可以将系统进行解耦合，现在第一个微服务可以将消息放入到消息队列中，另一个微服务可以从消息队列中把消息取出来进行处理。进行系统解耦
* 流量削峰

  * 因为消息队列是低延迟、高可靠、高吞吐的，可以应对大量并发
* 日志处理

  * 可以使用消息队列作为临时存储，或者一种通信管道

### Kafka消息队列的两种模型

* 生产者、消费者模型
  * 生产者负责将消息生产到MQ中
  * 消费者负责从MQ中获取消息
  * 生产者和消费者是解耦的，可能是生产者一个程序、消费者是另外一个程序
* 消息队列的模式
  * 点对点：一个消费者消费一个消息
  * 发布订阅：多个消费者可以消费一个消息

### Kafka中的重要概念

* broker
  * Kafka服务器进程，生产者、消费者都要连接broker
  * 一个集群由多个broker组成，功能实现Kafka集群的负载均衡、容错
* producer：生产者，用于生产数据，可将生产后的消息送入指定的Topic；
* consumer：消费者，获取数据，可消费指定的Topic；
* topic：一组消息数据的标记符，一个Kafka集群中，可以包含多个topic。一个topic可以包含多个分区
  * 是一个逻辑结构，生产、消费消息都需要指定topic
* partition：分区，Kafka集群的分布式就是由分区来实现的。一个topic中的消息可以分布在topic中的不同partition中，为了保证kafka的吞吐量，一个Topic可以设置多个分区。同一分区只能被一个消费者订阅。
* replica：副本，实现Kafkaf集群的容错，实现partition的容错。一个topic至少应该包含大于1个的副本
* consumer group：消费者组，一个消费者组中的消费者可以共同消费topic中的分区数据。每一个消费者组都一个唯一的名字。配置group.id一样的消费者是属于同一个组中，同一个group可以有多个消费者，一条消息在一个group中，只会被一个消费者获取；
* offset：偏移量。相对消费者、partition来说，可以通过offset来拉取数据

#### 消费者组

* 一个消费者组中可以包含多个消费者，共同来消费topic中的数据
* 一个topic中如果只有一个分区，那么这个分区只能被某个组中的一个消费者消费
* 有多少个分区，那么就可以被同一个组内的多少个消费者消费

### Kafka集群搭建

* Kafka集群是必须要有ZooKeeper的

注意：

* 每一个Kafka的节点都需要修改**broker. id**（每个节点的标识，不能重复）
* log.dir数据存储目录需要配置

#### Kafka的生产者/消费者/工具

* 安装Kafka集群，可以测试以下
  * 创建一个topic主题（消息都是存放在topic中，类似mysql建表的过程）
  * 基于kafka的内置测试生产者脚本来读取标准输入（键盘输入）的数据，并放入到topic中
  * 基于kafka的内置测试消费者脚本来消费topic中的数据
* 推荐大家开发的使用Kafka Tool
  * 浏览Kafka集群节点、多少个topic、多少个分区
  * 创建topic/删除topic
  * 浏览ZooKeeper中的数据

#### 本地安装与启动（基于Docker）

##### 1.下载zookeeper镜像与kafka镜像

```language
docker pull wurstmeister/zookeeper
docker pull wurstmeister/kafka
```

##### 2.本地启动zookeeper

```language
docker run -d --name zookeeper -p 2181:2181 -t wurstmeister/zookeeper  
```

##### 3. 本地启动kafka

```language
docker run -d --name kafka --publish 9092:9092 --link zookeeper --env KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 --env KAFKA_ADVERTISED_HOST_NAME=localhost --env KAFKA_ADVERTISED_PORT=9092  wurstmeister/kafka:latest
```

注意：上述代码，将kafka启动在9092端口

##### 4. 进入kafka bash

```language
docker exec -it kafka bash
cd /opt/kafka/bin
```

##### 5. 创建Topic，分区为2，Topic name为'kafka_demo'

```language
kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 2 --topic kafka_demo
```

##### 6. 查看当前所有topic

```language
kafka-topics.sh --zookeeper zookeeper:2181 --list
```

##### 7. 本地安装kafka-python

```language
pip install kafka-python
```

##### Docker中kafka的topic增删改查命令汇总

* 增

```language
创建Topic：
分区为2，Topic name为'kafka_demo'

kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 2 --topic kafka_demo

增加分区：
通过--alter修改主题的分区数，增加分区。通过命令行工具操作，主题的分区只能增加，不能减少。否则报错。

kafka-topics.sh --zookeeper  zookeeper:2181 --alter --topic myTop1 -- partitions 2
```

* 删

```language
删除：
名为kafka_demo的主题

kafka-topics.sh  --delete --zookeeper  zookeeper:2181   --topic  kafka_demo
```

* 改

```language
kafka-topics.sh --zookeeper zookeeper:2181 --create --topic topic_test_01 --partitions 2 --replication-factor 1

kafka-topics.sh --zookeeper zookeeper:2181 --alter --topic topic_test_01 --config max.message.bytes=1048576

kafka-topics.sh --zookeeper zookeeper:2181 --describe --topic topic_test_01

kafka-topics.sh --zookeeper zookeeper:2181 --alter --topic topic_test_01 --config segment.bytes=10485760

kafka-topics.sh --zookeeper zookeeper:2181 --alter --delete-config max.message.bytes --topic topic_test_01
```

* 查

```language
查看
当前所有topic

kafka-topics.sh --zookeeper zookeeper:2181 --list

查看
当前所有topic详情

kafka-topics.sh --zookeeper zookeeper:2181 --describe
```

### Kafka幂等性

* 生产者消息重复问题

  * Kafka生产者生产消息到partition，如果直接发送消息，kafka会将消息保存到分区中，但Kafka会返回一个ack给生产者，表示当前操作是否成功，是否已经保存了这条消息。如果ack响应的过程失败了，此时生产者会重试，继续发送没有发送成功的消息，Kafka又会保存一条一模一样的消息
* 在Kafka中可以开启幂等性

  * 当Kafka的生产者生产消息时，会增加一个pid（生产者的唯一编号）和sequence number（针对消息的一个递增序列）
  * 发送消息，会连着pid和sequence number一块发送
  * kafka接收到消息，会将消息和pid、sequence number一并保存下来
  * 如果ack响应失败，生产者重试，再次发送消息时，Kafka会根据pid、sequence number是否需要再保存一条消息
  * 判断条件：生产者发送过来的sequence number 是否小于等于 partition中消息对应的sequence

### Kafka中的分区副本机制

#### 生产者的分区写入策略

* 轮询（按照消息尽量保证每个分区的负载）策略，消息会均匀地分布到每个partition
  * 写入消息的时候，key为null的时候，默认使用的是轮询策略
* 随机策略（不使用）
* 按key写入策略，key.hash() % 分区的数量
* 自定义分区策略（类似于MapReduce指定分区）

> 乱序问题
>
> * 在Kafka中生产者是有写入策略，如果topic有多个分区，就会将数据分散在不同的partition中存储
> * 当partition数量大于1的时候，数据（消息）会打散分布在不同的partition中
> * 如果只有一个分区，消息是有序的

#### 消费组Consumer Group Rebalance机制

* 再均衡：在某些情况下，消费者组中的消费者消费的分区会产生变化，会导致消费者分配不均匀（例如：有两个消费者消费3个，因为某个partition崩溃了，还有一个消费者当前没有分区要削峰），Kafka Consumer Group就会启用rebalance机制，重新平衡这个Consumer Group内的消费者消费的分区分配。
* 触发时机
  * 消费者数量发生变化
    * 某个消费者crash
    * 新增消费者
  * topic的数量发生变化
    * 某个topic被删除
  * partition的数量发生变化
    * 删除partition
    * 新增partition
* 不良影响
  * 发生rebalance，所有的consumer将不再工作，共同来参与再均衡，直到每个消费者都已经被成功分配所需要消费的分区为止（rebalance结束）

#### 消费者的分区分配策略

分区分配策略：保障每个消费者尽量能够均衡地消费分区的数据，不能出现某个消费者消费分区的数量特别多，某个消费者消费的分区特别少

* Range分配策略（范围分配策略）：Kafka默认的分配策略
  * n：分区的数量 / 消费者数量
  * m：分区的数量 % 消费者数量
  * 前m个消费者消费n+1个分区
  * 剩余的消费者消费n个分区
* RoundRobin分配策略（轮询分配策略）
  * 消费者挨个分配消费的分区
* Striky粘性分配策略
  * 在没有发生rebalance跟轮询分配策略是一致的
  * 发生了rebalance，轮询分配策略，重新走一遍轮询分配的过程。而粘性会保证跟上一次的尽量一致，只是将新的需要分配的分区，均匀的分配到现有可用的消费者中即可
  * 减少上下文的切换

#### 副本的ACK机制

producer是不断地往Kafka中写入数据，写入数据会有一个返回结果，表示是否写入成功。这里对应有一个ACKs的配置。

* acks = 0：生产者只管写入，不管是否写入成功，可能会数据丢失。性能是最好的
* acks = 1：生产者会等到leader分区写入成功后，返回成功，接着发送下一条
* acks = -1/all：确保消息写入到leader分区、还确保消息写入到对应副本都成功后，接着发送下一条，性能是最差的

根据业务情况来选择ack机制，是要求性能最高，一部分数据丢失影响不大，可以选择0/1。如果要求数据一定不能丢失，就得配置为-1/all。

分区中是有leader和follower的概念，为了确保消费者消费的数据是一致的，只能从分区leader去读写消息，follower做的事情就是同步数据，Backup。

#### 高级API（High-Level API）、低级API（Low-Level API）

* 高级API就是直接让Kafka帮助管理、处理分配、数据
  * offset存储在ZK中
  * 由kafka的rebalance来控制消费者分配的分区
  * 开发起来比较简单，无需开发者关注底层细节
  * 无法做到细粒度的控制
* 低级API：由编写的程序自己控制逻辑
  * 自己来管理Offset，可以将offset存储在ZK、MySQL、Redis、HBase、Flink的状态存储
  * 指定消费者拉取某个分区的数据
  * 可以做到细粒度的控制
  * 原有的Kafka的策略会失效，需要我们自己来实现消费机制

### Kafka原理

#### leader和follower

* Kafka中的leader和follower是相对分区有意义，不是相对broker
* Kafka在创建topic的时候，会尽量分配分区的leader在不同的broker中，其实就是负载均衡
* leader职责：读写数据
* follower职责：同步数据、参与选举（leader crash之后，会选举一个follower重新成为分区的leader
* 注意和ZooKeeper区分
  * ZK的leader负责读、写，follower可以读取
  * Kafka的leader负责读写、follower不能读写数据（确保每个消费者消费的数据是一致的），Kafka一个topic有多个分区leader，一样可以实现数据操作的负载均衡

#### AR\ISR\OSR

* AR表示一个topic下的所有副本
* ISR：In Sync Replicas，正在同步的副本（可以理解为当前有几个follower是存活的）
* OSR：Out of Sync Replicas，不再同步的副本
* AR = ISR + OSR

#### leader选举

* Controller：controller是kafka集群的老大，是针对Broker的一个角色

  * Controller是高可用的，是用过ZK来进行选举
* Leader：是针对partition的一个角色

  * Leader是通过ISR来进行快速选举
* 如果Kafka是基于ZK来进行选举，ZK的压力可能会比较大。例如：某个节点崩溃，这个节点上不仅仅只有一个leader，是有不少的leader需要选举。通过ISR快速进行选举。
* leader的负载均衡

  * 如果某个broker crash之后，就可能会导致partition的leader分布不均匀，就是一个broker上存在一个topic下不同partition的leader
  * 通过以下指令，可以将leader分配到优先的leader对应的broker，确保leader是均匀分配的

  ```shell
  bin/kafka-leader-election.sh --bootstrap-server node1.itcast.cn:9092 --topic test --partition=2 --election-type preferred
  ```

#### Kafka读写流程

* 写流程
  * 通过ZooKeeper找partition对应的leader，leader是负责写的
  * producer开始写入数据
  * ISR里面的follower开始同步数据，并返回给leader ACK
  * 返回给producer ACK
* 读流程
  * 通过ZooKeeper找partition对应的leader，leader是负责读的
  * 通过ZooKeeper找到消费者对应的offset
  * 然后开始从offset往后顺序拉取数据
  * 提交offset（自动提交——每隔多少秒提交一次offset、手动提交——放入到事务中提交）

#### Kafka的物理存储

* Kafka的数据组织结构
  * topic
  * partition
  * segment
    * .log数据文件
    * .index（稀疏索引）
    * .timeindex（根据时间做的索引）
* 深入了解读数据的流程
  * 消费者的offset是一个针对partition全局offset
  * 可以根据这个offset找到segment段
  * 接着需要将全局的offset转换成segment的局部offset
  * 根据局部的offset，就可以从（.index稀疏索引）找到对应的数据位置
  * 开始顺序读取

#### 消息传递的语义性

Flink里面有对应的每种不同机制的保证，提供Exactly-Once保障（二阶段事务提交方式）

* At-most once：最多一次（只管把数据消费到，不管有没有成功，可能会有数据丢失）
* At-least once：最少一次（有可能会出现重复消费）
* Exactly-Once：仅有一次（事务性性的保障，保证消息有且仅被处理一次）

#### Kafka的消息不丢失

* broker消息不丢失：因为有副本relicas的存在，会不断地从leader中同步副本，所以，一个broker crash，不会导致数据丢失，除非是只有一个副本。
* 生产者消息不丢失：ACK机制（配置成ALL/-1）、配置0或者1有可能会存在丢失
* 消费者消费不丢失：重点控制offset
  * At-least once：一种数据可能会重复消费
  * Exactly-Once：仅被一次消费

#### 数据积压

* 数据积压指的是消费者因为有一些外部的IO、一些比较耗时的操作（Full GC——Stop the world），就会造成消息在partition中一直存在得不到消费，就会产生数据积压
* 在企业中，我们要有监控系统，如果出现这种情况，需要尽快处理。虽然后续的Spark Streaming/Flink可以实现背压机制，但是数据累积太多一定对实时系统它的实时性是有说影响的

#### 数据清理&配额限速

* 数据清理
  * Log Deletion（日志删除）：如果消息达到一定的条件（时间、日志大小、offset大小），Kafka就会自动将日志设置为待删除（segment端的后缀名会以 .delete结尾），日志管理程序会定期清理这些日志
    * 默认是7天过期
  * Log Compaction（日志合并）
    * 如果在一些key-value数据中，一个key可以对应多个不同版本的value
    * 经过日志合并，就会只保留最新的一个版本
* 配额限速
  * 可以限制Producer、Consumer的速率
  * 防止Kafka的速度过快，占用整个服务器（broker）的所有IO资源
