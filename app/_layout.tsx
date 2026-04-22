import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from '@/hooks/useAppFonts';
import { colors } from '@/constants/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.amber} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <SafeAreaProvider>
        <StatusBar style="light" translucent />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="paywall" />
          <Stack.Screen name="error" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="your-house" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="fix-selection" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="repair/[id]" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="repair-step" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="warranty" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="seasonal" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="home-overview" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen
            name="find-a-pro"
            options={{ presentation: 'transparentModal', animation: 'fade' }}
          />
          <Stack.Screen
            name="(onboarding)/signup-ask"
            options={{ presentation: 'transparentModal', animation: 'fade' }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
});
