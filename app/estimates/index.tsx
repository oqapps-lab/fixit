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
import { SeverityChip } from '@/components/ui/SeverityChip';
import { ChevronRightGlyph, CheckGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { MOCK_ESTIMATES, formatCapturedAt, totalSavings, type Estimate } from '@/mock/estimates';

type Filter = 'all' | 'kitchen' | 'bath' | 'roof' | 'completed';
type Sort = 'recent' | 'highCost' | 'lowCost';

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: 'all',       label: 'ALL' },
  { key: 'kitchen',   label: 'KITCHEN' },
  { key: 'bath',      label: 'BATH' },
  { key: 'roof',      label: 'ROOF' },
  { key: 'completed', label: 'DONE' },
];

const SORTS: Array<{ key: Sort; label: string }> = [
  { key: 'recent',    label: 'RECENT' },
  { key: 'highCost',  label: 'HIGH $' },
  { key: 'lowCost',   label: 'LOW $' },
];

export default function EstimatesList() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('recent');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const compareMode = selected.size > 0;
  const canCompare = selected.size >= 2 && selected.size <= 3;

  const filtered = useMemo(() => {
    let list = [...MOCK_ESTIMATES];
    if (filter !== 'all') {
      if (filter === 'completed') list = list.filter((e) => e.status === 'completed');
      else list = list.filter((e) => e.room === filter || e.category === filter);
    }
    switch (sort) {
      case 'recent':
        list.sort((a, b) => b.capturedAt.localeCompare(a.capturedAt));
        break;
      case 'highCost':
        list.sort((a, b) => b.proPrice - a.proPrice);
        break;
      case 'lowCost':
        list.sort((a, b) => a.proPrice - b.proPrice);
        break;
    }
    return list;
  }, [filter, sort]);

  const toggleSelect = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (next.size >= 3) return prev; // cap at 3
        next.add(id);
      }
      return next;
    });
  };

  const go = (e: Estimate) => {
    if (compareMode) {
      toggleSelect(e.id);
      return;
    }
    Haptics.selectionAsync().catch(() => {});
    router.push(`/estimates/${e.id}` as any);
  };

  const goCompare = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const ids = Array.from(selected).join(',');
    router.push(`/estimates/compare?ids=${ids}` as any);
  };

  const clearSelection = () => {
    Haptics.selectionAsync().catch(() => {});
    setSelected(new Set());
  };

  const total = totalSavings(filtered);

  return (
    <NoirScreen>
      <NoirHeader brand="ESTIMATES · LIBRARY" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (compareMode ? 160 : spacing.huge) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <DocRef>ARCHIVE · FILTERABLE</DocRef>
        <Text allowFontScaling={false} style={styles.title}>ESTIMATES</Text>
        <Text allowFontScaling={false} style={styles.body}>
          {filtered.length} estimates · total saved vs blind-pro: ${total.toLocaleString()}
        </Text>

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillScroll}
          contentContainerStyle={styles.pillRow}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setFilter(f.key);
              }}
              accessibilityRole="button"
              accessibilityLabel={`Filter ${f.label.toLowerCase()}`}
              accessibilityState={{ selected: filter === f.key }}
              hitSlop={6}
            >
              <View style={[styles.pill, filter === f.key ? styles.pillActive : null]}>
                <Text allowFontScaling={false} style={[styles.pillText, filter === f.key ? styles.pillTextActive : null]}>
                  {f.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Sort row */}
        <View style={styles.sortRow}>
          <Label tone="tertiary" size="micro">Sort</Label>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {SORTS.map((s) => (
              <Pressable
                key={s.key}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setSort(s.key);
                }}
                accessibilityRole="button"
                accessibilityLabel={`Sort by ${s.label.toLowerCase()}`}
                accessibilityState={{ selected: sort === s.key }}
                hitSlop={6}
              >
                <Text
                  allowFontScaling={false}
                  style={[styles.sortItem, sort === s.key ? styles.sortItemActive : null]}
                >
                  {s.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Estimate list */}
        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          {filtered.map((e) => {
            const isSel = selected.has(e.id);
            const chosenLabel =
              e.chosenMode === 'diy' ? 'DIY' :
              e.chosenMode === 'hybrid' ? 'HYBRID' :
              e.chosenMode === 'pro' ? 'PRO' : 'PENDING';
            const chosenPrice =
              e.chosenMode === 'diy' ? e.diyPrice :
              e.chosenMode === 'hybrid' ? e.hybridPrice :
              e.chosenMode === 'pro' ? e.proPrice : null;
            return (
              <Pressable
                key={e.id}
                onPress={() => go(e)}
                onLongPress={() => toggleSelect(e.id)}
                delayLongPress={250}
                accessibilityRole="button"
                accessibilityLabel={`${e.title}, ${formatCapturedAt(e.capturedAt)}, ${chosenLabel}`}
                accessibilityHint="Tap to open. Long-press to select for comparison."
                accessibilityState={{ selected: isSel }}
                hitSlop={4}
              >
                {({ pressed }) => (
                  <NoirCard
                    variant={isSel ? 'elevated' : 'default'}
                    radius="md"
                    padding={16}
                    style={[
                      styles.row,
                      isSel ? styles.rowSelected : null,
                      pressed ? { opacity: 0.7 } : null,
                    ]}
                  >
                    {/* select indicator */}
                    <View
                      style={[
                        styles.selector,
                        isSel ? styles.selectorOn : null,
                      ]}
                    >
                      {isSel ? <CheckGlyph size={14} color={colors.amberBright} /> : null}
                    </View>

                    <View style={{ flex: 1 }}>
                      <DocRef tone={e.severity === 'moderate' ? 'amber' : 'neutral'}>
                        {e.code}
                      </DocRef>
                      <Text allowFontScaling={false} style={styles.itemTitle}>{e.title}</Text>
                      <View style={styles.metaRow}>
                        <SeverityChip level={e.severity} />
                        <Text allowFontScaling={false} style={styles.metaText}>
                          {`${formatCapturedAt(e.capturedAt)} · ${chosenLabel}`}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.priceCol}>
                      <Text allowFontScaling={false} style={styles.price}>
                        {chosenPrice != null ? `$${chosenPrice}` : `$${e.proPrice}`}
                      </Text>
                      <Text allowFontScaling={false} style={styles.priceMeta}>
                        {chosenPrice != null ? 'PAID' : 'EST'}
                      </Text>
                    </View>
                    <ChevronRightGlyph size={14} color={colors.textTertiary} />
                  </NoirCard>
                )}
              </Pressable>
            );
          })}
        </View>

        {filtered.length === 0 ? (
          <Text allowFontScaling={false} style={styles.empty}>
            No estimates match this filter.
          </Text>
        ) : null}
      </ScrollView>

      {/* Compare dock */}
      {compareMode ? (
        <View style={[styles.dock, { paddingBottom: insets.bottom + spacing.md }]}>
          <View style={styles.dockRow}>
            <View style={{ flex: 1 }}>
              <DocRef tone="amber">{`SELECTED · ${selected.size}/3`}</DocRef>
              <Text allowFontScaling={false} style={styles.dockHint}>
                Pick 2–3 estimates to stack them side-by-side.
              </Text>
            </View>
            <Pressable
              onPress={clearSelection}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
              hitSlop={8}
            >
              <Text allowFontScaling={false} style={styles.dockClear}>CLEAR</Text>
            </Pressable>
          </View>
          <View style={{ height: spacing.sm }} />
          <AmberCTA
            label={canCompare ? `Compare ${selected.size} estimates` : 'Select at least 2'}
            variant="primary"
            size="lg"
            disabled={!canCompare}
            onPress={goCompare}
          />
        </View>
      ) : null}
    </NoirScreen>
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
    fontSize: 40,
    color: colors.text,
    letterSpacing: 1.2,
  },
  body: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  pillScroll: {
    marginTop: spacing.xl,
    marginHorizontal: -spacing.xl,
  },
  pillRow: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    backgroundColor: colors.glass1,
  },
  pillActive: {
    borderColor: colors.amber,
    backgroundColor: colors.amberGlow,
  },
  pillText: {
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelSmall,
    color: colors.textSecondary,
    letterSpacing: tracking.labelWide,
  },
  pillTextActive: {
    color: colors.amber,
  },
  sortRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortItem: {
    fontFamily: fonts.monoMedium,
    fontSize: typeScale.labelSmall,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  sortItemActive: {
    color: colors.amber,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowSelected: {
    borderColor: colors.hairlineAmber,
  },
  selector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorOn: {
    borderColor: colors.amber,
    backgroundColor: colors.amberGlow,
  },
  itemTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaText: {
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textSecondary,
    letterSpacing: tracking.docRef,
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  priceMeta: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  empty: {
    marginTop: spacing.xxxl,
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textTertiary,
  },
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.hairlineStrong,
    backgroundColor: 'rgba(8,8,10,0.92)',
  },
  dockRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dockHint: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  dockClear: {
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelSmall,
    color: colors.textTertiary,
    letterSpacing: tracking.labelWide,
  },
});
