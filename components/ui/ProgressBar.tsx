import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/constants/tokens';

type Tone = 'amber' | 'cyan' | 'mint';

type Props = {
  value: number;
  tone?: Tone;
  height?: number;
  style?: ViewStyle;
};

const TONE_GRADIENT: Record<Tone, readonly [string, string]> = {
  amber: ['#FFA95C', '#E8752A'],
  cyan: ['#4FE5F9', '#6BCBD9'],
  mint: ['#6BDE9A', '#2C8A52'],
};

export function ProgressBar({ value, tone = 'amber', height = 2, style }: Props) {
  const pct = Math.min(1, Math.max(0, value));
  return (
    <View style={[styles.track, { height, backgroundColor: colors.surface2 }, style]}>
      <View style={[styles.fillWrap, { width: `${pct * 100}%` }]}>
        <LinearGradient
          colors={TONE_GRADIENT[tone] as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: 1,
    overflow: 'hidden',
  },
  fillWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
});
