import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import { useHistory } from "@docusaurus/router";
import React, { useState } from "react";

// 满幅背景照片。换图只需改这一行（相簿里任意横幅照片均可）。图片由外部服务托管。
const HERO_PHOTO = "https://ai.jiangmiemie.com/static/gallery/2022085-1920-1080.webp";

function SearchBar() {
  const [value, setValue] = useState("");
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) history.push(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={onSubmit} className="jm-search" role="search">
      <span className="jm-search__prefix" aria-hidden>/</span>
      <input
        className="jm-search__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="搜索全站"
        aria-label="搜索全站"
      />
      <kbd className="jm-search__kbd">⌘K</kbd>
    </form>
  );
}

// 单屏 Hero：满幅照片 + 左下压大字。延续 case 页「大字压图」的语言。
// 入场动效只发生一次：照片缓缓显影、文字逐行上推、琥珀金细线画入。
function Hero() {
  const photo = useBaseUrl(HERO_PHOTO);
  return (
    <section className="jm-hero">
      <div
        className="jm-hero__photo"
        style={{ backgroundImage: `url("${photo}")` }}
        aria-hidden
      />
      <div className="jm-hero__scrim" aria-hidden />

      <div className="jm-hero__content">
        {/* 文案均为占位，沿用你已写好的内容；结构定死后由你亲自润色。 */}
        <span className="jm-hero__eyebrow" style={{ "--i": 0 }}>
          <span className="jm-hero__pulse" aria-hidden />
          ShenZhen · China
        </span>

        <p className="jm-hero__tagline" style={{ "--i": 2 }}>真实的记录自己</p>

        <span className="jm-hero__line" style={{ "--i": 3 }} aria-hidden />

        <p className="jm-hero__handle" style={{ "--i": 4 }}>比获得他人的认同感更重要</p>
        <p className="jm-hero__meta" style={{ "--i": 5 }}>Python · C · Chinese · English</p>

        <div className="jm-hero__search" style={{ "--i": 6 }}>
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

function HomeStyles() {
  return (
    <style>{`
      .jm-home {
        --jm-pad-x: 5.56vw;
        /* 字压在暗色照片上：亮/暗模式都用同一组浅色文字与亮琥珀金点缀 */
        --jm-on-photo: #f6f1e8;
        --jm-on-photo-mute: rgba(246, 241, 232, 0.66);
        --jm-amber-on-photo: #f3b53f;
        font-family: neue-haas-grotesk-text, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      .jm-home a { text-decoration: none; }

      /* === HERO 单屏 === */
      .jm-hero {
        position: relative;
        overflow: hidden;
        min-height: calc(100vh - var(--ifm-navbar-height, 4rem));
        display: flex;
        align-items: flex-end;
        isolation: isolate;
        background: #1a1410;
      }

      .jm-hero__photo {
        position: absolute;
        inset: 0;
        z-index: -2;
        background-size: cover;
        background-position: 50% 42%;
        will-change: transform, opacity, filter;
        animation: jm-photo-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      /* 渐变压暗罩：左下最重，向右上渐隐，保证白字可读、同时透出晚霞金色 */
      .jm-hero__scrim {
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
          linear-gradient(to top right,
            rgba(18, 12, 6, 0.82) 0%,
            rgba(18, 12, 6, 0.45) 38%,
            rgba(18, 12, 6, 0.12) 68%,
            rgba(18, 12, 6, 0.04) 100%),
          linear-gradient(to top,
            rgba(18, 12, 6, 0.55) 0%,
            transparent 42%);
        animation: jm-fade 1.8s ease-out both;
      }
      [data-theme="dark"] .jm-hero__scrim {
        background:
          linear-gradient(to top right,
            rgba(8, 6, 3, 0.88) 0%,
            rgba(8, 6, 3, 0.55) 38%,
            rgba(8, 6, 3, 0.2) 68%,
            rgba(8, 6, 3, 0.08) 100%),
          linear-gradient(to top,
            rgba(8, 6, 3, 0.65) 0%,
            transparent 42%);
      }

      .jm-hero__content {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 60rem;
        padding: 0 var(--jm-pad-x) clamp(3rem, 8vh, 6rem);
        color: var(--jm-on-photo);
      }

      /* 逐行上推：每个元素用 --i 错峰，只在入场播放一次 */
      .jm-hero__content > * {
        animation: jm-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: calc(0.5s + var(--i, 0) * 0.12s);
      }

      .jm-hero__eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 0.8rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--jm-on-photo-mute);
        margin-bottom: clamp(1rem, 2.4vw, 1.6rem);
      }
      .jm-hero__pulse {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--jm-amber-on-photo);
        box-shadow: 0 0 0 0 color-mix(in srgb, var(--jm-amber-on-photo) 60%, transparent);
        animation: jm-pulse 2.6s ease-out infinite;
      }

      .jm-hero__handle {
        font-family: neue-haas-grotesk-display, Arial, sans-serif;
        font-weight: 500;
        font-size: clamp(1.1rem, 2.1vw, 1.7rem);
        letter-spacing: 0.01em;
        margin: clamp(0.5rem, 1.2vw, 0.9rem) 0 0;
        color: var(--jm-amber-on-photo);
      }

      /* 琥珀金细线：唯一的「手势」，入场时由左向右画出 */
      .jm-hero__line {
        display: block;
        width: clamp(3rem, 8vw, 6rem);
        height: 2px;
        margin: clamp(1.3rem, 2.6vw, 1.9rem) 0 clamp(1.1rem, 2.2vw, 1.6rem);
        background: var(--jm-amber-on-photo);
        transform-origin: left center;
      }
      .jm-hero__line {
        animation: jm-line-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: calc(0.5s + 3 * 0.12s);
      }

      .jm-hero__tagline {
        font-size: clamp(1.05rem, 1.8vw, 1.35rem);
        line-height: 1.5;
        color: var(--jm-on-photo);
        margin: 0;
      }
      .jm-hero__meta {
        font-size: 0.84rem;
        letter-spacing: 0.04em;
        color: var(--jm-on-photo-mute);
        margin: 0.5rem 0 0;
      }

      .jm-hero__search { margin-top: clamp(1.8rem, 3.5vw, 2.6rem); }

      /* === SEARCH（玻璃质感，压在照片上） === */
      .jm-search {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        max-width: 30rem;
        padding: 0.8rem 1.1rem;
        border: 1px solid rgba(246, 241, 232, 0.28);
        border-radius: 12px;
        background: rgba(20, 14, 8, 0.28);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
      }
      .jm-search:focus-within {
        border-color: var(--jm-amber-on-photo);
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--jm-amber-on-photo) 22%, transparent);
        background: rgba(20, 14, 8, 0.42);
      }
      .jm-search__prefix {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        color: var(--jm-amber-on-photo);
        font-weight: 700;
      }
      .jm-search__input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: var(--jm-on-photo);
        font: inherit;
        font-size: 1rem;
      }
      .jm-search__input::placeholder { color: var(--jm-on-photo-mute); opacity: 1; }
      .jm-search__kbd {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.74rem;
        color: var(--jm-amber-on-photo);
        border: 1px solid rgba(246, 241, 232, 0.28);
        border-radius: 6px;
        padding: 0.12rem 0.45rem;
      }

      /* === 动效关键帧 === */
      @keyframes jm-photo-in {
        from { opacity: 0; transform: scale(1.06); filter: blur(10px); }
        to   { opacity: 1; transform: scale(1);    filter: blur(0); }
      }
      @keyframes jm-fade {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes jm-rise {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes jm-line-in {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      @keyframes jm-pulse {
        0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--jm-amber-on-photo) 55%, transparent); }
        70%  { box-shadow: 0 0 0 8px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
      }

      @media (max-width: 600px) {
        .jm-hero__photo { background-position: 58% 42%; }
      }

      @media (prefers-reduced-motion: reduce) {
        .jm-hero__photo,
        .jm-hero__scrim,
        .jm-hero__content > *,
        .jm-hero__line,
        .jm-hero__pulse {
          animation: none !important;
        }
        .jm-search { transition: none !important; }
      }
    `}</style>
  );
}

export default function Home() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomeStyles />
      <main className="jm-home">
        <Hero />
      </main>
    </Layout>
  );
}
