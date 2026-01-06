
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32, animated = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-2xl ${animated ? 'animate-scale-pop' : ''}`}
      >
        {/* Back Layer (Purple) */}
        <rect 
          x="4" y="4" width="16" height="16" rx="4" 
          className="fill-purple-600/50" 
          transform="rotate(-10 12 12)"
        />
        {/* Middle Layer (Brand Blue) */}
        <rect 
          x="4" y="4" width="16" height="16" rx="4" 
          className="fill-brand-500/80" 
          transform="rotate(-5 12 12)"
        />
        {/* Top Layer (White - The Play Canvas) */}
        <rect 
          x="4" y="4" width="16" height="16" rx="4" 
          className="fill-white" 
        />
        {/* Play Icon Cutout */}
        <path 
          d="M10 8.5V15.5L15.5 12L10 8.5Z" 
          className="fill-brand-600" 
        />
      </svg>
    </div>
  );
};

export default Logo;
