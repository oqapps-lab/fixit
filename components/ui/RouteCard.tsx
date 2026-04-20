import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlassCard } from './GlassCard';
import { Eyebrow } from './Eyebrow';
import { GhostNumber } from './GhostNumber';
import { WrenchGlyph, HandshakeGlyph, ToolboxGlyph } from './Glyphs';
import { colors, fonts, tracking, typeScale, spacing } from '@/constants/tokens';

type Route = 'DIY' | 'Hybrid' | 'Pro';

type Props = {
  route: Route;
  price: string;
  meta: string;
  duration: string;
};

const ROUTE_META = {
  DIY: {
    tint: 'sage' as const,
    tone: 'sageMint' as const,
    eyebrow: 'DIY',
    glyph: <WrenchGlyph size={26} color={colors.sage} />,
  },
  Hybrid: {
    tint: 'peach' as const,
    tone: 'peachAmber' as const,
    eyebrow: 'HYBRID',
    glyph: <HandshakeGlyph size={26} color={colors.primaryContainer} />,
  },
  Pro: {
    tint: 'coral' as const,
    tone: 'coralPeach' as const,
    eyebrow: 'FULL PRO',
    glyph: <ToolboxGlyph size={26} color={colors.primary} />,
  },
};

export function RouteCard({ route, price, meta, duration }: Props) {
  const m = ROUTE_META[route];

  return (
    <GlassCard tint={m.tint} radius="lg" padding={22} style={styles.card}>
      <View style={styles.topRow}>
        <Eyebrow tone={route === 'DIY' ? 'sage' : route === 'Hybrid' ? 'peach' : 'coral'}>
          {m.eyebrow}
        </Eyebrow>
        <View style={styles.glyphWrap}>{m.glyph}</View>
      </View>

      <View style={styles.priceBlock}>
        <GhostNumber
          value={duration}
          size="md"
          tone={m.tone}
          align="left"
          opacity={0.14}
          style={styles.ghostWrap}
        />
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: fonts.displayExtraBold,
            fontSize: 52,
            letterSpacing: tracking.hero,
            color: route === 'DIY' ? colors.sage : route === 'Hybrid' ? colors.primaryContainer : colors.primary,
            includeFontPadding: false,
          }}
        >
          {price}
        </Text>
      </View>

      <Text
        allowFontScaling={false}
        style={{
          marginTop: spacing.sm,
          color: colors.onSurfaceVariant,
          fontFamily: fonts.label,
          fontSize: typeScale.labelSmall,
          letterSpacing: tracking.labelWide,
        }}
      >
        {meta.toUpperCase()}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  glyphWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceBlock: {
    marginTop: spacing.md,
    minHeight: 72,
    justifyContent: 'flex-end',
  },
  ghostWrap: {
    position: 'absolute',
    left: -6,
    top: -14,
  },
});
