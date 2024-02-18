## 项目概览

欢迎来到这个基于[Docusaurus 3](https://docusaurus.io/)最新版本构建的定制站点。

我从[Docusaurus Site Showcase](https://docusaurus.io/showcase)中汲取了许多灵感，但我更倾向于简洁且精美的设计，以确保代码能够便于维护,同时使用markmap与mermaid制图，使得文本均可被选中，易于被网页翻译。。

**设计理念：美丽优于丑陋，清晰优于模糊。简洁优于复杂，复杂优于繁琐。**

遵循这一理念，我打造了这个精巧而引人注目的个人博客站点。

> 网站性能分析报告：[点此测试](https://pagespeed.web.dev/)

## 核心特性

- 配置生成式 AI 文章总结，完全的Github部署。[访问 博客文本摘要](https://jiangmiemie.com/blog/2024/1/31/)

- 集成 React Photo Album，布局优雅，点击照片可放大并展示照片描述、拍摄地、照片尺寸等信息。[访问 照片墙](https://jiangmiemie.com/gallery/)

- 集成 mermaid 与 KaTeX ，让数学公式和流程图的编辑更加便捷。[访问 markdown](https://jiangmiemie.com/docs/编程外的基础/Markdown备忘录/)

- 集成 markmap ，用markdown绘制易维护的交互式思维导图。[访问 交互式思维导图](https://jiangmiemie.com/read/)

- 集成 giscus，使用 GitHub 账号评论，还能一键分享至 twitter。[访问 博客页](https://jiangmiemie.com/blog/)

<details>
  <summary>点击以查看更多信息</summary>

- 集成 infinum，轻松创建个人案例页，优雅展示个人作品。[访问 个案页](https://jiangmiemie.com/case/)

- RSS 订阅，支持博客的 RSS 订阅。访问[访问 RSS](https://jiangmiemie.com/blog/rss.xml)即可订阅。

- 支持生成静态站点，托管至 GitHub Page。[查看 workflows](.github\workflows\updata.yml)

- Algolia 全局搜索，支持站内搜索，帮助你快速找到所需内容，如需配置可在`docusaurus.config.js`中搜索`Algolia`。

- Google Analytics，可查看网站访问情况，如需配置可在`docusaurus.config.js`中搜索`gtag`。

- 公告栏 (announcementBar)，允许在设置一个公告，如需配置可在`docusaurus.config.js`中搜索`announcementBar`。

- 自动明暗模式切换，评论组件、画布、相册都实现了明暗优化。如允许用户主动切换，可在`docusaurus.config.js`中搜索`明暗切换按钮`。

- PWA (Progressive Web App)，让使用网页像使用原生应用一样，可在`docusaurus.config.js`中搜索`pwa`。

</details>

### 结构目录

```
├──.github
│   └── workflows           # GitHub Actions自动部署
├── docusaurus.config.js    # 站点配置
├── package.json            # 依赖包
├── LICENSE                 # 许可证
├── README.md               # 项目说明
├── .gitignore
├── babel.config.js
├── sidebars.js
├── blog
│   ├── xxxx.md             # 博客文件
│   └── authors.yml         # 博客作者
├── docs
│   ├── ai                  # 算法文档
│   ├── read                # 书架文档
│   └── docs                # 开发文档
├── src
│   ├── components          # 自定义组件：相册、markdown等
│   ├── theme               # 自定义主题
│   └── pages               # 自定义页面：首页、案例页、相册页等
└── static
    ├── img                 # 公用图片
    ├── katex               # Latext 公式插件所需资源
    ├── docs                # 与文档相关静态资源
    └── pages
        ├── case            # 与案例页相关的静态资源
        └── gallery         # 与相册页相关的静态资源
```

## 快速启动

以下命令可快速启动和重现项目：

- `npm update`：更新插件
- `npm install`：下载所需依赖包
- `npm run start`：启动站点

## 许可证信息

本项目采用[Apache License 2.0](LICENSE)许可证。