import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { SeverityChip } from '@/components/ui/SeverityChip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ChevronRightGlyph, PulseDot } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

const ACTIVE_REPAIRS = [
  { id: 'rp-002', code: 'RP-002', title: 'Roof Leak',       severity: 'moderate' as const, progress: 0.35, impact: '$450' },
  { id: 'rp-003', code: 'RP-003', title: 'Attic Moisture',  severity: 'low' as const,      progress: 0.15, impact: '$80'  },
];

const PAST_REPAIRS = [
  { id: 'rp-001', title: 'Kitchen Tap Replacement', impact: '$145' },
  { id: 'rp-000', title: 'Bathroom Tile Grout',     impact: '$320' },
];

export default function RepairsTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="FIXIT NOIR" showMenu />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.md,
            paddingBottom: insets.bottom + 130,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>LIVE PROJECTS</DocRef>
        <Text allowFontScaling={false} style={styles.title}>
          PROJECTS
        </Text>

        <AmberCTA
          label="+ New Estimate"
          variant="primary"
          size="md"
          onPress={() => router.push('/your-house')}
          style={{ marginTop: spacing.lg }}
        />

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Active Repairs
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.md }}>
          {ACTIVE_REPAIRS.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => router.push(`/repair/${r.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`${r.title} — open details`}
            >
              <NoirCard variant="default" radius="md" padding={18}>
                <View style={styles.repairRow}>
                  <PulseDot size={8} color={r.severity === 'moderate' ? colors.amber : colors.mint} />
                  <View style={{ flex: 1 }}>
                    <DocRef>{`REF: ${r.code} · ACTIVE`}</DocRef>
                    <Text allowFontScaling={false} style={styles.repairTitle}>
                      {r.title}
                    </Text>
                  </View>
                  <HeroNumber value={r.impact} size="sm" tone="white" />
                  <ChevronRightGlyph size={14} color={colors.textTertiary} />
                </View>
                <View style={styles.progressRow}>
                  <SeverityChip level={r.severity} />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <ProgressBar value={r.progress} tone={r.severity === 'moderate' ? 'amber' : 'mint'} />
                  </View>
                  <Text allowFontScaling={false} style={styles.progressPct}>
                    {`${Math.round(r.progress * 100)}%`}
                  </Text>
                </View>
              </NoirCard>
            </Pressable>
          ))}
        </View>

        <View style={styles.archiveHead}>
          <Label tone="tertiary" size="micro">Archive · Complete</Label>
          <Pressable
            onPress={() => router.push('/estimates' as any)}
            hitSlop={8}
            accessibilityRole="link"
            accessibilityLabel="View all estimates"
          >
            <Text allowFontScaling={false} style={styles.archiveLink}>VIEW ALL →</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {PAST_REPAIRS.map((r) => (
            <NoirCard key={r.id} variant="outlined" radius="md" padding={16}>
              <View style={styles.pastRow}>
                <Text allowFontScaling={false} style={styles.pastTitle}>{r.title}</Text>
                <Text allowFontScaling={false} style={styles.pastPrice}>{r.impact}</Text>
              </View>
            </NoirCard>
          ))}
        </View>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 36,
    color: colors.text,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  repairRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  repairTitle: {
    marginTop: 4,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  progressRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressPct: {
    marginLeft: spacing.md,
    fontFamily: fonts.monoMedium,
    fontSize: typeScale.labelSmall,
    color: colors.textSecondary,
    letterSpacing: tracking.docRef,
    minWidth: 36,
    textAlign: 'right',
  },
  pastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastTitle: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
  pastPrice: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  archiveHead: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  archiveLink: {
    fontFamily: fonts.monoMedium,
    fontSize: typeScale.labelSmall,
    color: colors.amber,
    letterSpacing: tracking.labelWide,
  },
});
