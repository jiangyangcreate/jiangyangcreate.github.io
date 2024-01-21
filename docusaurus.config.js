// 导入公式渲染模块remark-math和rehype-katex
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 设置明暗模式
const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

// 用户自定义
const websitename = 'jiangmiemie';
const githubusername = 'jiangyangcreate';
const email = 'jiangyangcreate@gmail.com';

const websiteurl = `https://${websitename}.com`;
const githubuserRepository = `${githubusername}.github.io`;
const githuborgurl = `https://github.com/${githubusername}/${githubuserRepository}`;
const editUrl = `${githuborgurl}/blob/main`;

module.exports = {
  title: websitename,
  tagline: '真实的记录自己，比获得他人的认同感更重要',
  favicon: 'img/favicon.ico',
  url: websiteurl,
  baseUrl: '/',
  organizationName: websitename, // Usually your GitHub org/user name.
  projectName: githubuserRepository, // Usually your repo name.
  deploymentBranch: 'gh-pages',
  // set trailingSlash: true 可以让 algolia 抓取更完整
  trailingSlash: true,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: [
          require.resolve('./src/theme/custom.css'),
          // require.resolve('@infinum/docusaurus-theme/dist/style.css'),
        ],
        },
				gtag: {
					trackingID: 'G-4GF73PJ1H7',
					anonymizeIP: true,
				},
				sitemap: {
					changefreq: 'weekly',
					priority: 0.5,
				},
        docs: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: editUrl,
        },
        blog: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showReadingTime: true,
          postsPerPage: 9,
          blogSidebarCount: 'ALL',
          editUrl: editUrl,
          feedOptions: {
            type: 'all',
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 99),
                ...rest,
              });
            },
          },
        },
      },
    ]
  ],
  plugins: [
    //pwa
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "read",
        path: "read",
        routeBasePath: "read",
        sidebarPath: require.resolve("./sidebars.js"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        editUrl: editUrl,
      },
    ],
  ],
  // 开启markdown的mermaid功能 , live-codeblock
  themes: ['@docusaurus/theme-mermaid','@docusaurus/theme-live-codeblock'],
  markdown: {
    mermaid: true,
  },
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],
  themeConfig:
    ({
      // Replace with your project's social card
      image: 'img/ico/docusaurus-social-card.png',
      // 为亮色和暗色模式指定图表的主题
      mermaid: {
        theme: {light: 'neutral', dark: 'forest'},
      },
      metadata: [{
          name: 'keywords',
          content: 'blog, javascript, python',
        },
      ],
      //全局索引插件
      algolia: {
        appId: 'B8DUWB4CMX',
        apiKey: '36cbcb8eb4d417b32200be7e427d68fd',
        indexName: websitename,
      },
      colorMode: {
        defaultMode: 'light',//定义首次访问的颜色
        disableSwitch: true,//隐藏明暗切换按钮
        respectPrefersColorScheme: false,//跟随用户系统默认
      },
      //配置标准的明暗主题
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "markdown",
      },
      // 告示条
      // announcementBar: {
      //   id: 'support',
      //   content:
      //     `🚀 如果你觉得还不错, 就给一个<a target="_blank" rel="noopener noreferrer" href="${githuborgurl}"  aria-label="star on github "> star </a>吧 ~`,
      //   backgroundColor: '#fafbfc',
      //   textColor: '#091E42',
      //   isCloseable: true,//允许用户关闭
      // },
      navbar: {
        title: '首页',
        hideOnScroll: true,

        items: [
          {
            to: "/docs",
            position: 'left',
            label: '技术',
          },
          {
            to: "/read",
            position: 'left',
            label: '读书',
          },
          {
            to: "/blog/archive",
            // to: "/blog/tags",
            // to: "/blog",
            position: 'left',
            label: '博文',
          },
          {
            to: "/gallery",
            position: 'left',
            label: '相簿',
          },
          // 搜索框
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      //自定义配置底部的版权说明与SVG图超链接
      footer: {
        style: 'light',
        copyright: `
            <div align="left">
              <a href="${githuborgurl}/licenses">
                2019-${new Date().getFullYear()} © ${websitename}
              </a> 
            </div>
            <p class="footer__logoxs">
              <a target="_blank" rel="noopener noreferrer" href="${githuborgurl}" aria-label="https://www.travellings.cn/go.html">
                <img src='/img/ico/github-color.svg'/>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="${websiteurl}/blog/rss.xml" aria-label="rss">
                <img src='/img/ico/rss-color.svg'/>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="mailto:${email}" aria-label="go to send email">
                <img src='/img/ico/email-color.svg'/>
              </a>
            </p>
        `,
      },
    }),
};