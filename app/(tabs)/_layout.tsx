import React from 'react';
import { Tabs } from 'expo-router';
import { NoirTabBar } from '@/components/ui/NoirTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <NoirTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="repairs" />
      <Tabs.Screen name="blueprints" />
      <Tabs.Screen name="vault" />
    </Tabs>
  );
}
