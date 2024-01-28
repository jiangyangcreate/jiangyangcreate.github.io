import React, { useState, useRef, useEffect } from "react";

// 思维导图部分
// 完整文档与修改可参见https://markmap.js.org/
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import { deriveOptions } from "markmap-view";

export default function MarkmapHooks({ initialMarkdown }) {
  const jsonOptions = {
    color: ["#DD551E"],
    initialExpandLevel: 3, //限制展开级别
    maxWidth: 170,
  };

  const markmapOptions = deriveOptions(jsonOptions);
  const t = new Transformer();
  const refSvg = useRef();
  const refTb = useRef();

  useEffect(() => {
    const mm = Markmap.create(refSvg.current, markmapOptions);
    const { root } = t.transform(initialMarkdown);
    mm.setData(root);
    mm.fit();

    const w = refTb.current;
    while (w?.firstChild) w.firstChild.remove();

    if (w) {
      const tb = new Toolbar();
      tb.setBrand(false);
      tb.attach(mm);
      tb.setItems(["fit","zoomIn", "zoomOut", ]);
      w.append(tb.render());
    }
  }, [initialMarkdown]);

  return (
    <div className="flex flex-col h-screen p-2">
      <React.Fragment>
        <svg className="flex-1" style={{ height: '50vh'}} ref={refSvg} />
        <div className="absolute bottom-1 right-1" ref={refTb}></div>
      </React.Fragment>
    </div>
  );
}

// 样式标题h1

const CustomH1Title = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <h1 style={{ whiteSpace: "nowrap", margin: "40px 0 15px 0" }}>
      {children}
    </h1>
  </div>
);

// 样式标题h2
const CustomTitle = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <h2 style={{ whiteSpace: "nowrap", margin: "40px 0 15px 0" }}>
      {children}
    </h2>
  </div>
);

// 居中
const Center = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
);

// 设置颜色
const Text = ({ children, color }) => (
  <span style={{ display: "inline", color: color }}>{children}</span>
);

// 相册部分

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashLink = (id, width, height) =>
  `https://source.unsplash.com/${id}/${width}x${height}.webp`;

const unsplashPhotos = [
  { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
  { id: "twukN12EN7c", width: 1080, height: 694 },
  { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
  { id: "sEXGgun3ZiE", width: 1080, height: 720 },
  { id: "iMchCC-3_fE", width: 1080, height: 610 },
  { id: "GbLS6YVXj0U", width: 1080, height: 810 },
  { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: unsplashLink(photo.id, breakpoint, height),
      width: breakpoint,
      height,
    };
  }),
}));

export { CustomTitle, Center, Text, CustomH1Title, MarkmapHooks, photos };
