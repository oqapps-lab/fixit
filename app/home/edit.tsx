import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { getMyProfile, updateMyProfile } from '@/services/profile';
import type { HomeKind, RoomKind } from '@/types/database';

const TYPES: Array<{ key: HomeKind; title: string; meta: string }> = [
  { key: 'house',     title: 'Single-family',  meta: 'Detached, own lot' },
  { key: 'townhouse', title: 'Townhouse',      meta: 'Row / attached' },
  { key: 'condo',     title: 'Condo',          meta: 'Owned unit, shared walls' },
  { key: 'apartment', title: 'Apartment',      meta: 'Rental — landlord approval logic' },
];

const ROOMS: Array<{ key: RoomKind; title: string }> = [
  { key: 'kitchen',  title: 'Kitchen' },
  { key: 'bath',     title: 'Bathroom' },
  { key: 'bedroom',  title: 'Bedroom' },
  { key: 'living',   title: 'Living Room' },
  { key: 'garage',   title: 'Garage' },
  { key: 'exterior', title: 'Yard / Exterior' },
  { key: 'attic',    title: 'Attic' },
  { key: 'laundry',  title: 'Laundry' },
];

const CURRENT_YEAR = 2026;
const MIN_YEAR = 1900;
const DEFAULT_YEAR = 1998;

