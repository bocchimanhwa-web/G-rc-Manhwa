
import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { GENRES, STATUSES } from '../constants';
import VIPBadge from './VIPBadge';
import { User } from '../types';

interface HeaderProps {
  currentUser: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onFilterChange?: (filters: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onNavigate, onLogout, onFilterChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifyRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[60] bg-brand-black/98 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 h-14 md:h-16 flex items-center justify-between gap-6">
        <div onClick={() => onNavigate('home')} className="shrink-0 scale-90">
          <Logo />
        </div>

        <nav className="hidden xl:flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-purple transition-all font-bold text-[11px] uppercase tracking-[0.15em] text-gray-400">Anasayfa</button>
          <button className="hover:text-brand-purple transition-all font-bold text-[11px] uppercase tracking-[0.15em] text-gray-400">Katalog</button>
          <button className="hover:text-brand-purple transition-all font-bold text-[11px] uppercase tracking-[0.15em] text-gray-400">Sıralama</button>
        </nav>

        <div className="flex-1 max-w-lg">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Arama yap..." 
              className="w-full bg-brand-darkGray/40 border border-white/5 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:border-brand-purple/50 transition-all text-xs font-medium"
            />
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-xl">
             <span className="text-brand-gold font-black text-xs">{currentUser.mangaPoints}</span>
             <span className="text-brand-gold text-[8px] font-black uppercase tracking-tighter">MP</span>
          </div>

          <div className="relative" ref={userMenuRef}>
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 cursor-pointer group pl-2 border-l border-white/5"
            >
              <div className="relative">
                <img src={currentUser.avatar} alt="User" className="w-9 h-9 rounded-xl border border-brand-purple/30 object-cover group-hover:scale-105 transition-transform" />
                {currentUser.role === 'Owner' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-brand-black shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                )}
              </div>
              <div className="hidden lg:flex flex-col">
                <p className="text-[11px] font-black leading-none group-hover:text-brand-purple transition-colors flex items-center gap-1">
                  {currentUser.username}
                  {currentUser.role === 'Owner' && <span className="text-[7px] bg-red-500 text-white px-1 rounded font-black uppercase">Admin</span>}
                </p>
                <p className="text-[8px] text-gray-600 font-black uppercase mt-1.5 tracking-widest">LEVEL {currentUser.level}</p>
              </div>
            </div>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-brand-darkGray/98 border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <button 
                  onClick={() => { onNavigate('profile'); setShowUserMenu(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white"
                >
                  Profilim
                </button>
                <button 
                  onClick={() => { onLogout(); setShowUserMenu(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-widest text-red-500/70 hover:text-red-500"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
