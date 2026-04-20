import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, fonts, gradients, radii, shadows, spacing, tracking, typeScale } from '@/constants/tokens';

type Variant = 'primary' | 'outlined' | 'glass' | 'dark' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = Omit<PressableProps, 'style' | 'onPressIn' | 'onPressOut'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
};

const SIZE_HEIGHT: Record<Size, number> = { sm: 38, md: 48, lg: 56, xl: 64 };
const SIZE_FONT: Record<Size, number> = {
  sm: typeScale.labelMicro,
  md: typeScale.labelSmall,
  lg: typeScale.bodyMedium,
  xl: typeScale.bodyLarge,
};

export function AmberCTA({
  label,
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth = true,
  disabled,
  onPress,
  icon,
  trailingIcon,
  style,
  glow,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress: PressableProps['onPress'] = (e) => {
    if (loading || disabled) return;
    if (variant === 'primary') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    } else if (variant === 'danger') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.(e);
  };

  const height = SIZE_HEIGHT[size];
  const fontSize = SIZE_FONT[size];

  const onPressIn = () => { scale.value = withSpring(0.98, { damping: 20, stiffness: 280 }); };
  const onPressOut = () => { scale.value = withSpring(1, { damping: 16, stiffness: 220 }); };

  const textColor =
    variant === 'primary' ? colors.textOnAmber :
    variant === 'dark' ? colors.text :
    variant === 'danger' ? colors.text :
    variant === 'glass' ? colors.text :
    colors.amber;

  const useGlow = glow ?? variant === 'primary';

  const bodyStyle: ViewStyle = {
    height,
    borderRadius: radii.pill,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    paddingHorizontal: size === 'sm' ? spacing.lg : spacing.xxl,
    overflow: 'hidden',
    opacity: disabled ? 0.4 : 1,
    ...(useGlow && !disabled ? shadows.glowAmber : {}),
  };

  return (
    <Animated.View style={[animStyle, fullWidth ? styles.full : undefined, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        disabled={disabled || loading}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={handlePress}
        style={bodyStyle}
        hitSlop={8}
        {...rest}
      >
        {variant === 'primary' ? (
          <>
            <LinearGradient
              colors={gradients.ctaAmberRich.colors as unknown as readonly [string, string, ...string[]]}
              locations={gradients.ctaAmberRich.locations as unknown as readonly [number, number, ...number[]]}
              start={gradients.ctaAmberRich.start}
              end={gradients.ctaAmberRich.end}
              style={StyleSheet.absoluteFill}
            />
            {/* subtle inner top highlight */}
            <View pointerEvents="none" style={styles.innerTopLight} />
          </>
        ) : null}

        {variant === 'outlined' ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: radii.pill,
                borderWidth: 1,
                borderColor: colors.hairlineAmber,
                backgroundColor: 'rgba(255,169,92,0.05)',
              },
            ]}
          />
        ) : null}

        {variant === 'glass' ? (
          <>
            {Platform.OS === 'ios' ? (
              <BlurView intensity={24} tint="dark" style={StyleSheet.absoluteFill} />
            ) : null}
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderRadius: radii.pill,
                  borderWidth: 1,
                  borderColor: colors.hairlineStrong,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              ]}
            />
          </>
        ) : null}

        {variant === 'dark' ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.surface2,
                borderRadius: radii.pill,
                borderWidth: 1,
                borderColor: colors.hairlineStrong,
              },
            ]}
          />
        ) : null}

        {variant === 'danger' ? (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.dangerDim, borderRadius: radii.pill }]} />
        ) : null}

        <View style={styles.center}>
          <View style={styles.row}>
            {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
            {loading ? (
              <ActivityIndicator color={textColor} size="small" />
            ) : (
              <Text
                allowFontScaling={false}
                style={{
                  color: textColor,
                  fontSize,
                  fontFamily: fonts.labelSemibold,
                  letterSpacing: tracking.labelWide,
                }}
              >
                {label.toUpperCase()}
              </Text>
            )}
            {trailingIcon ? <View style={styles.iconWrap}>{trailingIcon}</View> : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  full: { width: '100%' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: { marginHorizontal: 2 },
  innerTopLight: {
    position: 'absolute',
    top: 1,
    left: 16,
    right: 16,
    height: 1,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.30)',
  },
});
