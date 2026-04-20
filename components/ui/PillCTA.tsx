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
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  colors,
  fonts,
  gradients,
  radii,
  shadows,
  spacing,
  tracking,
  typeScale,
} from '@/constants/tokens';

type Tone = 'primary' | 'sage' | 'ghost' | 'destructive' | 'onboarding' | 'dark';
type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = Omit<PressableProps, 'style' | 'onPressIn' | 'onPressOut'> & {
  label: string;
  tone?: Tone;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  style?: ViewStyle;
};

const SIZE_HEIGHT: Record<Size, number> = { sm: 36, md: 44, lg: 56, xl: 64 };
const SIZE_FONT: Record<Size, number> = {
  sm: typeScale.bodyMedium,
  md: typeScale.bodyLarge,
  lg: typeScale.bodyLarge,
  xl: typeScale.titleSmall,
};

export function PillCTA({
  label,
  tone = 'primary',
  size = 'lg',
  loading,
  fullWidth = true,
  disabled,
  onPress,
  icon,
  trailingIcon,
  style,
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
    if (tone === 'destructive') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    } else if (tone === 'ghost') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    onPress?.(e);
  };

  const height = SIZE_HEIGHT[size];
  const fontSize = SIZE_FONT[size];

  const onPressInHandler = () => {
    scale.value = withSpring(0.96, { damping: 18, stiffness: 260 });
  };
  const onPressOutHandler = () => {
    scale.value = withSpring(1, { damping: 14, stiffness: 200 });
  };

  const content = (
    <View style={styles.innerRow}>
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      {loading ? (
        <ActivityIndicator color={toneTextColor(tone)} />
      ) : (
        <Text
          allowFontScaling={false}
          style={[
            styles.label,
            {
              fontSize,
              color: toneTextColor(tone),
              fontFamily: fonts.labelSemibold,
              letterSpacing: tracking.labelWide,
            },
          ]}
        >
          {label.toUpperCase()}
        </Text>
      )}
      {trailingIcon ? <View style={styles.iconWrap}>{trailingIcon}</View> : null}
    </View>
  );

  // Background renderers
  const bodyStyle: ViewStyle = {
    height,
    borderRadius: radii.pill,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    paddingHorizontal: size === 'sm' ? spacing.lg : spacing.xxl,
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    ...toneShadow(tone),
  };

  return (
    <Animated.View style={[animStyle, fullWidth ? styles.full : undefined, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        disabled={disabled || loading}
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        onPress={handlePress}
        style={bodyStyle}
        hitSlop={8}
        {...rest}
      >
        {tone === 'primary' || tone === 'onboarding' ? (
          <>
            <LinearGradient
              colors={gradients.ctaCoralGlossy.colors as unknown as readonly [string, string, ...string[]]}
              locations={gradients.ctaCoralGlossy.locations as unknown as readonly [number, number, ...number[]]}
              start={gradients.ctaCoralGlossy.start}
              end={gradients.ctaCoralGlossy.end}
              style={StyleSheet.absoluteFill}
            />
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                {
                  borderRadius: radii.pill,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.35)',
                },
              ]}
            />
            {/* glossy top highlight streak */}
            <View pointerEvents="none" style={styles.glossStreak} />
          </>
        ) : null}

        {tone === 'dark' ? (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.onSurface }]} />
        ) : null}

        {tone === 'sage' ? (
          <>
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'transparent',
                  borderRadius: radii.pill,
                  borderWidth: 1.4,
                  borderColor: colors.sage,
                },
              ]}
            />
          </>
        ) : null}

        {tone === 'destructive' ? (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.error }]} />
        ) : null}

        <View style={styles.centerAll}>{content}</View>
      </Pressable>
    </Animated.View>
  );
}

function toneTextColor(tone: Tone): string {
  switch (tone) {
    case 'primary':
    case 'onboarding':
    case 'destructive':
    case 'dark':
      return colors.onPrimary;
    case 'sage':
      return colors.sage;
    case 'ghost':
      return colors.primary;
  }
}

function toneShadow(tone: Tone): ViewStyle {
  switch (tone) {
    case 'primary':
      return shadows.pillLg;
    case 'onboarding':
      return shadows.pillSm;
    case 'sage':
      return shadows.sageShadow;
    case 'dark':
      return shadows.warmCardShadow;
    case 'destructive':
      return shadows.coralShadow;
    default:
      return {};
  }
}

const styles = StyleSheet.create({
  full: { width: '100%' },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: { marginHorizontal: 2 },
  centerAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
  glossStreak: {
    position: 'absolute',
    top: 2,
    left: 12,
    right: 12,
    height: Platform.OS === 'ios' ? 14 : 10,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
});
