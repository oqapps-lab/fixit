import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { SerifHero } from '@/components/ui/SerifHero';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';
import { signInWithEmail, signInWithOAuth } from '@/lib/auth/supabase-auth';
/**
 * Sign In (2.2) — returning user auth via Apple / Google / Email.
 * Reached from sign-up "already have an account" or app cold-start for returning user.
 */
export default function SignIn() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [oauthLoadingProvider, setOauthLoadingProvider] = useState(null);
    const onSuccess = () => router.replace('/(tabs)');
    const goSignUp = () => router.push('/(auth)/sign-up');
    const onEmailSignIn = async () => {
        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedEmail.length === 0 || password.length < 6) {
            setErrorMessage('Enter a valid email and password.');
            return;
        }

        setErrorMessage(null);
        setIsEmailLoading(true);
        try {
            await signInWithEmail({
                email: normalizedEmail,
                password,
            });
            onSuccess();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Email sign-in failed.';
            setErrorMessage(message);
        }
        finally {
            setIsEmailLoading(false);
        }
    };
    const onOAuthSignIn = async (provider) => {
        setErrorMessage(null);
        setOauthLoadingProvider(provider);
        try {
            const result = await signInWithOAuth(provider);
            if (result.completed) {
                onSuccess();
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'OAuth sign-in failed.';
            setErrorMessage(message);
        }
        finally {
            setOauthLoadingProvider(null);
        }
    };
    return (<NoirScreen glow="cyan">
      <NoirHeader brand="FIXIT · ACCOUNT · RETURN" showBack/>

      <ScrollView contentContainerStyle={[
            styles.content,
            {
                paddingTop: insets.top + spacing.huge,
                paddingBottom: insets.bottom + spacing.xxxl,
            },
        ]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <DocRef>STEP · RETURN · SUPABASE AUTH</DocRef>
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

        <View style={styles.form}>
          <TextInput allowFontScaling={false} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.textDim} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={styles.input} accessibilityLabel="Email"/>
          <TextInput allowFontScaling={false} value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.textDim} secureTextEntry autoCapitalize="none" autoCorrect={false} style={styles.input} accessibilityLabel="Password"/>
          {errorMessage !== null ? (<Text allowFontScaling={false} style={styles.errorText}>{errorMessage}</Text>) : null}
        </View>

        <View style={styles.options}>
          <AmberCTA label="Sign in with email" variant="primary" size="lg" loading={isEmailLoading} disabled={oauthLoadingProvider !== null} onPress={onEmailSignIn} accessibilityLabel="Sign in with email — returns to home"/>
          <AmberCTA label="Sign in with Google" variant="glass" size="lg" loading={oauthLoadingProvider === 'google'} disabled={isEmailLoading || oauthLoadingProvider === 'apple'} onPress={() => onOAuthSignIn('google')} accessibilityLabel="Sign in with Google — returns to home"/>
          <AmberCTA label="Sign in with Apple" variant="glass" size="lg" loading={oauthLoadingProvider === 'apple'} disabled={isEmailLoading || oauthLoadingProvider === 'google'} onPress={() => onOAuthSignIn('apple')} accessibilityLabel="Sign in with Apple — returns to home"/>
        </View>

        <Pressable onPress={goSignUp} hitSlop={8} accessibilityRole="button" accessibilityLabel="No account yet, go to sign up" style={styles.switchLink}>
          <Text allowFontScaling={false} style={styles.switchLinkText}>
            No account yet?  <Text style={styles.switchLinkAccent}>Sign up →</Text>
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
