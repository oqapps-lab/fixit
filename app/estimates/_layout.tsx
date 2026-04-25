import React from 'react';
import { Stack } from 'expo-router';

export default function EstimatesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#08080A' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="compare" />
    </Stack>
  );
}
