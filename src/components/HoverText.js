import React, { useState } from 'react';

export default function HoverText({ text, explanation }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        style={{ 
          textDecoration: 'underline', 
          cursor: 'pointer',
          color: '#1877F2'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {text}
      </span>
      
      {isHovering && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '250px',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          {explanation}
        </div>
      )}
    </span>
  );
} 