---
sidebar_position: 2
title: Python高级
---


## 面向对象编程

面向对象编程——Object Oriented Programming，简称OOP，是一种程序设计思想。OOP把对象作为程序的基本单元，一个对象包含了数据和操作数据的函数。

在Python中，所有数据类型都可以视为对象，当然也可以自定义对象。自定义的对象数据类型就是面向对象中的类（Class）的概念。

### 类（Class）和实例（Instance）

面向对象的设计思想是从自然界中来的，因为在自然界中，类（Class）和实例（Instance）的概念是很自然的。Class是一种抽象概念，比如我们定义的Class——Student，是指学生这个概念，而实例（Instance）则是一个个具体的Student，比如，张三和李四是两个具体的Student。

所以，面向对象的设计思想是抽象出Class，根据Class创建Instance。

面向对象的抽象程度又比函数要高，因为一个Class既包含数据，又包含操作数据的方法。

### 创建类

#### 类的特殊方法

Python 使用 __ 开头的名字来定义特殊的方法和属性，它们有：

```
__init__()
__repr__()
__str__()
__call__()
__iter__()
__add__()
__sub__()
__mul__()
__rmul__()
__class__
__name__
```

构造方法 `__init__()`

在产生对象之后，我们可以向对象中添加属性。
事实上，还可以通过构造方法，在构造对象的时候直接添加属性：

```python
class Clothes(object):
    """
    init_demo
    """

    def __init__(self, color="green"):
        self.color = color


my_clothes = Clothes()
my_clothes.color
```

传入有参数的值：

```python
your_clothes = Clothes('orange')
your_clothes.color
```

表示方法 `__repr__() 和 __str__()`:

```python
class Clothes(object):
    """
    repr and str demo
    """

    def __init__(self, color="green"):
        self.color = color

    def __str__(self):
        "This is a string to print."
        return ("a {} clothes".format(self.color))

    def __repr__(self):
        "This string recreates the object."
        return ("{}(color='{}')".format(self.__class__.__name__, self.color))
```

`__str__()` 是使用 print 函数显示的结果,类似java中的toString：

```python
my_clothes = Clothes()
print(my_clothes)
```

`__repr__()` 返回的是不使用 print 方法的结果:

```python
my_clothes
```

```python
print(my_clothes.__class__, my_clothes.__class__.__name__, my_clothes.color)
```

```python
my_clothes.__class__, my_clothes.__class__.__name__, my_clothes.color
```

#### 类的属性

只读属性：

```python
class Clothes(object):
    def __init__(self, price):
        self.price = price

    # 这样 discount_price 就变成属性了
    @property
    def discount_price(self):
        return self.price * 0.8
```

这里 discount_price 就是一个只读不写的属性了（注意是属性不是方法）,
而price是可读写的属性：

```python
my_clothes = Clothes(100)
print(my_clothes.discount_price)  # 80.0
```

可以修改price属性来改变discount_price：

```python
my_clothes.price = 200
print(my_clothes.discount_price)  # 160.0
```

my_clothes.discount_price()会报错，因为 my_clothes.discount_price 是属性，不是方法；

my_clothes.discount_price=100 也会报错，因为只读。

对于 @property 生成的只读属性，我们可以使用相应的 @attr.setter 修饰符来使得这个属性变成可写的：

```python
class Clothes(object):
    def __init__(self, price):
        self.price = price

    # 这样就变成属性了
    @property
    def discount_price(self):
        return self.price * 0.8

    @discount_price.setter
    def discount_price(self, new_price):
        self.price = new_price * 1.25
```

测试一下：

```python
my_clothes = Clothes(100)
print(my_clothes.discount_price)

my_clothes.price = 200
print(my_clothes.discount_price)
```

修改 discount_price 属性：

```python
my_clothes.discount_price = 180
print(my_clothes.price)
print(my_clothes.discount_price)
```

一个等价的替代如下，用方法：

```python
class Clothes(object):
    def __init__(self, price):
        self.price = price

    def get_discount_price(self):
        return self.price * 0.8

    def set_discount_price(self, new_price):
        self.price = new_price * 1.25

    discount_price = property(get_discount_price, set_discount_price)

```

```python
my_clothes = Clothes(100)
print(my_clothes.discount_price)

my_clothes.price = 200
print(my_clothes.discount_price)

my_clothes.discount_price = 180
print(my_clothes.price)
print(my_clothes.discount_price)
```

### 继承

类定义的基本形式：

```python
class ClassName(ParentClass):
    """class docstring"""
    def method(self):
        return
```

里面的 ParentClass 就是用来继承的。

```python
class Clothes(object):
    def __init__(self, color="green"):
        self.color = color

    def out_print(self):
        return self.__class__.__name__, self.color
```

```python
my_clothes = Clothes()
my_clothes.color
```

```python
my_clothes.out_print()
```

定义一个子类，继承父类的所有方法:

```python
class NikeClothes(Clothes):
    def change_color(self):
        if self.color == "green":
            self.color = "red"
```

继承父类的所有方法：

```python
your_clothes = NikeClothes()
your_clothes.color
```

```python
your_clothes.out_print()
```

但有自己的方法：

```python
your_clothes.change_color()
your_clothes.color
```

如果想对父类的方法进行修改，只需要在子类中重定义这个类即可：

```python
class AdidasClothes(Clothes):
    def change_color(self):
        if self.color == "green":
            self.color = "black"

    def out_print(self):
        self.change_color()
        return self.__class__.__name__, self.color


him_clothes = AdidasClothes()
print(him_clothes.color)

him_clothes.change_color()
print(him_clothes.color)
print(him_clothes.out_print())
```

#### super() 函数

super(CurrentClassName, instance)

返回该类实例对应的父类对象。

刚才 AdidasClothes可以改写为：

```python
class NewAdidasClothes(Clothes):
    def change_color(self):
        if self.color == "green":
            self.color = "black"

    def out_print(self):
        self.change_color()
        print(super(NewAdidasClothes, self).out_print())

her_clothes = NewAdidasClothes()
print(her_clothes.color)

her_clothes.out_print()
```

#### __new__() 方法

__new__()用来创建一个实例，它至少有一个参数cls，代表当前类。默认情况下__new__()会创建当前类的实例，该方法也可以被重载，重载后也可以创建其他类的实例。

```python
class Fun(object):
    def __init__(self, fun):
        self.fun = fun
 
    def __new__(cls, *args, **kwargs):
        return object.__new__(Fun)
 
if __name__ == '__main__':
    f = Fun.__new__(Fun)
    print(type(f))
```

__new__()方法只是创建实例，此时拿到的实例并不能正常使用。一个实例需要被__init__()方法初始化后才可以被正常使用。也就是说，正常场景下，我们生成一个类的实例，Python先调用该类的__new()__方法创建一个实例，然后再调用__init__()方法初始化该实例。__new()__方法存在于object方法中，通常情况下不需要被重载。

可以使用__new__方法创建出其它类的实例。在这种场景下，__new__方法创建后会调用对应类的__init__方法完成初始化：

```python
class Fun(object):
    def __init__(self, fun):
        self.fun = fun
 
    def __new__(cls, *args, **kwargs):
        return Demo(*args, **kwargs)
 
 
class Demo(object):
    def __init__(self, d):
        self.demo = d
 
 
if __name__ == '__main__':
    f = Fun(1)
    print("type f:", type(f))
    print("f.demo:", f.demo)
```

