import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../lib/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  gradient?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  gradient = theme.colors.gradient.primary,
  style,
  textStyle,
  disabled = false,
  size = 'medium'
}) => {
  const buttonStyle = [
    styles.button,
    styles[size],
    style,
    disabled && styles.disabled
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    textStyle,
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      <LinearGradient
        colors={disabled ? ['#374151', '#4B5563'] : gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={textStyles}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  gradient: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Sizes
  small: {
    borderRadius: theme.borderRadius.md,
  },
  medium: {
    borderRadius: theme.borderRadius.lg,
  },
  large: {
    borderRadius: theme.borderRadius.xl,
  },
  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Disabled states
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
});
