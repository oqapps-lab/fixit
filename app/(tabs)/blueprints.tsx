import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { BlueprintRoofScene, ChevronRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listEstimates } from '@/services/estimates';
import type { EstimateRow } from '@/types/database';

export default function BlueprintsTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const e = await listEstimates();
        if (cancelled) return;
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

  const BLUEPRINTS = estimates.map((e) => ({
    id: e.id,
    title: e.title,
    code: `REF: ${e.code} · ${String(e.room).toUpperCase()}`,
    href: `/repair/${e.id}` as const,
  }));

  return (
    <NoirScreen>
      <NoirHeader brand="OBSIDIAN ARCH" showMenu />

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
        <DocRef>MAINTENANCE LIBRARY</DocRef>
        <Text allowFontScaling={false} style={styles.title}>
          BLUEPRINTS
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

        <NoirCard variant="blueprint" radius="lg" padding={28} style={styles.hero}>
          <BlueprintRoofScene size={260} />
          <DocRef tone="cyan" align="center" style={{ marginTop: spacing.sm }}>X: 42.1 · Y: -18.4</DocRef>
          <Text allowFontScaling={false} style={styles.heroLine1}>SPRING · THE</Text>
          <Text allowFontScaling={false} style={styles.heroLine2}>Tune-Up</Text>
          <Text allowFontScaling={false} style={styles.heroSub}>
            three small things keep summer cheap
          </Text>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          {`Plans · ${BLUEPRINTS.length}`}
        </Label>

        {loading ? (
          <View style={{ marginTop: spacing.lg, alignItems: 'center' }}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : BLUEPRINTS.length === 0 ? (
          <Pressable
            onPress={() => router.push('/your-house')}
            accessibilityRole="button"
            accessibilityLabel="Snap a photo to begin"
            style={{ marginTop: spacing.md }}
          >
            <NoirCard variant="outlined" radius="md" padding={16}>
              <Text allowFontScaling={false} style={styles.emptyText}>
                No estimates yet · snap a photo to begin
              </Text>
            </NoirCard>
          </Pressable>
        ) : (
          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            {BLUEPRINTS.map((b) => (
              <Pressable
                key={b.id}
                onPress={() => router.push(b.href)}
                accessibilityRole="button"
                accessibilityLabel={b.title}
              >
                <NoirCard variant="default" radius="md" padding={16}>
                  <View style={styles.row}>
                    <View style={styles.markerDot} />
                    <View style={{ flex: 1 }}>
                      <DocRef>{b.code}</DocRef>
                      <Text allowFontScaling={false} style={styles.itemTitle}>{b.title}</Text>
                    </View>
                    <ChevronRightGlyph size={14} color={colors.textTertiary} />
                  </View>
                </NoirCard>
              </Pressable>
            ))}
          </View>
        )}
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
  hero: { marginTop: spacing.xl, alignItems: 'center' },
  heroLine1: {
    marginTop: spacing.lg,
    fontFamily: fonts.displayExtraBold,
    fontSize: 26,
    color: colors.text,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  heroLine2: {
    fontFamily: fonts.heroItalic,
    fontSize: 34,
    color: colors.amber,
    letterSpacing: tracking.heroItalic,
    textAlign: 'center',
  },
  heroSub: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  markerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  itemTitle: {
    marginTop: 2,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
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
});
