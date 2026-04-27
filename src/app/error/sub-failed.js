import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line, Rect } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';
/** Credit-card-with-X glyph — payment declined */
function CardXGlyph({ size = 56, color = colors.danger }) {
    return (<Svg width={size} height={size} viewBox="0 0 56 56">
      <Rect x={6} y={14} width={44} height={30} rx={3} stroke={color} strokeWidth={1.6} fill="none"/>
      <Line x1={6} y1={24} x2={50} y2={24} stroke={color} strokeWidth={1.6}/>
      <Line x1={12} y1={34} x2={24} y2={34} stroke={color} strokeWidth={1.4} strokeLinecap="round"/>
      {/* X mark — bottom-right */}
      <Line x1={34} y1={32} x2={44} y2={42} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
      <Line x1={44} y1={32} x2={34} y2={42} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
    </Svg>);
}
export default function SubFailed() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const close = () => {
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    const retry = () => {
        close();
    };
    const differentCard = () => {
        close();
    };
    return (<Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close payment error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]}/>
      <Pressable onPress={(e) => e.stopPropagation()} style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}>
        <View style={styles.grabber}/>

        <View style={styles.topRow}>
          <DocRef tone="danger">ERR-08.7 · PAYMENT · DECLINED</DocRef>
          <Pressable onPress={close} hitSlop={14} accessibilityRole="button" accessibilityLabel="Dismiss" style={styles.closeBtn}>
            <Text allowFontScaling={false} style={styles.closeX}>×</Text>
          </Pressable>
        </View>

        <View style={styles.iconWrap}>
          <CardXGlyph size={56} color={colors.danger}/>
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          PAYMENT FAILED
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          Your card wasn't charged. Usually means the card was declined or there's a temporary issue with the payment service.
        </Text>

        <View style={styles.ctaStack}>
          <AmberCTA label="Try again" variant="primary" size="lg" onPress={retry} accessibilityLabel="Try the payment again"/>
          <AmberCTA label="Use different card" variant="outlined" size="lg" onPress={differentCard} accessibilityLabel="Use a different payment method"/>
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
        marginBottom: spacing.xxl,
        paddingHorizontal: spacing.sm,
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