可以看出，f不是Fun类的一个实例，而是Demo类的一个实例，拥有Demo类的字段。因为Fun类的__new__方法创建的是一个Demo类实例，而非Fun类本身。因此Fun.__new__方法在return后调用了Demo.__init__方法，以完成该实例的初始化。

### 接口

接口的调用：

```python
class Clothes(object):
    def __init__(self, color="green"):
        self.color = color

    def out(self):
        print("father.")


class NikeClothes(Clothes):
    def out(self):
        self.color = "brown"
        super(NikeClothes, self).out()


class AdidasClothes(object):
    def out(self):
        print("adidas.")

```

因为三个类都实现了 out() 方法，因此可以这样使用：

```python
objects = [Clothes(), NikeClothes(), AdidasClothes()]
for obj in objects:
    obj.out()
```

### 类方法

类方法包括以下几种：

1. special 方法和属性，即以 __ 开头和结尾的方法和属性
2. 私有方法和属性，以 _ 开头，不过不是真正私有，而是可以调用的，
但是不会被代码自动完成所记录（即 Tab 键之后不会显示）
3. 共有的方法和属性

以 `__` 开头不以 `__` 结尾的属性是更加特殊的方法，调用方式也不同：

```python
class MyDemoClass(object):
    def __init__(self):
        print("special.")

    def _get_name(self):
        print("_get_name is private method.")

    def get_value(self):
        print("get_value is public method.")

    def __get_type(self):
        print("__get_type is really special method.")
```

```python
demo = MyDemoClass()

```

```python
demo.get_value()
demo._get_name()
demo._MyDemoClass__get_type()
```

## 文件和异常

### 文件

#### 写文件

我们使用 open 函数的写入模式来写文件：

```python
f = open('test.txt', 'w')
f.write('hello world.')
f.close()
```

```python
print(open('test.txt').read())
```

使用 w 模式时，如果文件不存在会被创建

除了写入模式，还有追加模式 a

读写模式w+

```python
f = open('test.txt', 'w+')
f.write('hello world. morning.')
f.seek(3)
print(f.read())  # hello world.
f.close()
```

#### 读文件

使用 open 函数 来读文件，使用文件名的字符串作为输入参数：

默认打开文件是 ‘r’ 读模式

```python
f = open("test.txt")

# 默认以读的方式打开文件，如果文件不存在会报错。
# 可以使用 read 方法来读入文件中的所有内容：
text = f.read()
print(text)
```

按照行读入内容，readlines 方法返回一个列表，每个元素代表文件中每一行的内容：

```python
f = open("test.txt")
lines = f.readlines()
print(lines)
f.close()
```

```python
# 事实上，我们可以将 f 放在一个循环中，得到它每一行的内容：
f = open('test.txt')
for line in f:
    print(line)
f.close()
```

#### 上下文管理器

```python
with open('my_file.txt', 'w') as fp:
    data = fp.write("Hello world")
```

这等效于下面的代码，但是要更简便：

```python
fp = open('my_file.txt', 'w')
try:
    # do stuff with f
    data = fp.write("Hello world")
finally:
    fp.close()
```

#### 自定义上下文管理器

比如可以这样定义一个简单的上下文管理器：

```python
class ContextManager(object):
    def __enter__(self):
        print("Entering")

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")


with ContextManager():
    print("inside operate")
```

#### __enter__ 的返回值

如果在 __enter__ 方法下添加了返回值，

那么我们可以使用 as 把这个返回值传给某个参数：

```python
class ContextManager2(object):
    def __enter__(self):
        print("Entering")
        return "my value"

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")


with ContextManager2() as val:
    print(val)

```

一个通常的做法是将 __enter__ 的返回值设为这个上下文管理器对象本身，
文件对象就是这样做的.

```python
class ContextManager3(object):
    def __enter__(self):
        print("Entering")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting")

```

#### 错误处理

上下文管理器对象将错误处理交给 __exit__ 进行，可以将错误类型，
错误值和 traceback 等内容作为参数传递给 __exit__ 函数：

```python
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

```python
import os
os.remove('my_file.txt')
```

#### 二进制文件

二进制读写模式 b：

```python
import os

f = open('binary.bin', 'wb')
f.write(os.urandom(10))
f.close()
```

```python
f = open('binary.bin', 'rb')
print(repr(f.read()))
f.close()
```

#### with 方法

事实上，Python提供了更安全的方法，当 with 块的内容结束后，
Python会自动调用它的close 方法，确保读写的安全：

```python
with open('new_file.txt', 'w') as f:
    for i in range(3000):
        x = 1.0 / (i - 1000)
        f.write('hello world: ' + str(i) + '\n')
```

与 try/exception/finally 效果相同，但更简单。

查看文件写的结果，虽然触发error，但已经写的内容是成功的。

```python
!tail new_file.txt
```

```python
!wc -l new_file.txt
```

```python
# 删除文件：
import os
os.remove('test.txt')
os.remove('binary.bin')
os.remove('new_file.txt')
```

### 异常

#### try & except 块

捕捉不同的错误类型，尝试在下面输入框输入：-1，1，2，q

```python
import math

while True:
    try:
        text = input('>')
        if text[0] == 'q':
            break
        x = float(text)
        y = 1 / math.log10(x)
        print("1/log10({0}) = {1}".format(x, y))
    except ValueError:
        print("value must bigger than 0")
    except ZeroDivisionError:
        print("the value must not be 1")

```

#### 自定义异常

异常是标准库中的类，这意味着我们可以自定义异常类：

尝试在文本输入框输入：k，start，q

```python
class CommandError(ValueError):
    print("bad command operation. must input 'start', 'stop', 'pause'")
    


valid_commands = {'start', 'stop', 'pause'}
while True:
    command = input('>')
    if command == 'q':
        break
    try:
        if command.lower() not in valid_commands:
            raise CommandError('Invalid command: %s' % command)
        print('input command:', command)
    except CommandError:
        print("bad command string: %s" % command)

```

#### finally

try/catch 块还有一个可选的关键词 finally。

不管 try 块有没有异常， finally 块的内容总是会被执行，
而且会在抛出异常前执行，因此可以用来作为安全保证，

比如文件操作时，常在finally关闭文件。

```python
try:
    print(1 / 0)
except ZeroDivisionError:
    print('divide by 0.')
finally:
    print('finally was called.')
```

## 高级函数和装饰器

### 高级函数

在 Python 中，函数是一种基本类型的对象，这意味着可以将函数作为参数传给另一个函数。

将函数作为字典的值储存，将函数作为另一个函数的返回值：

```python
def square(x):
    """Square of x."""
    return x * x


def cube(x):
    """Cube of x."""
    return x * x * x


# 函数的作为字典的值
funcs = {'square': square, 'cube': cube, }
x = 2
for func in sorted(funcs):
    print(func, funcs[func](x))
```

```python
func
```

```python
funcs
```

#### 函数参数

引用传递

传递给函数 f 的是一个指向 x 所包含内容的引用，
如果我们修改了这个引用所指向内容的值（例如 x[0]=999），
那么外面的 x 的值也会被改变：

```python
def mod_f(x):
    x[0] = 999
    return x

