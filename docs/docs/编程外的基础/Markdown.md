---
sidebar_position: 2
title: Markdown
---

Markdown 是一种轻量级标记语言，可用于将格式元素添加到纯文本文档。 Markdown 由 John Gruber 于 2004 年创建，现在是世界上最流行的标记语言之一。

## 数学公式

$\Delta \delta\\$
$\cos (2\theta) = \cos^2 \theta - \sin^2 \theta\\$

```markdown
$\Delta \delta\\$
$\cos (2\theta) = \cos^2 \theta - \sin^2 \theta\\$
```

## 流程图

```mermaid
graph TD;
    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef red fill:#f96,stroke:#333,stroke-width:2px;
    A-->|Yes|B;
    A-->|No|C;
    C-->|Yes|F;
    C-->|No|G;
    class A,B green;
    class C,F,G red;
```

````
```mermaid
graph TD;
    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef red fill:#f96,stroke:#333,stroke-width:2px;
    A-->|Yes|B;
    A-->|No|C;
    C-->|Yes|F;
    C-->|No|G;
    class A,B green;
    class C,F,G red;
```
````

## 表情

:smile:

```markdown
:smile:
```

## 图片

```markdown
![图片描述](图片地址)
```

## 语音

```markdown
<audio src="语音地址"></audio>
```

## 视频

```markdown
<video src="视频地址"></video>
```

## 标题

```markdown
# 一级标题

## 二级标题

### 三级标题
```

## 页内跳转

```markdown
[跳转](#标题)
```

## 粗体

```markdown
**粗体**
```

## 斜体

```markdown
_斜体_
```

## 删除线

```markdown
~~删除线~~
```

## 引用

> 引用

```markdown
> 引用
```

## 分割线

```markdown
---
```

## 脚注

```markdown
脚注[^1]
[^1]: 脚注内容
```

## 链接

```markdown
[链接描述](链接地址)
```

## 代码

```markdown
`代码`
```

## 代码块

```markdown
`代码类型
代码
`
```

## 列表

```markdown
- 无序列表

1. 有序列表
```

## 任务列表

```markdown
- [x] 任务 1
- [ ] 任务 2
```

## 表格

| 表头 | 表头 |
| ---- | ---- |
| 单元 | 单元 |

```markdown
| 表头 | 表头 |
| ---- | ---- |
| 单元 | 单元 |
```

## 转义

```markdown
\\
```

## 注释

```markdown
<!-- 注释 -->
```
