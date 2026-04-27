import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line, Path } from 'react-native-svg';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';
function DocumentGlyph({ size = 36, color = colors.mint }) {
    return (<Svg width={size} height={size} viewBox="0 0 36 36">
      <Path d="M9 4 H22 L27 9 V32 H9 Z" stroke={color} strokeWidth={1.6} fill={color} fillOpacity={0.14} strokeLinejoin="round"/>
      <Path d="M22 4 V9 H27" stroke={color} strokeWidth={1.4} fill="none" strokeLinejoin="round"/>
      <Line x1={13} y1={16} x2={23} y2={16} stroke={color} strokeWidth={1.2}/>
      <Line x1={13} y1={20} x2={23} y2={20} stroke={color} strokeWidth={1.2}/>
      <Line x1={13} y1={24} x2={19} y2={24} stroke={color} strokeWidth={1.2}/>
    </Svg>);
}
export default function PdfPaywall() {
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
          <DocRef align="center" tone="mint">
            SECTOR · PDF · EXPORT
          </DocRef>

          <View style={styles.iconWrap}>
            <DocumentGlyph />
          </View>

          <SerifHero size={28} align="center" style={{ marginTop: spacing.md }}>
            Export for insurance
          </SerifHero>

          <Text allowFontScaling={false} style={styles.body}>
            Turn any estimate into a formatted PDF — line items, labor, materials. Send to
            your insurer, landlord, or save for records.
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
