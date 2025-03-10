---
sidebar_position: 4
title: Python练习
---

## 后缀表达式

### 描述

后缀表达式，又称逆波兰式，指的是不包含括号，运算符放在两个运算对象的后面，所有的计算按运算符出现的顺序，严格从左向右进行（不再考虑运算符的优先规则）。

例如：后缀表达式为“2 3 + 4 × 5 -”计算过程如下：
（1）从左至右扫描，将 2 和 3 压入堆栈；
（2）遇到 + 运算符，因此弹出 3 和 2（ 3 为栈顶元素，2 为次顶元素，注意与前缀表达式做比较），计算出 3+2 的值，得 5，再将 5 入栈；
（3）将 4 入栈；
（4）接下来是 × 运算符，因此弹出 4 和 5，计算出 4 × 5 = 20，将 20 入栈；
（5）将 5 入栈；
（6）最后是-运算符，计算出 20-5 的值，即 15，由此得出最终结果。

示例

listx = [15, 7, 1, 1, "+", "-", "/", 3, "*", 2, 1, 1, "+", "+", "-"]

### 题解

```python  showLineNumbers

# 方法1-python人思维
while len(listx) > 1:
    print(listx)
    for i in range(len(listx)):
        if str(listx[i]) in '+-*/':
            if listx[i] == '+':
                new = listx[i-2] + listx[i-1]
            if listx[i] == '-':
                new = listx[i-2] - listx[i-1]
            if listx[i] == '*':
                new = listx[i-2] * listx[i-1]
            if listx[i] == '/':
                new = listx[i-2] / listx[i-1]
            del listx[i]
            del listx[i-1]
            listx[i-2] = new
            break
print(listx)

# 方法2-利用pop 和 append 仿c语言栈操作
listy = []
for i in listx:
    if str(i) not in "+-*/":
        listy.append(i)  # 入栈
    else:
        if i == "+":
            new = listy.pop() + listy.pop()  # 出栈
        if i == "-":
            new = listy.pop() - listy.pop()
        if i == "*":
            new = listy.pop() * listy.pop()
        if i == "/":
            new = listy.pop() / listy.pop()
        listy.append(new)
print(listy)
```

## 求解密码

### 描述

Python中的string模块包含了许多字符，请根据以下提示设计一个函数：

参数1：不同的密码组合类型
参数2：密码长度

输出：所以可能的组合数量

示例：当仅用**小写字母**和**数字**来组成1位密码时，共有36种可能（26+10）

string.ascii_letters 所有字母
string.ascii_uppercase  大写字母
string.ascii_lowercase  小写字母
string.digits   数字
string.punctuation  标点符号
string.printable    可打印字符
string.whitespace   空白字符

### 题解

```python  showLineNumbers
import string
# 方法1 正常Python人思维
def generate_pwd_list(dic, max_len):
    """
    description:生成指定长度的密码序列
    param {*} dic   字典
    param {*} pwd_len   最大密码长度
    return {*}
    """
    k = itertools.product(dic, repeat=max_len)  # 迭代器
    allkey = ("".join(i) for i in k)
    if max_len == 1:
        return list(allkey)
    return generate_pwd_list(dic, max_len - 1) + list(allkey)


keys = generate_pwd_list(string.ascii_lowercase + string.digits, 1)
print(len(keys))


# 方法2 递归
def combi(seq):
    if not seq:
        yield []
    else:
        for element in seq[0]:
            for rest in combi(seq[1:]):
                yield [element] + rest


def sets(dic, pwd_len):
    n = []
    for i in range(pwd_len):
        n.append(dic)
    return list(combi(n))


print(len(sets(string.ascii_lowercase + string.digits, 2)))



# 方法3 迭代器


res = []


def func(arr, index, temp):
    if len(temp) == len(arr):
        res.append(temp[:])
    else:
        for i in range(len(arr[index])):
            temp.append(arr[index][i])
            func(arr, index + 1, temp)
            temp.pop()


def sets(dic, pwd_len):
    n = []
    for i in range(pwd_len):
        n.append(dic)
    func(
        n,
        0,
        [],
    )


sets(string.ascii_lowercase + string.digits, 2)
print(len(res))


```

