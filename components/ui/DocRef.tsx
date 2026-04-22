import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';

type Tone = 'neutral' | 'amber' | 'cyan' | 'mint' | 'danger' | 'dim';
type Size = 'xs' | 'sm';

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  align?: TextStyle['textAlign'];
  style?: TextStyle;
};

function flatten(node: React.ReactNode): string {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flatten).join('');
  return '';
}

const TONE_COLOR: Record<Tone, string> = {
  neutral: colors.textTertiary,
  amber: colors.amber,
  cyan: colors.cyan,
  mint: colors.mint,
  danger: colors.danger,
  dim: colors.textDim,
};

export function DocRef({ children, tone = 'neutral', size = 'xs', align, style }: Props) {
  const fontSize = size === 'xs' ? typeScale.docRef : typeScale.labelSmall;
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.base,
        {
          color: TONE_COLOR[tone],
          fontSize,
          textAlign: align,
        },
        style,
      ]}
    >
      {flatten(children).toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.mono,
    letterSpacing: tracking.docRef,
  },
});
