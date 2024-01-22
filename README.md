## 项目概览

欢迎来到这个基于[Docusaurus 3.0](https://docusaurus.io/)最新版本构建的定制站点。

我从[Docusaurus Site Showcase](https://docusaurus.io/showcase)中汲取了许多灵感，但我更倾向于简洁且精美的设计，以确保代码能够便于维护。

**设计理念：美丽优于丑陋，清晰优于模糊。简洁优于复杂，复杂优于繁琐。**

遵循这一理念，我打造了这个精巧而引人注目的个人博客站点。

> 网站性能分析报告：[点此查看](https://pagespeed.web.dev/)

### 核心特性

- 集成infinum，轻松创建个人案例页，优雅展示个人作品。[立即体验](https://jiangmiemie.com/)

- 集成Giscus，支持在博客页下方评论，使用GitHub账号登录，便于与作者互动。[访问博客页体验](https://jiangmiemie.com/blog/blog/)

- 集成React Photo Album，构建独特的旅行照片墙。[直达照片墙](https://jiangmiemie.com/gallery/)
<details>
点击照片可放大并展示照片描述，支持多种布局、按标签筛选、点击单独查看、显示图片大小与描述、前后预览、图片放大、缩小等功能。`src\pages\gallery\index.js`中的 `photos` 字段为相册图片，可按需自定义。
</details>

### 通用特性

- Algolia全局搜索，支持站内搜索，帮助你快速找到所需内容。
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

- 明暗模式切换，从Markdown到画布到相册，都针对明暗模式进行了优化。为保持页面简洁，已默认隐藏，如需开启可参考下方说明。 
<details>
```
    //将下方代码中的disableSwitch: true改为false即可显示明暗切换按钮
    colorMode: {
      defaultMode: 'light',//定义首次访问的颜色
      disableSwitch: true,//隐藏明暗切换按钮
      respectPrefersColorScheme: false,//跟随用户系统默认
    },
```
</details>

- RSS订阅，支持博客的RSS订阅。访问[RSS](https://jiangmiemie.com/blog/rss.xml)即可订阅。

- 静态站点生成并托管至GitHub Page。

- 无障碍，配色考虑到视力障碍人士的阅读需求。

- KaTeX公式插件，支持LaTeX语法，使数学公式编辑更加便捷。

- PWA (Progressive Web App)，像使用原生应用一样。

- 公告栏 (announcementBar)，允许在首页设置一个公告。

- Google Analytics，可查看网站访问情况。
<details>
获取谷歌分析代码，并填入 `docusaurus.config.js` 的 `googleAnalytics` 字段。
</details>

- i18n，基于Crowdin插件自动翻译（暂时移除，会导致构建包的体积翻倍，大于1G无法正常github-page部署）。

### 快速启动

以下命令可快速启动和重现项目：

- `npm update`：更新插件
- `npm install`：下载所需依赖包
- `npm run start`：启动站点

### 许可证信息

本项目采用[Apache License 2.0](LICENSE)许可证。
