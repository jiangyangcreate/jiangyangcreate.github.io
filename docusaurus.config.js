// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// 导入公式渲染模块remark-math和rehype-katex
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 设置明暗模式
const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

// 用户自定义
const email = 'jiangyangcreate@gmail.com';
const websitename = 'jiangmiemie';
const websiteurl = 'https://jiangmiemie.com';
const githubusername = 'jiangyangcreate';
const githubuserRepository = 'jiangyangcreate.github.io';

const githuburl = `https://github.com/${githubusername}`;
const githuborgurl = `https://github.com/${githubusername}/${githubuserRepository}`;
const editUrl = `${githuborgurl}/blob/main`;
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: websitename,
  tagline: '真实的记录自己，比获得他人的认同感更重要',
  favicon: 'img/favicon.ico',
  url: websiteurl,
  baseUrl: '/',
  organizationName: websitename, // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // set trailingSlash: true 可以让 algolia 抓取更完整
  trailingSlash: true,

  // 国际化
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      zh:{
        htmlLang:'zh-CN',
      }
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: "docs",
          path: "docs",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: editUrl,
        },

        blog: {
          id:  "blog",
          path: "blog",
          //修改博文插件，追加评论模块
          blogPostComponent: '@theme/BlogPostPage',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          routeBasePath: "blog",
          showReadingTime: true,
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
          editUrl: editUrl,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} ${websitename}`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 999 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 999),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
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
    //谷歌分析框架:2023年12月实测会影响国内访问速度
    //后续情况可能有所变动，取消下方代码注释即可正常访问
    // [
    //   '@docusaurus/plugin-google-gtag',
    //   {
    //     trackingID: 'G-4GF73PJ1H7',
    //     anonymizeIP: true,
    //   },
    // ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "read",
        path: "read",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        routeBasePath: "read",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: editUrl,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.png',
      // 为亮色和暗色模式指定图表的主题
      // mermaid: {
      //   theme: {light: 'neutral', dark: 'forest'},
      // },
      metadata: [
        {
          name: 'keywords',
          content: websitename,
        },
        {
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
            //to: "/blog/archive",
            // to: "/blog/tags",
            to: "/blog",
            position: 'left',
            label: '博文',
          },
          {
            to: "/gallery",
            position: 'left',
            label: '相簿',
          },
          {
            to: "/showcase",
            position: 'left',
            label: '个案',
          },
          // 搜索框
          {
            type: 'search',
            position: 'right',
          },
          // 中英文切换
          {
            type: 'localeDropdown',
            position: 'right',
          },

        ],
      },
      
      colorMode: {
        defaultMode: 'dark',//定义首次访问的颜色
        disableSwitch: true,//隐藏明暗切换按钮
        respectPrefersColorScheme: false,//跟随用户系统默认
      },
      //自定义配置底部的版权说明与SVG图超链接
      footer: {
        style: 'light',
        copyright: `
          <div class="footerx">
            <div align="left">
              <a href="https://web.archive.org/web/20230609185132/https://creativecommons.org/licenses/by-nc-sa/4.0/">
                <strong>CC BY-NC-SA 4.0 </strong>
              </a> 
              <br> 2019-${new Date().getFullYear()}  ©  ${websitename}
            </div>

            <p class="logoxs">

            <a  class="logox" target="_blank" rel="noopener noreferrer" href="${websiteurl}/blog/rss.xml" aria-label="go to next website random">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="rss" width="30px" height="30px" ><g fill="url(#grad1)"><circle cx="3" cy="13" r="2"></circle>
            <path d="M1 5.667v2.667A6.674 6.674 0 0 1 7.667 15h2.666c0-5.146-4.187-9.333-9.333-9.333z"></path><path d="M1 1v2.667C7.25 3.667 12.334 8.75 12.334 15H15C15 7.28 8.72 1 1 1z"></path></g></svg>
            </a>

            <a class="logox" target="_blank" rel="noopener noreferrer" href="${githuburl}" aria-label="go to my github">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" clip-path="inset(0% round 16px)" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="url(#grad1)" stroke="none">
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: #4ca2cd; stop-opacity: 1" />
              <stop offset="50%" style="stop-color: #ac4ccc; stop-opacity: 1" />
              <stop offset="100%" style="stop-color: #ff6c2c; stop-opacity: 1" />
              </linearGradient>
              <path d="M2384 5060 c-1012 -69 -1891 -738 -2235 -1703 -53 -146 -102 -349
              -125 -512 -23 -157 -25 -496 -5 -655 102 -816 575 -1526 1287 -1932 164 -94
              418 -200 483 -202 51 -1 94 20 116 57 18 30 19 50 16 267 -1 129 -3 236 -4
              236 -1 1 -38 -4 -82 -12 -263 -43 -497 16 -646 165 -58 58 -76 86 -134 206
              -94 196 -149 271 -255 348 -78 56 -120 98 -120 119 0 50 121 67 217 30 125
              -47 208 -119 299 -258 126 -191 284 -276 485 -261 77 6 233 49 245 68 3 6 13
              38 20 71 19 80 68 181 110 228 40 45 44 42 -86 60 -103 14 -282 60 -368 94
              -362 143 -571 410 -649 829 -25 134 -25 463 0 567 36 149 103 285 195 398 l43
              53 -15 47 c-52 161 -46 370 16 564 20 61 24 67 54 73 107 20 352 -68 576 -206
              l98 -61 87 20 c204 47 298 57 553 57 256 0 349 -10 553 -57 l88 -20 77 48
              c153 96 304 167 407 193 85 21 159 31 191 25 28 -5 33 -12 52 -72 57 -178 67
              -404 23 -542 l-21 -65 20 -25 c98 -121 175 -269 212 -409 26 -98 36 -348 19
              -488 -74 -608 -407 -935 -1041 -1023 -120 -16 -118 -15 -83 -53 46 -48 90
              -134 115 -223 20 -74 22 -106 27 -529 7 -492 5 -482 66 -507 47 -20 102 -13
              200 26 348 135 622 311 884 569 417 410 679 942 752 1527 20 159 18 498 -5
              655 -173 1219 -1151 2131 -2373 2215 -161 11 -175 11 -339 0z"/>
              </g>
            </svg></a>

           <a class="logox" target="_blank" rel="noopener noreferrer" href="mailto:${email}" aria-label="go to send email">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            clip-path="inset(0% round 15px)" width="30px" height="30px" viewBox="0 0 1024.000000 1024.000000"
            preserveAspectRatio="xMidYMid meet">
            <g><path style="opacity:0.996" fill="url(#grad1)" d="M 243.5,420.5 C 189.523,379.185 135.857,337.518 82.5,295.5C 140.987,183.298 229.487,104.632 348,59.5C 432.42,30.213 518.587,23.713 606.5,40C 693.576,57.6997 769.243,96.6997 833.5,157C 787.833,202.667 742.167,248.333 696.5,294C 695.5,294.667 694.5,294.667 693.5,294C 642.378,246.775 581.711,222.942 511.5,222.5C 407.283,227.337 327.117,273.337 271,360.5C 259.938,379.624 250.771,399.624 243.5,420.5 Z"/></g>
            <g><path style="opacity:0.996" fill="url(#grad1)" d="M 82.5,295.5 C 135.857,337.518 189.523,379.185 243.5,420.5C 223.5,481.168 223.5,541.835 243.5,602.5C 189.523,643.815 135.857,685.482 82.5,727.5C 31.7513,624.612 18.5846,516.945 43,404.5C 51.5465,366.35 64.7132,330.016 82.5,295.5 Z"/></g>
            <g><path style="opacity:0.998" fill="url(#grad1)" d="M 829.5,876.5 C 777.833,835.833 726.167,795.167 674.5,754.5C 725.318,718.61 756.985,669.944 769.5,608.5C 683.503,607.5 597.503,607.167 511.5,607.5C 511.5,546.167 511.5,484.833 511.5,423.5C 662.5,423.5 813.5,423.5 964.5,423.5C 979.017,509.532 974.517,594.532 951,678.5C 928.206,755.703 887.706,821.703 829.5,876.5 Z"/></g>
            <g><path style="opacity:0.997" fill="url(#grad1)" d="M 243.5,602.5 C 274.71,690.744 334.043,751.577 421.5,785C 487.78,805.861 553.78,804.861 619.5,782C 638.723,774.388 657.056,765.222 674.5,754.5C 726.167,795.167 777.833,835.833 829.5,876.5C 762.129,936.339 683.462,972.839 593.5,986C 437.233,1008.45 300.566,967.451 183.5,863C 141.888,823.583 108.222,778.416 82.5,727.5C 135.857,685.482 189.523,643.815 243.5,602.5 Z"/></g>
            </svg>
           </a>
            </p>
          </div> 
        `,
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
    }),
  // 开启markdown的mermaid功能
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
};

module.exports = config;
