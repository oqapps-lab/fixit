import React, { useRef, useState } from 'react';
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
import { SerifHero } from '@/components/ui/SerifHero';
import { Label } from '@/components/ui/Label';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';
import { useAuth } from '@/contexts/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const passwordRef = useRef<TextInput>(null);

  const submit = async () => {
    if (!email.trim() || password.length < 6) {
      setError('Enter a valid email and a password ≥ 6 chars.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: err } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <NoirScreen glow="cyan">
      <NoirHeader brand="FIXIT · ACCOUNT · RETURN" showBack />
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
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                style={styles.input}
                accessibilityLabel="Email"
              />
            </NoirCard>

            <Label tone="tertiary" size="micro" style={{ marginTop: spacing.lg }}>Password</Label>
            <NoirCard variant="outlined" radius="md" padding={0} style={styles.fieldCard}>
              <TextInput
                ref={passwordRef}
                value={password}
                onChangeText={setPassword}
                placeholder="• • • • • •"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                keyboardType="ascii-capable"
                returnKeyType="go"
                style={styles.input}
                accessibilityLabel="Password"
                onSubmitEditing={submit}
              />
            </NoirCard>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <View style={styles.cta}>
            <AmberCTA
              label={submitting ? 'Signing in…' : 'Sign in'}
              variant="primary"
              size="lg"
              onPress={submit}
              disabled={submitting}
              accessibilityLabel="Sign in with email and password"
            />
          </View>

          <Pressable
            onPress={() => router.push('/(auth)/sign-up')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="No account yet, go to sign up"
            style={styles.switchLink}
          >
            <Text allowFontScaling={false} style={styles.switchLinkText}>
              No account yet?  <Text style={styles.switchLinkAccent}>Sign up →</Text>
            </Text>
          </Pressable>

          {__DEV__ ? (
            <Pressable
              onPress={async () => {
                setSubmitting(true);
                setError(null);
                const { error: err } = await signIn('demo@fixit.test', 'demo12345');
                setSubmitting(false);
                if (err) { setError(err); return; }
                router.replace('/(tabs)');
              }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Sign in as demo"
              style={styles.demoLink}
            >
              <Text allowFontScaling={false} style={styles.demoLinkText}>
                DEV · sign in as demo
              </Text>
            </Pressable>
          ) : null}

          {__DEV__ ? (
            <Pressable
              onPress={async () => {
                setSubmitting(true);
                setError(null);
                const { error: err } = await signIn('empty-user@fixit.test', 'empty12345');
                setSubmitting(false);
                if (err) { setError(err); return; }
                router.replace('/(tabs)');
              }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Sign in as empty user"
              style={styles.demoLink}
            >
              <Text allowFontScaling={false} style={styles.demoLinkText}>
                DEV · sign in as empty (no data)
              </Text>
            </Pressable>
          ) : null}

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
  tagline: { marginTop: spacing.md },
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
  cta: { marginTop: spacing.xl },
  switchLink: { marginTop: spacing.xxl, alignSelf: 'center', paddingVertical: spacing.sm },
  switchLinkText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
  switchLinkAccent: { fontFamily: fonts.bodySemibold, color: colors.amber },
  demoLink: { marginTop: spacing.md, alignSelf: 'center', paddingVertical: spacing.sm },
  demoLinkText: {
    fontFamily: fonts.mono,
    fontSize: typeScale.labelSmall,
    color: colors.cyan,
    letterSpacing: tracking.docRef,
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
