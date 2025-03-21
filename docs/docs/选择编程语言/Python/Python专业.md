---
sidebar_position: 6
title: Python专业
---

## Python 调用 C

Python 的底层是 C 写的（实际上大部分高级编程语言都是 C 写的）因此Python可以调用以下C/C++文件类型：
- C源代码文件（.c）
- C++源代码文件（.cpp、.cxx、.cc）
- 编译后的共享库（Linux/Unix的.so、Windows的.dll、macOS的.dylib）
- 编译后的静态库（Linux/Unix的.a、Windows的.lib）

因此互相调用的逻辑主要是：数据类型转换、编译库的链接、接收返回值。


### 在 Python 中调用 C（原生的 Python.h）

python+c/c++混合编程如：

> 原生的 Python.h

> cython

> pybind11：pytorch 也采用该方法

> ctypes、cffi、SWIG、Boost.Pytho 等

但不论是哪个方法，大致的流程都是：转换数据类型->编译代码->生成编译后的文件（.pyd .pyc .pyo .so .dll 等）

```bash showLineNumbers
冷知识：

python的import不止能导入.py后缀结尾的文件

pyc是由py文件经过编译后生成的二进制文件，py文件变成pyc文件后，加载的速度有所提高，并且可以实现源码隐藏。

pyo是优化编译后的程序，也可以提高加载速度，针对嵌入式系统，把需要的模块编译成pyo文件可以减少容量。

.so和.dll分别是Linux和window的动态库

这些都可以被import导入，所以我们只需要编译C代码，然后import导入即可。

```

### 环境设置

- 首先我们找到 python 的安装路径，通过文件搜索找到 Python.h 的文件夹路径
- 【设我的 Python 路径为 C:\Python】
- 那么 Python.h 的文件位置就是：C:\Python\include 简称 H 路径
- python310_d.lib 的位置就是：C:\Python\libs 简称 L 路径
- 接着右击【项目】，点击属性

- 最后在上方选择所有配置、所有平台。点击 VC++目录，选择包含目录最右边的下拉三角，输入刚刚复制的**H 路径**即可

- 接着再来载入 python310_d.lib 库，打开 L 路径查看里面有无 python310_d.lib 这个文件，【注意，310 是 python 版本号，不同版本对应不同文件名】如果没有，则复制 python310.lib，然后重命名。
- 还是打开刚刚的属性，依次设置。
- 库目录填【文件夹路径】

- 附加依赖项填【文件路径】

### 代码编写

- 新建一个文件名，根据官方文档的说法，以 C 语言为例，如果一个模块叫 spam，则对应实现它的文件名叫 spammodule.c；如果这个模块名字非常长，比如 spammify，则这个模块的文件可以直接叫 spammify.c

这里我调整了一下官方文档给的示例，添加了一些注释。让新手更易读。

当然原生的方法总是最底层但是最麻烦的方法，如果使用诸如 Python 中的 ctypes 模块则流程会简化。此处可以查阅相关文档。

```c showLineNumbers
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


## Visual Studio Code 和 Visual Studio 的调试

### Visual Studio Code

先看我们熟悉的 Visual Studio Code ，以下简称 VScode

点击“行号”前的位置，就可以给代码行打上红色的“断点”。

```python showLineNumbers
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

接着点击刚刚的调试按钮，点击运行和调试，接着根据你的文件类型选择，譬如 py 文件就选择 Python File. 然后可以看到代码上方有 6 个按钮。他们分别是：

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

### Visual Studio

都是微软开发的软件，大同小异。

```c showLineNumbers
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

我们先在红色区域（数字 1）打上断点

再在绿色区域（数字 2）点击调试

最后蓝色区域找到这个 6 个按钮

前面 2 个分别是 stop（停止）和 Restart（重启）

后面的 1、2、3、4 则依次对应着：continue（继续）、step over（单步跳过）、step into（单步调试/单步执行）和 step out（单步跳出）

## Python 发布包

截至2024年10月,有了非常多成熟的包管理工具,如 poetry、rye等工具，我相信未来还会有更多更好用的一站式包管理工具出现。

### 目录结构

```bash showLineNumbers
your_project/
├── .github/（可选）
│  └── workflows/（可选）
│      └── python-publish.yml（可选）
│
├── your_package/（包名）
│   ├── __init__.py
│   └── module.py
│
├── tests/（可选）
│   └── test_module.py
│
├── README.md（可选）
├── LICENSE（可选）
└── pyproject.toml
```
### pyproject.toml 示例

```showLineNumbers title="pyproject.toml"
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "exboard"
version = "1.0.12"
authors = [
  { name="Allen", email="jiangyangcreate@gmail.com" },
]
description = "A exboard package for AIBOX"
readme = "README.md"
requires-python = ">=3.6"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: Apache Software License",
    "Operating System :: OS Independent",
]
dependencies = [
    "schedule>=1.1.0",
]

