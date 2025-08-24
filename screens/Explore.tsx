import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { playlists } from '../lib/data';
import { PlaylistCard } from '../components/PlaylistCard';

interface ExploreProps {
  navigation: any;
}

export const Explore: React.FC<ExploreProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Focus', 'Fitness', 'Study', 'Morning', 'Confidence'];

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || playlist.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlaylistPress = (playlist: any) => {
    navigation.navigate('Playlist', { playlist });
  };

  const renderCategory = ({ item }: { item: string }) => {
    const isSelected = item === selectedCategory;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        activeOpacity={0.8}
        style={[styles.categoryButton, isSelected && styles.selectedCategory]}
      >
        {isSelected ? (
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.categoryGradient}
          >
            <Text style={[styles.categoryText, styles.selectedCategoryText]}>
              {item}
            </Text>
          </LinearGradient>
        ) : (
          <Text style={styles.categoryText}>{item}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderPlaylist = ({ item }: { item: any }) => (
    <PlaylistCard
      playlist={item}
      onPress={() => handlePlaylistPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover your perfect motivation</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search playlists..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      {/* Results */}
      <ScrollView
        style={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContent}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {selectedCategory === 'All' ? 'All Playlists' : selectedCategory}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredPlaylists.length} playlist{filteredPlaylists.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredPlaylists.length > 0 ? (
          <View style={styles.playlistsContainer}>
            {filteredPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onPress={() => handlePlaylistPress(playlist)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <LinearGradient
              colors={theme.colors.gradient.primary}
              style={styles.emptyIcon}
            >
              <Ionicons name="search" size={32} color={theme.colors.text} />
            </LinearGradient>
            <Text style={styles.emptyTitle}>No playlists found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or category filter
            </Text>
          </View>
        )}

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
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    fontWeight: '700',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    ...theme.shadows.small,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
    paddingVertical: theme.spacing.xs,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  categoriesSection: {
    marginBottom: theme.spacing.lg,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  categoryButton: {
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  selectedCategory: {
    // Handled by gradient
  },
  categoryGradient: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  categoryText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  selectedCategoryText: {
    color: theme.colors.text,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: theme.spacing.md,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  resultsTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '700',
  },
  resultsCount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  playlistsContainer: {
    // Playlists will be rendered here
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    maxWidth: 250,
  },
  bottomSpacing: {
    height: 100, // Space for mini player
  },
});
