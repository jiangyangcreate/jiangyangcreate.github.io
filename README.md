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

## 快速重现

如果你想基于这个模式构建你自己的站点，可以尝试

`npm install`下载所需的依赖包

`npm run start`启动站点

### 配置

当然这里面有一些配置是需要你自己修改的，譬如：

- `docusaurus.config.js`中所有指向的站点

- `docusaurus.config.js`中的`
      algolia: {
        appId: '****',
        apiKey: '****',
        indexName: '****',
      },`需要自己申请获得对应信息，[点击申请](https://docsearch.algolia.com/apply/)。通常需要2天左右的时间。

- 更多配置或自动抓取设置，可参见[https://crawler.algolia.com/admin/crawlers/](https://crawler.algolia.com/admin/crawlers/)