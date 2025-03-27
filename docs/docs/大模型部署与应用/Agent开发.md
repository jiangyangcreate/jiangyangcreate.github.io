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

| 开发方式 | 代表产品/框架 | 优点 | 缺点 |
|----------|--------------|------|------|
| 低代码/无代码开发 | Coze | • 简单易用 | • 功能有限• 收费昂贵• 云端执行非自主（必须联网）• 不可控• 不同平台差异大，不易迁移• 插件大多需要独立的Token• 平台可用的大模型有限 |
| 框架开发 | LangChain、AutoGen、MG等 | • 功能强大• 可以满足复杂需求• 代码可以灵活复用 | • 需要一定的技术门槛 |

## Agent 开发与变化趋势

### 规则时代
```bash showLineNumbers
# 规则化的自然语言，一切基于有穷的规则（正则表达式关键词识别）。
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

## 大模型调用工具

大模型本身不具备执行能力，需要调用工具。其本质都是将工具封装后传入大模型上下文，然后大模型返回需要调用的工具的名称与参数。再由系统执行。

### 提示词工程

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

### function calling

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

### Mcp


## 智能体流程编排

![alt text](https://langchain-ai.github.io/langgraph/concepts/img/multi_agent/architectures.png)

参考文章：https://langchain-ai.github.io/langgraph/concepts/multi_agent/