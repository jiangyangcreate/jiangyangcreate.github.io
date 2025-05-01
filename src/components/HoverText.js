import React, { useState } from 'react';

export default function HoverText({ text, explanation }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        style={{ 
          background: 'linear-gradient(transparent 70%, #FFFF00 30%)',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {text}
        <sup style={{ 
          color: 'red',
          fontSize: '0.7em',
          marginLeft: '2px',
          fontWeight: 'bold'
        }}>?</sup>
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
            textAlign: 'left',
            fontSize: '0.9rem',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          {explanation}
        </div>
      )}
    </span>
  );
}