x = [1, 2, 3]

x # [1, 2, 3]
```

```python
mod_f(x) # [999, 2, 3]
```

```python
x # [999, 2, 3]
```

过如果我们在函数中赋给 x 一个新的值（例如另一个列表），

那么在函数外面的 x 的值不会改变：

```python
def no_mod_f(x):
    x = [4, 5, 6]
    return x


x = [1, 2, 3]

print(x)
print(mod_f(x))
print(x)
# [1, 2, 3]
# [999, 2, 3]
# [999, 2, 3]
```

#### 高阶函数

以函数作为参数，或者返回一个函数的函数是高阶函数，
常用的例子有 map 和 filter 函数

map(f, sq) 函数将 f 作用到 sq 的每个元素上去，并返回结果组成的列表，

相当于：[f(s) for s in sq]

```python
map(square, range(5))  # [0, 1, 4, 9, 16]
```

```python
# 外面套个list，强转为list类型，是为了打印出函数的值
list(map(square, range(5)))
```

```python
def is_even(x):
    return x % 2 == 0


list(filter(is_even, range(5)))  # [0, 2, 4]
```

```python
list(map(square, filter(is_even, range(5))))  # [0, 4, 16]
```

reduce(f, sq) 函数接受一个二元操作函数 f(x,y)，
并对于序列 sq 每次合并两个元素：

```python
from functools import reduce
def my_add(x, y):
    return x + y


reduce(my_add, [1, 2, 3])
```

返回一个函数：

```python
def get_logger_func(target):
    def write_logger(data):
        with open(target, 'a') as f:
            f.write(data + '\n')

    return write_logger


fun_logger = get_logger_func('foo.txt')
fun_logger('hello')
```

```python
# 查看foo.txt 是否生成
import os
os.path.exists('foo.txt')
```

#### 匿名函数lambda

```python
list(map(square, range(5)))
```

```python
# 用匿名函数替换为：
list(map(lambda x: x * x, range(5)))
```

匿名函数虽然写起来比较方便（省去了定义函数的烦恼），
但是有时候会比较难于阅读：

```python
s1 = reduce(lambda x, y: x + y, map(lambda x: x ** 2, range(1, 3)))
print(s1)  # 5
```

```python
# 简单的写法：
s2 = sum(x ** 2 for x in range(1, 3))
print(s2)  # 5
```

#### global 变量

要在函数中修改全局变量的值，需要加上 global 关键字：

```python
x = 15

def print_newx():
    global x
    x = 18
    print(x)


print_newx()
print(x)

# 18
# 18
```

如果不加上这句 global 那么全局变量的值不会改变：

```python
x = 15


def print_newx2():
    x = 18
    print(x)


print_newx2()
print(x)


# 18
# 15
```

#### 递归

一般对于分治法，要用递归，不过在python中不怎么用，更高效的处理非波切利算法：

```python
def fib(n):
    """Fib without recursion."""
    a, b = 0, 1
    for i in range(1, n + 1):
        a, b = b, a + b
    return b


print([fib(i) for i in range(10)])

```

### 装饰器：Decorator

如果你有一批变量想统一按一个规则处理，并且需要缩减代码，你需要函数。

如果你有一批函数想统一按一个规则处理，并且需要缩减代码，你需要装饰器（Decorator）

理清下面2点：

函数

- 接受参数
- 做点事情
- 返回结果

装饰器

- 接受函数作为参数
- 做点事情
- 返回一个函数

用 @ 来使用装饰器

使用 @ 符号来将某个函数替换为装饰符之后的函数：

例如这个函数：

```python
def dec(f):
    print('I am decorating function', id(f))
    return f
```

```python
def foo(x):
    print(x)  # I am decorating function 45206384
```

```python
foo = dec(foo)
```

可以替换为：

```python
@dec
def foo(x):
    print(x)
```

那么他有什么实际作用？故事的开始是这样的，你写好了2个函数：

```python
def test1(): 
  print('test1 ..')

def test2():
  print('test2 ..')

test1()
test2()
```

当你准备把它放到服务器上，这个时候领导提醒你要输出日志，不然查错跑断腿。
输出要求是：在每次函数调用的前后加上时间。
于是你写成了下面这个样子

```python
import time
def test1(): 
    print('测试开始：现在时间是',time.time())
    print('test1 ..')
    print('测试结束：现在时间是',time.time())

def test2():
    print('测试开始：现在时间是',time.time())
    print('test2 ..')
    print('测试结束：现在时间是',time.time())

test1()
test2()
```

领导说，他有3个问题：

- 首先代码1和代码2是一样的，也就是说把同样的代码写了2遍，这一点也不程序员！
- 而且，你修改了你的核心代码，使得它变得很长。后面要再删也很麻烦，万一手抖删错了就完了。
- 最后，在大项目合作中，可能test代码是A同事写的，输出日志代码是B同事写的，代码保密，每个程序员只能拿到部分片段，所以你根本不知道对方的代码，要提供一个通用的打印日志的方式。

思考下，可以怎么修改能既不修改源代码，又对代码结构影响最小呢？

我说，这样子，那我可以写成这样？

```python
import time

def a_decorator(func):
    print('测试开始：现在时间是',time.time())
    func()
    print('测试结束：现在时间是',time.time())

def test1(): 
    print('test1 ..')
  
def test2():
    print('test2 ..')

a_decorator(test1)
a_decorator(test2)
```

领导说：有进步，但是原本调用test1()的语法被你改成了a_decorator(test1)，这要是再多几个功能不得把我绕晕了啊。

看来函数嵌套掌握的不熟啊，给你点提示，我带你透过现象看本质

- 变量的本质：就是变量指向的内存地址
- 函数名的本质：就是函数的内存地址
- 变量可以作为函数的参数，因此函数名可以用做函数的参数
- 变量可以作为函数的返回值，同理，函数名也可以作为函数的返回值

我说，那就写成这样？

```python
import time

def a_decorator(func):
    def wrap_the_func():
        print('测试开始：现在时间是',time.time())
        func()
        print('测试结束：现在时间是',time.time())
    return wrap_the_func

def test1(): 
    print('test1 ..')
  
def test2():
    print('test2 ..')

test1 = a_decorator(test1) #这里a_decorator(test1) 代指wrap_the_func()，把这个wrap_the_func()函数的地址赋值给test1，由于代码从上而下执行，从而替换掉原本test1的指向。
test2 = a_decorator(test2)

test1()
test1()
```

领导说：这倒数3、4行看着很碍眼，且会占据命名空间，你不会修饰符吗？我教你啊。

- 我们先定义一个函数（名字随便起，这里只是用a_decorator做示例）
- 然后简单的设置下这个函数运行逻辑，
- 最后在原有的函数的头上加@函数名就行啦

直接使用@函数修饰符是很方便的，你也看出来所谓【@函数修饰符】其实就是【函数】嵌入。

这里我再假设你的函数是带参数的。我也用修饰符写一下吧。好好看，好好学。

核心代码（下方的test函数）无需知道我（下方的log函数）是怎么写的，我也无需知道核心代码是怎么写的，我们就能快速完成协作。

```python
import time

