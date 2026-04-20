import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { RingChart } from '@/components/ui/RingChart';
import { SeverityChip } from '@/components/ui/SeverityChip';
import { ChevronRightGlyph, ArrowUpRightGlyph, RescanGlyph, PulseDot } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

const CATEGORIES = [
  { label: 'ROOF',       color: '#E8752A', tone: 'amber' as const, angle: -90 },
  { label: 'WALLS',      color: '#6E6E74', tone: 'neutral' as const, angle: -30 },
  { label: 'PLUMBING',   color: '#6BDE9A', tone: 'mint' as const, angle: 30 },
  { label: 'APPLIANCES', color: '#A8A8AD', tone: 'neutral' as const, angle: 90 },
  { label: 'ELECTRICAL', color: '#A8A8AD', tone: 'neutral' as const, angle: 150 },
];

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="FIXIT NOIR" showMenu />

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
        <DocRef>PRIMARY RESIDENCE</DocRef>
        <Text allowFontScaling={false} style={styles.displayTitle}>
          HOME HEALTH{'\n'}DASHBOARD
        </Text>

        {/* Health Ring card */}
        <NoirCard variant="elevated" radius="lg" padding={24} style={styles.ringCard}>
          <View style={styles.ringWrap}>
            <RingChart size={200} value={87} tone="cyan" segments={10} strokeWidth={3} />

            {/* center overlay */}
            <View style={styles.ringCenter}>
              <HeroNumber value="87" size="xl" tone="white" align="center" />
              <Label tone="tertiary" size="micro" align="center">Home Health · Fair</Label>
            </View>

            {/* category dots around the ring */}
            {CATEGORIES.map((cat) => {
              const rad = (cat.angle * Math.PI) / 180;
              const R = 115;
              const cx = 100 + R * Math.cos(rad);
              const cy = 100 + R * Math.sin(rad);
              return (
                <View
                  key={cat.label}
                  style={[
                    styles.dotLabel,
                    { left: cx - 50, top: cy - 10 },
                  ]}
                >
                  <View style={[styles.littleDot, { backgroundColor: cat.color }]} />
                  <Text allowFontScaling={false} style={styles.dotLabelText}>{cat.label}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.scanRow}>
            <DocRef>Last Scan · 08:42 AM · Today</DocRef>
            <View style={styles.scanRight}>
              <RescanGlyph size={12} color={colors.cyan} />
              <Text allowFontScaling={false} style={styles.rescanText}>RESCAN</Text>
            </View>
          </View>
        </NoirCard>

        {/* Alert card */}
        <Pressable
          onPress={() => router.push('/repair/rp-002')}
          accessibilityRole="button"
          accessibilityLabel="Roof inspection recommended"
        >
          <NoirCard variant="default" radius="md" padding={20} style={styles.alertCard}>
            <View style={styles.alertBar} />
            <View style={{ flex: 1 }}>
              <View style={styles.alertHeader}>
                <SeverityChip level="moderate" label="▲" />
                <Text allowFontScaling={false} style={styles.alertTitle}>
                  Roof Inspection Recommended
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.alertBody}>
                Minor moisture detected in upper attic quadrant C. Schedule an assessment to prevent structural degradation.
              </Text>
              <View style={styles.alertCta}>
                <Text allowFontScaling={false} style={styles.alertCtaText}>VIEW DETAILS</Text>
                <ArrowUpRightGlyph size={12} color={colors.amber} />
              </View>
            </View>
          </NoirCard>
        </Pressable>

        {/* Stat pair */}
        <View style={styles.statsRow}>
          <NoirCard variant="default" radius="md" padding={18} style={styles.statCard}>
            <DocRef>HVAC Efficiency</DocRef>
            <HeroNumber value="94" suffix="%" size="md" tone="white" style={{ marginTop: 6 }} />
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={18} style={styles.statCard}>
            <DocRef>Water Pressure</DocRef>
            <HeroNumber value="62" suffix="PSI" size="md" tone="white" style={{ marginTop: 6 }} />
          </NoirCard>
        </View>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
  },
  displayTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 28,
    color: colors.text,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    lineHeight: 32,
  },
  ringCard: {
    marginTop: spacing.xl,
    paddingVertical: 30,
  },
  ringWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotLabel: {
    position: 'absolute',
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
  },
  littleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotLabelText: {
    fontFamily: fonts.labelSemibold,
    fontSize: 8,
    color: colors.textSecondary,
    letterSpacing: 1.2,
  },
  scanRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  scanRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rescanText: {
    fontFamily: fonts.labelSemibold,
    color: colors.cyan,
    fontSize: typeScale.labelMicro,
    letterSpacing: tracking.labelWide,
  },
  alertCard: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertBar: {
    width: 3,
    backgroundColor: colors.amber,
    borderRadius: 1.5,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  alertTitle: {
    flex: 1,
    fontFamily: fonts.displaySemibold,
    color: colors.text,
    fontSize: typeScale.titleSmall,
    letterSpacing: tracking.tight,
  },
  alertBody: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  alertCta: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  alertCtaText: {
    fontFamily: fonts.labelSemibold,
    color: colors.amber,
    fontSize: typeScale.labelMicro,
    letterSpacing: tracking.labelWide,
  },
  statsRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
  },
});
