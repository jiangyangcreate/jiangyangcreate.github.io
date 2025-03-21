---
title: Agent开发
sidebar_position: 4
---

Agent 的意义 ：在 AI 时代，Agent 可以利用大模型处理复杂任务。

复杂任务的定义：可以使用非规则化的自然语言描述并执行。


## Agent技术选型 

低代码/无代码开发：Coze，主要通过拖拽组件，生成Agent。

- 优点：简单易用。
- 缺点：功能有限，收费昂贵，云端执行非自主（必须联网），不可控。不同的低代码平台有差异，不易迁移。插件大多需要独立的Token,平台可用的大模型也比较有限。

框架开发：LangChain

- 优点：功能强大，可以满足复杂需求。代码可以灵活复用。
- 缺点：需要一定的技术门槛。


### 规则时代
```bash showLineNumbers
# 规则化的自然语言，一切基于有穷的规则（关键词识别）。
小爱同学，关灯

在传统的场景中，如果不触发指定的关键词，或者关键词不明确，则无法执行。

例如：小爱同学，我要睡觉了。
```
如果想要提升模型的智能化能力，只能是工程师编写更多更复杂的关键词判断逻辑才能提升智能水平，且提升幅度有限。不能理解复杂的语义。

### Agent 1.0 

能理解语义，但是不能串联任务。

```bash showLineNumbers
帮我给张总打电话

在传统的场景下，如果想要执行这个任务，则需要用户明确地告诉小爱同学，我要给张总打电话。并且你的通讯录中的人名需要是张总。不能有丝毫差异。

在通讯录的备注中，如果你的备注是：张三总，另一个人叫张三，则无法识别。或拨打错误，但是在大模型的加持下，可以识别出张三总，并拨打成功。
```

### Agent 2.0 

继承1.0时代的所有能力的同时，能够串联起多个任务，并根据任务的依赖关系，自动调整任务的执行顺序并自动执行。

```bash showLineNumbers
如果你有一个发送邮件的API、一个查询天气的API，你希望执行一个任务：查询明天天气并给某个联系人发邮件，邮件内容为天气预报。

传统场景下，你必须明确的把这个流程编写出来，然后通过关键词触发执行。

在Agent的场景下，你只需要告诉Agent，你的需求，并编写对应的函数。Agent会对零散的函数自动生成一个流程，并执行这个流程。
```

如果想要提升Agent的复杂任务处理能力，那么需要更多的函数，以及大语言模型更强大的上下文理解能力，属于半规则化。类比智能驾驶只能在特定路段自动驾驶。

例如你希望给钉钉好友发送消息，那么你需要编写一个发送消息的函数，并告诉Agent，你的需求。Agent会自动生成一个流程，并执行这个流程。

可以理解为有大脑和手脚，但是只能用专门提供提供的工具，例如API。

### Agent 2.5

继承2.5时代的所有能力的同时，多模态大模型可以基于视觉理解，并执行通用任务。

例如帮我用PS给这个照片调整对比度，如果没有API，传统场景下只能依赖人力完成，但是通过通用视觉理解Agent，可以自动完成这个任务。

例如你是一个生物学家，有一个复杂的识别任务，在国家森林的摄像头中识别多种珍稀动物。

传统场景下，你需要雇佣大量的人力，对动物标注，并且往往一种识别模型只能识别一种动物。识别多种动物，需要多种识别模型。
在 Agent 2.0，也需要先拥有识别多种动物的模型，然后才能识别。

在Agent 2.5 时代，你只需要利用通用视觉理解，可以使用人类的工具，例如浏览器（区别于传统基于规则的自动化测试、自动化爬虫）。

- 相较与职业熟练度顶级的人类，速度依然较慢。
- 对于特定的任务效率相比传统场景的解决方案依然较低。

主要应用方向：重复且简单的工作、复杂的工业化、日常复杂性工作。一个入口，多个工具。一条指令，自动执行。

## Langchain

Langchain 的安装与使用可以参考[Langchain 官方文档](https://python.langchain.com/docs/introduction/)

### 模型调用

### 提示词

### 消息修剪

### 记忆层

### 工具层

### 社区工具

#### 自定义工具

### 图谱

### 创建节点

### 添加边

### 添加条件边

### RAG
