import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line, Path } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';
import { getEstimateDraft } from '@/lib/estimate/draft';
/** Warning triangle glyph */
function WarningTriangleGlyph({ size = 56, color = colors.danger }) {
    return (<Svg width={size} height={size} viewBox="0 0 56 56">
      <Path d="M28 8L50 46H6L28 8z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" fill="none"/>
      <Line x1={28} y1={22} x2={28} y2={34} stroke={color} strokeWidth={2} strokeLinecap="round"/>
      <Line x1={28} y1={40} x2={28} y2={41.5} stroke={color} strokeWidth={2.5} strokeLinecap="round"/>
    </Svg>);
}

function toUserFriendlyHint(rawMessage) {
    if (typeof rawMessage !== 'string' || rawMessage.length === 0) {
        return 'Try again in a moment.';
    }

    if (rawMessage.includes('Missing ANTHROPIC_API_KEY')) {
        return 'Backend setup is incomplete: ANTHROPIC_API_KEY is missing in .env.';
    }
    if (rawMessage.includes('authentication_error') || rawMessage.includes('invalid x-api-key')) {
        return 'Anthropic API key is invalid or expired. Update ANTHROPIC_API_KEY in .env.';
    }
    if (rawMessage.includes('Unsupported countryCode')) {
        return 'This build supports United States only right now.';
    }
    if (rawMessage.includes('Invalid US ZIP code format')) {
        return 'Enter a valid 5-digit US ZIP code.';
    }
    if (rawMessage.includes('Photo upload failed')) {
        return 'Photo upload failed. Check local Supabase storage and try again.';
    }
    if (rawMessage.includes('Failed to create signed URL')) {
        return 'Photo could not be read by backend. Retake or reselect image.';
    }

    return 'Try retaking the photo or retrying the analysis.';
}

export default function AiFailed() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const draft = getEstimateDraft();
    const userHint = toUserFriendlyHint(draft.errorMessage);
    const close = () => {
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    const retry = () => {
        router.replace('/(onboarding)/processing');
    };
    const retake = () => {
        router.replace('/(onboarding)/capture');
    };
    return (<Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close AI error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]}/>
      <Pressable onPress={(e) => e.stopPropagation()} style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}>
        <View style={styles.grabber}/>

        <View style={styles.topRow}>
          <DocRef tone="danger">ERR-08.3 · SYSTEM · AI TIMEOUT</DocRef>
          <Pressable onPress={close} hitSlop={14} accessibilityRole="button" accessibilityLabel="Dismiss" style={styles.closeBtn}>
            <Text allowFontScaling={false} style={styles.closeX}>×</Text>
          </Pressable>
        </View>

        <View style={styles.iconWrap}>
          <WarningTriangleGlyph size={56} color={colors.danger}/>
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          ANALYSIS FAILED
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          Our AI took too long to respond. Retry, or try a clearer photo.
        </Text>
        <Text allowFontScaling={false} style={styles.hintText}>
          {userHint}
        </Text>
        {draft.errorMessage ? (<Text allowFontScaling={false} style={styles.errorMeta}>
            {draft.errorMessage}
          </Text>) : null}

        <View style={styles.ctaStack}>
          <AmberCTA label="Retry analysis" variant="primary" size="lg" onPress={retry} accessibilityLabel="Retry AI analysis"/>
          <AmberCTA label="Retake photo" variant="outlined" size="lg" onPress={retake} accessibilityLabel="Retake the photo"/>
        </View>

        <Pressable onPress={close} hitSlop={8} accessibilityRole="button" accessibilityLabel="Contact support" style={styles.tertiaryWrap}>
          <Text allowFontScaling={false} style={styles.tertiary}>
            Contact support
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>);
}
const styles = StyleSheet.create({
    backdrop: { flex: 1, justifyContent: 'flex-end' },
    scrim: { backgroundColor: 'rgba(0,0,0,0.70)' },
    sheet: {
        backgroundColor: colors.bg,
        borderTopLeftRadius: radii.xl,
        borderTopRightRadius: radii.xl,
        paddingTop: spacing.lg,
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
        marginBottom: spacing.lg,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    closeBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.hairlineStrong,
        backgroundColor: colors.surface1,
    },
    closeX: {
        fontFamily: fonts.body,
        fontSize: 20,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    iconWrap: {
        alignSelf: 'center',
        marginTop: spacing.xxl,
        marginBottom: spacing.lg,
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,90,90,0.35)',
        backgroundColor: colors.surface1,
    },
    title: {
        fontFamily: fonts.displayNarrowBold,
        fontSize: typeScale.titleLarge,
        color: colors.text,
        letterSpacing: tracking.tight,
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    body: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        lineHeight: 21,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.sm,
    },
    hintText: {
        marginBottom: spacing.lg,
        fontFamily: fonts.bodyMedium,
        fontSize: typeScale.bodySmall,
        lineHeight: 18,
        color: colors.text,
        textAlign: 'center',
    },
    errorMeta: {
        marginTop: -spacing.lg,
        marginBottom: spacing.xl,
        fontFamily: fonts.mono,
        fontSize: typeScale.labelMicro,
        lineHeight: 14,
        color: colors.textDim,
        textAlign: 'center',
    },
    ctaStack: { gap: spacing.md },
    tertiaryWrap: {
        alignSelf: 'center',
        marginTop: spacing.xl,
    },
    tertiary: {
        fontFamily: fonts.bodyMedium,
        fontSize: typeScale.bodySmall,
        color: colors.textTertiary,
        letterSpacing: tracking.label,
        textDecorationLine: 'underline',
    },
});
