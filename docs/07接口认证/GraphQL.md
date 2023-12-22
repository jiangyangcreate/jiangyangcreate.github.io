## graphene

```python
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