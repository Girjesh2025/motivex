import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { theme } from '../lib/theme';
import { getUserStats } from '../lib/data';
import { StatsCard } from '../components/StatsCard';
import { GradientButton } from '../components/GradientButton';

interface ProfileProps {
  navigation: any;
}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [userStats, setUserStats] = useState(getUserStats());
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [isPro, setIsPro] = useState(false);

  const handleUpgradeToPro = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Upgrade to Pro',
      'Unlock full library, offline mode, AI Coach, and challenges for ₹199/month or ₹999/year.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Subscribe', onPress: () => console.log('Subscribe pressed') },
      ]
    );
  };

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Daily Reminders',
      subtitle: 'Get notified for your daily boost',
      icon: 'notifications-outline',
      type: 'switch',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 'darkmode',
      title: 'Dark Mode',
      subtitle: 'Easy on the eyes',
      icon: 'moon-outline',
      type: 'switch',
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
    },
    {
      id: 'offline',
      title: 'Offline Downloads',
      subtitle: 'Download boosts for offline listening',
      icon: 'download-outline',
      type: 'navigation',
      isPro: true,
    },
    {
      id: 'backup',
      title: 'Backup & Sync',
      subtitle: 'Keep your progress safe',
      icon: 'cloud-outline',
      type: 'navigation',
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help when you need it',
      icon: 'help-circle-outline',
      type: 'navigation',
    },
    {
      id: 'about',
      title: 'About Motivex',
      subtitle: 'Version 1.0.0',
      icon: 'information-circle-outline',
      type: 'navigation',
    },
  ];

  const renderSettingItem = (item: any) => {
    const handlePress = () => {
      if (item.isPro && !isPro) {
        handleUpgradeToPro();
        return;
      }
      
      if (item.type === 'navigation') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // Navigate to specific settings screen
      }
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={item.type === 'switch'}
      >
        <View style={styles.settingIcon}>
          <Ionicons
            name={item.icon}
            size={24}
            color={item.isPro && !isPro ? theme.colors.textSecondary : theme.colors.primary}
          />
        </View>
        
        <View style={styles.settingContent}>
          <View style={styles.settingText}>
            <Text style={[
              styles.settingTitle,
              item.isPro && !isPro && styles.disabledText
            ]}>
              {item.title}
              {item.isPro && !isPro && (
                <Text style={styles.proLabel}> PRO</Text>
              )}
            </Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
          
          {item.type === 'switch' ? (
            <Switch
              value={item.value}
              onValueChange={(value) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                item.onToggle(value);
              }}
              trackColor={{
                false: theme.colors.surface,
                true: theme.colors.primary,
              }}
              thumbColor={theme.colors.text}
            />
          ) : (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={theme.colors.gradient.primary}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                style={styles.avatar}
              >
                <Ionicons name="person" size={32} color={theme.colors.text} />
              </LinearGradient>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Motivex User</Text>
              <Text style={styles.profileEmail}>user@example.com</Text>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipText}>
                  {isPro ? 'PRO MEMBER' : 'FREE MEMBER'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Decorative elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Journey</Text>
          <View style={styles.statsContainer}>
            <StatsCard
              title="Current Streak"
              value={userStats.streak}
              subtitle="days"
              icon="flame"
              gradient={['#EF4444', '#DC2626']}
            />
            <StatsCard
              title="Total Boosts"
              value={userStats.totalBoosts}
              subtitle="completed"
              icon="headset"
              gradient={theme.colors.gradient.primary}
            />
          </View>
          <View style={styles.statsContainer}>
            <StatsCard
              title="Minutes Listened"
              value={userStats.totalMinutes}
              subtitle="of motivation"
              icon="time"
              gradient={['#10B981', '#059669']}
            />
            <StatsCard
              title="Achievements"
              value={12}
              subtitle="unlocked"
              icon="trophy"
              gradient={['#F59E0B', '#D97706']}
            />
          </View>
        </View>

        {/* Upgrade to Pro */}
        {!isPro && (
          <View style={styles.proSection}>
            <LinearGradient
              colors={theme.colors.gradient.secondary}
              style={styles.proCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.proContent}>
                <Ionicons name="star" size={32} color={theme.colors.text} />
                <Text style={styles.proTitle}>Upgrade to Pro</Text>
                <Text style={styles.proSubtitle}>
                  Unlock full library, offline mode, AI Coach, and exclusive challenges
                </Text>
                <GradientButton
                  title="Upgrade Now"
                  onPress={handleUpgradeToPro}
                  gradient={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  style={styles.upgradeButton}
                />
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            {settingsItems.map(renderSettingItem)}
          </View>
        </View>

        {/* Bottom spacing */}
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
  backButton: {
    padding: theme.spacing.xs,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: '700',
  },
  placeholder: {
    width: 32, // Same as back button
  },
  profileCard: {
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    ...theme.shadows.large,
    overflow: 'hidden',
    position: 'relative',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  avatarContainer: {
    marginRight: theme.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  profileEmail: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.sm,
  },
  membershipBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  membershipText: {
    ...theme.typography.small,
    color: theme.colors.text,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 1,
  },
  statsSection: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '700',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  proSection: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  proCard: {
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.large,
  },
  proContent: {
    alignItems: 'center',
  },
  proTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: '700',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  proSubtitle: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  upgradeButton: {
    minWidth: 150,
  },
  settingsSection: {
    marginTop: theme.spacing.xl,
  },
  settingsContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingIcon: {
    marginRight: theme.spacing.md,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  settingSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
  proLabel: {
    ...theme.typography.small,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 100, // Space for mini player
  },
});
