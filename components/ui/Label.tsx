import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';

type Tone = 'primary' | 'secondary' | 'tertiary' | 'amber' | 'cyan' | 'mint' | 'danger';
type Size = 'micro' | 'small' | 'medium';

type Props = {
  children: string;
  tone?: Tone;
  size?: Size;
  align?: TextStyle['textAlign'];
  style?: TextStyle;
};

const TONE_COLOR: Record<Tone, string> = {
  primary: colors.text,
  secondary: colors.textSecondary,
  tertiary: colors.textTertiary,
  amber: colors.amber,
  cyan: colors.cyan,
  mint: colors.mint,
  danger: colors.danger,
};

export function Label({ children, tone = 'tertiary', size = 'small', align, style }: Props) {
  const fontSize =
    size === 'micro' ? typeScale.labelMicro :
    size === 'medium' ? typeScale.bodyMedium :
    typeScale.labelSmall;
  const letterSpacing = size === 'micro' ? tracking.labelMicro : tracking.labelWide;
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.base,
        { color: TONE_COLOR[tone], fontSize, letterSpacing, textAlign: align },
        style,
      ]}
    >
      {children.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: { fontFamily: fonts.labelSemibold },
});
