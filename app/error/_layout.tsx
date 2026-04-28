import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/tokens';

/**
 * Error group — transparentModal for inline errors (8.1–8.7),
 * fullScreenModal for blocking states (8.8 force-update, 8.9 maintenance).
 *
 * Deep-link navigation BETWEEN inline errors stacks the new modal on
 * top of the previous one (see paywall/_layout.tsx note). Acceptable
 * trade-off to preserve the custom bottom-sheet design.
 */
export default function ErrorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
        animation: 'fade',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen
        name="force-update"
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade',
          contentStyle: { backgroundColor: colors.bg },
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="maintenance"
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade',
          contentStyle: { backgroundColor: colors.bg },
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
