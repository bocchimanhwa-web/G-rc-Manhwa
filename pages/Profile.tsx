
import React, { useState, useRef } from 'react';
import { MOCK_MANGAS } from '../constants';
import VIPBadge from '../components/VIPBadge';
import { Chapter, User } from '../types';

interface ProfileProps {
  user: User;
  onUploadChapter: (chapter: Chapter) => void;
}

const Profile: React.FC<ProfileProps> = ({ user: initialUser, onUploadChapter }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'studio' | 'history' | 'favorites'>('dashboard');
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: user.username, bio: user.bio });
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [chapterMeta, setChapterMeta] = useState({ title: '', mangaId: MOCK_MANGAS[0].id });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    setUser({ ...user, username: editForm.username, bio: editForm.bio });
    setIsEditing(false);
  };

  const simulateUpload = () => {
    if (selectedFiles.length === 0 || !chapterMeta.title) return;
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newChapter: Chapter = {
            id: `user-ch-${Date.now()}`,
            mangaId: chapterMeta.mangaId,
            number: 999,
            title: chapterMeta.title,
            uploadedAt: new Date().toISOString(),
            isVIP: false,
            teamName: user.username,
            pages: selectedFiles.map(f => URL.createObjectURL(f))
          };
          
          onUploadChapter(newChapter);
          setIsUploading(false);
          setUploadProgress(0);
          setSelectedFiles([]);
          setChapterMeta({ ...chapterMeta, title: '' });
          alert("Bölüm başarıyla yüklendi!");
        }, 500);
      }
    }, 50);
  };

  return (
    <div className="container mx-auto px-6 py-12 pb-32 max-w-[1400px]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-6">
          <div className="bg-brand-darkGray/40 p-6 rounded-[32px] border border-brand-purple/20 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex flex-col items-center text-center gap-3">
               <div className="relative group">
                  <img src={user.avatar} className="w-24 h-24 rounded-2xl border-2 border-brand-purple object-cover shadow-xl" />
                  <div className="absolute -bottom-2 -right-2 bg-brand-purple text-[8px] font-black px-2 py-1 rounded-md border border-brand-black">LVL {user.level}</div>
               </div>
               <div className="flex flex-col gap-0.5">
                  <h2 className="text-xl font-black flex items-center gap-2 justify-center">
                    {user.username}
                    {user.isVIP && <VIPBadge className="scale-90" />}
                  </h2>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${user.role === 'Owner' ? 'text-red-500' : 'text-brand-purple'}`}>
                    {user.stats.rank}
                  </p>
               </div>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                { id: 'dashboard', label: 'Panel', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { id: 'studio', label: 'Studio', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
                { id: 'history', label: 'Geçmiş', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  {item.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full py-3 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            >
              Profili Düzenle
            </button>
          </div>

          <div className="bg-gradient-to-br from-brand-gold/10 to-brand-gold/5 p-6 rounded-[32px] border border-brand-gold/20 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-brand-gold/60 tracking-widest">Manga Points</span>
                <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
             </div>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-brand-gold">{user.mangaPoints}</span>
                <span className="text-[10px] font-black text-brand-gold mb-1.5 uppercase">MP</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Seri Okundu', value: user.readingHistory.length, color: 'brand-purple' },
                  { label: 'Bölüm Okundu', value: user.stats.totalChaptersRead, color: 'brand-pink' },
                  { label: 'Yüklemeler', value: user.stats.totalUploads, color: 'brand-gold' },
                  { label: 'Seri Galibiyeti', value: user.stats.readingStreak, color: 'green-500' }
                ].map(stat => (
                  <div key={stat.label} className="bg-brand-darkGray/30 p-5 rounded-3xl border border-white/5 flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
                    <span className={`text-2xl font-black text-${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-darkGray/20 p-8 rounded-[32px] border border-white/5 flex flex-col gap-4">
                 <h3 className="text-sm font-black uppercase tracking-wider border-b border-white/5 pb-3">Hakkımda</h3>
                 <p className="text-xs text-gray-400 leading-relaxed italic">"{user.bio}"</p>
              </div>
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="bg-brand-darkGray/40 p-10 rounded-[40px] border border-brand-purple/30 flex flex-col gap-10">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">GürcüManga Studio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Manga Başlığı</label>
                      <select 
                        value={chapterMeta.mangaId}
                        onChange={(e) => setChapterMeta({...chapterMeta, mangaId: e.target.value})}
                        className="bg-brand-black/60 border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:border-brand-purple outline-none appearance-none cursor-pointer"
                      >
                        {MOCK_MANGAS.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Bölüm Başlığı</label>
                      <input 
                        type="text" 
                        value={chapterMeta.title}
                        onChange={(e) => setChapterMeta({...chapterMeta, title: e.target.value})}
                        placeholder="Örn: Bölüm 42: Kader" 
                        className="bg-brand-black/60 border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:border-brand-purple outline-none" 
                      />
                    </div>
                  </div>
                  <button 
                    disabled={isUploading || selectedFiles.length === 0 || !chapterMeta.title}
                    onClick={simulateUpload}
                    className="w-full py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] bg-brand-purple text-white hover:scale-[1.02] shadow-brand-purple/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Bölümü Yayınla
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