#args 是 arguments 的缩写，表示位置参数；
#kwargs 是 keyword arguments 的缩写，表示关键字参数。
#这其实就是 Python 中可变参数的两种形式，
#并且 *args 必须放在 **kwargs 的前面，因为位置参数在关键字参数的前面。

def log(func):
  def wrapper(*args,**kwargs):
    print('测试开始：现在时间是',time.time())
    ret = func(*args,**kwargs)
    print('测试结束：现在时间是',time.time())
    return ret
  return wrapper

@log
def test1(s): 
  print('test1 ..', s)
  return s
@log
def test2(s1, s2):
  print('test2 ..', s1, s2)
  return s1 + s2

test1(1)
test2(1,2)
```

于是你回想起之前Python也提供了一些自带函数，例如：print()、input()

那会不会也有一些自带的【@函数修饰符】呢？还真有，常见的包括：@property、@classmethod、@staticmethod还有typing里面各种用于测试的函数。

不过这些结构相对复杂，当你理解普通的@修饰符之后，这些自带的你只需要记得用法即可，原理都是一样的。

#### 例子

定义两个装饰器函数，一个将原来的函数值加一，另一个乘二：

```python
def plus_one(f):
    def new_func(x):
        return f(x) + 1

    return new_func
```

```python
def times_two(f):
    def new_func(x):
        return f(x) * 2

    return new_func
```

定义函数，先乘二再加一：

```python
@plus_one
@times_two
def foo(x):
    return int(x)
```

```python
b = foo(2)
b  # 5
```

#### 修饰器工厂

decorators factories 是返回修饰器的函数

它的作用在于产生一个可以接受参数的修饰器，

例如我们想将 函数 输出的内容写入一个文件去，可以这样做：

```python
def super_loud(filename):
    fp = open(filename, 'w')

    def loud(f):
        def new_func(*args, **kw):
            fp.write(str(args))
            fp.writelines('\n')
            fp.write('calling with' + str(args) + str(kw))
            # 确保内容被写入
            fp.flush()
            fp.close()
            rtn = f(*args, **kw)
            return rtn

        return new_func

    return loud
```

```python
@super_loud('test.txt')
def foo(x):
    print(x)


# 调用 foo 就会在文件中写入内容：
foo(100)
```

```python
import os
os.remove('test.txt')
```

#### @classmethod 装饰器

在 Python 标准库中，有很多自带的装饰器，

例如 classmethod 将一个对象方法转换了类方法：

```python
class Foo(object):
    @classmethod
    def bar(cls, x):
        print('the input is', x)

    def __init__(self):
        pass
```

类方法可以通过 类名.方法 来调用：

```python
Foo.bar(10)
```

#### @property 装饰器

有时候，我们希望像 Java 一样支持 getters 和 setters 的方法，

这时候就可以使用 property 装饰器：

```python
class Foo(object):
    def __init__(self, data):
        self.data = data

    @property
    def x(self):
        return self.data

```

此时可以使用 .x 这个属性查看数据（不需要加上括号）：

```python
foo = Foo(22)
print(foo.x)
```

这样做的好处在于，这个属性是只读的：

foo.x = 1 会报错

如果想让它变成可读写，可以加上一个装饰符 @x.setter：

```python
class Foo(object):
    def __init__(self, data):
        self.data = data

    @property
    def x(self):
        return self.data

    @x.setter
    def x(self, value):
        self.data = value
```

```python
foo = Foo(1000)
foo.x
```

```python
foo.x = 2222
foo.x
```

#### 应用：定时器

要求：写一个定时器功能，要求监控一个执行程序，超时则报警。

如何完成？

下方代码在mac下可用

```python

import signal
import time


def set_timeout(num, callback):
    def wrap(func):
        def handle(signum, frame):  # 收到信号 SIGALRM 后的回调函数，参数1是信号的数字，参数2是the interrupted stack frame.
            raise RuntimeError

        def to_do(*args, **kwargs):
            try:
                signal.signal(signal.SIGALRM, handle)  # 设置信号和回调函数
                signal.alarm(num)  # 设置 num 秒的闹钟
                print('start alarm signal.')
                r = func(*args, **kwargs)
                print('close alarm signal.')
                signal.alarm(0)  # 关闭闹钟
                return r
            except RuntimeError as e:
                callback()

        return to_do

    return wrap


def after_timeout():  # 超时后的处理函数
    print("do something after timeout.")
    raise RuntimeError


@set_timeout(2, after_timeout)  # 限时 2 秒超时
def connect():  # 要执行的函数
    time.sleep(2.4)  # 函数执行时间，写大于2的值，可测试超时
    return "完成"

class Demo:
    @set_timeout(2, after_timeout)
    def conn(self):
        time.sleep(3)
        return "ok"
```

试一下：

```python
try:
    a = connect()
    print(a)
except Exception as e:
    a = 'err'
    print(a)

```

如果不超时：

```python
b = Demo()
try:
    c = b.conn()
    print(c)
except RuntimeError as e:
    print('run time err.')

class Demo:
    @set_timeout(2, after_timeout)
    def conn(self):
        time.sleep(1)
        return "ok"
    
b = Demo()
try:
    c = b.conn()
    print(c)
except RuntimeError as e:
    print('run time err.')
```

## 生成器和迭代器

### 迭代器

迭代是Python最强大的功能之一，是访问集合元素的一种方式。

迭代器是一个可以记住遍历的位置的对象。

迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。

迭代器有两个基本的方法：iter() 和 next()。

字符串，列表或元组对象都可用于创建迭代器：

```python
list=[1,2,3,4]
it = iter(list)    # 创建迭代器对象
```

```python
next(it) # 输出迭代器的下一个元素
```

```python
next(it) # 再输出下一个元素
```

#### enumerate

列表好处是不需要对下标进行迭代，直接输出列表的值：

```python
x = [2, 4, 6]

for i in x:
    print(i)
```

但是有些情况下，我们既希望获得下标，
也希望获得对应的值，那么：

可以将迭代器传给 enumerate 函数，
这样每次迭代都会返回一组 (index, value) 组成的元组：

```python
x = [2, 4, 6]
for i, n in enumerate(x):
    print(i, 'is', n)
```

#### 自定义迭代器

一个迭代器都有  `__iter__()` 与 `__next__()`

`__iter__()` 方法返回一个特殊的迭代器对象， 这个迭代器对象实现了 `__next__()` 方法并通过 StopIteration 异常标识迭代的完成。

`__next__()` 方法（Python 2 里是 next()）会返回下一个迭代器对象。

自定义一个 list 的取反迭代器：

```python
class ReverseListIterator(object):
    def __init__(self, lst):
        self.list = lst
        self.index = len(lst)

    def __iter__(self):
        return self

    def __next__(self):
        self.index -= 1
        if self.index >= 0:
            return self.list[self.index]
        else:
            raise StopIteration
```

```python
x = range(10)
for i in ReverseListIterator(x):
    print(i)
```

只要我们定义了这三个方法(`__init__, __iter__, __next__`)，我们可以返回任意迭代值：

#### 实现Collatz 猜想

这里我们实现 Collatz 猜想：

- 奇数 n：返回 3n + 1
- 偶数 n：返回 n / 2
- 直到 n 为 1 为止：

```python
class Collatz(object):
    def __init__(self, start):
        self.value = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.value == 1:
            raise StopIteration
        elif self.value % 2 == 0:
            self.value = self.value / 2
        else:
            self.value = 3 * self.value + 1
        return self.value


