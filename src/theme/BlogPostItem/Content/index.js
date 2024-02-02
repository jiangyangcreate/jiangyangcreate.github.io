import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { blogPostContainerID } from "@docusaurus/utils-common";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import MDXContent from "@theme/MDXContent";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const TypingComponent = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      setDisplayedText((prevText) => {
        if (index < text.length) {
          return prevText + text[index++];
        } else {
          clearInterval(typingInterval);
          return prevText;
        }
      });
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <>{displayedText}</>;
};

const JsonReader = ({
  fieldToMatch,
}) => {
  const url = "https://raw.githubusercontent.com/jiangyangcreate/jiangyangcreate/master/output.json";
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchData();
  }, [url]);

  const getFieldData = () => {
    if (!jsonData) {
      return '本文章暂未生成摘要，24小时后再来看看吧';
    }
    // 根据字段进行匹配
    const matchingField = jsonData[fieldToMatch]["summary"];
    return (
      <>
      <TypingComponent text={matchingField} speed={100} />
      </>
    );
  };

  return <>{getFieldData()}</>;
};

const Aisummary = ({ children }) => (
  <div class="post-ai">
    <div class="ai-title">
      <a
        class="ai-title-left"
        href="/blog/2024/1/31/"
        title="查看详情"
        data-pjax-state=""
      >
        <div class="ai-title-text">文章摘要</div>
      </a>
    </div>
    <div class="ai-explanation" style={{ display: "block" }}>
      <JsonReader fieldToMatch = {children}/>
    </div>
    <div class="ai-suggestions"></div>
    <div class="ai-bottom">
      <div class="ai-tips">此内容根据文章生成，仅用于文章内容的解释与总结</div>
    </div>
  </div>
);

export default function BlogPostItemContent({ children, className }) {
  const { isBlogPostPage } = useBlogPost();
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const pageurl = siteConfig.url + children.type.metadata.permalink;
  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx("markdown", className)}
      itemProp="articleBody"
    >
      <Aisummary children={pageurl} />
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
