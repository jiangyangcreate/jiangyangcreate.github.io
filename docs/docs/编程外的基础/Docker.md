---
sidebar_position: 6
title: Docker
---

目前大部分的软件开发者已经意识到，不懂环境配置与希望开箱即用的人占大多数，因此开源社区提供容器分发已经成为主流。

容器可以理解为轻量的虚拟机，是为组织设置软件基础架构的最流行的方法。Docker是最易于使用的工具之一。通常默认提到容器即特指Docker。

## 安装

在[个人电脑上安装](https://www.docker.com/get-started/)`Docker Desktop`可以以图形化的方式操作容器，方便你管理容器、镜像、卷和网络。这比单纯使用命令行更直观。

:::info
如果你的电脑没有显示器或者是云服务器，那么还是[安装](https://docs.docker.com/engine/install/)`Docker`引擎吧。
:::

不论你通过哪种方式安装，都可以通过在终端输入：`docker`来检查是否安装成功。

确认安装好后，可以通过云端和本地文件2种方式获取镜像并运行，下面云端镜像以`jiangmiemie/llmchat:0.0.2`为例，本地镜像以`nginx_latest`为例。

```bash showLineNumbers
# 从云端拉取镜像
docker pull jiangmiemie/llmchat:0.0.2

# 有时直接从 Docker Hub 使用 `docker pull` 拉取镜像存在网络限制，可以从本地文件加载镜像
docker load < nginx_latest.tar.gz
# 也可以写为：docker load -i nginx_latest.tar.gz

# 启动
docker run -d -p 8501:8501 jiangmiemie/llmchat:0.0.2

# 查看
docker ps -a

# 停止
docker stop {container_id}

# 删除
docker rm {container_id}
```

## 基本命令

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

### build

build 一个镜像的时候，例如`docker build -t llmchat:0.0.2 .`，其中末尾的`.`表示当前文件夹，他会在当前文件夹寻找`Dockerfile`文件。

该文件如下关键字必不可少：

```yaml showLineNumbers title="Dockerfile"
# 设置基础镜像
FROM python:3.12.8

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖(可以在任意位置执行多个RUN命令)
RUN pip install -r requirements.txt

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

#### ADD & COPY

ADD 指令和 COPY 的格式和性质基本一致。但是在 COPY 基础上增加了一些功能。

比如 **源路径** 可以是一个 URL，这种情况下，Docker 引擎会试图去下载这个链接的文件放到 **目标路径** 去。下载后的文件权限自动设置为 600，如果这并不是想要的权限，那么还需要增加额外的一层 RUN 进行权限调整，另外，如果下载的是个压缩包，需要解压缩，也一样还需要额外的一层 RUN 指令进行解压缩。所以不如直接使用 RUN 指令，然后使用 wget 或者 curl 工具下载，处理权限、解压缩、然后清理无用文件更合理。因此，这个功能其实并不实用，而且不推荐使用。

如果 **源路径** 为一个 tar 压缩文件的话，压缩格式为 gzip, bzip2 以及 xz 的情况下，ADD 指令将会自动解压缩这个压缩文件到 **目标路径** 去。

#### ENTRYPOINT & RUN

ENTRYPOINT 的格式和 RUN 指令格式一样，分为 exec 格式和 shell 格式。

ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数。ENTRYPOINT 在运行时也可以替代，不过比 CMD 要略显繁琐，需要通过 docker run 的参数 --entrypoint 来指定。

#### WORKDIR

切换到镜像中的指定路径，设置工作目录
在 WORKDIR 中需要使用绝对路径，如果镜像中对应的路径不存在，会自动创建此目录
一般用 WORKDIR 来替代 RUN cd `<path>` && `<do something>` 切换目录进行操作的指令
WORKDIR 指令为 Dockerfile 中跟随它的任何 RUN、CMD、ENTRYPOINT、COPY、ADD 指令设置工作目录
如果 WORKDIR 不存在，即使它没有在任何后续 Dockerfile 指令中使用，它也会被创建

### run

`docker run`有超过100个参数，但你只需要记住常见的几个即可：

#### **`-d`** (或 `--detach`)：**后台运行**

让容器在后台运行，并打印出容器ID。这对于需要持续运行的服务（如Web服务器、数据库）非常有用。

```bash
# docker run -d {镜像名}
docker run -d nginx
```


#### **`-p`** (或 `--publish`)：**端口映射**

将宿主机的端口映射到容器内部的端口，以便从外部访问容器内的服务。

<Highlight>命令也可以组合使用</Highlight>，例如：

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

如果是在自己的电脑上操作，可以在 vscode 内下载 docker 插件，即可查看对应容器状态。选中容器可以右键进行：删除、启动、停止等操作。也可以在 Docker 可视化界面进行操作。

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

### 补充说明

1. 如果使用私有仓库,需要先登录:

```bash
docker login your-registry
```

2. 可以使用环境变量控制版本:

```yaml:docker-compose.yml
services:
  frontend:
    image: your-registry/frontend:${TAG:-latest}
```

3. 可以只操作特定服务:

```bash
# 只推送前端
docker-compose push frontend

# 只拉取后端
docker-compose pull backend
```

## 实战案例：群晖服务器搭建

首先确保自己对每个环节的设备都拥有绝对控制权，在常见的家庭网络环节下，

网络从运营商总部接入小区/园区的控制中心，由控制中心完成基本过滤
用户通过光猫完成光电转换，完成与互联网的信息交换
用户通过路由器链接光猫，完成内网与外网的信息交换
用户通过交换机链接路由器，完成内网设备间的信息交换（中型公司会有）
用户将购买的服务器连接到交换机/路由器，最后一步信息交换

你可能会遇到如下问题：

1.你所居住的小区/园区存在网络控制中心，限制家庭宽带的使用，例如我园区的网络控制中心：限制端口，限制设备数量，限制设备类。可以通过打电话沟通与钞能力解决。

2.运营商提供的设备，例如：光猫，路由器，存在限制，例如我司的光猫仅开启上网功能，不允许端口对外开放，不允许端口映射。可以通过打电话沟通与钞能力解决。

3.路由器、服务器不提供端口映射、仅暴露指定端口。我用的是华为+群晖，总价 4K。

那么如果你的服务比较复杂，譬如我司曾经采购一个很古老的系统，我不负责迭代它，但需要维护他，那么打包成一个容器很显然是个不错的主意。

由于群晖有很多版本，路由器也有很多版本，我这里只是提供一个思路，不保证一定能成功。

### 群晖

在群晖套件中心找到 Container Manager

下载宝塔镜像 btpanel-baota

映射端口前请确认端口没有在使用，可以通过群晖官网查询

推荐端口号在 4000-5000 之间，因为这个端的端口未被使用。

映射需要用到的端口与需要挂载的文件夹

关于映射：如果你把宝塔的登录端口 8888 映射为群晖服务器的 4444，那么此时你就可以通过群晖的 4444 端口访问宝塔了。

### 路由器

开启设备映射，将群晖设为固定的 IP 地址，将群晖的端口映射到路由器的端口。

如果你把群晖的 4444 端口映射为 80，并且把域名绑定到公网 IP 上时

那么当你访问这个域名会跳转到路由器 80 端口，再跳到群晖的 4444 端口，再跳到群晖宝塔容器的 8888 端口。



## 简易排错

这个容器好像卡死了，查一下。

### 观察并记录

接手后通过以下命令先观察下

```bash
# 查看资源占用
top

# 静态查看容器资源占用
docker stats --no-stream
# 动态查看容器资源占用
docker stats
```

CPU 资源占用升到了 280%，持续了 30 分钟，比较离谱。
内存占了 8 个 G，这个程序需要模拟诸多浏览器且要保持缓存以便通信，所以 8 个 G 也不算离谱。

> docker 显示的 cpu 占用是可以超 100%的，表示使用了多个核，200%表示用了 2 个核。合理的飙升：大数运算环节。异常的飙升：死循环、报错后日志不停歇的高速打印。

### 分析并思考

2 个可能： 1.因为 CPU 异常，所以可能是阻塞导致的，要查下阻塞的原因，因为代码里写了很多线程。 2.但是我等了 30 分钟，也可能是阻塞导致死锁了，这个可能性我觉得更大，内存一直被占着可以解释为死锁后资源无法释放，也合理。

> （1）阻塞是由于资源不足引起的排队等待现象。
> （2）死锁是由于两个对象在拥有一份资源的情况下申请另一份资源，而另一份资源恰好又是这两对象正持有的，导致两对象无法完成操作，且所持资源无法释放。

### 缩小范围

```bash
# 进入容器
docker exec -iter 【你的容器id】 /bin/bash
# 示例
docker exec -iter 6d711f6ee058 /bin/bash
# 检查日志文件
cd var/log
ls

# 退出容器
exit

# 复制日志
docker cp 容器id:文件路径 本机路径
```

## k8s

[Kubernetes](https://kubernetes.io/) 是一个开源的容器编排引擎，用来对容器化应用进行自动化部署、 扩缩和管理。对容器化感兴趣的可以前往官网深入学习。
