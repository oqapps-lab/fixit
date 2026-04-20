import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii, shadows } from '@/constants/tokens';

type Tint = 'default' | 'sage' | 'peach' | 'coral' | 'lavender';
type Radius = 'sm' | 'md' | 'lg' | 'pill';

type Props = ViewProps & {
  tint?: Tint;
  radius?: Radius;
  padding?: number;
  intensity?: number;
  noShadow?: boolean;
  children?: React.ReactNode;
};

const TINT_BG: Record<Tint, string> = {
  default:  'rgba(255,255,255,0.82)',
  sage:     'rgba(228,243,232,0.78)',
  peach:    'rgba(255,232,216,0.78)',
  coral:    'rgba(255,217,199,0.82)',
  lavender: 'rgba(240,237,247,0.80)',
};

const TINT_BORDER: Record<Tint, string> = {
  default:  'rgba(255,255,255,0.60)',
  sage:     'rgba(150,249,150,0.38)',
  peach:    'rgba(255,184,150,0.42)',
  coral:    'rgba(254,126,79,0.48)',
  lavender: 'rgba(230,230,250,0.50)',
};

const TINT_SHADOW: Record<Tint, ViewStyle> = {
  default:  shadows.warmCardShadow,
  sage:     shadows.sageShadow,
  peach:    shadows.peachShadow,
  coral:    shadows.coralShadow,
  lavender: shadows.lavenderShadow,
};

const RADIUS_MAP: Record<Radius, number> = {
  sm: radii.sm,
  md: radii.md,
  lg: radii.lg,
  pill: radii.pill,
};

export function GlassCard({
  tint = 'default',
  radius = 'md',
  padding,
  intensity = 40,
  noShadow = false,
  style,
  children,
  ...rest
}: Props) {
  const borderRadius = RADIUS_MAP[radius];
  const bg = TINT_BG[tint];
  const border = TINT_BORDER[tint];
  const shadow = noShadow ? null : TINT_SHADOW[tint];

  const containerStyle: ViewStyle = {
    borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: border,
    ...(shadow ?? {}),
  };

  const innerStyle: ViewStyle = {
    padding: padding ?? 20,
    width: '100%',
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={[containerStyle, style]} {...rest}>
        <BlurView
          intensity={intensity}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }]} />
        <View style={innerStyle}>{children}</View>
      </View>
    );
  }

  // Android — expo-blur is noisy; use solid-ish tint instead.
  const androidBg = bumpAlpha(bg, 0.15);
  return (
    <View
      style={[
        containerStyle,
        { backgroundColor: androidBg },
        style,
      ]}
      {...rest}
    >
      <View style={innerStyle}>{children}</View>
    </View>
  );
}

function bumpAlpha(rgba: string, delta: number): string {
  const m = rgba.match(/rgba?\(([^)]+)\)/);
  if (!m || !m[1]) return rgba;
  const parts = m[1].split(',').map((p) => p.trim());
  const r = parts[0] ?? '255';
  const g = parts[1] ?? '255';
  const b = parts[2] ?? '255';
  const a = Math.min(1, Math.max(0, parseFloat(parts[3] ?? '1') + delta));
  return `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

export const _glassColors = { TINT_BG, TINT_BORDER, colors };
