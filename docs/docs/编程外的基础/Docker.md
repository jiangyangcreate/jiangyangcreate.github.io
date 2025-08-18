---
sidebar_position: 6
title: Docker
---

软件开发者已经意识到，希望开箱即用，不配置环境的人占大多数，因此提供容器分发已经成为主流。

容器可以理解为轻量的虚拟机，是为组织设置软件基础架构的最流行的方法。Docker是最易于使用的工具之一，是容器技术的代名词。<Highlight>默认容器与Docker等同。</Highlight>

## 安装

在[个人电脑上安装](https://www.docker.com/get-started/)`Docker Desktop`可以用图形化的方式操作容器，方便管理容器、镜像、卷和网络。这比单纯使用命令行更直观。

:::info
如果你的电脑没有显示器或者是云服务器，那么还是[安装](https://docs.docker.com/engine/install/)`Docker`引擎吧。
:::

不论你通过哪种方式安装，都可以通过在终端输入：`docker`来检查是否安装成功。

## 快速上手

确认安装好后，可以通过云端和本地文件2种方式获取镜像。

```bash showLineNumbers
# 从云端（Docker Hub）拉取名为 jiangmiemie/llmchat:0.0.2 的镜像
docker pull jiangmiemie/llmchat:0.0.2

# 从本地文件加载名为 llmchat 的镜像
docker load < llmchat.tar.gz
# 也可以写为：
# docker load -i llmchat.tar.gz
```

获取镜像后常用操作：
```bash showLineNumbers
# 启动容器，参考开发者提供的命令
# 表示把容器内的8501端口映射到宿主机的80端口，-d表示后台运行，-p表示端口映射
docker run -d -p 80:8501 jiangmiemie/llmchat:0.0.2

# 查看所有容器
docker ps -a

# 停止容器
docker stop {container_id}

# 删除容器
docker rm {container_id}
```

:::tip
如果你仅仅是想使用，那么可以跳过以下关于如何构建镜像的内容或未来你需要亲手维护服务的时候再回来学习。
:::

## 基本命令

[Docker 命令参考](https://docs.docker.com/reference/)

```bash showLineNumbers
# 构建镜像
docker build -t llmchat:0.0.2 .

# 打标签
docker tag llmchat:0.0.2 jiangmiemie/llmchat:0.0.2

# 登录
docker login

# 推送镜像到云端
docker push jiangmiemie/llmchat:0.0.2

# 导出镜像为文件
docker save nginx:latest > nginx_latest.tar
# 也可以写为：docker save nginx:latest -o nginx_latest.tar

# 如果文件较大，可压缩导出
docker save nginx:latest | gzip > nginx_latest.tar.gz
```

### Dockerfile

容器的开始始于 `Dockerfile`，build 一个镜像的时候，例如`docker build -t llmchat:0.0.2 .`，其中末尾的`.`表示当前文件夹，他会在当前文件夹寻找`Dockerfile`文件。

[Dockerfile 参考](https://docs.docker.com/reference/dockerfile/)

该文件如下关键字必不可少：

```yaml showLineNumbers title="Dockerfile"
# 设置基础镜像
FROM python:3.12.8

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖(可以在任意位置执行多个RUN命令)shell 写法
RUN pip install -r requirements.txt

# 或者使用exec 形式，此种写法不支持管道、通配符或变量等 shell 特性，可以避免注入风险：
RUN ["pip", "install", "-r", "requirements.txt"]

# 启动服务
CMD ["python", "chat_routers.py"]
```

#### FROM

FROM 指定基础镜像
所谓定制镜像，那一定是以一个镜像为基础，在其上进行定制。就像我们之前运行了一个 nginx 镜像的容器，再进行修改一样，基础镜像是必须指定的。而 FROM 就是指定基础镜像，因此一个 Dockerfile 中 FROM 是必备的指令，并且必须是第一条指令。

在 [Docker Hub](https://hub.docker.com/explore/) 上有非常多的高质量的官方镜像， 有可以直接拿来使用的服务类的镜像，如 nginx、redis、mongo、mysql、httpd、php、tomcat 等； 也有一些方便开发、构建、运行各种语言应用的镜像，如 node、openjdk、python、ruby、golang 等。 可以在其中寻找一个最符合我们最终目标的镜像为基础镜像进行定制。 如果没有找到对应服务的镜像，官方镜像中还提供了一些更为基础的操作系统镜像，如 ubuntu、debian、centos、fedora、alpine 等，这些操作系统的软件库为我们提供了更广阔的扩展空间。

除了选择现有镜像为基础镜像外，Docker 还存在一个特殊的镜像，名为 scratch。这个镜像是虚拟的概念，并不实际存在，它表示一个空白的镜像。

FROM scratch

如果你以 scratch 为基础镜像的话，意味着你不以任何镜像为基础，接下来所写的指令将作为镜像第一层开始存在。

不以任何系统为基础，直接将可执行文件复制进镜像的做法并不罕见，比如 swarm、coreos/etcd。对于 Linux 下静态编译的程序来说，并不需要有操作系统提供运行时支持，所需的一切库都已经在可执行文件里了，因此直接 FROM scratch 会让镜像体积更加小巧。使用 Go 语言 开发的应用很多会使用这种方式来制作镜像，这也是为什么有人认为 Go 是特别适合容器微服务架构的语言的原因之一。

#### WORKDIR

切换到镜像中的指定路径，设置工作目录
在 WORKDIR 中需要使用绝对路径，如果镜像中对应的路径不存在，会自动创建此目录
一般用 WORKDIR 来替代 RUN cd `<path>` && `<do something>` 切换目录进行操作的指令
WORKDIR 指令为 Dockerfile 中跟随它的任何 RUN、CMD、ENTRYPOINT、COPY、ADD 指令设置工作目录
如果 WORKDIR 不存在，即使它没有在任何后续 Dockerfile 指令中使用，它也会被创建

#### ADD & COPY

**ADD 指令**：用于将本地文件系统或远程 URL 资源添加到容器镜像中(下载后的文件权限自动设置为 600)，如果 **源路径** 为一个 tar 压缩文件的话，压缩格式为 gzip, bzip2 以及 xz 的情况下，ADD 指令将会自动解压缩这个压缩文件到 **目标路径** 去。

**COPY 指令**：专门用于从构建上下文（build context）中复制文件或目录到容器镜像的指定路径。

#### ENTRYPOINT & RUN & CMD

**RUN 指令**：在镜像构建阶段执行命令，用于安装软件包、创建目录、设置环境等构建时操作。每个 RUN 指令会创建新的镜像层。

**CMD 指令**：定义容器启动时的默认执行命令和参数。可以被 `docker run` 命令行参数完全覆盖。

**ENTRYPOINT 指令**：定义容器启动时的固定入口点。与 CMD 的主要区别在于：

1. **执行优先级**：ENTRYPOINT 具有更高的执行优先级，不会被 `docker run` 的命令行参数覆盖
2. **参数传递**：`docker run` 的参数会作为 ENTRYPOINT 的参数传入
3. **覆盖方式**：需要使用 `--entrypoint` 参数才能在运行时替换

:::tip
**ENTRYPOINT + CMD 组合模式**：
- ENTRYPOINT 定义固定的执行程序
- CMD 提供默认参数
- 运行时参数会替换 CMD 的默认值

```dockerfile
ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8080"]
```
:::


### run

`docker run`有超过100个参数，<Highlight>可以覆盖`Dockerfile`中的`CMD`指令</Highlight>，你需要记住常见的几个：

#### **`-d`** (或 `--detach`)：**后台运行**

让容器在后台运行，并打印出容器ID。这对于需要持续运行的服务（如Web服务器、数据库）非常有用。

```bash
# docker run -d {镜像名}
docker run -d nginx
```


#### **`-p`** (或 `--publish`)：**端口映射**

将宿主机的端口映射到容器内部的端口，以便从外部访问容器内的服务。

<Highlight>命令也可以组合使用</Highlight>

```bash
# docker run -p [宿主机端口]:[容器内部端口] {镜像名}
# 将宿主机的 8080 端口映射到容器内的 80 端口
docker run -d -p 8080:80 nginx
```


#### **`-it`**：**交互式终端**

这是两个参数的组合，通常一起使用。`-i` 保持标准输入开放，`-t` 分配一个伪终端。这让你能够进入容器内部进行交互式操作，例如执行 Shell 命令。

```bash
# docker run -it {镜像名} {命令}
# 运行一个 Ubuntu 容器并进入其 bash 终端
docker run -it ubuntu bash
```

#### **`--name`**：**指定容器名称**

给容器一个易于记忆的名称，而不是一个随机生成的ID。这在后续操作（如 `docker stop`, `docker start`）时非常方便。

```bash
# docker run --name {容器名} {镜像名}
docker run -d --name my-nginx-server nginx
```


#### **`-v`** (或 `--volume`)：**挂载卷**

将宿主机的目录或文件挂载到容器内部，实现数据持久化或共享。

```bash
# docker run -v [宿主机路径]:[容器内部路径] {镜像名}
# 将宿主机的 /app/data 目录挂载到容器内的 /data 目录
docker run -d -v /app/data:/data postgres
```


#### **`--rm`**：**退出时自动删除容器**

当容器停止时，自动删除它。这对于一次性任务、测试或临时运行的容器非常有用，可以保持你的系统整洁。

```bash
# docker run --rm {镜像名} {命令}
# 运行一个临时容器，执行命令后自动删除
docker run --rm busybox echo "Hello, Docker!"
```

#### **`-e`** (或 `--env`)：**设置环境变量**在容器内部设置环境变量，这对于配置应用程序非常重要。

```bash
# docker run -e [环境变量键]=[值] {镜像名}
docker run -d -e POSTGRES_PASSWORD=mysecretpassword postgres
```

### 其他命令

拷贝文件至 image(类似 git 里的 add 暂存)

```bash
docker cp {path} {id}{id_path}

示例：
docker cp C:/Users/SY/Desktop/docktest/index.html {id}://usr/share/nginx/html
```

保存(类似 git 里的 commit)

```bash
Docker commit -m 'fun' {id} 'name'

示例：
Docker commit(固定语法) -m（主分支） 'fun'（注释） 'name'(image的名字)
```

删除多余的 image

```bash
Docker rmi {id}
Docker rmi（删除）
```

可以通过如下命令进入到容器内部的命令窗口：

```bash
docker ps -a
# 查看所有容器id

docker exec -it  【容器的id】/bin/bash
# 根据id选择容器进入容器内部命令窗口

pip install pandas
python -m unittest test.test_spider.MyTestCase.test_spider
# 接着像平常一样输入命令代码即可，上方两句代码只是举例。
```

更多命令可以查看以下链接:
[https://www.runoob.com/docker/docker-tutorial.html](https://www.runoob.com/docker/docker-tutorial.html)


## docker-compose

docker-compose 是一个用于定义和运行多容器 Docker 应用程序的工具。它通过一个 YAML 文件来配置应用程序的服务、网络和卷，并使用一个命令来启动、停止和重新启动这些服务。当你需要启动多个容器时，docker-compose 可以简化这个过程。

### 目录结构

```bash showLineNumbers
├── backend
│   ├── Dockerfile
│   ├── .env
│   ├── .dockerignore
│   ├── chat_routers.py
│   └── requirements.txt
├── frontend
│   ├── Dockerfile
│   ├── requirements.txt
│   └── _streamlit
│       └── streamlit_app.py
├── docker-compose.yml
└── README.md
```

### 文件示例

```yaml showLineNumbers
version: "3.8" # 指定 Docker Compose 文件的版本

services: # 定义服务
  python-app-frontend: # 新增的 Python 应用服务
    build: # 使用 Dockerfile 构建镜像
      context: ./frontend # 前端上下文目录
      dockerfile: Dockerfile # Dockerfile 文件
    image: jiangmiemie/llmchatf:0.1.0
    ports:
      - "8501:8501" # 映射 Streamlit 默认端口
    command: ["streamlit", "run", "_streamlit/streamlit_app.py"] # 启动命令
    depends_on:
      - python-app-backend

  python-app-backend: # 新增的后端服务
    build: # 使用 Dockerfile 构建镜像
      context: ./backend # 后端上下文目录
      dockerfile: Dockerfile # 后端 Dockerfile 文件
    image: jiangmiemie/llmchatb:0.1.0
    ports:
      - "8010:8010" # 映射后端服务端口
    command: ["python", "chat_routers.py"] # 启动后端服务的命令
    volumes:
      - ./backend/.env:/app/.env:ro # 添加 .env 文件挂载，ro表示只读
```

### 启动说明

1. 首先确保你在包含 `docker-compose.yml` 文件的目录下，然后执行以下命令来构建和启动服务：

```bash showLineNumbers
# 构建并启动所有服务（后台运行）
docker-compose up -d

# 如果需要查看日志
docker-compose logs -f
```

2. 或者如果你想在前台运行并直接看到日志：

```bash
# 构建并启动所有服务（前台运行）
docker-compose up
```

3. 其他常用命令：

```bash
# 停止所有服务
docker-compose down

# 重新构建并启动（当 Dockerfile 发生变化时）
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看特定服务的日志
docker-compose logs -f python-app-frontend
docker-compose logs -f python-app-backend
```

如果遇到问题：

1. 确保 Docker 和 Docker Compose 已经正确安装
2. 检查端口是否被占用
3. 查看容器日志排查问题：`docker-compose logs -f`


4. 如果需要重置环境：

```bash
# 停止并删除所有容器、网络
docker-compose down

# 如果还需要删除构建的镜像
docker-compose down --rmi all
```

记住，任何修改 Dockerfile 或代码后，都需要重新构建镜像：

```bash
docker-compose up -d --build
```

### 构建与推送

```bash showLineNumbers
# 构建镜像
docker-compose build

# 推送所有镜像到仓库
docker-compose push
```

### 拉取和运行多个容器

目录结构

```bash showLineNumbers
├── backend
│   ├── .env
├── docker-compose.yml
```

1. 在目标环境创建 docker-compose.yml:

```yaml:docker-compose.yml
version: '3.8'
services:
  python-app-frontend:
    image: jiangmiemie/llmchatf:0.1.0
    ports:
      - "8501:8501"

  python-app-backend:
    image: jiangmiemie/llmchatb:0.1.0
    ports:
      - "8010:8010"
    volumes:
      - ./backend/.env:/app/.env:ro
```

2. 拉取和运行:

```bash
# 拉取所有镜像
docker-compose pull

# 启动所有服务
docker-compose up -d
```


## k8s

[Kubernetes](https://kubernetes.io/) 是一个开源的容器编排引擎，用来对容器化应用进行自动化部署、 扩缩和管理。在容器编排市场中占据了主导地位。

Docker 负责制造一辆辆轻便的汽车，而 Kubernetes 则是一个复杂的交通管理系统，确保这些汽车能高效、有序地运行在道路上。

对容器编排感兴趣的可以前往官网深入学习。

