import React from 'react';
import { Palette } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Palette className="text-pink-500 mr-2" />
      <span className="font-bold text-xl tracking-tight">Rafim<span className="text-pink-500">.</span></span>
    </div>
  );
};

export default Logo;