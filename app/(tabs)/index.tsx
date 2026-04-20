import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GhostNumber } from '@/components/ui/GhostNumber';
import {
  CottageGlyph,
  HealthRing,
  PiggyHouseGlyph,
  WrenchGlyph,
  SparkleGlyph,
  ArrowRightGlyph,
  FaucetDropGlyph,
} from '@/components/ui/Glyphs';
import { MOCK_RECENT } from '@/mock/estimates';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + 180,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand header */}
        <View style={styles.brandRow}>
          <View>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: fonts.heroItalicBold,
                fontSize: 24,
                color: colors.onSurface,
                letterSpacing: tracking.hero,
              }}
            >
              FixIt
            </Text>
            <Eyebrow tone="slate" style={{ marginTop: 2 }}>
              Tuesday · April 20
            </Eyebrow>
          </View>
          <GlassCard tint="sage" radius="pill" padding={8} style={styles.avatar}>
            <View style={styles.avatarInner}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: fonts.displayBold,
                  fontSize: 14,
                  color: colors.sage,
                  letterSpacing: tracking.labelWide,
                }}
              >
                E
              </Text>
            </View>
          </GlassCard>
        </View>

        {/* Hero — ghosted savings number */}
        <View style={styles.heroBlock}>
          <GhostNumber value="$2,340" size="lg" tone="coralPeach" align="left" opacity={0.18} style={styles.ghostHero} />
          <Eyebrow tone="coral" style={{ marginTop: 60 }}>
            Saved this year
          </Eyebrow>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalicBold,
              fontSize: 38,
              color: colors.onSurface,
              letterSpacing: tracking.heroDisplay,
              lineHeight: 44,
            }}
          >
            Seven small fixes.
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalic,
              fontSize: 28,
              color: colors.primary,
              letterSpacing: tracking.hero,
            }}
          >
            Three smart splits.
          </Text>

          <View style={styles.piggyMark}>
            <PiggyHouseGlyph size={50} color={colors.primary} secondary={colors.mint} />
          </View>
        </View>

        {/* Widget 1 — Home Health Ring */}
        <GlassCard tint="default" radius="lg" padding={24} style={styles.widget}>
          <View style={styles.ringRow}>
            <View style={styles.ringWrap}>
              <HealthRing size={140} value={87} primary={colors.primary} secondary={colors.primaryContainer} />
              <View style={styles.ringCenter}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: fonts.displayExtraBold,
                    fontSize: 40,
                    color: colors.primary,
                    letterSpacing: tracking.hero,
                  }}
                >
                  87
                </Text>
                <Eyebrow tone="slate" size="micro" align="center">
                  Home health
                </Eyebrow>
              </View>
            </View>
            <View style={styles.ringLegend}>
              <Eyebrow tone="coral">Fair.</Eyebrow>
              <Text
                allowFontScaling={false}
                style={styles.ringBody}
              >
                Plumbing calm. Appliances warming. Walls want a look.
              </Text>
              <LegendDot label="PLUMBING"    tone="sage"  />
              <LegendDot label="ELECTRICAL"  tone="amber" />
              <LegendDot label="APPLIANCES"  tone="peach" />
              <LegendDot label="WALLS"       tone="coral" />
            </View>
          </View>
        </GlassCard>

        {/* Widget 2 — Seasonal tip */}
        <GlassCard tint="lavender" radius="lg" padding={22} style={styles.widget}>
          <View style={styles.seasonalRow}>
            <View style={styles.seasonalGlyph}>
              <CottageGlyph size={56} color={colors.tertiary} secondary={colors.mint} />
            </View>
            <View style={{ flex: 1 }}>
              <Eyebrow tone="slate">This week · Spring</Eyebrow>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 4,
                  fontFamily: fonts.heroItalicBold,
                  fontSize: 26,
                  color: colors.onSurface,
                  letterSpacing: tracking.hero,
                }}
              >
                The Tune-Up.
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 4,
                  fontFamily: fonts.body,
                  fontSize: typeScale.bodyMedium,
                  color: colors.onSurfaceVariant,
                  lineHeight: 20,
                }}
              >
                Gutters. AC. Walk-around caulk. Three small fixes keep summer cheap.
              </Text>
              <Pressable
                onPress={() => router.push('/(tabs)/my-home')}
                style={styles.seasonalCta}
                accessibilityRole="button"
                accessibilityLabel="See spring plan"
                hitSlop={8}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: fonts.labelSemibold,
                    color: colors.sage,
                    fontSize: typeScale.labelSmall,
                    letterSpacing: tracking.labelWide,
                  }}
                >
                  SEE SPRING PLAN
                </Text>
                <ArrowRightGlyph size={14} color={colors.sage} />
              </Pressable>
            </View>
          </View>
        </GlassCard>

        {/* Widget 3 — Recent restorations */}
        <View style={[styles.widget, { marginBottom: spacing.md }]}>
          <View style={styles.sectionHeader}>
            <Eyebrow tone="slate">Recent restorations</Eyebrow>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: fonts.bodyLight,
                fontSize: typeScale.bodySmall,
                color: colors.tertiary,
              }}
            >
              4 fixes · $380 total
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.md, paddingRight: spacing.lg }}
          >
            {MOCK_RECENT.map((r) => (
              <GlassCard
                key={r.id}
                tint={r.tint}
                radius="lg"
                padding={18}
                style={styles.recentCard}
              >
                <View style={styles.recentGlyph}>
                  {r.category === 'FAUCET' ? (
                    <FaucetDropGlyph size={26} color={colors.primary} secondary={colors.sage} />
                  ) : (
                    <WrenchGlyph size={26} color={colors.primary} />
                  )}
                </View>
                <Eyebrow tone="slate" size="micro" style={{ marginTop: spacing.lg }}>
                  {r.category}
                </Eyebrow>
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: 4,
                    fontFamily: fonts.displayBold,
                    fontSize: 28,
                    color:
                      r.tint === 'sage'
                        ? colors.sage
                        : r.tint === 'peach'
                        ? colors.primaryContainer
                        : r.tint === 'coral'
                        ? colors.primary
                        : colors.tertiary,
                    letterSpacing: tracking.hero,
                  }}
                >
                  {r.price}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: 4,
                    fontFamily: fonts.body,
                    fontSize: typeScale.bodySmall,
                    color: colors.onSurfaceVariant,
                  }}
                >
                  {r.diagnosis}
                </Text>
              </GlassCard>
            ))}
          </ScrollView>
        </View>

        {/* Widget 4 — month bars */}
        <GlassCard tint="default" radius="lg" padding={22} style={styles.widget}>
          <View style={styles.sectionHeader}>
            <Eyebrow tone="slate">This month</Eyebrow>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: fonts.bodyMedium,
                fontSize: typeScale.bodySmall,
                color: colors.onSurfaceVariant,
                letterSpacing: tracking.labelWide,
              }}
            >
              4 FIXES · $340
            </Text>
          </View>

          <View style={styles.bars}>
            {[30, 55, 40, 70, 30, 80, 95].map((h, i) => (
              <View key={i} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: h,
                      backgroundColor:
                        i === 6
                          ? colors.primary
                          : i === 5
                          ? colors.primaryContainer
                          : i >= 3
                          ? '#F9B494'
                          : '#F0DCCC',
                      opacity: i === 6 ? 1 : 0.85,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: spacing.md,
              fontFamily: fonts.heroItalic,
              fontSize: 16,
              color: colors.onSurfaceVariant,
            }}
          >
            This week was quiet — your house is resting.
          </Text>
        </GlassCard>

        {/* Widget 5 — paywall nudge (soft) */}
        <Pressable onPress={() => router.push('/paywall')} accessibilityRole="button" accessibilityLabel="See Pro plans">
          <GlassCard tint="peach" radius="lg" padding={20} style={styles.widget}>
            <View style={styles.nudgeRow}>
              <SparkleGlyph size={20} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Eyebrow tone="coral">You've saved $2,340</Eyebrow>
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: 4,
                    fontFamily: fonts.heroItalic,
                    fontSize: 18,
                    color: colors.onSurface,
                  }}
                >
                  Ready for unlimited?
                </Text>
              </View>
              <ArrowRightGlyph size={16} color={colors.primary} />
            </View>
          </GlassCard>
        </Pressable>
      </ScrollView>
    </AtmosphericGradient>
  );
}

