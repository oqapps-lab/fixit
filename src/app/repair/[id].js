import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
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
import { getDefaultRepairTemplate, getRepairTemplateById, } from '@/lib/data/repair-content';
export default function RepairDetail() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const [repair, setRepair] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const loadRepair = async () => {
            try {
                const id = typeof params.id === 'string' ? params.id : undefined;
                const data = id !== undefined
                    ? await getRepairTemplateById(id)
                    : await getDefaultRepairTemplate();
                if (!isMounted) {
                    return;
                }
                if (data === null) {
                    setErrorMessage('Repair template not found.');
                }
                else {
                    setRepair(data);
                }
            }
            catch (error) {
                if (!isMounted) {
                    return;
                }
                const message = error instanceof Error ? error.message : 'Failed to load repair details.';
                setErrorMessage(message);
            }
            finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        loadRepair().catch(() => { });
        return () => {
            isMounted = false;
        };
    }, [params.id]);
    return (<NoirScreen>
      <NoirHeader brand="FIXIT NOIR" showBack/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            {
                paddingTop: spacing.sm,
                paddingBottom: insets.bottom + spacing.huge,
            },
        ]} showsVerticalScrollIndicator={false}>
        {isLoading ? (<View style={styles.stateWrap}>
            <ActivityIndicator color={colors.amber}/>
          </View>) : null}

        {!isLoading && errorMessage !== null ? (<Text allowFontScaling={false} style={styles.stateText}>{errorMessage}</Text>) : null}

        {!isLoading && errorMessage === null && repair !== null ? (<>
        {/* Doc ref row */}
        <View style={styles.docRow}>
          <DocRef>{repair.code}</DocRef>
          <View style={styles.dot}/>
          <DocRef tone="amber">{repair.status.toUpperCase()}</DocRef>
          <View style={styles.dot}/>
          <DocRef>BUILD: FP-052</DocRef>
        </View>

        <Text allowFontScaling={false} style={styles.title}>{repair.title.toUpperCase()}</Text>
        <Text allowFontScaling={false} style={styles.summary}>{repair.summary}</Text>

        {/* Impact card */}
        <NoirCard variant="elevated" radius="lg" padding={24} style={styles.section}>
          <Label tone="tertiary" size="micro">Estimated Impact</Label>
          <HeroNumber value={repair.impact} size="xl" tone="white" style={{ marginTop: spacing.md }}/>
          <Text allowFontScaling={false} style={styles.impactBody}>{repair.impactDescription}</Text>
        </NoirCard>

        {/* Severity + time row */}
        <View style={styles.metricsRow}>
          <NoirCard variant="default" radius="md" padding={18} style={styles.metricCol}>
            <Label tone="tertiary" size="micro">Severity</Label>
            <View style={{ marginTop: spacing.md }}>
              <SeverityChip level={repair.severity}/>
            </View>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={18} style={styles.metricCol}>
            <Label tone="tertiary" size="micro">Est. Time</Label>
            <View style={styles.timeRow}>
              <HeroNumber value={repair.timeEstimate} size="md" tone="white"/>
              <Text allowFontScaling={false} style={styles.timeUnit}>
                {repair.timeUnit.toUpperCase()}
              </Text>
            </View>
          </NoirCard>
        </View>

        {/* Progress */}
        <NoirCard variant="default" radius="md" padding={20} style={styles.section}>
          <Label tone="tertiary" size="micro">Repair Progress</Label>
          <View style={{ marginTop: spacing.md }}>
            <ProgressBar value={repair.progress} tone="amber"/>
          </View>
          <Text allowFontScaling={false} style={styles.progressLabel}>
            {repair.stageLabel}
          </Text>
        </NoirCard>

        {/* Tools */}
        <View style={styles.section}>
          <Label tone="tertiary" size="micro">Required Tools / Materials</Label>
          <View style={{ marginTop: spacing.md }}>
            <ToolChipRow labels={repair.tools}/>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaRow}>
          <View style={{ flex: 1 }}>
            <AmberCTA label="DIY Guide" variant="glass" size="lg" onPress={() => router.push(`/repair-step?id=${repair.id}&n=2`)}/>
          </View>
          <View style={{ flex: 1 }}>
            <AmberCTA label="Find Pro" variant="primary" size="lg" onPress={() => router.push('/find-a-pro')}/>
          </View>
        </View>
          </>) : null}
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    scroll: { paddingHorizontal: spacing.xl },
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
    stateWrap: {
        marginTop: spacing.xl,
        minHeight: 220,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stateText: {
        marginTop: spacing.xl,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        fontSize: typeScale.bodySmall,
        lineHeight: 20,
    },
});
