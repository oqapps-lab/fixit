import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';
function ShieldGlyph({ size = 36, color = colors.cyan }) {
    return (<Svg width={size} height={size} viewBox="0 0 36 36">
      <Path d="M18 4 L6 9 V18 C6 25 11 30 18 32 C25 30 30 25 30 18 V9 Z" stroke={color} strokeWidth={1.6} fill={color} fillOpacity={0.14} strokeLinejoin="round"/>
      <Path d="M13 18 L16.5 21 L23 14" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>);
}
export default function WarrantyPaywall() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const close = () => {
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    const goUpgrade = () => {
        router.replace('/paywall');
    };
    const payOnce = () => {
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    return (<Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close paywall">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.78)' }]}/>

      <Pressable onPress={(e) => e.stopPropagation()} style={[
            styles.sheet,
            {
                paddingTop: spacing.huge,
                paddingBottom: insets.bottom + spacing.xxl,
            },
        ]}>
        <View style={styles.grabber}/>

        <NoirCard variant="elevated" radius="lg" padding={28} style={styles.card}>
          <DocRef align="center" tone="cyan">
            SECTOR · WARRANTY · GATE
          </DocRef>

          <View style={styles.iconWrap}>
            <ShieldGlyph />
          </View>

          <SerifHero size={28} align="center" style={{ marginTop: spacing.md }}>
            Track your warranties
          </SerifHero>

          <Text allowFontScaling={false} style={styles.body}>
            Add receipts, get expiry alerts, never miss a claim. Warranty tracker is a
            Pro feature — protects every appliance you own.
          </Text>

          <Label tone="tertiary" size="micro" align="center" style={{ marginTop: spacing.lg }}>
            Upgrade to unlock
          </Label>

          <View style={styles.ctaWrap}>
            <AmberCTA label="Unlock Pro" variant="primary" size="lg" onPress={goUpgrade} accessibilityLabel="View subscription plans"/>
          </View>

          <Text allowFontScaling={false} style={styles.payOnce}>
            Or pay $2.99 once for this fix
          </Text>

          <Pressable onPress={payOnce} hitSlop={8} style={styles.payOnceBtn} accessibilityRole="button" accessibilityLabel="Pay once, $2.99">
            <Text allowFontScaling={false} style={styles.payOnceLink}>
              Pay once →
            </Text>
          </Pressable>

          <Pressable onPress={close} hitSlop={8} style={styles.dismiss} accessibilityRole="button" accessibilityLabel="Dismiss paywall">
            <Text allowFontScaling={false} style={styles.dismissText}>
              Not now
            </Text>
          </Pressable>
        </NoirCard>
      </Pressable>
    </Pressable>);
}
const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheet: {
        paddingHorizontal: spacing.xl,
    },
    grabber: {
        alignSelf: 'center',
        width: 44,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.hairlineStrong,
        marginBottom: spacing.md,
    },
    card: {
        alignItems: 'stretch',
    },
    iconWrap: {
        marginTop: spacing.lg,
        alignItems: 'center',
    },
    body: {
        marginTop: spacing.md,
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    ctaWrap: {
        marginTop: spacing.lg,
    },
    payOnce: {
        marginTop: spacing.lg,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textTertiary,
        textAlign: 'center',
    },
    payOnceBtn: {
        alignSelf: 'center',
        paddingVertical: 4,
    },
    payOnceLink: {
        fontFamily: fonts.labelSemibold,
        fontSize: typeScale.bodyMedium,
        color: colors.amber,
    },
    dismiss: {
        marginTop: spacing.md,
        alignSelf: 'center',
        paddingVertical: spacing.sm,
    },
    dismissText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textTertiary,
    },
});
