import React from 'react';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#08080A' },
      }}
    >
      <Stack.Screen name="edit" />
      <Stack.Screen name="maintenance" />
      <Stack.Screen name="room/[name]" />
    </Stack>
  );
}
