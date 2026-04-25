import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { CheckGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listMaintenance, markTaskDone } from '@/services/maintenance';
import type { MaintenanceTaskRow, SeasonKind } from '@/types/database';

type SeasonUpper = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';
type Tone = 'amber' | 'cyan' | 'mint' | 'danger';

const SEASONS: SeasonUpper[] = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];

function dueDaysFrom(due: string | null): number {
  if (!due) return 9999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(`${due}T00:00:00`);
  const ms = d.getTime() - today.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function dueLabel(days: number, due: string | null): string {
  if (!due) return 'No due date';
  if (days < 0) return `Overdue ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'}`;
  if (days === 0) return 'Due today';
  if (days <= 7) return 'Due this week';
  if (days <= 30) return `Due in ${days} days`;
  if (days <= 90) return `Due in ${Math.round(days / 7)} weeks`;
  const d = new Date(`${due}T00:00:00`);
  return `Due in ${d.toLocaleDateString('en-US', { month: 'short' })}`;
}

function toneFor(days: number): Tone {
  if (days < 0) return 'danger';
  if (days <= 14) return 'amber';
  if (days <= 60) return 'cyan';
  return 'mint';
}

export default function Maintenance() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<MaintenanceTaskRow[]>([]);
  const [season, setSeason] = useState<SeasonUpper>('SPRING');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listMaintenance()
      .then((rows) => {
        if (cancelled) return;
        setTasks(rows);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load maintenance');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleDone = async (id: string, isDone: boolean) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done_at: isDone ? null : new Date().toISOString() } : t,
      ),
    );
    try {
      await markTaskDone(id, !isDone);
    } catch {
      // revert on failure
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, done_at: isDone ? new Date().toISOString() : null } : t,
        ),
      );
    }
  };

  const pickSeason = (s: SeasonUpper) => {
    Haptics.selectionAsync().catch(() => {});
    setSeason(s);
  };

  const filtered = useMemo(
    () => tasks.filter((t) => t.season === (season.toLowerCase() as SeasonKind)),
    [season, tasks],
  );

  const upcoming = useMemo(
    () =>
      tasks
        .filter((t) => !t.done_at)
        .map((t) => ({ task: t, days: dueDaysFrom(t.due_date) }))
        .sort((a, b) => a.days - b.days)
        .slice(0, 3),
    [tasks],
  );

  const overdueCount = useMemo(
    () => tasks.filter((t) => !t.done_at && dueDaysFrom(t.due_date) < 0).length,
    [tasks],
  );

  const next30 = useMemo(
    () =>
      tasks.filter((t) => {
        if (t.done_at) return false;
        const d = dueDaysFrom(t.due_date);
        return d >= 0 && d <= 30;
      }).length,
    [tasks],
  );

  const doneCount = useMemo(() => tasks.filter((t) => !!t.done_at).length, [tasks]);

  const startEstimate = (_t: MaintenanceTaskRow) => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/your-house');
  };

  return (
    <NoirScreen>
      <NoirHeader brand="MAINTENANCE · CALENDAR" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>SCHEDULE · SEASONAL</DocRef>
        <Text allowFontScaling={false} style={styles.title}>KEEP IT{'\n'}BORING.</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Small stuff done on time beats emergency repairs. Three items due before summer.
        </Text>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <NoirCard variant="outlined" radius="md" padding={18} style={{ marginTop: spacing.xl }}>
            <DocRef tone="danger">ERROR</DocRef>
            <Text allowFontScaling={false} style={styles.empty}>{error}</Text>
          </NoirCard>
        ) : (
          <>
            {/* Status row */}
            <View style={styles.statusRow}>
              <NoirCard variant="default" radius="md" padding={14} style={{ flex: 1 }}>
                <DocRef tone="danger">OVERDUE</DocRef>
                <Text allowFontScaling={false} style={styles.statusNum}>{overdueCount}</Text>
              </NoirCard>
              <NoirCard variant="default" radius="md" padding={14} style={{ flex: 1 }}>
                <DocRef tone="amber">NEXT 30D</DocRef>
                <Text allowFontScaling={false} style={styles.statusNum}>{next30}</Text>
              </NoirCard>
              <NoirCard variant="default" radius="md" padding={14} style={{ flex: 1 }}>
                <DocRef tone="mint">DONE</DocRef>
                <Text allowFontScaling={false} style={styles.statusNum}>{doneCount}</Text>
              </NoirCard>
            </View>

            {/* Upcoming */}
            <Label tone="tertiary" size="micro" style={styles.section}>Upcoming · 3</Label>
            <View style={{ gap: spacing.sm }}>
              {upcoming.map(({ task, days }) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  days={days}
                  onToggle={() => toggleDone(task.id, !!task.done_at)}
                  onEstimate={() => startEstimate(task)}
                />
              ))}
              {upcoming.length === 0 ? (
                <Text allowFontScaling={false} style={styles.empty}>
                  Nothing upcoming — enjoy the quiet.
                </Text>
              ) : null}
            </View>

            {/* Season picker */}
            <Label tone="tertiary" size="micro" style={styles.section}>By season</Label>
            <View style={styles.seasonRow}>
              {SEASONS.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => pickSeason(s)}
                  accessibilityRole="button"
                  accessibilityLabel={`Filter ${s.toLowerCase()}`}
                  accessibilityState={{ selected: season === s }}
                  hitSlop={4}
                  style={{ flex: 1 }}
                >
                  <View style={[styles.seasonPill, season === s ? styles.seasonPillActive : null]}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.seasonPillText, season === s ? styles.seasonPillTextActive : null]}
                    >
                      {s}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
              {filtered.map((t) => (
                <TaskRow
                  key={t.id}
                  task={t}
                  days={dueDaysFrom(t.due_date)}
                  onToggle={() => toggleDone(t.id, !!t.done_at)}
                  onEstimate={() => startEstimate(t)}
                />
              ))}
              {filtered.length === 0 ? (
                <Text allowFontScaling={false} style={styles.empty}>
                  Nothing in {season.toLowerCase()} — enjoy the quiet.
                </Text>
              ) : null}
            </View>

            <Text allowFontScaling={false} style={styles.note}>
              Tasks auto-scheduled from home profile age + climate · tune in Settings → Notifications.
            </Text>
          </>
        )}
      </ScrollView>
    </NoirScreen>
  );
}

