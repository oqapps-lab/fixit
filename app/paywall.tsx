import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GhostNumber } from '@/components/ui/GhostNumber';
import { CheckGlyph, ArrowRightGlyph, SparkleGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale, radii } from '@/constants/tokens';

type Tier = 'annual' | 'monthly';

export default function Paywall() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tier, setTier] = useState<Tier>('annual');

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      {/* Close */}
      <Pressable
        onPress={() => router.back()}
        style={[styles.close, { top: insets.top + spacing.md }]}
        accessibilityRole="button"
        accessibilityLabel="Close paywall"
        hitSlop={8}
      >
        <GlassCard tint="default" radius="pill" padding={10} noShadow>
          <Text
            allowFontScaling={false}
            style={{ fontFamily: fonts.displayBold, fontSize: 18, color: colors.onSurface }}
          >
            ✕
          </Text>
        </GlassCard>
      </Pressable>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.huge,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow tone="slate" align="center">
          Three fixes later
        </Eyebrow>

        {/* Hero */}
        <View style={styles.heroBlock}>
          <GhostNumber value="$485" size="lg" tone="coralPeach" align="left" opacity={0.18} style={styles.ghost} />
          <Eyebrow tone="coral" style={{ marginTop: spacing.xl }}>
            You've saved
          </Eyebrow>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalicBold,
              fontSize: 40,
              color: colors.onSurface,
              letterSpacing: tracking.heroDisplay,
              lineHeight: 44,
              marginTop: 4,
            }}
          >
            You've found
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalicBold,
              fontSize: 40,
              color: colors.primary,
              letterSpacing: tracking.heroDisplay,
              lineHeight: 44,
            }}
          >
            real money.
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: spacing.lg,
              fontFamily: fonts.body,
              fontSize: typeScale.bodyLarge,
              color: colors.onSurfaceVariant,
              lineHeight: 24,
            }}
          >
            Three estimates, three honest answers. $485 saved vs calling a pro blind. Ready for the next one?
          </Text>
        </View>

        {/* Receipts chip row */}
        <View style={styles.receipts}>
          {[
            { tag: 'FAUCET',     price: '$165', tint: 'sage' as const },
            { tag: 'TILE',       price: '$120', tint: 'peach' as const },
            { tag: 'DISHWASHER', price: '$200', tint: 'coral' as const },
          ].map((r) => (
            <GlassCard key={r.tag} tint={r.tint} radius="md" padding={12} style={styles.receipt}>
              <Eyebrow
                tone={r.tint === 'sage' ? 'sage' : r.tint === 'peach' ? 'peach' : 'coral'}
                size="micro"
              >
                {r.tag}
              </Eyebrow>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 2,
                  fontFamily: fonts.displayExtraBold,
                  fontSize: 22,
                  color:
                    r.tint === 'sage' ? colors.sage
                    : r.tint === 'peach' ? colors.primaryContainer
                    : colors.primary,
                  letterSpacing: tracking.hero,
                }}
              >
                {r.price}
              </Text>
            </GlassCard>
          ))}
        </View>

        {/* Pricing cards */}
        <View style={{ marginTop: spacing.xxl }}>
          <Pressable
            onPress={() => setTier('annual')}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'annual' }}
            accessibilityLabel="Annual plan $49.99 per year"
          >
            <GlassCard
              tint={tier === 'annual' ? 'coral' : 'default'}
              radius="lg"
              padding={22}
              style={[
                styles.priceCard,
                tier === 'annual' ? { borderColor: colors.primary, borderWidth: 2 } : null,
              ]}
            >
              <View style={styles.bestBadge}>
                <Eyebrow tone="coral" size="micro">Best value</Eyebrow>
              </View>
              <Eyebrow tone="slate">FixIt Unlimited · Yearly</Eyebrow>
              <View style={styles.priceRow}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: fonts.displayExtraBold,
                    fontSize: 44,
                    color: colors.primary,
                    letterSpacing: tracking.heroDisplay,
                  }}
                >
                  $49.99
                </Text>
                <Eyebrow tone="coral" style={{ marginLeft: 6 }}>
                  per year
                </Eyebrow>
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: fonts.heroItalic,
                  fontSize: 14,
                  color: colors.onSurfaceVariant,
                }}
              >
                That's $4.16 a month.
              </Text>
              <View style={{ marginTop: spacing.md, gap: 8 }}>
                {[
                  'Unlimited estimates · saved projects',
                  'Warranty tracker · PDF export',
                  'Price alerts · cancel anytime',
                ].map((line) => (
                  <View key={line} style={styles.benefitRow}>
                    <CheckGlyph size={18} color={colors.sage} />
                    <Text
                      allowFontScaling={false}
                      style={{
                        flex: 1,
                        fontFamily: fonts.body,
                        fontSize: typeScale.bodyMedium,
                        color: colors.onSurface,
                      }}
                    >
                      {line}
                    </Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          </Pressable>

          <Pressable
            onPress={() => setTier('monthly')}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'monthly' }}
            accessibilityLabel="Monthly plan $9.99 per month"
            style={{ marginTop: spacing.md }}
          >
            <GlassCard
              tint={tier === 'monthly' ? 'peach' : 'default'}
              radius="lg"
              padding={18}
              style={
                tier === 'monthly' ? { borderColor: colors.primaryContainer, borderWidth: 2 } : null
              }
            >
              <View style={styles.monthlyRow}>
                <View style={{ flex: 1 }}>
                  <Eyebrow tone="slate">Monthly</Eyebrow>
                  <Text
                    allowFontScaling={false}
                    style={{
                      marginTop: 2,
                      fontFamily: fonts.body,
                      fontSize: typeScale.bodySmall,
                      color: colors.onSurfaceVariant,
                    }}
                  >
                    Flexible. Cancel anytime.
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: fonts.displayExtraBold,
                    fontSize: 28,
                    color: colors.primaryContainer,
                    letterSpacing: tracking.hero,
                  }}
                >
                  $9.99
                </Text>
              </View>
            </GlassCard>
          </Pressable>
        </View>

        {/* Anchor */}
        <View style={{ marginTop: spacing.xxl }}>
          <PillCTA
            label={tier === 'annual' ? 'Start annual — $49.99' : 'Start monthly — $9.99'}
            tone="primary"
            onPress={() => router.back()}
          />
        </View>

        {/* Pay-per fallback */}
        <GlassCard tint="lavender" radius="md" padding={14} style={{ marginTop: spacing.xl }}>
          <View style={styles.payPerRow}>
            <SparkleGlyph size={16} color={colors.sage} />
            <View style={{ flex: 1 }}>
              <Eyebrow tone="slate" size="micro">
                Not ready for unlimited?
              </Eyebrow>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 2,
                  fontFamily: fonts.body,
                  fontSize: typeScale.bodyMedium,
                  color: colors.onSurface,
                }}
              >
                Pay just $2.99 for your next estimate.
              </Text>
            </View>
            <PillCTA label="Pay once" tone="sage" size="sm" fullWidth={false} />
          </View>
        </GlassCard>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Not now"
          style={styles.dismiss}
          hitSlop={8}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.bodyMedium,
              color: colors.tertiary,
            }}
          >
            Not now, take me home
          </Text>
          <ArrowRightGlyph size={14} color={colors.tertiary} />
        </Pressable>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xxl,
  },
  close: {
    position: 'absolute',
    right: spacing.xxl,
    zIndex: 10,
  },
  heroBlock: {
    marginTop: spacing.md,
    position: 'relative',
    paddingBottom: spacing.md,
  },
  ghost: {
    position: 'absolute',
    left: -6,
    top: -14,
  },
  receipts: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  receipt: { flex: 1 },
  priceCard: {
    position: 'relative',
    overflow: 'hidden',
  },
  bestBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: spacing.sm,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  monthlyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  payPerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dismiss: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
  },
});
