import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  gradient: string[];
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradient
}) => {
  return (
    <LinearGradient
      colors={gradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={24}
            color={theme.colors.text}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      
      {/* Decorative element */}
      <View style={styles.decorativeElement} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.medium,
    overflow: 'hidden',
    position: 'relative',
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  content: {
    zIndex: 2,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  value: {
    ...theme.typography.h1,
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  title: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  decorativeElement: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
});
