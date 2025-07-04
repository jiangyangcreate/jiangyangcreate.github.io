---
title: Agent开发
sidebar_position: 4
---

Agent 的意义 ：在 AI 时代，Agent 可以利用大模型处理复杂任务。

:::info
复杂任务的定义：可以使用非规则化的自然语言描述并执行。
:::

Agent的三个核心板块：模型、工具、流程。

关于大模型我们在前面已经学习了：模型社区、模型部署、提示词工程。

关于工具部分基本上各家都能兼容各种类型的工具，例如：纯提示词、Function Call 、MCP

单一智能体各家都可以实现，因此技术选型主要集中在如何快速构建多智能体流程，尤其在于：记忆管理（分组、长短记忆、修剪与同步）、human-in-the-loop、智能体切换逻辑。

| 开发方式          | 代表产品/框架            | 优点                                           | 缺点                                                                                                                              |
| ----------------- | ------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 低代码/无代码开发 | Coze                     | • 简单易用                                     | • 功能有限• 收费昂贵• 云端执行非自主（必须联网）• 不可控• 不同平台差异大，不易迁移• 插件大多需要独立的Token• 平台可用的大模型有限 |
| 框架开发          | LangChain、AutoGen、MG等 | • 功能强大• 可以满足复杂需求• 代码可以灵活复用 | • 需要一定的技术门槛                                                                                                              |

## Agent 设计理论

### Agent 开发与变化趋势

| 时代       | 主要特点                                                                 | 示例                                                                 | 局限性                                                                 |
|------------|--------------------------------------------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------|
| 规则时代   | 基于预定义规则和关键词匹配，无法理解语言深层含义。                       | 用户说“小爱同学，关灯”，必须精确匹配关键词才能执行。                 | 无法处理复杂语义；智能化提升依赖于编写更复杂的规则。                   |
| Agent 1.0  | 利用语义理解处理自然语言变体和歧义，但仅限于单个任务。                   | 用户说“帮我给张总打电话”，即使通讯录中是“张三总”，也能正确识别并拨打。 | 不能串联多个任务或处理复杂工作流程。                                   |
| Agent 2.0  | 能将多个任务串联成工作流程，自动规划和执行，但依赖于提供的函数或API。     | 用户说“查询明天天气并给某联系人发邮件”，Agent能自动完成整个过程。     | 无法处理未提供工具的任务；类似智能驾驶只能在特定路段自动驾驶。         |
| Agent 2.5  | 具备多模态理解，如视觉，能使用通用工具执行任务，不再局限于特定API。       | 用户说“用PS调整这张照片的对比度”，或“识别森林摄像头中的多种珍稀动物”。 | 相较于职业熟练度顶级的人类，执行速度较慢；特定任务效率低于传统方案。   |

### 大模型调用工具方式

大模型本身不具备执行能力，需要调用工具。其本质都是将工具封装后传入大模型上下文，然后大模型返回需要调用的工具的名称与参数。再由系统执行。

#### 提示词工程

```python showLineNumbers
import openai
import re
import datetime

# 设置 OpenAI API Key
openai.api_key = "YOUR_API_KEY"

# 实际业务函数：获取天气信息
def get_current_weather(location):
    # 模拟获取天气的逻辑
    return f"{location}的当前天气是晴朗。"

# 新增的工具：获取当前时间
def get_current_time():
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"当前时间是: {now}"

def prompt_engineered_function_call(user_input):
    """
    使用提示词工程实现函数调用：
    1. 当用户输入中涉及"天气"关键词时，输出调用 get_current_weather 的指令，
       格式：CALL get_current_weather(location="<城市名称>")
    2. 当用户输入中涉及"时间"关键词时，输出调用 get_current_time 的指令，
       格式：CALL get_current_time()
    3. 如果用户的问题不涉及"天气"或"时间"，则直接回答。
    """
    prompt = f"""
你是一个智能助手，以下是你的工作规则：
1. 当用户提问包含"天气"关键词时，请按照格式输出函数调用指令，格式如下：
   CALL get_current_weather(location="<城市名称>")
2. 当用户提问包含"时间"关键词时，请按照格式输出函数调用指令，格式如下：
   CALL get_current_time()
3. 如果用户的问题不涉及"天气"或"时间"，请直接给出答案，不要输出任何函数调用指令。

请根据以下用户输入返回结果：
用户输入：{user_input}
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # 或其他支持的模型
        messages=[
            {"role": "system", "content": "你是一个智能助手，根据规则输出相应格式。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content.strip()

if __name__ == '__main__':
    user_query = input("请输入查询内容: ")
    model_reply = prompt_engineered_function_call(user_query)
    print("模型回复:", model_reply)
    
    # 判断模型回复是否为函数调用指令
    if model_reply.startswith("CALL get_current_weather"):
        # 解析 location 参数
        match = re.search(r'location="(.+?)"', model_reply)
        if match:
            location = match.group(1)
            result = get_current_weather(location)
            print("调用函数结果:", result)
        else:
            print("无法解析函数调用参数。")
    elif model_reply.startswith("CALL get_current_time"):
        result = get_current_time()
        print("调用函数结果:", result)
    else:
        print("直接回答:", model_reply)
```

