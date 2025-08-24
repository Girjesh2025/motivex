export interface DailyBoost {
  id: string;
  date: string;
  quote: string;
  author: string;
  audioUrl: string;
  duration: number;
  category: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  gradient: string[];
  boosts: DailyBoost[];
}

export interface UserStats {
  streak: number;
  totalBoosts: number;
  totalMinutes: number;
  joinDate: string;
}

// Sample data
export const sampleBoosts: DailyBoost[] = [
  {
    id: '1',
    date: '2024-01-15',
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    audioUrl: 'https://example.com/audio1.mp3',
    duration: 45,
    category: 'Focus'
  },
  {
    id: '2',
    date: '2024-01-14',
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    audioUrl: 'https://example.com/audio2.mp3',
    duration: 52,
    category: 'Confidence'
  },
  {
    id: '3',
    date: '2024-01-13',
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    audioUrl: 'https://example.com/audio3.mp3',
    duration: 38,
    category: 'Dreams'
  }
];

export const playlists: Playlist[] = [
  {
    id: 'focus',
    title: 'Deep Focus',
    description: 'Get in the zone and stay productive',
    category: 'Focus',
    icon: 'target',
    gradient: ['#6366F1', '#3B82F6'],
    boosts: sampleBoosts.filter(b => b.category === 'Focus')
  },
  {
    id: 'gym',
    title: 'Gym Beast',
    description: 'Unleash your inner warrior',
    category: 'Fitness',
    icon: 'fitness',
    gradient: ['#EF4444', '#F59E0B'],
    boosts: []
  },
  {
    id: 'study',
    title: 'Study Power',
    description: 'Ace your exams with confidence',
    category: 'Study',
    icon: 'book',
    gradient: ['#10B981', '#059669'],
    boosts: []
  },
  {
    id: 'morning',
    title: 'Morning Ritual',
    description: 'Start your day with purpose',
    category: 'Morning',
    icon: 'sunrise',
    gradient: ['#F59E0B', '#D97706'],
    boosts: []
  },
  {
    id: 'confidence',
    title: 'Confidence Boost',
    description: 'Believe in yourself completely',
    category: 'Confidence',
    icon: 'star',
    gradient: ['#8B5CF6', '#7C3AED'],
    boosts: sampleBoosts.filter(b => b.category === 'Confidence')
  }
];

export const getTodaysBoost = (): DailyBoost => {
  const today = new Date().toISOString().split('T')[0];
  const existingBoost = sampleBoosts.find(b => b.date === today);
  
  if (existingBoost) {
    return existingBoost;
  }
  
  // Return the most recent boost if no boost for today
  return sampleBoosts[0];
};

export const getUserStats = (): UserStats => {
  return {
    streak: 7,
    totalBoosts: 45,
    totalMinutes: 1250,
    joinDate: '2024-01-01'
  };
};