function TaskRow({
  task,
  days,
  onToggle,
  onEstimate,
}: {
  task: MaintenanceTaskRow;
  days: number;
  onToggle: () => void;
  onEstimate: () => void;
}) {
  const isDone = !!task.done_at;
  const tone: Tone = toneFor(days);
  const due = dueLabel(days, task.due_date);
  return (
    <NoirCard
      variant={isDone ? 'outlined' : 'default'}
      radius="md"
      padding={14}
      style={{ opacity: isDone ? 0.55 : 1 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <Pressable
          onPress={onToggle}
          accessibilityRole="checkbox"
          accessibilityLabel={`${task.title} ${isDone ? 'done' : 'mark done'}`}
          accessibilityState={{ checked: isDone }}
          hitSlop={10}
        >
          <View
            style={[
              styles.checkbox,
              isDone ? { borderColor: colors.mint, backgroundColor: colors.mintTint18 } : null,
            ]}
          >
            {isDone ? <CheckGlyph size={14} color={colors.mint} /> : null}
          </View>
        </Pressable>
        <View style={{ flex: 1 }}>
          <DocRef tone={tone}>{due.toUpperCase()}</DocRef>
          <Text
            allowFontScaling={false}
            style={[
              styles.taskTitle,
              isDone ? { textDecorationLine: 'line-through', color: colors.textTertiary } : null,
            ]}
          >
            {task.title}
          </Text>
          {task.notes ? (
            <Text allowFontScaling={false} style={styles.taskMeta}>{task.notes}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Pressable
            onPress={onEstimate}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Start estimate for ${task.title}`}
          >
            <Text allowFontScaling={false} style={styles.startLink}>START →</Text>
          </Pressable>
        </View>
      </View>
    </NoirCard>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  loadingWrap: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 36,
    color: colors.text,
    letterSpacing: 1.2,
    lineHeight: 40,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  statusRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statusNum: {
    marginTop: 4,
    fontFamily: fonts.displayBold,
    fontSize: 30,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  seasonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  seasonPill: {
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    backgroundColor: colors.glass1,
  },
  seasonPillActive: {
    borderColor: colors.amber,
    backgroundColor: colors.amberGlow,
  },
  seasonPillText: {
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelSmall,
    color: colors.textSecondary,
    letterSpacing: tracking.labelWide,
  },
  seasonPillTextActive: {
    color: colors.amber,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  taskMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  startLink: {
    marginTop: 4,
    fontFamily: fonts.monoMedium,
    fontSize: typeScale.docRef,
    color: colors.amber,
    letterSpacing: tracking.docRef,
  },
  empty: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  note: {
    marginTop: spacing.huge,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
});