## 电影演员

### 描述

小明拿到了一个电影+演员的数据名单，他想设计一个程序，要求：
1.输入演员名
2.如果演员出演了电影，则打印他+他出演的全部电影。程序结束
3.如果演员没有出演电影，则打印查无此人。程序继续
```python  showLineNumbers
电影 = [
'妖猫传',['黄轩','染谷将太'],
'无问西东',['章子怡','王力宏','祖峰'],
'超时空同居',['雷佳音','佟丽娅','黄轩']]
```
### 题解

```python  showLineNumbers

电影 = [
'妖猫传',['黄轩','染谷将太'],
'无问西东',['章子怡','王力宏','祖峰'],
'超时空同居',['雷佳音','佟丽娅','黄轩']]
# 如果查到了：打印出演员+【所有的】电影，循环结束
# 如果没查到，就 循环继续，并且打印【查无此人】
找到了吗 = 0 
while True:
    name = input('你要找的演员')
    for i in 电影:
        if name not in i : 
            a = i #暂存---for 是逐一提取数据，并赋值
        else:
            print(name,'出演了',a)
            找到了吗 += 1        
    if 找到了吗 != 0 : # 不等于 0 就代表它找到了
        break
    print('【查无此人】') # 1号位
```

## 质数分解

### 描述

每个数字可以写成多个质数的乘积，给定一个数字，请你分解为多个质数

### 题解

```python  showLineNumbers


def fun(num, list=None):
    if list is None:
        list = []
    for i in range(2, num):
        while num % i == 0:
            list.append(i)
            num = int(num / i)
            if num > 1:
                fun(num)
    return list
x = 9*5
print(fun(x))
```

## 九九乘法表

### 描述

要求使用循环代码打印一个九九乘法表出来.如下

```bash
1*1=1 

1*2=2 2*2=4 

1*3=3 2*3=6 3*3=9 

1*4=4 2*4=8 3*4=12 4*4=16 

1*5=5 2*5=10 3*5=15 4*5=20 5*5=25 

1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36 

1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49 

1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64        

1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81 
```

### 题解

```python  showLineNumbers
#方法一
for i in range(1,10):
    print()
    for j in range(1,i+1):
        print('%d*%d=%d' % (j,i,i*j),end=' ')

#方法二
i=1
while i<10: #控制行，1到9
    j=1
    while j <= i: #控制每行显示的数量，1到9
        print("%d*%d=%d"%(j,i,i*j),end=' ') #输出
        j+=1 #每行显示的数量加1
    print("\n") #每一行结束换行
    i+=1 #行数加1

```

## 字典排序

### 描述

将字典数组按字典的某个key排序

### 题解

```python  showLineNumbers
# 方法1：
sorted(d.cop(),key = lambda i:i[k])

# 方法2：
heappush(h,(i[k],i)) for i in d
```

## 冒泡排序

### 描述

给定一个列表，请你对列表的元素进行     从大到小排序   与从小到大排序

### 题解

```python  showLineNumbers


list1 = [13, 22, 6, 99, 11, 0]

for a in range(len(list1)):
    for b in range(a,len(list1)):
        if list1[a] < list1[b]:  #如果m大于了n
           list1[a] ,list1[b] =  list1[b],list1[a]#交换位置
print(list1)
```

## 快速排序

### 描述

快速排序（Quicksort）是对冒泡排序的一种改进算法。

该算法的实现基本可分为以下几步：

在数组中选一个基准数（通常为数组第一个）。
将数组中小于基准数的数据移到基准数左边，大于基准数的移到右边
对于基准数左、右两边的数组，不断重复以上两个过程，直到每个子集只有一个元素，即为全部有序。

请你编写它的实现代码。

### 题解

