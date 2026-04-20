import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

/** Focus-target / blurred-eye glyph */
function FocusTargetGlyph({ size = 56, color = colors.amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56">
      {/* outer ring — blurred (dashed) */}
      <Circle cx={28} cy={28} r={22} stroke={color} strokeWidth={1.4} fill="none" strokeDasharray="3 3" opacity={0.6} />
      {/* middle ring */}
      <Circle cx={28} cy={28} r={14} stroke={color} strokeWidth={1.6} fill="none" opacity={0.85} />
      {/* inner dot */}
      <Circle cx={28} cy={28} r={3} fill={color} />
      {/* crosshair */}
      <Line x1={28} y1={4} x2={28} y2={10} stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Line x1={28} y1={46} x2={28} y2={52} stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Line x1={4} y1={28} x2={10} y2={28} stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Line x1={46} y1={28} x2={52} y2={28} stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export default function Blurry() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  const retake = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(onboarding)/capture');
  };

  const useAnyway = () => {
    close();
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close blurry photo error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        <View style={styles.grabber} />

        <View style={styles.topRow}>
          <DocRef tone="amber">ERR-08.5 · IMAGE · LOW QUALITY</DocRef>
          <Pressable
            onPress={close}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            style={styles.closeBtn}
          >
            <Text allowFontScaling={false} style={styles.closeX}>×</Text>
          </Pressable>
        </View>

        <View style={styles.iconWrap}>
          <FocusTargetGlyph size={56} color={colors.amber} />
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          {'PHOTO LOOKS\nBLURRY'}
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          Retake in better light for a more accurate estimate — or use it anyway.
        </Text>

        <View style={styles.ctaStack}>
          <AmberCTA
            label="Retake photo"
            variant="primary"
            size="lg"
            onPress={retake}
            accessibilityLabel="Retake the photo"
          />
          <AmberCTA
            label="Use it anyway"
            variant="outlined"
            size="lg"
            onPress={useAnyway}
            accessibilityLabel="Use the blurry photo anyway"
          />
        </View>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  scrim: { backgroundColor: 'rgba(0,0,0,0.70)' },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.hairlineStrong,
    marginBottom: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    backgroundColor: colors.surface1,
  },
  closeX: {
    fontFamily: fonts.body,
    fontSize: 20,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  iconWrap: {
    alignSelf: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairlineAmber,
    backgroundColor: colors.surface1,
  },
  title: {
    fontFamily: fonts.displayNarrowBold,
    fontSize: typeScale.titleLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 32,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
  },
  ctaStack: { gap: spacing.md },
});
