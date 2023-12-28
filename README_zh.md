[English](README.md) | [中文](README_zh.md)

## 设计理念

优美优于丑陋，明了优于隐晦

简单优于复杂，复杂优于繁杂

扁平优于嵌套，稀疏优于稠密

可读性很重要！

特例亦不可违背原则，即使实用比纯粹更优。

错误绝不能悄悄忽略，除非它明确需要如此。

面对不确定性，拒绝妄加猜测。

任何问题应有一种，且最好只有一种，显而易见的解决方法。

做优于不做，然而不假思索还不如不做。

很难解释的，必然是坏方法。

很好解释的，可能是好方法。

以上节选自《Python之禅》

基于这样的设计理念，我做了这样的一个小而美的个人博客站点：点击查看[网站分析](https://pagespeed.web.dev/)

## 框架

基于最新的[Docusaurus 3.0.1](https://docusaurus.io/)构建的个人博客站点，部分语法与Docusaurus 2.0不兼容。

灵感来源于[Docusaurus Site Showcase](https://docusaurus.io/showcase)，选取了其中有意思的设计，进行了一些修改，最终完成了这个站点。

为了方便大家修改，自定义内容尽可能的前置在了`docusaurus.config.js`中。

- 明暗模式，可以在页面右上角切换。
- announcementBar公告栏，可以在首页设置一个公告。
- katex公式插件，支持latex语法。让你写数学公式更加方便。
- pwa，支持离线访问。安装并离线缓存，可让你在没有网络的飞机上也能浏览本站。
- rss，支持博客的rss订阅。访问[RSS](https://jiangmiemie.com/blog/rss.xml)即可订阅。
- algolia全局搜索，支持站内搜索。让你快速找到你想要的内容。
- giscus，可以在指定页面下方评论，支持github账号登录。让你与作者交流。
- googlegtag谷歌分析，可以查看你的网站访问情况。
- i8n 基于Crowdin插件自动翻译。
- react-photo-album 一个相册插件，可以在指定页面下方展示相册。

<details>

### 谷歌分析

获取谷歌分析代码，填入`docusaurus.config.js`中的`googleAnalytics`字段。

### 全局搜索

获取algolia的`Application ID`和`Search-Only API Key`，填入`docusaurus.config.js`中的`algolia`字段。

添加搜索框
```
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

### giscus

使用giscus插件

获取giscus的`repo`和`repoID`，填入`docusaurus.config.js`中的`giscus`字段。


基本使用，如：自定义留言板
```
import Giscus from '@giscus/react';

function Comment() {
  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  );
}
```


如需在每个文章的评论，需要在`src\theme\BlogPostPage`中添加`<Giscus />`。
复制粘贴`src\theme\BlogPostPage`文件夹即可。


### album

使用react-photo-album插件自定义相册。

支持多种布局、按标签筛选、点击单独查看、显示图片大小与描述、显示前后预览、图片放大、缩小等功能。`src\pages\gallery\index.js`中的`photos`字段为相册图片，可按需自定义。

### 中英双语

获取crowdin的`Project ID`和`API Key`，填入`docusaurus.config.js`中的`crowdin`字段。

</details>

## 快速重现

`npm update`更新插件

`npm install`下载所需的依赖包

`npm run start`启动站点
