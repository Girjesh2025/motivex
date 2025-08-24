import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { Playlist } from '../lib/data';

interface PlaylistCardProps {
  playlist: Playlist;
  onPress: () => void;
  size?: 'small' | 'large';
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  onPress,
  size = 'large'
}) => {
  const isSmall = size === 'small';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, isSmall && styles.smallContainer]}
    >
      <LinearGradient
        colors={playlist.gradient}
        style={[styles.gradient, isSmall && styles.smallGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={getIconName(playlist.icon)}
              size={isSmall ? 20 : 28}
              color={theme.colors.text}
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, isSmall && styles.smallTitle]}>
              {playlist.title}
            </Text>
            {!isSmall && (
              <Text style={styles.description}>
                {playlist.description}
              </Text>
            )}
            <Text style={[styles.count, isSmall && styles.smallCount]}>
              {playlist.boosts.length} boosts
            </Text>
          </View>
          
          <View style={styles.arrow}>
            <Ionicons
              name="chevron-forward"
              size={isSmall ? 16 : 20}
              color="rgba(255, 255, 255, 0.7)"
            />
          </View>
        </View>
        
        {/* Decorative elements */}
        <View style={[styles.decorativeElement, isSmall && styles.smallDecorative]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getIconName = (icon: string): any => {
  const iconMap: { [key: string]: any } = {
    target: 'target-outline',
    fitness: 'fitness-outline',
    book: 'book-outline',
    sunrise: 'sunny-outline',
    star: 'star-outline',
  };
  return iconMap[icon] || 'play-circle-outline';
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  smallContainer: {
    marginBottom: theme.spacing.sm,
    marginRight: theme.spacing.md,
    width: 160,
  },
  gradient: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.medium,
    overflow: 'hidden',
    position: 'relative',
  },
  smallGradient: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  smallTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.xs,
  },
  count: {
    ...theme.typography.small,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  smallCount: {
    fontSize: 11,
  },
  arrow: {
    marginLeft: theme.spacing.sm,
  },
  decorativeElement: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  smallDecorative: {
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -15,
    right: -15,
  },
});
