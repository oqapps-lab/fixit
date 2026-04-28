import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { WarmHouse } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listEstimates, totalSavings } from '@/services/estimates';
import type { EstimateRow } from '@/types/database';

function formatShortMoney(n: number): string {
  const v = Math.round(n);
  if (v >= 1000) return `$${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k`;
  return `$${v.toLocaleString('en-US')}`;
}

export default function HomeOverview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await listEstimates();
        if (alive) {
          setEstimates(rows);
          setError(null);
        }
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Failed to load estimates');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const saved = totalSavings(estimates);
  const completed = estimates.filter((e) => e.status === 'completed');
  const activities = completed.slice(0, 3);
  const fixesCount = completed.length;

  return (
    <NoirScreen>
      <NoirHeader brand="# HOME_CODE" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SerifHero size={38} align="center" style={{ marginTop: spacing.md }}>
          Your home
        </SerifHero>

        <View style={styles.houseWrap}>
          <WarmHouse size={200} />
        </View>

        <View style={styles.stats}>
          <NoirCard variant="elevated" radius="md" padding={16} style={styles.statCard}>
            <DocRef>SAVED</DocRef>
            <HeroNumber
              value={loading ? '—' : formatShortMoney(saved)}
              size="sm"
              tone="amber"
              style={{ marginTop: 4 }}
            />
          </NoirCard>
          <NoirCard variant="elevated" radius="md" padding={16} style={styles.statCard}>
            <DocRef>HEALTH</DocRef>
            <HeroNumber value="87" size="sm" tone="white" style={{ marginTop: 4 }} />
          </NoirCard>
          <NoirCard variant="elevated" radius="md" padding={16} style={styles.statCard}>
            <DocRef>FIXES</DocRef>
            <HeroNumber
              value={loading ? '—' : String(fixesCount)}
              size="sm"
              tone="mint"
              style={{ marginTop: 4 }}
            />
          </NoirCard>
        </View>

        <View style={styles.graphHeader}>
          <Label tone="tertiary" size="micro">Recovery Calendar</Label>
          <DocRef tone="cyan">APR · 7-DAY VIEW</DocRef>
        </View>

        <NoirCard variant="default" radius="md" padding={20} style={{ marginTop: spacing.sm }}>
          <Svg width="100%" height={90} viewBox="0 0 280 90" preserveAspectRatio="none">
            <Polyline
              points="0,60 40,55 70,48 110,52 150,40 190,30 220,36 260,24 280,22"
              stroke={colors.mint}
              strokeWidth={1.6}
              fill="none"
            />
            <Polyline
              points="0,60 40,55 70,48 110,52 150,40 190,30 220,36 260,24 280,22 280,90 0,90"
              fill="rgba(107,222,154,0.08)"
              stroke="none"
            />
          </Svg>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Recent Activity
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {loading ? (
            <ActivityIndicator color={colors.amber} />
          ) : error ? (
            <NoirCard variant="outlined" radius="md" padding={14} style={styles.errorBanner}>
              <Text allowFontScaling={false} style={styles.errorTitle}>Couldn’t load activity</Text>
              <Text allowFontScaling={false} style={styles.errorMeta}>{error}</Text>
            </NoirCard>
          ) : (
            activities.map((a) => {
              const price = Number(a.actual_paid ?? a.diy_price);
              return (
                <NoirCard key={a.id} variant="outlined" radius="md" padding={14}>
                  <View style={styles.actRow}>
                    <Text allowFontScaling={false} style={styles.actTitle}>{a.title}</Text>
                    <Text allowFontScaling={false} style={styles.actPrice}>
                      {`$${price.toFixed(2)}`}
                    </Text>
                  </View>
                </NoirCard>
              );
            })
          )}
        </View>

        <AmberCTA
          label="+ New Fix"
          variant="primary"
          onPress={() => router.push('/(onboarding)/welcome' as any)}
          fullWidth={false}
          style={{ alignSelf: 'flex-end', marginTop: spacing.xl }}
        />
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  houseWrap: { alignItems: 'center', marginTop: spacing.lg },
  stats: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: { flex: 1 },
  graphHeader: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actTitle: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
  actPrice: {
    fontFamily: fonts.mono,
    fontSize: typeScale.bodyMedium,
    color: colors.text,
    letterSpacing: tracking.docRef,
  },
  errorBanner: {
    borderColor: colors.hairlineDanger,
  },
  errorTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.danger,
  },
  errorMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
});
