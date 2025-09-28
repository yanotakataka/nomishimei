import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isExpoGo = Constants.executionEnvironment === 'storeClient';

  useEffect(() => {
    // Expo Goではない、かつWebではない場合のみAdMobを初期化
    if (!isExpoGo && Platform.OS !== 'web') {
      try {
        const mobileAds = require('react-native-google-mobile-ads').default;
        mobileAds()
          .initialize()
          .then((adapterStatuses: any) => {
            console.log('AdMob initialized:', adapterStatuses);
          });
      } catch (error) {
        console.log('AdMob not available in this environment');
      }
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
