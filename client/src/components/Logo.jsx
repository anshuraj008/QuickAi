import React from 'react'

const Logo = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 160 50" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Elegant gradient */}
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#c026d3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Crisp shadow */}
        <filter id="crisp">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium Typography */}
      <text 
        x="5" 
        y="32" 
        fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
        fontSize="28" 
        fontWeight="600"
        letterSpacing="0.5"
        fill="url(#logoGradient)"
        filter="url(#crisp)"
      >
        Quick
      </text>
      
      <text 
        x="95" 
        y="32" 
        fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
        fontSize="28" 
        fontWeight="400"
        letterSpacing="1.5"
        fill="url(#logoGradient)"
        filter="url(#crisp)"
      >
        AI
      </text>
    </svg>
  )
}

export default Logo
