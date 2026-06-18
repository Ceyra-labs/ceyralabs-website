import type { CSSProperties } from 'react';

interface AnimatedLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedLogo({ size = 64, animated = true, className = '', style }: AnimatedLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...(animated ? { animation: 'pulse-glow 3s ease-in-out infinite' } : {}), ...style }}
    >
      <defs>
        <linearGradient id="dragonBodyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CC3D00" />
          <stop offset="35%" stopColor="#FF6B00" />
          <stop offset="70%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FFB74D" />
        </linearGradient>
        <linearGradient id="dragonHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#CC3D00" />
        </linearGradient>
        <filter id="dragonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main body arc — thick C shape, from bottom-left counterclockwise to upper-right */}
      <path
        d="M 50,148 A 68,68 0 1,1 148,52"
        fill="none"
        stroke="url(#dragonBodyGrad)"
        strokeWidth="22"
        strokeLinecap="round"
        filter="url(#dragonGlow)"
        style={animated ? {
          strokeDasharray: 1100,
          strokeDashoffset: 1100,
          animation: 'draw-on 1.6s cubic-bezier(0.4,0,0.2,1) 0.2s forwards',
        } : { strokeDasharray: 'none' }}
      />

      {/* Inner body line — tighter arc for depth/roundness */}
      <path
        d="M 58,148 A 54,54 0 1,1 148,62"
        fill="none"
        stroke="rgba(255,200,100,0.25)"
        strokeWidth="6"
        strokeLinecap="round"
        style={animated ? {
          strokeDasharray: 900,
          strokeDashoffset: 900,
          animation: 'draw-on 1.6s cubic-bezier(0.4,0,0.2,1) 0.5s forwards',
        } : { strokeDasharray: 'none' }}
      />

      {/* Dragon head — upper right, facing right */}
      <g
        style={animated ? {
          opacity: 0,
          animation: 'fade-in 0.4s ease 1.7s forwards',
        } : undefined}
      >
        {/* Head base shape */}
        <path
          d="M 148,52 L 168,44 L 162,62 L 148,60 Z"
          fill="url(#dragonHeadGrad)"
          filter="url(#dragonGlow)"
        />
        {/* Upper jaw / snout */}
        <path
          d="M 162,44 L 175,38 L 174,50 L 163,50 Z"
          fill="#FFB74D"
        />
        {/* Lower jaw */}
        <path
          d="M 162,52 L 172,52 L 168,62 L 158,60 Z"
          fill="#FF8C00"
        />
        {/* Horn */}
        <path
          d="M 160,44 L 157,36 L 165,40 Z"
          fill="#FFB74D"
        />
        {/* Small horn 2 */}
        <path
          d="M 155,46 L 152,39 L 158,43 Z"
          fill="#FF8C00"
        />
        {/* Eye */}
        <circle cx="163" cy="48" r="2.5" fill="#1A0A00" />
        <circle cx="164" cy="47" r="1" fill="#FF6B00" />
        {/* Teeth marks */}
        <path
          d="M 163,52 L 166,56 M 167,52 L 170,56"
          stroke="#FFB74D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* Tail area — lower left, curling inward */}
      <g
        style={animated ? {
          opacity: 0,
          animation: 'fade-in 0.4s ease 1.8s forwards',
        } : undefined}
      >
        {/* Tail curl */}
        <path
          d="M 50,148 Q 48,162 58,165 Q 72,168 72,156 Q 72,148 62,148"
          fill="none"
          stroke="url(#tailGrad)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Tail tip */}
        <path
          d="M 58,165 Q 68,172 74,166 Q 80,160 76,154"
          fill="none"
          stroke="#CC3D00"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Speed lines inside C */}
        <path
          d="M 68,130 Q 62,118 68,108"
          fill="none"
          stroke="rgba(255,107,0,0.5)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 60,138 Q 50,124 58,110"
          fill="none"
          stroke="rgba(255,107,0,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
