import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import React, { Fragment, useEffect, useState } from "react";
import { ShowcaseCard } from "@infinum/docusaurus-theme";


function ShowcaseGrid() {
  const headingTitle = "ShowCase";
  const publicData = [
    {
      image: useBaseUrl("pages/case/jiangmiemie.webp"),
      title: "jiangmiemie",
      desc: "精巧且开源的个人博客站点。配置生成式 AI 文章总结、问答、播客。内置相册，支持 mermaid 、KaTeX 、交互式思维导图。可使用 GitHub 账号评论。",
      url: "https://github.com/jiangyangcreate/jiangyangcreate.github.io",
      category: "维护中", 
    },
    {
    image: useBaseUrl("pages/case/etool.webp"),
    title: "etool",
    desc: "30 多种常用工具集合库，包含：一行代码进程定时监听、发送邮件；PDF、excel、word、图片等常用处理等",
    url: "https://github.com/jiangyangcreate/etool/",
    category: "维护中", 
    },
      {
      image: useBaseUrl("pages/case/halo-theme-2020.webp"),
      title: "halo-theme-2020",
      desc: "2020年，我使用halo博客框架，在xue主题上二次开发了我的个人博客主题，适配 Halo 最新 1.5.5 版本 修复网易云音乐。",
      url: "https://github.com/jiangyangcreate/halo-theme-2020/",
      category: "存档项目", 
    },
    {
      image: useBaseUrl("pages/case/exboard.webp"),
      title: "exboard",
      desc: "适用于NVIDIA Jetson Orin Nano 外接 RaspberryPi Sensor Board 拓展板的 Python 库，支持RSS协议控制摄像头云台、常见传感器的数字量模拟量处理、i2c协议控制RGB灯带、超声波读取、非加密NFC读写。",
      url: "https://github.com/jiangyangcreate/exboard/",
      category: "存档项目", 
    }
  ];

  // https://reactjs.org/docs/react-dom.html#hydrate
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const groupedData = publicData.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedData);

  return (
    <Fragment key={isClient ? 1 : 2}>
    <h1
      className="es-big-title es-h-center"
      style={{
        backgroundImage: 'url("/pages/case/sky.webp")',
        backgroundPosition: "50% 50%",
      }}
    >
      {headingTitle}
    </h1>

    {categories.map((category) => (
      <Fragment key={category}>
        <h2 className="es-h-center">{category}</h2>
        <div className="es-showcase-grid">
          {groupedData[category].map((item, idx) => (
            <ShowcaseCard
              key={idx}
              url={item.url}
              imageUrl={item.image}
              imageAlt={item.title}
              title={item.title}
              description={item.desc}
            />
          ))}
        </div>
      </Fragment>
    ))}
  </Fragment>
  );
}

export default function Showcase() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title="Showcase"
      description={siteConfig.tagline}
      keywords={siteConfig.customFields.keywords}
      metaImage={useBaseUrl(`img/${siteConfig.customFields.image}`)}
      wrapperClassName="es-navbar-white"
    >
      <ShowcaseGrid />
    </Layout>
  );
}
