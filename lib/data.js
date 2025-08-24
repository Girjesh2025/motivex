// Sample data - Hindi Version
export const sampleBoosts = [
  {
    id: '1',
    date: '2024-01-15',
    quote: 'महान काम करने का एकमात्र तरीका यह है कि आप जो करते हैं उससे प्यार करें।',
    author: 'स्टीव जॉब्स',
    audioUrl: 'https://example.com/audio1.mp3',
    duration: 45,
    category: 'फोकस'
  },
  {
    id: '2',
    date: '2024-01-14',
    quote: 'सफलता अंतिम नहीं है, असफलता घातक नहीं है: जारी रखने का साहस ही मायने रखता है।',
    author: 'विंस्टन चर्चिल',
    audioUrl: 'https://example.com/audio2.mp3',
    duration: 52,
    category: 'आत्मविश्वास'
  },
  {
    id: '3',
    date: '2024-01-13',
    quote: 'भविष्य उन लोगों का है जो अपने सपनों की सुंदरता में विश्वास करते हैं।',
    author: 'एलेनोर रूजवेल्ट',
    audioUrl: 'https://example.com/audio3.mp3',
    duration: 38,
    category: 'सपने'
  },
  {
    id: '4',
    date: '2024-01-12',
    quote: 'कर्म करो, फल की चिंता मत करो।',
    author: 'भगवद गीता',
    audioUrl: 'https://example.com/audio4.mp3',
    duration: 30,
    category: 'आध्यात्म'
  },
  {
    id: '5',
    date: '2024-01-11',
    quote: 'जो व्यक्ति अपने लक्ष्य के प्रति दृढ़ संकल्पित है, वह असंभव को भी संभव बना देता है।',
    author: 'स्वामी विवेकानंद',
    audioUrl: 'https://example.com/audio5.mp3',
    duration: 42,
    category: 'प्रेरणा'
  }
];

export const playlists = [
  {
    id: 'focus',
    title: 'गहरा फोकस',
    description: 'अपने काम में पूरी तरह डूब जाएं',
    category: 'फोकस',
    icon: 'target',
    gradient: ['#6366F1', '#3B82F6'],
    boosts: sampleBoosts.filter(b => b.category === 'फोकस')
  },
  {
    id: 'gym',
    title: 'जिम वारियर',
    description: 'अपने अंदर के योद्धा को जगाएं',
    category: 'फिटनेस',
    icon: 'fitness',
    gradient: ['#EF4444', '#F59E0B'],
    boosts: []
  },
  {
    id: 'study',
    title: 'पढ़ाई पावर',
    description: 'आत्मविश्वास के साथ परीक्षा में सफल हों',
    category: 'पढ़ाई',
    icon: 'book',
    gradient: ['#10B981', '#059669'],
    boosts: []
  },
  {
    id: 'morning',
    title: 'सुबह की शुरुआत',
    description: 'अपने दिन की शुरुआत उद्देश्य के साथ करें',
    category: 'सुबह',
    icon: 'sunrise',
    gradient: ['#F59E0B', '#D97706'],
    boosts: []
  },
  {
    id: 'confidence',
    title: 'आत्मविश्वास बूस्ट',
    description: 'खुद पर पूरा भरोसा रखें',
    category: 'आत्मविश्वास',
    icon: 'star',
    gradient: ['#8B5CF6', '#7C3AED'],
    boosts: sampleBoosts.filter(b => b.category === 'आत्मविश्वास')
  },
  {
    id: 'spiritual',
    title: 'आध्यात्मिक यात्रा',
    description: 'अपनी आत्मा से जुड़ें',
    category: 'आध्यात्म',
    icon: 'flower',
    gradient: ['#F97316', '#EA580C'],
    boosts: sampleBoosts.filter(b => b.category === 'आध्यात्म')
  },
  {
    id: 'inspiration',
    title: 'प्रेरणा स्रोत',
    description: 'जीवन में नई ऊर्जा भरें',
    category: 'प्रेरणा',
    icon: 'flash',
    gradient: ['#06B6D4', '#0891B2'],
    boosts: sampleBoosts.filter(b => b.category === 'प्रेरणा')
  }
];

export const getTodaysBoost = () => {
  const today = new Date().toISOString().split('T')[0];
  const existingBoost = sampleBoosts.find(b => b.date === today);
  
  if (existingBoost) {
    return existingBoost;
  }
  
  // Return the most recent boost if no boost for today
  return sampleBoosts[0];
};

export const getUserStats = () => {
  return {
    streak: 7,
    totalBoosts: 45,
    totalMinutes: 1250,
    joinDate: '2024-01-01'
  };
};

// For compatibility, export DailyBoost as the first boost
export const DailyBoost = sampleBoosts[0];

// NEW FEATURES - Daily Challenges
export const dailyChallenges = [
  {
    id: 'challenge1',
    title: 'आज 5 मिनट ध्यान करें',
    description: 'शांत मन के लिए 5 मिनट का ध्यान',
    points: 10,
    icon: 'leaf',
    completed: false
  },
  {
    id: 'challenge2',
    title: 'किसी को धन्यवाद कहें',
    description: 'आज किसी को दिल से धन्यवाद कहें',
    points: 5,
    icon: 'heart',
    completed: false
  },
  {
    id: 'challenge3',
    title: '10 मिनट टहलें',
    description: 'आज 10 मिनट की सैर करें',
    points: 8,
    icon: 'walk',
    completed: false
  }
];

// Mood Tracker
export const moodOptions = [
  { id: 'amazing', emoji: '😄', label: 'शानदार', color: '#10B981' },
  { id: 'good', emoji: '😊', label: 'अच्छा', color: '#3B82F6' },
  { id: 'okay', emoji: '😐', label: 'ठीक', color: '#F59E0B' },
  { id: 'sad', emoji: '😔', label: 'उदास', color: '#EF4444' },
  { id: 'stressed', emoji: '😩', label: 'तनावग्रस्त', color: '#8B5CF6' }
];

// Achievements System
export const achievements = [
  {
    id: 'first_boost',
    title: 'पहला बूस्ट',
    description: 'आपने पहला मोटिवेशन सुना',
    icon: 'trophy',
    unlocked: true,
    points: 10
  },
  {
    id: 'week_streak',
    title: '7 दिन की लगातारता',
    description: 'लगातार 7 दिन आए',
    icon: 'flame',
    unlocked: true,
    points: 50
  },
  {
    id: 'challenge_master',
    title: 'चुनौती मास्टर',
    description: '10 चुनौतियां पूरी कीं',
    icon: 'medal',
    unlocked: false,
    points: 100
  }
];
