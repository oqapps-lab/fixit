import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { BookmarkGlyph, ChevronRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listSavedEstimates, setEstimateSaved, formatCapturedAt } from '@/services/estimates';
import type { EstimateRow } from '@/types/database';

// mock tier — real value from Adapty in Stage 07
const TIER: 'free' | 'pro' = 'free';
const FREE_SAVE_LIMIT = 5;

export default function SavedProjects() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [list, setList] = useState<EstimateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listSavedEstimates()
      .then((rows) => {
        if (cancelled) return;
        setList(rows);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load saved projects');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const remaining = Math.max(0, FREE_SAVE_LIMIT - list.length);
  const nearLimit = TIER === 'free' && remaining <= 2;

  const unsave = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setList((prev) => prev.filter((e) => e.id !== id));
    setEstimateSaved(id, false).catch(() => {});
  };

  const openEstimate = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    router.push(`/estimates/${id}` as any);
  };

  const upgrade = () => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/paywall/save');
  };

  if (loading) {
    return (
      <NoirScreen>
        <NoirHeader brand="VAULT · SAVED" showBack showAvatar={false} />
        <View style={styles.center}>
          <ActivityIndicator color={colors.amber} />
        </View>
      </NoirScreen>
    );
  }

  if (error) {
    return (
      <NoirScreen>
        <NoirHeader brand="VAULT · SAVED" showBack showAvatar={false} />
        <View style={styles.center}>
          <Text allowFontScaling={false} style={styles.errorText}>{error}</Text>
        </View>
      </NoirScreen>
    );
  }

  return (
    <NoirScreen>
      <NoirHeader brand="VAULT · SAVED" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>PINNED · IMPORTANT</DocRef>
        <Text allowFontScaling={false} style={styles.title}>SAVED{'\n'}PROJECTS</Text>
        <Text allowFontScaling={false} style={styles.body}>
          {TIER === 'free'
            ? `${list.length} saved · ${remaining} free slot${remaining === 1 ? '' : 's'} left`
            : `${list.length} saved · unlimited on Pro`}
        </Text>

        {/* Upgrade nudge */}
        {nearLimit ? (
          <Pressable
            onPress={upgrade}
            accessibilityRole="button"
            accessibilityLabel="Upgrade to Pro for unlimited saves"
            hitSlop={4}
          >
            {({ pressed }) => (
              <NoirCard
                variant="elevated"
                radius="md"
                padding={18}
                style={[styles.banner, pressed ? { opacity: 0.7 } : null]}
              >
                <BookmarkGlyph size={32} color={colors.amber} />
                <View style={{ flex: 1 }}>
                  <DocRef tone="amber">PRO · UNLIMITED SAVES</DocRef>
                  <Text allowFontScaling={false} style={styles.bannerTitle}>
                    {remaining === 0 ? 'You’re at the free limit' : `${remaining} saves left on free`}
                  </Text>
                  <Text allowFontScaling={false} style={styles.bannerMeta}>
                    Pro keeps every project organised — including warranty + PDF export.
                  </Text>
                </View>
                <ChevronRightGlyph size={14} color={colors.amber} />
              </NoirCard>
            )}
          </Pressable>
        ) : null}

        {/* List */}
        <Label tone="tertiary" size="micro" style={styles.section}>Pinned</Label>

        {list.length === 0 ? (
          <NoirCard variant="outlined" radius="md" padding={22}>
            <DocRef tone="cyan">EMPTY</DocRef>
            <Text allowFontScaling={false} style={styles.emptyTitle}>No saved projects yet</Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>
              Long-press any estimate to save it here for quick access + warranty tracking.
            </Text>
            <View style={{ height: spacing.md }} />
            <AmberCTA
              label="Browse estimates"
              variant="outlined"
              size="md"
              onPress={() => router.push('/estimates' as any)}
            />
          </NoirCard>
        ) : (
          <View style={{ gap: spacing.sm }}>
            {list.map((e) => {
              const price =
                e.chosen_mode === 'diy' ? Number(e.diy_price) :
                e.chosen_mode === 'hybrid' ? Number(e.hybrid_price) :
                e.chosen_mode === 'pro' ? Number(e.pro_price) :
                Number(e.pro_price);
              return (
                <Pressable
                  key={e.id}
                  onPress={() => openEstimate(e.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${e.title} — open`}
                  hitSlop={4}
                >
                  {({ pressed }) => (
                    <NoirCard
                      variant="default"
                      radius="md"
                      padding={16}
                      style={[
                        styles.row,
                        pressed ? { opacity: 0.7 } : null,
                      ]}
                    >
                      <Pressable
                        onPress={() => unsave(e.id)}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Unsave"
                      >
                        <BookmarkGlyph size={24} color={colors.amber} />
                      </Pressable>
                      <View style={{ flex: 1 }}>
                        <DocRef tone={e.severity === 'moderate' ? 'amber' : 'neutral'}>{e.code}</DocRef>
                        <Text allowFontScaling={false} style={styles.itemTitle}>{e.title}</Text>
                        <View style={styles.metaRow}>
                          <SeverityChip level={e.severity} />
                          <Text allowFontScaling={false} style={styles.metaText}>
                            {formatCapturedAt(e.captured_at)}
                          </Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text allowFontScaling={false} style={styles.price}>{`$${price}`}</Text>
                      </View>
                      <ChevronRightGlyph size={14} color={colors.textTertiary} />
                    </NoirCard>
                  )}
                </Pressable>
              );
            })}
          </View>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 40,
    color: colors.text,
    letterSpacing: 1.2,
    lineHeight: 42,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
  banner: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderColor: colors.hairlineAmber,
  },
  bannerTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  bannerMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
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
  itemTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
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
  price: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  emptyTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  emptyMeta: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
