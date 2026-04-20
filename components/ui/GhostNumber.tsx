import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fonts, tracking, typeScale } from '@/constants/tokens';

type Size = 'sm' | 'md' | 'lg' | 'mega';
type Tone = 'coralPeach' | 'peachAmber' | 'sageMint' | 'slate';

type Props = {
  value: string;
  size?: Size;
  tone?: Tone;
  align?: 'left' | 'center' | 'right';
  opacity?: number;
  style?: ViewStyle;
};

const SIZE_MAP: Record<Size, number> = {
  sm: typeScale.displayMedium,
  md: typeScale.displayLarge,
  lg: typeScale.displayGhost,
  mega: typeScale.displayGhostMega,
};

const TONE_COLORS: Record<Tone, { primary: string; secondary: string }> = {
  coralPeach: { primary: '#AC4218', secondary: '#FE7E4F' },
  peachAmber: { primary: '#FE7E4F', secondary: '#FFB896' },
  sageMint:   { primary: '#037524', secondary: '#5BC26D' },
  slate:      { primary: '#626374', secondary: '#9E9D96' },
};

/**
 * A massive translucent watermark number that fills the negative
 * space behind hero content. Uses two stacked Texts — an offset
 * secondary-tint behind, a primary-tint on top — to fake a
 * gradient-text look without needing @react-native-masked-view.
 */
export function GhostNumber({
  value,
  size = 'lg',
  tone = 'coralPeach',
  align = 'left',
  opacity = 0.22,
  style,
}: Props) {
  const fontSize = SIZE_MAP[size];
  const { primary, secondary } = TONE_COLORS[tone];

  const textCommon = {
    fontFamily: fonts.displayExtraBold,
    fontSize,
    letterSpacing: tracking.heroDisplay,
    textAlign: align,
    includeFontPadding: false,
  };

  return (
    <View
      pointerEvents="none"
      style={[
        styles.wrap,
        { alignItems: alignFrom(align), opacity },
        style,
      ]}
    >
      {/* offset ghost behind */}
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[textCommon, { color: secondary, position: 'absolute', top: 4, left: 4, opacity: 0.55 }]}
      >
        {value}
      </Text>
      {/* primary in front */}
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[textCommon, { color: primary }]}
      >
        {value}
      </Text>
    </View>
  );
}

function alignFrom(a: 'left' | 'center' | 'right'): 'flex-start' | 'center' | 'flex-end' {
  if (a === 'left') return 'flex-start';
  if (a === 'right') return 'flex-end';
  return 'center';
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'flex-start',
  },
});
