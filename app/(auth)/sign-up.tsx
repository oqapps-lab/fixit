import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

/**
 * Sign Up (2.1) — new account creation via Apple / Google / Email.
 * Reached from signup-ask modal (after first estimate aha) or from sign-in "no account yet".
 */
export default function SignUp() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const onSuccess = () => router.replace('/(tabs)');
  const goSignIn = () => router.push('/(auth)/sign-in');

  return (
    <NoirScreen glow="amber">
      <NoirHeader brand="FIXIT · ACCOUNT · NEW" showBack />

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
          <DocRef>STEP · CREATE</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            UNLOCK YOUR{'\n'}REPAIR VAULT
          </Text>
          <Text allowFontScaling={false} style={styles.body}>
            Save estimates, track warranties, get seasonal nudges. Your photos stay on your account — never shared.
          </Text>
        </View>

        <View style={styles.options}>
          <AmberCTA
            label="Continue with Apple"
            variant="glass"
            size="lg"
            onPress={onSuccess}
            accessibilityLabel="Continue with Apple — creates account and goes to home"
          />
          <AmberCTA
            label="Continue with Google"
            variant="glass"
            size="lg"
            onPress={onSuccess}
            accessibilityLabel="Continue with Google — creates account and goes to home"
          />
          <AmberCTA
            label="Sign up with email"
            variant="primary"
            size="lg"
            onPress={onSuccess}
            accessibilityLabel="Sign up with email — creates account and goes to home"
          />
        </View>

        <Pressable
          onPress={goSignIn}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Already have an account, go to sign in"
          style={styles.switchLink}
        >
          <Text allowFontScaling={false} style={styles.switchLinkText}>
            Already have an account?  <Text style={styles.switchLinkAccent}>Sign in →</Text>
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
