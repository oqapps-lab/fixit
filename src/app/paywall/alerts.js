import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { BellGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';
export default function AlertsPaywall() {
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
          <DocRef align="center" tone="amber">
            SECTOR · ALERTS · MATERIALS
          </DocRef>

          <View style={styles.iconWrap}>
            <BellGlyph size={36} color={colors.amber}/>
          </View>

          <SerifHero size={28} align="center" style={{ marginTop: spacing.md }}>
            Catch the price drops
          </SerifHero>

          <Text allowFontScaling={false} style={styles.body}>
            Watch tile, lumber, sealants, pipes — we ping you when materials dip. Buy the
            window that saves you $40 on the fix.
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
