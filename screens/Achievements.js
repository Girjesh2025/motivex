import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { achievements } from '../lib/data';

export const Achievements = () => {
  const totalPoints = achievements.reduce((sum, achievement) => 
    sum + (achievement.unlocked ? achievement.points : 0), 0
  );

  const renderAchievement = (achievement) => (
    <View 
      key={achievement.id} 
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.achievementLocked
      ]}
    >
      <View style={styles.achievementLeft}>
        <View style={[
          styles.achievementIcon,
          { backgroundColor: achievement.unlocked ? theme.colors.primary : theme.colors.textSecondary }
        ]}>
          <Ionicons 
            name={achievement.icon} 
            size={24} 
            color="white" 
          />
        </View>
        <View style={styles.achievementText}>
          <Text style={[
            styles.achievementTitle,
            !achievement.unlocked && styles.achievementTitleLocked
          ]}>
            {achievement.title}
          </Text>
          <Text style={styles.achievementDescription}>
            {achievement.description}
          </Text>
        </View>
      </View>
      <View style={styles.achievementRight}>
        <Text style={[
          styles.achievementPoints,
          !achievement.unlocked && styles.achievementPointsLocked
        ]}>
          +{achievement.points}
        </Text>
        {achievement.unlocked && (
          <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={theme.colors.gradient.primary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>उपलब्धियां</Text>
          <Text style={styles.headerSubtitle}>आपकी प्रगति का जश्न मनाएं</Text>
          <View style={styles.pointsContainer}>
            <Ionicons name="trophy" size={24} color="white" />
            <Text style={styles.totalPoints}>{totalPoints} पॉइंट्स</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>आपकी उपलब्धियां</Text>
        {achievements.map(renderAchievement)}
        
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>बधाई हो! 🎉</Text>
          <Text style={styles.motivationText}>
            आप बहुत अच्छा कर रहे हैं। अपनी यात्रा जारी रखें और नई उपलब्धियां हासिल करें!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.xl,
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.sm,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: theme.colors.textSecondary,
  },
  achievementDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  achievementRight: {
    alignItems: 'center',
  },
  achievementPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  achievementPointsLocked: {
    color: theme.colors.textSecondary,
  },
  motivationCard: {
    backgroundColor: theme.colors.success + '20',
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.success,
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
});
