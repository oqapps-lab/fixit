import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GhostNumber } from '@/components/ui/GhostNumber';
import { ArrowRightGlyph, PinGlyph, SparkleGlyph, HistoryGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

const ROWS: Array<{ label: string; detail: string; glyph: (c: string) => React.ReactNode }> = [
  { label: 'Region',          detail: 'Denver · 80203',    glyph: (c) => <PinGlyph size={18} color={c} /> },
  { label: 'Quality tier',    detail: 'Mid-range',         glyph: (c) => <SparkleGlyph size={16} color={c} /> },
  { label: 'DIY readiness',   detail: 'Some experience',   glyph: (c) => <SparkleGlyph size={16} color={c} /> },
  { label: 'Past estimates',  detail: '7 · $2,340 saved',  glyph: (c) => <HistoryGlyph size={18} color={c} /> },
];

export default function ProfileTab() {
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
      >
        <Eyebrow tone="slate">Profile</Eyebrow>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: fonts.heroItalicBold,
            fontSize: 36,
            color: colors.onSurface,
            letterSpacing: tracking.heroDisplay,
          }}
        >
          Emma.
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: fonts.heroItalic,
            fontSize: 22,
            color: colors.primary,
            letterSpacing: tracking.hero,
          }}
        >
          Free tier.
        </Text>

        {/* Lifetime savings hero */}
        <GlassCard tint="coral" radius="lg" padding={24} style={{ marginTop: spacing.xl, overflow: 'hidden' }}>
          <View>
            <GhostNumber value="$2,340" size="lg" tone="coralPeach" opacity={0.22} style={styles.ghostHero} />
            <Eyebrow tone="coral" style={{ marginTop: spacing.xl }}>
              Lifetime savings
            </Eyebrow>
            <Text
              allowFontScaling={false}
              style={{
                marginTop: 4,
                fontFamily: fonts.heroItalic,
                fontSize: 20,
                color: colors.onSurface,
              }}
            >
              Real money, real routes.
            </Text>
          </View>
        </GlassCard>

        {/* Info rows */}
        <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
          {ROWS.map((r) => (
            <GlassCard key={r.label} tint="default" radius="md" padding={16}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>{r.glyph(colors.primary)}</View>
                <View style={{ flex: 1 }}>
                  <Eyebrow tone="slate" size="micro">
                    {r.label}
                  </Eyebrow>
                  <Text
                    allowFontScaling={false}
                    style={{
                      marginTop: 2,
                      fontFamily: fonts.bodyMedium,
                      fontSize: typeScale.bodyLarge,
                      color: colors.onSurface,
                    }}
                  >
                    {r.detail}
                  </Text>
                </View>
                <ArrowRightGlyph size={16} color={colors.onSurfaceVariant} />
              </View>
            </GlassCard>
          ))}
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <PillCTA
            label="Unlock unlimited"
            tone="primary"
            onPress={() => router.push('/paywall')}
          />
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xxl },
  ghostHero: { position: 'absolute', left: -8, top: -14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
