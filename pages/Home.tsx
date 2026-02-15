
import React, { useState, useEffect } from 'react';
import { MOCK_MANGAS } from '../constants';
import MangaCard from '../components/MangaCard';
import VIPBadge from '../components/VIPBadge';

const Home: React.FC<{ onMangaClick: (id: string) => void }> = ({ onMangaClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMangas = MOCK_MANGAS.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % featuredMangas.length), 8000);
    return () => clearInterval(timer);
  }, [featuredMangas.length]);

  return (
    <div className="flex flex-col gap-8 pb-20 overflow-hidden">
      {/* Cinematic Compact Hero */}
      <section className="relative h-[420px] md:h-[480px] w-full overflow-hidden bg-brand-black">
        <div 
          className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredMangas.map((manga) => (
            <div key={manga.id} className="relative min-w-full h-full flex items-center justify-center">
              <div className="absolute inset-0">
                <img src={manga.coverImage} className="w-full h-full object-cover opacity-60" alt="Banner" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
              </div>

              <div className="max-w-[1400px] mx-auto px-8 relative w-full flex flex-col justify-center gap-4">
                <div className="flex flex-col gap-2 max-w-xl animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-purple/20 border border-brand-purple/40 text-brand-purple px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">Öne Çıkan</span>
                    {manga.isVIP && <VIPBadge className="scale-90" />}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-xl uppercase">{manga.title}</h1>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-lg mt-1 line-clamp-2">{manga.description}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => onMangaClick(manga.id)} className="bg-brand-purple px-6 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-brand-purple/20">Hemen Oku</button>
                    <button onClick={() => onMangaClick(manga.id)} className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all">Detaylar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 right-8 flex gap-2">
          {featuredMangas.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-brand-purple' : 'w-3 bg-white/20'}`} />
          ))}
        </div>
      </section>

      {/* Main Container - Compact 1400px */}
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-black uppercase tracking-tighter">Popüler Seriler</h2>
            <button className="text-[10px] font-bold text-gray-500 hover:text-brand-purple transition-colors uppercase tracking-widest">Tümünü Gör</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_MANGAS.map(manga => <MangaCard key={manga.id} manga={manga} onClick={() => onMangaClick(manga.id)} />)}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-black uppercase tracking-tighter border-l-4 border-brand-pink pl-3 text-brand-pink">Güncellemeler</h2>
          <div className="flex flex-col gap-3">
            {MOCK_MANGAS.map((manga, i) => (
              <div key={manga.id} className="group flex gap-3 bg-brand-darkGray/30 p-2.5 rounded-xl hover:bg-brand-darkGray/50 transition-all cursor-pointer border border-white/5" onClick={() => onMangaClick(manga.id)}>
                <div className="w-12 h-16 shrink-0 overflow-hidden rounded-lg">
                  <img src={manga.coverImage} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-1 flex-1">
                  <h4 className="font-bold text-[11px] leading-tight line-clamp-1 group-hover:text-brand-purple transition-colors">{manga.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-purple text-[9px] font-black">BÖLÜM {150 + i}</span>
                    <span className="text-[8px] text-gray-600 font-bold">{i + 1}sa</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
