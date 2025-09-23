---
sidebar_position: 2
title: rclpy
---

rclpy模块，ROS 2  Python标准接口 （ROS 2 canonical API with Python）

官网：https://docs.ros.org/en/rolling/p/rclpy/index.html


## 入门体验

下面是一个标准的初始化代码`init`支持传入多种参数。

```python
import rclpy                                     # ROS2 Python接口库
from rclpy.node import Node                      # ROS2 节点类
import time

def main(args=None):                             # ROS2节点主入口main函数
    rclpy.init(args=args)                        # ROS2 Python接口初始化
    node = Node("node_helloworld")               # 创建ROS2节点对象并进行初始化
    
    while rclpy.ok():                            # ROS2系统是否正常运行
        node.get_logger().info("Hello World")    # ROS2日志输出
        time.sleep(0.5)                          # 休眠控制循环时间
    node.destroy_node()                          # 销毁节点对象   
    rclpy.shutdown()                             # 关闭ROS2 Python接口
```

### 初始化

`rclpy.init(*, args: List[str] | None = None, context: Context | None = None, domain_id: int | None = None, signal_handler_options: rpyutils.import_c_library.SignalHandlerOptions | None = None)→ InitContextManager`

直接初始化比上下文初始化拥有更多的参数。

Parameters:

- args – 命令行参数列表。
- context – 要初始化的上下文。如果为 None，则使用默认上下文。
- domain_id – ROS 域 ID。
- signal_handler_options – 指示要安装的信号处理程序。如果 None，则在初始化默认上下文时将安装 SIGINT 和 SIGTERM。【类似于 Python 的信号（signal）机制，是操作系统发出的异步事件。而非异常，异常是程序内部发生的同步事件。】

Returns:

- 一个 InitContextManager，可以与 Python 上下文管理器一起使用进行清理。

### 循环执行

ROS 2 中的 Executor（执行器）是用来管理和运行 ROS 2 节点中所有回调函数的核心组件。你可以把它看作是一个调度器，它决定了节点里的各种任务（例如接收新消息、处理服务请求、定时器触发）何时执行。

Executor 负责调度和执行节点中的回调函数。一个 ROS 2 节点可以有多个回调函数，比如：

- 订阅者的回调函数：每当收到一个新消息时被调用。

- 服务的请求回调函数：每当收到一个服务请求时被调用。

- 定时器的回调函数：每隔一定时间被调用。

节点本身并不会自动运行这些回调函数，它需要一个 Executor 来 "spin"（自旋），也就是不断地检查是否有就绪的任务并执行它们。ROS 2 将节点和执行器分开，提供了灵活性。你可以选择不同的 Executor 来适应你的应用需求：

- SingleThreadedExecutor：这是最简单的执行器，它在一个单独的线程里顺序执行所有就绪的回调函数。

- MultiThreadedExecutor：这个执行器使用一个线程池，可以同时执行多个回调函数，这对于需要高并发处理的节点非常有用。


`rclpy.spin(node: Node, executor: Executor | None = None)→ None`:执行工作，直到与执行器关联的上下文关闭。

- node – 要添加到执行器以检查工作的节点。
- 要使用的执行器，如果是 None，则为全局执行器。

`rclpy.spin_once(node: Node, *, executor: Executor | None = None, timeout_sec: float | None = None)→ None`:执行一项工作或等待超时到期。

只要该回调在超时到期之前准备就绪，提供的执行器就会执行一个回调。如果未提供执行器（即 None），则使用全局执行器。如果全局执行器具有部分完成的协程，则完成的工作可能是针对提供的节点以外的节点。

- node – 要添加到执行器以检查工作的节点。
- executor – 要使用的执行器，如果是 None，则为全局执行器。
- timeout_sec – 等待几秒钟。如果为 “无” 或“负数，则永久阻止”。如果为 0，请不要等待。


`rclpy.spin_until_future_complete(node: Node, future: Future[Any], executor: Executor | None = None, timeout_sec: float | None = None)→ None` : 执行工作，直到Future完成。

- node – 要添加到执行器以检查工作的节点。
- 要等待的 future 对象。直到 future.done（） 返回 True 或与执行器关联的上下文为 shutdown。
- 要使用的执行器，如果是 None，则为全局执行器。
- 等待几秒钟。如果为 None 或负数，则阻止直到未来完成。如果为 0，请不要等待。

### 关闭

`rclpy.shutdown(*, context: Context | None = None, uninstall_handlers: bool | None = None)→ None`

关闭以前初始化的上下文（如果尚未关闭）。这也将关闭全局执行器，如果已关闭会报错。

