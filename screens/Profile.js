import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { getUserStats } from '../lib/data';

export const Profile = () => {
  const stats = getUserStats();

  const menuItems = [
    { icon: 'settings-outline', title: 'सेटिंग्स', subtitle: 'अपने अनुभव को कस्टमाइज़ करें' },
    { icon: 'notifications-outline', title: 'नोटिफिकेशन', subtitle: 'अपने अलर्ट मैनेज करें' },
    { icon: 'download-outline', title: 'डाउनलोड', subtitle: 'ऑफ़लाइन कंटेंट' },
    { icon: 'help-circle-outline', title: 'हेल्प और सपोर्ट', subtitle: 'सहायता प्राप्त करें' },
    { icon: 'information-circle-outline', title: 'ऐप के बारे में', subtitle: 'ऐप की जानकारी' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={theme.colors.gradient.primary}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="white" />
          </View>
          <Text style={styles.name}>राहुल शर्मा</Text>
          <Text style={styles.email}>rahul.sharma@example.com</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>आपकी प्रगति</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.streak}</Text>
              <Text style={styles.statLabel}>दिन की लगातारता</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalBoosts}</Text>
              <Text style={styles.statLabel}>कुल बूस्ट</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.floor(stats.totalMinutes / 60)}h</Text>
              <Text style={styles.statLabel}>सुने का समय</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {new Date(stats.joinDate).getFullYear()}
              </Text>
              <Text style={styles.statLabel}>सदस्य बने</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color={theme.colors.textSecondary} 
                />
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
          <Text style={styles.signOutText}>साइन आउट</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 20,
  },
  statsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginBottom: 24,
    ...theme.shadows.md,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  menuSection: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 24,
    ...theme.shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.error,
    marginLeft: 8,
  },
});
