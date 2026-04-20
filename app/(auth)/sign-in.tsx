import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { SerifHero } from '@/components/ui/SerifHero';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

/**
 * Sign In (2.2) — returning user auth via Apple / Google / Email.
 * Reached from sign-up "already have an account" or app cold-start for returning user.
 */
export default function SignIn() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const onSuccess = () => router.replace('/(tabs)');
  const goSignUp = () => router.push('/(auth)/sign-up');

  return (
    <NoirScreen glow="cyan">
      <NoirHeader brand="FIXIT · ACCOUNT · RETURN" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.huge,
            paddingBottom: insets.bottom + spacing.xxxl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <DocRef>STEP · RETURN</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            WELCOME{'\n'}BACK
          </Text>
          <SerifHero size={22} tone="secondary" style={styles.tagline}>
            Your vault is waiting.
          </SerifHero>
          <Text allowFontScaling={false} style={styles.body}>
            Sign in to see past estimates, saved projects, warranties.
          </Text>
        </View>

        <View style={styles.options}>
          <AmberCTA
            label="Sign in with Apple"
            variant="glass"
            size="lg"
            onPress={onSuccess}
            accessibilityLabel="Sign in with Apple — returns to home"
          />
          <AmberCTA
            label="Sign in with Google"
            variant="glass"
            size="lg"
            onPress={onSuccess}
            accessibilityLabel="Sign in with Google — returns to home"
          />
          <AmberCTA
            label="Sign in with email"
            variant="primary"
            size="lg"
            onPress={onSuccess}
            accessibilityLabel="Sign in with email — returns to home"
          />
        </View>

        <Pressable
          onPress={goSignUp}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="No account yet, go to sign up"
          style={styles.switchLink}
        >
          <Text allowFontScaling={false} style={styles.switchLinkText}>
            No account yet?  <Text style={styles.switchLinkAccent}>Sign up →</Text>
          </Text>
        </Pressable>

        <Text allowFontScaling={false} style={styles.legal}>
          By continuing you agree to Terms and Privacy
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginBottom: spacing.huge,
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 46,
    lineHeight: 48,
    color: colors.text,
    letterSpacing: 1.2,
  },
  tagline: {
    marginTop: spacing.md,
  },
  body: {
    marginTop: spacing.lg,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
    maxWidth: 360,
  },
  options: {
    gap: spacing.sm,
  },
  switchLink: {
    marginTop: spacing.xxl,
    alignSelf: 'center',
    paddingVertical: spacing.sm,
  },
  switchLinkText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
  switchLinkAccent: {
    fontFamily: fonts.bodySemibold,
    color: colors.amber,
  },
  legal: {
    marginTop: spacing.xl,
    alignSelf: 'center',
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
    letterSpacing: tracking.label,
    textAlign: 'center',
    maxWidth: 300,
  },
});
