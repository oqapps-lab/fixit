import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Svg, { Polyline } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';
function CheckMark({ size = 12, color = colors.mint }) {
    return (<Svg width={size} height={size} viewBox="0 0 12 12">
      <Polyline points="2,6 5,9 10,3" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>);
}
function CloseGlyph({ size = 18, color = colors.text }) {
    return (<Svg width={size} height={size} viewBox="0 0 18 18">
      <Polyline points="4,4 14,14" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round"/>
      <Polyline points="14,4 4,14" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round"/>
    </Svg>);
}
const ANNUAL_BENEFITS = [
    'Unlimited estimates',
    'Save projects · warranty tracker',
    'PDF export · price alerts',
];
const MONTHLY_BENEFITS = [
    'Unlimited estimates',
    'Cancel anytime',
];
const RECEIPTS = [
    { label: 'FAUCET', value: '$165' },
    { label: 'TILE', value: '$120' },
    { label: 'DISHWASHER', value: '$200' },
];
export default function SoftPaywall() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [plan, setPlan] = useState('annual');
    const close = () => {
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    const handleSelect = (next) => {
        Haptics.selectionAsync().catch(() => { });
        setPlan(next);
    };
    const handleSubscribe = () => {
        router.replace('/paywall/success');
    };
    const handlePayOnce = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
        if (router.canGoBack())
            router.back();
        else
            router.replace('/(tabs)');
    };
    const primaryLabel = plan === 'annual' ? 'Start annual — $49.99' : 'Start monthly — $9.99';
    return (<NoirScreen glow="amber">
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <DocRef>THREE FIXES LATER · SECTOR · PLAN</DocRef>
        <Pressable onPress={close} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close paywall" style={styles.closeBtn}>
          <CloseGlyph />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + spacing.huge },
        ]} showsVerticalScrollIndicator={false}>
        {/* Hero — ghosted $485 behind serif */}
        <View style={styles.heroWrap}>
          <View pointerEvents="none" style={styles.ghostWrap}>
            <HeroNumber value="$485" size="mega" tone="amber" align="center"/>
          </View>
          <SerifHero size={38} align="center" style={{ marginTop: spacing.huge }}>
            You've found
          </SerifHero>
          <SerifHero size={38} align="center" tone="amber">
            real money.
          </SerifHero>
          <Text allowFontScaling={false} style={styles.heroBody}>
            Three estimates, three honest answers. $485 saved vs calling a pro blind.
          </Text>
        </View>

        {/* Receipts row */}
        <View style={styles.receipts}>
          {RECEIPTS.map((r) => (<NoirCard key={r.label} variant="default" radius="md" padding={12} style={styles.receiptCard}>
              <DocRef align="center">{r.label}</DocRef>
              <Text allowFontScaling={false} style={styles.receiptValue}>
                {r.value}
              </Text>
            </NoirCard>))}
        </View>

        {/* Plan cards */}
        <View style={styles.plans}>
          <Pressable onPress={() => handleSelect('annual')} accessibilityRole="radio" accessibilityLabel="Annual plan, $49.99 per year, best value" accessibilityState={{ selected: plan === 'annual' }}>
            <NoirCard variant="elevated" radius="lg" padding={22} style={[
            styles.planCard,
            plan === 'annual' ? styles.planCardActive : null,
        ]}>
              <View style={styles.bestValue}>
                <Label tone="amber" size="micro">
                  Best value
                </Label>
              </View>

              <Label tone="tertiary" size="micro">
                Annual
              </Label>
              <View style={styles.priceRow}>
                <HeroNumber value="$49.99" size="md" tone="white"/>
                <Text allowFontScaling={false} style={styles.perYear}>
                  /YEAR
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.perMonth}>
                that's $4.16/mo
              </Text>

              <View style={styles.benefits}>
                {ANNUAL_BENEFITS.map((b) => (<View key={b} style={styles.benefitRow}>
                    <CheckMark />
                    <Text allowFontScaling={false} style={styles.benefitText}>
                      {b}
                    </Text>
                  </View>))}
              </View>

              <View style={[
            styles.radioDot,
            plan === 'annual' ? styles.radioDotActive : null,
        ]}/>
            </NoirCard>
          </Pressable>

          <Pressable onPress={() => handleSelect('monthly')} accessibilityRole="radio" accessibilityLabel="Monthly plan, $9.99 per month" accessibilityState={{ selected: plan === 'monthly' }}>
            <NoirCard variant="default" radius="lg" padding={22} style={[
            styles.planCard,
            plan === 'monthly' ? styles.planCardActive : null,
        ]}>
              <Label tone="tertiary" size="micro">
                Monthly
              </Label>
              <View style={styles.priceRow}>
                <HeroNumber value="$9.99" size="md" tone="white"/>
                <Text allowFontScaling={false} style={styles.perYear}>
                  /MONTH
                </Text>
              </View>

              <View style={styles.benefits}>
                {MONTHLY_BENEFITS.map((b) => (<View key={b} style={styles.benefitRow}>
                    <CheckMark />
                    <Text allowFontScaling={false} style={styles.benefitText}>
                      {b}
                    </Text>
                  </View>))}
              </View>

              <View style={[
            styles.radioDot,
            plan === 'monthly' ? styles.radioDotActive : null,
        ]}/>
            </NoirCard>
          </Pressable>
        </View>

        {/* Primary CTA */}
        <View style={styles.ctaWrap}>
          <AmberCTA label={primaryLabel} variant="primary" size="lg" onPress={handleSubscribe} accessibilityLabel={`Subscribe: ${primaryLabel}`}/>
        </View>

        {/* Pay-per fallback */}
        <View style={styles.payOnceRow}>
          <View style={{ flex: 1 }}>
            <Text allowFontScaling={false} style={styles.payOnceText}>
              Not ready? Pay $2.99 for next estimate
            </Text>
          </View>
          <AmberCTA label="Pay once" variant="outlined" size="sm" fullWidth={false} onPress={handlePayOnce} accessibilityLabel="Pay $2.99 for a single estimate"/>
        </View>

        {/* Footer link */}
        <Pressable onPress={close} hitSlop={8} accessibilityRole="button" accessibilityLabel="Dismiss paywall and return home" style={styles.footerLink}>
          <Text allowFontScaling={false} style={styles.footerLinkText}>
            Not now, take me home →
          </Text>
        </Pressable>
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    topBar: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.md,
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
        backgroundColor: colors.surface1,
        borderWidth: 1,
        borderColor: colors.hairline,
    },
    scroll: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
    },
    heroWrap: {
        alignItems: 'center',
        marginTop: spacing.lg,
        minHeight: 180,
    },
    ghostWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: 0.18,
        alignItems: 'center',
    },
    heroBody: {
        marginTop: spacing.lg,
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 320,
    },
    receipts: {
        marginTop: spacing.xxl,
        flexDirection: 'row',
        gap: spacing.sm,
    },
    receiptCard: {
        flex: 1,
        alignItems: 'center',
    },
    receiptValue: {
        marginTop: 4,
        fontFamily: fonts.displayBold,
        fontSize: typeScale.titleSmall,
        color: colors.text,
        letterSpacing: tracking.tight,
    },
    plans: {
        marginTop: spacing.xxl,
        gap: spacing.md,
    },
    planCard: {
        position: 'relative',
    },
    planCardActive: {
        borderColor: colors.hairlineAmber,
    },
    bestValue: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: colors.hairlineAmber,
        backgroundColor: 'rgba(255,169,92,0.08)',
    },
    priceRow: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: spacing.sm,
    },
    perYear: {
        marginBottom: 6,
        fontFamily: fonts.labelSemibold,
        fontSize: typeScale.labelSmall,
        color: colors.textSecondary,
        letterSpacing: tracking.labelWide,
    },
    perMonth: {
        marginTop: 4,
        fontFamily: fonts.heroItalic,
        fontSize: typeScale.bodyMedium,
        color: colors.amber,
        letterSpacing: tracking.heroItalic,
    },
    benefits: {
        marginTop: spacing.lg,
        gap: spacing.sm,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    benefitText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.text,
    },
    radioDot: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: colors.hairlineStrong,
        backgroundColor: 'transparent',
    },
    radioDotActive: {
        borderColor: colors.amber,
        backgroundColor: colors.amber,
    },
    ctaWrap: {
        marginTop: spacing.xxl,
    },
    payOnceRow: {
        marginTop: spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    payOnceText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    footerLink: {
        marginTop: spacing.xxl,
        alignSelf: 'center',
        paddingVertical: spacing.sm,
    },
    footerLinkText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textTertiary,
    },
});
