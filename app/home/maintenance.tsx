import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { CheckGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type Season = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';
type Task = {
  id: string;
  title: string;
  meta: string;
  due: string; // relative
  dueDays: number; // negative = overdue
  season: Season;
  tone: 'amber' | 'cyan' | 'mint' | 'danger';
  estimatedCost: string;
};

const TASKS: Task[] = [
  { id: 'm-01', title: 'HVAC filter swap',       meta: '3-month cadence · MERV 11',        due: 'Due in 12 days',  dueDays: 12,  season: 'SPRING', tone: 'amber',  estimatedCost: '$15' },
  { id: 'm-02', title: 'Gutter clean — spring',   meta: 'Post-pollen load',                 due: 'Due this week',   dueDays: 3,   season: 'SPRING', tone: 'cyan',   estimatedCost: '$40' },
  { id: 'm-03', title: 'Smoke detector batteries', meta: '4 units · replace all',            due: 'Overdue 6 days',  dueDays: -6,  season: 'SPRING', tone: 'danger', estimatedCost: '$18' },
  { id: 'm-04', title: 'Water heater flush',      meta: 'Annual sediment clear',            due: 'Due in 3 weeks',  dueDays: 21,  season: 'SUMMER', tone: 'amber',  estimatedCost: '$60' },
  { id: 'm-05', title: 'Deck reseal',             meta: 'Check first — gentle abrasion',    due: 'Due in 6 weeks',  dueDays: 42,  season: 'SUMMER', tone: 'cyan',   estimatedCost: '$95' },
  { id: 'm-06', title: 'Chimney sweep',           meta: 'Before 1st burn',                  due: 'Due in Oct',      dueDays: 180, season: 'FALL',   tone: 'mint',   estimatedCost: '$180' },
];

const SEASONS: Season[] = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];

export default function Maintenance() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [done, setDone] = useState<Set<string>>(new Set());
  const [season, setSeason] = useState<Season>('SPRING');

  const toggleDone = (id: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const pickSeason = (s: Season) => {
    Haptics.selectionAsync().catch(() => {});
    setSeason(s);
  };

  const filtered = useMemo(() => TASKS.filter((t) => t.season === season), [season]);
  const upcoming = TASKS
    .filter((t) => !done.has(t.id))
    .sort((a, b) => a.dueDays - b.dueDays)
    .slice(0, 3);

  const startEstimate = (t: Task) => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/your-house');
  };

  const overdueCount = TASKS.filter((t) => t.dueDays < 0 && !done.has(t.id)).length;

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

        {/* Status row */}
        <View style={styles.statusRow}>
          <NoirCard variant="default" radius="md" padding={14} style={{ flex: 1 }}>
            <DocRef tone="danger">OVERDUE</DocRef>
            <Text allowFontScaling={false} style={styles.statusNum}>{overdueCount}</Text>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={{ flex: 1 }}>
            <DocRef tone="amber">NEXT 30D</DocRef>
            <Text allowFontScaling={false} style={styles.statusNum}>
              {TASKS.filter((t) => t.dueDays >= 0 && t.dueDays <= 30 && !done.has(t.id)).length}
            </Text>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={{ flex: 1 }}>
            <DocRef tone="mint">DONE</DocRef>
            <Text allowFontScaling={false} style={styles.statusNum}>{done.size}</Text>
          </NoirCard>
        </View>

        {/* Upcoming */}
        <Label tone="tertiary" size="micro" style={styles.section}>Upcoming · 3</Label>
        <View style={{ gap: spacing.sm }}>
          {upcoming.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              isDone={done.has(t.id)}
              onToggle={() => toggleDone(t.id)}
              onEstimate={() => startEstimate(t)}
            />
          ))}
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
              isDone={done.has(t.id)}
              onToggle={() => toggleDone(t.id)}
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
      </ScrollView>
    </NoirScreen>
  );
}

function TaskRow({
  task, isDone, onToggle, onEstimate,
}: {
  task: Task;
  isDone: boolean;
  onToggle: () => void;
  onEstimate: () => void;
}) {
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
              isDone ? { borderColor: colors.mint, backgroundColor: 'rgba(107,222,154,0.18)' } : null,
            ]}
          >
            {isDone ? <CheckGlyph size={14} color={colors.mint} /> : null}
          </View>
        </Pressable>
        <View style={{ flex: 1 }}>
          <DocRef tone={task.tone}>{task.due.toUpperCase()}</DocRef>
          <Text
            allowFontScaling={false}
            style={[
              styles.taskTitle,
              isDone ? { textDecorationLine: 'line-through', color: colors.textTertiary } : null,
            ]}
          >
            {task.title}
          </Text>
          <Text allowFontScaling={false} style={styles.taskMeta}>{task.meta}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text allowFontScaling={false} style={styles.costText}>{task.estimatedCost}</Text>
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
  costText: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
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
