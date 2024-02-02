---
sidebar_position: 2
title: YAML
---

YAML

YAML 在 github/docker 等程序员工具被广泛用于定义配置文件，非常简单也很有必要学习。

YAML 的配置文件后缀为 .yml，如：abc.yml

YAML 很简单，还在更新中，可查看最新的官方文档即可:[yaml](https://yaml.org/)

测试自己的 yaml 文件是否正确，可以使用[online-yaml-tools](https://onlineyamltools.com/validate-yaml)

将 yaml 文件转换为 json 文件，可以使用[https://nodeca.github.io/js-yaml/](https://nodeca.github.io/js-yaml/)


## YAML 语法

### 基本语法

YAML 是一种基于缩进的、用来表达数据序列化的格式。它的基本语法规则如下：

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用 Tab 键，只允许使用空格
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可表示层级关系
- `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略
- 冒号后面要加空格

### 基本数据类型

YAML 支持以下几种数据类型：

- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值

## 对象

对象键值对使用冒号结构表示，冒号后面要加一个空格：

```yaml showLineNumbers
key: value
```

对象可以包含对象：

```yaml showLineNumbers
key:
  child-key: child-value
```

较为复杂的对象格式，可以使用问号加一个空格代表一个复杂的 key，配合一个冒号加一个空格代表一个 value:

```yaml showLineNumbers
? - complexkey1
  - complexkey2
: - complexvalue1
  - complexvalue2
```

意思即对象的属性是一个数组 [complexkey1,complexkey2]，对应的值也是一个数组 [complexvalue1,complexvalue2]

## 数组

使用 `-` 加空格表示数组中的一个元素：

```yaml showLineNumbers
- Java
- Go
- Python
```

YAML 支持多维数组，可以使用行内表示：

```yaml showLineNumbers
key: [value1, value2, ...]
```

数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。

```yaml showLineNumbers
- - A
  - B
  - C
```

数组中可以包含对象：

```yaml showLineNumbers
- name: Java
  level: senior

- name: Go
  level: middle
```

一个相对复杂的例子：

```yaml showLineNumbers
companies:
  - id: 1
    name: company1
    price: 200W
  - id: 2
    name: company2
    price: 500W
```

意思是 companies 属性是一个数组，每一个数组元素又是由 id、name、price 三个属性构成。

数组也可以使用流式(flow)的方式表示：

```yaml showLineNumbers
companies:
  [
    { id: 1, name: company1, price: 200W },
    { id: 2, name: company2, price: 500W },
  ]
```

数组和对象可以构成复合结构，例：

```yaml showLineNumbers
languages:
  - Ruby
  - Perl
  - Python
websites:
  YAML: yaml.org
  Ruby: ruby-lang.org
  Python: python.org
  Perl: use.perl.org
```

## 纯量

纯量是最基本的、不可再分的值。下面是一些常见的纯量：

- 字符串：普通的字符串
- 布尔值：true 或 false
- 整数：如 1、2、3
- 浮点数：如 1.2、3.14159
- Null：空值
- 时间：如 2018-12-29 12:00:00
- 日期：如 2018-12-29

```yaml showLineNumbers
boolean:
  - TRUE #true,True都可以
  - FALSE #false，False都可以
float:
  - 3.14
  - 6.8523015e+5 #可以使用科学计数法
int:
  - 123
  - 0b1010_0111_0100_1010_1110 #二进制表示
null:
  nodeName: "node"
  parent: ~ #使用~表示null
string:
  - 哈哈 #默认不使用引号表示
  - "labor's day" # 单引号之中如果还有单引号，必须连续使用两个单引号转义。
  - "Hello world" #可以使用双引号或者单引号包裹特殊字符
  - "内容\n字符串" # 双引号不会对特殊字符转义，比如\n表示换行，\t表示制表符，等等。
  - newline
    newline2 #字符串可以拆成多行，每一行会被转化成一个空格
  - |
    newline
    newline2
  # 使用|保留换行符 , 相当于 newline \n newline2
  - >
    newline
    newline2
  # 使用>折叠换行符，相当于newlinenewline2
date:
  - 2018-02-17 #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime:
  - 2018-02-17T15:02:31+08:00 #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

### 引用

YAML 支持引用，用 `&` 和 `*` 表示，`&` 定义引用建立锚点，`<<` 表示合并到当前数据，`*` 引用：

```yaml showLineNumbers
defaults: &defaults
  adapter: postgres
  host: localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```

相当于:

```yaml showLineNumbers
defaults:
  adapter: postgres
  host: localhost

development:
  database: myapp_development
  adapter: postgres
  host: localhost

test:
  database: myapp_test
  adapter: postgres
  host: localhost
```