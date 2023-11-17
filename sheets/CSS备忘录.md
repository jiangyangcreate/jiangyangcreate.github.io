---
tags: [css,备忘录]
title: CSS备忘录
---
## css中元素标识用

空格隔开表示从属包含关系，是当前的元素子元素；

逗号隔开表示并列关系，两者之间没有任何关系，可以使用同一个样式。

“~” 为所有相同的父元素中位于 p 元素之后的所有 ul （p~ul）

“>” A>B 表示选择A元素的所有子B元素。

无前缀表示标签

. 前缀 表示属性

`#` 前缀 表示id

: 前缀 表示伪类（:pseudo-class-name）

:: 前缀 表示伪元素（::before ）

[伪类和伪元素说明](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)

## 结构

盒模型主要定义四个区域，从内到外：内容(content)、内边距填充物(padding)、边框(border)和外边距(margin)。

按钮、日期等输入类的样式，都是input标签下使用不同属性得到的
<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input>
