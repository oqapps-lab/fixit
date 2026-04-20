import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GhostNumber } from '@/components/ui/GhostNumber';
import { RouteCard } from '@/components/ui/RouteCard';
import { FaucetDropGlyph, SparkleGlyph, ArrowRightGlyph } from '@/components/ui/Glyphs';
import { MOCK_FIRST_ESTIMATE } from '@/mock/estimates';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function Result() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const e = MOCK_FIRST_ESTIMATE;

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.xl,
            paddingBottom: insets.bottom + spacing.huge * 2,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top meta row */}
        <View style={styles.topRow}>
          <GlassCard tint="sage" radius="pill" padding={10} style={styles.photoChip}>
            <View style={styles.photoChipInner}>
              <FaucetDropGlyph size={28} color={colors.primary} secondary={colors.sage} />
            </View>
          </GlassCard>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Eyebrow tone="slate">What we found</Eyebrow>
            <Text
              allowFontScaling={false}
              style={{
                marginTop: 2,
                fontFamily: fonts.body,
                fontSize: typeScale.bodySmall,
                color: colors.onSurfaceVariant,
              }}
              numberOfLines={1}
            >
              {e.diagnosedAt}
            </Text>
          </View>
        </View>

        {/* Hero verdict */}
        <View style={styles.heroBlock}>
          <GhostNumber
            value={e.savedVsPro}
            size="lg"
            tone="coralPeach"
            align="left"
            opacity={0.18}
            style={styles.ghost}
          />
          <Eyebrow tone="coral" style={{ marginTop: spacing.xl }}>
            You'd save
          </Eyebrow>
          <Text
            allowFontScaling={false}
            style={styles.verdictLine1}
          >
            {e.verdict.line1}
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.verdictLine2}
          >
            {e.verdict.line2}
          </Text>
        </View>

        {/* Three route cards */}
        <View style={styles.routes}>
          {e.routes.map((r) => (
            <RouteCard key={r.route} route={r.route} price={r.price} meta={r.meta} duration={r.duration} />
          ))}
        </View>

        {/* Savings pill */}
        <View style={styles.savingsWrap}>
          <GlassCard tint="default" radius="pill" padding={12} style={styles.savingsPill}>
            <View style={styles.savingsRow}>
              <SparkleGlyph size={14} color={colors.sage} />
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: fonts.bodyMedium,
                  fontSize: typeScale.bodyMedium,
                  color: colors.onSurface,
                }}
              >
                {e.savedVsPro} saved going DIY
              </Text>
            </View>
          </GlassCard>
        </View>

        {/* Anchor */}
        <View style={styles.anchor}>
          <PillCTA
            label="Open DIY guide"
            tone="primary"
            size="lg"
            onPress={() => router.replace('/(tabs)')}
          />
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            accessibilityRole="button"
            accessibilityLabel="Save for later"
            style={styles.secondaryLink}
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
              Save for later
            </Text>
            <ArrowRightGlyph size={14} color={colors.tertiary} />
          </Pressable>
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xxl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoChip: {
    width: 56,
    height: 56,
  },
  photoChipInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBlock: {
    marginTop: spacing.xxl,
    position: 'relative',
    paddingBottom: spacing.xl,
  },
  ghost: {
    position: 'absolute',
    left: -4,
    top: -24,
  },
  verdictLine1: {
    marginTop: spacing.sm,
    fontFamily: fonts.heroItalicBold,
    fontSize: 40,
    color: colors.onSurface,
    letterSpacing: tracking.heroDisplay,
    lineHeight: 44,
  },
  verdictLine2: {
    fontFamily: fonts.heroItalicBold,
    fontSize: 40,
    color: colors.sage,
    letterSpacing: tracking.heroDisplay,
    lineHeight: 44,
  },
  routes: {
    marginTop: spacing.xxl,
  },
  savingsWrap: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  savingsPill: {
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  anchor: {
    marginTop: spacing.huge,
    alignItems: 'center',
    gap: spacing.md,
  },
  secondaryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
  },
});
