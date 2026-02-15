
import React, { useState } from 'react';
import Logo from './Logo';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication
    const role: 'User' | 'Owner' = formData.email.toLowerCase() === 'flexezaur@gmail.com' ? 'Owner' : 'User';
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      role: role,
      bio: role === 'Owner' ? 'GürcüManga Platform Sahibi.' : 'GürcüManga Okuyucusu.',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username || 'default'}`,
      isVIP: role === 'Owner',
      level: 1,
      xp: 0,
      maxXp: 100,
      mangaPoints: 0, // Everyone starts with 0 as requested
      badges: role === 'Owner' ? ['Owner', 'Founder'] : ['New Reader'],
      readingHistory: [],
      favorites: [],
      stats: {
        readingStreak: 0,
        totalChaptersRead: 0,
        totalUploads: 0,
        rank: role === 'Owner' ? 'Kurucu' : 'Çaylak'
      }
    };

    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-pink/10 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md bg-brand-darkGray/40 backdrop-blur-3xl border border-brand-purple/20 p-10 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col gap-10 relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mt-2">
            {isLogin ? 'Hoş Geldin Okuyucu' : 'Kayıt Ol ve Katıl'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black uppercase text-gray-500 ml-1">Kullanıcı Adı</label>
              <input 
                required
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="bg-brand-black/50 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold focus:border-brand-purple outline-none transition-all"
                placeholder="Örn: SungJinWoo"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase text-gray-500 ml-1">E-Posta Adresi</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-brand-black/50 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold focus:border-brand-purple outline-none transition-all"
              placeholder="okuyucu@gurcumanga.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase text-gray-500 ml-1">Şifre</label>
            <input 
              required
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="bg-brand-black/50 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold focus:border-brand-purple outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-purple py-5 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-brand-purple/40 hover:scale-[1.02] transition-transform active:scale-95 mt-4"
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-px bg-white/5"></div>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            {isLogin ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
