import React from 'react'

const Logo = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 195 50" 
      className={`h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Primary Radiant Gradient for Logo */}
        <linearGradient id="gcPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#c026d3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        </linearGradient>

        {/* Secondary Cyan/Indigo Accent Gradient */}
        <linearGradient id="gcCyanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#38bdf8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
        </linearGradient>

        {/* Crisp Icon Glow Filter */}
        <filter id="gcGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft Shadow Filter for Emblem */}
        <filter id="gcShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#c026d3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Modern Iconic Mark: Interlocking Dynamic 'G' Prism Badge */}
      <g transform="translate(4, 5)" filter="url(#gcShadow)">
        {/* Background Shield */}
        <rect x="0" y="0" width="40" height="40" rx="12" fill="url(#gcPrimaryGrad)" opacity="0.12" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="url(#gcPrimaryGrad)" strokeWidth="1.2" fill="none" opacity="0.3" />

        {/* Outer Curved Ribbon Loop forming 'G' */}
        <path 
          d="M 28 13 C 24.5 9 17.5 8.5 13 12 C 8.5 15.5 8 22.5 11.5 26.5 C 15 30.5 22 31.5 26 28 C 28.5 25.8 29.5 22 29.5 19.5 H 18.5" 
          fill="none" 
          stroke="url(#gcPrimaryGrad)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          filter="url(#gcGlow)"
        />

        {/* Inner Accent Core */}
        <path 
          d="M 18.5 19.5 H 24.5" 
          stroke="url(#gcCyanGrad)" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
        />

        {/* Floating Craft Spark Starburst */}
        <path 
          d="M 29 5 Q 29 9.5 33.5 9.5 Q 29 9.5 29 14 Q 29 9.5 24.5 9.5 Q 29 9.5 29 5 Z" 
          fill="url(#gcCyanGrad)" 
        />
      </g>

      {/* Brand Typography: Razor-Sharp, Clean & Readable */}
      <g transform="translate(52, 33)">
        {/* "Gen" in Sharp Radiant Gradient */}
        <text 
          x="0" 
          y="0" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="26" 
          fontWeight="700"
          letterSpacing="-0.2"
          fill="url(#gcPrimaryGrad)"
        >
          Gen
        </text>

        {/* "Craft" in Clean High-Contrast Font */}
        <text 
          x="51" 
          y="0" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="26" 
          fontWeight="600"
          letterSpacing="-0.2"
          fill="currentColor"
          className="text-slate-900 dark:text-slate-100 transition-colors duration-300"
        >
          Craft
        </text>
      </g>
    </svg>
  )
}

export default Logo
