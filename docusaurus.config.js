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
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
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
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "sheets",
        path: "sheets",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        routeBasePath: "sheets",
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
      //评论插件
      giscus: {
        repo: `${githubusername}/${githubuserRepository}`,
        repoId: 'R_kgDOKVhfrw',
        category: 'Announcements',
        categoryId: 'DIC_kwDOKVhfr84CbuxD',
        theme: 'light',
        darkTheme: 'dark',
      },
      navbar: {
        title: '首页',
        hideOnScroll: true,

        items: [
          {
            to: "/docs",
            position: 'left',
            label: '全栈',
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
            label: '博客',
          },
          {
            to: "/sheets/tags",
            position: 'left',
            label: '碎片',
          },
          // 中英文切换导航
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
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
              <br> 2020-${new Date().getFullYear()}  ©  ${websitename}
            </div>
            <p class="logoxs">
            <a class="logox" target="_blank" rel="noopener noreferrer" href="${githuburl}" aria-label="go to my github">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" clip-path="inset(0% round 15px)" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
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

          <a  class="logox" target="_blank" rel="noopener noreferrer" href="https://www.travellings.cn/go.html" aria-label="go to next website random">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" clip-path="inset(0% round 15px)" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M0 2560 l0 -2560 2560 0 2560 0 0 2560 0 2560 -2560 0 -2560 0 0
              -2560z m3545 1505 c147 -31 283 -132 346 -257 45 -90 51 -110 58 -231 l6 -108
              200 -4 c610 -12 898 -162 825 -427 -16 -57 -102 -178 -173 -244 -211 -198
              -590 -420 -1016 -598 -74 -31 -136 -58 -138 -60 -2 -1 9 -30 24 -62 39 -83 39
              -167 0 -246 -127 -258 -484 -226 -563 51 -9 31 -17 57 -19 59 -1 1 -87 -22
              -192 -52 -548 -157 -1131 -266 -1560 -292 -87 -5 -113 -10 -113 -21 0 -23 64
              -116 105 -152 22 -19 69 -48 105 -65 l65 -31 999 -3 c892 -2 1006 -1 1055 14
              140 40 258 164 291 306 5 24 10 129 10 234 l0 190 38 19 c20 11 40 21 44 23 5
              2 8 -103 8 -232 0 -213 -2 -243 -21 -299 -52 -155 -161 -268 -315 -324 -52
              -18 -97 -26 -181 -30 -62 -3 -113 -8 -113 -10 0 -3 25 -32 55 -66 54 -60 66
              -92 43 -115 -29 -29 -56 -13 -144 88 l-89 100 -665 0 -665 0 -88 -100 c-88
              -101 -116 -117 -145 -88 -23 23 -11 54 47 119 l60 66 -112 6 c-172 8 -274 53
              -383 168 -28 30 -65 84 -83 120 l-32 66 -197 6 c-391 12 -626 76 -737 199
              -110 122 -72 272 115 458 133 132 311 256 562 391 98 53 402 199 414 199 2 0
              4 -22 4 -48 l0 -49 -232 -116 c-332 -166 -538 -300 -676 -440 -87 -89 -107
              -114 -132 -169 -44 -96 -16 -160 95 -219 127 -68 334 -106 590 -109 77 -1 148
              -1 158 -1 16 1 17 19 17 222 l0 220 43 -25 42 -25 6 -193 c3 -106 7 -195 7
              -197 2 -4 177 7 240 15 l43 6 -37 37 c-60 60 -88 125 -88 206 0 39 5 87 13
              108 22 65 84 132 152 166 201 101 430 -42 433 -269 0 -54 -5 -77 -29 -126 -17
              -32 -31 -62 -33 -65 -2 -4 55 4 125 16 321 58 688 147 991 241 l112 35 25 48
              c45 91 130 142 245 149 63 4 85 1 128 -18 l52 -23 126 52 c692 285 1171 624
              1201 849 20 157 -320 270 -792 260 l-150 -3 -5 -182 -5 -183 -42 26 -43 25 0
              282 c0 298 -5 339 -49 425 -29 57 -91 123 -149 161 -101 64 -56 62 -1158 59
              l-1000 -3 -76 -38 c-130 -64 -209 -174 -228 -317 -5 -41 -10 -187 -10 -325 l0
              -250 -40 -22 c-21 -13 -41 -23 -44 -23 -10 0 -6 616 4 671 34 182 204 353 393
              394 96 21 1943 21 2042 0z m77 -395 c20 -6 48 -24 62 -41 23 -27 26 -40 26
              -106 l0 -75 43 4 42 3 0 -45 c0 -45 0 -45 -40 -50 l-40 -5 -5 -395 c-5 -433
              -5 -431 -65 -456 -52 -21 -853 -21 -895 1 -62 32 -60 9 -60 580 l0 520 23 28
              c12 16 38 32 57 37 52 12 808 12 852 0z m-1286 -34 l34 -34 0 -196 c0 -108 4
              -196 9 -196 4 0 60 13 122 30 63 16 115 30 117 30 1 0 2 -22 2 -49 l0 -49
              -125 -32 -125 -33 0 -269 c0 -233 -2 -272 -16 -294 -36 -54 -39 -54 -496 -54
              -401 0 -425 1 -455 20 -17 10 -37 28 -43 40 -13 23 -16 229 -12 719 l2 333 34
              34 34 34 442 0 442 0 34 -34z"/>
              </g>
              </svg>
            </a>

           <a class="logox" target="_blank" rel="noopener noreferrer" href="mailto:${email}" aria-label="go to send email">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            clip-path="inset(0% round 15px)" width="30px" height="30px" viewBox="0 0 1024.000000 1024.000000"
            preserveAspectRatio="xMidYMid meet">
            <g><path style="opacity:0.996" fill="#ea4335" d="M 243.5,420.5 C 189.523,379.185 135.857,337.518 82.5,295.5C 140.987,183.298 229.487,104.632 348,59.5C 432.42,30.213 518.587,23.713 606.5,40C 693.576,57.6997 769.243,96.6997 833.5,157C 787.833,202.667 742.167,248.333 696.5,294C 695.5,294.667 694.5,294.667 693.5,294C 642.378,246.775 581.711,222.942 511.5,222.5C 407.283,227.337 327.117,273.337 271,360.5C 259.938,379.624 250.771,399.624 243.5,420.5 Z"/></g>
            <g><path style="opacity:0.996" fill="#fabb05" d="M 82.5,295.5 C 135.857,337.518 189.523,379.185 243.5,420.5C 223.5,481.168 223.5,541.835 243.5,602.5C 189.523,643.815 135.857,685.482 82.5,727.5C 31.7513,624.612 18.5846,516.945 43,404.5C 51.5465,366.35 64.7132,330.016 82.5,295.5 Z"/></g>
            <g><path style="opacity:0.998" fill="#4285f3" d="M 829.5,876.5 C 777.833,835.833 726.167,795.167 674.5,754.5C 725.318,718.61 756.985,669.944 769.5,608.5C 683.503,607.5 597.503,607.167 511.5,607.5C 511.5,546.167 511.5,484.833 511.5,423.5C 662.5,423.5 813.5,423.5 964.5,423.5C 979.017,509.532 974.517,594.532 951,678.5C 928.206,755.703 887.706,821.703 829.5,876.5 Z"/></g>
            <g><path style="opacity:0.997" fill="#34a853" d="M 243.5,602.5 C 274.71,690.744 334.043,751.577 421.5,785C 487.78,805.861 553.78,804.861 619.5,782C 638.723,774.388 657.056,765.222 674.5,754.5C 726.167,795.167 777.833,835.833 829.5,876.5C 762.129,936.339 683.462,972.839 593.5,986C 437.233,1008.45 300.566,967.451 183.5,863C 141.888,823.583 108.222,778.416 82.5,727.5C 135.857,685.482 189.523,643.815 243.5,602.5 Z"/></g>
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
      announcementBar: {
        id: 'support',
        content:
          `🚀 如果你觉得还不错, 就给一个<a target="_blank" rel="noopener noreferrer" href="${githuborgurl}"  aria-label="star on github "> star </a>吧 ~`,
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,//允许用户关闭
      },
    }),
  //用于与katex配合获得更好的公式渲染效果
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

module.exports = config;