[project.urls]
Homepage = "https://github.com/jiangyangcreate/exboard"
Issues = "https://github.com/jiangyangcreate/exboard/issues"
```

其中：dependencies 是依赖的包，在这里添加你需要的依赖包之后，安装此包时会自动安装这些依赖包。


### 打包发布

如果我们需要包被全世界的同好通过 pip install 直接安装的话，需要将包上传到 pypi 网站。首先注册 pypi，获得用户名和密码。

安装了 build 工具：

`pip install --upgrade build`

然后，在项目根目录下运行以下命令来创建分发文件：

`python -m build`

该命令将在 dist/ 目录下生成 .tar.gz 和 .whl 文件。

Twine 是一个用于上传 Python 包到 PyPI 的工具。安装 Twine：

`pip install --upgrade twine`

上传所有包

`twine upload dist/*`

如果嫌每次输入用户名和密码麻烦可以配置到文件中。

编辑用户目录下的 .pypirc 文件，输入

```bash showLineNumbers
[pypi]
username=your_username
password=your_password
```

### 通过git自动发布

```yaml showLineNumbers title=".github\workflows\python-publish.yml"
name: Upload Python Package

on:
  release:
    types: [published]

permissions:
  contents: read

jobs:
  deploy:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.x'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build
    - name: Build package
      run: python -m build
    - name: Publish package
      uses: pypa/gh-action-pypi-publish@27b31702a0e7fc50959f5ad993c78deac1bdfc29
      with:
        user: __token__
        password: ${{ secrets.PYPI_API_TOKEN }}
```

这个过程需要我们在pypi中获取密钥，然后在github的项目设置中添加。

在pypi中获取密钥:

```
访问：https://pypi.org/manage/account/token/

选择ADD API tokens

名称可以随便填，勾选你需要授权的权限，然后创建

```


在github的项目设置中添加:

```bash showLineNumbers
Settings -> Secrets and variables-> Actions -> New repository secret

Name: PYPI_API_TOKEN
Value: 刚刚复制的密钥
```

这样当我们在github上**创建release**时，会自动将包上传到pypi。注意不是push代码自动上传。

### 封装程序为可执行文件

官方文档：[https://www.pyinstaller.org/](https://www.pyinstaller.org/)

命令行：

```bash showLineNumbers
# 直接封装
pyinstaller -F app.py
# 指定图标
pyinstaller -F -i app.ico app.py
# 指定图标 不展示终端框
pyinstaller -F -i app.ico app.py --noconsole
# 将数据文件添加到捆绑包中，中间使用分号分隔，前面是源目录地址，后面是目的目录地址
pyinstaller -F -i app.ico app.py --add-data="C:\mediapipe\modules;mediapipe/modules" --noconsole
```

## Python 虚拟环境

使用虚拟环境可以帮助你隔离项目依赖，从而避免不同项目之间的冲突。

### 1. 创建虚拟环境

在你想创建虚拟环境的项目目录下运行以下命令：

```bash
python3 -m venv myenv
```

这里的 `myenv` 是虚拟环境的名称，你可以随意替换成你喜欢的名字。

### 2. 进入虚拟环境

在虚拟环境创建成功后，需要激活虚拟环境。不同操作系统激活方式不同：

- **在 Windows 上：**

  ```bash
  myenv\Scripts\activate
  ```

- **在 macOS 和 Linux 上：**

  ```bash
  source myenv/bin/activate
  ```

激活成功后，你会看到命令提示符前面出现了虚拟环境的名称，例如 `(myenv)`。

### 3. 查看虚拟环境

你可以使用 `pip list` 或 `pip freeze` 命令来查看虚拟环境中已安装的包。

```bash
pip list
```

或者

```bash
pip freeze
```

### 4. 在虚拟环境中安装和运行代码

激活虚拟环境后，你可以使用 `pip` 安装所需的依赖包。例如，安装 `requests` 包：

```bash
pip install requests
```

然后你就可以运行你的 Python 代码了。比如你有一个 `script.py` 文件，可以使用以下命令运行：

```bash
python script.py
```

### 5. 退出虚拟环境

当你完成工作后，可以退出虚拟环境，回到全局环境。使用以下命令：

```bash
deactivate
```