function LegendDot({ label, tone }: { label: string; tone: 'sage' | 'amber' | 'peach' | 'coral' }) {
  const dotColor =
    tone === 'sage' ? colors.sage
    : tone === 'amber' ? colors.primaryContainer
    : tone === 'peach' ? colors.primaryContainer
    : colors.primary;
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: dotColor }]} />
      <Text
        allowFontScaling={false}
        style={{
          fontFamily: fonts.labelSemibold,
          fontSize: 10,
          letterSpacing: tracking.labelMicro,
          color: colors.onSurfaceVariant,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xxl,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
  },
  avatarInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBlock: {
    marginTop: spacing.lg,
    position: 'relative',
    paddingBottom: spacing.xxl,
  },
  ghostHero: {
    position: 'absolute',
    left: -4,
    top: -8,
  },
  piggyMark: {
    position: 'absolute',
    right: 0,
    top: 28,
  },
  widget: {
    marginTop: spacing.lg,
  },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  ringWrap: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  ringLegend: {
    flex: 1,
    gap: 6,
  },
  ringBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  seasonalRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  seasonalGlyph: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonalCta: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  recentCard: {
    width: 140,
  },
  recentGlyph: {
    width: 32,
    height: 32,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    gap: 6,
  },
  barCol: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
  },
  nudgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
