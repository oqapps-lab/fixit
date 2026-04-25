import React from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/tokens';

export default function Entry() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.amber} />
      </View>
    );
  }

  if (session?.user) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/(onboarding)/welcome" />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
});
