import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { HouseWireframe, PulseDot } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { getEstimateDraft, resetEstimateDraft } from '@/lib/estimate/draft';

const SEVERITY_LABEL = {
    low: 'LOW',
    moderate: 'MODERATE',
    high: 'HIGH',
};

const SEVERITY_TONE = {
    low: 'cyan',
    moderate: 'amber',
    high: 'danger',
};
export default function YourHouse() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const draft = getEstimateDraft();
    const analysis = draft.analysis;
    const severityKey = analysis?.severity === 'high' || analysis?.severity === 'low'
        ? analysis.severity
        : 'moderate';
    const confidencePct = Math.round((analysis?.confidence ?? 0) * 100);

    useEffect(() => {
        if (analysis === null) {
            router.replace('/(onboarding)/capture');
        }
    }, [analysis, router]);

    const onReviewFixes = () => {
        if (draft.requiresSubscription) {
            router.push('/paywall');
            return;
        }
        router.push('/fix-selection');
    };

    return (<NoirScreen>
      <NoirHeader brand="First Estimate" showBack/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            {
                paddingTop: spacing.lg,
                paddingBottom: insets.bottom + spacing.xxxl,
            },
        ]} showsVerticalScrollIndicator={false}>
        <DocRef>INITIAL SCAN · ANALYSIS COMPLETE</DocRef>
        <Text allowFontScaling={false} style={styles.title}>YOUR HOUSE</Text>

        <NoirCard variant="blueprint" radius="lg" padding={24} style={styles.scanCard}>
          <View style={styles.wireframeWrap}>
            <HouseWireframe size={260}/>

            {/* Tags */}
            <View style={[styles.tag, { top: '18%', right: '6%', backgroundColor: 'rgba(107,203,217,0.15)', borderColor: colors.cyan }]}>
              <Text style={[styles.tagText, { color: colors.cyan }]}>ROOF INTEGRITY</Text>
            </View>
            <View style={[styles.tag, { top: '58%', left: '10%', backgroundColor: 'rgba(255,169,92,0.15)', borderColor: colors.amber }]}>
              <Text style={[styles.tagText, { color: colors.amber }]}>MAIN LINE</Text>
            </View>

            {/* Pulse dots */}
            <View style={{ position: 'absolute', top: '24%', right: '18%' }}>
              <PulseDot size={8} color={colors.cyan}/>
            </View>
            <View style={{ position: 'absolute', top: '66%', left: '22%' }}>
              <PulseDot size={8} color={colors.amber}/>
            </View>
          </View>
        </NoirCard>

        <View style={styles.summaryRow}>
          <NoirCard variant="default" radius="md" padding={14} style={styles.summaryCard}>
            <DocRef tone={SEVERITY_TONE[severityKey]}>{SEVERITY_LABEL[severityKey]}</DocRef>
            <Text allowFontScaling={false} style={styles.summaryTitle}>{analysis?.issueCategory ?? 'Issue'}</Text>
            <Text allowFontScaling={false} style={styles.summaryMeta}>{analysis?.summary ?? 'No summary available.'}</Text>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={styles.summaryCard}>
            <DocRef tone="cyan">CONFIDENCE</DocRef>
            <Text allowFontScaling={false} style={styles.summaryTitle}>{`${confidencePct}%`}</Text>
            <Text allowFontScaling={false} style={styles.summaryMeta}>
              {(analysis?.priceGuidance?.[0] ?? 'Price guidance unavailable.')}
            </Text>
          </NoirCard>
        </View>

        <NoirCard variant="default" radius="md" padding={14} style={styles.sourcesCard}>
          <DocRef tone="cyan">TRUSTED PRICE SOURCES</DocRef>
          <View style={styles.sourcesList}>
            {(analysis?.trustedSourcesUsed ?? []).slice(0, 3).map((source) => (<Text key={source} allowFontScaling={false} style={styles.sourceText}>
                • {source}
              </Text>))}
          </View>
        </NoirCard>

        <AmberCTA label="Review fixes" variant="primary" onPress={onReviewFixes} style={{ marginTop: spacing.xxl }}/>
        <Pressable onPress={() => {
            resetEstimateDraft();
            router.replace('/(onboarding)/capture');
        }} style={styles.skip} accessibilityRole="button" accessibilityLabel="Scan again" hitSlop={8}>
          <Text allowFontScaling={false} style={styles.skipText}>Analyze another photo</Text>
        </Pressable>
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    scroll: { paddingHorizontal: spacing.xl },
    title: {
        marginTop: spacing.sm,
        fontFamily: fonts.displayNarrowBold,
        fontSize: 42,
        color: colors.text,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
    },
    scanCard: { marginTop: spacing.xl, alignItems: 'center' },
    wireframeWrap: {
        width: 260,
        height: 260,
        position: 'relative',
    },
    tag: {
        position: 'absolute',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 3,
    },
    tagText: {
        fontFamily: fonts.labelSemibold,
        fontSize: 9,
        letterSpacing: 1.2,
    },
    summaryRow: {
        marginTop: spacing.xl,
        flexDirection: 'row',
        gap: spacing.md,
    },
    sourcesCard: {
        marginTop: spacing.md,
    },
    sourcesList: {
        marginTop: spacing.sm,
        gap: 2,
    },
    sourceText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textSecondary,
        lineHeight: 17,
    },
    summaryCard: { flex: 1 },
    summaryTitle: {
        marginTop: 6,
        fontFamily: fonts.displaySemibold,
        fontSize: typeScale.bodyLarge,
        color: colors.text,
        letterSpacing: tracking.tight,
    },
    summaryMeta: {
        marginTop: 4,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textSecondary,
        lineHeight: 16,
    },
    skip: { alignSelf: 'center', marginTop: spacing.md, paddingVertical: spacing.sm },
    skipText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textTertiary,
    },
});
