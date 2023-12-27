---
slug: /
sidebar_position: 1
tags: [docusaurus]
title: docusaurus自定义
---

## 外部

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