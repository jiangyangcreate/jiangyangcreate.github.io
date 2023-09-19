---
tags: [debug记录]
---
# Docusaurus插件

最近文章变多了，所以计划把不同类型的文章分类至不同的路由下面。即

``` bash
/docs/a/1.html
/docs/a/2.html
/docs/b/1.html
/docs/b/2.html
```

变成

``` bash
/a/1.html
/a/2.html
/b/1.html
/b/2.html
```

我还是很喜欢原来的docs的版式，Docusaurus的版式主要有：`@docusaurus/plugin-content-pages`、`@docusaurus/plugin-content-docs`和`@docusaurus/plugin-content-blog`，他们合起来就是`@docusaurus/preset-classic`

有点像是：wps-word、wps-ppt、wps-excel和WPS之间的关系一样，前者都是后者的子集。

我们可以通过如下方式来配置

``` bash
plugins: [
[
    "@docusaurus/plugin-content-docs",//docs插件的全称
    {
    id: "code",//标识
    path: "paper/code",//本地文件的路径
    routeBasePath: "code",//url路由
    sidebarPath: require.resolve("./sidebars.js"),
    },
],
[
    "@docusaurus/plugin-content-docs",//docs插件的全称
    {
    id: "code2",//标识
    path: "paper/code2",//本地文件的路径
    routeBasePath: "code2",//url路由
    sidebarPath: require.resolve("./sidebars.js"),
    },
],
]
```

但是`@docusaurus/plugin-content-docs`默认要占据你一个docs文件夹位置（会提示docs文件夹不存在）。

``` bash
plugins: [
[
    "@docusaurus/plugin-content-docs",//docs插件的全称
    {
    id: "code",//标识
    path: "docs/code",//本地文件的路径--改paper文件夹名 -> docs
    routeBasePath: "code",//url路由
    sidebarPath: require.resolve("./sidebars.js"),
    },
],
[
    "@docusaurus/plugin-content-docs",//docs插件的全称
    {
    id: "code2",//标识
    path: "paper/code2",//本地文件的路径--改paper文件夹名 -> docs
    routeBasePath: "code2",//url路由
    sidebarPath: require.resolve("./sidebars.js"),
    },
],
]
```

好好好，如果你把多个文件都指向它，又会报重复导入React的错，因为每次调用这个插件，他都会去找到docs。并把里面所有的.md文件封包一遍（导入react模块，然后转md为html映射到路由上）。

折磨。所以在不改源码的情况下，它只能

``` bash
├docs
├a
├b
```

不能

``` bash
docs
├─ a
├─ b
```

也不能

``` bash
├paper
├a
├b
```

考虑到后面代码版本升级和麻烦程度，还是遵守它默认的规则吧。必须有1个docs文件夹，且不能再用插件映射这个文件夹。
