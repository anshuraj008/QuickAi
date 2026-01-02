import React from 'react'

const Logo = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 180 45" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Premium gradient */}
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Subtle glow */}
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Elegant geometric icon */}
      <g transform="translate(5, 8)">
        {/* Outer hexagon frame */}
        <path 
          d="M 15 3 L 25 3 L 30 13 L 25 23 L 15 23 L 10 13 Z" 
          fill="none"
          stroke="url(#logoGradient)" 
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Inner lightning/speed marks */}
        <path 
          d="M 20 8 L 18 13 L 21 13 L 19 18" 
          stroke="url(#logoGradient)" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Accent dots */}
        <circle cx="15" cy="13" r="1.5" fill="url(#logoGradient)" opacity="0.7"/>
        <circle cx="25" cy="13" r="1.5" fill="url(#logoGradient)" opacity="0.7"/>
      </g>
      
      {/* Text - Classic & Clean */}
      <text 
        x="48" 
        y="28" 
        fontFamily="'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif" 
        fontSize="24" 
        fontWeight="700"
        letterSpacing="-0.5"
        fill="url(#logoGradient)"
        filter="url(#softGlow)"
      >
        Quick
      </text>
      
      <text 
        x="116" 
        y="28" 
        fontFamily="'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif" 
        fontSize="24" 
        fontWeight="300"
        fill="url(#logoGradient)"
        filter="url(#softGlow)"
      >
        AI
      </text>
      
      {/* Minimal underline accent */}
      <rect 
        x="48" 
        y="32" 
        width="90" 
        height="1.5" 
        fill="url(#logoGradient)"
        opacity="0.3"
        rx="0.75"
      />
    </svg>
  )
}

export default Logo
