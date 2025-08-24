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
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [currentBoost, setCurrentBoost] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has actually been
      // laid out.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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

  if (!appIsReady) {
    return (
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.splashContainer}
      >
        <View style={styles.splashContent}>
          <Text style={styles.splashTitle}>MotiveX</Text>
          <Text style={styles.splashSubtitle}>Boost Your Day</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  splashSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Regular',
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
