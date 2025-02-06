import React from 'react';
import { StyleSheet, Switch, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GradientBackground } from '@/components/GradientBackground';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = React.useState(systemColorScheme === 'dark');
  const colors = theme.colors[isDarkMode ? 'dark' : 'light'];

  const toggleDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('colorScheme', value ? 'dark' : 'light');
  };

  return (
    <GradientBackground>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.settingRow}>
          <ThemedText style={[styles.settingText, { color: colors.primary }]}>
            Dark Mode
          </ThemedText>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#162B35' }}
            thumbColor={isDarkMode ? '#FFFFFF' : '#f4f3f4'}
          />
        </ThemedView>
      </ThemedView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF20',
  },
  settingText: {
    fontSize: 16,
  },
}); 