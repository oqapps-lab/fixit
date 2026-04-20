import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GhostNumber } from '@/components/ui/GhostNumber';
import { CottageGlyph, WrenchGlyph, ArrowRightGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

const ROOMS = [
  { name: 'Kitchen',    age: '18 years',   due: 'Quarterly faucet check — May', tint: 'sage' as const },
  { name: 'Bathroom',   age: '18 years',   due: 'Grout walk-around in 3 weeks', tint: 'peach' as const },
  { name: 'Living',     age: '18 years',   due: 'AC filter swap — early June',   tint: 'lavender' as const },
  { name: 'Exterior',   age: '18 years',   due: 'Gutter clean overdue · 30 days', tint: 'coral' as const },
];

export default function MyHomeTab() {
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
        <View>
          <Eyebrow tone="slate">My home</Eyebrow>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalicBold,
              fontSize: 36,
              color: colors.onSurface,
              letterSpacing: tracking.heroDisplay,
              lineHeight: 40,
            }}
          >
            Four rooms.
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.heroItalic,
              fontSize: 24,
              color: colors.primary,
              letterSpacing: tracking.hero,
            }}
          >
            Quiet, mostly.
          </Text>
        </View>

        {/* Big ghost — "18 years" */}
        <View style={styles.summaryBlock}>
          <GhostNumber value="18 yrs" size="md" tone="slate" opacity={0.16} style={styles.ghost} />
          <Eyebrow tone="coral" style={{ marginTop: spacing.lg }}>
            Since built
          </Eyebrow>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: 2,
              fontFamily: fonts.body,
              fontSize: typeScale.bodyMedium,
              color: colors.onSurfaceVariant,
            }}
          >
            Denver, CO · Built 2008 · 1,840 sq ft
          </Text>
        </View>

        {/* Rooms list */}
        <View style={{ marginTop: spacing.xxl, gap: spacing.md }}>
          {ROOMS.map((room) => (
            <GlassCard key={room.name} tint={room.tint} radius="lg" padding={18}>
              <View style={styles.roomRow}>
                <View style={styles.roomGlyph}>
                  <CottageGlyph size={28} color={colors.primary} secondary={colors.mint} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: fonts.displayBold,
                      fontSize: 20,
                      color: colors.onSurface,
                      letterSpacing: tracking.hero,
                    }}
                  >
                    {room.name}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: fonts.body,
                      fontSize: typeScale.bodySmall,
                      color: colors.onSurfaceVariant,
                      marginTop: 2,
                    }}
                  >
                    {room.due}
                  </Text>
                </View>
                <ArrowRightGlyph size={16} color={colors.onSurface} />
              </View>
            </GlassCard>
          ))}
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <PillCTA label="Add a room" tone="sage" size="md" />
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xxl },
  summaryBlock: { marginTop: spacing.xl, position: 'relative', paddingBottom: spacing.sm },
  ghost: { position: 'absolute', left: -4, top: -8 },
  roomRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  roomGlyph: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
});
