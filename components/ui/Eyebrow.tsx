import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';

type Tone = 'coral' | 'slate' | 'sage' | 'peach' | 'cream';
type Size = 'micro' | 'small';

type Props = {
  children: string;
  tone?: Tone;
  size?: Size;
  align?: TextStyle['textAlign'];
  style?: TextStyle;
};

const TONE_COLOR: Record<Tone, string> = {
  coral: colors.primary,
  slate: colors.tertiary,
  sage:  colors.sage,
  peach: colors.primaryContainer,
  cream: colors.onSurfaceVariant,
};

export function Eyebrow({
  children,
  tone = 'slate',
  size = 'small',
  align = 'left',
  style,
}: Props) {
  const fontSize = size === 'micro' ? typeScale.labelMicro : typeScale.labelSmall;
  const letterSpacing = size === 'micro' ? tracking.labelMicro : tracking.labelWide;
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.base,
        {
          color: TONE_COLOR[tone],
          fontSize,
          letterSpacing,
          textAlign: align,
        },
        style,
      ]}
    >
      {children.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.labelSemibold,
  },
});
