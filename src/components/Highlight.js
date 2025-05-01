import React from 'react';

    export default function Highlight({children, color = "var(--highlight-color)"}) {
    return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#000',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
} 