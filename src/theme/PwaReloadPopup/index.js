import React from "react";

export default function PwaReloadPopup({ onReload }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        padding: "0.75rem 1.25rem",
        borderRadius: "8px",
        background: "#21232a",
        color: "#fff",
        border: "1px solid #3d3d3f",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "14px",
      }}
    >
      <span>站点已更新</span>
      <button
        onClick={onReload}
        style={{
          background: "#ffc848",
          color: "#21232a",
          border: "none",
          borderRadius: "4px",
          padding: "4px 12px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        刷新
      </button>
    </div>
  );
}
