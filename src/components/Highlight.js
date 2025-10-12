import React from 'react';

export default function Highlight({children, color = "var(--highlight-color)"}) {
  // 颜色预设映射
  const colorPresets = {
    'r': '#ea6c70',
    'red': '#ea6c70',
    'g': '#48b248',
    'green': '#48b248',
    'b': '#7fc9e0',
    'blue': '#7fc9e0',
  };

  // 如果是预设的简写字母，使用预设颜色，否则使用传入的颜色值
  const backgroundColor = colorPresets[color] || color;

  return (
    <span
      style={{
        backgroundColor: backgroundColor,
        borderRadius: '2px',
        color: '#000',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
} 