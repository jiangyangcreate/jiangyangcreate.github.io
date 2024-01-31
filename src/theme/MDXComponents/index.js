import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import MarkmapHooks from '@site/src/components/MarkmapHooks';
import { PhotoAlbums } from '@site/src/components/PhotoAlbums';


// 样式标题
const CustomTitle = ({ children, level = "h2"}) => (
  <div style={{ display: "flex", justifyContent: "center", whiteSpace: "nowrap", margin: "40px 0 15px 0" }}>
    {React.createElement(level, null, children)}
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

export default {
  // 复用默认的映射
  ...MDXComponents,
  CustomTitle,
  Center,
  Text,
  PhotoAlbums,
  MarkmapHooks,
};