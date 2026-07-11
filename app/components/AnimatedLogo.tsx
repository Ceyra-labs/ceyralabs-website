'use client';

import type { CSSProperties } from 'react';

interface AnimatedLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedLogo({ size = 64, animated = true, className = '', style }: AnimatedLogoProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        borderRadius: '50%', // Makes the background perfectly round
        background: '#ffffff', // Set background to white
        border: '1px solid rgba(0, 0, 0, 0.06)', // Subtle border to help define the circle on white screens
        boxShadow: animated 
          ? '0 8px 24px rgba(0, 0, 0, 0.08), 0 0 20px rgba(255, 107, 0, 0.12)' 
          : '0 2px 8px rgba(0, 0, 0, 0.06)',
        animation: animated ? 'float 5s ease-in-out infinite, pulse-glow 3.5s ease-in-out infinite' : undefined,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: 'inherit',
          border: '1px solid rgba(255, 107, 0, 0.2)', // Adjusted accent ring color for white background
          opacity: animated ? 0.9 : 0.45,
          animation: animated ? 'rotate-slow 18s linear infinite' : undefined,
          pointerEvents: 'none',
        }}
      />
      <img
        src="/ceyora.svg"
        alt="CEYRA LABS logo"
        width={size}
        height={size}
        style={{
          width: '60%', // Scaled down slightly to leave space inside the round circle
          height: '60%',
          objectFit: 'contain',
          display: 'block',
          filter: animated ? 'drop-shadow(0 4px 8px rgba(255, 107, 0, 0.2))' : 'none',
          transform: animated ? 'translateZ(0)' : 'none',
        }}
      />
    </div>
  );
}