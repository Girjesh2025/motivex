# Motivex - Daily Motivation App 🚀

A modern, eye-catching motivational mobile app built with React Native and Expo. Get your daily dose of motivation with beautiful UI, smooth animations, and premium feel.

## ✨ Features

### Core Features (MVP)
- **Daily Boost** - Inspirational quote + 30-60s audio motivation
- **Beautiful Home Screen** - Gradient cards with daily quotes and play buttons
- **Playlists** - Categories like Focus, Gym, Study, Morning, Confidence
- **Bottom Navigation** - Home, Explore, Profile with animated icons
- **Mini Player** - Sticky bottom player with progress tracking
- **Dark Theme First** - Premium dark UI with indigo/blue gradients
- **Smooth Animations** - 200-300ms transitions with haptic feedback

### Design System
- **Colors**: Indigo (#6366F1) + Blue (#3B82F6) gradients
- **Typography**: Clean Inter/Poppins fonts
- **Shapes**: Rounded corners (20-24px), soft shadows
- **Motion**: Smooth animations, parallax effects
- **Icons**: Ionicons with outline style

### Screens
1. **Home** - Daily boost card, quick actions, stats, popular playlists
2. **Explore** - Search, categories, all playlists
3. **Profile** - User stats, settings, Pro upgrade

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Expo Linear Gradient** for beautiful gradients
- **Expo Vector Icons** (Ionicons)
- **Expo Splash Screen** for loading
- **React Native Reanimated** for animations
- **Expo Haptics** for tactile feedback

## 📱 Installation & Setup

1. **Clone & Install**
```bash
cd Josh_app
npm install
```

2. **Run the App**
```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator  
npm run android
```

3. **Project Structure**
```
/Josh_app
  /screens          # Main app screens
    Home.tsx        # Daily boost, stats, playlists
    Explore.tsx     # Search and browse playlists
    Profile.tsx     # User profile and settings
  /components       # Reusable UI components
    DailyBoostCard.tsx    # Main quote card
    PlaylistCard.tsx      # Playlist items
    MiniPlayer.tsx        # Bottom sticky player
    GradientButton.tsx    # Gradient CTA buttons
    StatsCard.tsx         # User statistics
  /lib              # Core utilities
    theme.ts        # Design system (colors, typography, spacing)
    data.ts         # Sample data and types
  app.tsx           # Main app entry point
  package.json      # Dependencies
  app.json          # Expo configuration
```

## 🎨 Design System

### Colors
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #3B82F6 (Blue) 
- **Accent**: #8B5CF6 (Purple)
- **Background**: #0F0F23 (Dark Navy)
- **Surface**: #1A1A2E (Cards)
- **Text**: #FFFFFF / #94A3B8

### Typography
- **Headlines**: 32px, 24px, 20px (Bold)
- **Body**: 16px (Regular)
- **Caption**: 14px, 12px (Secondary text)

### Spacing
- **xs**: 4px, **sm**: 8px, **md**: 16px
- **lg**: 24px, **xl**: 32px, **xxl**: 48px

## 🚀 Features Roadmap

### Phase 1 (Current - MVP)
- ✅ Daily Boost with audio simulation
- ✅ Beautiful gradient UI
- ✅ Navigation with animated tabs
- ✅ Mini player with progress
- ✅ User stats and streaks
- ✅ Playlist browsing

### Phase 2 (Future)
- 🔄 Real audio playback (Expo AV)
- 🔄 Push notifications for daily reminders
- 🔄 Offline mode with caching
- 🔄 AI Coach for personalized pep talks
- 🔄 7/14/30-day challenges
- 🔄 Social sharing (generate quote cards)
- 🔄 Pro subscription (₹199/month)

## 💡 Usage

1. **Daily Motivation**: Open the app to see today's inspirational quote
2. **Play Audio**: Tap the play button to hear motivational audio (simulated)
3. **Browse Playlists**: Explore different categories like Focus, Gym, Study
4. **Track Progress**: View your streak and listening statistics
5. **Mini Player**: Control playback from the sticky bottom player

## 🎯 Target Audience

- **Students** preparing for exams
- **Working professionals** needing daily motivation
- **Fitness enthusiasts** looking for workout inspiration
- **Anyone** building positive habits and confidence

## 📄 License

This project is for educational and demonstration purposes.

---

**Built with ❤️ using React Native & Expo**

*Your daily dose of motivation awaits! 🌟*
