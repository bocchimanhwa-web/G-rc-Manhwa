
import React, { useState } from 'react';
import { MOCK_MANGAS, MOCK_CHAPTERS } from '../constants';
import VIPBadge from '../components/VIPBadge';
import { Chapter, Comment } from '../types';

interface DetailsProps {
  mangaId: string;
  userChapters: Chapter[];
  comments: Comment[];
  onAddComment: (text: string) => void;
  onReadChapter: (chapterId: string) => void;
  onBack: () => void;
}

const Details: React.FC<DetailsProps> = ({ mangaId, userChapters, comments, onAddComment, onReadChapter, onBack }) => {
  const manga = MOCK_MANGAS.find(m => m.id === mangaId) || MOCK_MANGAS[0];
  const [activeTab, setActiveTab] = useState<'chapters' | 'comments'>('chapters');
  const [newComment, setNewComment] = useState('');

  const currentMangaUserChapters = userChapters.filter(ch => ch.mangaId === mangaId);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="pb-20 max-w-[1400px] mx-auto px-6">
      <div className="py-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Geri Dön
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-6">
          <img src={manga.coverImage} className="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl border border-white/5" alt={manga.title} />
          {currentMangaUserChapters.length > 0 ? (
            <button 
              onClick={() => onReadChapter(currentMangaUserChapters[0].id)} 
              className="bg-brand-purple py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-purple/20"
            >
              Okumaya Başla
            </button>
          ) : (
            <button disabled className="bg-gray-800 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest text-gray-500 cursor-not-allowed">Çok Yakında</button>
          )}
        </div>

        <div className="md:col-span-3 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-brand-pink text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">{manga.status}</span>
              <span className="bg-brand-darkGray text-gray-400 px-2 py-0.5 rounded text-[10px] font-black uppercase">⭐ {manga.rating}</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">{manga.title}</h1>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl">{manga.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-6 border-b border-white/5 pb-2">
              {['chapters', 'comments'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-xs font-black uppercase tracking-widest pb-2 transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}
                >
                  {tab === 'chapters' ? 'Bölüm Listesi' : `Yorumlar (${comments.length})`}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple"></div>}
                </button>
              ))}
            </div>

            {activeTab === 'chapters' ? (
              <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {currentMangaUserChapters.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-black uppercase text-brand-purple mb-2 px-4 tracking-widest">Kullanıcı Yüklemeleri</h4>
                    {currentMangaUserChapters.map((ch) => (
                      <button 
                        key={ch.id} 
                        onClick={() => onReadChapter(ch.id)}
                        className="w-full flex items-center px-4 py-3 rounded-lg bg-brand-purple/5 border border-brand-purple/20 hover:bg-brand-purple/10 transition-all group mb-1"
                      >
                        <span className="w-16 text-xs font-black text-brand-purple">#{ch.number}</span>
                        <span className="flex-1 text-left text-xs font-bold text-white group-hover:text-brand-purple transition-colors">{ch.title}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[8px] bg-brand-purple text-white px-2 py-0.5 rounded uppercase font-black">OKU</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div>
                   <h4 className="text-[10px] font-black uppercase text-gray-600 mb-2 px-4 tracking-widest">Resmi Bölümler</h4>
                   {MOCK_CHAPTERS.map((ch) => (
                    <div 
                      key={ch.id} 
                      className="flex items-center px-4 py-3 rounded-lg border border-white/5 opacity-50 cursor-not-allowed select-none bg-brand-darkGray/20"
                    >
                      <span className="w-16 text-xs font-black text-gray-600">#{ch.number}</span>
                      <span className="flex-1 text-left text-xs font-bold text-gray-500">{ch.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] bg-gray-800 text-gray-600 px-2 py-0.5 rounded uppercase font-black">Çok Yakında</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 py-4">
                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                   <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-black uppercase text-gray-500 ml-1">Bir şeyler yaz...</label>
                      <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-brand-black/40 border border-white/5 rounded-2xl p-4 text-xs font-medium focus:border-brand-purple outline-none h-24 resize-none transition-all"
                        placeholder="Düşüncelerini paylaş..."
                      />
                   </div>
                   <div className="flex justify-end">
                      <button 
                        type="submit"
                        className="bg-brand-purple px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-brand-purple/20 hover:scale-[1.05] transition-transform"
                      >
                        Yorum Yap
                      </button>
                   </div>
                </form>

                {/* Comment List */}
                <div className="flex flex-col gap-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-20 opacity-30">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em]">İlk yorumu sen yap!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-brand-darkGray/30 p-5 rounded-3xl border border-white/5 flex gap-4 animate-in fade-in slide-in-from-bottom-2">
                         <img src={comment.userAvatar} className="w-10 h-10 rounded-xl border border-white/10 shrink-0" alt="Avatar" />
                         <div className="flex flex-col gap-1.5 flex-1">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <span className="text-xs font-black uppercase tracking-tight">{comment.username}</span>
                                  {comment.userRole === 'Owner' && (
                                    <span className="text-[7px] bg-red-500 text-white px-1.5 py-0.5 rounded font-black uppercase shadow-[0_0_10px_rgba(239,68,68,0.4)]">Kurucu</span>
                                  )}
                               </div>
                               <span className="text-[8px] text-gray-600 font-bold uppercase">{new Date(comment.timestamp).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed">{comment.text}</p>
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
