
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-purple blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-brand-darkGray p-2 rounded-lg border border-brand-purple/50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 speed-lines"></div>
          <span className="text-white font-anime text-2xl relative z-10 leading-none">G</span>
        </div>
      </div>
      <span className="text-2xl font-anime tracking-wider">
        <span className="text-brand-purple">Gürcü</span>
        <span className="text-brand-pink">Manga</span>
      </span>
    </div>
  );
};

export default Logo;
