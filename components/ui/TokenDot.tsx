import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, shadows } from '@/constants/tokens';

type Tone = 'coral' | 'sage' | 'slate' | 'cream';
type Size = 'sm' | 'md';

type Props = {
  filled?: boolean;
  glow?: boolean;
  tone?: Tone;
  size?: Size;
  style?: ViewStyle;
};

const TONE_FILL: Record<Tone, string> = {
  coral: colors.primary,
  sage:  colors.sage,
  slate: colors.tertiary,
  cream: colors.outlineVariant,
};

export function TokenDot({
  filled = false,
  glow = false,
  tone = 'coral',
  size = 'sm',
  style,
}: Props) {
  const dim = size === 'md' ? 10 : 8;
  const borderWidth = filled ? 0 : 1.4;

  return (
    <View
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim,
          backgroundColor: filled ? TONE_FILL[tone] : 'transparent',
          borderWidth,
          borderColor: TONE_FILL[tone],
        },
        glow && filled ? shadows.glowDotSm : null,
        style,
      ]}
    />
  );
}

export function DotRow({
  count,
  active,
  tone = 'coral',
}: {
  count: number;
  active: number;
  tone?: Tone;
}) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <TokenDot key={i} filled={i === active} glow={i === active} tone={tone} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});
