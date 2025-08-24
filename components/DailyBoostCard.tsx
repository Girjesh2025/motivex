import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { DailyBoost } from '../lib/data';

interface DailyBoostCardProps {
  boost: DailyBoost;
  onPlay: () => void;
  isPlaying?: boolean;
}

export const DailyBoostCard: React.FC<DailyBoostCardProps> = ({
  boost,
  onPlay,
  isPlaying = false
}) => {
  return (
    <LinearGradient
      colors={theme.colors.gradient.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{boost.category.toUpperCase()}</Text>
          <Text style={styles.duration}>{boost.duration}s</Text>
        </View>
        
        <Text style={styles.quote}>"{boost.quote}"</Text>
        <Text style={styles.author}>— {boost.author}</Text>
        
        <TouchableOpacity
          style={styles.playButton}
          onPress={onPlay}
          activeOpacity={0.8}
        >
          <View style={styles.playButtonInner}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.playText}>
            {isPlaying ? 'Pause' : 'Play Daily Boost'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Decorative elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.large,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  category: {
    ...theme.typography.small,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    letterSpacing: 1,
  },
  duration: {
    ...theme.typography.small,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  quote: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 28,
    fontStyle: 'italic',
  },
  author: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.xl,
    fontWeight: '500',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    backdropFilter: 'blur(10px)',
  },
  playButtonInner: {
    backgroundColor: theme.colors.text,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  playText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    flex: 1,
  },
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 1,
  },
});
