import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Screens
import { Home } from './screens/Home';
import { Explore } from './screens/Explore';
import { Profile } from './screens/Profile';
import { Achievements } from './screens/Achievements';

// Components
import { MiniPlayer } from './components/MiniPlayer';

// Theme and data
import { theme } from './lib/theme';
import { DailyBoost } from './lib/data';

// Simple Custom Tab Navigation
const CustomTabNavigator = ({ currentBoost, isPlaying, onPlayBoost, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', name: 'होम', icon: 'home' },
    { id: 'explore', name: 'एक्सप्लोर', icon: 'compass' },
    { id: 'achievements', name: 'उपलब्धि', icon: 'trophy' },
    { id: 'profile', name: 'प्रोफाइल', icon: 'person' }
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home currentBoost={currentBoost} isPlaying={isPlaying} onPlayBoost={onPlayBoost} />;
      case 'explore':
        return <Explore />;
      case 'achievements':
        return <Achievements />;
      case 'profile':
        return <Profile />;
      default:
        return <Home currentBoost={currentBoost} isPlaying={isPlaying} onPlayBoost={onPlayBoost} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabItem, activeTab === tab.id && styles.tabItemActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={activeTab === tab.id ? tab.icon : `${tab.icon}-outline`} 
              size={24} 
              color={activeTab === tab.id ? theme.colors.primary : theme.colors.textSecondary} 
            />
            <Text style={[
              styles.tabLabel,
              activeTab === tab.id && styles.tabLabelActive
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Main App Component
export default function App() {
  const [currentBoost, setCurrentBoost] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handlePlayBoost = (boost) => {
    setCurrentBoost(boost);
    setIsPlaying(true);
  };

  const handlePauseBoost = () => {
    setIsPlaying(false);
  };

  const handleResumeBoost = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <CustomTabNavigator 
        currentBoost={currentBoost}
        isPlaying={isPlaying}
        onPlayBoost={handlePlayBoost}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {currentBoost && (
        <MiniPlayer
          boost={currentBoost}
          isPlaying={isPlaying}
          onPlay={handleResumeBoost}
          onPause={handlePauseBoost}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 8,
    paddingTop: 8,
    height: 80,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabItemActive: {
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
