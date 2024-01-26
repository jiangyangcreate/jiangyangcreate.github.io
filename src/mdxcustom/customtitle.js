import React, { useState, useEffect } from 'react';

// 样式标题h1

const CustomH1Title = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <h1 style={{ whiteSpace: "nowrap", margin: "40px 0 15px 0" }}>{children}</h1>
  </div>
  );

// 样式标题h2
const CustomTitle = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <h2 style={{ whiteSpace: "nowrap", margin: "40px 0 15px 0" }}>{children}</h2>
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

export { CustomTitle, Center, Text, CustomH1Title ,photos };
