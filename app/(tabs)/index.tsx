import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { RingChart } from '@/components/ui/RingChart';
import { SeverityChip } from '@/components/ui/SeverityChip';
import * as Haptics from 'expo-haptics';
import { ArrowUpRightGlyph, BellGlyph, RescanGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listEstimates } from '@/services/estimates';
import { listRepairs } from '@/services/repairs';
import { listMaintenance } from '@/services/maintenance';
import type { EstimateRow, MaintenanceTaskRow, RepairRow, Severity, CategoryKind } from '@/types/database';

type Status = 'calm' | 'watch' | 'fair' | 'urgent';

const STATUS_TONE: Record<Status, { color: string; label: string }> = {
  calm:   { color: colors.mint,   label: 'CALM' },
  watch:  { color: colors.amber,  label: 'WATCH' },
  fair:   { color: colors.cyan,   label: 'FAIR' },
  urgent: { color: colors.danger, label: 'URGENT' },
};

const CATEGORY_LABELS: Record<CategoryKind, string> = {
  roof: 'ROOF',
  walls: 'WALLS',
  plumbing: 'PLUMBING',
  electrical: 'ELECTRICAL',
  appliance: 'APPLIANCES',
  floor: 'FLOOR',
  hvac: 'HVAC',
};

const SEVERITY_RANK: Record<Severity, number> = { low: 0, moderate: 1, high: 2 };

function severityToStatus(s: Severity): Status {
  if (s === 'high') return 'urgent';
  if (s === 'moderate') return 'watch';
  return 'calm';
}

