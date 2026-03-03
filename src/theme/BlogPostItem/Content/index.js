import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { blogPostContainerID } from "@docusaurus/utils-common";
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import MDXContent from "@theme/MDXContent";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const TypingComponent = ({ text, speed = 100 }) => {
  const safeText = text || '摘要生成中...';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      setDisplayedText((prevText) => {
        if (index < safeText.length) {
          return prevText + safeText[index++];
        } else {
          clearInterval(typingInterval);
          return prevText;
        }
      });
    }, speed);

    return () => clearInterval(typingInterval);
  }, [safeText, speed]);

  return <>{displayedText}</>;
};

const JsonReader = ({
  fieldToMatch,
}) => {
  // 替换url与/
  const path = fieldToMatch.replace(/https:\/\/jiangmiemie.com\//, "").replace(/\//g, "_");
  const url = `https://chat.jiangyang.fun/static/summary/${path}.json`;
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) return;
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        // fetch failed, keep jsonData as null to show fallback text
      }
    };

    fetchData();
  }, [url]);

  const getFieldData = () => {
    if (!jsonData) {
      return <TypingComponent text='摘要生成中...' speed={100} />;
    }
    // 根据字段进行匹配
    const matchingField = jsonData["summary"];
    return (
      <>
      <TypingComponent text={matchingField} speed={100} />
      </>
    );
  };

  return <>{getFieldData()}</>;
};

const Aisummary = ({ children }) => (
  <div className="post-ai">
    <div className="ai-title">
      <a
        className="ai-title-left"
        href="/blog/2024/1/31/"
        title="查看详情"
        data-pjax-state=""
      >
        <div className="ai-title-text">文章摘要</div>
      </a>
    </div>
    <div className="ai-explanation" style={{ display: "block" }}>
      <JsonReader fieldToMatch={children} />
    </div>
    <div className="ai-suggestions"></div>
    <div className="ai-bottom">
      <div className="ai-tips">此内容根据文章生成，仅用于文章内容的解释与总结</div>
    </div>
  </div>
);

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const AiPodcast = ({ pageurl }) => {
  const path = pageurl.replace(/https:\/\/jiangmiemie.com\//, "").replace(/\//g, "_");
  const audioUrl = `https://chat.jiangyang.fun/static/summary/${path}.mp3`;

  const audioRef = useRef(null);
  const [available, setAvailable] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleLoaded = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAvailable(true);
    }
  }, []);

  const handleError = useCallback(() => {
    setAvailable(false);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleEnded = useCallback(() => setPlaying(false), []);

  const handleSeek = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  }, [duration]);

  if (available === false) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        // 如果需要操作音频，确保audio标签通过CORS校验缓存数据
        // crossOrigin="anonymous"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
        onError={handleError}
      />
      {available === true && (
    <div className="post-ai podcast-player">
      <div className="ai-title">
        <div className="ai-title-left">
          <div className="ai-title-text">AI 对谈</div>
        </div>
      </div>
      <div className="podcast-controls">
        <button
          className="podcast-play-btn"
          onClick={togglePlay}
          aria-label={playing ? "暂停" : "播放"}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="podcast-progress-wrap" onClick={handleSeek}>
          <div className="podcast-progress-bar">
            <div className="podcast-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="podcast-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <div className="ai-bottom">
        <div className="ai-tips">AI 根据文章生成的播客对话，仅供参考</div>
      </div>
    </div>
      )}
    </>
  );
};

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
      <AiPodcast pageurl={pageurl} />
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
