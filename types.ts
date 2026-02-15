
export interface Manga {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  rating: number;
  chaptersCount: number;
  genres: string[];
  status: 'Devam Ediyor' | 'Tamamlandı' | 'Ara Verildi';
  author: string;
  artist: string;
  isVIP?: boolean;
  availableTeams: string[];
}

export interface Chapter {
  id: string;
  mangaId: string;
  number: number;
  title: string;
  uploadedAt: string;
  isVIP: boolean;
  pages: string[];
  teamName?: string;
}

export interface UserStats {
  readingStreak: number;
  totalChaptersRead: number;
  totalUploads: number;
  rank: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'User' | 'Owner';
  bio?: string;
  avatar: string;
  isVIP: boolean;
  level: number;
  xp: number;
  maxXp: number;
  mangaPoints: number;
  badges: string[];
  readingHistory: { mangaId: string; chapterId: string; timestamp: string }[];
  favorites: string[];
  myUploads?: Chapter[];
  stats: UserStats;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  userRole: 'User' | 'Owner';
  text: string;
  timestamp: string;
  mangaId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'reward';
  timestamp: string;
}
