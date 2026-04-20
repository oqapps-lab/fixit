import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking } from '@/constants/tokens';

type Props = {
  children: string;
  size?: number;
  align?: 'left' | 'center';
  tone?: 'white' | 'amber' | 'cyan';
  style?: TextStyle;
};

export function SerifHero({ children, size = 30, align = 'center', tone = 'white', style }: Props) {
  const color =
    tone === 'amber' ? colors.amber :
    tone === 'cyan' ? colors.cyan :
    colors.text;

  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.base,
        {
          fontSize: size,
          textAlign: align,
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.heroItalic,
    letterSpacing: tracking.heroItalic,
    lineHeight: undefined,
  },
});
