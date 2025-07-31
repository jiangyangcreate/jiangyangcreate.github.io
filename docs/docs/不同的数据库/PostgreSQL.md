---
sidebar_position: 5
title: PostgreSQL
---

## 关系型数据库（PostgreSQL）

[PostgreSQL 官网](https://www.postgresql.org/)

[PostgreSQL 官方文档](https://www.postgresql.org/docs/)

[pgvector 扩展](https://github.com/pgvector/pgvector)

PostgreSQL 是一个功能强大的开源对象关系数据库系统，具有超过30年的积极开发历史。它以其可靠性、功能健壮性和性能而闻名。PostgreSQL 完全符合 ACID 标准，支持外键、触发器、视图和存储过程等高级功能。

与 MySQL 相比，PostgreSQL 更加注重标准的兼容性和扩展性，支持更丰富的数据类型（如 JSON、数组、范围类型等）和复杂查询，事务隔离级别和并发控制能力更强。PostgreSQL 支持多版本并发控制（MVCC），在高并发场景下表现优异，并且拥有更完善的扩展机制（如 pgvector、PostGIS 等），适合需要复杂数据处理和地理空间、向量等高级功能的场景。而 MySQL 则以易用性、部署简单和社区生态广泛著称，适合中小型应用和对性能要求较高但功能需求相对简单的场景。

### PostgreSQL 核心特性

- **ACID 合规性**：完全支持原子性、一致性、隔离性和持久性
- **丰富的扩展生态**：支持多种扩展，如 pgvector、PostGIS 等
- **高级数据类型**：支持 JSON、数组、范围类型等
- **并发控制**：基于 MVCC 的多版本并发控制
- **全文搜索**：内置全文搜索功能
- **地理信息**：通过 PostGIS 扩展支持地理空间数据

### 基本连接和用户管理

```sql showLineNumbers
-- 连接到 PostgreSQL
psql -h hostname -U username -d database_name

-- 创建用户
CREATE USER username WITH PASSWORD 'password';

-- 创建数据库
CREATE DATABASE database_name;

-- 授权用户访问数据库
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;

-- 查看所有数据库
\l

-- 查看所有用户
\du
```

### 表操作

```sql showLineNumbers
-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查看表结构
\d table_name

-- 查看所有表
\dt

-- 删除表
DROP TABLE table_name;

-- 重命名表
ALTER TABLE old_name RENAME TO new_name;
```

### 列操作

```sql showLineNumbers
-- 添加列
ALTER TABLE table_name ADD COLUMN column_name data_type [constraints];

-- 删除列
ALTER TABLE table_name DROP COLUMN column_name;

-- 修改列类型
ALTER TABLE table_name ALTER COLUMN column_name TYPE new_data_type;

-- 重命名列
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;

-- 设置默认值
ALTER TABLE table_name ALTER COLUMN column_name SET DEFAULT value;

-- 移除默认值
ALTER TABLE table_name ALTER COLUMN column_name DROP DEFAULT;
```

### 数据操作

```sql showLineNumbers
-- 插入数据
INSERT INTO users (username, email) VALUES ('john_doe', 'john@example.com');

-- 批量插入
INSERT INTO users (username, email) VALUES 
    ('user1', 'user1@example.com'),
    ('user2', 'user2@example.com'),
    ('user3', 'user3@example.com');

-- 更新数据
UPDATE users SET email = 'new_email@example.com' WHERE username = 'john_doe';

-- 删除数据
DELETE FROM users WHERE username = 'john_doe';

-- 查询数据
SELECT * FROM users;
SELECT username, email FROM users WHERE created_at > '2024-01-01';
```

### 高级查询功能

```sql showLineNumbers
-- 条件查询
SELECT * FROM users WHERE username LIKE 'john%';
SELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
SELECT * FROM users WHERE email IS NOT NULL;

-- 排序
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY username ASC, created_at DESC;

-- 限制结果数量
SELECT * FROM users LIMIT 10;
SELECT * FROM users OFFSET 20 LIMIT 10;

-- 去重
SELECT DISTINCT username FROM users;

-- 聚合函数
SELECT COUNT(*) FROM users;
SELECT AVG(EXTRACT(YEAR FROM created_at)) FROM users;
SELECT username, COUNT(*) FROM posts GROUP BY username;
```

### 索引和性能优化

```sql showLineNumbers
-- 创建索引
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- 创建复合索引
CREATE INDEX idx_users_username_email ON users(username, email);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- 查看索引
\di

-- 分析查询性能
EXPLAIN ANALYZE SELECT * FROM users WHERE username = 'john_doe';
```

### 事务和并发控制

```sql showLineNumbers
-- 开始事务
BEGIN;

-- 执行操作
INSERT INTO users (username, email) VALUES ('new_user', 'new@example.com');
UPDATE users SET email = 'updated@example.com' WHERE username = 'john_doe';

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 设置事务隔离级别
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## pgvector - PostgreSQL 向量扩展

pgvector 是一个 PostgreSQL 扩展，用于存储和查询向量嵌入。它支持多种向量相似度搜索算法，是构建 AI 应用和向量搜索系统的理想选择。

### 安装 pgvector

```sql showLineNumbers
-- 在 PostgreSQL 中创建扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 验证安装
SELECT * FROM pg_extension WHERE extname = 'vector';
```

### 基本向量操作

```sql showLineNumbers
-- 创建包含向量列的表
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    embedding vector(1536)  -- OpenAI 嵌入维度
);

-- 插入向量数据
INSERT INTO items (name, embedding) VALUES 
    ('item1', '[0.1, 0.2, 0.3, ...]'::vector),
    ('item2', '[0.4, 0.5, 0.6, ...]'::vector);

-- 创建向量索引
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops);
```

### 向量相似度搜索

```sql showLineNumbers
-- 余弦相似度搜索
SELECT name, embedding <=> '[0.1, 0.2, 0.3, ...]'::vector AS distance
FROM items
ORDER BY embedding <=> '[0.1, 0.2, 0.3, ...]'::vector
LIMIT 5;

-- 欧几里得距离搜索
SELECT name, embedding <-> '[0.1, 0.2, 0.3, ...]'::vector AS distance
FROM items
ORDER BY embedding <-> '[0.1, 0.2, 0.3, ...]'::vector
LIMIT 5;

-- 内积相似度搜索
SELECT name, embedding <#> '[0.1, 0.2, 0.3, ...]'::vector AS distance
FROM items
ORDER BY embedding <#> '[0.1, 0.2, 0.3, ...]'::vector
LIMIT 5;
```

### 高级向量功能

```sql showLineNumbers
-- 混合查询：结合向量搜索和传统 SQL 条件
SELECT name, embedding <=> '[0.1, 0.2, 0.3, ...]'::vector AS distance
FROM items
WHERE name LIKE '%product%'
ORDER BY embedding <=> '[0.1, 0.2, 0.3, ...]'::vector
LIMIT 10;

-- 批量向量搜索
WITH query_vectors AS (
    SELECT '[0.1, 0.2, 0.3, ...]'::vector AS query_vec
    UNION ALL
    SELECT '[0.4, 0.5, 0.6, ...]'::vector AS query_vec
)
SELECT i.name, i.embedding <=> qv.query_vec AS distance
FROM items i
CROSS JOIN query_vectors qv
ORDER BY distance
LIMIT 20;
```

### Python 集成示例

```python showLineNumbers
import psycopg2
import numpy as np
from configparser import ConfigParser

def config(filename="database.ini", section="postgresql"):
    parser = ConfigParser()
    parser.read(filename)
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(f"Section {section} not found in {filename}")
    return db

def vector_search(query_vector, limit=5):
    """执行向量相似度搜索"""
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        
        # 将 numpy 数组转换为 PostgreSQL 向量格式
        vector_str = '[' + ','.join(map(str, query_vector)) + ']'
        
        sql = f"""
        SELECT name, embedding <=> '{vector_str}'::vector AS distance
        FROM items
        ORDER BY embedding <=> '{vector_str}'::vector
        LIMIT {limit}
        """
        
        cur.execute(sql)
        results = cur.fetchall()
        cur.close()
        return results
    except Exception as error:
        print(f"Error: {error}")
    finally:
        if conn is not None:
            conn.close()

def insert_vector(name, embedding):
    """插入向量数据"""
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        
        vector_str = '[' + ','.join(map(str, embedding)) + ']'
        
        sql = "INSERT INTO items (name, embedding) VALUES (%s, %s::vector)"
        cur.execute(sql, (name, vector_str))
        conn.commit()
        cur.close()
        print("Vector inserted successfully")
    except Exception as error:
        print(f"Error: {error}")
    finally:
        if conn is not None:
            conn.close()

# 使用示例
if __name__ == "__main__":
    # 示例向量
    sample_vector = np.random.rand(1536)
    
    # 插入向量
    insert_vector("sample_item", sample_vector)
    
    # 搜索相似向量
    results = vector_search(sample_vector, limit=5)
    for name, distance in results:
        print(f"{name}: {distance}")
```

### 性能优化建议

```sql showLineNumbers
-- 选择合适的索引类型
-- 对于小到中等数据集
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops);

-- 对于大数据集，使用 HNSW 索引
CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);

-- 设置索引参数
CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- 分析查询性能
EXPLAIN ANALYZE SELECT name, embedding <=> '[0.1, 0.2, 0.3, ...]'::vector AS distance
FROM items
ORDER BY embedding <=> '[0.1, 0.2, 0.3, ...]'::vector
LIMIT 5;
```

### 实际应用场景

1. **语义搜索**：基于文本嵌入的相似文档搜索
2. **推荐系统**：基于用户行为向量的商品推荐
3. **图像搜索**：基于图像嵌入的相似图片搜索
4. **RAG 系统**：检索增强生成中的文档检索
5. **异常检测**：基于向量距离的异常模式识别

PostgreSQL 配合 pgvector 扩展，为现代 AI 应用提供了强大而灵活的向量数据库解决方案，既保持了关系数据库的 ACID 特性，又具备了向量搜索的能力。
