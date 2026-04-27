import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
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
import { listRecentActivities } from '@/lib/data/repair-content';
export default function HomeOverview() {
    const insets = useSafeAreaInsets();
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const loadActivities = async () => {
            try {
                const data = await listRecentActivities();
                if (isMounted) {
                    setActivities(data);
                }
            }
            catch (error) {
                if (!isMounted) {
                    return;
                }
                const message = error instanceof Error ? error.message : 'Failed to load activities.';
                setErrorMessage(message);
            }
            finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        loadActivities().catch(() => { });
        return () => {
            isMounted = false;
        };
    }, []);
    return (<NoirScreen>
      <NoirHeader brand="# HOME_CODE" showBack/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            { paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.huge },
        ]} showsVerticalScrollIndicator={false}>
        <SerifHero size={38} align="center" style={{ marginTop: spacing.md }}>
          Твой дом
        </SerifHero>

        <View style={styles.houseWrap}>
          <WarmHouse size={200}/>
        </View>

        <View style={styles.stats}>
          <NoirCard variant="elevated" radius="md" padding={16} style={styles.statCard}>
            <DocRef>SAVED</DocRef>
            <HeroNumber value="$2,340" size="sm" tone="amber" style={{ marginTop: 4 }}/>
          </NoirCard>
          <NoirCard variant="elevated" radius="md" padding={16} style={styles.statCard}>
            <DocRef>HEALTH</DocRef>
            <HeroNumber value="87" size="sm" tone="white" style={{ marginTop: 4 }}/>
          </NoirCard>
          <NoirCard variant="elevated" radius="md" padding={16} style={styles.statCard}>
            <DocRef>FIXES</DocRef>
            <HeroNumber value="7" size="sm" tone="mint" style={{ marginTop: 4 }}/>
          </NoirCard>
        </View>

        <View style={styles.graphHeader}>
          <Label tone="tertiary" size="micro">Recovery Calendar</Label>
          <DocRef tone="cyan">APR · 7-DAY VIEW</DocRef>
        </View>

        <NoirCard variant="default" radius="md" padding={20} style={{ marginTop: spacing.sm }}>
          <Svg width="100%" height={90} viewBox="0 0 280 90" preserveAspectRatio="none">
            <Polyline points="0,60 40,55 70,48 110,52 150,40 190,30 220,36 260,24 280,22" stroke={colors.mint} strokeWidth={1.6} fill="none"/>
            <Polyline points="0,60 40,55 70,48 110,52 150,40 190,30 220,36 260,24 280,22 280,90 0,90" fill="rgba(107,222,154,0.08)" stroke="none"/>
          </Svg>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Recent Activity
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {isLoading ? (<View style={styles.stateWrap}>
              <ActivityIndicator color={colors.amber}/>
            </View>) : null}

          {!isLoading && errorMessage !== null ? (<Text allowFontScaling={false} style={styles.stateText}>{errorMessage}</Text>) : null}

          {!isLoading && errorMessage === null && activities.map((activity) => (<NoirCard key={activity.id} variant="outlined" radius="md" padding={14}>
              <View style={styles.actRow}>
                <Text allowFontScaling={false} style={styles.actTitle}>{activity.title}</Text>
                <Text allowFontScaling={false} style={styles.actPrice}>{activity.price}</Text>
              </View>
            </NoirCard>))}

          {!isLoading && errorMessage === null && activities.length === 0 ? (<Text allowFontScaling={false} style={styles.stateText}>No activity yet.</Text>) : null}
        </View>

        <AmberCTA label="+ New Fix" variant="primary" onPress={() => { }} fullWidth={false} style={{ alignSelf: 'flex-end', marginTop: spacing.xl }}/>
      </ScrollView>
    </NoirScreen>);
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
    stateWrap: {
        minHeight: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stateText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textSecondary,
        lineHeight: 20,
    },
});
