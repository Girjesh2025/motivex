import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { theme } from '../lib/theme';
import { getTodaysBoost, playlists, getUserStats } from '../lib/data';
import { DailyBoostCard } from '../components/DailyBoostCard';
import { PlaylistCard } from '../components/PlaylistCard';
import { StatsCard } from '../components/StatsCard';

interface HomeProps {
  navigation: any;
  onPlayBoost: (boost: any) => void;
  isPlaying: boolean;
}

export const Home: React.FC<HomeProps> = ({ navigation, onPlayBoost, isPlaying }) => {
  const [todaysBoost, setTodaysBoost] = useState(getTodaysBoost());
  const [userStats, setUserStats] = useState(getUserStats());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handlePlayBoost = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPlayBoost(todaysBoost);
  };

  const handlePlaylistPress = (playlist: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Playlist', { playlist });
  };

  const quickActions = [
    {
      id: 'ai-coach',
      title: 'AI Coach',
      icon: 'sparkles',
      gradient: theme.colors.gradient.secondary,
      onPress: () => navigation.navigate('AICoach'),
    },
    {
      id: 'challenges',
      title: 'Challenges',
      icon: 'trophy',
      gradient: ['#F59E0B', '#D97706'],
      onPress: () => navigation.navigate('Challenges'),
    },
  ];

  const renderQuickAction = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={item.onPress}
      activeOpacity={0.8}
      style={styles.quickActionContainer}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.quickAction}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={item.icon} size={24} color={theme.colors.text} />
        <Text style={styles.quickActionText}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderPlaylist = ({ item }: { item: any }) => (
    <PlaylistCard
      playlist={item}
      onPress={() => handlePlaylistPress(item)}
      size="small"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.subtitle}>Ready for your daily boost?</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={theme.colors.gradient.primary}
              style={styles.profileGradient}
            >
              <Ionicons name="person" size={20} color={theme.colors.text} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Daily Boost Card */}
        <DailyBoostCard
          boost={todaysBoost}
          onPlay={handlePlayBoost}
          isPlaying={isPlaying}
        />

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          />
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <StatsCard
              title="Day Streak"
              value={userStats.streak}
              subtitle="Keep it up!"
              icon="flame"
              gradient={['#EF4444', '#DC2626']}
            />
            <StatsCard
              title="Total Boosts"
              value={userStats.totalBoosts}
              subtitle="Listened"
              icon="headset"
              gradient={theme.colors.gradient.primary}
            />
          </View>
          <View style={styles.statsContainer}>
            <StatsCard
              title="Minutes"
              value={userStats.totalMinutes}
              subtitle="Of motivation"
              icon="time"
              gradient={['#10B981', '#059669']}
            />
            <StatsCard
              title="Member Since"
              value="Jan 2024"
              subtitle="Welcome!"
              icon="calendar"
              gradient={theme.colors.gradient.secondary}
            />
          </View>
        </View>

        {/* Popular Playlists */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Playlists</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={playlists.slice(0, 3)}
            renderItem={renderPlaylist}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.playlistsContainer}
          />
        </View>

        {/* Bottom spacing for mini player */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  greeting: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: '700',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '700',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  seeAllText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  quickActionContainer: {
    marginRight: theme.spacing.md,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  quickActionText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  playlistsContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  bottomSpacing: {
    height: 100, // Space for mini player
  },
});
