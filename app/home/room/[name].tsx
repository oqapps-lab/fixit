import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ChevronRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listEstimates, totalSavings, formatCapturedAt } from '@/services/estimates';
import { getRoomMeta } from '@/services/rooms';
import type { EstimateRow, RoomKind, RoomMetadataRow } from '@/types/database';

const ROOM_LABELS: Record<RoomKind, string> = {
  kitchen: 'Kitchen',
  bath: 'Bathroom',
  living: 'Living Room',
  bedroom: 'Bedroom',
  exterior: 'Exterior',
  laundry: 'Laundry',
  garage: 'Garage',
  attic: 'Attic',
};

const ROOM_TAGLINES: Record<RoomKind, string> = {
  kitchen: 'Highest water / electrical density. Worth the notes.',
  bath: 'Tile + grout + hidden pipes. Document now, save later.',
  living: 'Softer wear. Walls + floors + the one good hinge.',
  bedroom: 'Mostly cosmetic — still worth the paint code.',
  exterior: 'Seasonal maintenance hotspot.',
  laundry: 'Hot / cold / drain — three failure surfaces.',
  garage: 'Door motor + slab cracks + storage insulation.',
  attic: 'Nobody looks up here. That is why leaks win.',
};

const VALID_ROOMS: RoomKind[] = ['kitchen', 'bath', 'living', 'bedroom', 'exterior', 'laundry', 'garage', 'attic'];

export default function RoomDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();
  const roomKey: RoomKind = (VALID_ROOMS as string[]).includes(name as string)
    ? (name as RoomKind)
    : 'kitchen';
  const roomLabel = ROOM_LABELS[roomKey];
  const roomTagline = ROOM_TAGLINES[roomKey];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<RoomMetadataRow | null>(null);
  const [related, setRelated] = useState<EstimateRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([getRoomMeta(roomKey), listEstimates()])
      .then(([m, all]) => {
        if (cancelled) return;
        setMeta(m);
        setRelated(all.filter((e) => e.room === roomKey));
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load room');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [roomKey]);

  const metaEntries = meta?.meta ? Object.entries(meta.meta) : [];
  const totalSaved = totalSavings(related);

  const goEstimate = (e: EstimateRow) => {
    Haptics.selectionAsync().catch(() => {});
    router.push(`/estimates/${e.id}` as any);
  };

  const newEstimate = () => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/your-house');
  };

  return (
    <NoirScreen>
      <NoirHeader brand={`ROOM · ${roomLabel.toUpperCase()}`} showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>BLUEPRINT · ROOM</DocRef>
        <Text allowFontScaling={false} style={styles.title}>{roomLabel.toUpperCase()}</Text>
        <Text allowFontScaling={false} style={styles.body}>{roomTagline}</Text>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <NoirCard variant="outlined" radius="md" padding={18} style={{ marginTop: spacing.xl }}>
            <DocRef tone="danger">ERROR</DocRef>
            <Text allowFontScaling={false} style={styles.emptyTitle}>Could not load room</Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>{error}</Text>
          </NoirCard>
        ) : (
          <>
            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <DocRef tone="cyan">ESTIMATES</DocRef>
                <Text allowFontScaling={false} style={styles.statNumber}>{related.length}</Text>
              </View>
              <View style={styles.statBox}>
                <DocRef tone="mint">SAVED VS PRO</DocRef>
                <Text allowFontScaling={false} style={styles.statNumber}>{`$${totalSaved}`}</Text>
              </View>
              <View style={styles.statBox}>
                <DocRef tone="amber">FIELDS</DocRef>
                <Text allowFontScaling={false} style={styles.statNumber}>{metaEntries.length}</Text>
              </View>
            </View>

            {/* Metadata */}
            <Label tone="tertiary" size="micro" style={styles.section}>Metadata</Label>
            {metaEntries.length === 0 ? (
              <NoirCard variant="outlined" radius="md" padding={18}>
                <Text allowFontScaling={false} style={styles.emptyTitle}>No metadata yet</Text>
                <Text allowFontScaling={false} style={styles.emptyMeta}>
                  Add notes about this room — brands, models, shutoff locations.
                </Text>
              </NoirCard>
            ) : (
              <View style={{ gap: spacing.sm }}>
                {metaEntries.map(([k, v], i) => (
                  <NoirCard key={`${k}-${i}`} variant="default" radius="md" padding={16}>
                    <DocRef>{`FIELD · ${String(i + 1).padStart(2, '0')}`}</DocRef>
                    <View style={styles.fieldRow}>
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={styles.fieldLabel}>{k}</Text>
                        <Text allowFontScaling={false} style={styles.fieldValue}>{v}</Text>
                      </View>
                    </View>
                  </NoirCard>
                ))}
              </View>
            )}

            {/* Related estimates */}
            <Label tone="tertiary" size="micro" style={styles.section}>Estimates in this room</Label>
            {related.length === 0 ? (
              <NoirCard variant="outlined" radius="md" padding={18}>
                <Text allowFontScaling={false} style={styles.emptyTitle}>No estimates yet</Text>
                <Text allowFontScaling={false} style={styles.emptyMeta}>
                  Snap a photo of anything here and FixIt will start the timeline.
                </Text>
              </NoirCard>
            ) : (
              <View style={{ gap: spacing.sm }}>
                {related.map((e) => {
                  const price =
                    e.chosen_mode === 'diy'
                      ? Number(e.diy_price)
                      : e.chosen_mode === 'hybrid'
                      ? Number(e.hybrid_price)
                      : Number(e.pro_price);
                  return (
                    <Pressable
                      key={e.id}
                      onPress={() => goEstimate(e)}
                      accessibilityRole="button"
                      accessibilityLabel={`${e.title} · ${formatCapturedAt(e.captured_at)}`}
                      hitSlop={4}
                    >
                      {({ pressed }) => (
                        <NoirCard
                          variant="default"
                          radius="md"
                          padding={14}
                          style={[
                            { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
                            pressed ? { opacity: 0.7 } : null,
                          ]}
                        >
                          <View style={{ flex: 1 }}>
                            <DocRef tone={e.severity === 'moderate' ? 'amber' : 'neutral'}>{e.code}</DocRef>
                            <Text allowFontScaling={false} style={styles.relTitle}>{e.title}</Text>
                            <Text allowFontScaling={false} style={styles.relMeta}>
                              {`${formatCapturedAt(e.captured_at)} · $${price}`}
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

            <View style={{ height: spacing.xxxl }} />
            <AmberCTA
              label={`New estimate in ${roomLabel}`}
              variant="primary"
              size="lg"
              onPress={newEstimate}
            />
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
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 40,
    color: colors.text,
    letterSpacing: 1.4,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  loadingWrap: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  statsRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    padding: 14,
    backgroundColor: colors.glass1,
  },
  statNumber: {
    marginTop: 4,
    fontFamily: fonts.displayBold,
    fontSize: 28,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  fieldRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  fieldValue: {
    marginTop: 2,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  relTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  relMeta: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textSecondary,
    letterSpacing: tracking.docRef,
  },
  emptyTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.textSecondary,
  },
  emptyMeta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
  },
});
