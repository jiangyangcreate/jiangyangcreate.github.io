## 项目概览

欢迎来到这个基于[Docusaurus 3.10](https://docusaurus.io/)最新版本构建的定制站点。

我从[Docusaurus Site Showcase](https://docusaurus.io/showcase)中汲取了许多灵感，但我更倾向于简洁且精美的设计，以确保代码能够便于维护,同时使用markmap与mermaid制图，使得文本均可被选中，易于被网页翻译。

**设计理念：美丽优于丑陋，清晰优于模糊。简洁优于复杂，复杂优于繁琐。**

遵循这一理念，我打造了这个精巧、引人注目、不断更新维护的个人博客站点。

> 网站性能分析报告：[点此测试](https://pagespeed.web.dev/)

## 核心特性

- 生成式 AI 文章总结、对谈音频：本地运行 `make summary` 生成，以静态文件入库（`static/blog/summary/`），纯静态托管、无需后端。[访问 博客文本摘要](https://jiangmiemie.com/blog/2024/1/31/)

- 集成 Algolia 的ASK AI功能，本地技术文档与博客变动态RAG，如需配置可在`docusaurus.config.js`中搜索`Algolia`。

- 文档支持Copy as Markdown，让AI读懂你的文档，工作原理可以搜索`CopyMarkdownButton`。

- 内置多种文字高亮、集成 mermaid 、markmap、 KaTeX ，让数学公式和流程图的编辑更加便捷。[访问 markdown](https://jiangmiemie.com/docs/编程外的基础/Markdown/)

- 集成 React Photo Album，布局优雅，点击照片可放大并展示照片描述、拍摄地、照片尺寸等信息。[访问 照片墙](https://jiangmiemie.com/gallery/)

- 集成 infinum，轻松创建个人案例页，优雅展示个人作品。[访问 个案页](https://jiangmiemie.com/case/)

- RSS 订阅，支持博客的 RSS 订阅。[访问 RSS](https://jiangmiemie.com/blog/rss.xml)即可订阅。

- PWA (Progressive Web App)，让使用网页像使用原生应用一样，可在`docusaurus.config.js`中搜索`pwa`。

- 支持生成静态站点，托管至 GitHub Pages。[查看 workflows](.github/workflows/update.yml)

<details>
  <summary>点击以查看更多信息</summary>

- 集成 giscus，使用 GitHub 账号评论，还能一键分享至 twitter。[访问 博客页](https://jiangmiemie.com/blog/)

- Google Analytics，可查看网站访问情况，如需配置可在`docusaurus.config.js`中搜索`gtag`。

- 公告栏 (announcementBar)，允许在设置一个公告，如需配置可在`docusaurus.config.js`中搜索`announcementBar`。

- 自动明暗模式切换，评论组件、画布、相册都实现了明暗优化。如允许用户主动切换，可在`docusaurus.config.js`中搜索`明暗切换按钮`。

</details>

### 结构目录

```
├──.github
│   └── workflows           # GitHub Actions自动部署
├── Makefile                # 构建 / AI 摘要生成等常用命令入口
├── docusaurus.config.js    # 站点配置
├── package.json            # 依赖包
├── LICENSE                 # 许可证
├── README.md               # 项目说明
├── .gitignore
├── babel.config.js
├── sidebars.js
├── blog
│   ├── xxxx.mdx            # 博客文件
│   └── authors.yml         # 博客作者
├── docs
│   ├── read                # 书架文档
│   └── docs                # 开发文档
├── scripts
│   └── summary             # AI 摘要/播客生成脚本（Python 3.12 + uv）
├── src
│   ├── components          # 自定义组件：相册、markdown等
│   ├── theme               # 自定义主题
│   └── pages               # 自定义页面：首页、案例页、相册页等
└── static
    ├── blog
    │   └── summary         # 博文 AI 摘要(.json)与播客音频(.mp3)
    ├── img                 # 公用图片
    ├── katex               # LaTeX 公式插件所需资源
    └── pages
        ├── case            # 与案例页相关的静态资源
        └── gallery         # 与相册页相关的静态资源（随仓库分发）
```

## 快速启动

以下命令可快速启动和重现项目：

- `npm install`：下载所需依赖包
- `npm run start`：启动站点
- `npm run build`: 打包为静态站点
- `npm run serve`: 启动静态站点

## AI 摘要与播客生成

博文摘要与对谈音频在本地生成后以静态文件入库，站点本身不依赖任何后端服务。

前置条件：安装 [uv](https://docs.astral.sh/uv/)，并复制 `scripts/summary/.env.example` 为 `scripts/summary/.env` 填入模型密钥。

- `make summary`：构建站点后，为新增/内容变更的博文生成摘要(.json)与播客(.mp3)，输出到 `static/blog/summary/`，提交入库即可
- `make hash`：仅刷新 `content_hash`，不调用模型（用于样式、重构等不改变文意的修改，替代旧的 `skip` 提交约定）

工作流：写完博文 → `make summary` → `git add static/blog/summary && git commit && git push`。

## Docker参考

### 构建 Docker

在项目目录下执行以下命令，将 Dockerfile 中定义的内容构建为版本号为 `0.0.1` 的镜像：

```bash
docker build -t jiangmiemie:0.0.1 .
```
   
   说明：该命令会读取当前目录下的 Dockerfile 并构建出镜像 `jiangmiemie:0.0.1`。

### 保存镜像为 tar 文件

使用 `docker save` 命令将刚构建好的镜像导出成 tar 文件：

```bash
docker save -o jiangmiemie_0.0.1.tar jiangmiemie:0.0.1
```
   
说明：生成的 `jiangmiemie_0.0.1.tar` 文件包含了该镜像的所有数据，方便后续的传输。

Ubuntu使用 `docker load` 加载镜像：
     
```bash
docker load -i jiangmiemie_0.0.1.tar
```

### 运行 Docker 容器

加载完成后，使用下面的命令运行容器，并将服务器的端口 8080 映射至容器的 80 端口：

```bash
docker run -d -p 8080:80 --name jiangmiemie jiangmiemie:0.0.1
```

说明：该命令会以后台模式运行镜像 `jiangmiemie:0.0.1`，容器名称为 `jiangmiemie`，使得你可以通过 Ubuntu 服务器上的 `8080` 端口访问该应用。

## 许可证信息

本项目采用[Apache License 2.0](LICENSE)许可证。