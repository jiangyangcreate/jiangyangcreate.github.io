## 项目简介

这是一个基于最新版本的[Docusaurus 3.0](https://docusaurus.io/)的自定义站点

[Docusaurus Site Showcase](https://docusaurus.io/showcase)中的自定义给了我许多灵感，但我更追求简洁而精美的设计以确保代码易于维护。

**美丽胜过丑陋，清晰胜过模糊。简洁胜过复杂，复杂胜过繁琐。**

在这个设计理念的指导下，我打造了这个小巧而具有吸引力的个人博客站点。

> 有多小巧？[点击查看网站分析](https://pagespeed.web.dev/)

### 主要特性

- 集成 infinum ，轻松创建个人案例页，优雅的展示你的项目。
> [点击查看](https://jiangmiemie.com/showcase/)
- 集成 Giscus，可在博客页下方评论，支持使用 GitHub 账号登录，方便与作者互动。
> [点击体验](https://jiangmiemie.com/blog/blog/)
- 集成 React Photo Album ，构建独特的旅行照片墙
> 点击照片可放大并展示照片描述， [点击直达照片墙](https://jiangmiemie.com/gallery/)
- 不将就的明暗模式，从画布到相册，从评论框到搜索框，白天黑夜都不将就。
> 点击页面左上角切换明暗， [点击体验](https://jiangmiemie.com/)


### 常规特性

- Algolia 全局搜索，支持站内搜索，帮助您快速找到需要的内容。
- RSS，支持博客的 RSS 订阅。访问[RSS](https://jiangmiemie.com/blog/rss.xml)即可订阅。
- 生成静态站点托管至 GitHub Page。
- 无障碍，配色便于视力障碍人生阅读。
- katex 公式插件，支持 LaTeX 语法，使数学公式编辑更加便捷。
- PWA (Progressive Web App)，支持离线访问，使您可以在没有网络连接的情况下浏览本站。
- i18n，基于 Crowdin 插件自动翻译。
- 公告栏 (announcementBar)，允许在首页设置一个公告。
- Google Analytics，可查看网站访问情况。

<details>

### 集成谷歌分析

获取谷歌分析代码，并填入 `docusaurus.config.js` 的 `googleAnalytics` 字段。

### 全局搜索配置

获取 Algolia 的 `Application ID` 和 `Search-Only API Key`，并填入 `docusaurus.config.js` 的 `algolia` 字段。

添加搜索框
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

### 集成 Giscus

使用 Giscus 插件

获取 Giscus 的 `repo` 和 `repoID`，并填入 `docusaurus.config.js` 的 `giscus` 字段。

基本使用，例如：自定义留言板
```javascript
import Giscus from '@giscus/react';

function Comment() {
  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  );
}
```

若要在每篇文章下添加评论，需要在 `src\theme\BlogPostPage` 中添加 `<Giscus />`。
只需复制粘贴 `src\theme\BlogPostPage` 文件夹即可。

### 配置相册

使用 React Photo Album 插件自定义相册。

支持多种布局、按标签筛选、点击单独查看、显示图片大小与描述、显示前后预览、图片放大、缩小等功能。`src\pages\gallery\index.js`中的 `photos` 字段为相册图片，可按需自定义。

### 中英双语支持

获取 Crowdin 的 `Project ID` 和 `API Key`，并填入 `docusaurus.config.js` 的 `crowdin` 字段。

</details>

### 快速开始

执行以下命令可快速重现项目：

- `npm update`：更新插件
- `npm install`：下载所需依赖包
- `npm run start`：启动站点

### 许可证信息

[Apache License 2.0](LICENSE)

### 最新更新