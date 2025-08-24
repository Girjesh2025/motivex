import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { theme } from '../lib/theme';
import { DailyBoost } from '../lib/data';

interface MiniPlayerProps {
  boost: DailyBoost | null;
  isPlaying: boolean;
  progress: number; // 0 to 1
  onPlayPause: () => void;
  onClose: () => void;
  onExpand: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  boost,
  isPlaying,
  progress,
  onPlayPause,
  onClose,
  onExpand
}) => {
  if (!boost) return null;

  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={styles.blur}>
        <LinearGradient
          colors={['rgba(99, 102, 241, 0.8)', 'rgba(59, 130, 246, 0.8)']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          
          <View style={styles.content}>
            <TouchableOpacity 
              style={styles.expandArea}
              onPress={onExpand}
              activeOpacity={0.8}
            >
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {boost.quote.length > 40 
                    ? boost.quote.substring(0, 40) + '...' 
                    : boost.quote}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                  {boost.author}
                </Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={onPlayPause}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={20}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="close"
                  size={18}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90, // Above tab bar
    left: theme.spacing.md,
    right: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.large,
  },
  blur: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  progressContainer: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.text,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  expandArea: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  author: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
});
