import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

/** Pin-with-slash glyph — location blocked */
function PinSlashGlyph({ size = 56, color = colors.amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56">
      <Path
        d="M28 48s14-14 14-26a14 14 0 10-28 0c0 12 14 26 14 26z"
        stroke={color}
        strokeWidth={1.6}
        fill="none"
        strokeLinejoin="round"
      />
      <Circle cx={28} cy={22} r={5} stroke={color} strokeWidth={1.6} fill="none" />
      <Line x1={10} y1={10} x2={46} y2={46} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function LocationDenied() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  const enterZip = () => {
    router.replace('/(onboarding)/location');
  };

  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      /* no-op */
    }
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close location error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        <View style={styles.grabber} />

        <View style={styles.topRow}>
          <DocRef tone="amber">ERR-08.4 · PERMISSION · LOCATION</DocRef>
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
          <PinSlashGlyph size={56} color={colors.amber} />
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          LOCATION BLOCKED
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          Without your ZIP we can only show national averages. Enter ZIP manually or enable Location.
        </Text>

        <View style={styles.ctaStack}>
          <AmberCTA
            label="Enter ZIP manually"
            variant="primary"
            size="lg"
            onPress={enterZip}
            accessibilityLabel="Enter ZIP code manually"
          />
          <AmberCTA
            label="Open Settings"
            variant="outlined"
            size="lg"
            onPress={openSettings}
            accessibilityLabel="Open iOS Settings to enable location"
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
