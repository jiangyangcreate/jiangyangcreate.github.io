import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import React, { Fragment, useEffect, useState } from "react";
import { ShowcaseCard } from "@infinum/docusaurus-theme";

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

function ShowcaseGrid() {
  const headingTitle = "ShowCase";
  const publicData = [
    {
      image: useBaseUrl("pages/case/jiangmiemie.webp"),
      label: "jiangmiemie",
      desc: "精巧且开源的个人博客站点。配置生成式 AI 文章总结，个人相册，支持 mermaid 、KaTeX 、交互式思维导图。可使用 GitHub 账号评论，一键分享至 twitter。",
      link: "https://github.com/jiangyangcreate/jiangyangcreate.github.io",
    },
    {
      image: useBaseUrl("pages/case/readme.webp"),
      label: "Readme",
      desc: "关于我自己的一些介绍，使用jinja模板与文心一言4.0总结，每天定时更新。",
      link: "https://jiangmiemie.com/jiangyangcreate/",
    },
    {
      image: useBaseUrl("pages/case/Bluetooth.webp"),
      label: "Bluetooth 小程序",
      desc: "蓝牙遥控最小示例：微信小程序与设备通信（测试设备为ESP32单片机）。支持中文、英文、文件分片传输。",
      link: "https://github.com/jiangyangcreate/WX-Mini-Program/",
    },
  ];

  // https://reactjs.org/docs/react-dom.html#hydrate
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const items = shuffleArray(publicData).map((item, index) => {
    const { image, label, link, desc } = item;
    //academy.infinum.com/
    https: return (
      <ShowcaseCard
        key={index}
        url={link}
        imageUrl={image}
        imageAlt={label}
        title={label}
        description={desc}
      />
    );
  });

  return (
    // key={isClient ? 1 : 2} will trigger a rerender of the whole subtree and the images will be aligned with text
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
      {/* <p className="es-big-subtitle es-text-center es-h-center">
        {headingSubtitle}
      </p> */}
      <div className="es-showcase-grid">{items}</div>
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
