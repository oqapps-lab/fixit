import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { BlueprintRoofScene } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

const TASKS = [
  { id: 't1', title: 'Gutter walk-around',           meta: '15 MIN · DIY', cost: '$0' },
  { id: 't2', title: 'HVAC filter replacement',      meta: '10 MIN · DIY', cost: '$18' },
  { id: 't3', title: 'Caulk bathroom perimeter',     meta: '40 MIN · DIY', cost: '$8'  },
];

export default function Seasonal() {
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="OBSIDIAN ARCH" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.sm,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <NoirCard variant="blueprint" radius="lg" padding={28} style={styles.hero}>
          <BlueprintRoofScene size={240} />
          <View style={styles.heroCoords}>
            <DocRef tone="cyan">SEC_04 // ELEV_12</DocRef>
            <DocRef tone="cyan">X: 42.1 Y: -18.4</DocRef>
          </View>

          <Text allowFontScaling={false} style={styles.heroLine1}>SPRING · THE</Text>
          <SerifHero size={40} align="center" style={{ marginTop: 4 }}>
            Tune-Up
          </SerifHero>

          <Text allowFontScaling={false} style={styles.heroSub}>
            three small things keep summer cheap
          </Text>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Checklist · 3 tasks
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {TASKS.map((t, i) => (
            <NoirCard key={t.id} variant="default" radius="md" padding={16}>
              <View style={styles.taskRow}>
                <View style={styles.taskIdx}>
                  <Text allowFontScaling={false} style={styles.taskIdxText}>{String(i + 1).padStart(2, '0')}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text allowFontScaling={false} style={styles.taskTitle}>{t.title}</Text>
                  <DocRef>{t.meta}</DocRef>
                </View>
                <Text allowFontScaling={false} style={styles.taskCost}>{t.cost}</Text>
              </View>
            </NoirCard>
          ))}
        </View>

        <AmberCTA
          label="Start Checklist"
          variant="primary"
          onPress={() => {}}
          style={{ marginTop: spacing.xxl }}
        />
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  hero: { marginTop: spacing.lg, alignItems: 'center' },
  heroCoords: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.xl,
  },
  heroLine1: {
    marginTop: spacing.lg,
    fontFamily: fonts.displayExtraBold,
    fontSize: 22,
    color: colors.text,
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  heroSub: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  taskIdx: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIdxText: {
    fontFamily: fonts.mono,
    fontSize: typeScale.labelSmall,
    color: colors.text,
    letterSpacing: tracking.docRef,
  },
  taskTitle: {
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
    marginBottom: 2,
  },
  taskCost: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.bodyLarge,
    color: colors.amber,
    letterSpacing: tracking.tight,
  },
});
