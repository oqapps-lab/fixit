import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { SeverityChip } from '@/components/ui/SeverityChip';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { MOCK_ESTIMATES, formatCapturedAt, type ChosenMode } from '@/mock/estimates';

type Selections = Record<string, ChosenMode>;

export default function EstimateCompare() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { ids } = useLocalSearchParams<{ ids: string }>();

  const estimates = useMemo(() => {
    const wanted = (ids ?? '').split(',').filter(Boolean);
    const list = wanted
      .map((id) => MOCK_ESTIMATES.find((e) => e.id === id))
      .filter(Boolean) as typeof MOCK_ESTIMATES;
    // fallback — pick first 2 if nothing selected (dev convenience)
    return list.length >= 2 ? list : MOCK_ESTIMATES.slice(0, 2);
  }, [ids]);

  const [picks, setPicks] = useState<Selections>(() =>
    estimates.reduce((acc, e) => ({ ...acc, [e.id]: e.chosenMode ?? 'hybrid' }), {} as Selections),
  );

  const pick = (id: string, mode: ChosenMode) => {
    Haptics.selectionAsync().catch(() => {});
    setPicks((s) => ({ ...s, [id]: mode }));
  };

  const priceFor = (id: string) => {
    const e = estimates.find((x) => x.id === id)!;
    const m = picks[id] ?? 'hybrid';
    return m === 'diy' ? e.diyPrice : m === 'hybrid' ? e.hybridPrice : e.proPrice;
  };

  const totalPicked = estimates.reduce((acc, e) => acc + priceFor(e.id), 0);
  const totalDiy    = estimates.reduce((acc, e) => acc + e.diyPrice, 0);
  const totalPro    = estimates.reduce((acc, e) => acc + e.proPrice, 0);
  const saved       = totalPro - totalPicked;

  const shareCompare = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    router.push('/paywall/pdf');
  };

  return (
    <NoirScreen>
      <NoirHeader brand="ESTIMATE · COMPARE" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>STACK · {estimates.length} ESTIMATES</DocRef>
        <Text allowFontScaling={false} style={styles.title}>TOTALS{'\n'}AT A GLANCE</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Pick a route per row. Totals update live so you can plan the whole project.
        </Text>

        {/* Totals hero */}
        <NoirCard variant="elevated" radius="lg" padding={22} style={{ marginTop: spacing.xl }}>
          <DocRef tone="amber">PROJECT TOTAL · YOUR PICKS</DocRef>
          <HeroNumber value={`$${totalPicked.toLocaleString()}`} size="lg" tone="amber" style={{ marginTop: spacing.xs }} />
          <View style={styles.totalsFoot}>
            <View style={styles.totalsCol}>
              <Text allowFontScaling={false} style={styles.totalsMeta}>IF ALL DIY</Text>
              <Text allowFontScaling={false} style={styles.totalsFigure}>{`$${totalDiy}`}</Text>
            </View>
            <View style={[styles.totalsCol, { borderLeftWidth: 1, borderLeftColor: colors.hairlineStrong, paddingLeft: spacing.md }]}>
              <Text allowFontScaling={false} style={styles.totalsMeta}>IF ALL PRO</Text>
              <Text allowFontScaling={false} style={styles.totalsFigure}>{`$${totalPro}`}</Text>
            </View>
            <View style={[styles.totalsCol, { borderLeftWidth: 1, borderLeftColor: colors.hairlineStrong, paddingLeft: spacing.md }]}>
              <Text allowFontScaling={false} style={[styles.totalsMeta, { color: colors.mint }]}>YOU SAVE</Text>
              <Text allowFontScaling={false} style={[styles.totalsFigure, { color: colors.mint }]}>
                {`$${Math.max(0, saved)}`}
              </Text>
            </View>
          </View>
        </NoirCard>

        {/* Per-estimate rows */}
        <Label tone="tertiary" size="micro" style={styles.section}>Row-by-row</Label>
        <View style={{ gap: spacing.md }}>
          {estimates.map((e) => (
            <NoirCard key={e.id} variant="default" radius="md" padding={18}>
              <View style={styles.rowHeader}>
                <View style={{ flex: 1 }}>
                  <DocRef tone={e.severity === 'moderate' ? 'amber' : 'neutral'}>{e.code}</DocRef>
                  <Text allowFontScaling={false} style={styles.rowTitle}>{e.title}</Text>
                  <Text allowFontScaling={false} style={styles.rowMeta}>
                    {`${formatCapturedAt(e.capturedAt)} · ${e.room.toUpperCase()}`}
                  </Text>
                </View>
                <SeverityChip level={e.severity} />
              </View>

              <View style={styles.modeGrid}>
                <ModeCell
                  label="DIY"
                  price={e.diyPrice}
                  active={picks[e.id] === 'diy'}
                  onPress={() => pick(e.id, 'diy')}
                />
                <ModeCell
                  label="Hybrid"
                  price={e.hybridPrice}
                  active={picks[e.id] === 'hybrid'}
                  onPress={() => pick(e.id, 'hybrid')}
                />
                <ModeCell
                  label="Pro"
                  price={e.proPrice}
                  active={picks[e.id] === 'pro'}
                  onPress={() => pick(e.id, 'pro')}
                />
              </View>

              <View style={styles.rowFooter}>
                <Text allowFontScaling={false} style={styles.footerLabel}>Picked</Text>
                <Text allowFontScaling={false} style={styles.footerValue}>
                  {`$${priceFor(e.id)}`}
                </Text>
              </View>
            </NoirCard>
          ))}
        </View>

        <Label tone="tertiary" size="micro" style={styles.section}>Export</Label>
        <AmberCTA
          label="Share comparison (PDF)"
          variant="primary"
          size="lg"
          onPress={shareCompare}
        />
        <Text allowFontScaling={false} style={styles.disclaimer}>
          Totals are indicative · actual paid within ±25% · FixIt AI
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

function ModeCell({
  label, price, active, onPress,
}: {
  label: string;
  price: number;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${label} $${price}`}
      hitSlop={4}
      style={{ flex: 1 }}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.modeCell,
            active ? styles.modeCellActive : null,
            pressed ? { opacity: 0.7 } : null,
          ]}
        >
          <Text allowFontScaling={false} style={[styles.modeLabel, active ? { color: colors.amber } : null]}>
            {label}
          </Text>
          <Text allowFontScaling={false} style={[styles.modePrice, active ? { color: colors.amber } : null]}>
            {`$${price}`}
          </Text>
        </View>
      )}
    </Pressable>
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
    fontSize: 34,
    color: colors.text,
    letterSpacing: 1.2,
    lineHeight: 38,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  totalsFoot: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalsCol: {
    flex: 1,
  },
  totalsMeta: {
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  totalsFigure: {
    marginTop: 4,
    fontFamily: fonts.displayBold,
    fontSize: typeScale.titleMedium,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  rowTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  rowMeta: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textSecondary,
    letterSpacing: tracking.docRef,
  },
  modeGrid: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modeCell: {
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    backgroundColor: colors.glass1,
  },
  modeCellActive: {
    borderColor: colors.amber,
    backgroundColor: colors.amberGlow,
  },
  modeLabel: {
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelSmall,
    color: colors.textSecondary,
    letterSpacing: tracking.labelWide,
  },
  modePrice: {
    marginTop: 4,
    fontFamily: fonts.displayBold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  rowFooter: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.hairlineStrong,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  footerValue: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.titleSmall,
    color: colors.amber,
    letterSpacing: tracking.tight,
  },
  disclaimer: {
    marginTop: spacing.xxl,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
});
