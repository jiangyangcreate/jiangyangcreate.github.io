// 导入公式渲染模块remark-math和rehype-katex
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 设置明暗模式
const lightCodeTheme = require("prism-react-renderer").themes.vsLight;
const darkCodeTheme = require("prism-react-renderer").themes.vsDark;

// 用户自定义
const username = "jiangyang";
const websitename = "jiangmiemie";
const githubusername = "jiangyangcreate";

const websiteurl = `https://${websitename}.com`;
const githubuserRepository = `${githubusername}.github.io`;
const githuborgurl = `https://github.com/${githubusername}/${githubuserRepository}`;

module.exports = {
  title: websitename,
  tagline: "真实的记录自己，比获得他人的认同感更重要",
  favicon: "favicon.ico",
  url: websiteurl,
  baseUrl: "/",
  organizationName: websitename, // Usually your GitHub org/user name.
  projectName: githubuserRepository, // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: true, // 让 algolia 抓取更完整
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: [
            require.resolve("./src/theme/custom.css"),
          ],
        },
        // gtag: {
        //   trackingID: "G-4GF73PJ1H7",
        //   anonymizeIP: true,
        // },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
        docs: false,
        blog: false,
        pages: {
          path: "src/pages",
          routeBasePath: "",
          include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          mdxPageComponent: "@theme/MDXPage",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/logo-512.svg",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json", // your PWA manifest
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "read",
        path: "docs/read",
        routeBasePath: "read",
        sidebarPath: require.resolve("./sidebars.js"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs",
        path: "docs/docs",
        routeBasePath: "docs",
        sidebarPath: require.resolve("./sidebars.js"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        routeBasePath: "/blog",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showReadingTime: true,
        // postsPerPage: 9,
        blogSidebarCount: 0,
        onUntruncatedBlogPosts: 'ignore', // 忽略博客文章缺少截断标记的警告

        feedOptions: {
          type: "all",
          createFeedItems: async (params) => {
            const { blogPosts, defaultCreateFeedItems, ...rest } = params;
            return defaultCreateFeedItems({
              blogPosts: blogPosts.filter((item, index) => index < 99),
              ...rest,
            });
          },
        },
      },
    ],
  ],
  // 开启markdown的mermaid功能 , live-codeblock
  themes: ["@docusaurus/theme-mermaid", "@docusaurus/theme-live-codeblock"],
  markdown: {
    mermaid: true,
  },
  // 如不添加可能会样式异常，展示2次
  stylesheets: [
    {
      href: "/katex/katex.min.css",
      type: "text/css",
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "/pages/case/jiangmiemie.webp",
    // 为亮色和暗色模式指定图表的主题
    mermaid: {
      theme: { light: "neutral", dark: "forest" },
    },
    metadata: [
      {
        name: "keywords",
        content: "docusaurus,blog, python, 开源",
      },
    ],
    //全局索引插件
    algolia: {
      appId: "B8DUWB4CMX",
      apiKey: "36cbcb8eb4d417b32200be7e427d68fd", // 站内搜索用的 key
      indexName: websitename,
      askAi: {
        appId: "B8DUWB4CMX",
        apiKey: "7324233c84b4ffb7c51f7a11136750a9",
        indexName: "markdown-index",              // 你的 markdown 索引名
        assistantId: "PSPEr8rtpc0W",
        // Docusaurus 3.9 当前的 schema 不支持 suggestedQuestions 字段
      },
    },
    colorMode: {
      defaultMode: "light", //定义首次访问的颜色
      disableSwitch: false, //隐藏明暗切换按钮
      respectPrefersColorScheme: true, //跟随用户系统默认
    },
    //配置标准的明暗主题
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      defaultLanguage: "markdown",
      additionalLanguages: ['toml', 'yaml', 'bash'],
    },
    // 告示条
    // announcementBar: {
    //   id: 'support',
    //   content:
    //     `全局AI问答、博客AI总结、博客转AI播客功能均已上线 🚀 `,
    //   isCloseable: true,//允许用户关闭
    // },
    navbar: {
      hideOnScroll: false,
      items: [
        {
          to: "/docs",
          position: "left",
          label: "开发",
        },
        {
          to: "/read",
          position: "left",
          label: "书架",
        },
        {
          to: "/blog/archive",
          position: "left",
          label: "博文",
        },
        {
          to: "/case",
          position: "left",
          label: "个案",
        },
        {
          to: "/gallery",
          position: "left",
          label: "相簿",
        },
        {
          label: '其他',
          position: 'left',
          items: [
            {
              label: '云盘',
              href: 'https://yun.jiangmiemie.com',
            },
            {
              label: 'AI助手',
              href: 'https://ai.jiangmiemie.com',
            },
          ],
        },
        // 搜索框
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      copyright: `<div style="font-size: 0.75rem;">Copyright ©  ${username} ${new Date().getFullYear()} ⭐ <a href="${githuborgurl}" target="_blank">Open Source on GitHub</a><div/>`,
    },
  },
};
