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
import { ArrowUpRightGlyph, RescanGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
const CATEGORIES = [
    { label: 'ROOF', status: 'urgent' },
    { label: 'WALLS', status: 'fair' },
    { label: 'PLUMBING', status: 'calm' },
    { label: 'ELECTRICAL', status: 'calm' },
    { label: 'APPLIANCES', status: 'watch' },
];
const STATUS_TONE = {
    calm: { color: colors.mint, label: 'CALM' },
    watch: { color: colors.amber, label: 'WATCH' },
    fair: { color: colors.cyan, label: 'FAIR' },
    urgent: { color: colors.danger, label: 'URGENT' },
};
export default function HomeTab() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (<NoirScreen>
      <NoirHeader brand="FIXIT NOIR" showMenu/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            {
                paddingTop: spacing.md,
                paddingBottom: insets.bottom + 160,
            },
        ]} showsVerticalScrollIndicator={false}>
        <DocRef>PRIMARY RESIDENCE</DocRef>
        <Text allowFontScaling={false} style={styles.displayTitle}>
          HOME HEALTH{'\n'}DASHBOARD
        </Text>

        {/* Health Ring card */}
        <NoirCard variant="elevated" radius="lg" padding={26} style={styles.ringCard}>
          <View style={styles.ringWrap}>
            <RingChart size={200} value={87} tone="cyan" segments={0} strokeWidth={3}/>
            <View style={styles.ringCenter}>
              <HeroNumber value="87" size="xl" tone="white" align="center"/>
              <View style={{ height: 4 }}/>
              <Label tone="tertiary" size="micro" align="center">Home Health · Fair</Label>
            </View>
          </View>

          {/* Category legend — two-column grid, right below the ring */}
          <View style={styles.legend}>
            {CATEGORIES.map((c) => {
            const t = STATUS_TONE[c.status];
            return (<View key={c.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: t.color }]}/>
                  <Text allowFontScaling={false} style={styles.legendLabel}>
                    {c.label}
                  </Text>
                  <Text allowFontScaling={false} style={[styles.legendStatus, { color: t.color }]}>
                    {t.label}
                  </Text>
                </View>);
        })}
          </View>

          <View style={styles.scanRow}>
            <DocRef>Last Scan · 08:42 AM · Today</DocRef>
            <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Rescan home health">
              <View style={styles.scanRight}>
                <RescanGlyph size={12} color={colors.cyan}/>
                <Text allowFontScaling={false} style={styles.rescanText}>RESCAN</Text>
              </View>
            </Pressable>
          </View>
        </NoirCard>

        {/* Alert card */}
        <Pressable onPress={() => router.push('/repair/rp-002')} accessibilityRole="button" accessibilityLabel="Roof inspection recommended" style={{ marginTop: spacing.lg }}>
          <NoirCard variant="default" radius="md" padding={20} style={styles.alertCard}>
            <View style={styles.alertBar}/>
            <View style={{ flex: 1 }}>
              <View style={styles.alertHeader}>
                <SeverityChip level="moderate" label="▲"/>
                <Text allowFontScaling={false} style={styles.alertTitle}>
                  Roof Inspection Recommended
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.alertBody}>
                Minor moisture detected in upper attic quadrant C. Schedule an assessment to prevent structural degradation.
              </Text>
              <View style={styles.alertCta}>
                <Text allowFontScaling={false} style={styles.alertCtaText}>VIEW DETAILS</Text>
                <ArrowUpRightGlyph size={12} color={colors.amber}/>
              </View>
            </View>
          </NoirCard>
        </Pressable>

        {/* Stat pair */}
        <View style={styles.statsRow}>
          <NoirCard variant="default" radius="md" padding={18} style={styles.statCard}>
            <DocRef>HVAC Efficiency</DocRef>
            <HeroNumber value="94" suffix="%" size="md" tone="white" style={{ marginTop: 8 }}/>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={18} style={styles.statCard}>
            <DocRef>Water Pressure</DocRef>
            <HeroNumber value="62" suffix="PSI" size="md" tone="white" style={{ marginTop: 8 }}/>
          </NoirCard>
        </View>
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: spacing.xl,
    },
    displayTitle: {
        marginTop: spacing.sm,
        fontFamily: fonts.displayNarrowBold,
        fontSize: 32,
        color: colors.text,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        lineHeight: 36,
    },
    ringCard: {
        marginTop: spacing.xl,
    },
    ringWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        alignSelf: 'center',
        position: 'relative',
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
    legend: {
        marginTop: spacing.xl,
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.hairline,
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: spacing.sm,
    },
    legendItem: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: spacing.sm,
    },
    legendDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 8,
    },
    legendLabel: {
        flex: 1,
        fontFamily: fonts.labelSemibold,
        fontSize: 10,
        color: colors.text,
        letterSpacing: 1.2,
    },
    legendStatus: {
        fontFamily: fonts.mono,
        fontSize: 9,
        letterSpacing: tracking.docRef,
    },
    scanRow: {
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.hairline,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scanRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    rescanText: {
        fontFamily: fonts.labelSemibold,
        color: colors.cyan,
        fontSize: typeScale.labelMicro,
        letterSpacing: tracking.labelWide,
    },
    alertCard: {
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