for x in Collatz(5):
    print(x)

```

不过迭代器对象存在状态，__有问题__：

```python
i = Collatz(5)
# zip() 函数用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的迭代器。
for x, y in zip(i, i):
    print(x, y)

# 下方代码等价于上方代码
i = Collatz(5)
# *zipped 可理解为解压，返回二维矩阵式
zipped = zip(i, i)
#<zip object at 0x00000200CFC1F400> #返回的是一个对象
x, y = zip(*zipped)
print(x, y)
```

解决方法是将迭代器和可迭代对象分开处理。

#### 迭代器和可迭代对象分开处理

这里提供了一个二分树的中序遍历实现：

```python
class BinaryTree(object):
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def __iter__(self):
        return InorderIterator(self)

class InorderIterator(object):
    def __init__(self, node):
        self.node = node
        self.stack = []

    def __next__(self):
        if len(self.stack) > 0 or self.node is not None:
            while self.node is not None:
                self.stack.append(self.node)
                self.node = self.node.left
            node = self.stack.pop()
            self.node = node.right
            return node.value
        else:
            raise StopIteration()
```

测试：

```python
tree = BinaryTree(
    left=BinaryTree(
        left=BinaryTree(1),
        value=2,
        right=BinaryTree(
            left=BinaryTree(3),
            value=4,
            right=BinaryTree(5)
        ),
    ),
    value=6,
    right=BinaryTree(
        value=7,
        right=BinaryTree(8)
    )
)
```

```python
for value in tree:
    print(value)
```

不会出现之前的问题：

```python

for x, y in zip(tree, tree):
    print(x, y)

```

### 生成器

在 Python 中，使用了 yield 的函数被称为生成器（generator）。

跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。

1. 迭代器则通过 next 的 return 将值返回；
2. 与迭代器不同的是，生成器会自动记录当前的状态，
而迭代器则需要进行额外的操作来记录当前的状态。

之前的 collatz 猜想，简单循环的实现如下：

collatz:

- 奇数 n：返回 3n + 1
- 偶数 n：返回 n / 2
- 直到 n 为 1 为止：

```python
def collatz(n):
    sequence = []
    while n != 1:
        if n % 2 == 0:
            n /= 2
        else:
            n = 3 * n + 1
        sequence.append(n)
    return sequence


for x in collatz(5):
    print(x)
```

生成器的版本如下：

```python
def collatz(n):
    while n != 1:
        if n % 2 == 0:
            n /= 2
        else:
            n = 3 * n + 1
        yield n


for x in collatz(5):
    print(x)
```

迭代器的版本如下：

```python
class Collatz(object):
    def __init__(self, start):
        self.value = start

    def __iter__(self):
        return self

    def next(self):
        if self.value == 1:
            raise StopIteration
        elif self.value % 2 == 0:
            self.value = self.value / 2
        else:
            self.value = 3 * self.value + 1
        return self.value
    
for x in collatz(5):
    print(x)
```

事实上，生成器也是一种迭代器：

```python
x = collatz(5)
x
```

它支持 next 方法，返回下一个 yield 的值：

```python
next(x)
```

```python
next(x)
```

`__iter__` 方法返回的是它本身：

```python
x.__iter__()
```

#### return和yield有什么区别？

yield 是暂停的意思(它有程序中起着类似红绿灯中等红灯的作用)；yield是创建迭代器，可以用for来遍历，有点事件触发的意思

return  在方法中直接返回值；是函数返回值，当执行到return，后续的逻辑代码不在执行

相同点： 都是定义函数过程中返回值

不同点：yield是暂停函数，return是结束函数； 即yield返回值后继续执行函数体内代码，return返回值后不再执行函数体内代码。

yield返回的是一个迭代器（yield本身是生成器-生成器是用来生成迭代器的）；return返回的是正常可迭代对象（list,set,dict等具有实际内存地址的存储对象）

如果要返回的数据是通过for等循环生成的迭代器类型数据（如列表、元组），return只能在循环外部一次性地返回，yeild则可以在循环内部逐个元素返回。

yiled from 还可以使一个生成器可以委派子生成器，建立双向通道

```Python

def g1(x):
   yield range(x, 0, -1)
   yield range(x)
print(list(g1(5)))
#[range(5, 0, -1), range(0, 5)]

def g2(x):
   yield from range(x, 0, -1)
   yield from range(x)
print(list(g2(5)))
#[5, 4, 3, 2, 1, 0, 1, 2, 3, 4]
```

##### 迭代器和生成器有什么区别？

在 Python 中，使用了 yield 的函数被称为生成器（generator）。跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。在调用生成器运行的过程中，每次遇到 yield 时函数会暂停并保存当前所有的运行信息，返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行。

调用一个生成器函数，返回的是一个迭代器对象：迭代是Python最强大的功能之一，是访问集合元素的一种方式。迭代器是一个可以记住遍历的位置的对象。迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。迭代器有两个基本的方法：iter() 和 next()

##### __new__和 __init__的区别？

执行顺序的不同：只有在__new__返回一个cls的实例时后面的__init__才能被调用

功能上的不同：当创建一个新实例时调用__new__,初始化一个实例时用__init__

返回值的不同：__new__方法会返回一个创建的实例,而__init__什么都不返回

### 闭包

#### 闭包作用

闭包可以用在许多地方。它的最大用处有两个：

1.可以读取函数内部的变量
2.让这些变量的值始终保存在内存中
3.单向访问，函数内可以访问，但是全局不能访问

#### 闭包原理（命名空间与作用域）

##### 命名空间

- 全局命名空间：创建的存储“变量名与值的关系”的空间叫做全局命名空间
- 局部命名空间：在函数的运行中开辟的临时的空间叫做局部命名空间
- 内置命名空间：内置命名空间中存放了python解释器为我们提供的名字：input,print,str,list,tuple...它们都是我们熟悉的，拿过来就可以用的方法。

三种命名空间之间的加载顺序和取值顺序：

- 加载顺序：内置（程序运行前加载）-->全局（从上到下顺序加载进来的）-->局部（调用的时候加载）--->内置
- 取值：在局部调用：局部命名空间--->全局命名空间--->内置命名空间
- 在全局范围找：全局----内置----局部
  使用：
  全局不能使用局部的，局部的可以使用全局的

##### 作用域

作用域：就是作用范围，为了函数内的变量不会影响到全局。作用域分为两种：

- 全局作用域：全局命名空间与内置命名空间的名字都属于全局范围在整个文件的任意位置都能被引用，全局有效
- 局部作用域：局部命名空间，只能在局部范围内生效
  站在全局看：使用名字的时候：如果全局有，用全局的。如果全局没有，用内置的。
- globals方法：查看全局作用域的名字【print(globals())】
- locals方法：查看局部作用域的名字【print(locals())】
  `<br>`下面看2个示例

##### 闭包失败示例

```python
name = 1 #变量在函数外部,inner可以访问，但是全局也能访问。直接闭包失败
def func():
    def inner():
        print(name)
        print(inner.__closure__)
        return name
    return inner

