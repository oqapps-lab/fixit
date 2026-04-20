import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DotRow } from '@/components/ui/TokenDot';
import { FaucetDropGlyph, WrenchGlyph, ToolboxGlyph, CottageGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function CameraPrimer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      <View style={[styles.content, { paddingTop: insets.top + spacing.huge, paddingBottom: insets.bottom + spacing.xxxl }]}>
        <View>
          <Eyebrow tone="slate">Step 2 of 3</Eyebrow>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: spacing.sm,
              fontFamily: fonts.heroItalicBold,
              fontSize: 38,
              color: colors.onSurface,
              letterSpacing: tracking.heroDisplay,
              lineHeight: 44,
            }}
          >
            Show us what's{'\n'}broken.
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: spacing.md,
              fontFamily: fonts.body,
              fontSize: typeScale.bodyLarge,
              color: colors.onSurfaceVariant,
              lineHeight: 24,
            }}
          >
            A single photo. Anything from a leaky pipe to a dead dishwasher. Your photos stay on your account — never shared.
          </Text>
        </View>

        {/* 4 sample category thumbnails */}
        <View style={styles.grid}>
          <SampleTile tint="sage" label="PLUMBING" glyph={<FaucetDropGlyph size={36} color={colors.primary} secondary={colors.sage} />} />
          <SampleTile tint="peach" label="HARDWARE" glyph={<WrenchGlyph size={32} color={colors.primaryContainer} />} />
          <SampleTile tint="coral" label="APPLIANCES" glyph={<ToolboxGlyph size={32} color={colors.primary} />} />
          <SampleTile tint="lavender" label="WALLS & FLOORS" glyph={<CottageGlyph size={34} color={colors.tertiary} secondary={colors.mint} />} />
        </View>

        <View style={styles.anchor}>
          <PillCTA
            label="Allow camera"
            tone="primary"
            onPress={() => router.push('/(onboarding)/processing')}
          />
          <Pressable
            onPress={() => router.push('/(onboarding)/processing')}
            style={styles.secondaryLink}
            accessibilityRole="button"
            accessibilityLabel="Upload a saved photo instead"
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
              I'll upload a saved photo instead
            </Text>
          </Pressable>
          <View style={styles.dots}>
            <DotRow count={3} active={1} tone="coral" />
          </View>
        </View>
      </View>
    </AtmosphericGradient>
  );
}

function SampleTile({ tint, label, glyph }: { tint: 'sage' | 'peach' | 'coral' | 'lavender'; label: string; glyph: React.ReactNode }) {
  return (
    <GlassCard tint={tint} radius="lg" padding={18} style={styles.tile}>
      <View style={styles.tileGlyph}>{glyph}</View>
      <Text
        allowFontScaling={false}
        style={{
          marginTop: spacing.md,
          fontFamily: fonts.labelSemibold,
          fontSize: typeScale.labelMicro,
          letterSpacing: tracking.labelMicro,
          color: colors.onSurfaceVariant,
        }}
      >
        {label}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'space-between',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  tile: {
    width: '47%',
    aspectRatio: 1.1,
    justifyContent: 'space-between',
  },
  tileGlyph: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchor: {
    alignItems: 'center',
    gap: spacing.md,
  },
  secondaryLink: {
    paddingVertical: spacing.sm,
  },
  dots: {
    marginTop: spacing.md,
  },
});
