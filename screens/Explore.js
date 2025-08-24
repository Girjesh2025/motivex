import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { playlists } from '../lib/data';

export const Explore = () => {
  const handlePlaylistPress = (playlist) => {
    console.log('Playlist pressed:', playlist.title);
    // Add playlist navigation logic here
  };

  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category);
    // Add category filter logic here
  };

  const renderPlaylistCard = (playlist) => (
    <TouchableOpacity 
      key={playlist.id} 
      style={styles.playlistCard}
      onPress={() => handlePlaylistPress(playlist)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={playlist.gradient}
        style={styles.playlistGradient}
      >
        <View style={styles.playlistContent}>
          <Ionicons name={playlist.icon} size={32} color="white" />
          <Text style={styles.playlistTitle}>{playlist.title}</Text>
          <Text style={styles.playlistDescription}>{playlist.description}</Text>
          <Text style={styles.playlistCount}>
            {playlist.boosts.length} बूस्ट
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>एक्सप्लोर करें</Text>
        <Text style={styles.headerSubtitle}>नई मोटिवेशन प्लेलिस्ट खोजें</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>फीचर्ड प्लेलिस्ट</Text>
        <View style={styles.playlistGrid}>
          {playlists.map(renderPlaylistCard)}
        </View>

        <Text style={styles.sectionTitle}>कैटेगरी</Text>
        <View style={styles.categoriesContainer}>
          {['फोकस', 'फिटनेस', 'पढ़ाई', 'सुबह', 'आत्मविश्वास', 'आध्यात्म', 'प्रेरणा'].map((category) => (
            <TouchableOpacity 
              key={category} 
              style={styles.categoryChip}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  playlistGrid: {
    marginBottom: 32,
  },
  playlistCard: {
    marginBottom: 16,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  playlistGradient: {
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
  },
  playlistContent: {
    alignItems: 'center',
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  playlistCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
});
