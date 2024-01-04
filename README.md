## 项目简介

这是一个基于[Docusaurus 3.0](https://docusaurus.io/)最新版本的自定义站点。

[Docusaurus Site Showcase](https://docusaurus.io/showcase)提供了一些灵感，但我注重简洁而精美的设计，以确保代码易于维护。

**设计理念：美丽胜过丑陋，清晰胜过模糊。简洁胜过复杂，复杂胜过繁琐。**

在这个指导下，我打造了这个小巧而吸引人的个人博客站点。

> 网站分析报告：[点击查看](https://pagespeed.web.dev/)

### 主要特性

- 集成infinum，轻松创建个人案例页，优雅展示个人案例。[查看个人案例](https://jiangmiemie.com/showcase/)

- 集成Giscus，在博客页下方评论，支持使用GitHub账号登录，方便与作者互动。[前往博客页体验](https://jiangmiemie.com/blog/blog/)

- 集成React Photo Album，构建独特的旅行照片墙。[直达照片墙](https://jiangmiemie.com/gallery/)

<details>
点击照片可放大并展示照片描述，支持多种布局、按标签筛选、点击单独查看、显示图片大小与描述、前后预览、图片放大、缩小等功能。`src\pages\gallery\index.js`中的 `photos` 字段为相册图片，可按需自定义。
</details>

- 页面左上角切换明暗，从Markdown到画布到相册，做了很多明暗切换，保持一致。 [体验切换](https://jiangmiemie.com/)

### 常规特性

- Algolia全局搜索，支持站内搜索，帮助您快速找到所需内容。
<details>
获取Algolia的 `Application ID` 和 `Search-Only API Key`，并填入 `docusaurus.config.js` 的 `algolia` 字段。

添加搜索框：
```javascript
navbar: {
  title: '首页',
  hideOnScroll: true,
  items: [
    // 搜索框
    {
      type: 'search',
      position: 'right',
    },
  ]
},
```
</details>
- RSS，支持博客的RSS订阅。访问[RSS](https://jiangmiemie.com/blog/rss.xml)即可订阅。
- 生成静态站点托管至GitHub Page。
- 无障碍，配色便于视力障碍人生阅读。
- KaTeX公式插件，支持LaTeX语法，使数学公式编辑更加便捷。
- PWA (Progressive Web App)，支持离线访问，使您可以在没有网络连接的情况下浏览本站。
- i18n，基于Crowdin插件自动翻译。
- 公告栏 (announcementBar)，允许在首页设置一个公告。
- Google Analytics，可查看网站访问情况。
<details>
获取谷歌分析代码，并填入 `docusaurus.config.js` 的 `googleAnalytics` 字段。
</details>

### 快速开始

执行以下命令可快速重现项目：

- `npm update`：更新插件
- `npm install`：下载所需依赖包
- `npm run start`：启动站点

### 许可证信息

[Apache License 2.0](LICENSE)