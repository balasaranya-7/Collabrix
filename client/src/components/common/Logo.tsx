import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-collabrix-velvet via-collabrix-velvetLight to-collabrix-roseGold/40 border border-collabrix-roseGold/60 flex items-center justify-center shadow-luxury transition-transform group-hover:scale-105">
        <span className="font-serif text-collabrix-roseGlimmer font-bold text-lg select-none">C</span>
        <div className="absolute inset-0 rounded-full border border-collabrix-roseGold/20 animate-pulse"></div>
      </div>
      {!iconOnly && (
        <span className="font-sans font-extrabold tracking-wider text-xl text-collabrix-pearlDust select-none group-hover:text-collabrix-roseGlimmer transition-colors">
          COLLABRIX
        </span>
      )}
    </Link>
  );
};
