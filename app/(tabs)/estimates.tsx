import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GhostNumber } from '@/components/ui/GhostNumber';
import { FaucetDropGlyph, ArrowRightGlyph } from '@/components/ui/Glyphs';
import { MOCK_RECENT } from '@/mock/estimates';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function EstimatesTab() {
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
      >
        <Eyebrow tone="slate">History</Eyebrow>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: fonts.heroItalicBold,
            fontSize: 36,
            color: colors.onSurface,
            letterSpacing: tracking.heroDisplay,
          }}
        >
          Seven answers,
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: fonts.heroItalic,
            fontSize: 26,
            color: colors.primary,
            letterSpacing: tracking.hero,
          }}
        >
          $2,340 kept.
        </Text>

        <View style={styles.summary}>
          <GhostNumber value="$2,340" size="lg" tone="coralPeach" opacity={0.14} style={styles.ghost} />
        </View>

        {/* Filter chips */}
        <View style={styles.chips}>
          {['ALL', 'DIY', 'HYBRID', 'PRO'].map((c, i) => (
            <GlassCard key={c} tint={i === 0 ? 'coral' : 'default'} radius="pill" padding={0} style={styles.chip} noShadow>
              <View style={styles.chipInner}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: fonts.labelSemibold,
                    fontSize: typeScale.labelSmall,
                    letterSpacing: tracking.labelWide,
                    color: i === 0 ? colors.primary : colors.onSurfaceVariant,
                  }}
                >
                  {c}
                </Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* List */}
        <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
          {[...MOCK_RECENT, ...MOCK_RECENT].map((r, i) => (
            <GlassCard key={`${r.id}-${i}`} tint="default" radius="lg" padding={18}>
              <View style={styles.row}>
                <GlassCard tint={r.tint} radius="pill" padding={10} noShadow style={styles.rowGlyph}>
                  <View style={styles.glyphInner}>
                    <FaucetDropGlyph size={20} color={colors.primary} secondary={colors.sage} />
                  </View>
                </GlassCard>
                <View style={{ flex: 1 }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: fonts.displayBold,
                      fontSize: 16,
                      color: colors.onSurface,
                      letterSpacing: tracking.hero,
                    }}
                  >
                    {r.diagnosis}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      marginTop: 2,
                      fontFamily: fonts.body,
                      fontSize: typeScale.bodySmall,
                      color: colors.onSurfaceVariant,
                    }}
                  >
                    {r.category.toLowerCase()} · 12 days ago
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: fonts.displayExtraBold,
                    fontSize: 22,
                    color:
                      r.tint === 'sage'
                        ? colors.sage
                        : r.tint === 'peach'
                        ? colors.primaryContainer
                        : colors.primary,
                    letterSpacing: tracking.hero,
                    marginRight: 6,
                  }}
                >
                  {r.price}
                </Text>
                <ArrowRightGlyph size={16} color={colors.onSurfaceVariant} />
              </View>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xxl },
  summary: { marginTop: spacing.xl, position: 'relative', height: 120 },
  ghost: { position: 'absolute', left: -4, top: -8 },
  chips: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: 4,
  },
  chipInner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowGlyph: {
    width: 44,
    height: 44,
  },
  glyphInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
