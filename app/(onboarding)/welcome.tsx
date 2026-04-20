import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DotRow } from '@/components/ui/TokenDot';
import { FaucetDropGlyph, WrenchGlyph, SparkleGlyph, CottageGlyph, ArrowRightGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale, radii } from '@/constants/tokens';

export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.xl,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand strip */}
        <View style={styles.brandRow}>
          <View style={styles.brandGlyph}>
            <FaucetDropGlyph size={18} color={colors.primary} />
          </View>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalicBold,
              fontSize: 22,
              color: colors.onSurface,
              letterSpacing: tracking.hero,
            }}
          >
            FixIt
          </Text>
        </View>
        <Eyebrow tone="slate" style={{ marginTop: 4 }}>
          Home repair forecast
        </Eyebrow>

        {/* Hero block */}
        <View style={styles.hero}>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.displayMedium,
              fontSize: 28,
              color: colors.onSurface,
              letterSpacing: tracking.hero,
            }}
          >
            Know the price
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalicBold,
              fontSize: 44,
              color: colors.primary,
              letterSpacing: tracking.heroDisplay,
              marginTop: 2,
              lineHeight: 48,
            }}
          >
            before the panic.
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.bodyLarge,
              color: colors.onSurfaceVariant,
              marginTop: spacing.lg,
              lineHeight: 24,
              maxWidth: 340,
            }}
          >
            Snap a photo of what's broken. In sixty seconds you'll know if it's a $15 fix or a $500 one — and the three routes to get there.
          </Text>

          {/* Hero side illustration — small sage-haloed faucet */}
          <View style={styles.heroGlyphPlate}>
            <GlassCard tint="sage" radius="pill" padding={20}>
              <FaucetDropGlyph size={44} color={colors.primary} secondary={colors.sage} />
            </GlassCard>
          </View>
        </View>

        {/* Three category vignettes */}
        <View style={styles.vignettes}>
          <Vignette tint="sage" label="HARDWARE" glyph={<WrenchGlyph size={26} color={colors.sage} />} />
          <Vignette tint="peach" label="SURFACES" glyph={<SparkleGlyph size={26} color={colors.primaryContainer} />} />
          <Vignette tint="coral" label="APPLIANCES" glyph={<CottageGlyph size={30} color={colors.primary} secondary={colors.mint} />} />
        </View>

        {/* Anchor */}
        <View style={styles.anchor}>
          <PillCTA
            label="Take a photo of your problem"
            tone="primary"
            size="lg"
            onPress={() => router.push('/(onboarding)/location')}
          />
          <Pressable
            onPress={() => router.push('/(onboarding)/result?sample=1')}
            accessibilityRole="button"
            accessibilityLabel="See a sample estimate"
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
              See a sample estimate instead
            </Text>
            <ArrowRightGlyph size={14} color={colors.tertiary} />
          </Pressable>
        </View>

        {/* Sample teaser row */}
        <View style={styles.samplesRow}>
          <SampleTeaser label="SAMPLE — LEAKY FAUCET" price="$15" />
          <SampleTeaser label="SAMPLE — CRACKED TILE" price="$120" />
          <SampleTeaser label="SAMPLE — DISHWASHER" price="$200" />
        </View>

        {/* Progress dots */}
        <View style={styles.dots}>
          <DotRow count={3} active={0} tone="coral" />
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

function Vignette({ tint, label, glyph }: { tint: 'sage' | 'peach' | 'coral'; label: string; glyph: React.ReactNode }) {
  return (
    <View style={styles.vignette}>
      <GlassCard tint={tint} radius="pill" padding={18}>
        <View style={styles.vignetteInner}>{glyph}</View>
      </GlassCard>
      <Text
        allowFontScaling={false}
        style={{
          marginTop: spacing.sm,
          fontFamily: fonts.labelSemibold,
          fontSize: typeScale.labelMicro,
          letterSpacing: tracking.labelMicro,
          color: colors.onSurfaceVariant,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function SampleTeaser({ label, price }: { label: string; price: string }) {
  return (
    <GlassCard tint="default" radius="md" padding={12} style={styles.sampleTeaser}>
      <Text
        allowFontScaling={false}
        style={{
          fontFamily: fonts.label,
          fontSize: 9,
          letterSpacing: tracking.labelMicro,
          color: colors.onSurfaceVariant,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Text
        allowFontScaling={false}
        style={{
          marginTop: 4,
          fontFamily: fonts.displayBold,
          fontSize: typeScale.titleSmall,
          color: colors.primary,
          letterSpacing: tracking.hero,
        }}
      >
        {price}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xxl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandGlyph: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  hero: {
    marginTop: spacing.huge,
    position: 'relative',
  },
  heroGlyphPlate: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  vignettes: {
    marginTop: spacing.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vignette: {
    alignItems: 'center',
    flex: 1,
  },
  vignetteInner: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchor: {
    marginTop: spacing.huge + spacing.sm,
    alignItems: 'center',
  },
  secondaryLink: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  samplesRow: {
    marginTop: spacing.huge,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sampleTeaser: {
    flex: 1,
  },
  dots: {
    marginTop: spacing.huge,
    alignItems: 'center',
  },
});