```python  showLineNumbers
def partition(arr, low: int, high: int):
    pivot, j = arr[low], low  # 获取底部元素与 对应的初始下标

    for i in range(low + 1, high + 1):  # 从第2个元素开始，到最后一个元素
        if arr[i] <= pivot:  # 如果这个元素，小于第1个元素
            j += 1  # 初始下标+1
            arr[j], arr[i] = arr[i], arr[j]  # 把这个小元素和标的元素换位置
    arr[low], arr[j] = arr[j], arr[low]  # arr[low]是等于自己的，现在把他挪到中间位置
    return j  # 返回这个中间位置


def quick_sort_between(arr, low: int, high: int):
    if high-low < 1:  # 递归结束条件
        return

    m = partition(arr, low, high)
    quick_sort_between(arr, low, m - 1) # 二分后自我调用，直到递归结束条件触发
    quick_sort_between(arr, m + 1, high)


def quick_sort(arr):
    """
    快速排序(in-place)
    :param arr: 待排序的List
    :return: 快速排序是就地排序(in-place)
    """
    quick_sort_between(arr, 0, len(arr)-1)  # arr[0] - arr[len(arr)-1]

# 测试数据
if __name__ == '__main__':
    arr = [17, 56, 71, 38, 61, 62, 48, 28, 57, 42, 10, 21, 12, 90]  # 长度为10
    quick_sort(arr)
    print("快速排序结果：", arr)
```

## 抽奇数

### 描述

要求：0-N，每次抽走奇数，打印剩余的那个数字

### 题解

```python  showLineNumbers
aList = []
for i in range(0,2023):
    aList.append(i)

while len(aList)>1:
    aList = aList[1::2]
    print(aList)
print(aList)
```

## 平方和

### 描述

两个数字的平方和是2022，请问这2个数分别是多少

### 题解

```python  showLineNumbers

for a in range(1,2022):
    if (2022 - a*a)**0.5 in range(1,2022):
        print(a)
```

## 规整的打印考场号

### 描述

学校有440人参加考试，1号考场有80个座位，要求座位号为0101--0180
后面每个考场40个座位：
2号考场考试号要求为0201--0240
3号考场考试号要求为0301--0340
后续考场以此类推，请你打印出来这些考场号吧

### 题解

```python  showLineNumbers

for i in range(1,440):
    if i <= 80 :
        print('01{:0>2d}'.format(i))
    elif i <= 440:
        if i%40 == 0:
            print('{:0>2d}{:0>2d}'.format(i//40-1,40))
        else:
            print('{:0>2d}{:0>2d}'.format(i//40,i%40))
```

## 打印时间

### 描述

请从00:00依次打印出一天的时间
示例：

- 23 : 52
- 23 : 53
- 23 : 54

### 题解

```python  showLineNumbers

for 时钟 in range(24):
    for 分钟 in range(60):
        print(时钟, ':', 分钟)

```

## 数羊问题

### 描述

编写一段代码，模拟我们数羊到入睡的过程：
每数五只羊，就提问一次：睡着了吗？
如果没有睡着，继续循环，并打印“继续数羊”。
如果睡着了，则停止循环，并打印“终于睡着了”。

### 题解

```python  showLineNumbers

i = 0
while True:
    i += 1
    left_endpoint = 1 + 5 * ( i - 1 )
    right_endpoint = 1 + 5 * i
    for i in range(left_endpoint, right_endpoint):
        print(str(i)+'只羊')
    answer = input('睡着了吗？回答是或否：')
    if answer == '是':
        break
    print('继续数羊')
print('终于睡着了')

#方法二
睡觉的状态 = '还没睡'
a = 0
while 睡觉的状态 != '睡着': # 只要不是睡着，就继续数
    a +=1
    print(str(a)+'只羊')
    if a%9 == 0 : # %是取余数 每次数5只羊
        睡觉的状态 = input('睡着了嘛？')
```

## 图书馆系统

### 描述

创建一个图书馆系统，要求如下：

1. 有两个类：用户类和图书类
2. 用户类有属性：姓名、年龄、性别、借书数量、借书列表
3. 图书类有属性：书名、作者、出版社、价格、状态（是否被借出）
4. 用户类有方法：借书、还书
5. 图书类有方法：借出、归还
6. 用户类和图书类的方法中，需要对用户的借书数量和图书的状态进行判断
7. 用户类和图书类的方法中，需要对用户的借书列表和图书的状态进行修改
8. 用户类和图书类的方法中，需要打印出用户的借书列表和图书的状态
9. 使用图形化界面工具，如tkinter
安装命令 pip install tkinter-page


