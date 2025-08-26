---
sidebar_position: 6
title: MongoDB
---

## MongoDB

文档：在应用程序代码中，数据通常表示为对象或 JSON 文档，因为对开发人员而言它是高效和直观的数据模型。文档数据库让开发人员可以使用他们在其应用程序代码中使用的相同文档模型格式，更轻松地在数据库中存储和查询数据。文档和文档数据库的灵活、半结构化和层级性质允许它们随应用程序的需求而变化。文档模型可以很好地与目录、用户配置文件和内容管理系统配合使用，其中每个文档都是唯一的，并会随时间而变化。

文档数据库是一种非关系数据库，旨在将数据作为类 JSON 文档存储和查询。文档数据库让开发人员可以使用他们在其应用程序代码中使用的相同文档模型格式，更轻松地在数据库中存储和查询数据。文档和文档数据库的灵活、半结构化和层级性质允许它们随应用程序的需求而变化。文档模型可以很好地与目录、用户配置文件和内容管理系统等使用案例配合使用，其中每个文档都是唯一的，并会随时间而变化。文档数据库支持灵活的索引、强大的临时查询和文档集合分析。

### 基本用例

Python可以使用`pymongo`库来与MongoDB交互。

```bash
pip install pymongo
```

然后，使用以下代码来连接到MongoDB：

```python
from pymongo import MongoClient

# 创建MongoDB的连接
client = MongoClient('localhost', 27017)

# 连接到你的数据库
db = client['mydatabase']
```

以下是一些基本的增删改查示例：

**创建文档**

```python
# 选择一个集合
collection = db['mycollection']

# 创建一个文档
document = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# 插入文档到集合中
result = collection.insert_one(document)

# 打印插入文档的_id
print(result.inserted_id)
```

**读取文档**

```python
# 查找单个文档
document = collection.find_one({"name": "John"})
print(document)

# 查找多个文档
for document in collection.find({"age": {"$gt": 20}}):
    print(document)
```

**更新文档**

```python
# 更新单个文档
collection.update_one({"name": "John"}, {"$set": {"age": 31}})

# 更新多个文档
collection.update_many({"age": {"$gt": 20}}, {"$inc": {"age": 1}})
```

**删除文档**

```python
# 删除单个文档
collection.delete_one({"name": "John"})

# 删除多个文档
collection.delete_many({"age": {"$gt": 20}})
```