p = func()
print(p())#输出的__closure__为None ：不是闭包函数
print(name)
```

##### 闭包成功示例

```python
def func():
    name = 1 #变量在函数内部,inner可以访问,但是全局不能访问。闭包成功！此时加上nonlocal
    def inner():
        nonlocal name
        # nonlocal非局部声明变量 是python3.2的语法,简单说就是让内部函数中的变量在上一层函数中生效
        # 非局部声明变量指代的已有标识符是最近外面函数的已声明变量，但是不包括全局变量。这个是很重要的，因为绑定的默认行为是首先搜索本地命名空间。nonlocal声明的变量只对局部起作用，离开封装函数，那么该变量就无效。
        name += 1
        print(inner.__closure__)
        return name
    return inner

p = func()
print(p())
print(p())
print(p())

print(name)
```

### 单例模式

单例模式就是确保一个类只有一个实例.当你希望整个系统中,某个类只有一个实例时,单例模式就派上了用场.

比如,某个服务器的配置信息存在在一个文件中,客户端通过AppConfig类来读取配置文件的信息.如果程序的运行的过程中,很多地方都会用到配置文件信息,则就需要创建很多的AppConfig实例,这样就导致内存中有很多AppConfig对象的实例,造成资源的浪费.其实这个时候AppConfig我们希望它只有一份,就可以使用单例模式.

#### 使用闭包函数实现单例模式

```python
def single(cls, *args, **kwargs):
    instance = {}

    def get_instance():
        if cls not in instance:
            instance[cls] = cls(*args, **kwargs)
        return instance[cls]
    return get_instance


@single
class Apple:
    pass

# 测试新建2个不同实例，id是否一致
a = Apple()
print(id(a)) 
b = Apple()
print(id(b))
```

#### 也可以直接使用__new__方法实现的单例模式

```python
class Single:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(Single, cls).__new__(cls)
        return cls._instance


s1 = Single()
s2 = Single()
print(id(s1))
print(id(s2))
```

## 进程、线程和协程

### 进程

进程是系统独立安排和分配系统资源（CPU、内存）的基本单位，操作系统以进程为单位分配存储空间，操作系统管理所有进程的执行，为它们合理的分配资源。

一个进程就是macOS中的“活动监视器”、Windows中的“任务管理器”的一个执行程序。

Python既支持多进程又支持多线程。

#### 多进程

进程之间是相互独立的，Python中的进程通信一般由进程对Queue完成。

进程绕过了全局解释器锁。因此，多进程模块允许程序员充分利用特定机器上的多个处理器。它在Unix和Windows上都能运行。

进程的数量等于CPU核心的数量，这是最有效的。如果核数太多，就不能充分利用核数。如果太少，会造成进程切换，增加程序的运行时间。

[multiprocessing](https://docs.python.org/zh-cn/3.10/library/multiprocessing.html?highlight=multiprocessing#module-multiprocessing):Multiprocessing Module Code Documentation

```python
from multiprocessing import Pool

def f(vaule):
    x = vaule[0]
    y = vaule[1]
    return x*y

if __name__ == '__main__':
    p = Pool(16) # new 16 process pools ， because i have 16 cpu
    print(p.map(f, [(1,1), (2,2), (3,3)])) # take in data
    p.close() # close pool
  
## [1, 4, 9]
```

我们来完成1~100000000求和的计算密集型任务，循环解决，暂时也不考虑列表切片操作花费的时间，只是把做运算和合并运算结果的时间统计出来。

```python
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

```python
main() 
# 5000000050000000
# Execution time: 6.798s
```

利用多进程“分而治之”，

当我们将这个任务分解到8个进程中去执行：

```python
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

```python
!python multi_process.py
```

```python
# 5000000050000000
# Execution time: 0.7936668395996094s
```

明显，多进程更快。

使用多进程后由于获得了更多的CPU执行时间以及更好的利用了CPU的多核特性，明显的减少了程序的执行时间，而且计算量越大效果越明显。

#### 线程

线程是系统调度资源的最小单位（CPU通过计时器来切换线程）

在Python中，同个时间只有一个线程在运行

当然，如果你运行大量的I/O任务，多进程依然是最好的选择

线程数等于 CPU 内核数的两倍是最高效的。

GIL 是一个防止多个线程同时执行 Python 字节码的互斥锁。之所以需要这种锁，主要是因为 CPython 的内存管理不是线程安全的

在这种环境下，GIL 限制解释器本身只能有一个线程运行，而且任何 Python 解释器级别的操作都是序列化的，因此任何时候都只能有一条语句抛出异常。与异常相关的共享变量也因此受到保护。

线程间通信的目的主要是为了线程同步，因此线程没有像进程通信那样用于数据交换的通信机制。

Python的标准库提供了两个模块：_thread和threading，_thread是低级模块，threading是高级模块，对_thread进行了封装。绝大多数情况下，我们只需要使用threading这个高级模块。

[threading](https://docs.python.org/zh-cn/3.10/library/threading.html?highlight=threading#module-threading):Threading Multiprocessing Module Code Documentation

### 多线程

```python

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

如下所示的界面中，有“下载”和“关于”两个按钮，用休眠的方式模拟点击“下载”按钮会联网下载文件需要耗费10秒的时间，当点击“下载”按钮后，整个任务阻塞：

```python
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

```python
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

**Python的多线程并不能发挥CPU的多核特性**，这一点只要启动几个执行死循环的线程就可以得到证实了。之所以如此，是因为Python的解释器有一个“全局解释器锁”（GIL）的东西，任何线程执行前必须先获得GIL锁，然后每执行100条字节码，解释器就自动释放GIL锁，让别的线程有机会执行，这是一个历史遗留问题。

Python解释器由于设计时有GIL全局锁，导致了多线程无法利用多核。多线程的并发在Python中就是一个美丽的梦。

多进程是有效的。

### 协程

协程是编写并发代码的库，是构建 IO 密集型和高级结构化网络代码的最佳选择。

例程的运行方式是通过代码主动切换状态并等待处理，因此效率更高，语法也更详细。循环对象需要处于活动状态：创建、设置、提交、等待运行和停止。

例行程序的最佳数量取决于内存使用情况。

asyncio模块包含了一些工具，用于编写异步代码。

协程的工作原理是事件循环，事件循环是一个无限循环，它等待事件并执行它们。

每次任务会被挂起至事件循环队列中，然后按顺序执行。

await关键字用于挂起协程，直到它被调用。

async关键字用于定义协程。

asyncio模块用于实现异步编程。

