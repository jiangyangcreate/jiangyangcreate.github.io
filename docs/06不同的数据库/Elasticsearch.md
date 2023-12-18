
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