#### function calling

function calling 是 OpenAI 推出的一个功能，允许开发者将大模型的输出结果作为函数调用，并执行函数。一定程度上简化了代码。

```python showLineNumbers
import openai
import json

# 请设置你的 OpenAI API Key
openai.api_key = "YOUR_API_KEY"

# 定义实际业务函数：获取天气信息
def get_current_weather(location):
    # 模拟获取天气信息的逻辑
    return f"{location}的当前天气是晴朗。"

# 定义大模型可调用的函数描述（Function Schema）
functions = [
    {
        "name": "get_current_weather",
        "description": "获取指定城市的天气",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "城市名称"}
            },
            "required": ["location"]
        }
    }
]

def large_model_integration(user_input):
    """
    模拟大模型处理用户输入，
    若识别到需要调用天气查询函数，则使用函数调用功能。
    """
    # 调用大模型接口，启用函数调用
    response = openai.ChatCompletion.create(
        model="gpt-4-0613",  # 模型支持函数调用
        messages=[{"role": "user", "content": user_input}],
        functions=functions,
        function_call="auto"  # 模型自动决定是否调用函数
    )

    message = response["choices"][0]["message"]

    # 判断是否触发了函数调用
    if message.get("function_call"):
        func_name = message["function_call"]["name"]
        arguments = message["function_call"]["arguments"]

        # 解析函数参数
        args = json.loads(arguments)

        # 根据函数名称调用对应的函数
        if func_name == "get_current_weather":
            result = get_current_weather(**args)
            return f"大模型调用函数 {func_name} 得到结果: {result}"
        else:
            return "大模型触发未知函数调用。"
    else:
        # 如果大模型没有调用函数，则直接返回回答
        return message.get("content", "大模型未生成有效回复。")

if __name__ == '__main__':
    user_query = input("请输入查询内容: ")
    result = large_model_integration(user_query)
    print(result)

```

#### Mcp

MCP 是 工具调用的一种新范式，是传统API接口加上适合AI阅读的描述。提供让AI可以更方便地调用工具的方式。



### 智能体流程架构类型分析

![alt text](https://langchain-ai.github.io/langgraph/concepts/img/multi_agent/architectures.png)

参考文章：https://langchain-ai.github.io/langgraph/concepts/multi_agent/

### 多智能体LLM系统失效原因

专门微调一个验证规则代理。拥有图片识别能力，浏览器操作能力

以下表格总结了多智能体系统失效分类体系（MASFT）及其失效模式的发生频率：

| 失效类别           | 发生频率 (%) | 失效模式             | 发生频率 (%) |
| ------------------ | ------------ | -------------------- | ------------ |
| 规范与系统设计失效 | 37.2         | 违背任务规范         | 15.2         |
|                    |              | 违背角色规范         | 5.5          |
|                    |              | 步骤重复             | 7.59         |
|                    |              | 对话历史丢失         | 1.57         |
|                    |              | 未意识到终止条件     | 6.54         |
| 智能体间对齐失效   | 31.4         | 对话重置             | 2.09         |
|                    |              | 未能寻求澄清         | 6.02         |
|                    |              | 任务偏离             | 5.5          |
|                    |              | 信息隐瞒             | 9.16         |
|                    |              | 忽略其他智能体的输入 | 8.64         |
|                    |              | 推理-行动不匹配      | 2.36         |
| 任务验证与终止失效 | 31.4         | 过早终止             | 13.61        |
|                    |              | 无或不完全验证       | 4.71         |
|                    |              | 验证不正确           | 13.09        |


参考文章： https://www.aimodels.fyi/papers/arxiv/why-do-multi-agent-llm-systems-fail

## 框架分析

langchain

langgraph、langgraph-swarm

AutoGen

MG

## 案例分析

### 构建能主动提问的智能体

常用于医疗咨询、商城导购、智能客服等场景。

### 构建Human-in-the-loop的智能体

常用于需要人工介入的场景，例如：购买商品需要人工确认、需要人工介入的复杂任务。

### 构建多智能体协作的智能体

常用于需要多个智能体协作的场景，例如：狼人杀、三国杀、斯坦福小镇等桌面游戏。

