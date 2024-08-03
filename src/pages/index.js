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

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={handleSearchChange}
      placeholder={date.toLocaleTimeString()}
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
      <h1
        style={{
          textShadow: "-1px 1px #3C3C3C, -10px 10px 5px #3C3C3C80",
          fontSize: "12vmin",
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
