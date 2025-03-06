---
sidebar_position: 5
title: pyecharts
---
## pyecharts

深入学习 pyecharts 请参考 [pyecharts](https://github.com/pyecharts/pyecharts)

### 绘制柱状堆叠图

```python showLineNumbers

'''
绘制柱状堆叠图
'''

from pyecharts import options as opts#导入模块
from pyecharts.charts import Bar

x_attr = ["2018", "2019", "2020", "2021"] #x轴
data1 = [2.691, 4.282, 12.88, 11.43] #第1季度
data2 = [9.157, 9.028, 11.46,9.507]#第2季度
data3 = [4.282, 9.484, 11.91, 16.97]#第3季度
data4 = [16.72, 22.46,26.85, 0]#第4季度

bar=(
    Bar()
        .add_xaxis(x_attr) #设置x轴
        .add_yaxis("第1季度", data1, stack="stack1") #叠加Y轴：数据名称、数据、是否叠加
        .add_yaxis("第2季度", data2, stack="stack1") #叠加Y轴：数据名称、数据、是否叠加
        .add_yaxis("第3季度", data3, stack="stack1") #叠加Y轴：数据名称、数据、是否叠加
        .add_yaxis("第4季度", data4, stack="stack1") #叠加Y轴：数据名称、数据、是否叠加
        .set_series_opts(label_opts=opts.LabelOpts(is_show=False)) #是否直接显示数值：否
        .set_global_opts(title_opts=opts.TitleOpts(title="宁德时代扣非净利润季度报表",
        subtitle="2017-2021年"))#主标题，副标题
    )

bar.render_notebook()

```

### 绘制优雅的双轴折线图

```python showLineNumbers
'''
pyecharts绘制优雅的双轴折线图
'''

import pyecharts.options as opts  #导入模块
from pyecharts.charts import Line #导入模块

# 设置坐标轴

x_data = ["1999-1", "1999-2", "2000", "2003", "2009", "2010", "2020"]
y_data = [820, 932, 1901, 934, 1290, 330, 1320]
y2_data = [0.1, 0.1, 0.3, 0.5, 0.1, 0.1, 0.1]

# 设外层括号是为了让代码可以换行不报错，看起来更美观

line = (
    Line()      #定义图表类型为折线Line
    .set_global_opts(  #固定参数，设置全局属性
        tooltip_opts=opts.TooltipOpts(is_show=False),
        #这句的意思是： 提示框设置(是否展示 = 否)

        # 坐标轴类型。可选：
        # 'value': 数值轴，适用于连续数据。
        # 'category': 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        # 'time': 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，
        # 例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
        # 'log' 对数轴。适用于对数数据。

        #设置X轴为类目，一般都是用它
        xaxis_opts=opts.AxisOpts(type_="category"),

        #设置X轴为数值轴，一般都是用它
        yaxis_opts=opts.AxisOpts(
            type_="value",
            axistick_opts=opts.AxisTickOpts(is_show=True), #鼠标放在点点上展示数值
            splitline_opts=opts.SplitLineOpts(is_show=True), #背景加参考线
        ),
    )
    .add_xaxis(xaxis_data=x_data)  #添加x轴数据

    #添加主坐标轴（左边的）
    .add_yaxis(
        series_name="盈利率", #设置折线的标签名
        y_axis=y_data,    #添加y轴数据
        symbol="emptyCircle", #设置折线图中表示每个坐标点的符号，emptyCircle代表空心圆
        label_opts=opts.LabelOpts(is_show=True), #显示折线上的数据
    )

    #添加副坐标轴（右边的）固定格式,extend是增加，axis是轴
    .extend_axis(
        yaxis=opts.AxisOpts(axislabel_opts=opts.LabelOpts(formatter="{value}")))
)
# 画第2条线，参数重复，不再多讲啦-
line2 =(Line()
    .add_xaxis(x_data)
    .add_yaxis("换手率",y2_data, yaxis_index=1))

line.overlap(line2) #叠加
line.render_notebook()
```
