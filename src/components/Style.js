import React from 'react';

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

  export  { CustomTitle,Center,Text } 