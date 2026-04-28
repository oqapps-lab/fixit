import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
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
import { listEstimates, totalSavings, formatCapturedAt } from '@/services/estimates';
import type { EstimateRow } from '@/types/database';

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
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoading(true);
      listEstimates()
        .then((rows) => { if (!cancelled) { setEstimates(rows); setLoading(false); } })
        .catch((e) => { if (!cancelled) { setError(e.message ?? 'Failed to load'); setLoading(false); } });
      return () => { cancelled = true; };
    }, []),
  );

  const compareMode = selected.size > 0;
  const canCompare = selected.size >= 2 && selected.size <= 3;

  const filtered = useMemo(() => {
    let list = [...estimates];
    if (filter !== 'all') {
      if (filter === 'completed') list = list.filter((e) => e.status === 'completed');
      else list = list.filter((e) => e.room === filter || e.category === filter);
    }
    const displayPrice = (e: typeof list[number]) => {
      switch (e.chosen_mode) {
        case 'diy': return Number(e.diy_price);
        case 'hybrid': return Number(e.hybrid_price);
        case 'pro': return Number(e.pro_price);
        default: return Number(e.pro_price);
      }
    };
    switch (sort) {
      case 'recent':
        list.sort((a, b) => b.captured_at.localeCompare(a.captured_at));
        break;
      case 'highCost':
        list.sort((a, b) => displayPrice(b) - displayPrice(a));
        break;
      case 'lowCost':
        list.sort((a, b) => displayPrice(a) - displayPrice(b));
        break;
    }
    return list;
  }, [estimates, filter, sort]);

  const toggleSelect = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (next.size >= 3) return prev;
        next.add(id);
      }
      return next;
    });
  };

  const go = (e: EstimateRow) => {
    if (compareMode) {
      toggleSelect(e.id);
      return;
    }
    Haptics.selectionAsync().catch(() => {});
    router.push(`/estimates/${e.id}`);
  };

  const goCompare = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const ids = Array.from(selected).join(',');
    router.push(`/estimates/compare?ids=${ids}`);
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
          {loading
            ? 'Loading…'
            : `${filtered.length} estimate${filtered.length === 1 ? '' : 's'} · total saved vs blind-pro: $${total.toLocaleString()}`}
        </Text>

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

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <Text allowFontScaling={false} style={styles.empty}>{error}</Text>
        ) : (
          <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            {filtered.map((e) => {
              const isSel = selected.has(e.id);
              const chosenLabel =
                e.chosen_mode === 'diy' ? 'DIY' :
                e.chosen_mode === 'hybrid' ? 'HYBRID' :
                e.chosen_mode === 'pro' ? 'PRO' : 'PENDING';
              const chosenPrice =
                e.chosen_mode === 'diy' ? Number(e.diy_price) :
                e.chosen_mode === 'hybrid' ? Number(e.hybrid_price) :
                e.chosen_mode === 'pro' ? Number(e.pro_price) : null;
              return (
                <Pressable
                  key={e.id}
                  onPress={() => go(e)}
                  onLongPress={() => toggleSelect(e.id)}
                  delayLongPress={250}
                  accessibilityRole="button"
                  accessibilityLabel={`${e.title}, ${formatCapturedAt(e.captured_at)}, ${chosenLabel}`}
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
                        <Text allowFontScaling={false} style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">{e.title}</Text>
                        <View style={styles.metaRow}>
                          <SeverityChip level={e.severity} />
                          <Text allowFontScaling={false} style={styles.metaText}>
                            {`${formatCapturedAt(e.captured_at)} · ${chosenLabel}`}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.priceCol}>
                        <Text allowFontScaling={false} style={styles.price}>
                          {chosenPrice != null ? `$${chosenPrice}` : `$${Number(e.pro_price)}`}
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
        )}

        {!loading && !error && filtered.length === 0 ? (
          <Text allowFontScaling={false} style={styles.empty}>
            No estimates match this filter.
          </Text>
        ) : null}
      </ScrollView>

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
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
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
  pillScroll: { marginTop: spacing.xl, marginHorizontal: -spacing.xl },
  pillRow: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    backgroundColor: colors.glass1,
  },
  pillActive: { borderColor: colors.amber, backgroundColor: colors.amberGlow },
  pillText: {
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelSmall,
    color: colors.textSecondary,
    letterSpacing: tracking.labelWide,
  },
  pillTextActive: { color: colors.amber },
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
  sortItemActive: { color: colors.amber },
  loader: { marginTop: spacing.xxxl, alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rowSelected: { borderColor: colors.hairlineAmber },
  selector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorOn: { borderColor: colors.amber, backgroundColor: colors.amberGlow },
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
  priceCol: { alignItems: 'flex-end' },
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
  dockRow: { flexDirection: 'row', alignItems: 'flex-start' },
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
