import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ToolsPhoto, HandshakePhoto, ToolboxPhoto } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { getDefaultRepairTemplate, } from '@/lib/data/repair-content';
export default function FixSelection() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [selected, setSelected] = useState('hybrid');
    const [repair, setRepair] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const loadRepairTemplate = async () => {
            try {
                const data = await getDefaultRepairTemplate();
                if (!isMounted) {
                    return;
                }
                setRepair(data);
                const recommended = data?.routes.find((route) => route.recommended)?.key;
                const firstRoute = data?.routes[0]?.key;
                if (recommended !== undefined) {
                    setSelected(recommended);
                }
                else if (firstRoute !== undefined) {
                    setSelected(firstRoute);
                }
            }
            catch (error) {
                if (!isMounted) {
                    return;
                }
                const message = error instanceof Error ? error.message : 'Failed to load repair options.';
                setErrorMessage(message);
            }
            finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        loadRepairTemplate().catch(() => { });
        return () => {
            isMounted = false;
        };
    }, []);
    const title = repair?.title?.toUpperCase() ?? 'REPAIR';
    return (<NoirScreen>
      <NoirHeader brand="SERVICE_DETAILS" showBack/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            {
                paddingTop: spacing.sm,
                paddingBottom: insets.bottom + 140,
            },
        ]} showsVerticalScrollIndicator={false}>
        <Text allowFontScaling={false} style={styles.title}>{title}</Text>

        {isLoading ? (<View style={styles.stateWrap}>
            <ActivityIndicator color={colors.amber}/>
          </View>) : null}

        {!isLoading && errorMessage !== null ? (<Text allowFontScaling={false} style={styles.stateText}>{errorMessage}</Text>) : null}

        {!isLoading && errorMessage === null && repair !== null ? (<View style={{ marginTop: spacing.xl, gap: spacing.md }}>
            {repair.routes.map((route) => (<RouteCard key={route.key} routeKey={route.key} selected={selected === route.key} price={route.price} meta={route.meta} recommended={route.recommended} onPress={() => setSelected(route.key)} photo={<RoutePhoto routeKey={route.key}/>}/>))}
          </View>) : null}

        <AmberCTA label="Select Plan" variant="primary" onPress={() => {
            if (repair !== null) {
                router.push(`/repair/${repair.id}`);
            }
        }} style={{ marginTop: spacing.xl }}/>
      </ScrollView>
    </NoirScreen>);
}
function RoutePhoto({ routeKey }) {
    if (routeKey === 'diy') {
        return <ToolsPhoto size={120}/>;
    }
    if (routeKey === 'hybrid') {
        return <HandshakePhoto size={120}/>;
    }
    return <ToolboxPhoto size={120}/>;
}
function RouteCard({ routeKey, price, meta, selected, recommended, photo, onPress, }) {
    return (<Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      <NoirCard variant={selected ? 'elevated' : 'default'} radius="md" padding={0} style={[
            styles.routeCard,
            selected ? { borderColor: colors.amber } : null,
        ]}>
        <View style={styles.photoWrap}>{photo}</View>

        <View style={styles.routeBody}>
          {recommended ? (<View style={styles.recBadge}>
              <Text allowFontScaling={false} style={styles.recBadgeText}>★ RECOMMENDED</Text>
            </View>) : null}

          <HeroNumber value={price} size="md" tone={selected ? 'amber' : 'white'}/>
          <Text allowFontScaling={false} style={styles.routeMeta}>{meta}</Text>
        </View>
      </NoirCard>
    </Pressable>);
}
const styles = StyleSheet.create({
    scroll: { paddingHorizontal: spacing.xl },
    title: {
        marginTop: spacing.sm,
        fontFamily: fonts.displayNarrowBold,
        fontSize: 38,
        color: colors.text,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
    },
    routeCard: {
        overflow: 'hidden',
    },
    photoWrap: {
        width: '100%',
        height: 140,
        backgroundColor: colors.surface2,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    routeBody: {
        padding: 20,
    },
    recBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,169,92,0.12)',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: spacing.sm,
    },
    recBadgeText: {
        fontFamily: fonts.labelSemibold,
        color: colors.amber,
        fontSize: 10,
        letterSpacing: 1.4,
    },
    routeMeta: {
        marginTop: 4,
        fontFamily: fonts.labelSemibold,
        color: colors.textTertiary,
        fontSize: typeScale.labelSmall,
        letterSpacing: tracking.labelWide,
    },
    stateWrap: {
        marginTop: spacing.xl,
        minHeight: 120,
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
