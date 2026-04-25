import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
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
import { listEstimates } from '@/services/estimates';
import { listRepairs } from '@/services/repairs';
import type { EstimateRow, RepairRow, Severity } from '@/types/database';

type ActiveItem = {
  id: string;
  code: string;
  title: string;
  severity: Severity;
  progress: number;
  impact: string;
};

type PastItem = {
  id: string;
  title: string;
  impact: string;
};

function formatPrice(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return `$${Math.round(v).toLocaleString('en-US')}`;
}

export default function RepairsTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [repairs, setRepairs] = useState<RepairRow[]>([]);
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [r, e] = await Promise.all([listRepairs(), listEstimates()]);
        if (cancelled) return;
        setRepairs(r);
        setEstimates(e);
        setError(null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Active = repairs progress < 1, plus in-progress estimates without a matching repair
  const activeFromRepairs: ActiveItem[] = repairs
    .filter((r) => r.progress < 1)
    .map((r) => ({
      id: r.id,
      code: r.code,
      title: r.title,
      severity: r.severity,
      progress: r.progress,
      impact: r.impact ?? '—',
    }));

  const repairEstimateIds = new Set(repairs.map((r) => r.estimate_id).filter(Boolean) as string[]);
  const activeFromEstimates: ActiveItem[] = estimates
    .filter((e) => e.status === 'in-progress' && !repairEstimateIds.has(e.id))
    .map((e) => ({
      id: e.id,
      code: e.code,
      title: e.title,
      severity: e.severity,
      progress: 0,
      impact: formatPrice(e.actual_paid ?? e.pro_price),
    }));

  const ACTIVE_REPAIRS: ActiveItem[] = [...activeFromRepairs, ...activeFromEstimates];

  // Past = repairs with progress >= 1, plus completed estimates
  const pastFromRepairs: PastItem[] = repairs
    .filter((r) => r.progress >= 1)
    .map((r) => ({ id: r.id, title: r.title, impact: r.impact ?? '—' }));

  const pastFromEstimates: PastItem[] = estimates
    .filter((e) => e.status === 'completed')
    .map((e) => ({
      id: e.id,
      title: e.title,
      impact: formatPrice(e.actual_paid ?? e.pro_price),
    }));

  const PAST_REPAIRS: PastItem[] = [...pastFromRepairs, ...pastFromEstimates];

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
        <DocRef>{`LIVE PROJECTS · ACTIVE ${ACTIVE_REPAIRS.length} / DUE ${PAST_REPAIRS.length}`}</DocRef>
        <Text allowFontScaling={false} style={styles.title}>
          PROJECTS
        </Text>

        {error ? (
          <NoirCard
            variant="outlined"
            radius="md"
            padding={12}
            style={[styles.errorBanner, { borderColor: colors.hairlineDanger }]}
          >
            <Text allowFontScaling={false} style={styles.errorText}>
              {error}
            </Text>
          </NoirCard>
        ) : null}

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

        {loading ? (
          <View style={{ marginTop: spacing.lg, alignItems: 'center' }}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : ACTIVE_REPAIRS.length === 0 ? (
          <View style={{ marginTop: spacing.md }}>
            <NoirCard variant="outlined" radius="md" padding={16}>
              <Text allowFontScaling={false} style={styles.emptyText}>
                No active repairs · tap a problem photo to start
              </Text>
            </NoirCard>
          </View>
        ) : (
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
                    <PulseDot
                      size={8}
                      color={r.severity === 'high' || r.severity === 'moderate' ? colors.amber : colors.mint}
                    />
                    <View style={{ flex: 1 }}>
                      <DocRef>{`REF: ${r.code} · ACTIVE`}</DocRef>
                      <Text
                        allowFontScaling={false}
                        style={styles.repairTitle}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {r.title}
                      </Text>
                    </View>
                    <View style={styles.impactWrap}>
                      <HeroNumber value={r.impact} size="sm" tone="white" />
                    </View>
                    <ChevronRightGlyph size={14} color={colors.textTertiary} />
                  </View>
                  <View style={styles.progressRow}>
                    <SeverityChip level={r.severity} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <ProgressBar
                        value={r.progress}
                        tone={r.severity === 'high' || r.severity === 'moderate' ? 'amber' : 'mint'}
                      />
                    </View>
                    <Text allowFontScaling={false} style={styles.progressPct}>
                      {`${Math.round(r.progress * 100)}%`}
                    </Text>
                  </View>
                </NoirCard>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.archiveHead}>
          <Label tone="tertiary" size="micro">Archive · Complete</Label>
          <Pressable
            onPress={() => router.push('/estimates')}
            hitSlop={8}
            accessibilityRole="link"
            accessibilityLabel="View all estimates"
          >
            <Text allowFontScaling={false} style={styles.archiveLink}>VIEW ALL →</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {PAST_REPAIRS.length === 0 ? (
            <NoirCard variant="outlined" radius="md" padding={16}>
              <Text allowFontScaling={false} style={styles.emptyText}>
                Past repairs will appear here.
              </Text>
            </NoirCard>
          ) : (
            PAST_REPAIRS.map((r) => (
              <NoirCard key={r.id} variant="outlined" radius="md" padding={16}>
                <View style={styles.pastRow}>
                  <Text allowFontScaling={false} style={styles.pastTitle} numberOfLines={2} ellipsizeMode="tail">{r.title}</Text>
                  <Text allowFontScaling={false} style={styles.pastPrice}>{r.impact}</Text>
                </View>
              </NoirCard>
            ))
          )}
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
  errorBanner: {
    marginTop: spacing.md,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.danger,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  impactWrap: {
    maxWidth: 110,
  },
});
