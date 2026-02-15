
import React, { useState, useEffect } from 'react';
import { MOCK_CHAPTERS, MOCK_MANGAS } from '../constants';
import { Chapter } from '../types';
import VIPBadge from '../components/VIPBadge';

interface ReaderProps {
  chapterId: string;
  userChapters: Chapter[];
  onComplete?: () => void;
  onExit: () => void;
}

const Reader: React.FC<ReaderProps> = ({ chapterId, userChapters, onComplete, onExit }) => {
  // Try to find the chapter in user uploads first, then mock data
  const chapter = userChapters.find(c => c.id === chapterId) || MOCK_CHAPTERS.find(c => c.id === chapterId);
  const isComingSoon = !userChapters.find(c => c.id === chapterId);
  
  const manga = MOCK_MANGAS.find(m => m.id === chapter?.mangaId) || MOCK_MANGAS[0];
  
  const [theme, setTheme] = useState<'black' | 'gray' | 'sepia'>('black');
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState<'chapters' | 'comments' | 'source' | null>(null);
  const [currentTeam, setCurrentTeam] = useState(chapter?.teamName || manga.availableTeams[0]);
  const [showReward, setShowReward] = useState(false);
  const [hasReceivedPoints, setHasReceivedPoints] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShowReward(false);
    setHasReceivedPoints(false);
    window.scrollTo(0, 0);
    setOpenDrawer(null);
    
    // Loading effect duration
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [chapterId]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (isAtBottom && !showReward && !isLoading && !isComingSoon) {
        setShowReward(true);
        if (!hasReceivedPoints) {
          onComplete?.();
          setHasReceivedPoints(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showReward, isLoading, isComingSoon, hasReceivedPoints, onComplete]);

  if (!chapter) {
    return <div className="p-20 text-center">Bölüm bulunamadı.</div>;
  }

  const themeClasses = {
    black: 'bg-brand-black text-white',
    gray: 'bg-zinc-800 text-white',
    sepia: 'bg-[#f4ecd8] text-gray-900'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${themeClasses[theme]}`}>
      {/* Anime-Aesthetic Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-black/98 backdrop-blur-2xl overflow-hidden">
           {/* Background Speed Lines */}
           <div className="absolute inset-0 speed-lines opacity-20 animate-pulse"></div>
           
           <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-lg px-8">
              {/* Manga Panel Reveal Animation */}
              <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full aspect-square md:aspect-video">
                 <div className="bg-brand-darkGray rounded-xl border border-brand-purple/30 relative overflow-hidden animate-in slide-in-from-left-8 duration-500 fill-mode-both">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/10 to-transparent"></div>
                    <div className="absolute inset-0 speed-lines opacity-10"></div>
                 </div>
                 <div className="bg-brand-darkGray rounded-xl border border-brand-pink/30 relative overflow-hidden animate-in slide-in-from-top-8 duration-500 delay-150 fill-mode-both row-span-2">
                    <div className="absolute inset-0 bg-gradient-to-bl from-brand-pink/10 to-transparent"></div>
                    <div className="absolute inset-0 speed-lines opacity-10"></div>
                 </div>
                 <div className="bg-brand-darkGray rounded-xl border border-brand-purple/30 relative overflow-hidden animate-in slide-in-from-right-8 duration-500 delay-300 fill-mode-both">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent"></div>
                    <div className="absolute inset-0 speed-lines opacity-10"></div>
                 </div>
              </div>

              {/* Progress Bar & Text */}
              <div className="w-full flex flex-col gap-4 text-center">
                 <span className="text-[10px] font-black uppercase text-brand-purple tracking-[0.4em] animate-pulse">Bölüm Çiziliyor...</span>
                 <h2 className="text-xl font-black uppercase tracking-tighter text-white">{manga.title}</h2>
              </div>
           </div>
        </div>
      )}

      {/* Reward Pop-up */}
      {showReward && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] animate-in slide-in-from-bottom-10 fade-in duration-700">
           <div className="bg-brand-gold/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(255,215,0,0.4)] border border-brand-gold">
              <span className="text-xl">🏆</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-brand-black uppercase tracking-widest leading-none">Tebrikler!</span>
                <span className="text-[12px] font-black text-brand-black uppercase leading-tight">+10 MP Kazanıldı</span>
              </div>
           </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        className={`max-w-[800px] mx-auto py-20 transition-all duration-700 ${isLoading ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
        onClick={() => { if(!openDrawer) setIsControlsVisible(!isControlsVisible) }}
      >
        {isComingSoon ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-10 gap-6">
            <div className="p-8 rounded-[40px] bg-brand-darkGray/40 border border-brand-purple/20 flex flex-col gap-4 max-w-md">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Çok Yakında</h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Bu bölümün resmi çevirisi henüz sistemimize eklenmedi. Kendi çevirin varsa Studio'dan yükleyip hemen okumaya başlayabilirsin!</p>
              <button onClick={onExit} className="bg-brand-purple py-3 rounded-xl font-black text-xs uppercase tracking-widest mt-4 hover:scale-[1.05] transition-transform shadow-xl shadow-brand-purple/30">Geri Dön</button>
            </div>
          </div>
        ) : (
          <>
            {chapter.pages.map((page, i) => (
              <img key={i} src={page} alt={`Sayfa ${i + 1}`} className="w-full h-auto block mb-1 shadow-2xl" loading="lazy" />
            ))}
            
            <div className="py-32 px-6 flex flex-col items-center gap-10 text-center">
              <div className="flex flex-col gap-3">
                 <h2 className="text-4xl font-black uppercase tracking-tighter">Bölüm Sonu</h2>
                 <p className="text-xs text-gray-500 font-medium max-w-sm leading-relaxed">Hikaye devam ediyor! Bir sonraki bölümde görüşmek üzere.</p>
              </div>
              <button onClick={onExit} className="bg-brand-purple px-10 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-purple/40 hover:scale-[1.05] transition-transform">Geri Dön</button>
            </div>
          </>
        )}
      </div>

      {/* Fixed Header & Nav */}
      <div className={`fixed top-0 left-0 w-full z-50 p-6 transition-transform duration-500 ${isControlsVisible ? 'translate-y-0' : '-translate-y-full'}`}>
         <div className="max-w-5xl mx-auto bg-brand-darkGray/90 backdrop-blur-2xl px-6 py-4 rounded-[32px] border border-white/10 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button onClick={onExit} className="p-3 bg-white/5 hover:bg-brand-purple/20 rounded-2xl transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
               </button>
               <div className="flex flex-col">
                  <h3 className="text-xs font-black uppercase tracking-tight line-clamp-1">{manga.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-brand-purple font-black uppercase tracking-widest">Bölüm {chapter.number === 999 ? 'Yükleme' : chapter.number}</span>
                    {!isComingSoon && <span className="text-[8px] bg-brand-pink px-1.5 rounded text-white font-black uppercase">Canlı</span>}
                  </div>
               </div>
            </div>
            <div className="flex gap-2">
               {['black', 'sepia'].map(t => (
                  <button key={t} onClick={() => setTheme(t as any)} className={`w-6 h-6 rounded-lg border-2 transition-all ${theme === t ? 'border-brand-purple scale-110 shadow-lg' : 'border-white/10 opacity-40'} ${t === 'black' ? 'bg-black' : 'bg-[#f4ecd8]'}`} />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reader;