function computeHealth(args: {
  urgentCount: number;
  highSeverityCount: number;
  overdueMaintCount: number;
}) {
  const raw = 100 - args.urgentCount * 15 - args.highSeverityCount * 10 - args.overdueMaintCount * 5;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

function healthLabel(score: number): string {
  if (score >= 85) return 'Good';
  if (score >= 65) return 'Fair';
  return 'Poor';
}

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [repairs, setRepairs] = useState<RepairRow[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceTaskRow[]>([]);
  const [lastScanIso, setLastScanIso] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const [e, r, m] = await Promise.all([listEstimates(), listRepairs(), listMaintenance()]);
      setEstimates(e);
      setRepairs(r);
      setMaintenance(m);
      setLastScanIso(new Date().toISOString());
    } catch {
      // silently swallow — keep last good state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Derived counts
  const urgentCount =
    estimates.filter((e) => e.severity === 'high').length +
    repairs.filter((r) => r.severity === 'high').length;
  const highSeverityCount = estimates.filter((e) => e.severity === 'moderate').length;
  const todayIso = new Date().toISOString().slice(0, 10);
  const overdueMaintCount = maintenance.filter(
    (t) => !t.done_at && t.due_date && t.due_date < todayIso,
  ).length;
  const dueMaintCount = maintenance.filter((t) => !t.done_at).length;

  const health = computeHealth({ urgentCount, highSeverityCount, overdueMaintCount });
  const hLabel = healthLabel(health);

  // Build categories from estimates: each category → max severity
  const categoryMap = new Map<CategoryKind, Severity>();
  for (const e of estimates) {
    const prev = categoryMap.get(e.category);
    if (!prev || SEVERITY_RANK[e.severity] > SEVERITY_RANK[prev]) {
      categoryMap.set(e.category, e.severity);
    }
  }
  const categories: { label: string; status: Status }[] = Array.from(categoryMap.entries()).map(
    ([cat, sev]) => ({
      label: CATEGORY_LABELS[cat] ?? String(cat).toUpperCase(),
      status: severityToStatus(sev),
    }),
  );

  // Featured alert — pick highest-severity estimate
  const featured =
    [...estimates].sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity])[0] ?? null;

  const lastScanLabel = lastScanIso
    ? `Last Scan · ${new Date(lastScanIso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · Today`
    : 'Last Scan · —';

  return (
    <NoirScreen>
      <NoirHeader
        brand="FIXIT NOIR"
        showMenu
        right={
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              router.push('/notifications-center' as any);
            }}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Open notifications"
          >
            <BellGlyph size={18} color={colors.amber} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.md,
            paddingBottom: insets.bottom + 160,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>PRIMARY RESIDENCE</DocRef>
        <Text allowFontScaling={false} style={styles.displayTitle}>
          HOME HEALTH{'\n'}DASHBOARD
        </Text>

        {/* Health Ring card */}
        <NoirCard variant="elevated" radius="lg" padding={26} style={styles.ringCard}>
          <View style={styles.ringWrap}>
            <RingChart size={200} value={health} tone="cyan" segments={0} strokeWidth={3} />
            <View style={styles.ringCenter}>
              {loading ? (
                <ActivityIndicator color={colors.amber} />
              ) : (
                <>
                  <HeroNumber value={String(health)} size="xl" tone="white" align="center" />
                  <View style={{ height: 4 }} />
                  <Label tone="tertiary" size="micro" align="center">{`Home Health · ${hLabel}`}</Label>
                </>
              )}
            </View>
          </View>

          {/* Category legend — two-column grid, right below the ring */}
          <View style={styles.legend}>
            {categories.map((c) => {
              const t = STATUS_TONE[c.status];
              return (
                <View key={c.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: t.color }]} />
                  <Text allowFontScaling={false} style={styles.legendLabel}>
                    {c.label}
                  </Text>
                  <Text allowFontScaling={false} style={[styles.legendStatus, { color: t.color }]}>
                    {t.label}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.scanRow}>
            <DocRef>{lastScanLabel}</DocRef>
            <Pressable
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Rescan home health"
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                refetch();
              }}
            >
              <View style={styles.scanRight}>
                <RescanGlyph size={12} color={colors.cyan} />
                <Text allowFontScaling={false} style={styles.rescanText}>RESCAN</Text>
              </View>
            </Pressable>
          </View>
        </NoirCard>

        {/* Alert card */}
        {featured ? (
          <Pressable
            onPress={() => router.push(`/repair/${featured.id}` as any)}
            accessibilityRole="button"
            accessibilityLabel={`${featured.title} — open details`}
            style={{ marginTop: spacing.lg }}
          >
            <NoirCard variant="default" radius="md" padding={20} style={styles.alertCard}>
              <View style={styles.alertBar} />
              <View style={{ flex: 1 }}>
                <View style={styles.alertHeader}>
                  <SeverityChip level={featured.severity} label="▲" />
                  <Text allowFontScaling={false} style={styles.alertTitle}>
                    {featured.title}
                  </Text>
                </View>
                <Text allowFontScaling={false} style={styles.alertBody}>
                  {featured.diagnosis}
                </Text>
                <View style={styles.alertCta}>
                  <Text allowFontScaling={false} style={styles.alertCtaText}>VIEW DETAILS</Text>
                  <ArrowUpRightGlyph size={12} color={colors.amber} />
                </View>
              </View>
            </NoirCard>
          </Pressable>
        ) : null}

        {/* Stat pair — derived counts */}
        <View style={styles.statsRow}>
          <NoirCard variant="default" radius="md" padding={18} style={styles.statCard}>
            <DocRef>Active Estimates</DocRef>
            <HeroNumber
              value={String(estimates.length)}
              size="md"
              tone="white"
              style={{ marginTop: 8 }}
            />
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={18} style={styles.statCard}>
            <DocRef>Active Repairs</DocRef>
            <HeroNumber
              value={String(repairs.filter((r) => r.progress < 1).length)}
              size="md"
              tone="white"
              style={{ marginTop: 8 }}
            />
          </NoirCard>
        </View>

        {/* Maintenance card */}
        <Pressable
          onPress={() => {
            Haptics.selectionAsync().catch(() => {});
            router.push('/home/maintenance' as any);
          }}
          accessibilityRole="button"
          accessibilityLabel={`Maintenance calendar — ${dueMaintCount} tasks due`}
          style={{ marginTop: spacing.lg }}
        >
          {({ pressed }) => (
            <NoirCard
              variant="default"
              radius="md"
              padding={18}
              style={[
                { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
                pressed ? { opacity: 0.7 } : null,
              ]}
            >
              <View style={styles.maintTick} />
              <View style={{ flex: 1 }}>
                <DocRef tone="amber">{`SCHEDULE · ${dueMaintCount} DUE`}</DocRef>
                <Text allowFontScaling={false} style={styles.maintTitle}>Spring maintenance is up</Text>
                <Text allowFontScaling={false} style={styles.maintMeta}>HVAC filter, gutters, smoke alarms.</Text>
              </View>
              <ArrowUpRightGlyph size={14} color={colors.amber} />
            </NoirCard>
          )}
        </Pressable>

        {/* Home edit link */}
        <Pressable
          onPress={() => {
            Haptics.selectionAsync().catch(() => {});
            router.push('/home/edit' as any);
          }}
          accessibilityRole="button"
          accessibilityLabel="Edit home profile"
          style={{ marginTop: spacing.sm }}
        >
          {({ pressed }) => (
            <NoirCard
              variant="outlined"
              radius="md"
              padding={16}
              style={[
                { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
                pressed ? { opacity: 0.7 } : null,
              ]}
            >
              <View style={{ flex: 1 }}>
                <DocRef tone="cyan">PROFILE · METADATA</DocRef>
                <Text allowFontScaling={false} style={styles.maintTitle}>Edit home profile</Text>
              </View>
              <ArrowUpRightGlyph size={14} color={colors.cyan} />
            </NoirCard>
          )}
        </Pressable>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
  },
  displayTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 32,
    color: colors.text,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    lineHeight: 36,
  },
  ringCard: {
    marginTop: spacing.xl,
  },
  ringWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    alignSelf: 'center',
    position: 'relative',
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.sm,
  },
  legendItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.sm,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  legendLabel: {
    flex: 1,
    fontFamily: fonts.labelSemibold,
    fontSize: 10,
    color: colors.text,
    letterSpacing: 1.2,
  },
  legendStatus: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: tracking.docRef,
  },
  scanRow: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rescanText: {
    fontFamily: fonts.labelSemibold,
    color: colors.cyan,
    fontSize: typeScale.labelMicro,
    letterSpacing: tracking.labelWide,
  },
  alertCard: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertBar: {
    width: 3,
    backgroundColor: colors.amber,
    borderRadius: 1.5,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  alertTitle: {
    flex: 1,
    fontFamily: fonts.displaySemibold,
    color: colors.text,
    fontSize: typeScale.titleSmall,
    letterSpacing: tracking.tight,
  },
  alertBody: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  alertCta: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  alertCtaText: {
    fontFamily: fonts.labelSemibold,
    color: colors.amber,
    fontSize: typeScale.labelMicro,
    letterSpacing: tracking.labelWide,
  },
  statsRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
  },
  maintTick: {
    width: 3,
    height: 38,
    borderRadius: 2,
    backgroundColor: colors.amber,
  },
  maintTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  maintMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
});
