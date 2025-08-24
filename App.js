import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';

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

const Tab = createBottomTabNavigator();

// Main Tab Navigator
const TabNavigator = ({ currentBoost, isPlaying, onPlayBoost }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Achievements') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <Home {...props} currentBoost={currentBoost} isPlaying={isPlaying} onPlayBoost={onPlayBoost} />}
      </Tab.Screen>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Achievements" component={Achievements} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  const [currentBoost, setCurrentBoost] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <NavigationContainer>
        <View style={styles.appContainer}>
          <TabNavigator 
            currentBoost={currentBoost}
            isPlaying={isPlaying}
            onPlayBoost={handlePlayBoost}
          />
          {currentBoost && (
            <MiniPlayer
              boost={currentBoost}
              isPlaying={isPlaying}
              onPlay={handleResumeBoost}
              onPause={handlePauseBoost}
            />
          )}
        </View>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  appContainer: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 8,
    paddingTop: 8,
    height: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
  tabIconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  tabIconActive: {
    backgroundColor: `${theme.colors.primary}20`,
  },
});
