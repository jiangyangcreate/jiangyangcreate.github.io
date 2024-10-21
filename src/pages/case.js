import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import React, { Fragment, useEffect, useState } from "react";
import { ShowcaseCard } from "@infinum/docusaurus-theme";

const shuffleArray = (array) =>
  array
    // .map((value) => ({ value, sort: Math.random() })) 随机排序
    // .sort((a, b) => a.sort - b.sort)
    // .map(({ value }) => value);

function ShowcaseGrid() {
  const headingTitle = "ShowCase";
  const publicData = [
    {
      image: useBaseUrl("pages/case/jiangmiemie.webp"),
      title: "jiangmiemie",
      desc: "精巧且开源的个人博客站点。配置生成式 AI 文章总结，个人相册，支持 mermaid 、KaTeX 、交互式思维导图。可使用 GitHub 账号评论，一键分享至 twitter。",
      url: "https://github.com/jiangyangcreate/jiangyangcreate.github.io",
      category: "关于我", 
    },
    {
      image: useBaseUrl("pages/case/readme.webp"),
      title: "Readme",
      desc: "关于我自己的中英介绍，使用jinja模板与文心一言4.0。hash存储文章，去重生成总结、每天定时更新。",
      url: "https://jiangmiemie.com/jiangyangcreate/",
      category: "关于我", 
    },
    {
      image: useBaseUrl("pages/case/pocwatchdog.webp"),
      title: "pocwatchdog",
      desc: "进程管理器，用于定时管理进程，多种组合式定时任务。支持成功发送邮件通知、失败发送邮件通知，可插入附件、图片，自动识别邮箱服务器与端口号。",
      url: "https://github.com/jiangyangcreate/pocwatchdog/",
      category: "模块库", 
    },
    {
      image: useBaseUrl("pages/case/exboard.webp"),
      title: "exboard",
      desc: "Python驱动库，适用于Jetson Orin Nano 和 RK3399 Pro芯片，支持RSS协议（摄像头云台）、数字量模拟量的处理（常见传感器）、i2c协议（控制RGB灯带）、超声波读取、非加密NFC读写。",
      url: "https://github.com/jiangyangcreate/exboard/",
      category: "模块库", 
    },
    {
      image: useBaseUrl("pages/case/SocialMood.webp"),
      title: "SocialMood",
      desc: "纯Python项目。抓取社交媒体平台上的热搜话题，利用机器学习补全数据，结合本地Qwen大模型分析数据，绘制多种图表实现网络舆情深入分析。",
      url: "https://github.com/jiangyangcreate/SocialMood",
      category: "项目DEMO", // 添加分类字段
    },
    {
      image: useBaseUrl("pages/case/WebScreenShare.webp"),
      title: "WebScreenShare",
      desc: "一个全平台通用的网络分享程序，仅需打开浏览器，即可允许你上传与下载文件、媒体共享（可以自由选择屏幕窗口、摄像头、麦克风）。使用JS编写逻辑代码，使用python编写路由映射。",
      url: "https://github.com/jiangyangcreate/WebScreenShare/",
      category: "项目DEMO", // 添加分类字段
    },
    // {
    //   image: useBaseUrl("pages/case/webmodel.webp"),
    //   title: "WebModel",
    //   desc: "纯Python构建的前后端AI模型应用。包含：聊天模型、文生图、实时训练的分类器、基于本地传统算法的鸢尾花分类器",
    //   url: "https://github.com/jiangyangcreate/Webmodel/",
    //   category: "项目DEMO", // 添加分类字段
    // },
    {
      image: useBaseUrl("pages/case/Bluetooth.webp"),
      title: "Bluetooth 小程序",
      desc: "蓝牙遥控最小示例：微信小程序与设备通信（测试设备为ESP32单片机）。支持中文、英文、文件分片传输。",
      url: "https://github.com/jiangyangcreate/WX-Mini-Program/",
      category: "小程序", // 添加分类字段
    },
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
