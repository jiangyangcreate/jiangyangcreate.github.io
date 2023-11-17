---
sidebar_position: 1
title: 不同的数据库概述
---

# 不同的数据库

数据库是结构化信息或数据的有序集合，通常以电子形式存储在计算机系统中。它通常由数据库管理系统（DBMS）控制。实际上，数据、DBMS 和相关应用程序统称为数据库系统，通常简称为数据库。

## 关系型数据库(MySQL)

[mysql官网](https://dev.mysql.com/)

[阿里云SQL入门](https://edu.aliyun.com/lesson_153_1911?spm=5176.10731542.0.0.7a7250d7QVLjmc#_1911)

[菜鸟教程python与sql](https://www.runoob.com/python/python-mysql.html)

注意：【数据库】在不同的语境下代表的含义是不同的
数据库 = N个table
table = 表结构+表记录

## 针对databases的增删改查

```mysql -u root -p #链接root用户至服务器

create user username identified by 'password'; 增加用户
create user testuser identified by 'test123'; 示例1

use mysql;# 使用mysql 数据库
update user set host='%' where user='testuser';# 指定用户的授权
grant all privileges on *.* to testuser@'%';# 指定用户的授权
show grants for 'testuser';#查看权限

show databases;#查看数据库【databases复数】
create database name; #创建名为name的数据库
drop database name; #删除名为name的数据库
```

### 针对table的增删改查

```language
#创建
use name #选中name数据库
create table tablename( 
id bigint(20),
ip varchar(255)
); #创建名为tablename的表单

#删除
create table tablename #删除一个table

#修改
alter table [tablename] rename [newname]#修改table名

show tables;#显示当前数据库所有表单
describe tablename ;#查询表结构
select * from tablename ;#查询表数据
select colnamel,colname2 from tablename;#查询表的指定列
```

### 针对列的增删改查

```language
#增加
alter table [tablename] add [c1] [datatype][no null][default];#增加表的列
alter table tablename add c1 int(11) null; #示例1
alter table tablename add c2 int(11) not null default 1;#示例2

#删除
alter table [tablename] drop [c1];#删除表的列

#修改
alter table [tablename] change [oldcloumname][newcloumname][datatype];#修改列的信息
alter table tablename change c1 c100 int(11);#示例1
alter table tablename change c1 c1 varchar(255);#示例2

#查询
describe tablename ;#查询表结构
select * from tablename ;#查询表数据
select colnamel from tablename;         #查询表的指定单列
select colnamel,colname2 from tablename;#查询表的指定多列
```

### 针对行的增改查

```language
#插入
insert into【table name】 values(值1,值2,值3);#插入数据数量必须和列数一致
insert into employee values(1,1,1,1,1);#示例1
insert into【table name】(列1,列2) values(值1,值2）#数据插入指定列

#插入命令insert和查询命令select的组合使用【插入与被插入的数据类型需一致】
insert into【被插入表名】select *from 【table name】[where等子句]..;#常用示例1
insert into【被插入表名】(列名) select (列名) from 【table name】[where等子句]..;#常用示例2

#删除
delete from 【table name】 where 条件;
delete from gc where id = 1; 示例

#修改updata
updata table_ name set colname = xxx[where子句];
updata gc set id = 1 where ip = 3;#示例1
updata gc set id = 1 , account = 1 where ip = 3; #示例2

### 针对行的进阶查找功能【筛选、排序】

#指定查找in
select * from tablename where colname in （value1,value12..）;
select * from gc where id in ('1','2');#示例1

select * from tablename where colname in （select from tablename）;
select * from gc where id in (select id from book where ip <4);示例

#筛选【多重筛选用and和or】
select * from table_ name where colname is null ;
select * from table name where colname is not null ;

select * from table name where colname like abc ;#模糊匹配1
select * from table name where colname not like abc ;#模糊匹配2
注释：abc 固定加单引号匹配格式分为 '%abc'、'abc%'、'%abc%'
select * from table name where colname not like '%abc';#示例1，模糊匹配以abc结尾的数据

select * from tablename where colname 【运算符】值 ;#注意，sql的等于就是单个=
select * from tablename where colname = '1' ;#示例，字符串需要加''
select * from tablename where colname != 1 ;#示例1
select * from tablename where colname between 1 and 3;#示例2，colname值在1和3之间
select * from tablename where colname not between 1 and 3;#示例3，colname值不在1和3之间

#多重筛选
select * from table_ name where colname is null and colname is not null or colname = '1' ;

#去重筛选
select distinct colnamel from tablename;#查询表的指定列【去重】
select distinct colnamel,colname2 from tablename;#查询表的指定列【去重】

#截取【横向】
select * from table_ name [where子句] [order子句] limit [offset,] colcount;
select * from table_ name order by id limit 0,2; #示例1
select * from table_ name order by id limit 2; # 示例2等价于示例1
select * from table_ name order by id limit 10,2; # 示例3，截取11、12行的数据

# 排序【默认asc升序】
select * from table_ name [where 子句] order by col_name [asc/desc]#1.按单一列名排序
select * from table_name [where 子句] order by col_name [asc/desc], col_name2[asc/desc]#2.按多列排序

#筛选+排序
select * from table_ name where colname is null order by col_name [asc/desc],col_name2[asc/desc]
```

补充：windows下python连接linux的mysql并且使用

- linux上成功安装mysql
- 授权mysql可以远程访问
  开放防火墙的端口号

```language
GRANT ALL PRIVILEGES ON *.* TO 【账号】@'%'  IDENTIFIED BY ‘【密码】’  WITH GRANT OPTION;
FLUSH   PRIVILEGES;

#开始编写代码测试

import Mysqldb as mysql
conn=mysql.connect(host=’192.168.142.111’,user=’root’,passwd=’1714****’,db=’dg’)
```

## 内存数据库(Redis)

内存：游戏和广告技术应用程序具有排行榜、会话存储和实时分析等使用案例，它们需要微秒响应时间并且可能随时出现大规模的流量高峰。

Redis使用简单的键值方法来存储数据。键值数据库将数据存储为键值对集合，其中键作为唯一标识符。键和值都可以是从简单对象到复杂复合对象的任何内容。键值数据库是高度可分区的，并且允许以其他类型的数据库无法实现的规模进行水平扩展。

### redis有哪些常用的数据类型？

key-String（String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是512M）

list是一个双向可读写的管道，其头部是左侧，尾部是右侧，一个列表最多可以包含2^32-1 （4294967295）个元素，下标 0 表示列表的第一个元素，可以使用负数下标，元素值可以重复

Set 是 String 类型的无序集合，集合中的成员是唯一的，这就意味着集合中不能出现重复的数据，可以 在两个不同的集合中对数据进行对比并取值，常用于取值判断，统计，交集等场景

sorted set有序集合，和集合一样也是string类型元素的集合,且不允许重复的成员，不同的是每个元素都会关 联一个double(双精度浮点型)类型的分数， redis正是通过该分数来为集合中的成员进行从小到大的排 序，有序集合的成员是唯一的,但分数(score)却可以重复，集合是通过哈希表实现的，所以添加，删 除，查找的复杂度都是O(1)， 集合中最大的成员数为 2^32 - 1 (4294967295, 每个集合可存储40多亿个 成员)，经常用于排行榜的场景。每个元素是由score和value组成：score 可以重复，value 不可以重复

hash 是一个string类型的字段(field)和值(value)的映射表， Redis 中每个 hash 可以存储 2^32 -1 键值对，类似于字典，存放了多个k/v 对， hash特别适合用于存储对象场景

- 哈希表，获取该表的全部数据和表中指定key的数据，分别对应的命令

```python
# 获取所有哈希表中的字段
hkeys key
#获取在哈希表中指定 key 的所有字段和值
hgetall key 
```

### 说几个你在项目中的应用场景

使用爬虫进行分任务爬取，对爬取到的文本、快照（截图）进行分任务保存。

- 为什么要用redis来做？

redis是基于内存存储计算，性能速读远超mysql等数据库，计算速度很快，所以在使用的时候数据响应很快。

### 持久化的存储方式有哪些？

AOF（append only file） 持久化，采用日志的形式来记录每个写操作，追加到AOF文件的末尾。
RDB持久化，是指在指定的时间间隔内，执行指定次数的写操作，将内存中的数据集快照写入磁盘中，它是Redis默认的持久化方式。执行完操作后，在指定目录下会生成一个dump.rdb文件，Redis 重启的时候，通过加载dump.rdb文件来恢复数据。

### 过期键的删除策略是怎样的？

目前来说有三种删除策略：

- 定时删除：在设置键的过期时间时，创建一个定时器，当到达键过期时间时通过定时器去删除键。
  优点是：对内存友好。因为通过定时器，当一个键到达过期时间时就会立马被删除，直接就释放了内存。
  缺点是：对 CPU 不友好。因为如果过期键比较多，那么删除这些过期键会占用相当一部分 CPU 时间，如果 CPU 时间非常紧张的话，还将 CPU 时间用在删除和当前任务无关的过期键上，会对服务器的响应时间以及吞吐量造成影响。

惰性删除：惰性删除并不是当到达过期时间时去删除，而是每次获取键时，会判断是否过期，如果过期则删除，并返回空；没过期，就返回键值。
优点：对 CPU 时间友好。程序只会在取出键时才会判断是否删除，并且只作用到当前键上，其他过期键不会花费 CPU 时间去处理。
缺点：对内存不友好。因为只有键被使用时才会去检查是否删除，如果有大量的键一直不被使用，那么这些键就算过期了也不会被删除，会一直占用着内存。这种可以理解为是一种内存泄漏——大量无用的数据一直占用着内存，并且不会被删除。

定期删除：每隔一段时间，就对数据库中的键进行检查，如果过期则删除。至于要删除多少什么时候删除，则是通过具体程序决定。
定期删除策略每隔一段时间执行一次删除过期键操作，并通过限制删除操作执行的时长和频率来减少删除操作对 CPU 时间的影响。
并且，通过定期删除过期键，有效的减少了过期键带来的内存浪费。
但删除的时长和频率比较难定义，因为：如果频率太高或者时长太长，那么会占用大量的 CPU 时长。如果过短又会出现内存浪费的情况。
因此。如果采用定期删除策略的话需要通过具体的业务场景来定义时长和频率。

## 文档数据库(MongoDB)

文档：在应用程序代码中，数据通常表示为对象或 JSON 文档，因为对开发人员而言它是高效和直观的数据模型。文档数据库让开发人员可以使用他们在其应用程序代码中使用的相同文档模型格式，更轻松地在数据库中存储和查询数据。文档和文档数据库的灵活、半结构化和层级性质允许它们随应用程序的需求而变化。文档模型可以很好地与目录、用户配置文件和内容管理系统配合使用，其中每个文档都是唯一的，并会随时间而变化。

文档数据库是一种非关系数据库，旨在将数据作为类 JSON 文档存储和查询。文档数据库让开发人员可以使用他们在其应用程序代码中使用的相同文档模型格式，更轻松地在数据库中存储和查询数据。文档和文档数据库的灵活、半结构化和层级性质允许它们随应用程序的需求而变化。文档模型可以很好地与目录、用户配置文件和内容管理系统等使用案例配合使用，其中每个文档都是唯一的，并会随时间而变化。文档数据库支持灵活的索引、强大的临时查询和文档集合分析。

## 图形数据库(Neo4j)

图形：图形数据库旨在轻松构建和运行与高度连接的数据集一起使用的应用程序。图形数据库的典型使用案例包括社交网络、推荐引擎、欺诈检测和知识图形。热门图形数据库包括 Neo4j 和 Giraph。图形数据库专门用于存储和导航关系。关系是图形数据库中的一等公民，图形数据库的大部分价值都源自于这些关系。图形数据库使用节点来存储数据实体，并使用边缘来存储实体之间的关系。边缘始终有一个开始节点、结束节点、类型和方向，并且边缘可以描述父子关系、操作、所有权等。一个节点可以拥有的关系的数量和类型没有限制。

图形数据库中的图形可依据具体的边缘类型进行遍历，或者也可对整个图形进行遍历。在图形数据库中，遍历联结或关系非常快，因为节点之间的关系不是在查询时计算的，而是留存在数据库中。在社交网络、推荐引擎和欺诈检测等使用案例中，您需要在数据之间创建关系并快速查询这些关系，此时，图形数据库更具优势。

### 图数据库如何表达数据？或者其建模方式

图数据库使用图模型来操作数据。目前使用的图模型有3种，分别是属性图（Property Graph）、资源描述框架（RDF）三元组和超图（HyperGraph）。现在较为知名的图数据库主要是基于属性图，更确切得说是带标签的属性图（Labeled-Property Graph），当然标签不是必须的。下面是使用带标签的属性图的Twitter用户关系。

![image.png](/2023/image-67f885c9379a4a52bab7f70c2a59d5c0.png)

属性图由顶点（圆圈）、边（箭头）、属性（key:value）和标签组成，顶点和边可以有标签，比如顶点的标签是User，边的标签是FOLLOWS。图中标签为User的顶点有name属性，属性值为Johan或Peter或Emil。边表示了他们的关注关系。图中标签为FOLLOWS的边是单向边，如果是相互关注了，那么需要2条边表示。

如果不算上标签，属性图自身的关系可以用下图表示：

![image.png](/2023/image-ef35361c0762476e8f3d0449e5657ea7.png)

### 为什么需要图数据库，相比关系型数据库等有什么优势？

因为关系型数据库不擅长处理数据之间的关系。我们举最经典的社交网络中查询的性能作为对比。

![image.png](/2023/image-42863140c5d348068a79e2af7e808793.png)

上图为一个社交网络，图中包括了朋友、同事、夫妻和恋人等多种关系。有人曾做过一个测试：在一个包含100w人，每人约有50个朋友的社交网络中找到最大深度为5的朋友的朋友。下图为图数据库Neo4J和关系型数据库在寻找扩展朋友时的性能对比。

![image.png](/2023/image-662929664fc64be8bd5d184898343e09.png)

从图中可以发现，深度为2时（即朋友的朋友），两种数据库性能相差不是很明显；深度为3时，很明显，关系型数据库的响应时间30s，已经变得不可接受了；深度到4时，关系数据库需要近半个小时才能返回结果，已经妄称在线数据处理系统了；深度到5时，关系型数据库已经掉入深渊。而对于图数据库Neo4J，深度从3到5，其响应时间均在3秒以内。

可以看出，对于图数据库来说，数据量越大，越复杂的关联查询，约有利于体现其优势。从深度为4/5的查询结果我们可以看出，图数据库返回了整个社交网络一半以上的人数。

### 除了性能好，图数据库还有其他优势吗？

除了很显而易见的性能优势外，灵活性和敏捷性也是图数据库相比关系型数据库的重要优势。图天生就是灵活可扩展的，可以对已存在的图结构增加新的边、节点、标签和子图，但却不会破坏现有的查询和应用程序的功能。这就使我们无需在项目之初，对数据的真实模样和复杂度缺乏了解的情况下被迫设计成最终而完整的数据模型，往往这样的模型并不是最终和完整的。

另一方面，有些业务本身就是灵活多变的，或者说敏捷的。使用图数据库（或其他NoSQL数据库，比如MongoDB）可以快速跟上业务的变化而不需要进行Schema变更等代价不菲的管理操作。

### 图数据库怎么使用，用SQL做增删改查吗？

图数据库不使用最传统的SQL作为CRUD语言，原因是SQL作为关系型数据库的查询语言，其也不擅长表达Join等关系查询和操作，在需要做多层的关系Join查询时，SQL往往冗长而难以直观得理解。这是为什么不采用大家最为熟知的SQL却要引入新的图查询语言的主要原因。举个对比的例子：

在英文中“I love my younger sister as well as my grandmother on my father’s side”，与中文的“我爱我的妹妹和奶奶” 是一样的意思，但是在简洁程度上中文远远好于英文。(6个词，9个字) vs (14个词, 70个字)

也就是说，在图数据库中使用专门的图查询语言比使用SQL更加高效。目前主流的图查询语言是Cypher和Gremlin。

### 目前有哪些比较知名的图数据库？

Neo4J最主流的图数据库，相比其他数据库更加成熟，Neo4J使用Java开发，支持ACID，最新版本是3.3.5。每个版本均有社区版和企业版，其中社区版是免费版，基于GPLv3协议开源，但局限于单机部署，功能受限。企业版包括了Neo4J所有功能，包括主从复制用于高可用和读写分离，可视化管理工具等，但增加了商业协议，需付费使用。Neo4J不是分布式数据库，扩展性不是其优势。但它是一种原生的图数据库，同时也具备了图分析引擎的能力。应该说Neo4J是目前使用最为广泛的图数据库，大量介绍图数据库的书籍都是以Neo4J为基础来介绍的。

Neo4J使用Cypher作为图数据库查询语言，由于Neo4J的成功，Cypher目前被大多数图数据库所支持。Cypher语言例子如下（找出所有Johan所关注的人所关注的人，该人也是Johan关注的人）：

![image.png](/2023/image-7cf488b7a62048e7a8e8b2fdf68ac901.png)

```language
MATCH (a:Person {name:'Johan'})-[:FOLLOWS]->(b)-[:FOLLOWS]->(c),        (a)-[:FOLLOWS]->(c)  RETURN b, c
```

### 原生图数据库，这是什么意思？

原生图处理指的是利用了免索引邻接的图数据库。免索引邻接是指通过边关联的2个节点，其彼此指向是物理的，也就是通过边访问一个节点时，该边保存的就是目标节点在磁盘上的物理地址，这样就需要通过索引去找到目标节点，如果边很多的时候，对性能提升很有帮助。

### 那么目前有哪些公司使用了图数据库呢？

使用图数据库的公司比比皆是，分布式各个行业。举例如下：

![image.png](/2023/image-a9bc4bff552a4aae94e7586c48d766cb.png)

### 看起来使用图数据库的公司确实不少啊，能归个类不？

图数据库确实有很广泛的适用场景，因为连接存在于自然和社会中的各个角落。每个事物都不是孤立的，而是跟其他事物或紧或松得联系着。随着人类社会的进步，各种关系的处理变得越来越重要，不仅是人，物与物之间的连接关系也越来越被我们所重视，万物互联的时代已经到来。下面举六个图数据库最常使用的场景。

#### 一、社交网络应用

社交是人与人之间的连接，以图数据模型为内在的图数据库天生适用于明显的以联系为中心的领域。在社交网络中使用图数据库可以方便得识别人/群组和他们交流的事物之间的直接或间接的联系，使用户能够高效地对其他人或事物进行打分、评论、发现彼此存在的关系和共同关系的事情。可以更加直观得了解社交网络中人与人之间如何互动、如何关联、如何以群组的形式来做事情或选择。

社交网络是最基础的图模型，在此基础上可以叠加更多的内容，比如个人的喜好、购买过的物品、日常的生活方式等，从而演化出更高级的图数据库应用模式，比如实时推荐系统。

![image.png](/2023/image-6a6b6d952b9541b3a88e850aaa0de289.png)

#### 二、实时推荐

在零售、招聘、情绪分析、搜索和知识管理领域，社交网络和推荐引擎可以提供关键的差异化能力，有很多种办法可以实现推荐，但使用图数据库在实时性和效率上有其特有的优势。推荐算法在人和事物之间建立联系，而联系建立的基础是用户的行为，比如购买、生产、消费、打分或评论有关资源等行为。推荐引擎可以识别出某些资源会吸引特定个人或群体，或者某些个人或群体可能对特定资源感兴趣。

一个有效的推荐依赖于对事物之间关联的理解，同时也依赖于这些关联的质量和强度，而属性图是所有这些关系密切、关联紧密的数据结构的最佳表达方式。用图数据库存储和查询这些数据使得应用程序可以为最终用户呈现实时结果，反映数据最新的变化，而不是返回给用户那些预计算的状态结果。

#### 三、地理空间管理

地理空间类的应用程序包括公路网、铁路网等，地理空间操作依赖于特定的数据结构，简单的加权带方向的联系，复杂到空间索引如R树。和索引一样，这些数据结构天生就以图的形式呈现，尤其是层级结构，非常适合图数据库。

总的来说，通信、物流、旅游已经路由计算相关领域的地理空间应用经常会使用图数据库。

![image.png](/2023/image-421db29c809248d3897e264fdd4daa5f.png)

#### 四、主数据管理（Master Data Managerment）

在企业或组织中，主数据管理(MDM)包括的数据涉及用户、客户、产品、供应商、部门、区域、站点、成本中心和业务单元等。这些数据来源可能是多种多样的，MDM用来识别、清洗、存储和管理这些数据。其关键问题包括谁组织结构的变化、企业合并和业务规则的变化来管理这些变化；融合新的数据源，用外部源数据补充已有的数据；解决报告需求、鉴定需求和商业智能客户的需求；当数据的值和模式变化时对数据进行版本管理。图数据库的数据模型高效匹配MDM的快速演变和不断变化的业务需求。

#### 五、网络和数据中心管理

图数据库已经成功地使用在了电信、网络管理和分析、云平台管理、数据中心和IT资产管理以及网络影响分析等领域。在这些领域里，他们将影响分析和问题解决的时间时间从数天数小时减少到了分钟级甚至秒级。面对不断变化的网络模式，图数据库的性能和灵活性都是它适合这些领域应用的重要因素。

#### 六、授权和访问控制

图数据库可以存储那些复杂的、高度关联的、跨越数十亿参与者和资源的访问控制结构。尤其适用于内容管理、联合授权服务、社交网络偏好已经软件服务化提供。将这些系统从关系型数据库切换到图数据库后，性能从分钟级提升到毫秒级。

![image.png](/2023/image-b47e4c76996a47f99eac93d731bbef60.png)

上面仅列举了部分例子，除此之外，图数据库产品还广泛用在金融和保险行业反欺诈、风控，电商和社交类产品防机器人作弊等领域。

## 搜索数据库(Elasticsearch)

搜索：许多应用程序输出日志以帮助开发人员解决问题。搜索引擎数据库是一种非关系数据库，专用于数据内容的搜索。搜索引擎数据库使用索引对数据之间的相似特征进行分类，并增强搜索功能。搜索引擎数据库经过优化，可处理可能是长数据，半结构数据或非结构数据的数据，并且它们通常提供专门的方法，例如全文搜索，复杂的搜索表达式和搜索结果排名。用传统SQL涉及到like的大数据量模糊查询，如果是直接对数据库进行查询的话，由于like模糊查询无法对数据列应用索引，所以需要一条条字符串进行比对查询，效率非常低下。

### 技术选型

- ElasticSearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java开发的，并作为Apache许可条款下的开放源码发布，是当前流行的企业级搜索引擎。设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。—–百度百科
- Solr是一个独立的企业级搜索应用服务器，它对外提供类似于Web-service的API接口。用户可以通过http请求，向搜索引擎服务器提交一定格式的XML文件，生成索引；也可以通过Http Get操作提出查找请求，并得到XML格式的返回结果。
- Faiss 和 SPTAG 只是核心算法库，需要进行二次开发包装成服务；Milvus 的 1.x 版本中只能存储 id 和 向量

[ES官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/8.4/setup.html)

[ES入门](https://blog.csdn.net/JENREY/article/details/81290535?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166252800216782395393948%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166252800216782395393948&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-81290535-null-null.142^v47^pc_rank_34_default_2,201^v3^add_ask&utm_term=elasticsearch&spm=1018.2226.3001.4187)

### 安装

#### 1.选择并下载合适的ES包并执行

Elasticsearch(简称ES)是为数不多的直接安装比Docker安装还简单的软件。首先打开[下载页](https://www.elastic.co/cn/downloads/elasticsearch)，选择合适的版本，Linux下查看版本的几个命令：

```language
# 查看内核版本
cat /proc/version
uname -a

# 查看系统版本 （Redhat系的Linux）
cat /etc/redhat-release
cat /etc/issue
```

> deb文件是Debian系统专属安装包格式。（deepin、ubuntu等基于Debian的linux发行版）

> rpm(Red hat Packge Manager)帽公司提出，RedHat、Centos等系列采用

确认的你的版本之后，还需要检查一下自己的最大连接数是否满足262144

```language
sysctl vm.max_map_count
```

如果不满足：

```language
# 临时修改
sysctl -w vm.max_map_count=262144

# 永久修改（编辑配置文件）
vim /etc/sysctl.conf
vm.max_map_count=262144
sysctl -p
```

你可以选择下载好合适的安装包之后，上传到服务器，执行安装命令。
也可以选择通过命令行[在服务器下载](https://www.elastic.co/guide/en/elasticsearch/reference/8.4/rpm.html)，取决于你的服务器状态。以rpm为例，安装命令是：

```language
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.4.1-x86_64.rpm
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.4.1-x86_64.rpm.sha512
shasum -a 512 -c elasticsearch-8.4.1-x86_64.rpm.sha512 
sudo rpm --install elasticsearch-8.4.1-x86_64.rpm
```

执行安装之后如果没有报错，会输出一段内容，记得保存下来。

#### 2.运行

检查 Elasticsearch 是否正在运行

```language
curl --cacert /etc/elasticsearch/certs/http_ca.crt -u elastic https://localhost:9200
```

输入elastic安装期间生成的用户密码，该密码应返回如下响应，说明正在运行：

```language
{
  "name" : "Cp8oag6",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "AT69_T_DTp-1qgIJlatQqA",
  "version" : {
    "number" : "8.4.1",
    "build_type" : "tar",
    "build_hash" : "f27399d",
    "build_flavor" : "default",
    "build_date" : "2016-03-30T09:51:41.449Z",
    "build_snapshot" : false,
    "lucene_version" : "9.3.0",
    "minimum_wire_compatibility_version" : "1.2.3",
    "minimum_index_compatibility_version" : "1.2.3"
  },
  "tagline" : "You Know, for Search"
}
```

可以通过ip:9200访问，默认的用名是elastic，密码如果忘记了，可以执行以下命令修改：

```language
# 跳转到es 下的bin目录
cd /usr/share/elasticsearch/bin
# 修改elastic 的密码，这里结尾的elastic可以换成其他你想修改的用户名
./elasticsearch-reset-password -u elastic
```

之后你可以成功进到后台，但是此时后台比较简陋。

#### 3.配置可视化

在谷歌浏览应用商店，搜Elasticsearch Head，可以找到一个名叫：Multi Elasticsearch Head的插件，下载并安装之后，打开这个插件，点击New。接着输入你的地址和账号密码，就可以通过这个插件来管理你的ES了。至此，最最简易版本的就搭建好了。

#### 4.概念类比

（1）关系型数据库中的数据库（DataBase），等价于ES中的索引（Index）

（2）一个数据库下面有N张表（Table），等价于1个索引Index下面有N多类型（Type），

（3）一个数据库表（Table）下的数据由多行（ROW）多列（column，属性）组成，等价于1个Type由多个文档（Document）和多Field组成。

（4）在一个关系型数据库里面，schema定义了表、每个表的字段，还有表和字段之间的关系。 与之对应的，在ES中：Mapping定义索引下的Type的字段处理规则，即索引如何建立、索引类型、是否保存原始索引JSON文档、是否压缩原始JSON文档、是否需要分词处理、如何进行分词处理等。

（5）在数据库中的增insert、删delete、改update、查search操作等价于ES中的增PUT/POST、删Delete、改_update、查GET

### DEMO

```python
from elasticsearch import Elasticsearch
from conf.setting import ES_HOST  # your ip and port , like http://192.168.3.1:9200
 
class ElasticsearchManager():
    def __init__(self,url = ES_HOST ) -> None:
        self.url = url 
        self.es = Elasticsearch([self.url],
                                verify_certs = False, # TLS verify
                                #basic_auth=(account, password),
                                request_timeout = 60 ,max_retries=10,retry_on_timeout=True)
    def get_data(self,data):
        '''insert'''
        try : 
            self.es.index(index=data['index'], document= data['data'])
        except:
            print('插入数据失败',data)

EsClinet = ElasticsearchManager()

if __name__ == '__main__':
    data = {}
    data['index'] = "test-index1"
    data['data']= {
        'author': 'kimchy',
        'text': 'Elasticsearch: cool. bonsai cool.',
    }
    EsClinet.get_data(data)
```

## 面试常问

### Nosql

NoSQL(Not only SQL)是对不同于传统的关系数据库的数据库管理系统的统称，即广义地来说可以把所有不是关系型数据库的数据库统称为NoSQL。

NoSQL 数据库专门构建用于特定的数据模型，并且具有灵活的架构来构建现代应用程序。NoSQL 数据库使用各种数据模型来访问和管理数据。这些类型的数据库专门针对需要大数据量、低延迟和灵活数据模型的应用程序进行了优化，这是通过放宽其他数据库的某些数据一致性限制来实现的。

数十年来，用于应用程序开发的主要数据模型是由关系数据库（如 Oracle、DB2、SQL Server、MySQL 和 PostgreSQL）使用的关系数据模型。直到 21 世纪中后期，才开始大规模采用和使用其他数据模型。为了对这些新类别的数据库和数据模型进行区分和分类，创造了术语“NoSQL”。通常术语“NoSQL”与“非关系”可互换使用。

NoSQL的BASE原则：Basically Available, Soft-state, Eventually Consistent。 由 Eric Brewer 定义。BASE是NoSQL数据库通常对可用性及一致性的弱要求原则:

- Basically Availble --基本可用
- Soft-state --软状态/柔性事务。 "Soft state" 可以理解为"无连接"的, 而 "Hard state" 是"面向连接"的
- Eventual Consistency -- 最终一致性， 也是是 ACID 的最终目的。

BASE模型是传统ACID模型的反面，不同于ACID，BASE强调牺牲高一致性，从而获得可用性，数据允许在一段时间内的不一致，只要保证最终一致就可以了.

### MVCC

MVCC是多版本并发控制机制，顾名思义支持MVCC的数据库表中每一行数据都可能存在多个版本，对数据库的任何修改的提交都不会直接覆盖之前的数据，而是产生一个新的版本与老版本共存，通过读写数据时读不同的版本来避免加锁阻塞。

使用锁和锁协议来实现相应的隔离级别来进行**并发控制**会造成事务阻塞，导致并发性能会受到一定的影响。而多版本并发控制使得对同一行记录做读写的事务之间不用相互阻塞等待(写写还是要阻塞等待，因为事务对数据进行更新时会加上排他锁)，提高了事务的并发能力，可以认为MVCC是一种解决读写阻塞等待的行级锁。

MVCC的重要特性:
(1)MVCC只支持RC(读取已提交)和RR(可重复读)隔离级别。
(2)MVCC能解决脏读、不可重复读问题，不能解决丢失更新问题和幻读问题。
(3)MVCC是用来解决读写操作之间的阻塞问题。使得在并发读写数据库时，可以做到在读操作时不用阻塞写操作，写操作也不用阻塞读操作，提高了数据库并发读写的性能。

### innodb

InnoDB会为每个使用InnoDB存储引擎的表添加三个隐藏字段，用于实现数据多版本以及聚集索引，他们的作用如下:

- DB_TRX_ID(6字节)： 它是最近一次更新或者插入或者删除该行数据的事务ID(若是删除，则该行有一个删除位更新为已删除。但并不是真正的进行物理删除，当InnoDB丢弃为删除而编写的更新撤消日志记录时，它才会物理删除相应的行及其索引记录。此删除操作称为清除，速度非常快)
- DB_ROLL_PTR(7字节)： 回滚指针，指向当前记录行的undo log信息(指向该数据的前一个版本数据)
- DB_ROW_ID(6字节)： 随着新行插入而单调递增的行ID。InnoDB使用聚集索引，数据存储是以聚集索引字段的大小顺序进行存储的，当表没有主键或唯一非空索引时，innodb就会使用这个行ID自动产生聚簇索引。如果表有主键或唯一非空索引，聚簇索引就不会包含这个行ID了。这个DB_ROW_ID跟MVCC关系不大。

### ORM

对象关系映射（Object Relational Mapping，简称ORM）模式是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。

简单的说，ORM是通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。

那么，到底如何实现持久化呢？一种简单的方案是采用硬编码方式，为每一种可能的数据库访问操作提供单独的方法。

#### 优点

与传统的数据库访问技术相比，ORM有以下优点：

- 开发效率更高
- 数据访问更抽象、轻便
- 支持面向对象封装

#### 缺点

- 降低程序的执行效率
- 思维固定化

从系统结构上来看,采用ORM的系统一般都是多层系统，系统的层次多了，效率就会降低。ORM是一种完全的面向对象的做法，而面向对象的做法也会对性能产生一定的影响N+1问题

N+1 是ORM（对象关系映射）关联数据读取中存在的一个问题。

假设现在有一个用户表（User）和一个余额表（Balance），这两个表通过user_id进行关联。现在有一个需求是查询年龄大于18岁的用户，以及用户各自的余额。

这个问题并不难，但对于新手而言，可能常常会犯的一个错误就是在循环中进行查询。

```language
$users = User::where("age", ">", 18)->select(); 
foreach($users as $user){
  $balance = User::getFieldByUserId($user->user_id, "balance");
  $user['balance'] = $balance;
}
```

![image.png](/2023/image-e8ee0896f8a3407cbfef8af1262e4e47.png)

通过Mysql 查询日志，可以看到查询用户表是一次，因为有四个符合该条件的用户，查询用户表关联的余额表是四次。

N+1问题就是这样产生的：查询主表是一次，查询出N 条记录，根据这N 条记录，查询关联的副（从）表，共需要N 次。所以，应该叫1+N 问题更合适一些。

其实，如果稍微了解一点SQL，根本不用这么麻烦，直接使用IN 一次就搞定了。

对于这类问题，ORM 其实为我们提供了相应的方案，那就是使用『预加载功能』。

使用with()方法指定想要预加载的关联：

```language
$users = User::where("age", ">", 18)
        ->with("hasBalance")
        ->select();
```

hasBalance 这个方法让User 模型与Balance 模型进行一对一关联。

现在再来看一下Mysql 的查询日志：

![image.png](/2023/image-0734e7e048eb4482a2521f67cf08e4a0.png)

可以很清楚的看到，总查询次数由原来的1+N 变成了现在的1+1。

### Transaction

事务（Transaction）是一个对数据库执行工作单元。

事务（Transaction）是以逻辑顺序完成的工作单位或序列，可以是由用户手动操作完成，也可以是由某种数据库程序自动完成。

事务（Transaction）是指一个或多个更改数据库的扩展。例如，如果您正在创建一个记录或者更新一个记录或者从表中删除一个记录，那么您正在该表上执行事务。重要的是要控制事务以确保数据的完整性和处理数据库错误。实际上，您可以把许多的 SQLite 查询联合成一组，把所有这些放在一起作为事务的一部分进行执行。

### ACID

事务（Transaction）具有以下四个标准属性，通常根据首字母缩写为 ACID：

- 原子性（Atomicity）：确保工作单位内的所有操作都成功完成，否则，事务会在出现故障时终止，之前的操作也会回滚到以前的状态。
- 一致性（Consistency)：确保数据库在成功提交的事务上正确地改变状态。
- 隔离性（Isolation）：使事务操作相互独立和透明。
- 持久性（Durability）：确保已提交事务的结果或效果在系统发生故障的情况下仍然存在。

#### 四个特性（ACID），其中原子性是如何实现的？

##### 从redolog的角度

规定在执行这些需要保证原子性的操作时必须以组的形式来记录的redo日志，在进行系统崩溃重启恢复时，针对某个组中的redo日志，要么把全部的日志都恢复掉，要么一条也不恢复。在该组中的最后一条redo日志后边加上一条特殊类型的redo日志，该类型名称为MLOG_MULTI_REC_END，type字段对应的十进制数字为31，该类型的redo日志结构很简单，只有一个type字段。所以某个需要保证原子性的操作产生的一系列redo日志必须要以一个类型为MLOG_MULTI_REC_END结尾。

##### 从undolog的角度

InnoDB存储引擎在实际进行增、删、改一条记录时，都需要先把对应的undo日志记下来。一般每对一条记录做一次改动，也可能会对应着2条undo日志：（每对一条记录的主键值做改动时，会记录2条undo日志，因为会有对该记录进行delete mark操作前，会记录一条类型为**TRX_UNDO_DEL_MARK_REC**的undo日志；之后插入新记录时，会记录一条类型为**TRX_UNDO_INSERT_REC**的undo日志）

一次事务如果有很多undolog，会进行编号，比如undolog 1， 2， 3 就是undo no

当我们向某个表中插入一条记录时，实际上需要向聚簇索引和所有的二级索引都插入一条记录。不过记录undo日志时，我们只需要考虑向聚簇索引插入记录时的情况就好了，因为其实聚簇索引记录和二级索引记录是一一对应的，我们在回滚插入操作时，只需要知道这条记录的主键信息，然后根据主键信息做对应的删除操作，做删除操作时就会顺带着把所有二级索引中相应的记录也删除掉。

### 事务的隔离级别

在实际应用中，数据库中的数据是要被多个用户共同访问的，在多个用户同时操作相同的数据时，可能就会出现一些事务的并发问题，具体如下。

- 脏读
  指一个事务读取到另一个事务未提交的数据。
- 不可重复读
  指一个事务对同一行数据重复读取两次，但得到的结果不同。
- 虚读/幻读
  指一个事务执行两次查询，但第二次查询的结果包含了第一次查询中未出现的数据。
- 丢失更新
  指两个事务同时更新一行数据，后提交（或撤销）的事务将之前事务提交的数据覆盖了。

> 丢失更新可分为两类，分别是第一类丢失更新和第二类丢失更新。
>
> - 第一类丢失更新是指两个事务同时操作同一个数据时，当第一个事务撤销时，把已经提交的第二个事务的更新数据覆盖了，第二个事务就造成了数据丢失。
> - 第二类丢失更新是指当两个事务同时操作同一个数据时，第一个事务将修改结果成功提交后，对第二个事务已经提交的修改结果进行了覆盖，对第二个事务造成了数据丢失。

为了避免上述事务并发问题的出现，在标准的 SQL 规范中定义了四种事务隔离级别，不同的隔离级别对事务的处理有所不同。这四种事务的隔离级别如下。

- Read Uncommitted（读未提交）
  一个事务在执行过程中，既可以访问其他事务未提交的新插入的数据，又可以访问未提交的修改数据。如果一个事务已经开始写数据，则另外一个事务不允许同时进行写操作，但允许其他事务读此行数据。此隔离级别可防止丢失更新。
- Read Committed（读已提交）
  一个事务在执行过程中，既可以访问其他事务成功提交的新插入的数据，又可以访问成功修改的数据。读取数据的事务允许其他事务继续访问该行数据，但是未提交的写事务将会禁止其他事务访问该行。此隔离级别可有效防止脏读。
- Repeatable Read（可重复读取）
  一个事务在执行过程中，可以访问其他事务成功提交的新插入的数据，但不可以访问成功修改的数据。读取数据的事务将会禁止写事务（但允许读事务），写事务则禁止任何其他事务。此隔离级别可有效防止不可重复读和脏读。
- Serializable（可串行化）
  提供严格的事务隔离。它要求事务序列化执行，事务只能一个接着一个地执行，不能并发执行。此隔离级别可有效防止脏读、不可重复读和幻读。但这个级别可能导致大量的超时现象和锁竞争，在实际应用中很少使用。

一般来说，事务的隔离级别越高，越能保证数据库的完整性和一致性，但相对来说，隔离级别越高，对并发性能的影响也越大。因此，通常将数据库的隔离级别设置为 Read Committed，即读已提交数据，它既能防止脏读，又能有较好的并发性能。虽然这种隔离级别会导致不可重复读、幻读和第二类丢失更新这些并发问题，但可通过在应用程序中采用悲观锁和乐观锁加以控制。

### 事务控制

使用下面的命令来控制事务：

- BEGIN TRANSACTION：开始事务处理。
- COMMIT：保存更改，或者可以使用 END TRANSACTION 命令。
- ROLLBACK：回滚所做的更改。

事务控制命令只与 DML 命令 INSERT、UPDATE 和 DELETE 一起使用。他们不能在创建表或删除表时使用，因为这些操作在数据库中是自动提交的。

### 什么是脏读？什么是幻读？

脏读 ：脏读就是指当一个事务正在访问数据，并且对数据进行了修改，而这种修改还没有提交到数据库中，这时，另外一个事务也访问这个数据，然后使用了这个数据。

幻读 : 是指当事务不是独立执行时发生的一种现象，例如第一个事务对一个表中的数据进行了修改，这种修改涉及到表中的全部数据行。 同时，第二个事务也修改这个表中的数据，这种修改是向表中插入一行新数据。那么，以后就会发生操作第一个事务的用户发现表中还有没有修改的数据行，就好象 发生了幻觉一样。例如，一个编辑人员更改作者提交的文档，但当生产部门将其更改内容合并到该文档的主复本时，发现作者已将未编辑的新材料添加到该文档中。 如果在编辑人员和生产部门完成对原始文档的处理之前，任何人都不能将新材料添加到文档中，则可以避免该问题。

#### mysql的默认隔离级别是？能解决脏读和幻读吗？

##### mysql的默认隔离级别是可重复读，也有企业生产环境是读已提交

读未提交(Read UnCommitted)，简称为RU； 最低的隔离级别，允许读取尚未提交的数据变更，可能会导致脏读、幻读或不可重复读。

读已提交(Read Commited)，简称为RC； 允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读或不可重复读仍有可能发生。

可重复读(Repeatable Read)，简称为RR；对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍有可能发生。

串行化(Serializable)最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。

#### 如何解决幻读？

MVCC加上间隙锁的方式
（1）在快照读读情况下，mysql通过mvcc来避免幻读。
（2）在当前读读情况下，mysql通过next-key来避免幻读。锁住某个条件下的数据不能更改。

### 索引的底层实现？

#### 相较于B树，B+树的优势是什么？

1.单一节点存储更多的元素，使得查询的IO次数更少；

2.所有查询都要查找到叶子节点，查询性能稳定；

3.所有叶子节点形成有序链表，便于范围查询。

首先，Ｂ＋树的查找和Ｂ树一样，类似于二叉查找树。起始于根节点，自顶向下遍历树，选择其分离值在要查找值的任意一边的子指针。在节点内部典型的使用是二分查找来确定这个位置。

不同的是，Ｂ＋树中间节点没有卫星数据（索引元素所指向的数据记录），只有索引，而Ｂ树每个结点中的每个关键字都有卫星数据；这就意味着同样的大小的磁盘页可以容纳更多节点元素，在相同的数据量下，Ｂ＋树更加“矮胖”，ＩＯ操作更少。

其次，因为卫星数据的不同，导致查询过程也不同；Ｂ树的查找只需找到匹配元素即可，最好情况下查找到根节点，最坏情况下查找到叶子结点，所说性能很不稳定，而Ｂ＋树每次必须查找到叶子结点，性能稳定。

在范围查询方面，B+树的优势更加明显：B树的范围查找需要不断依赖中序遍历。首先二分查找到范围下限，在不断通过中序遍历，知道查找到范围的上限即可。整个过程比较耗时。而B+树的范围查找则简单了许多。首先通过二分查找，找到范围下限，然后同过叶子结点的链表顺序遍历，直至找到上限即可，整个过程简单许多，效率也比较高。
��。
