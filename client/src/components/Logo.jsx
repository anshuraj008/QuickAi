import React from 'react'

const Logo = ({ className = "w-32 sm:w-44" }) => {
  return (
    <svg 
      viewBox="0 0 200 50" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background glow effect */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* AI Icon/Symbol */}
      <g transform="translate(5, 8)">
        {/* Brain/Neural network symbol */}
        <circle cx="17" cy="17" r="15" fill="url(#gradient1)" opacity="0.2"/>
        <circle cx="17" cy="17" r="12" fill="none" stroke="url(#gradient1)" strokeWidth="2" filter="url(#glow)"/>
        
        {/* Neural connections */}
        <g stroke="url(#gradient2)" strokeWidth="1.5" fill="none">
          <circle cx="17" cy="10" r="2" fill="url(#gradient1)"/>
          <circle cx="17" cy="24" r="2" fill="url(#gradient1)"/>
          <circle cx="10" cy="17" r="2" fill="url(#gradient1)"/>
          <circle cx="24" cy="17" r="2" fill="url(#gradient1)"/>
          <circle cx="17" cy="17" r="2.5" fill="url(#gradient1)"/>
          
          <line x1="17" y1="10" x2="17" y2="14.5"/>
          <line x1="17" y1="19.5" x2="17" y2="24"/>
          <line x1="10" y1="17" x2="14.5" y2="17"/>
          <line x1="19.5" y1="17" x2="24" y2="17"/>
        </g>
        
        {/* Lightning bolt for "Quick" */}
        <path 
          d="M 20 8 L 16 17 L 19 17 L 15 26" 
          stroke="url(#gradient2)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </g>
      
      {/* Text "Quick AI" */}
      <text 
        x="45" 
        y="28" 
        fontFamily="'Outfit', sans-serif" 
        fontSize="20" 
        fontWeight="700" 
        fill="url(#gradient2)"
        letterSpacing="0.5"
      >
        Quick
      </text>
      
      <text 
        x="110" 
        y="28" 
        fontFamily="'Outfit', sans-serif" 
        fontSize="20" 
        fontWeight="800" 
        fill="url(#gradient2)"
        letterSpacing="1"
      >
        AI
      </text>
      
      {/* Subtitle/Tagline */}
      <text 
        x="45" 
        y="38" 
        fontFamily="'Outfit', sans-serif" 
        fontSize="7" 
        fontWeight="500" 
        fill="url(#gradient1)"
        opacity="0.7"
        letterSpacing="1.5"
      >
        POWERED BY INTELLIGENCE
      </text>
    </svg>
  )
}

export default Logo
