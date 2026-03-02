import React, { useState, useCallback } from "react";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});
turndownService.use(gfm);

turndownService.addRule("removeNonContent", {
  filter: (node) => {
    const tag = node.nodeName.toLowerCase();
    return (
      tag === "nav" ||
      tag === "footer" ||
      node.classList?.contains("theme-doc-toc-mobile") ||
      node.classList?.contains("theme-doc-breadcrumbs") ||
      node.classList?.contains("pagination-nav") ||
      node.classList?.contains("post-ai") ||
      node.classList?.contains("copy-markdown-wrap")
    );
  },
  replacement: () => "",
});

turndownService.addRule("keepCodeBlockLanguage", {
  filter: (node) =>
    node.nodeName === "PRE" && node.querySelector("code[class*='language-']"),
  replacement: (_content, node) => {
    const codeEl = node.querySelector("code");
    const langMatch = codeEl.className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : "";
    const code = codeEl.textContent;
    return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
  },
});

export default function CopyMarkdownButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const articleEl =
      document.querySelector("article") ||
      document.querySelector(".markdown");
    if (!articleEl) return;

    const clone = articleEl.cloneNode(true);
    clone.querySelectorAll(".copy-markdown-wrap").forEach((el) => el.remove());
    clone.querySelectorAll("button").forEach((el) => el.remove());
    clone.querySelectorAll(".hash-link").forEach((el) => el.remove());

    const markdown = turndownService.turndown(clone.innerHTML);

    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="copy-markdown-wrap">
      <button
        className="copy-markdown-btn"
        onClick={handleCopy}
        title="复制为 Markdown"
        aria-label="复制为 Markdown"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
        <span>{copied ? "已复制" : "复制为 Markdown"}</span>
      </button>
    </div>
  );
}