[asyncio](https://docs.python.org/zh-cn/3.10/library/asyncio.html?highlight=asyncio#module-asyncio):asyncio Multiprocessing Module Code Documentation

```python
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

在Python创建协程时，task是future的子类，所以task继承了future的属性和方法。几乎没有不同。

## Python库的使用

库、包、模块的包含关系为：多个模块组成为包、多个包组成为库。

在实际开发中不做严格区分。

### 内置库os

Python的内置os模块，是与操作系统进行交互的模块，主要有如下功能：

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

```python
import os
```

产生文件：

```python
f = open('test.file', 'w')
f.close()
print('test.file' in os.listdir(os.curdir))
```

重命名文件:

```python
os.rename("test.file", "test.new.file")
print("test.file" in os.listdir(os.curdir))
print("test.new.file" in os.listdir(os.curdir))
```

```python
# 删除文件
os.remove("test.new.file")
```

#### 系统常量

- windows 为 \r\n
- unix为 \n

```python
os.linesep
```

```python
# 当前操作系统的路径分隔符：
os.sep
```

当前操作系统的环境变量中的分隔符（';' 或 ':'）：

- windows 为 ;
- unix 为:

```python
os.pathsep
```

os.environ 是一个存储所有环境变量的值的字典，可以修改。

```python
os.environ
```

#### os.path 模块

```python
import os.path
```

- os.path.isfile(path) ：检测一个路径是否为普通文件
- os.path.isdir(path)：检测一个路径是否为文件夹
- os.path.exists(path)：检测路径是否存在
- os.path.isabs(path)：检测路径是否为绝对路径

windows系统：

```python
print(os.path.isfile("C:/Windows"))
print(os.path.isdir("C:/Windows"))
print(os.path.exists("C:/Windows"))
print(os.path.isabs("C:/Windows"))
```

unix系统：

```python
print(os.path.isfile("/Users"))
print(os.path.isdir("/Users"))
print(os.path.exists("/Users"))
print(os.path.isabs("/Users"))
```

#### split 和 join

- os.path.split(path)：拆分一个路径为 (head, tail) 两部分
- os.path.join(a, *p)：使用系统的路径分隔符，将各个部分合成一个路径

```python
head, tail = os.path.split("c:/tem/b.txt")
print(head, tail)
```

```python
a = "c:/tem"
b = "b.txt"
os.path.join(a, b)
```

```python
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

```python
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

```python
a = 1
exec('b = a + 10')
print(b)
```

```python
local = dict(a=2)
glob = {}
exec("b = a+1", glob, local)

print(local)
```

compile 函数生成 byte code：
compile(str, filename, mode)

```python
a = 1
b = compile('a+2', '', 'eval')
print(eval(b))
```

```python
a = 1
c = compile("b=a+4", "", 'exec')
exec(c)
print(b)
```

```python
# abstract syntax trees
import ast

tree = ast.parse('a+10', '', 'eval')
ast.dump(tree)
```

```python
a = 1
c = compile(tree, '', 'eval')
d = eval(c)
print(d)
```

```python
# 安全的使用方法 literal_eval ，只支持基本值的操作：
b = ast.literal_eval('[10.0, 2, True, "foo"]')
print(b)
```

### 第三方库

#### 第三方模块使用的基本流程

第三方模块使用的基本流程 以opencv为例

- 下载 pip install opencv-python
- 导入 import cv2
- 使用 模块名.方法名 示例 ： cv2.imread('./img/cat.jpg')

对于复杂的模块来说，使用help()方法、dir()方法不能很好的满足我们的需求。如果是新手需要搭配官方文档，查阅使用实例。

这里需要注意的是：opencv模块的下载名、导入名均不是opencv。

事实上模块名、下载名与导入名也并非一种强制的规则。

建议在下载模块之前先通过搜索引擎搜索。

更多是后续的开发者出于习惯会将名称统一。例子是pandas模块。

- 下载 pip install pandas
- 导入 import pandas
- 使用 模块名.方法名 示例 ： pandas.read_csv("./cat.csv")

在国内下载模块往往较慢，我们可以通过豆瓣、清华镜像站下载第三方模块。以下载scikit-learn模块为例

- python -m pip install scikit-learn==1.3.0 -i <https://pypi.tuna.tsinghua.edu.cn/simple>

粘贴至终端，windows电脑可以通过win+R 输入CMD

MAC可以直接搜索终端打开。

#### 第三方模块的版本问题

第三方模块与系统模块一样，都是自定义好的一系列模块，这些模块也自然存在一些版本差异。

在使用的过程之中很可能因为版本的不匹配、方法的弃用导致示例的代码失效。

我们可以通过3个方式来解决：

1.升级至最新版本或安装指定的版本

- 安装指定的版本示例: pip install pandas==2.0.2
- 升级至最新版本示例: pip install --upgrade pandas

2.积极的查询官方文档。可在 <https://pypi.org/> 上搜索对应模块，知名度较高的模块都会有系统的官方文档。

3.更换其他模块

#### 第三方模块OpenCV

```python
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

#### 第三方模块Scikit-learn

Scikit-learn（sklearn）、PyTorch和TensorFlow是三个在机器学习和深度学习领域广泛使用的库，各自有其优势和劣势。

如果你处理传统的机器学习问题，Scikit-learn是一个不错的选择。如果你主要进行深度学习研究或需要处理复杂的深度学习任务，PyTorch和TensorFlow是更好的选择，取决于你的偏好和需求。另外，TensorFlow在工业界有广泛的应用，因此在工业部署方面也有一定优势。

#### 数据的来源？

##### 参考数据集

scikit-learn 内置有一些小型标准数据集，不需要从某个外部网站下载任何文件。

scikit-learn 提供也加载较大数据集的工具，并在必要时下载这些数据集。

数据特征说明可参考
<https://scikit-learn.org/stable/modules/classes.html#module-sklearn.datasets>

这些数据集有助于快速说明在 scikit 中实现的各种算法的行为。
然而，它们数据规模往往太小，无法代表真实世界的机器学习任务。
但是作为学习使用刚刚好。

| 数据集名称 | 加载方法     | 模型类型               | 数据大小(样本数*特征数)       |         |
|-------|----------|--------------------|---------------------|---------|
| 0     | 波士顿房价数据集 | load_boston        | regression          | 506*13  |
| 1     | 鸢尾花数据集   | load_iris          | classification      | 150*4   |
| 2     | 手写数字数据集  | load_digits        | classification      | 1797*64 |
| 3     | 糖尿病数据集   | load_diabetes      | regression          | 442*10  |
| 4     | 葡萄酒数据集   | load_wine          | classification      | 178*13  |
| 5     | 乳腺癌数据集   | load_breast_cancer | classification      | 569*30  |
| 6     | 体能训练数据集  | load_linnerud      | 多重回归 | 20*3    |

```python
import sklearn.datasets
# 加载小数据
data = sklearn.datasets.load_wine()
data.data

from sklearn.datasets import fetch_california_housing
# 加载大数据
housing = fetch_california_housing()
housing.data

from sklearn.datasets import load_sample_image
# 加载图片
china = load_sample_image("china.jpg")

```

##### 样本生成器

scikit-learn 包括各种随机样本的生成器，可以用来建立可控制的大小和复杂性人工数据集。

```python
from sklearn.datasets import make_blobs
# 创建KNN模型数据集
'''
X为样本特征，Y为样本簇类别，共1000个样本，

每个样本4个特征，共4个簇，簇中心在[-1,-1], [0,0], [1,1], [2,2],
簇方差分别为[0.4, 0.2, 0.2]
'''
x, y = make_blobs(n_samples=1000, 
                  n_features=2,
                  centers=[[-1, -1], [0, 0], [1, 1], [2, 2]],
                  cluster_std=[0.4, 0.2, 0.2, 0.2],
                  )
from sklearn.datasets import make_regression
# 创建回归模型数据集
'''
X为样本特征，Y为样本簇类别，共1000个样本，

每个样本1个特征，
离散度为2
'''
x2,y2 = make_regression(n_samples=1000, n_features=1, n_targets=1, noise=2)
```

##### 自有数据集

我们手上可能刚好有一些数据集，可以通过pandas或者numpy读取

```python
# 通过pandas或者numpy读取
import pandas as pd
import numpy as np
data = pd.read_csv('./data/iris.csv')
# 通过numpy读取
data = np.loadtxt('./data/iris.csv', delimiter=",", skiprows=1)

```

### Python调用C

Python的底层是C写的（实际上大部分高级编程语言都是C写的）因此互相调用的逻辑主要是：数据类型转换、编译库的链接、接收返回值。

这个过程涉及到反复的调试，所以先从调试开始讲。

#### Visual Studio Code 和 Visual Studio的调试

##### Visual Studio Code

先看我们熟悉的Visual Studio Code ，以下简称VScode

点击“行号”前的位置，就可以给代码行打上红色的“断点”。

```Python
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

接着点击刚刚的调试按钮，点击运行和调试，接着根据你的文件类型选择，譬如py文件就选择Python File. 然后可以看到代码上方有6个按钮。他们分别是：

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

```C
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

我们先在红色区域（数字1）打上断点

再在绿色区域（数字2）点击调试

最后蓝色区域找到这个6个按钮

前面2个分别是stop（停止）和Restart（重启）

后面的1、2、3、4则依次对应着：continue（继续）、step over（单步跳过）、step into（单步调试/单步执行）和step out（单步跳出）

#### 代码的互相调用

##### 在Python中调用C（原生的Python.h）

python+c/c++混合编程如：

> 原生的Python.h

> cython

> pybind11：pytorch也采用该方法

> ctypes、cffi、SWIG、Boost.Pytho 等

但不论是哪个方法，大致的流程都是：转换数据类型->编译代码->生成编译后的文件（.pyd .pyc .pyo .so .dll 等）

```language
冷知识：

python的import不止能导入.py后缀结尾的文件

pyc是由py文件经过编译后生成的二进制文件，py文件变成pyc文件后，加载的速度有所提高，并且可以实现源码隐藏。

pyo是优化编译后的程序，也可以提高加载速度，针对嵌入式系统，把需要的模块编译成pyo文件可以减少容量。

.so和.dll分别是Linux和window的动态库

这些都可以被import导入，所以我们只需要编译C代码，然后import导入即可。

```

##### 环境设置

- 首先我们找到python的安装路径，通过文件搜索找到Python.h的文件夹路径
- 【设我的Python路径为C:\Python】
- 那么Python.h的文件位置就是：C:\Python\include 简称H路径
- python310_d.lib的位置就是：C:\Python\libs 简称L路径
- 接着右击【项目】，点击属性

- 最后在上方选择所有配置、所有平台。点击VC++目录，选择包含目录最右边的下拉三角，输入刚刚复制的__H路径__即可

- 接着再来载入python310_d.lib库，打开L路径查看里面有无python310_d.lib这个文件，【注意，310是python版本号，不同版本对应不同文件名】如果没有，则复制python310.lib，然后重命名。
- 还是打开刚刚的属性，依次设置。
- 库目录填【文件夹路径】

- 附加依赖项填【文件路径】

##### 代码编写

- 新建一个文件名，根据官方文档的说法，以C语言为例，如果一个模块叫 spam，则对应实现它的文件名叫 spammodule.c；如果这个模块名字非常长，比如 spammify，则这个模块的文件可以直接叫 spammify.c

这里我调整了一下官方文档给的示例，添加了一些注释。让新手更易读。

当然原生的方法总是最底层但是最麻烦的方法，如果使用诸如Python中的ctypes模块则流程会简化。此处可以查阅相关文档。

```C
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

### Python发布包

#### 打包

这里Python 3.12 以前的老项目可以使用distutils模块，更推荐使用setuptools模块，setuptools最常用的功能有：

- 依赖包安装与版本管理
- python库的打包分发
- c/c++ 拓展
- python环境限制与生成脚本

整个打包过程最重要的就是__setup.py__，它指定了重要的配置信息。setup.py的内容如下(示例)：

```python
from setuptools import setup,Extension

setup(
    ext_modules=[
    Extension(
    name = 'spam', # 包名称
    sources=['spammodule.cpp'],
    )]
)
```

通过setup函数的这些参数packages、include_package_data（其实就是MANIFEST.in文件）、exclude_package_data、package_data、data_files来指定需要打包的文件。

包含的文件如下：

- py_modules 和 packages 参数中所有 Python 源文件
- ext_modules or libraries 参数中提到的所有 C 源文件
- scripts 参数指定的脚本
- package_data 和 data_files 参数指定的所有文件
- setup.cfg 和 setup.py
- 类似于readme的文件（如README、README.txt、 README.rst、README.md）
- MANIFEST.in 中指定的所有文件（当运行python setup.py sdist时，会查阅MANIFEST.in文件，并且将里面约定的文件打包到最后的包里。什么要，什么不要）

打包命令说明：

1. 源码包source dist（简称sdist）：就是我们熟悉的 .zip 、.tar.gz 等后缀文件。就是一个压缩包，里面包含了所需要的的所有源码文件以及一些静态文件（txt文本、css、图片等）。

```python
python setup.py sdist --formats=gztar
```

2. 二进制包binary dist（简称bdist）：格式是wheel（.whl后缀），它的前身是egg。wheel本质也还是一个压缩包，可以像像zip一样解压缩。与源码包相比，二进制包的特点是不用再编译，也就是安装更快！在使用wheel之前，需要先安装wheel模块

```python
# 先安装wheel模块
pip install wheel

python setup.py bdist --formats=rpm
# 等价于
python setup.py build_rpm
```

3. 开发方式安装包，该命名不会真正的安装包，而是在系统环境中创建一个软链接指向包实际所在目录。这边在修改包之后不用再安装就能生效，便于调试。

```python
pip install -e .
等价于
python setup.py develop
```

4. 构建扩展，如用 C/C++, Cython 等编写的扩展，在调试时通常加 --inplace 参数，表示原地编译，即生成的扩展与源文件在同样的位置。

```python
python setup.py build_ext --inplace
```

5. 构建一个 wheel 分发包，egg 包是过时的，whl 包是新的标准

```python
python setup.py bdist_wheel
```

6. 构建一个 egg 分发包，经常用来替代基于 bdist 生成的模式

```python
python setup.py bdist_egg
```

7. 安装到库

```python
python setup.py install
#等价于
python setup.py build
python setup.py install

#python setup.py install包括两步：python setup.py build python setup.py install。
#这两步可分开执行， 也可只执行python setup.py install, 因为python setup.py install总是会先build后install.


#根据生成的文件等价于
pip install  xxx.zip
# 或
pip install xxx.whl
# 或.... xxx.egg
```

#### 发布

如果我们需要包被全世界的同好通过 pip install 直接安装的话，需要将包上传到 pypi 网站。首先注册 pypi，获得用户名和密码。

上传 tar 包

`python setup.py sdist upload`

上传 whl 包

`python setup.py bdist_wheel upload`

如果要更安全和方便地上传包就使用 twine 上传。

安装 twine

`pip install twine`

上传所有包

`twine upload dist/*`

如果嫌每次输入用户名和密码麻烦可以配置到文件中。

编辑用户目录下的 .pypirc 文件，输入

```bash
[pypi]
username=your_username
password=your_password
```