### 题解

```python  showLineNumbers


from tkinter import *

"""
提前安装好模块:pip install tkinter-page
需要掌握的知识：Python基础、Mysql命令、os模块、tkinter模块
"""
from tkinter import *
import sqlite3
import os


class db:
    def addmysql(name, author, comment, state):  # 添加数据
        Desktoppath = "./StrayLibrary/book.db"
        db = sqlite3.connect(Desktoppath)  # 使用cursor()方法获取操作游标
        cursor = db.cursor()  # SQL 插入语句
        sql = "INSERT INTO EMPLOYEE(name,author,comment,state)VALUES ('{}','{}','{}','{}')".format(
            name, author, comment, state
        )
        try:  # 执行sql语句
            cursor.execute(sql)  # 提交到数据库执行
            db.commit()
        except:  # Rollback in case there is any error
            db.rollback()
        db.close()  # 关闭数据库连接

    def changemysql(state, name):  # 更改数据状态
        Desktoppath = "./StrayLibrary/book.db"
        db = sqlite3.connect(Desktoppath)
        cursor = db.cursor()  # 使用cursor()方法获取操作游标
        sql = "UPDATE EMPLOYEE SET state = '%s' where name = '%s' " % (state, name)
        try:
            cursor.execute(sql)
            db.commit()
        except:
            pass
        db.close()

    def checkmysql():  # 检索数据库
        Desktoppath = "./StrayLibrary/book.db"
        db = sqlite3.connect(Desktoppath)
        cursor = db.cursor()  # 使用cursor()方法获取操作游标
        sql = "SELECT * FROM EMPLOYEE"  # SQL 查询语句
        try:
            cursor.execute(sql)  # 获取所有记录列表
            results = cursor.fetchall()
            return results
        except:
            pass
        db.close()

    def bulildmysql():
        try:
            os.makedirs("./StrayLibrary")  # 创建一个文件夹
            Desktoppath = "./StrayLibrary/book.db"  # 文件夹下创建一个数据库
            file = open(Desktoppath, "w")
            file.close()

            db = sqlite3.connect(Desktoppath)
            cursor = db.cursor()  # 使用cursor()方法获取操作游标
            cursor.execute(
                "DROP TABLE IF EXISTS EMPLOYEE"
            )  # 如果数据表已经存在使用 execute() 方法删除表。
            sql = """CREATE TABLE EMPLOYEE (name  TEXT(255),author  TEXT(255),comment TEXT(255),state TEXT(255))"""
            cursor.execute(sql)  # 创建数据表SQL语句
            db.close()
            db.addmysql(
                "惶然录", "费尔南多·佩索阿", "一个迷失方向且濒于崩溃的灵魂的自我启示、一首对默默无闻、失败、智慧、困难和沉默的赞美诗。", "未借出"
            )
            db.addmysql(
                "以箭为翅", "简媜", "调和空灵文风与禅宗境界，刻画人间之缘起缘灭。像一条柔韧的绳子，情这个字，不知勒痛多少人的心肉。", "未借出"
            )
            db.addmysql(
                "心是孤独的猎手", "卡森·麦卡勒斯", "我们渴望倾诉，却从未倾听。女孩、黑人、哑巴、醉鬼、鳏夫的孤独形态各异，却从未退场。", "已借出"
            )
        except:
            pass


class Book:
    def __init__(self, name, author, comment, state):
        self.name = name
        self.author = author
        self.comment = comment
        self.state = state

    def __str__(self):
        return "\n名称：《%s》 \n作者：%s \n推荐语：%s\n状态：%s \n---------" % (
            self.name,
            self.author,
            self.comment,
            self.state,
        )


class StrayLibrary:
    books = []

    def __init__(self, init_window_name):
        self.init_window_name = init_window_name
        results = db.checkmysql()
        for row in results:
            name = row[0]
            author = row[1]
            comment = row[2]
            state = row[3]
            book1 = Book(name, author, comment, state)
            self.books.append(book1)

    def set_init_window(self):  # 设置窗口
        self.init_window_name.title("流浪图书馆(StrayLibrary)")  # 窗口名
        self.init_window_name.geometry("450x260+10+10")
        self.result_data_Text = Text(
            self.init_window_name, width=35, height=15
        )  # 处理结果展示
        self.result_data_Text.grid(row=1, column=12, rowspan=7, columnspan=7)

        self.mianbutton1 = Button(
            self.init_window_name,
            text="查询(check)",
            bg="DodgerBlue",
            width=20,
            command=self.show_all_book,
        )  # 调用内部方法  加()为直接调用
        self.mianbutton2 = Button(
            self.init_window_name,
            text="添加(add)",
            bg="DodgerBlue",
            width=20,
            command=self.add_book,
        )  # 调用内部方法  加()为直接调用
        self.mianbutton3 = Button(
            self.init_window_name,
            text="借阅(lend)",
            bg="DodgerBlue",
            width=20,
            command=self.lend_book,
        )  # 调用内部方法  加()为直接调用
        self.mianbutton4 = Button(
            self.init_window_name,
            text="归还(return)",
            bg="DodgerBlue",
            width=20,
            command=self.return_book,
        )  # 调用内部方法  加()为直接调用
        self.mianbutton1.grid(row=1, column=11)
        self.mianbutton2.grid(row=3, column=11)
        self.mianbutton3.grid(row=5, column=11)
        self.mianbutton4.grid(row=7, column=11)

    # 功能函数
    def show_all_book(self):
        self.result_data_Text.delete(0.0, END)
        for book in self.books:
            self.result_data_Text.insert(1.0, book)

    def add_book(self):
        top = Tk()
        top.title("添加(add)")
        top.geometry("300x120+450+10")
        self.L1 = Label(top, text="请输入书籍名称：")
        self.E1 = Entry(top, bd=5)
        self.L2 = Label(top, text="请输入作者名称：")
        self.E2 = Entry(top, bd=5)
        self.L3 = Label(top, text="请输入书籍推荐语：")
        self.E3 = Entry(top, bd=5)
        self.L1.place(x=0, y=0)
        self.L2.place(x=0, y=30)
        self.L3.place(x=0, y=60)
        self.E1.place(x=120, y=0)
        self.E2.place(x=120, y=30)
        self.E3.place(x=120, y=60)
        self.B = Button(top, text="输入完毕请点击确认,无需继续输入请关闭窗口", command=self.add_booking)
        self.B.pack(side=BOTTOM)

    def add_booking(self):
        new_name = self.E1.get()
        new_author = self.E2.get()
        new_comment = self.E3.get()
        self.result_data_Text.delete(0.0, END)
        new_book = Book(new_name, new_author, new_comment, "未借出")
        self.books.append(new_book)
        db.addmysql(new_name, new_author, new_comment, "未借出")  # 写入数据库
        self.result_data_Text.insert(1.0, new_name + "录入成功！\n")

    def check_book(self, name):
        for book in self.books:
            if book.name == name:
                return book
        else:
            return None

    def lend_book(self):
        toplend = Tk()
        toplend.title("借阅(lend)")
        toplend.geometry("330x50+450+30")
        self.lendE1 = Entry(toplend, bd=5)
        self.lendE1.pack(side=RIGHT)
        self.lendB1 = Button(toplend, text="输入书名，输入完毕请点击", command=self.lend_booking)
        self.lendB1.pack(side=LEFT)

    def lend_booking(self):
        name = self.lendE1.get()
        res = self.check_book(name)
        self.result_data_Text.delete(0.0, END)
        if res != None:
            if res.state == "已借出":
                self.result_data_Text.insert(1.0, "你来晚了一步，这本书已经被借走了噢")
            else:
                res.state = "已借出"
                db.changemysql("已借出", res.name)
                self.result_data_Text.insert(1.0, "借阅成功，借了不看会变胖噢～")
        else:
            self.result_data_Text.insert(1.0, "这本书暂时没有收录在系统里呢")

    def return_book(self):
        topreturn = Tk()
        topreturn.title("归还(return)")
        topreturn.geometry("330x50+450+30")
        self.returnE1 = Entry(topreturn, bd=5)
        self.returnE1.pack(side=RIGHT)
        self.returnB1 = Button(
            topreturn, text="输入书名，完毕请点击", command=self.return_booking
        )
        self.returnB1.pack(side=LEFT)

    def return_booking(self):
        name = self.returnE1.get()
        res = self.check_book(name)  # 调用check_book方法，将返回值赋值给变量res
        self.result_data_Text.delete(0.0, END)
        if res == None:  # 如果返回的是空值，即这本书的书名不在系统里
            self.result_data_Text.insert(1.0, "没有这本书噢，你恐怕输错了书名～")
        else:  # 如果返回的是实例对象
            if res.state == "未借出":  # 如果实例属性state等于0，即这本书的借阅状态为'未借出'
                self.result_data_Text.insert(1.0, "这本书没有被借走，在等待有缘人的垂青呢！")
            else:  # 如果实例属性state等于1，即状态为'已借出'
                self.result_data_Text.insert(1.0, "归还成功！")
                res.state = "未借出"  # 归还后书籍借阅状态为0，重置为'未借出'
                db.changemysql("未借出", res.name)


def gui_start():
    db.bulildmysql()
    init_window = Tk()  # 实例化出一个父窗口
    ZMJ_PORTAL = StrayLibrary(init_window)  # 设置根窗口默认属性
    ZMJ_PORTAL.set_init_window()
    init_window.mainloop()  # 父窗口进入事件循环，可以理解为保持窗口运行，否则界面不展示


gui_start()

```

