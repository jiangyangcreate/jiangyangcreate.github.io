---
sidebar_position: 3
title: Python进阶
---

本部分侧重于介绍常用的，与开发息息相关的[Python标准库](https://docs.python.org/zh-cn/3.13/library/index.html)。

Python 标准库非常庞大，所提供的组件涉及范围十分广泛，正如以下内容目录所显示的。这个库包含了多个内置模块 (以 C 编写)，Python 程序员必须依靠它们来实现系统级功能，例如文件 I/O，此外还有大量以 Python 编写的模块，提供了日常编程中许多问题的标准解决方案。其中有些模块经过专门设计，通过将特定平台功能抽象化为平台中立的 API 来鼓励和加强 Python 程序的可移植性。

Windows 版本的 Python 安装程序通常包含整个标准库，往往还包含许多额外组件。对于类 Unix 操作系统，Python 通常会分成一系列的软件包，因此可能需要使用操作系统所提供的包管理工具来获取部分或全部可选组件。


## 数据类型

### 👍enum 模块

基本示例

```python showLineNumbers
from enum import Enum

class TrafficLight(Enum):
    RED = 1
    YELLOW = 2
    GREEN = 3
    # YELLOW = 1  #常见错误：将枚举成员的值设置为相同类型
    # RED = [255, 0, 0] # 常见错误：错误地将枚举成员的值设置为可变类型
    # YELLOW = None # 常见错误：错误地将枚举成员的值设置为None、False、True等
# 使用枚举
light = TrafficLight.RED

# if light == 1   常见错误：错误地使用Enum成员进行比较
if light == TrafficLight.RED:
    print("红灯，停车")
elif light == TrafficLight.YELLOW:
    print("黄灯，准备")
else:
    print("绿灯，通行")
```

是否使用`Enum`取决于你项目的需求和代码的复杂度。你可能觉得不需要它，尤其是在简单的场景下，直接使用字符串或整数常量看似足够。但是，`Enum`有以下几个优势：

#### 1. **增加可读性**
   当你看到`Color.RED`时，比直接看到一个`1`或`'red'`更容易理解。`Enum`能让你的代码更具语义化，避免硬编码的常量值。
   
   例如：
   ```python
   status = Status.SUCCESS  # 一目了然：状态是成功
   ```
   相比：
   ```python
   status = 1  # 需要额外判断 1 是什么意义
   ```

#### 2. **减少错误**
   使用`Enum`可以避免常见的错误，比如不小心使用了错误的值或者字符串拼写错误。`Enum`成员是唯一的，且不可变的，能够防止无意间改变它们的值。
   
   比如，如果你用了`Status.SUCCESS = 1`，然后在后续代码中某处错误地设置了`Status.SUCCESS = 2`，你会收到警告或报错，而不是默默覆盖，产生潜在的 bug。

#### 3. **类型安全**
   使用`Enum`可以确保变量的值只来自于枚举成员，而不会误用其他类型的值（如普通的数字、字符串等）。这对于大型项目来说尤其重要，因为它能有效地避免一些奇怪的 bug。
   
   比如：
   ```python
   def set_color(color: Color):
       if not isinstance(color, Color):
           raise ValueError("Invalid color")
   ```

#### 4. **易于扩展和维护**
   随着项目的扩展，你可能会有更多的常量值需要添加，`Enum`让这种扩展变得更清晰、更系统化。你不再需要在多个地方定义相同的常量，所有的常量都集中在一个地方。
   
   比如，随着系统需求变化，你可能需要扩展交通灯的状态：
   ```python
   class TrafficLight(Enum):
       RED = 1
       YELLOW = 2
       GREEN = 3
       FLASHING = 4  # 新增状态
   ```

#### 5. **集成与协作的优势**
   在多人开发的团队中，使用`Enum`可以提高协作性。它使得每个成员的代码中常量的含义更加清晰，减少误解或重复定义的问题。

#### 6. **可迭代、可比较**
   `Enum`支持迭代、比较等操作，允许你灵活处理。例如，你可以遍历所有的`Enum`成员，或者比较它们的顺序。
   
   ```python
   for state in TrafficLight:
       print(state)
   ```

## 文件

### os 模块

库、包、模块的包含关系为：多个模块组成为包、多个包组成为库。

在实际开发中不做严格区分。

Python 标准库：Python 内置的库，不需要安装，直接导入即可使用。

以 Python 的内置 os 模块为例，是与操作系统进行交互的模块，主要有如下功能：

#### 文件路径操作

- os.remove(path) 或 os.unlink(path) ：删除指定路径的文件。路径可以是全名，也可以是当前工作目录下的路径。
- os.removedirs：删除文件，并删除中间路径中的空文件夹
- os.chdir(path)：将当前工作目录改变为指定的路径
- os.getcwd()：返回当前的工作目录
- os.curdir：表示当前目录的符号
- os.rename(old, new)：重命名文件
- os.renames(old, new)：重命名文件，如果中间路径的文件夹不存在，则创建文件夹
- os.listdir(path)：返回给定目录下的所有文件夹和文件名，不包括 '.' 和 '..' 以及子文件夹下的目录。（'.' 和 '..' 分别指当前目录和父目录）
- os.mkdir(name)：产生新文件夹
- os.makedirs(name)：产生新文件夹，如果中间路径的文件夹不存在，则创建文件夹

导入该模块：

```python showLineNumbers
import os
```

产生文件：

```python showLineNumbers
f = open('test.file', 'w')
f.close()
print('test.file' in os.listdir(os.curdir))
```

重命名文件:

```python showLineNumbers
os.rename("test.file", "test.new.file")
print("test.file" in os.listdir(os.curdir))
print("test.new.file" in os.listdir(os.curdir))
```

```python showLineNumbers
# 删除文件
os.remove("test.new.file")
```

#### 系统常量

- windows 为 \r\n
- unix 为 \n

```python showLineNumbers
os.linesep
```

```python showLineNumbers
# 当前操作系统的路径分隔符：
os.sep
```

当前操作系统的环境变量中的分隔符（';' 或 ':'）：

- windows 为 ;
- unix 为:

```python showLineNumbers
os.pathsep
```

os.environ 是一个存储所有环境变量的值的字典，可以修改。

```python showLineNumbers
os.environ
```

#### os.path 模块

```python showLineNumbers
import os.path
```

- os.path.isfile(path) ：检测一个路径是否为普通文件
- os.path.isdir(path)：检测一个路径是否为文件夹
- os.path.exists(path)：检测路径是否存在
- os.path.isabs(path)：检测路径是否为绝对路径

windows 系统：

```python showLineNumbers
print(os.path.isfile("C:/Windows"))
print(os.path.isdir("C:/Windows"))
print(os.path.exists("C:/Windows"))
print(os.path.isabs("C:/Windows"))
```

unix 系统：

```python showLineNumbers
print(os.path.isfile("/Users"))
print(os.path.isdir("/Users"))
print(os.path.exists("/Users"))
print(os.path.isabs("/Users"))
```

#### split 和 join

- os.path.split(path)：拆分一个路径为 (head, tail) 两部分
- os.path.join(a, \*p)：使用系统的路径分隔符，将各个部分合成一个路径

```python showLineNumbers
head, tail = os.path.split("c:/tem/b.txt")
print(head, tail)
```

```python showLineNumbers
a = "c:/tem"
b = "b.txt"
os.path.join(a, b)
```

```python showLineNumbers
def get_files(dir_path):
    '''
    列出文件夹下的所有文件
    :param dir_path: 父文件夹路径
    :return:
    '''
    for parent, dirname, filenames in os.walk(dir_path):
        for filename in filenames:
            print("parent is:", parent)
            print("filename is:", filename)
            print("full name of the file is:", os.path.join(parent, filename))
```

列出当前文件夹的所有文件：

```python showLineNumbers
dir = os.curdir
get_files(dir)
```

#### Byte Code 编译

Python, Java 等语言先将代码编译为 byte code（不是机器码），然后再处理：

> .py -> .pyc -> interpreter

eval(statement, glob, local)

使用 eval 函数动态执行代码，返回执行的值。

exec(statement, glob, local)

使用 exec 可以添加修改原有的变量:

```python showLineNumbers
a = 1
exec('b = a + 10')
print(b)
```

```python showLineNumbers
local = dict(a=2)
glob = {}
exec("b = a+1", glob, local)

print(local)
```

compile 函数生成 byte code：
compile(str, filename, mode)

```python showLineNumbers
a = 1
b = compile('a+2', '', 'eval')
print(eval(b))
```

```python showLineNumbers
a = 1
c = compile("b=a+4", "", 'exec')
exec(c)
print(b)
```

```python showLineNumbers
# abstract syntax trees
import ast

tree = ast.parse('a+10', '', 'eval')
ast.dump(tree)
```

```python showLineNumbers
a = 1
c = compile(tree, '', 'eval')
d = eval(c)
print(d)
```

```python showLineNumbers
# 安全的使用方法 literal_eval ，只支持基本值的操作：
b = ast.literal_eval('[10.0, 2, True, "foo"]')
print(b)
```

### open

#### 写文件

我们使用 open 函数的写入模式来写文件：

```python showLineNumbers
f = open('test.txt', 'w')
f.write('hello world.')
f.close()
```

```python showLineNumbers
print(open('test.txt').read())
```

使用 w 模式时，如果文件不存在会被创建

除了写入模式，还有追加模式 a

读写模式 w+

```python showLineNumbers
f = open('test.txt', 'w+')
f.write('hello world. morning.')
f.seek(3)
print(f.read())  # hello world.
f.close()
```

#### 读文件

使用 open 函数 来读文件，使用文件名的字符串作为输入参数：

默认打开文件是 ‘r’ 读模式

```python showLineNumbers
f = open("test.txt")

# 默认以读的方式打开文件，如果文件不存在会报错。
# 可以使用 read 方法来读入文件中的所有内容：
text = f.read()
print(text)
```

按照行读入内容，readlines 方法返回一个列表，每个元素代表文件中每一行的内容：

```python showLineNumbers
f = open("test.txt")
lines = f.readlines()
print(lines)
f.close()
```

```python showLineNumbers
# 事实上，我们可以将 f 放在一个循环中，得到它每一行的内容：
f = open('test.txt')
for line in f:
    print(line)
f.close()
```

#### 上下文管理器

```python showLineNumbers
with open('my_file.txt', 'w') as fp:
    data = fp.write("Hello world")
```

这等效于下面的代码，但是要更简便：

```python showLineNumbers
fp = open('my_file.txt', 'w')
try:
    # do stuff with f
    data = fp.write("Hello world")
finally:
    fp.close()
```

#### 自定义上下文管理器

比如可以这样定义一个简单的上下文管理器：

```python showLineNumbers
class ContextManager(object):
    def __enter__(self):
        print("Entering")

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")


with ContextManager():
    print("inside operate")
```

#### **enter** 的返回值

如果在 **enter** 方法下添加了返回值，

那么我们可以使用 as 把这个返回值传给某个参数：

```python showLineNumbers
class ContextManager2(object):
    def __enter__(self):
        print("Entering")
        return "my value"

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")


with ContextManager2() as val:
    print(val)

```

一个通常的做法是将 **enter** 的返回值设为这个上下文管理器对象本身，
文件对象就是这样做的.

```python showLineNumbers
class ContextManager3(object):
    def __enter__(self):
        print("Entering")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")

```

#### 错误处理

上下文管理器对象将错误处理交给 **exit** 进行，可以将错误类型，
错误值和 traceback 等内容作为参数传递给 **exit** 函数：

```python showLineNumbers
class ContextManager4(object):
    def __enter__(self):
        print("Entering")

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")
        if exc_type is not None:
            print("  Exception:", exc_value)
            return True  # 不想让错误抛出，只需要将 __exit__ 的返回值设为 True


with ContextManager4():
    print(1 / 0)

```

```python showLineNumbers
import os
os.remove('my_file.txt')
```

#### 二进制文件

二进制读写模式 b：

```python showLineNumbers
import os

f = open('binary.bin', 'wb')
f.write(os.urandom(10))
f.close()
```

```python showLineNumbers
f = open('binary.bin', 'rb')
print(repr(f.read()))
f.close()
```

#### with 方法

事实上，Python 提供了更安全的方法，当 with 块的内容结束后，
Python 会自动调用它的 close 方法，确保读写的安全：

```python showLineNumbers
with open('new_file.txt', 'w') as f:
    for i in range(3000):
        x = 1.0 / (i - 1000)
        f.write('hello world: ' + str(i) + '\n')
```

与 try/exception/finally 效果相同，但更简单。

查看文件写的结果，虽然触发 error，但已经写的内容是成功的。

```python showLineNumbers
!tail new_file.txt
```

```python showLineNumbers
!wc -l new_file.txt
```

```python showLineNumbers
# 删除文件：
import os
os.remove('test.txt')
os.remove('binary.bin')
os.remove('new_file.txt')
```


### 🚧tempfile 模块

tempfile 模块是 Python 标准库中的一个模块，用于创建和操作临时文件和目录。它可以帮助程序员在运行时生成临时文件，并且在程序结束时自动删除这些文件，从而避免留下不必要的临时文件。tempfile 模块特别适用于那些需要在运行时创建临时文件来存储中间数据的应用场景。

### 🚧pathlib 模块

### 🚧shutil 模块

### 🚧sys 模块

## 数据处理

### json 模块

json 模块提供了 python->json 以及 json->python 两种格式，转换规则如下

| JSON ->        | Python -> | JSON           |
| -------------- | --------- | -------------- |
| object -- 对象 | dict      | object -- 对象 |
| array          | list      | array          |
| string         | str       | string         |
| number (int)   | int       | number         |
| number (real)  | float     | number         |
| TRUE           | true      |                |
| FALSE          | false     |                |
|                | TRUE      | true           |
|                | FALSE     | false          |
| null           | None      | null           |
|                | tuple     | array          |

注意：JSON 中的键-值对中的键永远是 str 类型的。当一个对象被转化为
JSON 时，字典中所有的键都会被强制转换为字符串。这所造成的结果是字典被转换为 JSON 然后转换回字典时可能和原来的不相等。换句话说，如果 x 具有非字符串的键，则有 loads(dumps(x)) != x。

json 模块还有一些其他参数可以控制：编码形式、格式化输出等，不过很少用到

[json 官方模块文档](https://docs.python.org/zh-cn/3/library/json.html#module-json)

#### json.load 与 json.dump

json.load 与 json.dump 是基于文件的转换

```python showLineNumbers
import json

data = {
    "name": "Satyam kumar",
    "place": "patna",
    "skills": [
        "Raspberry pi",
        "Machine Learning",
        "Web Development"
    ],
    "email": "xyz@gmail.com",
    "projects": [
        "Python Data Mining",
        "Python Data Science"
    ]
}
with open("data_file.json", "w") as write:
    json.dump(data, write)

with open("data_file.json", "r") as read_content:
    print(json.load(read_content))
```

#### json.loads 与 json.dumps

json.load 与 json.dump 是直接基于数据的转换

```python showLineNumbers
import json

# JSON string:
# Multi-line string
data = """{
    "Name": "Jennifer Smith",
    "Contact Number": 7867567898,
    "Email": "jen123@gmail.com",
    "Hobbies":["Reading", "Sketching", "Horse Riding"]
    }"""

# parse data:
res_p = json.loads(data)
print(type(res_p)) # <class 'dict'>

res_j = json.dumps(res_p)
print(type(res_j)) # <class 'str'>
```


### re 模块 （正则表达式）

正则表达式作为多编程语言中的数据匹配工具，实用又简单，预计学习时长 8 小时。这里送上学习笔记和思维导图。

<MarkmapHooks initialMarkdown={`

# 正则表达式

## 概括字符集

### \\d：表示该位置上的字符是数字，即匹配成功
- 等价于[0-9]
### \\D：表示该位置上的字符不是数字，即匹配成功
- 等价于[^0-9]
### \\w：表示该位置上的字符是字母或，即匹配成功
- 等价于[A-Za-z ]
### \\W：表示该位置上的字符不是是字母或_，即匹配成功
- 等价于[^A-Za-z_]
### \\s：表示该位置上是不可见字符(空格、制表符\\t、垂直制表符\\v、回车符\\r、换行符\\n、换页符\\f)，即匹配成功
- 等价于[\\n\\t\\r\\f\\v]
### \\S：表示该位置上不是不可见字符，即匹配成功

## 数量词

### {3}：表示前面的一个字符出现3次
### {3,8}：表示前面的一个字符出现3-8次
### ?：表示前面的一个字符出现0次或1次
### +：表示前面的一个字符出现1次或无限多次
### *：表示前面的一个字符出现0次或无限多次

## 边界匹配符

### ^：表示只要是以后面的字符开头的，即匹配成功
### $：表示只要是以前面的字符结尾的，即匹配成功
### .：表示一个除换行符\n以外的所有字符
### \\b：匹配一个单词边界，也就是指单词和空格间的位置。例如，'er\b' 可以匹配"never"中的'er'，但不能匹配"verb" 中的'er'。
### \\B：匹配非单词边界。'er\B'能匹配"verb"中的er'，但不能匹配"never" 中的'er'。

## 元字符

### [a-z]：表示该位置上的字符在a-z之间，即匹配成功
### [^a-z]：表示该位置上的字符不在a-z之间，即匹配成功
### [abf]：表示该位置上的字符为a或者b或者f，即匹配成功
- result = re.findall('a[de]c', target)

## 修饰符

### re.I：使匹配对大小写不敏感
### re.L：做本地化识别(locale-aware)匹配
### re.M：多行匹配，影响 ^和$
### re.S：使.匹配包括换行在内的所有字符
### re.U：根据Unicode字符集解析字符。这个标志影响\w, \W, \b, \B.
### re.X：该标志通过给予你更灵活的格式以便你将正则表达式写得更易于理解。

## 匹配所有

### findall

- 如果匹配到就返回一个列表，没有匹配到就返回空列表。

### finditer

- 和 findal 类似，在字符串中找到正则表达式所匹配的所有子串，并把它们作为一个迭代器返回。

## 匹配一次

### match

#### re.match(pattern, string, flags=0)

- pattern: 匹配的正则表达式
- string: 要匹配的字符串
- flags: 标志位，用于控制正则表达式的匹配方式，如是否区分大小写，多行匹配等等。参见:正则表达式修饰符中可选标志
- re.match只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回None

### search

#### re.search(pattern, string, flags=0)
- pattern: 匹配的正则表达式
- string: 要匹配的字符串
- flags: 标志位，用于控制正则表达式的匹配方式，如是否区分大小写，多行匹配等等。参见:正则表达式修饰符中可选标志
- re.search匹配整个字符串，直到找到一个匹配。

## 组

### (\\d+)

- ()内的内容构成一个组，只要当前位置满足\d+就匹配成功，返回()内匹配成功的内容

### group(num=0)

- 匹配的整个表达式的字符串，group() 可以一次输入多个组号，在这种情况下它将返回一个包含那些组所对应值的元组。

### group()

- 返回一个包含所有小组字符串的元组，从1到 所含的小组号。

## 序列

### str.span()

- #返回匹配值的下标,左闭右开

## 检索和替换

### re.sub(pattern, repl, string, count=0, flags=0)

- pattern: 正则中的模式字符串。
- repl: 替换的字符串，也可为一个函数。
- string: 要被查找替换的原始字符串。
- count: 模式匹配后替换的最大次数，默认 0 表示替换所有的匹配。

## 编译正则表达式

### re.compile(pattern[, flags])
- pattern: 一个字符串形式的正则表达式
- flags: 可选，表示匹配模式，比如忽略大小写，多行模式等，具体参数为：re.I, re.M
- compile 函数用于编译正则表达式，生成一个正则表达式(Pattern)对象，供match()和 search() 这两个函数使用。

## 正则分割

### re.split(pattern, string[, maxsplit=0, flags=0])

- pattern: 正则中的模式字符串。
- string: 要匹配的字符串。
- maxsplit: 分隔次数，maxsplit=1 分隔一次，默认为 0，不限制次数。
- flags: 标志位，用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等。

## 贪婪和非贪婪

### 贪婪模式就是尽可能多地去匹配字符

### 非贪婪模式就是尽可能少地去匹配字符，python默认采取的是贪婪模式。

`} />

经典示例

```python showLineNumbers
import re

# findall
target = 'life is short, i learn python.'
result = re.findall('python', target)
result1 = re.findall('java', target)
# findall是re库的一个重要方法，第一个参数是匹配规则，第二个参数是要匹配的目标字符串，还有第三个参数，我们之后讲，findall返回的结果是一个列表。
# result这行代码的意思是从target中匹配'python',如果匹配到就返回，没有匹配到就返回空列表。
print(result)# 得到的结果是['python']
print(result1)# 得到的结果是[]


# 元字符
target = 'abc acc aec agc adc aic'
result = re.findall('a[de]c', target)
# 这一行中的[de]表示这个位置上的字符是d或者是e都可以匹配出来
print(result)# 得到的结果是['aec', 'adc']

result = re.findall('a[b‐z]c', target)
# 这一行中的[b‐z]表示这个位置上的字符在b‐z范围内都可以匹配出来
print(result)# 得到的结果是['abc', 'acc', 'aec', 'agc', 'adc', 'aic']

result = re.findall('a[^c‐z]c', target)
# 这一行中的[^c‐z]表示这个位置上的字符不在c‐z范围内都可以匹配出来，注意是不在
print(result)# 得到的结果是['abc']


# 示例
text = '我住在3号楼666,我的电话号码是17606000003你后面有事给我打电话，打不通就打17327567890。实在不行就打固定电话010-7788'
result = re.findall('\d{3}[\d-]\d*',text)
# \d{3}代表至少3个数字起匹配（区号和电话号码都满足）
# [\d-]代表后面跟着的可以是数字（电话号码），也可以是-
# \d*代表后面的数字我都要
print(result)#结果是['17606000003', '17327567890', '010-7788']


# 分组
line = "Cats are smarter than dogs"
matchObj = re.match( r'(.*) are (.*?) .*', line, re.M|re.I)
#re.M表示多行匹配，影响 ^ 和 $
#re.I 使匹配对大小写不敏感
if matchObj:
   print ("matchObj.group() : ", matchObj.group())#返回所有组
   print ("matchObj.group(1) : ", matchObj.group(1)) # 返回组1【注意不是从0开始】
   print ("matchObj.group(2) : ", matchObj.groups())# 返回所有组的元组形式
else:
   print ("No match!!")


# 替换与检索sub
phone = "2004-959-559 # 这是一个国外电话号码"
# 删除字符串中的 Python注释
num = re.sub(r'#.*$', "", phone)
print ("电话号码是: ", num)
# 删除非数字(-)的字符串
num = re.sub(r'\D', "", phone)
print ("电话号码是 : ", num)

# 将匹配的数字乘以 2
def double(matched):
    value = int(matched.group('value'))
    return str(value * 2)
s = 'A23G4HFD567'
print(re.sub('(?P<value>\d+)', double, s))


#贪婪与非贪婪
content = '发布于2018/12/23'
result = re.findall('.*?(\d.*\d)', content)
# 这里的?表示的就是非贪婪模式，第一个.*会尽可能少地去匹配内容，因为后面跟的是\d，所以碰见第一个数字就终止了。
print(result)

result = re.findall('.*(\d.*\d)', content)
# 这里的第一个.*后面没有添加问号，表示的就是贪婪模式，第一个.*会尽可能多地去匹配
#内容，后面跟的是\d，碰见第一个数字并不一定会终止，当它匹配到2018的2的时候，发现剩#下的内容依然满足(\d.*\d)，所以会一直匹配下去，直到匹配到12后面的/的时候，发现剩下
#的23依然满足(\d.*\d)，但是如果再匹配下去，匹配到23的2的话，剩下的3就不满足
#(\d.*\d)了，所以第一个.*就会停止匹配，(\d.*\d)最终匹配到的结果就只剩下23了。
print(result)

result = re.findall('.*?(\d.*?\d)', content)
# 这里的第一个.*?表示非贪婪模式(非贪婪模式就是尽可能少地去匹配字符)，匹配到2018前面的'于'之后就停止了
# 括号里的.*?也是表示非贪婪模式，括号里的内容从2018的2开始匹配，因为后面一个数字
#是0，那么也就满足了(\d.*?\d)，所以就直接返回结果了，同样的，接下来的18也是这样，一
#直匹配到23才结束
print(result)
```

### 🚧pickle 模块

pickle 模块是 Python 标准库中的一个模块，用于序列化和反序列化 Python 对象。它可以将 Python 对象转换为字节流，并将其保存到文件中，或者从文件中读取字节流并转换回 Python 对象。

### 🚧sqlite3 模块

sqlite3 模块是 Python 标准库中的一个模块，用于访问 SQLite 数据库。SQLite 是一个轻量级的关系型数据库管理系统，它不需要单独的服务器进程或配置，适合于嵌入式系统和小型应用程序。



## 并发

### multiprocessing 模块

进程是系统独立安排和分配系统资源（CPU、内存）的基本单位，操作系统以进程为单位分配存储空间，操作系统管理所有进程的执行，为它们合理的分配资源。

一个进程就是 macOS 中的“活动监视器”、Windows 中的“任务管理器”的一个执行程序。

Python 既支持多进程又支持多线程。

#### 多进程

进程之间是相互独立的，Python 中的进程通信一般由进程对 Queue 完成。

进程绕过了全局解释器锁。因此，多进程模块允许程序员充分利用特定机器上的多个处理器。它在 Unix 和 Windows 上都能运行。

进程的数量等于 CPU 核心的数量，这是最有效的。如果核数太多，就不能充分利用核数。如果太少，会造成进程切换，增加程序的运行时间。

[multiprocessing](https://docs.python.org/zh-cn/3.10/library/multiprocessing.html?highlight=multiprocessing#module-multiprocessing):Multiprocessing Module Code Documentation

```python showLineNumbers
from multiprocessing import Pool

def f(vaule):
    x = vaule[0]
    y = vaule[1]
    return x*y

if __name__ == '__main__':
    p = Pool(16) # new 16 process pools ， because i have 16 cpu
    print(p.map(f, [(1,1), (2,2), (3,3)])) # take in data
    p.close() # close pool

# [1, 4, 9]
```

我们来完成 1~100000000 求和的计算密集型任务，循环解决，暂时也不考虑列表切片操作花费的时间，只是把做运算和合并运算结果的时间统计出来。

```python showLineNumbers
from time import time


def main():
    total = 0
    number_list = [x for x in range(1, 100000001)]
    start = time()
    for number in number_list:
        total += number
    print(total)
    end = time()
    print('Execution time: %.3fs' % (end - start))

```

```python showLineNumbers
main()
# 5000000050000000
# Execution time: 6.798s
```

利用多进程“分而治之”，

当我们将这个任务分解到 8 个进程中去执行：

```python showLineNumbers
from multiprocessing import Process, Queue
from time import time

core_num = 8


def task_handler(curr_list, result_queue):
    total = 0
    for number in curr_list:
        total += number
    result_queue.put(total)


def main():
    processes = []
    number_list = [x for x in range(1, 100000001)]
    result_queue = Queue()
    index = 0
    # 启动core_num(8)个进程将数据切片后进行运算
    index_batch = int(100000000 / core_num)
    for _ in range(core_num):
        p = Process(target=task_handler,
                    args=(number_list[index:index + index_batch], result_queue))
        index += index_batch
        processes.append(p)
        p.start()
    # 开始记录所有进程执行完成花费的时间
    start = time()
    for p in processes:
        p.join()
    # 合并执行结果
    total = 0
    while not result_queue.empty():
        total += result_queue.get()
    print(total)
    end = time()
    print('Execution time: ', (end - start), 's', sep='')


if __name__ == '__main__':
    main()

```

以上代码保存为 multi_process.py

```python showLineNumbers
!python multi_process.py
```

```python showLineNumbers
# 5000000050000000
# Execution time: 0.7936668395996094s
```

明显，多进程更快。

使用多进程后由于获得了更多的 CPU 执行时间以及更好的利用了 CPU 的多核特性，明显的减少了程序的执行时间，而且计算量越大效果越明显。

### threading 模块

线程是系统调度资源的最小单位（CPU 通过计时器来切换线程）

在 Python 中，同个时间只有一个线程在运行

当然，如果你运行大量的 I/O 任务，多进程依然是最好的选择

线程数等于 CPU 内核数的两倍是最高效的。

GIL 是一个防止多个线程同时执行 Python 字节码的互斥锁。之所以需要这种锁，主要是因为 CPython 的内存管理不是线程安全的

在这种环境下，GIL 限制解释器本身只能有一个线程运行，而且任何 Python 解释器级别的操作都是序列化的，因此任何时候都只能有一条语句抛出异常。与异常相关的共享变量也因此受到保护。

线程间通信的目的主要是为了线程同步，因此线程没有像进程通信那样用于数据交换的通信机制。

Python 的标准库提供了两个模块：\_thread 和 threading，\_thread 是低级模块，threading 是高级模块，对\_thread 进行了封装。绝大多数情况下，我们只需要使用 threading 这个高级模块。

[threading](https://docs.python.org/zh-cn/3.10/library/threading.html?highlight=threading#module-threading):Threading Multiprocessing Module Code Documentation

#### 多线程

```python showLineNumbers

import time
import threading


def test_thread(para='hi', sleep=3):
    time.sleep(sleep)
    print(para)


def main():
    # create thread
    thread_hi = threading.Thread(target=test_thread)
    thread_hello = threading.Thread(target=test_thread, args=('hello', 1))
    # run thread
    thread_hi.start()
    thread_hello.start()
    print('Main thread has ended!')


if __name__ == '__main__':
    main()

```

如下所示的界面中，有“下载”和“关于”两个按钮，用休眠的方式模拟点击“下载”按钮会联网下载文件需要耗费 10 秒的时间，当点击“下载”按钮后，整个任务阻塞：

```python showLineNumbers
import time
import tkinter
import tkinter.messagebox


def download():
    # 模拟下载任务需要花费5秒钟时间
    time.sleep(5)
    tkinter.messagebox.showinfo('提示', '下载完成!')


def show_about():
    tkinter.messagebox.showinfo('关于', '作者: 123(v1.0)')


def main():
    top = tkinter.Tk()
    top.title('单线程')
    top.geometry('400x400')
    top.wm_attributes('-topmost', True)

    panel = tkinter.Frame(top)
    button1 = tkinter.Button(panel, text='下载', command=download)
    button1.pack(side='left')
    button2 = tkinter.Button(panel, text='关于', command=show_about)
    button2.pack(side='right')
    panel.pack(side='bottom')

    tkinter.mainloop()


if __name__ == '__main__':
    main()
```

使用多线程后，不会阻塞了主线程：

```python showLineNumbers
import time
import tkinter
import tkinter.messagebox
from threading import Thread


def main():

    class DownloadTaskHandler(Thread):

        def run(self):
            time.sleep(5)
            tkinter.messagebox.showinfo('提示', '下载完成!')
            # 启用下载按钮
            button1.config(state=tkinter.NORMAL)

    def download():
        # 禁用下载按钮
        button1.config(state=tkinter.DISABLED)
        # 通过daemon参数将线程设置为守护线程(主程序退出就不再保留执行)
        # 在线程中处理耗时间的下载任务
        DownloadTaskHandler(daemon=True).start()

    def show_about():
        tkinter.messagebox.showinfo('关于', '作者: 123(v1.0)')

    top = tkinter.Tk()
    top.title('多线程')
    top.geometry('400x400')
    top.wm_attributes('-topmost', 1)

    panel = tkinter.Frame(top)
    button1 = tkinter.Button(panel, text='下载', command=download)
    button1.pack(side='left')
    button2 = tkinter.Button(panel, text='关于', command=show_about)
    button2.pack(side='right')
    panel.pack(side='bottom')

    tkinter.mainloop()


if __name__ == '__main__':
    main()
```

会看到弹出的窗口是多模态的，点击下载按钮不影响其他按钮操作。

**Python 的多线程并不能发挥 CPU 的多核特性**，这一点只要启动几个执行死循环的线程就可以得到证实了。之所以如此，是因为 Python 的解释器有一个“全局解释器锁”（GIL）的东西，任何线程执行前必须先获得 GIL 锁，然后每执行 100 条字节码，解释器就自动释放 GIL 锁，让别的线程有机会执行，这是一个历史遗留问题。

Python 解释器由于设计时有 GIL 全局锁，导致了多线程无法利用多核。多线程的并发在 Python 中就是一个美丽的梦。

多进程是有效的。

### asyncio 模块

协程是编写并发代码的库，是构建 IO 密集型和高级结构化网络代码的最佳选择。

例程的运行方式是通过代码主动切换状态并等待处理，因此效率更高，语法也更详细。循环对象需要处于活动状态：创建、设置、提交、等待运行和停止。

例行程序的最佳数量取决于内存使用情况。

asyncio 模块包含了一些工具，用于编写异步代码。

协程的工作原理是事件循环，事件循环是一个无限循环，它等待事件并执行它们。

每次任务会被挂起至事件循环队列中，然后按顺序执行。

await 关键字用于挂起协程，直到它被调用。

async 关键字用于定义协程。

asyncio 模块用于实现异步编程。

[asyncio](https://docs.python.org/zh-cn/3.10/library/asyncio.html?highlight=asyncio#module-asyncio):asyncio Multiprocessing Module Code Documentation

```python showLineNumbers
import asyncio

class TestA:
    def __init__(self,loop) -> None:
        self.loop = loop
        asyncio.set_event_loop(loop=self.loop) # step 3.1

    async def run_page(self,tid): # step 7
        print(tid)
        # 此处编写爬虫代码
        return tid

    async def close(self,):
        for i in asyncio.all_tasks(): # step 9.1
            i.cancel()
        self.loop.stop() # step  9.2


def test():
    get_async_loop = asyncio.new_event_loop() # step 1
    asyncio.set_event_loop(get_async_loop) # step 2

    async def spider(task_obj):
        async_task =  [asyncio.ensure_future(task_obj.run_page(1)),
                    asyncio.ensure_future(task_obj.run_page(2)),] # step  6
        await asyncio.wait(async_task) # step  8

        await task_obj.close() # step 9

    task_obj = TestA(get_async_loop) #step 3
    asyncio.run_coroutine_threadsafe(spider(task_obj), loop=get_async_loop) #step  4
    get_async_loop.run_forever() # step 5

test()
```

生成器函数与协程（注：函数）非常相似，它们 yield 多次，它们具有多个入口点，并且它们的执行可以被挂起。唯一的区别是生成器函数不能控制在它在 yield 后交给哪里继续执行，控制权总是转移到生成器的调用者

在 Python 创建协程时，task 是 future 的子类，所以 task 继承了 future 的属性和方法。几乎没有不同。



### 🚧queue 模块

### 🚧concurrent 模块


## 网络与通信

### 🚧webbrowser 模块

### urllib 模块

urllib 是一个收集了多个涉及 URL 的模块的自带包：可以打开和读取 URL、 抛出异常、解析 URL、解析 robots.txt 文件是最底层的模块。虽然仅支持 HTTP1.0 仅同步 ，但是解码和解析功能是真的很好用

[urllib 模块代码文档](https://docs.python.org/zh-cn/3/library/urllib.html?highlight=urllib#module-urllib)

#### urllib 发送请求

```python showLineNumbers
import urllib.request

url = 'https://www.python.org'
# 方式一
response = urllib.request.urlopen(url)
print(type(response))  # <class 'http.client.HTTPResponse'>
# 方式二
request = urllib.request.Request(url)
res = urllib.request.urlopen(url)
print(type(res))  # <class 'http.client.HTTPResponse'>
print(response.read())                  # 获取响应体 二进制字符串
print(response.getheaders())
## 结果为
[('Connection', 'close'), ('Content-Length', '50064'), ('Server', 'nginx'), ('Content-Type', 'text/html; charset=utf-8'), ('X-Frame-Options', 'DENY'), ('Via', '1.1 vegur, 1.1 varnish, 1.1 varnish'), ('Accept-Ranges', 'bytes'), ('Date', 'Tue, 17 Jan 2023 14:37:33 GMT'), ('Age', '1938'), ('X-Served-By', 'cache-iad-kiad7000025-IAD, cache-nrt-rjtf7700057-NRT'), ('X-Cache', 'HIT, HIT'), ('X-Cache-Hits', '263, 1190'), ('X-Timer', 'S1673966254.566369,VS0,VE0'), ('Vary', 'Cookie'), ('Strict-Transport-Security', 'max-age=63072000; includeSubDomains')]
```

#### urllib 异常处理

URLError 是 OSError 的一个子类，所有请求问题都会被捕获。

HTTPError 是 URLError 的一个子类，服务器上 HTTP 的响应会返回一个状态码，根据这个 HTTP 状态码来决定是否捕获，比如常见的 404 错误等。

```python showLineNumbers
from urllib import request
from urllib import error

if __name__ == "__main__":
    url = "http://www.iloveyou.com/"#一个不存在的连接
    req = request.Request(url)
    try:
        response = request.urlopen(req)
        print(response.read())
    except error.URLError as e:
        print(e) # <urlopen error [Errno 11002] getaddrinfo failed>
```

#### urllib 解析 URL

你肯定经历过复制网址出现乱码，这是因为网址必须以通用码的形式传送，而且还要避免几个特殊字符，因此网址要经编码，汉字经过编码后自然就是不可辨认的乱码了。

那么浏览器的地址栏中，网址为什么看起来是中文呢？这大概是浏览器的“人性化”处理，将编码好的中文网址还原出来“暂时”显示在地址栏中。

知道原理就能清楚的解码啦，你可以通过 encode 和 decode 方法进行操作解码和转码，只不过要考虑汉字中有%等特殊字符和/x 与%互转的情况，所以，直接用 quote 函数吧，别重复造轮子。

```python showLineNumbers
from urllib.parse import unquote
from urllib.parse import quote

url = 'https://www.baidu.com/s?ie=UTF-8&wd=%E7%A7%91%E6%8A%80&%E6%8A%80%E6%9C%AF'
print(unquote(url))
# 结果为https://www.baidu.com/s?ie=UTF-8&wd=科技&技术


print( 'https://www.baidu.com/s?ie=UTF-8&wd='+quote('科技&技术'))
# 结果为'https://www.baidu.com/s?ie=UTF-8&wd=%E7%A7%91%E6%8A%80&%E6%8A%80%E6%9C%AF'
```

#### urllib 解析 robots.txt 文件

```python showLineNumbers
import urllib.robotparser
rp = urllib.robotparser.RobotFileParser()
rp.set_url("http://www.musi-cal.com/robots.txt")
rp.read()

print(rp.can_fetch("*", "http://www.musi-cal.com/")) #判断网页是否可以抓取，'*'表示适用于所有爬虫
# True
```


## 拓展

### 第三方库

#### 第三方模块使用的基本流程

第三方模块使用的基本流程 以 opencv 为例

- 下载 pip install opencv-python
- 导入 import cv2
- 使用 模块名.方法名 示例 ： cv2.imread('./img/cat.jpg')

对于复杂的模块来说，使用 help()方法、dir()方法不能很好的满足我们的需求。如果是新手需要搭配官方文档，查阅使用实例。

这里需要注意的是：opencv 模块的下载名、导入名均不是 opencv。

事实上模块名、下载名与导入名也并非一种强制的规则。

建议在下载模块之前先通过搜索引擎搜索。

更多是后续的开发者出于习惯会将名称统一。例子是 pandas 模块。

- 下载 pip install pandas
- 导入 import pandas
- 使用 模块名.方法名 示例 ： pandas.read_csv("./cat.csv")

在国内下载模块往往较慢，我们可以通过豆瓣、清华镜像站下载第三方模块。以下载 scikit-learn 模块为例

- python -m pip install scikit-learn==1.3.0 -i https://pypi.tuna.tsinghua.edu.cn/simple

粘贴至终端，windows 电脑可以通过 win+R 输入 CMD

MAC 可以直接搜索终端打开。

#### 第三方模块的版本问题

第三方模块与系统模块一样，都是自定义好的一系列模块，这些模块也自然存在一些版本差异。

在使用的过程之中很可能因为版本的不匹配、方法的弃用导致示例的代码失效。

我们可以通过 3 个方式来解决：

1.升级至最新版本或安装指定的版本

- 安装指定的版本示例: pip install pandas==2.0.2
- 升级至最新版本示例: pip install --upgrade pandas

  2.积极的查询官方文档。可在 [https://pypi.org/](https://pypi.org/) 上搜索对应模块，知名度较高的模块都会有系统的官方文档。

  3.更换其他模块

#### 第三方模块 OpenCV

```python showLineNumbers
# 导入必要的包
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline
# 导入opencv
import cv2

# 使用opencv的imread方法，打开图片
img = cv2.imread('./img/cat.jpg')
# 检查类型，会发现自动转成了Numpy 数组的形式
type(img)
img

# 如果打开一张不存在的图片，不会报错，但是会返回空类型
img_wrong = cv2.imread('./img/wrong.jpg')
type(img_wrong)
img_wrong

plt.imshow(img)
# 为什么会显示的这么奇怪？

# （OpenCV和matplotlib 默认的RBG顺序不一样）
# matplotlib: R G B
# opencv: B G R
# 需要调整顺序

# 将OpenCV BGR 转换成RGB，cv2.COLOR_可以看到更多转换形式
img_fixed = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

# 算法参考：RGB取均值、RGB按阈值取值、按色彩心理学公式取值R*0.299 + G*0.587 + B*0.114 = Gray

plt.imshow(img_fixed)
# 显示正常了

# 另外，我们再读取图片时也可以以灰度模式读取
img_gray = cv2.imread('./img/cat.jpg',cv2.IMREAD_GRAYSCALE)
# 显示这个灰度图
plt.imshow(img_gray,cmap="gray")

# 使用resize缩放（打开函数帮助）
img_resize = cv2.resize(img_fixed,(1000,300))
# 显示缩放后的图片
plt.imshow(img_resize)

# 翻转图片：0表示垂直翻转、1表示水平翻转，-1表示水平垂直都翻转
img_flip = cv2.flip(img_fixed,-1)

plt.imshow(img_flip)
```

### Python 调用 C

Python 的底层是 C 写的（实际上大部分高级编程语言都是 C 写的）因此互相调用的逻辑主要是：数据类型转换、编译库的链接、接收返回值。

这个过程涉及到反复的调试，所以先从调试开始讲。

#### Visual Studio Code 和 Visual Studio 的调试

##### Visual Studio Code

先看我们熟悉的 Visual Studio Code ，以下简称 VScode

点击“行号”前的位置，就可以给代码行打上红色的“断点”。

```python showLineNumbers
def mynameis(x):
    print('my name is ',end='')
    print(x,end='')# 断点
    print("!")


print(1)# 断点
mynameis('a')
print(2)# 断点
mynameis('b')
print(3)
```

接着点击刚刚的调试按钮，点击运行和调试，接着根据你的文件类型选择，譬如 py 文件就选择 Python File. 然后可以看到代码上方有 6 个按钮。他们分别是：

> 1、continue（继续）
> 执行到下一断点，如果函数内容的子函数也有断点，会跳到子函数的断点处

> 2、step over（单步跳过）
> 一行一行的往下走，把没有断点的子函数当作一步，如果子函数内有断点，会跳到子函数的断点处，从断点处开始一行一行执行

> 3、step into（单步调试/单步执行）
> 一行一行往下走，如果这一行上有子函数，且无论子函数内有无断点，都会跳到子函数的第一行，从第一行开始，一行一行执行

> 4、step out（单步跳出）
> 执行到下一断点，如果遇到子函数，且子函数内没有断点，直接跳出子函数。如果子函数内有断点，会在执行完断点后再跳出子函数

> 5、Restart（重启）
> 从头开始，重新运行调试代码

> 6、stop（停止）
> 停止运行调试代码

接着打上断点，感受一下这几个按钮的功能吧。

##### Visual Studio

都是微软开发的软件，大同小异。

```c showLineNumbers
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <windows.h>
using namespace std;

#include "test.h"


//定义一个全局结构体,作用域到文件末尾
struct Person {
    int age;
    char* name;
};

void test20() {
    //使用全局的结构体定义结构体变量p
    char x[] = "我是谁";
    struct Person p = { 10 ,x };

    printf("%d,%s\n", p.age, p.name);
}

int main(int argc, const char* argv[])
{
    //定义局部结构体名为Person,会屏蔽全局结构体
    //局部结构体作用域,从定义开始到“}”块结束
    struct Person {
        int age;
    };
    // 使用局部结构体类型
    struct Person pp;
    pp.age = 50;
    //pp.name = "zbz"; 会报错，没有name

    test20(); // 10 , 我是谁

    int a = 1;
    return 0;
}
```

我们先在红色区域（数字 1）打上断点

再在绿色区域（数字 2）点击调试

最后蓝色区域找到这个 6 个按钮

前面 2 个分别是 stop（停止）和 Restart（重启）

后面的 1、2、3、4 则依次对应着：continue（继续）、step over（单步跳过）、step into（单步调试/单步执行）和 step out（单步跳出）

#### 代码的互相调用

##### 在 Python 中调用 C（原生的 Python.h）

python+c/c++混合编程如：

> 原生的 Python.h

> cython

> pybind11：pytorch 也采用该方法

> ctypes、cffi、SWIG、Boost.Pytho 等

但不论是哪个方法，大致的流程都是：转换数据类型->编译代码->生成编译后的文件（.pyd .pyc .pyo .so .dll 等）

```bash showLineNumbers
冷知识：

python的import不止能导入.py后缀结尾的文件

pyc是由py文件经过编译后生成的二进制文件，py文件变成pyc文件后，加载的速度有所提高，并且可以实现源码隐藏。

pyo是优化编译后的程序，也可以提高加载速度，针对嵌入式系统，把需要的模块编译成pyo文件可以减少容量。

.so和.dll分别是Linux和window的动态库

这些都可以被import导入，所以我们只需要编译C代码，然后import导入即可。

```

##### 环境设置

- 首先我们找到 python 的安装路径，通过文件搜索找到 Python.h 的文件夹路径
- 【设我的 Python 路径为 C:\Python】
- 那么 Python.h 的文件位置就是：C:\Python\include 简称 H 路径
- python310_d.lib 的位置就是：C:\Python\libs 简称 L 路径
- 接着右击【项目】，点击属性

- 最后在上方选择所有配置、所有平台。点击 VC++目录，选择包含目录最右边的下拉三角，输入刚刚复制的**H 路径**即可

- 接着再来载入 python310_d.lib 库，打开 L 路径查看里面有无 python310_d.lib 这个文件，【注意，310 是 python 版本号，不同版本对应不同文件名】如果没有，则复制 python310.lib，然后重命名。
- 还是打开刚刚的属性，依次设置。
- 库目录填【文件夹路径】

- 附加依赖项填【文件路径】

##### 代码编写

- 新建一个文件名，根据官方文档的说法，以 C 语言为例，如果一个模块叫 spam，则对应实现它的文件名叫 spammodule.c；如果这个模块名字非常长，比如 spammify，则这个模块的文件可以直接叫 spammify.c

这里我调整了一下官方文档给的示例，添加了一些注释。让新手更易读。

当然原生的方法总是最底层但是最麻烦的方法，如果使用诸如 Python 中的 ctypes 模块则流程会简化。此处可以查阅相关文档。

```c showLineNumbers
#define PY_SSIZE_T_CLEAN
#include <Python.h>

static PyObject* spam_system(PyObject* self, PyObject* args)
{
    /*
     self 参数指向模块对象；对于方法则指向对象实例。

     args 参数是指向一个 Python 的 tuple 对象的指针，其中包含参数。
     每个 tuple 项对应一个调用参数。 这些参数也全都是 Python 对象
     要在我们的 C 函数中使用它们就需要先  将其转换为 C 值。
    */

    const char* command;
    int sts;
    //PyArg_ParseTuple() 会检查参数类型并将其转换为 C 值。
    //它使用模板字符串确定需要的参数类型以及存储被转换的值的 C 变量类型。
    //在所有参数都有正确类型且组成部分按顺序放在传递进来的地址里时，返回真(非零)。
    //其在传入无效参数时返回假(零)。在后续例子里，还会抛出特定异常，使得调用的函数可以理解返回 NULL(也就是例子里所见)。
    // "s" 是一个参数，将 Unicode 对象转换为指向字符串的 C 指针。具体可以参考 https://docs.python.org/3/c-api/arg.html
    if (PyArg_ParseTuple(args, "s", &command)) {

        // system 是C的库函数，从属于stdlib标准库,【片面】的说：
        // 返回值是0表示成功
        // 返回值是其他表示执行失败
        // 至于为什么是片面的，原因会在下个阶段解释。
        sts = system(command);

        //PyLong_FromLong返回一个表示 Python 整数对象的 PyObject 子类型。
        return PyLong_FromLong(sts);
    }
    else {
        return NULL;
    }
}

// 构造方法
static PyMethodDef SpamMethods[] = {
    {"system",  spam_system, METH_VARARGS,
     "Execute a shell command."},
    {NULL, NULL, 0, NULL}        /* Sentinel */
};

// 调用构造方法
static struct PyModuleDef spammodule = {
    PyModuleDef_HEAD_INIT,
    "spam",   /* name of module */
    NULL, /* module documentation, may be NULL */
    -1,       /* size of per-interpreter state of the module,
                 or -1 if the module keeps state in global variables. */
    SpamMethods
};
// 初始化
PyMODINIT_FUNC
PyInit_spam(void)
{
    return PyModule_Create(&spammodule);
}

int
main(int argc, char* argv[])
{
    wchar_t* program = Py_DecodeLocale(argv[0], NULL);
    if (program == NULL) {
        fprintf(stderr, "Fatal error: cannot decode argv[0]\n");
        exit(1);
    }
    /* Add a built-in module, before Py_Initialize */
    if (PyImport_AppendInittab("spam", PyInit_spam) == -1) {
        fprintf(stderr, "Error: could not extend in-built modules table\n");
        exit(1);
    }
    /* Pass argv[0] to the Python interpreter */
    Py_SetProgramName(program);
    /* Initialize the Python interpreter.  Required.
       If this step fails, it will be a fatal error. */
    Py_Initialize();
    /* Optionally import the module; alternatively,
       import can be deferred until the embedded script
       imports it. */
    PyObject* pmodule = PyImport_ImportModule("spam");
    if (!pmodule) {
        PyErr_Print();
        fprintf(stderr, "Error: could not import module 'spam'\n");
    }

    PyMem_RawFree(program);
    return 0;
}

```

### Python 发布包

截至2024年10月,有了非常多成熟的包管理工具,如 poetry、rye等工具，我相信未来还会有更多更好用的一站式包管理工具出现。

#### 目录结构

```bash showLineNumbers
your_project/
├── .github/（可选）
│  └── workflows/（可选）
│      └── python-publish.yml（可选）
│
├── your_package/（包名）
│   ├── __init__.py
│   └── module.py
│
├── tests/（可选）
│   └── test_module.py
│
├── README.md（可选）
├── LICENSE（可选）
└── pyproject.toml
```
#### pyproject.toml 示例

```showLineNumbers title="pyproject.toml"
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "exboard"
version = "1.0.12"
authors = [
  { name="Allen", email="jiangyangcreate@gmail.com" },
]
description = "A exboard package for AIBOX"
readme = "README.md"
requires-python = ">=3.6"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: Apache Software License",
    "Operating System :: OS Independent",
]
dependencies = [
    "schedule>=1.1.0",
]

[project.urls]
Homepage = "https://github.com/jiangyangcreate/exboard"
Issues = "https://github.com/jiangyangcreate/exboard/issues"
```

其中：dependencies 是依赖的包，在这里添加你需要的依赖包之后，安装此包时会自动安装这些依赖包。


#### 打包发布

如果我们需要包被全世界的同好通过 pip install 直接安装的话，需要将包上传到 pypi 网站。首先注册 pypi，获得用户名和密码。

安装了 build 工具：

`pip install --upgrade build`

然后，在项目根目录下运行以下命令来创建分发文件：

`python -m build`

该命令将在 dist/ 目录下生成 .tar.gz 和 .whl 文件。

Twine 是一个用于上传 Python 包到 PyPI 的工具。安装 Twine：

`pip install --upgrade twine`

上传所有包

`twine upload dist/*`

如果嫌每次输入用户名和密码麻烦可以配置到文件中。

编辑用户目录下的 .pypirc 文件，输入

```bash showLineNumbers
[pypi]
username=your_username
password=your_password
```

#### 通过git自动发布

```yaml showLineNumbers title=".github\workflows\python-publish.yml"
name: Upload Python Package

on:
  release:
    types: [published]

permissions:
  contents: read

jobs:
  deploy:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.x'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build
    - name: Build package
      run: python -m build
    - name: Publish package
      uses: pypa/gh-action-pypi-publish@27b31702a0e7fc50959f5ad993c78deac1bdfc29
      with:
        user: __token__
        password: ${{ secrets.PYPI_API_TOKEN }}
```

这个过程需要我们在pypi中获取密钥，然后在github的项目设置中添加。

在pypi中获取密钥:

```
访问：https://pypi.org/manage/account/token/

选择ADD API tokens

名称可以随便填，勾选你需要授权的权限，然后创建

```


在github的项目设置中添加:

```bash showLineNumbers
Settings -> Secrets and variables-> Actions -> New repository secret

Name: PYPI_API_TOKEN
Value: 刚刚复制的密钥
```

这样当我们在github上**创建release**时，会自动将包上传到pypi。注意不是push代码自动上传。

#### 封装程序为可执行文件

官方文档：[https://www.pyinstaller.org/](https://www.pyinstaller.org/)

命令行：

```bash showLineNumbers
# 直接封装
pyinstaller -F app.py
# 指定图标
pyinstaller -F -i app.ico app.py
# 指定图标 不展示终端框
pyinstaller -F -i app.ico app.py --noconsole
# 将数据文件添加到捆绑包中，中间使用分号分隔，前面是源目录地址，后面是目的目录地址
pyinstaller -F -i app.ico app.py --add-data="C:\mediapipe\modules;mediapipe/modules" --noconsole
```

### Python 虚拟环境

使用虚拟环境可以帮助你隔离项目依赖，从而避免不同项目之间的冲突。

#### 1. 创建虚拟环境

在你想创建虚拟环境的项目目录下运行以下命令：

```bash
python3 -m venv myenv
```

这里的 `myenv` 是虚拟环境的名称，你可以随意替换成你喜欢的名字。

#### 2. 进入虚拟环境

在虚拟环境创建成功后，需要激活虚拟环境。不同操作系统激活方式不同：

- **在 Windows 上：**

  ```bash
  myenv\Scripts\activate
  ```

- **在 macOS 和 Linux 上：**

  ```bash
  source myenv/bin/activate
  ```

激活成功后，你会看到命令提示符前面出现了虚拟环境的名称，例如 `(myenv)`。

#### 3. 查看虚拟环境

你可以使用 `pip list` 或 `pip freeze` 命令来查看虚拟环境中已安装的包。

```bash
pip list
```

或者

```bash
pip freeze
```

#### 4. 在虚拟环境中安装和运行代码

激活虚拟环境后，你可以使用 `pip` 安装所需的依赖包。例如，安装 `requests` 包：

```bash
pip install requests
```

然后你就可以运行你的 Python 代码了。比如你有一个 `script.py` 文件，可以使用以下命令运行：

```bash
python script.py
```

#### 5. 退出虚拟环境

当你完成工作后，可以退出虚拟环境，回到全局环境。使用以下命令：

```bash
deactivate
```