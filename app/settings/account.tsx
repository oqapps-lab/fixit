import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';

export default function AccountSettings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [signedIn] = useState(true); // mock — Supabase real в Stage 07

  const onChangePassword = () => {
    Haptics.selectionAsync().catch(() => {});
    Alert.alert('Change password', 'A reset link will be sent to your email.');
  };

  const onSignOut = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    Alert.alert('Sign out?', 'Saved projects stay on this device until next sign-in.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => router.replace('/(auth)/sign-in') },
    ]);
  };

  const onDeleteAccount = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    Alert.alert(
      'Delete account?',
      'All projects, photos and warranties will be permanently removed. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.replace('/(onboarding)/welcome') },
      ],
    );
  };

  return (
    <NoirScreen>
      <NoirHeader brand="SET-01 · ACCOUNT" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>PROFILE · IDENTITY</DocRef>
        <Text allowFontScaling={false} style={styles.title}>ACCOUNT</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Your sign-in details and account-level controls.
        </Text>

        <Label tone="tertiary" size="micro" style={styles.section}>Identity</Label>
        <NoirCard variant="default" radius="md" padding={18}>
          <View style={styles.rowSplit}>
            <Label tone="tertiary" size="micro">Email</Label>
            <DocRef tone="cyan">VERIFIED</DocRef>
          </View>
          <Text allowFontScaling={false} style={styles.value}>amanda@example.com</Text>
        </NoirCard>

        <NoirCard variant="default" radius="md" padding={18} style={{ marginTop: spacing.sm }}>
          <View style={styles.rowSplit}>
            <Label tone="tertiary" size="micro">Sign-in method</Label>
            <DocRef tone="amber">APPLE</DocRef>
          </View>
          <Text allowFontScaling={false} style={styles.value}>Apple ID</Text>
          <Text allowFontScaling={false} style={styles.meta}>Last used 2 hours ago · this device</Text>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={styles.section}>Security</Label>
        <Pressable
          onPress={onChangePassword}
          accessibilityRole="button"
          accessibilityLabel="Change password"
          hitSlop={6}
        >
          {({ pressed }) => (
            <NoirCard variant="default" radius="md" padding={16} style={pressed ? { opacity: 0.65 } : null}>
              <Text allowFontScaling={false} style={styles.linkRow}>Send password reset email</Text>
              <Text allowFontScaling={false} style={styles.meta}>For email sign-in only</Text>
            </NoirCard>
          )}
        </Pressable>

        <Label tone="tertiary" size="micro" style={styles.section}>Session</Label>
        <AmberCTA
          label={signedIn ? 'Sign out' : 'Sign in'}
          variant="outlined"
          size="lg"
          onPress={onSignOut}
        />

        <Label tone="danger" size="micro" style={styles.sectionDanger}>Danger zone</Label>
        <NoirCard variant="default" radius="md" padding={18} style={styles.danger}>
          <Text allowFontScaling={false} style={styles.dangerTitle}>Delete account</Text>
          <Text allowFontScaling={false} style={styles.meta}>
            Removes all projects, photos, warranties and AI estimates. GDPR-compliant — irreversible.
          </Text>
          <View style={{ height: spacing.md }} />
          <AmberCTA
            label="Delete account"
            variant="dark"
            size="md"
            onPress={onDeleteAccount}
          />
        </NoirCard>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 40,
    lineHeight: 42,
    color: colors.text,
    letterSpacing: 1.2,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  sectionDanger: {
    marginTop: spacing.colossal,
    marginBottom: spacing.md,
  },
  rowSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
  },
  meta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  linkRow: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  danger: {
    borderColor: colors.hairlineDanger,
  },
  dangerTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.danger,
  },
});