export default function HomeEdit() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [type, setType] = useState<HomeKind>('house');
  const [yearBuilt, setYearBuilt] = useState<number>(DEFAULT_YEAR);
  const [rooms, setRooms] = useState<Set<RoomKind>>(new Set(['kitchen', 'bath', 'living', 'attic']));
  const [zip, setZip] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getMyProfile()
      .then((p) => {
        if (cancelled) return;
        if (p) {
          setType(p.home_kind ?? 'house');
          setYearBuilt(p.home_year_built ?? DEFAULT_YEAR);
          setRooms(new Set(p.rooms ?? []));
          setZip(p.home_zip ?? null);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load profile');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleRoom = (r: RoomKind) => {
    Haptics.selectionAsync().catch(() => {});
    setRooms((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  };

  const decade = Math.floor((yearBuilt - MIN_YEAR) / (CURRENT_YEAR - MIN_YEAR) * 100);

  const onYearSnap = (delta: number) => {
    Haptics.selectionAsync().catch(() => {});
    setYearBuilt((y) => Math.max(MIN_YEAR, Math.min(CURRENT_YEAR, y + delta)));
  };

  const onSave = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setSaving(true);
    try {
      await updateMyProfile({
        home_kind: type,
        home_year_built: yearBuilt,
        home_zip: zip,
        rooms: Array.from(rooms),
      });
      Alert.alert('Home saved', `${type} · built ${yearBuilt} · ${rooms.size} rooms tracked.`, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (e: any) {
      Alert.alert('Save failed', e?.message ?? 'Could not save home profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <NoirScreen>
      <NoirHeader brand="MY HOME · EDIT" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>PROFILE · METADATA</DocRef>
        <Text allowFontScaling={false} style={styles.title}>YOUR HOUSE{'\n'}PROFILE</Text>
        <Text allowFontScaling={false} style={styles.body}>
          These tweak AI estimates — older homes, stricter pricing; condos, permission notes; etc.
        </Text>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <NoirCard variant="outlined" radius="md" padding={18} style={{ marginTop: spacing.xl }}>
            <DocRef tone="danger">ERROR</DocRef>
            <Text allowFontScaling={false} style={styles.rowMeta}>{error}</Text>
          </NoirCard>
        ) : (
          <>
            {/* Home type */}
            <Label tone="tertiary" size="micro" style={styles.section}>Home type</Label>
            <View style={{ gap: spacing.sm }}>
              {TYPES.map((t) => {
                const active = type === t.key;
                return (
                  <Pressable
                    key={t.key}
                    onPress={() => {
                      Haptics.selectionAsync().catch(() => {});
                      setType(t.key);
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={t.title}
                    hitSlop={4}
                  >
                    {({ pressed }) => (
                      <NoirCard
                        variant={active ? 'elevated' : 'default'}
                        radius="md"
                        padding={14}
                        style={[
                          styles.row,
                          active ? styles.rowActive : null,
                          pressed ? { opacity: 0.7 } : null,
                        ]}
                      >
                        <View style={[styles.radio, active ? styles.radioActive : null]}>
                          {active ? <View style={styles.radioInner} /> : null}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text allowFontScaling={false} style={[styles.rowTitle, active ? { color: colors.amber } : null]}>
                            {t.title}
                          </Text>
                          <Text allowFontScaling={false} style={styles.rowMeta}>{t.meta}</Text>
                        </View>
                      </NoirCard>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* Year built */}
            <Label tone="tertiary" size="micro" style={styles.section}>Year built</Label>
            <NoirCard variant="elevated" radius="md" padding={18}>
              <View style={styles.yearRow}>
                <Pressable
                  onPress={() => onYearSnap(-10)}
                  accessibilityRole="button"
                  accessibilityLabel="Subtract 10 years"
                  hitSlop={10}
                  style={styles.yearBtn}
                >
                  <Text style={styles.yearBtnText}>−10</Text>
                </Pressable>
                <View style={styles.yearBlock}>
                  <Text allowFontScaling={false} style={styles.yearNumber}>{yearBuilt}</Text>
                  <Text allowFontScaling={false} style={styles.yearMeta}>{`${CURRENT_YEAR - yearBuilt} years old`}</Text>
                </View>
                <Pressable
                  onPress={() => onYearSnap(10)}
                  accessibilityRole="button"
                  accessibilityLabel="Add 10 years"
                  hitSlop={10}
                  style={styles.yearBtn}
                >
                  <Text style={styles.yearBtnText}>+10</Text>
                </Pressable>
              </View>
              <View style={styles.trackOuter}>
                <View style={[styles.trackFill, { width: `${decade}%` }]} />
              </View>
              <View style={styles.trackLabels}>
                <DocRef>1900</DocRef>
                <DocRef>{String(CURRENT_YEAR)}</DocRef>
              </View>
            </NoirCard>

            {/* Rooms */}
            <Label tone="tertiary" size="micro" style={styles.section}>Rooms to track</Label>
            <View style={styles.roomGrid}>
              {ROOMS.map((r) => {
                const active = rooms.has(r.key);
                return (
                  <Pressable
                    key={r.key}
                    onPress={() => toggleRoom(r.key)}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: active }}
                    accessibilityLabel={r.title}
                    hitSlop={4}
                    style={{ width: '48%' }}
                  >
                    {({ pressed }) => (
                      <NoirCard
                        variant={active ? 'elevated' : 'default'}
                        radius="md"
                        padding={14}
                        style={[
                          styles.roomCell,
                          active ? styles.rowActive : null,
                          pressed ? { opacity: 0.7 } : null,
                        ]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text allowFontScaling={false} style={[styles.roomLabel, active ? { color: colors.amber } : null]}>
                            {r.title}
                          </Text>
                        </View>
                        {active ? (
                          <CheckGlyph size={16} color={colors.amber} />
                        ) : (
                          <View style={styles.checkbox} />
                        )}
                      </NoirCard>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <View style={{ height: spacing.xxxl }} />
            <AmberCTA
              label={saving ? 'Saving…' : 'Save home profile'}
              variant="primary"
              size="lg"
              onPress={onSave}
              disabled={saving}
            />
            <View style={{ height: spacing.sm }} />
            <AmberCTA label="Cancel" variant="outlined" size="md" onPress={() => router.back()} />
          </>
        )}
      </ScrollView>
    </NoirScreen>
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
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowActive: {
    borderColor: colors.hairlineAmber,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.amber,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.amber,
  },
  rowTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  rowMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearBtn: {
    width: 54,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.glass1,
  },
  yearBtnText: {
    fontFamily: fonts.monoMedium,
    fontSize: 13,
    color: colors.amber,
    letterSpacing: tracking.docRef,
  },
  yearBlock: {
    flex: 1,
    alignItems: 'center',
  },
  yearNumber: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 44,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  yearMeta: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  trackOuter: {
    marginTop: spacing.md,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface2,
    overflow: 'hidden',
  },
  trackFill: {
    height: 4,
    backgroundColor: colors.amber,
  },
  trackLabels: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.sm,
  },
  roomCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  roomLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.text,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
  },
});
