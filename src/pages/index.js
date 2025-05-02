import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React, { useState, useEffect } from "react";
import { useHistory } from "@docusaurus/router";


const CustomSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    const searchInput = document.querySelector(".search-box input");
    if (searchInput) {
      searchInput.value = searchValue;
    }
  }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    history.push(`/search?q=${event.target.value}`);
  };

  // 定义需要循环显示的文本
  const words = ["当前的时间", "Python", "LLM&Agent", "娱乐至死", "Hello, World!"];

  // 用于打字机效果的状态管理
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // 确定当前目标文本，如果是"当前的时间"，则动态获取当前时间
    let fullText =
      words[wordIndex] === "当前的时间"
        ? new Date().toLocaleTimeString()
        : words[wordIndex];

    let delay = isDeleting ? 50 : 150;
    // 当完成打出整个文本时，暂停一段时间再开始删除
    if (!isDeleting && typedText === fullText) {
      delay = 1500;
    }
    // 删除完后，暂停后切换到下一个文本
    if (isDeleting && typedText === "") {
      delay = 1000;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // 正在打字
        if (typedText.length < fullText.length) {
          setTypedText(fullText.substring(0, typedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        // 正在删除
        if (typedText.length > 0) {
          setTypedText(fullText.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex, words]);

  return (
    <input
      className="custom-placeholder"
      type="text"
      value={searchValue}
      onChange={handleSearchChange}
      placeholder={searchValue === "" ? typedText : ""}
      style={{
        width: "70%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  );
};
function MyComponent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "79vh",
      }}
    >
        <style>{`
          .custom-placeholder::-webkit-input-placeholder {
            color: var(--ifm-color-primary);
          }
          .custom-placeholder::-moz-placeholder {
            color: var(--ifm-color-primary);
          }
          .custom-placeholder:-ms-input-placeholder {
            color: var(--ifm-color-primary);
          }
          .custom-placeholder:-moz-placeholder {
            color: var(--ifm-color-primary);
          }
        `}</style>
      <h1
        style={{
          background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "12vmin",
          textShadow: "-2px 2px #3C3C3C, -11px 11px 5px #3C3C3C80",
        }}
      >
        Hello, World!
      </h1>
      <CustomSearch />
    </div>
  );
}

export default function Title() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      description={siteConfig.tagline}
      keywords={siteConfig.customFields.keywords}
      wrapperClassName="es-navbar-white"
    >
      <MyComponent />
    </Layout>
  );
}
