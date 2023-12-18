---
sidebar_position: 2
title: MySQL备忘录
---
## 针对databases的增删改查

```mysql -u root -p #链接root用户至服务器

create user username identified by 'password'; 增加用户
create user testuser identified by 'test123'; 示例1

use mysql;# 使用mysql 数据库
update user set host='%' where user='testuser';# 指定用户的授权
grant all privileges on *.* to testuser@'%';# 指定用户的授权
show grants for 'testuser';#查看权限

show databases;#查看数据库【databases复数】
create database name; #创建名为name的数据库
drop database name; #删除名为name的数据库
```

### 针对table的增删改查

```language
#创建
use name #选中name数据库
create table tablename( 
id bigint(20),
ip varchar(255)
); #创建名为tablename的表单

#删除
create table tablename #删除一个table

#修改
alter table [tablename] rename [newname]#修改table名

show tables;#显示当前数据库所有表单
describe tablename ;#查询表结构
select * from tablename ;#查询表数据
select colnamel,colname2 from tablename;#查询表的指定列
```

### 针对列的增删改查

```language
#增加
alter table [tablename] add [c1] [datatype][no null][default];#增加表的列
alter table tablename add c1 int(11) null; #示例1
alter table tablename add c2 int(11) not null default 1;#示例2

#删除
alter table [tablename] drop [c1];#删除表的列

#修改
alter table [tablename] change [oldcloumname][newcloumname][datatype];#修改列的信息
alter table tablename change c1 c100 int(11);#示例1
alter table tablename change c1 c1 varchar(255);#示例2

#查询
describe tablename ;#查询表结构
select * from tablename ;#查询表数据
select colnamel from tablename;         #查询表的指定单列
select colnamel,colname2 from tablename;#查询表的指定多列
```

### 针对行的增改查

```language
#插入
insert into【table name】 values(值1,值2,值3);#插入数据数量必须和列数一致
insert into employee values(1,1,1,1,1);#示例1
insert into【table name】(列1,列2) values(值1,值2）#数据插入指定列

#插入命令insert和查询命令select的组合使用【插入与被插入的数据类型需一致】
insert into【被插入表名】select *from 【table name】[where等子句]..;#常用示例1
insert into【被插入表名】(列名) select (列名) from 【table name】[where等子句]..;#常用示例2

#删除
delete from 【table name】 where 条件;
delete from gc where id = 1; 示例

#修改updata
updata table_ name set colname = xxx[where子句];
updata gc set id = 1 where ip = 3;#示例1
updata gc set id = 1 , account = 1 where ip = 3; #示例2

### 针对行的进阶查找功能【筛选、排序】

#指定查找in
select * from tablename where colname in （value1,value12..）;
select * from gc where id in ('1','2');#示例1

select * from tablename where colname in （select from tablename）;
select * from gc where id in (select id from book where ip <4);示例

#筛选【多重筛选用and和or】
select * from table_ name where colname is null ;
select * from table name where colname is not null ;

select * from table name where colname like abc ;#模糊匹配1
select * from table name where colname not like abc ;#模糊匹配2
注释：abc 固定加单引号匹配格式分为 '%abc'、'abc%'、'%abc%'
select * from table name where colname not like '%abc';#示例1，模糊匹配以abc结尾的数据

select * from tablename where colname 【运算符】值 ;#注意，sql的等于就是单个=
select * from tablename where colname = '1' ;#示例，字符串需要加''
select * from tablename where colname != 1 ;#示例1
select * from tablename where colname between 1 and 3;#示例2，colname值在1和3之间
select * from tablename where colname not between 1 and 3;#示例3，colname值不在1和3之间

#多重筛选
select * from table_ name where colname is null and colname is not null or colname = '1' ;

#去重筛选
select distinct colnamel from tablename;#查询表的指定列【去重】
select distinct colnamel,colname2 from tablename;#查询表的指定列【去重】

#截取【横向】
select * from table_ name [where子句] [order子句] limit [offset,] colcount;
select * from table_ name order by id limit 0,2; #示例1
select * from table_ name order by id limit 2; # 示例2等价于示例1
select * from table_ name order by id limit 10,2; # 示例3，截取11、12行的数据

# 排序【默认asc升序】
select * from table_ name [where 子句] order by col_name [asc/desc]#1.按单一列名排序
select * from table_name [where 子句] order by col_name [asc/desc], col_name2[asc/desc]#2.按多列排序

#筛选+排序
select * from table_ name where colname is null order by col_name [asc/desc],col_name2[asc/desc]
```

补充：windows下python连接linux的mysql并且使用

- linux上成功安装mysql
- 授权mysql可以远程访问
  开放防火墙的端口号

```language
GRANT ALL PRIVILEGES ON *.* TO 【账号】@'%'  IDENTIFIED BY ‘【密码】’  WITH GRANT OPTION;
FLUSH   PRIVILEGES;

#开始编写代码测试

import Mysqldb as mysql
conn=mysql.connect(host=’192.168.142.111’,user=’root’,passwd=’1714****’,db=’dg’)
```