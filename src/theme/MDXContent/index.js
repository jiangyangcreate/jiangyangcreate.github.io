import React from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@theme/MDXComponents";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
export default function MDXContent({ children }) {
  const metadata = children.type.metadata;
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const shareurl =
    siteConfig.url +
    encodeURIComponent(metadata.permalink).replace(/%2F/g, "/"); // 不转义斜杠,让分享呈现卡片视图;

  let editUrl = metadata.source.replace(
    "@site",
    "https://github.com/jiangyangcreate/jiangyangcreate.github.io/blob/main"
  );

  return (
    <>
      <MDXProvider components={MDXComponents}>{children}</MDXProvider>

      <div
        className="margin-vert--lg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a
          className="button button--link"
          href={`${editUrl}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="edit on github"
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            height={20}
            width={20}
            style={{ marginRight: 7 }}
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="url(#grad1)"
              stroke="none"
            >
              <path
                d="M2384 5060 c-1012 -69 -1891 -738 -2235 -1703 -53 -146 -102 -349
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
              655 -173 1219 -1151 2131 -2373 2215 -161 11 -175 11 -339 0z"
              />
            </g>
          </svg>
        </a>

        <a
          className="button button--link"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `${shareurl}`
          )}&text=${encodeURIComponent(
            `我刚刚读了 "${metadata.title}" by @jiangyangcreate`
          )}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="share on twitter"
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            height={20}
            width={20}
            style={{ marginRight: 7 }}
          >
            <g fill="url(#grad1)">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </a>
        <a
          className="button button--link"
          href={`${siteConfig.url}/blog/rss.xml`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="rss reader link"
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 16 16"
            height={20}
            width={20}
            style={{ marginRight: 7 }}
          >
            <g fill="url(#grad1)">
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#D8262C", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#E6B800", stopOpacity: 1 }}
                />
              </linearGradient>
              <circle cx="3" cy="13" r="2"></circle>
              <path d="M1 5.667v2.667A6.674 6.674 0 0 1 7.667 15h2.666c0-5.146-4.187-9.333-9.333-9.333z"></path>
              <path d="M1 1v2.667C7.25 3.667 12.334 8.75 12.334 15H15C15 7.28 8.72 1 1 1z"></path>
            </g>
          </svg>
        </a>

        <a
          className="button button--link"
          href="mailto:jiangyangcreate@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="send email"
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1024 1024"
            style={{ marginRight: 7, height: 20, width: 20 }}
          >
            <g>
              <path
                style={{ opacity: 0.996, fill: "url(#grad1)" }}
                d="M 243.5,420.5 C 189.523,379.185 135.857,337.518 82.5,295.5C 140.987,183.298 229.487,104.632 348,59.5C 432.42,30.213 518.587,23.713 606.5,40C 693.576,57.6997 769.243,96.6997 833.5,157C 787.833,202.667 742.167,248.333 696.5,294C 695.5,294.667 694.5,294.667 693.5,294C 642.378,246.775 581.711,222.942 511.5,222.5C 407.283,227.337 327.117,273.337 271,360.5C 259.938,379.624 250.771,399.624 243.5,420.5 Z"
              />
            </g>
            <g>
              <path
                style={{ opacity: 0.996, fill: "url(#grad1)" }}
                d="M 82.5,295.5 C 135.857,337.518 189.523,379.185 243.5,420.5C 223.5,481.168 223.5,541.835 243.5,602.5C 189.523,643.815 135.857,685.482 82.5,727.5C 31.7513,624.612 18.5846,516.945 43,404.5C 51.5465,366.35 64.7132,330.016 82.5,295.5 Z"
              />
            </g>
            <g>
              <path
                style={{ opacity: 0.998, fill: "url(#grad1)" }}
                d="M 829.5,876.5 C 777.833,835.833 726.167,795.167 674.5,754.5C 725.318,718.61 756.985,669.944 769.5,608.5C 683.503,607.5 597.503,607.167 511.5,607.5C 511.5,546.167 511.5,484.833 511.5,423.5C 662.5,423.5 813.5,423.5 964.5,423.5C 979.017,509.532 974.517,594.532 951,678.5C 928.206,755.703 887.706,821.703 829.5,876.5 Z"
              />
            </g>
            <g>
              <path
                style={{ opacity: 0.997, fill: "url(#grad1)" }}
                d="M 243.5,602.5 C 274.71,690.744 334.043,751.577 421.5,785C 487.78,805.861 553.78,804.861 619.5,782C 638.723,774.388 657.056,765.222 674.5,754.5C 726.167,795.167 777.833,835.833 829.5,876.5C 762.129,936.339 683.462,972.839 593.5,986C 437.233,1008.45 300.566,967.451 183.5,863C 141.888,823.583 108.222,778.416 82.5,727.5C 135.857,685.482 189.523,643.815 243.5,602.5 Z"
              />
            </g>
          </svg>
        </a>
      </div>
    </>
  );
}
