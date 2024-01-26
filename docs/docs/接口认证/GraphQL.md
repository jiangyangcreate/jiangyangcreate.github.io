
## Graphql

graphql 是一种用于 API 的查询语言，对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，减少数据的冗余。

![image-1657519260384](/docs/image-1657519260384.webp)

在下图中，系统中的所有入口点（REST、GraphQL 和 RPC）都将使用相同的验证、授权和错误处理规则进行处理。

![image-1657519556322](/docs/image-1657519556322.webp)

GraphQL 同样支持 Relay, Django, SQLAlchemy, Google App Engine.

### 怎么使用 Graphql？

安装对应的模块

```bash showLineNumbers
pip install graphene
pip install strawberry-graphql
pip install ariadne
```

在 py 文件中可以运行这个简单的示例

```bash showLineNumbers
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String(name=graphene.String(default_value="World"))

  def resolve_hello(self, info, name):
    return 'Hello ' + name

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello']) # "Hello World"
```




## graphene

```python showLineNumbers
import graphene

# 定义 Person 类型
class Person(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    age = graphene.Int()

# 定义查询类型
class Query(graphene.ObjectType):
    # 定义查询字段，用于获取所有人的信息
    all_people = graphene.List(Person)

    # 实现查询字段的解析器
    def resolve_all_people(self, info):
        # 在这个简单的例子中，我们返回一个包含一些硬编码数据的人员列表
        return [
            Person(id=1, name="John Doe", age=30),
            Person(id=2, name="Jane Smith", age=25),
            Person(id=3, name="Bob Johnson", age=35),
        ]

# 创建 schema，将 Query 类型添加到根 schema 中
schema = graphene.Schema(query=Query)

# 通过 GraphQL 查询获取结果
query_string = '{ allPeople { id name age } }'
result = schema.execute(query_string)

# 打印结果
print(result.data)
# {'allPeople': [{'id': '1', 'name': 'John Doe', 'age': 30}, {'id': '2', 'name': 'Jane Smith', 'age': 25}, {'id': '3', 'name': 'Bob Johnson', 'age': 35}]}
```
