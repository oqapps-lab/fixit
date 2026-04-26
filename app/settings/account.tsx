import React, { useMemo, useState } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type ProviderInfo = {
  label: string;
  ref: string;
  tone: 'amber' | 'cyan' | 'mint' | 'neutral';
};

function providerInfo(provider: string | undefined): ProviderInfo {
  switch (provider) {
    case 'apple':
      return { label: 'Apple ID', ref: 'APPLE', tone: 'amber' };
    case 'google':
      return { label: 'Google', ref: 'GOOGLE', tone: 'cyan' };
    case 'email':
      return { label: 'Email', ref: 'EMAIL', tone: 'mint' };
    default:
      return { label: provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : '—', ref: (provider ?? 'UNKNOWN').toUpperCase(), tone: 'neutral' };
  }
}

function relativeFromNow(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.round(diff / (1000 * 60));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AccountSettings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();

  const signedIn = !!user;
  const email = user?.email ?? '—';
  const provider = user?.app_metadata?.provider as string | undefined;
  const info = useMemo(() => providerInfo(provider), [provider]);
  const lastUsed = relativeFromNow(user?.last_sign_in_at ?? null);
  const lastUsedLabel = lastUsed ? `Last used ${lastUsed} · this device` : 'this device';

  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [resetSending, setResetSending] = useState(false);

  const onResetPassword = async () => {
    Haptics.selectionAsync().catch(() => {});
    if (!user?.email) {
      Alert.alert('Coming soon', 'Password reset is not available for this sign-in method yet.');
      return;
    }
    setResetSending(true);
    setResetMsg(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) {
        setResetMsg(`Could not send reset email: ${error.message}`);
      } else {
        setResetMsg(`Reset link sent to ${user.email}.`);
      }
    } catch (e: any) {
      setResetMsg(`Could not send reset email: ${e?.message ?? 'unknown error'}`);
    } finally {
      setResetSending(false);
      setTimeout(() => setResetMsg(null), 5000);
    }
  };

  const onSignOut = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    Alert.alert('Sign out?', 'Saved projects stay on this device until next sign-in.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } finally {
            router.replace('/(auth)/sign-in');
          }
        },
      },
    ]);
  };

  const onDeleteAccount = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    Alert.alert(
      'Delete account?',
      'This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } finally {
              Alert.alert(
                'Contact support',
                'Contact support@fixit.app to delete your account.',
                [{ text: 'OK', onPress: () => router.replace('/(auth)/sign-in') }],
              );
            }
          },
        },
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
          <Text allowFontScaling={false} style={styles.value}>{email}</Text>
        </NoirCard>

        <NoirCard variant="default" radius="md" padding={18} style={{ marginTop: spacing.sm }}>
          <View style={styles.rowSplit}>
            <Label tone="tertiary" size="micro">Sign-in method</Label>
            <DocRef tone={info.tone}>{info.ref}</DocRef>
          </View>
          <Text allowFontScaling={false} style={styles.value}>{info.label}</Text>
          <Text allowFontScaling={false} style={styles.meta}>{lastUsedLabel}</Text>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={styles.section}>Security</Label>
        <Pressable
          onPress={onResetPassword}
          accessibilityRole="button"
          accessibilityLabel="Send password reset email"
          disabled={resetSending}
          hitSlop={6}
        >
          {({ pressed }) => (
            <NoirCard variant="default" radius="md" padding={16} style={pressed ? { opacity: 0.65 } : null}>
              <Text allowFontScaling={false} style={styles.linkRow}>
                {resetSending ? 'Sending…' : 'Send password reset email'}
              </Text>
              <Text allowFontScaling={false} style={styles.meta}>For email sign-in only</Text>
              {resetMsg ? (
                <Text allowFontScaling={false} style={styles.confirm}>{resetMsg}</Text>
              ) : null}
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
  confirm: {
    marginTop: 8,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.mint,
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
