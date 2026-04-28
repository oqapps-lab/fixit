import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { SeverityChip } from '@/components/ui/SeverityChip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ToolChipRow } from '@/components/ui/ToolChip';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { getRepair } from '@/services/repairs';
import type { RepairRow } from '@/types/database';

export default function RepairDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [r, setR] = useState<RepairRow | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Missing repair id');
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getRepair(id)
      .then((row) => {
        if (cancelled) return;
        setR(row);
      })
      .catch((e) => {
        if (cancelled) return;
        const raw = e?.message ?? '';
        // Postgres rejects non-UUID strings with this message — surface a
        // clean "not found" instead of leaking internals.
        if (raw.includes('invalid input syntax for type uuid')) {
          setR(null);
          setError(null);
        } else {
          setError(raw || 'Failed to load repair');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <NoirScreen>
      <NoirHeader brand="FIXIT NOIR" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.sm,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <NoirCard variant="outlined" radius="md" padding={22} style={{ marginTop: spacing.xl }}>
            <DocRef tone="danger">ERROR</DocRef>
            <Text allowFontScaling={false} style={styles.notFoundTitle}>Could not load</Text>
            <Text allowFontScaling={false} style={styles.notFoundMeta}>{error}</Text>
          </NoirCard>
        ) : !r ? (
          <NoirCard variant="outlined" radius="md" padding={22} style={{ marginTop: spacing.xl }}>
            <DocRef tone="amber">NOT FOUND</DocRef>
            <Text allowFontScaling={false} style={styles.notFoundTitle}>Repair not found</Text>
            <Text allowFontScaling={false} style={styles.notFoundMeta}>
              This repair may have been deleted or moved.
            </Text>
          </NoirCard>
        ) : (
          <>
            {/* Doc ref row */}
            <View style={styles.docRow}>
              <DocRef>{r.code}</DocRef>
              <View style={styles.dot} />
              <DocRef tone="amber">{(r.status ?? '').toUpperCase()}</DocRef>
              <View style={styles.dot} />
              <DocRef>BUILD: FP-052</DocRef>
            </View>

            <Text allowFontScaling={false} style={styles.title}>{r.title.toUpperCase()}</Text>
            {r.summary ? (
              <Text allowFontScaling={false} style={styles.summary}>{r.summary}</Text>
            ) : null}

            {/* Impact card */}
            {r.impact ? (
              <NoirCard variant="elevated" radius="lg" padding={24} style={styles.section}>
                <Label tone="tertiary" size="micro">Estimated Impact</Label>
                <HeroNumber value={r.impact} size="xl" tone="white" style={{ marginTop: spacing.md }} />
                {r.impact_description ? (
                  <Text allowFontScaling={false} style={styles.impactBody}>{r.impact_description}</Text>
                ) : null}
              </NoirCard>
            ) : null}

            {/* Severity + time row */}
            <View style={styles.metricsRow}>
              <NoirCard variant="default" radius="md" padding={18} style={styles.metricCol}>
                <Label tone="tertiary" size="micro">Severity</Label>
                <View style={{ marginTop: spacing.md }}>
                  <SeverityChip level={r.severity} />
                </View>
              </NoirCard>
              <NoirCard variant="default" radius="md" padding={18} style={styles.metricCol}>
                <Label tone="tertiary" size="micro">Est. Time</Label>
                <View style={styles.timeRow}>
                  <HeroNumber value={r.time_estimate ?? '—'} size="md" tone="white" />
                  <Text allowFontScaling={false} style={styles.timeUnit}>
                    {(r.time_unit ?? '').toUpperCase()}
                  </Text>
                </View>
              </NoirCard>
            </View>

            {/* Progress */}
            <NoirCard variant="default" radius="md" padding={20} style={styles.section}>
              <Label tone="tertiary" size="micro">Repair Progress</Label>
              <View style={{ marginTop: spacing.md }}>
                <ProgressBar value={r.progress} tone="amber" />
              </View>
              {r.stage_label ? (
                <Text allowFontScaling={false} style={styles.progressLabel}>
                  {r.stage_label}
                </Text>
              ) : null}
            </NoirCard>

            {/* Tools */}
            {r.tools && r.tools.length > 0 ? (
              <View style={styles.section}>
                <Label tone="tertiary" size="micro">Required Tools / Materials</Label>
                <View style={{ marginTop: spacing.md }}>
                  <ToolChipRow labels={r.tools} />
                </View>
              </View>
            ) : null}

            {/* CTAs */}
            <View style={styles.ctaRow}>
              <View style={{ flex: 1 }}>
                <AmberCTA
                  label="DIY Guide"
                  variant="glass"
                  size="lg"
                  onPress={() => router.push(`/repair-step?id=${r.id}&n=2`)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <AmberCTA
                  label="Find Pro"
                  variant="primary"
                  size="lg"
                  onPress={() => router.push('/find-a-pro')}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  loadingWrap: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  notFoundTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  notFoundMeta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md,
    flexWrap: 'wrap',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textTertiary,
  },
  title: {
    marginTop: spacing.md,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 46,
    color: colors.text,
    letterSpacing: 1.4,
  },
  summary: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: { marginTop: spacing.xxl },
  impactBody: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
    lineHeight: 18,
  },
  metricsRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricCol: { flex: 1 },
  timeRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  timeUnit: {
    marginBottom: 8,
    fontFamily: fonts.labelSemibold,
    color: colors.textSecondary,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.labelWide,
  },
  progressLabel: {
    marginTop: spacing.sm,
    fontFamily: fonts.mono,
    fontSize: typeScale.labelMicro,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  ctaRow: {
    marginTop: spacing.huge,
    flexDirection: 'row',
    gap: spacing.md,
  },
});
