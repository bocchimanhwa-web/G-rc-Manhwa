
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import Reader from './pages/Reader';
import Profile from './pages/Profile';
import Auth from './components/Auth';
import { Chapter, User, Comment } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'details' | 'reader' | 'profile'>('home');
  const [selectedMangaId, setSelectedMangaId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [userChapters, setUserChapters] = useState<Chapter[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);

  const navigateToManga = (id: string) => {
    setSelectedMangaId(id);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const navigateToReader = (chId: string) => {
    setSelectedChapterId(chId);
    setCurrentPage('reader');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: string) => {
    if (page === 'home' || page === 'profile') {
      setCurrentPage(page as any);
      window.scrollTo(0, 0);
    }
  };

  const handleAddUserChapter = (chapter: Chapter) => {
    setUserChapters(prev => [...prev, chapter]);
  };

  const handleAddComment = (commentText: string) => {
    if (!currentUser || !selectedMangaId) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      text: commentText,
      timestamp: new Date().toISOString(),
      mangaId: selectedMangaId,
    };
    setAllComments(prev => [newComment, ...prev]);
  };

  const handleChapterComplete = () => {
    if (!currentUser) return;
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        mangaPoints: prev.mangaPoints + 10,
        stats: {
          ...prev.stats,
          totalChaptersRead: prev.stats.totalChaptersRead + 1
        }
      };
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  if (!currentUser) {
    return <Auth onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans selection:bg-brand-purple selection:text-white">
      {currentPage !== 'reader' && (
        <Header 
          currentUser={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
      )}

      <main>
        {currentPage === 'home' && (
          <Home onMangaClick={navigateToManga} />
        )}
        
        {currentPage === 'details' && selectedMangaId && (
          <Details 
            mangaId={selectedMangaId} 
            userChapters={userChapters}
            comments={allComments.filter(c => c.mangaId === selectedMangaId)}
            onAddComment={handleAddComment}
            onReadChapter={navigateToReader}
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'reader' && selectedChapterId && (
          <Reader 
            chapterId={selectedChapterId} 
            userChapters={userChapters}
            onComplete={handleChapterComplete}
            onExit={() => setCurrentPage('details')}
          />
        )}

        {currentPage === 'profile' && (
          <Profile user={currentUser} onUploadChapter={handleAddUserChapter} />
        )}
      </main>

      {currentPage !== 'reader' && (
        <footer className="bg-brand-darkGray border-t border-brand-purple/10 py-12 mt-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="font-anime text-2xl text-brand-purple">GürcüManga</span>
              <p className="text-xs text-gray-500 max-w-xs">
                Premium manhwa reading experience. Enjoy the best stories with the best interface.
              </p>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:text-brand-purple transition-colors">Hakkımızda</a>
                <a href="#" className="hover:text-brand-purple transition-colors">İletişim</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:text-brand-purple transition-colors">SSS</a>
                <a href="#" className="hover:text-brand-purple transition-colors">Gizlilik</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
