import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { Label } from '@/components/ui/Label';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUp() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const submit = async () => {
    if (!email.trim() || password.length < 6) {
      setError('Enter a valid email and a password ≥ 6 chars.');
      return;
    }
    setSubmitting(true);
    setError(null);
    setInfo(null);
    const { error: err } = await signUp(email.trim(), password);
    setSubmitting(false);
    if (err) {
      setError(friendlyAuthError(err));
      return;
    }
    setInfo('Check your inbox to confirm. Once confirmed you can sign in.');
  };

  function friendlyAuthError(raw: string): string {
    const lower = raw.toLowerCase();
    if (lower.includes('email address') && lower.includes('is invalid')) {
      return "Please use a real email (test/example domains aren't allowed).";
    }
    if (lower.includes('rate limit') || lower.includes('over_email_send_rate_limit')) {
      return 'Too many sign-ups recently — please wait a few minutes.';
    }
    return raw;
  }

  return (
    <NoirScreen glow="amber">
      <NoirHeader brand="FIXIT · ACCOUNT · NEW" showBack />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + spacing.huge, paddingBottom: insets.bottom + spacing.xxxl },
          ]}
          keyboardShouldPersistTaps="handled"
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

          <View style={styles.fields}>
            <Label tone="tertiary" size="micro">Email</Label>
            <NoirCard variant="outlined" radius="md" padding={0} style={styles.fieldCard}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={colors.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                style={styles.input}
                accessibilityLabel="Email"
              />
            </NoirCard>

            <Label tone="tertiary" size="micro" style={{ marginTop: spacing.lg }}>Password</Label>
            <NoirCard variant="outlined" radius="md" padding={0} style={styles.fieldCard}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="At least 6 characters"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                textContentType="newPassword"
                keyboardType="ascii-capable"
                style={styles.input}
                accessibilityLabel="Password"
                onSubmitEditing={submit}
              />
            </NoirCard>

            {error ? <Text style={styles.error}>{error}</Text> : null}
            {info ? <Text style={styles.info}>{info}</Text> : null}
          </View>

          <View style={styles.cta}>
            <AmberCTA
              label={submitting ? 'Creating account…' : 'Create account'}
              variant="primary"
              size="lg"
              onPress={submit}
              disabled={submitting}
              accessibilityLabel="Create account"
            />
          </View>

          <Pressable
            onPress={() => router.push('/(auth)/sign-in')}
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
      </KeyboardAvoidingView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingHorizontal: spacing.xl },
  header: { marginBottom: spacing.xxl },
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
  fields: { marginTop: spacing.md },
  fieldCard: {
    marginTop: spacing.sm,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  input: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  error: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.danger,
  },
  info: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.mint,
  },
  cta: { marginTop: spacing.xl },
  switchLink: { marginTop: spacing.xxl, alignSelf: 'center', paddingVertical: spacing.sm },
  switchLinkText: { fontFamily: fonts.body, fontSize: typeScale.bodyMedium, color: colors.textSecondary },
  switchLinkAccent: { fontFamily: fonts.bodySemibold, color: colors.amber },
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
