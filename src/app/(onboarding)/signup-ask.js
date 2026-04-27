import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { SerifHero } from '@/components/ui/SerifHero';
import { colors, fonts, radii, spacing, typeScale } from '@/constants/tokens';
import { signInWithOAuth } from '@/lib/auth/supabase-auth';
/**
 * Presented as transparentModal from repair-detail after first estimate.
 * "Save this estimate — $165 saved" hook.
 */
export default function SignupAsk() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [oauthLoadingProvider, setOauthLoadingProvider] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const close = () => {
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    const onOAuth = async (provider) => {
        setErrorMessage(null);
        setOauthLoadingProvider(provider);
        try {
            const result = await signInWithOAuth(provider);
            if (result.completed) {
                router.replace('/(tabs)');
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
    return (<Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.78)' }]}/>

      <Pressable onPress={(e) => e.stopPropagation()} style={[
            styles.sheet,
            {
                paddingTop: spacing.lg,
                paddingBottom: insets.bottom + spacing.xl,
            },
        ]}>
        <View style={styles.grabber}/>

        <DocRef align="center">SECTOR · ACCOUNT · SAVE STATE</DocRef>

        <View style={styles.header}>
          <Label tone="amber" size="micro" align="center">
            You'd save going DIY
          </Label>
          <HeroNumber value="$165" size="xl" tone="amber" align="center" style={{ marginTop: 4 }}/>
          <SerifHero size={26} align="center" style={{ marginTop: spacing.md }}>
            Keep this estimate?
          </SerifHero>
          <Text allowFontScaling={false} style={styles.body}>
            Save for later · get price alerts · export PDF when you need to argue with a pro.
          </Text>
        </View>

        <View style={styles.options}>
          <AmberCTA label="Continue with Apple" variant="glass" size="lg" loading={oauthLoadingProvider === 'apple'} disabled={oauthLoadingProvider === 'google'} onPress={() => onOAuth('apple')}/>
          <AmberCTA label="Continue with Google" variant="glass" size="lg" loading={oauthLoadingProvider === 'google'} disabled={oauthLoadingProvider === 'apple'} onPress={() => onOAuth('google')}/>
          <AmberCTA label="Sign up with email" variant="primary" size="lg" onPress={() => router.push('/(auth)/sign-up')}/>
        </View>
        {errorMessage !== null ? (<Text allowFontScaling={false} style={styles.errorText}>{errorMessage}</Text>) : null}

        <Pressable onPress={close} hitSlop={8} style={styles.skip}>
          <Text allowFontScaling={false} style={styles.skipText}>
            Not now — I'll lose this estimate
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>);
}
const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: colors.bg,
        borderTopLeftRadius: radii.xl,
        borderTopRightRadius: radii.xl,
        paddingHorizontal: spacing.xl,
        borderWidth: 1,
        borderColor: colors.hairlineStrong,
    },
    grabber: {
        alignSelf: 'center',
        width: 44,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.hairlineStrong,
        marginBottom: spacing.md,
    },
    header: {
        marginTop: spacing.md,
        alignItems: 'center',
    },
    body: {
        marginTop: spacing.md,
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 320,
    },
    options: {
        marginTop: spacing.xxl,
        gap: spacing.sm,
    },
    errorText: {
        marginTop: spacing.sm,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.danger,
        textAlign: 'center',
    },
    skip: {
        marginTop: spacing.lg,
        alignSelf: 'center',
        paddingVertical: spacing.sm,
    },
    skipText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textTertiary,
    },
});
