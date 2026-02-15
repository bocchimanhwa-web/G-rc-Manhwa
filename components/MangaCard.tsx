
import React from 'react';
import { Manga } from '../types';
import VIPBadge from './VIPBadge';

interface MangaCardProps {
  manga: Manga;
  onClick: () => void;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col gap-3"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.03] group-hover:-translate-y-2">
        <img 
          src={manga.coverImage} 
          alt={manga.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Tags */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {manga.isVIP && <VIPBadge />}
          <div className="bg-brand-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border border-white/10">
            <span className="text-brand-pink">★</span> {manga.rating}
          </div>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="bg-brand-purple px-2 py-0.5 rounded text-[10px] font-bold uppercase">
            {manga.chaptersCount} Chapters
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-brand-purple transition-colors">
          {manga.title}
        </h3>
        <p className="text-[10px] text-gray-500 line-clamp-1">
          {manga.genres.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default MangaCard;
