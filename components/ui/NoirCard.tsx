import React from 'react';
import { Platform, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii } from '@/constants/tokens';

type Variant = 'default' | 'elevated' | 'outlined' | 'blueprint' | 'glass';
type Radius = 'sm' | 'md' | 'lg' | 'pill';

type Props = ViewProps & {
  variant?: Variant;
  radius?: Radius;
  padding?: number;
  children?: React.ReactNode;
};

const RADIUS_MAP: Record<Radius, number> = {
  sm: radii.sm,
  md: radii.md,
  lg: radii.lg,
  pill: radii.pill,
};

/**
 * Noir translucent card — semi-transparent surface with BlurView
 * backdrop. The atmospheric gradient + amber glow from NoirScreen
 * bleed through via low-opacity fill.
 */
export function NoirCard({
  variant = 'default',
  radius = 'md',
  padding,
  style,
  children,
  ...rest
}: Props) {
  const br = RADIUS_MAP[radius];

  const isGlass = variant === 'glass' || variant === 'default' || variant === 'elevated';

  const fillAlpha =
    variant === 'elevated' ? 0.09 :
    variant === 'glass' ? 0.05 :
    variant === 'blueprint' ? 0.04 :
    0.07;

  const borderColor =
    variant === 'outlined' ? colors.hairlineStrong :
    variant === 'blueprint' ? colors.hairlineCyan :
    variant === 'elevated' ? colors.hairlineStrong :
    colors.hairline;

  const containerStyle: ViewStyle = {
    borderColor,
    borderWidth: 1,
    borderRadius: br,
    overflow: 'hidden',
    padding: padding ?? 20,
    backgroundColor: variant === 'outlined' ? 'transparent' : undefined,
  };

  return (
    <View style={[containerStyle, style]} {...rest}>
      {/* blurred backdrop — iOS */}
      {isGlass && Platform.OS === 'ios' ? (
        <BlurView
          pointerEvents="none"
          intensity={variant === 'elevated' ? 40 : 28}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      {/* translucent tint on top of blur */}
      {isGlass ? (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor:
                Platform.OS === 'ios'
                  ? `rgba(255,255,255,${fillAlpha})`
                  : // Android doesn't have blur — richer solid fill for legibility
                    `rgba(24,25,28,${0.82 - fillAlpha})`,
            },
          ]}
        />
      ) : null}

      {variant === 'blueprint' ? (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.surfaceBlueprint },
          ]}
        />
      ) : null}

      {/* top-edge highlight — catches "light" */}
      {isGlass ? (
        <View
          pointerEvents="none"
          style={styles.edgeHighlight}
        />
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  edgeHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.edgeHighlight,
  },
});
