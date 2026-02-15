
import { Manga, Chapter, User } from './types';

export const GENRES = [
  'Aksiyon', 'Fantezi', 'Macera', 'Gizem', 'Dövüş Sanatları', 
  'Doğaüstü', 'Komedi', 'Isekai', 'Psikolojik', 'Romantik', 'Dram'
];

export const STATUSES = ['Hepsi', 'Devam Ediyor', 'Tamamlandı', 'Ara Verildi'];

export const MOCK_MANGAS: Manga[] = [
  {
    id: '1',
    title: 'Solo Leveling: Arise',
    description: 'Dünyanın en zayıf avcısıyken, gizli bir zindanda bulduğu sistem sayesinde "seviye atlama" yeteneği kazanan Sung Jin-Woo\'nun Gölge Hükümdar olma yolundaki destansı hikayesi.',
    coverImage: 'https://i.pinimg.com/originals/8a/85/6a/8a856a3e5c986162238716f9172421b0.jpg',
    rating: 4.9,
    chaptersCount: 179,
    genres: ['Aksiyon', 'Fantezi', 'Macera'],
    status: 'Tamamlandı',
    author: 'Chu-Gong',
    artist: 'Jang Sung-rak',
    isVIP: true,
    availableTeams: ['GürcüManga Official', 'ShadowScan', 'Anka Fansub']
  },
  {
    id: '2',
    title: 'Tower of God',
    description: 'Arzuladığın her şey Kulenin tepesinde. Zenginlik, güç, intikam... Ne istersen burada seni bekliyor.',
    coverImage: 'https://images.alphacoders.com/107/1076412.jpg',
    rating: 4.7,
    chaptersCount: 550,
    genres: ['Aksiyon', 'Fantezi', 'Gizem'],
    status: 'Devam Ediyor',
    author: 'SIU',
    artist: 'SIU',
    availableTeams: ['GürcüManga Official', 'WebtoonTR']
  },
  {
    id: '4',
    title: 'Omniscient Reader',
    description: 'Sadece bir kişi dünyanın sonunu biliyor. Kim Dokja, on yıldır okuduğu web romanının gerçek olduğunu keşfettiğinde hayatta kalma mücadelesi başlar.',
    coverImage: 'https://images2.alphacoders.com/113/1136452.jpg',
    rating: 4.8,
    chaptersCount: 150,
    genres: ['Aksiyon', 'Isekai', 'Psikolojik'],
    status: 'Devam Ediyor',
    author: 'Sing Shong',
    artist: 'Sleepy-C',
    isVIP: true,
    availableTeams: ['GürcüManga Official', 'ReaderTR']
  }
];

// Added missing email and role properties to satisfy User interface
export const MOCK_USER: User = {
  id: 'user_1',
  username: 'GürcüOtaku',
  email: 'gurcuotaku@example.com',
  role: 'User',
  bio: 'Manhwa çevirmeni ve tutkulu bir okuyucu. Gölge Hükümdar yolunda ilerliyor. En sevdiğim türler Isekai ve Aksiyon!',
  avatar: 'https://picsum.photos/seed/otaku/200/200',
  isVIP: true,
  level: 12,
  xp: 750,
  maxXp: 1000,
  mangaPoints: 2450,
  badges: ['Early Adopter', 'Top Reader', 'VIP Member', 'Rising Translator'],
  readingHistory: [
    { mangaId: '1', chapterId: 'ch1', timestamp: '2024-05-20T10:00:00Z' }
  ],
  favorites: ['1', '4'],
  myUploads: [],
  stats: {
    readingStreak: 5,
    totalChaptersRead: 142,
    totalUploads: 3,
    rank: 'Gölge Avcı'
  }
};

export const MOCK_CHAPTERS: Chapter[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `ch${i + 1}`,
  mangaId: '1',
  number: i + 1,
  title: `Bölüm ${i + 1}: Kaderin Çağrısı`,
  uploadedAt: new Date(Date.now() - i * 86400000).toISOString(),
  isVIP: i > 10,
  teamName: i % 2 === 0 ? 'GürcüManga Official' : 'ShadowScan',
  pages: Array.from({ length: 5 }).map((_, j) => `https://picsum.photos/seed/manga-page-${i}-${j}/800/1200`)
}));