import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

/** Question-mark-in-circle glyph — low confidence */
function QuestionCircleGlyph({ size = 56, color = colors.amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56">
      <Circle cx={28} cy={28} r={22} stroke={color} strokeWidth={1.6} fill="none" />
      <Path
        d="M22 22a6 6 0 1112 0c0 3-3 4-5 5-1 1-1 2-1 4"
        stroke={color}
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1={28} y1={40} x2={28} y2={41.5} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export default function UnknownProblem() {
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

  const describeText = () => {
    // stub — would route to text-description flow
    close();
  };

  const browseCommon = () => {
    router.replace('/(tabs)/repairs');
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close unknown problem error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        <View style={styles.grabber} />

        <View style={styles.topRow}>
          <DocRef tone="amber">ERR-08.6 · AI · LOW CONFIDENCE</DocRef>
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
          <QuestionCircleGlyph size={56} color={colors.amber} />
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          {"NOT SURE WHAT\nI'M SEEING"}
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          Try a closer shot with better light, describe the problem in text, or browse common repairs.
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
            label="Describe in text"
            variant="outlined"
            size="lg"
            onPress={describeText}
            accessibilityLabel="Describe the problem in text"
          />
        </View>

        <Pressable
          onPress={browseCommon}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Browse common repairs"
          style={styles.tertiaryWrap}
        >
          <Text allowFontScaling={false} style={styles.tertiary}>
            Browse common repairs
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  scrim: { backgroundColor: colors.scrim },
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
  tertiaryWrap: {
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  tertiary: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
    letterSpacing: tracking.label,
    textDecorationLine: 'underline',
  },
});