- context – 要失效的上下文。如果为 None，则使用默认上下文
- uninstall_handlers – 如果为 None，则在关闭默认上下文时将卸载信号处理程序。如果为 True，则将卸载信号处理程序。如果为 False，则不会卸载信号处理程序。和前面signal_handler_options对应上。

`rclpy.try_shutdown(*, context: Context | None = None, uninstall_handlers: bool | None = None)→ None`

关闭以前初始化的上下文（如果尚未关闭）。这也将关闭全局执行器，如果已关闭不会报错。

- context – 要失效的上下文。如果为 None，则使用默认上下文
- uninstall_handlers – 如果为 None，则在关闭默认上下文时将卸载信号处理程序。如果为 True，则将卸载信号处理程序。如果为 False，则不会卸载信号处理程序。和前面signal_handler_options对应上。


## 上下文


上下文管理器Context与直接使用rclpy基本一致，但背后其实是线程管理，每个独立的上下文管理器都是独立的线程。

如果使用`rclpy.init(args=args)`则无法完成创建2个不同的domian_id的节点。

```python
from rclpy.node import Node                      # ROS2 节点类
from rclpy.context import Context                # ROS2 上下文类
import time

def main(args=None):                             # ROS2节点主入口main函数
    # 使用Context上下文管理器的正确方式
    context = Context()
    context.init(args,domain_id=1)
    node = Node("node_helloworld", context=context)  # 创建节点并关联上下文

    context2 = Context()
    context2.init(args,domain_id=2)
    node2 = Node("node_helloworld", context=context2)  # 创建节点并关联上下文

    while context.ok() and context2.ok():                  # 检查上下文是否正常
        node.get_logger().info("{}".format(context.get_domain_id()))    # ROS2日志输出
        node2.get_logger().info("{}".format(context2.get_domain_id()))    # ROS2日志输出
        time.sleep(0.5)                  # 休眠控制循环时间
    context2.shutdown()
    context.shutdown()
```

使用上下文管理器Context 的`with`语法可以自动`init`（不支持参数），并在with语句结束时调用`shutdown`，代码更加简洁。

类似于Python的 `with open`与`close`。

```python
from rclpy.node import Node                      # ROS2 节点类
from rclpy.context import Context                # ROS2 上下文类
import time

def main(args=None):                             # ROS2节点主入口main函数
    # 使用Context上下文管理器的正确方式
    with Context() as context:
        node = Node("node_helloworld", context=context)  # 创建节点并关联上下文
        while context.ok():                  # 检查上下文是否正常
            # 输出当前的domain id ，默认是0
            # 修改domain id方式1 ：修改当前终端变量
            # export ROS_DOMAIN_ID=1
            node.get_logger().info("{}".format(context.get_domain_id())) 
            time.sleep(0.5)                  # 休眠控制循环时间
```
### 初始化

`context.init(args: List[str] | None = None, *, initialize_logging: bool = True, domain_id: int | None = None)→ None`

为给定上下文初始化 ROS 通信。

- args – 命令行参数列表。
- initialize_logging – 是否初始化整个过程的日志记录。默认值是初始化日志记录。
- domain_id – 要用于此上下文的域 ID。如果为无（默认值），则使用域 ID 0。

### 状态检察

`context.get_domain_id()→ int`：获取上下文的domain ID。

`context.ok()→ bool`：检查上下文是否未关闭。

### 跟踪

`track_node(node: Node)→ None`:跟踪与此上下文关联的节点。当上下文被销毁时，它将销毁它跟踪的每个节点。

`untrack_node(node: Node)→ None`:如果一个节点在上下文之前被销毁，我们不再需要跟踪它是否销毁了上下文，所以在此处将其删除。

### 关闭上下文

`context.shutdown()→ None`：关闭此上下文，会等待正在进行的操作完成，然后清理资源。好比执行系统关机，如果已关闭会报错。

`on_shutdown(callback: Callable[[], None])→ None`：添加关机时调用的回调。

`try_shutdown()→ None`:尝试关闭此上下文（如果尚未关闭）,如果已关闭也不会报错。

`context.destroy()→ None`：销毁上下文，立即释放资源，不等待正在进行的操作。好比直接断电。

## Node

接下来我们展开讲解Node.Node(节点)是 ROS 系统中用于通信的主要入口点。它可用于创建 ROS 实体，例如发布者、订阅者、服务等。

可以理解为是话题、服务、动作的共同父类。因此也是方法最多的一个部分。


## 通信模式
### Topics
### Services
### Actions
### Parameters


## 其他
### Execution and Callbacks
### Utilities 
### Time
### Timer
### Logging