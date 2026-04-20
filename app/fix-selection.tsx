import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
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
import { REPAIR_ROOF_LEAK } from '@/mock/repair';

export default function FixSelection() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<'diy' | 'hybrid' | 'pro'>('hybrid');

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
        <Text allowFontScaling={false} style={styles.title}>ROOF LEAK</Text>

        <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
          <RouteCard
            routeKey="diy"
            selected={selected === 'diy'}
            price="$15"
            meta="DIY · 15 MIN"
            onPress={() => setSelected('diy')}
            photo={<ToolsPhoto size={120} />}
          />
          <RouteCard
            routeKey="hybrid"
            selected={selected === 'hybrid'}
            price="$45"
            meta="HYBRID · 45 MIN"
            recommended
            onPress={() => setSelected('hybrid')}
            photo={<HandshakePhoto size={120} />}
          />
          <RouteCard
            routeKey="pro"
            selected={selected === 'pro'}
            price="$180"
            meta="FULL PRO · 2 HOURS"
            onPress={() => setSelected('pro')}
            photo={<ToolboxPhoto size={120} />}
          />
        </View>

        <AmberCTA
          label="Select Plan"
          variant="primary"
          onPress={() => router.push(`/repair/${REPAIR_ROOF_LEAK.id}`)}
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
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
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
});
