import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';
import { signInWithOAuth, signUpWithEmail } from '@/lib/auth/supabase-auth';
/**
 * Sign Up (2.1) — new account creation via Apple / Google / Email.
 * Reached from signup-ask modal (after first estimate aha) or from sign-in "no account yet".
 */
export default function SignUp() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [oauthLoadingProvider, setOauthLoadingProvider] = useState(null);
    const onSuccess = () => router.replace('/(tabs)');
    const goSignIn = () => router.push('/(auth)/sign-in');
    const onEmailSignUp = async () => {
        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedEmail.length === 0 || password.length < 6) {
            setErrorMessage('Use a valid email and password with at least 6 characters.');
            return;
        }

        setErrorMessage(null);
        setIsEmailLoading(true);
        try {
            await signUpWithEmail({
                email: normalizedEmail,
                password,
            });
            onSuccess();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Email sign-up failed.';
            setErrorMessage(message);
        }
        finally {
            setIsEmailLoading(false);
        }
    };
    const onOAuthSignUp = async (provider) => {
        setErrorMessage(null);
        setOauthLoadingProvider(provider);
        try {
            const result = await signInWithOAuth(provider);
            if (result.completed) {
                onSuccess();
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'OAuth sign-up failed.';
            setErrorMessage(message);
        }
        finally {
            setOauthLoadingProvider(null);
        }
    };
    return (<NoirScreen glow="amber">
      <NoirHeader brand="FIXIT · ACCOUNT · NEW" showBack/>

      <ScrollView contentContainerStyle={[
            styles.content,
            {
                paddingTop: insets.top + spacing.huge,
                paddingBottom: insets.bottom + spacing.xxxl,
            },
        ]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <DocRef>STEP · CREATE · SUPABASE AUTH</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            UNLOCK YOUR{'\n'}REPAIR VAULT
          </Text>
          <Text allowFontScaling={false} style={styles.body}>
            Save estimates, track warranties, get seasonal nudges. Your photos stay on your account — never shared.
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput allowFontScaling={false} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.textDim} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={styles.input} accessibilityLabel="Email"/>
          <TextInput allowFontScaling={false} value={password} onChangeText={setPassword} placeholder="Password (min 6 chars)" placeholderTextColor={colors.textDim} secureTextEntry autoCapitalize="none" autoCorrect={false} style={styles.input} accessibilityLabel="Password"/>
          {errorMessage !== null ? (<Text allowFontScaling={false} style={styles.errorText}>{errorMessage}</Text>) : null}
        </View>

        <View style={styles.options}>
          <AmberCTA label="Sign up with email" variant="primary" size="lg" loading={isEmailLoading} disabled={oauthLoadingProvider !== null} onPress={onEmailSignUp} accessibilityLabel="Sign up with email — creates account and goes to home"/>
          <AmberCTA label="Continue with Google" variant="glass" size="lg" loading={oauthLoadingProvider === 'google'} disabled={isEmailLoading || oauthLoadingProvider === 'apple'} onPress={() => onOAuthSignUp('google')} accessibilityLabel="Continue with Google — creates account and goes to home"/>
          <AmberCTA label="Continue with Apple" variant="glass" size="lg" loading={oauthLoadingProvider === 'apple'} disabled={isEmailLoading || oauthLoadingProvider === 'google'} onPress={() => onOAuthSignUp('apple')} accessibilityLabel="Continue with Apple — creates account and goes to home"/>
        </View>

        <Pressable onPress={goSignIn} hitSlop={8} accessibilityRole="button" accessibilityLabel="Already have an account, go to sign in" style={styles.switchLink}>
          <Text allowFontScaling={false} style={styles.switchLinkText}>
            Already have an account?  <Text style={styles.switchLinkAccent}>Sign in →</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </NoirScreen>);
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
    form: {
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.hairlineStrong,
        borderRadius: 12,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.text,
        backgroundColor: colors.surface1,
    },
    errorText: {
        marginTop: spacing.xs,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.danger,
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
});
