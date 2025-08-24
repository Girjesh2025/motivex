import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { getTodaysBoost, dailyChallenges, moodOptions } from '../lib/data';

export const Home = ({ currentBoost, isPlaying, onPlayBoost }) => {
  const todaysBoost = getTodaysBoost();
  const [selectedMood, setSelectedMood] = React.useState(null);
  const [challenges, setChallenges] = React.useState(dailyChallenges);

  const handlePlayBoost = () => {
    if (onPlayBoost) {
      onPlayBoost(todaysBoost);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleChallengeComplete = (challengeId) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={theme.colors.gradient.primary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>नमस्ते!</Text>
          <Text style={styles.subtitle}>आज के मोटिवेशन के लिए तैयार हैं?</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.todayCard}>
          <Text style={styles.cardTitle}>आज का मोटिवेशन</Text>
          <Text style={styles.quote}>"{todaysBoost.quote}"</Text>
          <Text style={styles.author}>- {todaysBoost.author}</Text>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayBoost}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color="white" 
            />
            <Text style={styles.playText}>
              {isPlaying ? "रोकें" : "सुनें"} ({todaysBoost.duration}s)
            </Text>
          </TouchableOpacity>
        </View>

        {/* NEW FEATURE: Mood Tracker */}
        <View style={styles.moodCard}>
          <Text style={styles.cardTitle}>आज आपका मूड कैसा है?</Text>
          <View style={styles.moodContainer}>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton,
                  selectedMood?.id === mood.id && { backgroundColor: mood.color + '20', borderColor: mood.color }
                ]}
                onPress={() => handleMoodSelect(mood)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* NEW FEATURE: Daily Challenges */}
        <View style={styles.challengesCard}>
          <Text style={styles.cardTitle}>आज की चुनौतियां</Text>
          {challenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={[
                styles.challengeItem,
                challenge.completed && styles.challengeCompleted
              ]}
              onPress={() => handleChallengeComplete(challenge.id)}
            >
              <View style={styles.challengeLeft}>
                <Ionicons 
                  name={challenge.completed ? "checkmark-circle" : challenge.icon} 
                  size={24} 
                  color={challenge.completed ? theme.colors.success : theme.colors.primary} 
                />
                <View style={styles.challengeText}>
                  <Text style={[
                    styles.challengeTitle,
                    challenge.completed && styles.challengeCompletedText
                  ]}>
                    {challenge.title}
                  </Text>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                </View>
              </View>
              <Text style={styles.challengePoints}>+{challenge.points}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>दिन की लगातारता</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>कुल बूस्ट</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1250</Text>
            <Text style={styles.statLabel}>मिनट</Text>
          </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 20,
  },
  todayCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginBottom: 20,
    ...theme.shadows.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  quote: {
    fontSize: 16,
    color: theme.colors.text,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  author: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.md,
  },
  playText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    ...theme.shadows.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  // NEW FEATURES STYLES
  moodCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginBottom: 20,
    ...theme.shadows.md,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
    marginHorizontal: 4,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '500',
  },
  challengesCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginBottom: 20,
    ...theme.shadows.md,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  challengeCompleted: {
    backgroundColor: theme.colors.success + '20',
  },
  challengeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  challengeText: {
    marginLeft: 12,
    flex: 1,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  challengeCompletedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  challengeDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  challengePoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