## 读取BMP文件

### 描述

不使用第三方模块的前提下，完成对24位bmp图像的图像数据分析与像素读取。
程序设计需要体现面向对象编程的特点，以创建类的形式编写。

参考资料：

以一张2*2的24位图的bmp格式图片为例

| Offset | Offset10 | Size | Hex value | Value | Description |
|---|---|---|---|---|---|
| BMP Header |  |  |  |  |  |
| 0h | 0 | 2 | 42 4D | "BM" | ID field \(42h, 4Dh\) |
| 2h | 2 | 4 | 46 00 00 00 | 70 bytes \(54\+16\) | BMP 文件的大小（54 字节标头 \+ 16 字节数据） |
| 6h | 6 | 2 | 00 00 | Unused | 特定应用 |
| 8h | 8 | 2 | 00 00 | Unused | 特定应用 |
| Ah | 10 | 4 | 36 00 00 00 | 54 bytes \(14\+40\) | 可以找到像素阵列（位图数据）的偏移量 |
| DIB Header\-Device Independent Bitmaps\-设备无关位图 |  |  |  |  |  |
| Eh | 14 | 4 | 28 00 00 00 | 40 bytes |  DIB 头中的字节数（从此时开始） |
| 12h | 18 | 4 | 02 00 00 00 | 2 pixels \(left to right order\) | 位图的宽度（以像素为单位） |
| 16h | 22 | 4 | 02 00 00 00 | 2 pixels \(bottom to top order\) | 位图的高度（以像素为单位）。从下到上的像素顺序为正。 |
| 1Ah | 26 | 2 | 01 00 | 1 plane | 使用的颜色平面数量 |
| 1Ch | 28 | 2 | 18 00 | 24 bits | 每个像素的位数 |
| 1Eh | 30 | 4 | 00 00 00 00 | 0 | BI\_RGB，未使用像素阵列压缩 |
| 22h | 34 | 4 | 10 00 00 00 | 16 bytes | 原始位图数据的大小（包括填充） |
| 26h | 38 | 4 | 13 0B 00 00 | 2835 pixels/metre horizontal | 图像的打印分辨率， |
| 2Ah | 42 | 4 | 13 0B 00 00 | 2835 pixels/metre vertical | 72 DPI × 39\.3701 inches per metre yields 2834\.6472 |
| 2Eh | 46 | 4 | 00 00 00 00 | 0 colors | 调色板中的颜色数量 |
| 32h | 50 | 4 | 00 00 00 00 | 0 important colors | 0 表示所有颜色都很重要 |
| Start of pixel array \(bitmap data\) |  |  |  |  |  |
| 36h | 54 | 3 | 00 00 FF | 0 0 255 | Red, Pixel \(x=0, y=1\) |
| 39h | 57 | 3 | FF FF FF | 255 255 255 | White, Pixel \(x=1, y=1\) |
| 3Ch | 60 | 2 | 00 00 | 0 0 | Padding for 4 byte alignment \(could be a value other than zero\) |
| 3Eh | 62 | 3 | FF 00 00 | 255 0 0 | Blue, Pixel \(x=0, y=0\) |
| 41h | 65 | 3 | 00 FF 00 | 0 255 0 | Green, Pixel \(x=1, y=0\) |
| 44h | 68 | 2 | 00 00 | 0 0 | Padding for 4 byte alignment \(could be a value other than zero\) |

