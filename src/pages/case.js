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
      desc: "这是一个基于 Docusaurus 3 的自定义站点 , 希望你喜欢这个小巧而吸引人的网站。",
      link: "https://jiangmiemie.com/",
    },
    {
      image: useBaseUrl("pages/case/docusaurus.webp"),
      label: "Docusaurus",
      desc: "如果你对Docusaurus感兴趣，可以系统学习Docusaurus教程。",
      link: "https://docusaurus.io/",
    },
    {
      image: useBaseUrl("pages/case/academy.webp"),
      label: "academy",
      desc: "本站点的设计参考了infinum主题，建议每个设计网页的人都参观一下他们干净简洁的站点。",
      link: "https://academy.infinum.com/",
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
