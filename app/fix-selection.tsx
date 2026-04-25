import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ToolsPhoto, HandshakePhoto, ToolboxPhoto } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { listRepairs } from '@/services/repairs';
import type { RepairRow, RepairRoute } from '@/types/database';

export default function FixSelection() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<'diy' | 'hybrid' | 'pro'>('hybrid');
  const [repair, setRepair] = useState<RepairRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await listRepairs();
        if (alive) setRepair(rows[0] ?? null);
      } catch {
        if (alive) setRepair(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const routes: RepairRoute[] = repair?.routes ?? [];
  const diy = routes.find((r) => r.key === 'diy');
  const hybrid = routes.find((r) => r.key === 'hybrid');
  const pro = routes.find((r) => r.key === 'pro');
  const title = repair?.title ?? 'ROOF LEAK';

  return (
    <NoirScreen>
      <NoirHeader brand="SERVICE_DETAILS" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.sm,
            paddingBottom: insets.bottom + 140,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text allowFontScaling={false} style={styles.title}>{title.toUpperCase()}</Text>

        {loading ? (
          <ActivityIndicator color={colors.amber} style={{ marginTop: spacing.xl }} />
        ) : !repair?.id ? (
          <NoirCard
            variant="outlined"
            radius="md"
            padding={22}
            style={{ marginTop: spacing.xl }}
          >
            <DocRef tone="amber">NO ACTIVE REPAIR</DocRef>
            <Text allowFontScaling={false} style={styles.emptyTitle}>
              No active repair
            </Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>
              Pick one from your project list to compare DIY · Hybrid · Pro routes.
            </Text>
            <View style={{ height: spacing.md }} />
            <AmberCTA
              label="Open estimates"
              variant="outlined"
              size="md"
              onPress={() => router.push('/estimates' as any)}
            />
          </NoirCard>
        ) : (
          <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
            {diy ? (
              <RouteCard
                routeKey="diy"
                selected={selected === 'diy'}
                price={diy.price}
                meta={diy.meta}
                recommended={diy.recommended}
                onPress={() => setSelected('diy')}
                photo={<ToolsPhoto size={120} />}
              />
            ) : null}
            {hybrid ? (
              <RouteCard
                routeKey="hybrid"
                selected={selected === 'hybrid'}
                price={hybrid.price}
                meta={hybrid.meta}
                recommended={hybrid.recommended ?? true}
                onPress={() => setSelected('hybrid')}
                photo={<HandshakePhoto size={120} />}
              />
            ) : null}
            {pro ? (
              <RouteCard
                routeKey="pro"
                selected={selected === 'pro'}
                price={pro.price}
                meta={pro.meta}
                recommended={pro.recommended}
                onPress={() => setSelected('pro')}
                photo={<ToolboxPhoto size={120} />}
              />
            ) : null}
          </View>
        )}

        <AmberCTA
          label="Select Plan"
          variant="primary"
          onPress={() => {
            if (repair?.id) router.push(`/repair/${repair.id}`);
          }}
          disabled={!repair?.id}
          style={{ marginTop: spacing.xl }}
        />
      </ScrollView>
    </NoirScreen>
  );
}

function RouteCard({
  routeKey,
  price,
  meta,
  selected,
  recommended,
  photo,
  onPress,
}: {
  routeKey: string;
  price: string;
  meta: string;
  selected?: boolean;
  recommended?: boolean;
  photo: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${price} · ${meta}${recommended ? ' · recommended' : ''}`}
      accessibilityHint="Tap to pick this repair route"
      hitSlop={6}
    >
      <NoirCard
        variant={selected ? 'elevated' : 'default'}
        radius="md"
        padding={0}
        style={[
          styles.routeCard,
          selected ? { borderColor: colors.amber } : null,
        ]}
      >
        <View style={styles.photoWrap}>{photo}</View>

        <View style={styles.routeBody}>
          {recommended ? (
            <View style={styles.recBadge}>
              <Text allowFontScaling={false} style={styles.recBadgeText}>★ RECOMMENDED</Text>
            </View>
          ) : null}

          <HeroNumber value={price} size="md" tone={selected ? 'amber' : 'white'} />
          <Text allowFontScaling={false} style={styles.routeMeta}>{meta}</Text>
        </View>
      </NoirCard>
    </Pressable>
  );
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
    backgroundColor: colors.amberTint12,
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
  emptyTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  emptyMeta: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
