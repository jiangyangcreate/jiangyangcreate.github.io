---
sidebar_position: 2
title: pandas
---

## pandas

Pandas 的主要数据结构是 Series （一维数据）与 DataFrame（二维数据），这两种数据结构足以处理金融、统计、社会科学、工程等领域里的大多数典型用例。

Series 是一种类似于一维数组的对象，它由一组数据（各种 Numpy 数据类型）以及一组与之相关的数据标签（即索引）组成。

DataFrame 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型（数值、字符串、布尔型值）。DataFrame 既有行索引也有列索引，它可以被看做由 Series 组成的字典（共同用一个索引）。

[pandas 官方文档](https://pandas.pydata.org/docs/reference/index.html)

#### pandas 数据存取-csv/xlsx/xls

```python showLineNumbers
import pandas as pd

data = [['Google',10],['Runoob',12],['Wiki',13]]

df = pd.DataFrame(data,columns=['Site','Age'],dtype=float)

df.to_csv('file1.csv',index=False)
df = pd.read_csv('file1.csv')

df.to_excel('file1.xlsx',index=False)
df = pd.read_excel('file1.xlsx')

df.to_excel('file1.xls',index=False)
df = pd.read_excel('file1.xls')

df
'''
Site Age
0 Google 10
1 Runoob 12
2 Wiki 13
'''
```

#### pandas 数据存取-json

```python showLineNumbers

data =[
    {
      "id": "A001",
      "name": "菜鸟教程",
      "url": "www.runoob.com",
      "likes": 61
    },
    {
      "id": "A002",
      "name": "Google",
      "url": "www.google.com",
      "likes": 124
    },
    {
      "id": "A003",
      "name": "淘宝",
      "url": "www.taobao.com",
      "likes": 45
    }
]
df = pd.DataFrame(data)

df.to_json('sites.json')
df = pd.read_json('sites.json')

print(df.to_string())

'''
     id    name             url  likes
0  A001    菜鸟教程  www.runoob.com     61
1  A002  Google  www.google.com    124
2  A003      淘宝  www.taobao.com     45
'''
```

#### pandas 数据存取-sql

```python showLineNumbers
from sqlalchemy import create_engine,text
import pandas as pd

MYSQL_HOST = '*'
MYSQL_PORT = 3306
MYSQL_USER = 'employee_u'
MYSQL_PASSWORD = 'employee_s'
MYSQL_DB = 'employee'

engine = create_engine('mysql+pymysql://{}:{}@{}:{}/{}'.format(MYSQL_USER,MYSQL_PASSWORD,MYSQL_HOST,MYSQL_PORT,MYSQL_DB),
                       echo = False)

dataset = pd.DataFrame({'Names':['Abhinav','Aryan',
                                 'Manthan'],
                        'DOB' : ['10/01/2009','24/03/2009',
                                '28/02/2009']})

dataset.to_sql('Employee_Data',con = engine,index=False)

#附加到以前创建的数据库中
dataset.to_sql('Employee_Data',con = engine,index=False,if_exists = 'append')


# 查看是否写入成功
with engine.connect() as conn:
    df1 = pd.read_sql('Employee_Data',con = conn,columns = ["Names"])
    df2 = pd.read_sql('Employee_Data',con = conn,index_col = 'Names',columns = ["Names"])
    df3 = pd.read_sql_table("Employee_Data", conn)
    df4 = pd.read_sql_query(text("select * from Employee_Data"),con = conn)
    df5 = conn.execute(text("select MAX(`index`) from Employee_Data")).fetchall()
    df6 = conn.execute(text("select `index` from Employee_Data WHERE `index` > :index"),{"index":1}).fetchall()
print(df1)
print(df2)
print(df3)
print(df4)
print(df5)
print(df6)
```

#### 快速的识别结构化数据

```python showLineNumbers
import numpy as np
import scipy as sp
import pandas as pd

iris_file = './iris.data'

data = pd.read_csv(iris_file, header=None, encoding='utf-8')
data
```

#### 快速的操作元数据

```python showLineNumbers
cnames = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class']
data.columns = cnames
data
```

#### 快速过滤

```python showLineNumbers
data[data['petal_width'] == data.petal_width.max()]
```

#### 快速切片

```python showLineNumbers
data.iloc[::30, :2]
```

#### 快速统计

```python showLineNumbers
data['class'].value_counts()
```

```python showLineNumbers
for x in range(4):
    s = data.iloc[:,x]
    print('{0:<12}'.format(s.name), " Statistics: ",
    '{0:>5}  {1:>5}  {2:>5}  {3:>5}'.format(s.max(), s.min(), round(s.mean(),2),round(s.std(),2)))
```

#### 快速“MapReduce”

```python showLineNumbers
slogs = lambda x:np.log(x)*x
entpy = lambda x:np.exp((slogs(x.sum())-x.map(slogs).sum())/x.sum())
data.groupby('class').agg(entpy)
```

Pandas 的重要数据类型

- DataFrame(二维表)
- Series(一维序列)
- Index(行索引，行级元数据)

### 1.1 Series：pandas 的长枪(数据表中的一列或一行,观测向量,一维数组...)

数据世界中对于任意一个个体的全面观测，或者对于任意一组个体某一属性的观测，全部可以抽象为 Series 的概念。

用值构建一个 Series：

由默认 index 和 values 组成。

```python showLineNumbers
series1 = pd.Series(np.random.randn(4))
series1
```

```python showLineNumbers
print(type(series1))
print(series1.index)
print(series1.values)
```

#### Series 支持过滤的原理就如同 NumPy

```python showLineNumbers
series1 > 0
```

```python showLineNumbers
series1[series1 > 0]
```

#### 当然也支持 Broadcasting

```python showLineNumbers
series1*2
```

```python showLineNumbers
series1+5
```

#### 以及 Universal Function

```python showLineNumbers
print(series1)
print(np.exp(series1))

#NumPy Universal Function
f_np = np.frompyfunc(lambda x:np.exp(x*2 + 5), 1, 1)
f_np(series1)
```

在序列上就使用行标，而不是创建一个 2 列的数据表，能够轻松辨别哪里是数据，哪里是元数据：

```python showLineNumbers
series2 = pd.Series(series1.values, index=['norm_' + str(i) for i in range(4)])
print(series2, type(series2))
print(series2.index)
print(type(series2.index))
print(series2.values)
series2
```

虽然行是有顺序的，但是仍然能够通过行级的 index 来访问到数据：

（当然也不尽然像 Ordered Dict，因为行索引甚至可以重复，不推荐重复的行索引不代表不能用）

```python showLineNumbers
series2[['norm_0','norm_3']]
```

```python showLineNumbers
'norm_0' in series2
```

```python showLineNumbers
'norm_6' in series2
```

默认行索引就像行号一样：

```python showLineNumbers
series1.index
```

从 Key 不重复的 Ordered Dict 或者从 Dict 来定义 Series 就不需要担心行索引重复：

```python showLineNumbers
s_dict = {"Japan":"Tokyo", "Korea":"Seoul", "China":"Beijing"}
series3 = pd.Series(s_dict)

print(series3.index)
print(series3.values)
series3
```

与 Dict 区别一： 有序

```python showLineNumbers
lst = ["Japan", "China", "Singapore", "Korea"]
series4 = pd.Series(s_dict, index =lst)
series4
```

```python showLineNumbers
print(series4.values)
print(series4.index)
print(series4.isnull())
print(series4.notnull())
```

与 Dict 区别二： index 内值可以重复，尽管不推荐。

```python showLineNumbers
lst = ['A', 'B', 'B', 'C']
series5 = pd.Series(series1.values, index=lst)
series5
```

```python showLineNumbers
series5[['B', 'A']]
```

整个序列级别的元数据信息：name

当数据序列以及 index 本身有了名字，就可以更方便的进行后续的数据关联啦！

```python showLineNumbers
series4.name
```

```python showLineNumbers
series4.index.name
```

```python showLineNumbers
series4.name = "Capital Series"
series4.index.name = "Nation"
series4
```

```python showLineNumbers
pd.DataFrame(series4)
```

### 1.2 DataFrame：pandas 的战锤(数据表，二维数组)

Series 的有序集合，就像 R 的 DataFrame 一样方便。

仔细想想，绝大部分的数据形式都可以表现为 DataFrame。

#### 从 Numpy 二维数组、从文件或者从数据库定义：数据虽好，勿忘列名

```python showLineNumbers
data_np = np.asarray([('Japan', 'Tokyo', 4000),
                      ('Korea', 'Seoul', 1300),
                      ('China', 'Beijing', 9100)])
df1 = pd.DataFrame(data_np, columns=['nation','capital','GDP'])
df1
```

#### 等长的列数据保存在一个字典里（JSON）：很不幸，字典 key 是无序的

```python showLineNumbers
data_dict = {'nation': ['Japan', 'Korea', 'China'],
             'capital': ['Tokyo', 'Seoul', 'Beijing'],
             'GDP': [4900, 1300, 9100]}
df2 = pd.DataFrame(data_dict)
df2
```

#### 从另一个 DataFrame 定义 DataFrame：啊，强迫症犯了

```python showLineNumbers
df21 = pd.DataFrame(df2, columns=['nation', 'capital', 'GDP'])
df21
```

```python showLineNumbers
df22 = pd.DataFrame(df2, columns=['nation', 'capital', 'GDP'], index = [2, 0, 1])
df22
```

#### 从 DataFrame 中取出列？两种方法（与 JavaScript 完全一致！）

- '.'的写法容易与其他预留关键字产生冲突
- '[ ]'的写法最安全。

```python showLineNumbers
print(df22.nation)
print(df22.capital)
print(df22['GDP'])
```

```python showLineNumbers
df22['capital']
```

#### 从 DataFrame 中取出行？（至少）两种方法

```python showLineNumbers
df22[0:1] # 给出的实际是DataFrame
```

```python showLineNumbers
df22.iloc[0] # 通过对应Index给出行
```

#### 像 Numpy 切片一样的终极招式：iloc

```python showLineNumbers
df22.iloc[0,:]
```

```python showLineNumbers
df22.iloc[:,0]
```

#### 听说你从 Table 地狱来，大熊猫笑了

然而动态增加列无法用"."的方式完成，只能用"[ ]"

```python showLineNumbers
df22['population'] = [1600, 130, 55]
df22['region'] = 'East_Asian'
df22
```

### 1.3 Index：pandas 进行数据操作的鬼牌（行级索引）

行级索引是

- 元数据
- 可能由真实数据产生，因此可以视作数据
- 可以由多重索引也就是多个列组合而成
- 可以和列名进行交换，也可以进行堆叠和展开，达到 Excel 透视表效果

Index 有四种...哦不，很多种写法，一些重要的索引类型包括

- pd.Index（普通）
- Int64Index（数值型索引）
- MultiIndex（多重索引，在数据操纵中更详细描述）
- DatetimeIndex（以时间格式作为索引）
- PeriodIndex （含周期的时间格式作为索引）

#### 直接定义普通索引，长得就和普通的 Series 一样

```python showLineNumbers
index_names = ['a','b','c']
s = pd.Series(index_names)
print(pd.Index(index_names))
print(pd.Index(s))
s
```

#### Immutable，牢记

pd.Index 是不可变的

```python showLineNumbers
index_names = ['a', 'b', 'c']
index0 = pd.Index(index_names)
print(index0.values)
# index0[2] = 'd' # 改变值会出错
```

#### 扔进去一个含有多元组的 List，就有了 MultiIndex

MyltiIndex 也是 immutable 的。

```python showLineNumbers
multi1 = pd.Index([['Row_' + str(x + 1), 'Col_' + str(y + 1)] for x in range(4) for y in range(4)])
multi1.name = ('index1', 'index2')
multi1
```

```python showLineNumbers
multi2 = pd.Index([('Row_' + str(x + 1), 'Col_' + str(y + 1)) for x in range(4) for y in range(4)])
multi2
```

```python showLineNumbers
# multi2.name = ['index1', 'index2'] # 出错
```

#### 对于 Series 来说，如果拥有了多重 Index，数据，变形

下列代码说明：

- 二重 MultiIndex 的 Series 可以 unstack()成 DataFrame
- DataFrame 可以 stack 成拥有二重 MultiIndex 的 Series

```python showLineNumbers
data_for_multi1 = pd.Series(range(0, 16), index=multi2)
data_for_multi1
```

```python showLineNumbers
data_for_multi1.unstack()
```

```python showLineNumbers
data_for_multi1.unstack().stack()
```

我们来看一下非平衡数据的例子：

Row_1,2,3,4 和 Col_1,2,3,4 并不是全组合的。

```python showLineNumbers
multi2 = pd.Index([('Row_' + str(x), 'Col_' + str(y + 1)) for x in range(5) for y in range(x)])
multi2
```

```python showLineNumbers
data_for_multi2 = pd.Series(np.arange(10), index=multi2)
data_for_multi2
```

```python showLineNumbers
data_for_multi2.unstack()
```

```python showLineNumbers
data_for_multi2.unstack().stack()
```

#### DateTime 标准库如此好用，你值得拥有

```python showLineNumbers
import datetime
dates = [datetime.datetime(2021, 1, 1), datetime.datetime(2021, 1, 8), datetime.datetime(2021, 1, 30)]
pd.DatetimeIndex(dates)
```

#### 如果你不仅需要时间格式统一，时间频率也要统一的话

```python showLineNumbers
periodindex1 = pd.period_range('2021-01', '2021-04', freq='M')
periodindex1
```

#### 月级精度和日级精度如何转换？

有的公司统一以 1 号代表当月，有的公司统一以最后一天代表当月，转化起来很麻烦，可以 asfreq

```python showLineNumbers
periodindex1.asfreq('D', how='start')
```

```python showLineNumbers
periodindex1.asfreq('D', how='end')
```

#### 最后的最后，我要真正把两种频率的时间精度匹配上？

```python showLineNumbers
periodindex_mon = pd.period_range('2021-01', '2021-03', freq='M').asfreq('D', how='start')
periodindex_day = pd.period_range('2021-01-01', '2021-03-01', freq='D')

periodindex_mon
```

```python showLineNumbers
periodindex_day
```

#### 粗粒度数据＋ reindex ＋ ffill/bfill

```python showLineNumbers
full_ts = pd.Series(periodindex_mon, index=periodindex_mon).reindex(periodindex_day)
full_ts.head()
```

```python showLineNumbers
full_ts = pd.Series(periodindex_mon, index=periodindex_mon).reindex(periodindex_day, method='ffill')
full_ts.head()
```

#### 关于索引，方便的操作有？

前面描述过了，索引有序，重复，但一定程度上又能通过 key 来访问，也就是说，某些集合操作都是可以支持的。

```python showLineNumbers
index1 = pd.Index(['A', 'B', 'B', 'C', 'C'])
index2 = pd.Index(['C', 'D', 'E', 'E', 'F'])
index3 = pd.Index(['B', 'C', 'A'])
print(index1.append(index2))
print(index1.difference(index2))
print(index1.intersection(index2))
print(index1.union(index2)) # Support unique-value Index well
print(index1.isin(index2))
print(index1.delete(2))
print(index1.insert(0, 'K')) # Not suggested
print(index3.drop('A')) # Support unique-value Index well
print(index1.is_monotonic, index2.is_monotonic, index3.is_monotonic)
print(index1.is_unique, index2.is_unique, index3.is_unique)
```

老生常谈，从基础来看，我们仍然关心 pandas 对于与外部数据是如何交互的。

### 2.1 结构化数据输入输出

- read_csv 与 to_csv 是一对输入输出的工具，read_csv 直接返回 pandas.DataFrame，而 to_csv 只要执行命令即可写文件
  - read_table：功能类似
  - read_fwf：操作 fixed width file
- read_excel 与 to_excel 方便的与 excel 交互

还记得刚开始的例子吗？

- header 表示数据中是否存在列名，如果在第 0 行就写就写 0，并且开始读数据时跳过相应的行数，不存在可以写 none
- names 表示要用给定的列名来作为最终的列名
- encoding 表示数据集的字符编码，通常而言一份数据为了方便的进行文件传输都以 utf-8 作为标准

提问：下列例子中，header=4，names=cnames 时，究竟会读到怎样的数据？

```python showLineNumbers
print('cnames:', cnames)
irisdata = pd.read_csv(iris_file, header=None, names=cnames, encoding='utf-8')
irisdata[::30]
```

希望了解全部参数的请移步 API：

[http://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_csv.html#pandas.read_csv](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_csv.html#pandas.read_csv)

这里介绍一些常用的参数：

读取处理：

- skiprows：跳过一定的行数
- nrows：仅读取一定的行数
- skipfooter：尾部有固定的行数永不读取
- skip_blank_lines：空行跳过

内容处理：

- sep/delimiter：分隔符很重要，常见的有逗号，空格和 Tab('\t')
- na_values：指定应该被当作 na_values 的数值
- thousands：处理数值类型时，每千位分隔符并不统一 (1.234.567,89 或者 1,234,567.89 都可能)，此时要把字符串转化为数字需要指明千位分隔符

收尾处理：

- index_col：将真实的某列（列的数目，甚至列名）当作 index
- squeeze：仅读到一列时，不再保存为 pandas.DataFrame 而是 pandas.Series

### 2.1.x Excel ... ?

对于存储着极为规整数据的 Excel 而言，其实是没必要一定用 Excel 来存，尽管 Pandas 也十分友好的提供了 I/O 接口。

```python showLineNumbers
iris_excel_file = 'irisdata.xls'
irisdata.to_excel(iris_excel_file, index=None)
irisdata_from_excel = pd.read_excel(iris_excel_file, header=0)
irisdata_from_excel[::30]
```

```python showLineNumbers
import os
os.remove(iris_excel_file)
```

唯一重要的参数：sheetname=k，标志着一个 excel 的第 k 个 sheet 页将会被取出。（从 0 开始）

### 2.2 半结构化数据

JSON：网络传输中常用的一种数据格式。

仔细看一下，实际上这就是我们平时收集到异源数据的风格是一致的：

- 列名不能完全匹配
- 关联键可能并不唯一
- 元数据被保存在数据里

```python showLineNumbers
import json
json_data = [{'name': 'Wang', 'sal': 50000, 'job': 'VP'},
             {'name': 'Zhang', 'job': 'Manager', 'report': 'VP'},
             {'name': 'Li', 'sal': 5000, 'report': 'Manager'}]
data_employee = pd.read_json(json.dumps(json_data))
data_employee_ri = data_employee.reindex(columns=['name', 'job', 'sal', 'report'])
data_employee_ri
```

在第一部分的基础上，数据会有更多种操作方式：

- 通过列名、行 index 来取数据，结合 ix、iloc 灵活的获取数据的一个子集（第一部分已经介绍）
- 按记录拼接（就像 Union All）或者关联（join）
- 方便的自定义函数映射
- 排序
- 缺失值处理
- 与 Excel 一样灵活的数据透视表（在第四部分更详细介绍）

### 3.1 数据整合：方便灵活

### 3.1.1 横向拼接：直接 DataFrame

```python showLineNumbers
import numpy as np
import pandas as pd
pd.DataFrame([np.random.rand(2), np.random.rand(2), np.random.rand(2)], columns=['C1', 'C2'])
```

### 3.1.2 横向拼接：Concatenate

```python showLineNumbers
import json
json_data = [{'name': 'Wang', 'sal': 50000, 'job': 'VP'},
             {'name': 'Zhang', 'job': 'Manager', 'report': 'VP'},
             {'name': 'Li', 'sal': 5000, 'report': 'Manager'}]
data_employee = pd.read_json(json.dumps(json_data))
data_employee_ri = data_employee.reindex(columns=['name', 'job', 'sal', 'report'])

pd.concat([data_employee_ri, data_employee_ri, data_employee_ri])
```

```python showLineNumbers
pd.concat([data_employee_ri, data_employee_ri, data_employee_ri],ignore_index=True)
```

### 3.1.3 纵向拼接：Merge

根据数据列关联，使用 on 关键字

- 可以指定一列或多列
- 可以使用 left_on 和 right_on

```python showLineNumbers
pd.merge(data_employee_ri, data_employee_ri, on='name')
```

```python showLineNumbers
pd.merge(data_employee_ri, data_employee_ri, on=['name', 'job'])
```

根据 index 关联，可以直接使用 left_index 和 right_index

```python showLineNumbers
data_employee_ri.index.name = 'index1'
pd.merge(data_employee_ri, data_employee_ri, left_index=True, right_index=True)
```

TIPS: 增加 how 关键字，并指定

- how = 'inner'
- how = 'left'
- how = 'right'
- how = 'outer'

结合 how，可以看到 merge 基本再现了 SQL 应有的功能，并保持代码整洁。

```python showLineNumbers
df31_a = pd.DataFrame({'name':['老王', '老张', '老李'], 'sal':[5000, 3000, 1000]})
df31_a
```

```python showLineNumbers
df31_b = pd.DataFrame({'name':['老王', '老刘'], 'job':['VP', 'Manager']})
df31_b
```

how='left': 保留左表信息

```python showLineNumbers
pd.merge(df31_a, df31_b, on='name', how='left')
```

how='right': 保留右表信息

```python showLineNumbers
pd.merge(df31_a, df31_b, on='name', how='right')
```

how='inner': 保留两表交集信息，这样尽量避免出现缺失值

```python showLineNumbers
pd.merge(df31_a, df31_b, on='name', how='inner')
```

how='outer': 保留两表并集信息，这样会导致缺失值，但最大程度的整合了已有信息

```python showLineNumbers
pd.merge(df31_a, df31_b, on='name', how='outer')
```

### 3.2 数据清洗三剑客

接下来的三个功能，**map**,**applymap**,**apply**,功能，是绝大多数数据分析师在数据清洗这一步骤中的必经之路。

他们分别回答了以下问题：

- 我想根据一列数据新做一列数据，怎么办？（Series->Series）
- 我想根据整张表的数据新做整张表，怎么办？ （DataFrame->DataFrame）
- 我想根据很多列的数据新做一列数据，怎么办？ （DataFrame->Series）

不要再写什么 for 循环了！改变思维，提高编码和执行效率

```python showLineNumbers
data_np = np.asarray([('Japan', 'Tokyo', 4000),
                      ('Korea', 'Seoul', 1300),
                      ('China', 'Beijing', 9100)])
df32 = pd.DataFrame(data_np, columns=['nation', 'capital', 'GDP'])
df32
```

map: 以相同规则将一列数据作一个映射，也就是进行相同函数的处理

```python showLineNumbers
def GDP_Factorize(v):
    fv = np.float64(v)
    if fv > 6000.0:
        return 'High'
    elif fv < 2000.0:
        return 'Low'
    else:
        return 'Medium'

df32['GDP_Level'] = df32['GDP'].map(GDP_Factorize)
df32['NATION'] = df32.nation.map(str.upper)
df32
```

类似的功能还有 applymap，可以对一个 dataframe 里面每一个元素像 map 那样全局操作

```python showLineNumbers
df32.applymap(lambda x: float(x)*2 if x.isdigit() else x.upper())
```

apply 则可以对一个 DataFrame 操作得到一个 Series

他会有点像我们后面介绍的 agg,但是 apply 可以按行操作和按列操作，用 axis 控制即可。

```python showLineNumbers
df32.apply(lambda x: x['nation'] + x['capital'] + '_' + x['GDP'], axis=1)
```

### 3.3 数据排序

- sort: 按一列或者多列的值进行行级排序
- sort_index: 根据 index 里的取值进行排序，而且可以根据 axis 决定是重排行还是列

```python showLineNumbers
data_np = np.asarray([('Japan', 'Tokyo', 4000),
                      ('Korea', 'Seoul', 1300),
                      ('China', 'Beijing', 9100)])
df33 = pd.DataFrame(data_np, columns=['nation', 'capital', 'GDP'])
df33
```

```python showLineNumbers
df33.sort_values(['capital', 'nation'])
```

```python showLineNumbers
df33.sort_values('GDP', ascending=False)
```

```python showLineNumbers
df33.sort_index(axis=1, ascending=True)
```

一个好用的功能：Rank

```python showLineNumbers
df33
```

```python showLineNumbers
df33.rank()
```

```python showLineNumbers
df33.rank(ascending=False)
```

注意 tied data（相同值）的处理：

- method = 'average'
- method = 'min'
- method = 'max'
- method = 'first'

```python showLineNumbers
df33x = pd.DataFrame({'name': ['老王', '老张', '老李', '老刘'],
                      'sal': np.array([5000, 3000, 5000, 9000])})
df33x
```

df33x.rank()默认使用 method='average'，两条数据相等时，处理排名时大家都用平均值

```python showLineNumbers
df33x.sal.rank()
```

method='min'，处理排名时大家都用最小值

```python showLineNumbers
df33x.sal.rank(method='min')
```

method='max'，处理排名时大家都用最大值

```python showLineNumbers
df33x.sal.rank(method='max')
```

method='first'，处理排名时谁先出现就先给谁较小的数值。

```python showLineNumbers
df33x.sal.rank(method='first')
```

### 3.4 缺失数据处理

```python showLineNumbers
i = pd.Index([('Row_' + str(x), 'Col_' + str(y + 1)) for x in range(5) for y in range(x)])
data_multi = pd.Series(np.arange(10), index=i)
df34 = data_multi.unstack()
df34
```

忽略缺失值：

```python showLineNumbers
df34.mean(skipna=True)
```

```python showLineNumbers
df34.mean(skipna=False)
```

如果不想忽略缺失值的话，就需要祭出 fillna 了：

```python showLineNumbers
df34
```

```python showLineNumbers
df34.fillna(0).mean(axis=1, skipna=False)
```

### Pandas 的 groupby

groupby 的功能类似 SQL 的 group by 关键字：

Split-Apply-Combine

- Split，就是按照规则分组
- Apply，通过一定的 agg 函数来获得输入 pd.Series 返回一个值的效果
- Combine，把结果收集起来

Pandas 的 groupby 的灵活性：

- 分组的关键字可以来自于 index，也可以来自于真实的列数据
- 分组规则可以通过一列或者多列

分组的具体逻辑

```python showLineNumbers
iris_file = '../data/numpy/iris.data.txt'
cnames = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class']

irisdata = pd.read_csv(iris_file, names=cnames, encoding='utf-8')
irisdata
```

```python showLineNumbers
irisdata_group = irisdata.groupby('class')
irisdata_group
```

```python showLineNumbers
for level, subsetDF in irisdata_group:
    print(level)
    print(subsetDF[::20])
```

分组可以快速实现 MapReduce 的逻辑

- Map: 指定分组的列标签，不同的值就会被扔到不同的分组处理
- Reduce: 输入多个值，返回一个值，一般可以通过 agg 实现，agg 能接受一个函数

```python showLineNumbers
irisdata.groupby('class').agg(lambda x:((x - x.mean())**3).sum() * (len(x) - 0.0) /
                (len(x) - 1.0) / (len(x) - 2.0) / (x.std() * np.sqrt((len(x) - 0.0) /
                                                                     (len(x)-1.0)))**3 if len(x) > 2 else None)
```

```python showLineNumbers
import scipy.stats
irisdata.groupby('class').agg(scipy.stats.skew)
```

#### 汇总之后的广播操作

在 OLAP 数据库上，为了避免 groupby+join 的二次操作，提出了 sum()over(partition by)的开窗操作。

在 Pandas 中，这种操作能够进一步被 transform 所取代。

```python showLineNumbers
pd.concat([irisdata, irisdata.groupby('class').transform('mean')], axis=1)[::20]
```

#### 产生 MultiIndex（多列分组）后的数据透视表操作

一般来说，多列 groupby 的一个副作用就是.groupby().agg()之后你的行 index 已经变成了一个多列分组的分级索引。

如果我们希望达到 Excel 的数据透视表的效果，行和列的索引自由交换，达到统计目的，究竟应该怎么办呢？

```python showLineNumbers
factor1 = np.random.randint(0, 3, 50)
factor2 = np.random.randint(0, 2, 50)
factor3 = np.random.randint(0, 3, 50)
values = np.random.randn(50)
```

```python showLineNumbers
hierindexDF = pd.DataFrame({'F1': factor1, 'F2': factor2, 'F3': factor3, 'F4': values})
hierindexDF.tail()
```

```python showLineNumbers
hierindexDF_gbsum = hierindexDF.groupby(['F1', 'F2', 'F3']).sum()
hierindexDF_gbsum
```

观察 Index：

```python showLineNumbers
hierindexDF_gbsum.index
```

unstack：

- 无参数时，把最末 index 置换到 column 上
- 有数字参数时，把指定位置的 index 置换到 column 上
- 有列表参数时，依次把特定位置的 index 置换到 column 上

```python showLineNumbers
hierindexDF_gbsum.unstack()
```

```python showLineNumbers
hierindexDF_gbsum.unstack(0)
```

```python showLineNumbers
hierindexDF_gbsum.unstack(1)
```

```python showLineNumbers
hierindexDF_gbsum.unstack([2,0])
```

更进一步的，stack 的功能是和 unstack 对应，把 column 上的多级索引换到 index 上去

```python showLineNumbers
hierindexDF_gbsum.unstack([2, 0]).stack([1, 2])
```
