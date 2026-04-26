import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { BlueprintPhoto } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { getEstimate, setEstimateMode, formatCapturedAt } from '@/services/estimates';
import type { ChosenMode, EstimateRow } from '@/types/database';

export default function EstimateDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [estimate, setEstimate] = useState<EstimateRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<ChosenMode>('hybrid');
  const [pickError, setPickError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setLoading(false);
      setError('Missing estimate id');
      return;
    }
    setLoading(true);
    setError(null);
    getEstimate(id)
      .then((row) => {
        if (cancelled) return;
        setEstimate(row);
        if (row?.chosen_mode) setPicked(row.chosen_mode);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load estimate');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <NoirScreen>
        <NoirHeader brand="ESTIMATE · DETAIL" showBack showAvatar={false} />
        <View style={styles.center}>
          <ActivityIndicator color={colors.amber} />
        </View>
      </NoirScreen>
    );
  }

  if (error || !estimate) {
    return (
      <NoirScreen>
        <NoirHeader brand="ESTIMATE · DETAIL" showBack showAvatar={false} />
        <View style={styles.center}>
          <Text allowFontScaling={false} style={styles.errorText}>
            {error ?? 'Estimate not found.'}
          </Text>
        </View>
      </NoirScreen>
    );
  }

  const diyPrice = Number(estimate.diy_price);
  const hybridPrice = Number(estimate.hybrid_price);
  const proPrice = Number(estimate.pro_price);

  const pickedPrice =
    picked === 'diy' ? diyPrice :
    picked === 'hybrid' ? hybridPrice :
    proPrice;

  const savingsVsPro = proPrice - pickedPrice;

  const handlePick = (mode: ChosenMode) => {
    const prev = picked;
    setPicked(mode);
    setPickError(null);
    setEstimateMode(estimate.id, mode).catch(() => {
      setPicked(prev);
      setPickError("Couldn't save your pick. Try again.");
      setTimeout(() => setPickError(null), 3000);
    });
  };

  const onShare = () => {
    Haptics.selectionAsync().catch(() => {});
    Alert.alert('Share', `Share card for ${estimate.title}. Referral link pre-filled.`);
  };

  const onExportPdf = () => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/paywall/pdf');
  };

  const onMarkComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    Alert.alert('Mark Complete', 'Marking estimates complete will be available soon.');
  };

  return (
    <NoirScreen>
      <NoirHeader brand="ESTIMATE · DETAIL" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef tone={estimate.severity === 'moderate' ? 'amber' : 'neutral'}>
          {`${estimate.code} · ${formatCapturedAt(estimate.captured_at)}`}
        </DocRef>
        <Text allowFontScaling={false} style={styles.title} numberOfLines={3} ellipsizeMode="tail">{estimate.title}</Text>
        <Text allowFontScaling={false} style={styles.diagnosis} numberOfLines={6} ellipsizeMode="tail">{estimate.diagnosis}</Text>

        {/* Photo card */}
        <NoirCard variant="blueprint" radius="md" padding={16} style={{ marginTop: spacing.xl, alignItems: 'center' }}>
          <BlueprintPhoto size={160} />
          <View style={{ marginTop: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <DocRef tone="cyan">{`ROOM · ${estimate.room.toUpperCase()}`}</DocRef>
            <DocRef tone="cyan">{`CAT · ${estimate.category.toUpperCase()}`}</DocRef>
          </View>
        </NoirCard>

        {/* Headline impact */}
        <View style={styles.impactRow}>
          <View style={{ flex: 1 }}>
            <Label tone="tertiary" size="micro">Estimated impact</Label>
            <HeroNumber value={`$${proPrice}`} size="lg" tone="white" style={{ marginTop: spacing.xs }} />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Label tone="tertiary" size="micro">Severity</Label>
            <View style={{ marginTop: spacing.sm }}>
              <SeverityChip level={estimate.severity} />
            </View>
          </View>
        </View>

        {/* Mode breakdown */}
        <Label tone="tertiary" size="micro" style={styles.section}>Three routes</Label>
        <View style={{ gap: spacing.sm }}>
          <ModeRow
            mode="diy"
            label="DIY"
            meta="Materials only · AI guide"
            price={diyPrice}
            active={picked === 'diy'}
            onPress={() => handlePick('diy')}
          />
          <ModeRow
            mode="hybrid"
            label="Hybrid"
            meta="You buy, handyman installs"
            price={hybridPrice}
            active={picked === 'hybrid'}
            recommended
            onPress={() => handlePick('hybrid')}
          />
          <ModeRow
            mode="pro"
            label="Full Pro"
            meta="Deeplink · Thumbtack · Google · Yelp"
            price={proPrice}
            active={picked === 'pro'}
            onPress={() => handlePick('pro')}
          />
        </View>

        {pickError ? (
          <Text allowFontScaling={false} style={styles.pickErrorToast}>
            {pickError}
          </Text>
        ) : null}

        {/* Savings summary */}
        <NoirCard variant="elevated" radius="md" padding={18} style={{ marginTop: spacing.xl }}>
          <DocRef tone="mint">SAVINGS · VS BLIND PRO</DocRef>
          <View style={styles.savingsRow}>
            <HeroNumber value={`$${Math.max(0, savingsVsPro)}`} size="md" tone="mint" />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text allowFontScaling={false} style={styles.savingsHint}>
                {picked === 'pro'
                  ? 'You’re choosing Pro — FixIt still saved you the time of calling blind.'
                  : `Picking ${picked.toUpperCase()} instead of calling a pro blind.`}
              </Text>
            </View>
          </View>
        </NoirCard>

        {/* Actions */}
        <Label tone="tertiary" size="micro" style={styles.section}>Actions</Label>
        <AmberCTA
          label={estimate.actual_paid != null ? 'Re-estimate this issue' : 'Mark complete & log cost'}
          variant="primary"
          size="lg"
          onPress={onMarkComplete}
        />
        <View style={{ height: spacing.sm }} />
        <AmberCTA
          label="Share estimate"
          variant="outlined"
          size="md"
          onPress={onShare}
        />
        <View style={{ height: spacing.sm }} />
        <AmberCTA
          label="Export as PDF"
          variant="dark"
          size="md"
          onPress={onExportPdf}
        />

        <Text allowFontScaling={false} style={styles.disclaimer}>
          AI estimate · actual prices ±25% · updated {formatCapturedAt(estimate.captured_at)}
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

function ModeRow({
  mode, label, meta, price, active, recommended, onPress,
}: {
  mode: ChosenMode;
  label: string;
  meta: string;
  price: number;
  active: boolean;
  recommended?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${label} · $${price}${recommended ? ' · recommended' : ''}`}
      hitSlop={4}
    >
      <NoirCard
        variant={active ? 'elevated' : 'default'}
        radius="md"
        padding={16}
        style={[
          styles.modeRow,
          active ? styles.modeRowActive : null,
        ]}
      >
        <View style={[styles.modeDot, active ? styles.modeDotActive : null]} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <Text allowFontScaling={false} style={[styles.modeLabel, active ? { color: colors.amber } : null]}>
              {label}
            </Text>
            {recommended ? (
              <View style={styles.recBadge}>
                <Text allowFontScaling={false} style={styles.recBadgeText}>★ RECOMMENDED</Text>
              </View>
            ) : null}
          </View>
          <Text allowFontScaling={false} style={styles.modeMeta}>{meta}</Text>
        </View>
        <Text allowFontScaling={false} style={styles.modePrice}>{`$${price}`}</Text>
      </NoirCard>
    </Pressable>
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
    fontSize: 36,
    color: colors.text,
    letterSpacing: 1.2,
    lineHeight: 40,
  },
  diagnosis: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  impactRow: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  modeRowActive: {
    borderColor: colors.hairlineAmber,
  },
  modeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.2,
    borderColor: colors.hairlineStrong,
  },
  modeDotActive: {
    backgroundColor: colors.amber,
    borderColor: colors.amber,
  },
  modeLabel: {
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  modeMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  modePrice: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  recBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: colors.amberGlow,
  },
  recBadgeText: {
    fontFamily: fonts.labelSemibold,
    fontSize: 9,
    color: colors.amber,
    letterSpacing: tracking.labelWide,
  },
  savingsRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsHint: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  disclaimer: {
    marginTop: spacing.xxl,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
  pickErrorToast: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.danger,
    textAlign: 'center',
  },
});
