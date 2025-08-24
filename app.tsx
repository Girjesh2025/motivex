import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Screens
import { Home } from './screens/Home';
import { Explore } from './screens/Explore';
import { Profile } from './screens/Profile';

// Components
import { MiniPlayer } from './components/MiniPlayer';

// Theme and data
import { theme } from './lib/theme';
import { DailyBoost } from './lib/data';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

// Main Tab Navigator
const TabNavigator = ({ currentBoost, isPlaying, onPlayBoost }: any) => {
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
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={[styles.tabIcon, focused && styles.activeTabIcon]}>
              {focused && (
                <LinearGradient
                  colors={theme.colors.gradient.primary}
                  style={styles.tabIconGradient}
                />
              )}
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <Home
            {...props}
            onPlayBoost={onPlayBoost}
            isPlaying={isPlaying}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [currentBoost, setCurrentBoost] = useState<DailyBoost | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          // Add custom fonts here if needed
        });
        
        // Artificially delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Audio playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentBoost) {
      interval = setInterval(() => {
        setPlaybackProgress(prev => {
          const newProgress = prev + (1 / currentBoost.duration);
          if (newProgress >= 1) {
            setIsPlaying(false);
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentBoost]);

  const handlePlayBoost = (boost: DailyBoost) => {
    if (currentBoost?.id === boost.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentBoost(boost);
      setIsPlaying(true);
      setPlaybackProgress(0);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCloseMiniPlayer = () => {
    setCurrentBoost(null);
    setIsPlaying(false);
    setPlaybackProgress(0);
  };

  const handleExpandMiniPlayer = () => {
    // Navigate to full player screen (to be implemented)
    console.log('Expand mini player');
  };

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <LinearGradient
          colors={theme.colors.gradient.primary}
          style={styles.splashGradient}
        >
          <Text style={styles.splashTitle}>Motivex</Text>
          <Text style={styles.splashSubtitle}>Your daily dose of motivation</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.surface,
          notification: theme.colors.primary,
        },
      }}
    >
      <StatusBar style="light" backgroundColor={theme.colors.background} />
      
      <View style={styles.container}>
        <TabNavigator
          currentBoost={currentBoost}
          isPlaying={isPlaying}
          onPlayBoost={handlePlayBoost}
        />
        
        {/* Mini Player */}
        <MiniPlayer
          boost={currentBoost}
          isPlaying={isPlaying}
          progress={playbackProgress}
          onPlayPause={handlePlayPause}
          onClose={handleCloseMiniPlayer}
          onExpand={handleExpandMiniPlayer}
        />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  splashContainer: {
    flex: 1,
  },
  splashGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    ...theme.typography.h1,
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  splashSubtitle: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 0,
    height: 90,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    ...theme.shadows.large,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    position: 'relative',
  },
  activeTabIcon: {
    // Styling handled by gradient
  },
  tabIconGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    opacity: 0.2,
  },
});