bit（位）比特是计算机运算的基础，属于二进制的范畴

byte字节是内存的基本单位

8 bit = 1 byte

```python  showLineNumbers
# 参考知识

data = b'\xff' # b代表这是一个二进制数据，\x代表这是一个十六进制的数据

bin_data = bin(int.from_bytes(data))[2:]  # -> 11111111

int(bin_data, 2) # -> 255

# 打开文件作为可编辑对象
with open("r.bmp", "rb") as f:
    d = f.read()
    data = bytearray(d)
# 试着把54到246的数据都改成0x00，即黑色。这样整张图片都变成黑色了
for i in range(54, 246):
    data[i]= 0x00
# 保存文件
with open("black.bmp", "wb") as f:
    f.write(data)
```

### 题解

```python  showLineNumbers
class Readbmp:
    """
    read bmp files
    图片的格式说明：https://en.wikipedia.org/wiki/BMP_file_format#Example_1
    """

    def __init__(self, pic_path) -> None:
        self.pic_path = pic_path
        self.read_color()

    def read_color(self):
        if self.pic_path.endswith(".bmp"):
            self.read_bmp()
        else:
            print("不支持的格式")

    def read_bmp(self):
        bin_datas = []
        """read file data to bin"""
        with open(self.pic_path, "rb") as f:
            while True:
                if len(bin_datas) == f.tell():
                    data = f.read(1)
                    bindata = bin(int.from_bytes(data))[2:]
                    if len(bindata) < 8:
                        bindata = (8 - len(bindata)) * "0" + bindata
                    bin_datas.append(bindata)
                else:
                    bin_datas = bin_datas[:-1]
                    break

        self.bin_pic_head = bin_datas[0:2]  # ID field
        self.bin_pic_size = bin_datas[2:6]  # Size of the BMP file 文件大小
        self.bin_pic_exe = bin_datas[6:10]  # 特定应用，默认为0
        self.bin_pic_address = bin_datas[10:14]  # 图片信息开始地址
        self.bin_pic_dib = bin_datas[14:18]  # DIB 头中的字节数
        self.bin_pic_w = bin_datas[18:22]  # 图片像素宽度
        self.bin_pic_h = bin_datas[22:26]  # 图片像素高度
        self.bin_pic_color_num = bin_datas[26:28]  # 使用颜色平面数
        self.bin_pic_color_long = bin_datas[28:30]  # 每个像素位数
        self.bin_pic_bi = bin_datas[30:34]  # BI_RGB
        self.bin_pic_big = bin_datas[34:38]  # 原始图像数据大小
        self.bin_pic_printpix = bin_datas[38:42]  # 打印分辨率
        self.bin_pic_dpi = bin_datas[42:46]  # DPI
        self.bin_pic_color_num = bin_datas[46:50]  # 调色板中颜色数量
        self.bin_pic_color_important = bin_datas[50:54]  # 重要颜色数量
        self.bin_pic_data = bin_datas[54:]  # 图片数据
        self.bin_to_pic()

    # 将二进制数据转化成十进制数据
    def bin_to_dec(self, bin_datas):
        bin_data = ""
        for i in reversed(bin_datas):
            bin_data += i
        return int(bin_data, 2)

    # 将列表转为3个一组的二维列表
    def change_data(self, data):
        data_2d = []
        x = []
        for i in data:
            x.append(int(i, 2))
            if len(x) == 3:
                data_2d.append(tuple(x))
                x = []
        return data_2d

    # 处理图片数据
    def bin_to_pic(self):
        self.pic_head = chr(int(self.bin_pic_head[0], 2)) + chr(
            int(self.bin_pic_head[1], 2)
        )
        self.pic_size = self.bin_to_dec(self.bin_pic_size)
        self.pic_exe = self.bin_to_dec(self.bin_pic_exe)
        self.pic_address = self.bin_to_dec(self.bin_pic_address)
        self.pic_dib = self.bin_to_dec(self.bin_pic_dib)
        self.pic_w = self.bin_to_dec(self.bin_pic_w)
        self.pic_h = self.bin_to_dec(self.bin_pic_h)
        self.pic_color_num = self.bin_to_dec(self.bin_pic_color_num)
        self.pic_color_long = self.bin_to_dec(self.bin_pic_color_long)
        self.pic_bi = self.bin_to_dec(self.bin_pic_bi)
        self.pic_big = self.bin_to_dec(self.bin_pic_big)
        self.pic_printpix = self.bin_to_dec(self.bin_pic_printpix)
        self.pic_dpi = self.bin_to_dec(self.bin_pic_dpi)
        self.pic_color_num = self.bin_to_dec(self.bin_pic_color_num)
        self.pic_color_important = self.bin_to_dec(self.bin_pic_color_important)
        self.pic_data = self.change_data(self.bin_pic_data)

    # 打印图片信息
    def show(self):
        print(
            """
文件ID  {} 
图像大小(Byte)  {}   
特定应用  {}   
图片信息开始地址  {}   
DIB 头中的字节数 {}   
图片像素宽度  {}   
图片像素高度  {}   
使用颜色平面数  {}   
每个像素位数  {}   
BI_RGB  {}   
原始图像数据大小(Byte) {} 
打印分辨率  {}   
DPI  {}   
调色板中颜色数量  {}   
重要颜色数量  {}   
图片数据  {} .... {} 
""".format(
                self.pic_head,
                self.pic_size,
                self.pic_exe,
                self.pic_address,
                self.pic_dib,
                self.pic_w,
                self.pic_h,
                self.pic_color_num,
                self.pic_color_long,
                self.pic_bi,
                self.pic_big,
                self.pic_printpix,
                self.pic_dpi,
                self.pic_color_num,
                self.pic_color_important,
                self.pic_data[:5],
                self.pic_data[-5:],
            )
        )

    # 判断颜色
    def color(self, color):
        b, g, r = color[0], color[1], color[2]
        if r == 0 and g == 0 and b == 0:
            return "黑色"
        elif r == 0 and g == 0 and b == 255:
            return "蓝色"
        elif r == 0 and g == 255 and b == 0:
            return "绿色"
        elif r == 255 and g == 0 and b == 0:
            return "红色"
        elif r == 255 and g == 255 and b == 255:
            return "白色"
        else:
            return "其他颜色"

    # 统计颜色
    def count_color(self):
        color_dict = {}
        for i in self.pic_data:
            if i in color_dict:
                color_dict[i] += 1
            else:
                color_dict[i] = 1
        return color_dict

    # 判断颜色的比例
    def color_percent(self):
        color_dict = self.count_color()
        color_percent_dict = {}
        for i in color_dict:
            color_percent_dict[self.color(i)] = int(
                color_dict[i] / len(self.pic_data) * 100
            )
        for i in color_percent_dict:
            print("{} 占比百分之 {}".format(i, color_percent_dict[i]))





p = Readbmp("r.bmp")  # 另存为新文件
p.color_percent()
# 红色 占比百分之 100
"""
r.bmp是8*8的位图，其中有一个点是红色，其他都是黑色
"""
# 打开文件作为可编辑对象
with open("r.bmp", "rb") as f:
    d = f.read()
    data = bytearray(d)
# 试着把54到246的数据都改成0x00，即黑色。这样整张图片都变成黑色了（也可以只更改某个数据端）
for i in range(54, 246):
    data[i]= 0x00
# 保存文件
with open("rn.bmp", "wb") as f:
    f.write(data)

p = Readbmp("rn.bmp")
p.show()
p.color_percent()
# 黑色 占比百分之 100
```
