import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line, Path } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

/** Cloud-with-slash glyph — offline indicator */
function CloudSlashGlyph({ size = 56, color = colors.amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56">
      <Path
        d="M14 36h26a8 8 0 000-16 11 11 0 00-21-2 7 7 0 00-5 18z"
        stroke={color}
        strokeWidth={1.6}
        fill="none"
        strokeLinejoin="round"
      />
      <Line x1={10} y1={10} x2={46} y2={46} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function Offline() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  const retry = () => {
    // In production this would re-check connectivity; for now, just dismiss.
    close();
  };

  const goSaved = () => {
    router.replace('/(tabs)/repairs');
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close offline error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        <View style={styles.grabber} />

        <View style={styles.topRow}>
          <DocRef tone="amber">ERR-08.1 · NETWORK · OFFLINE</DocRef>
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
          <CloudSlashGlyph size={56} color={colors.amber} />
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          YOU'RE OFFLINE
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          Some features are unavailable. Past estimates and saved tutorials still work. We'll retry when you're back online.
        </Text>

        <View style={styles.ctaStack}>
          <AmberCTA
            label="Retry"
            variant="primary"
            size="lg"
            onPress={retry}
            accessibilityLabel="Retry connection"
          />
          <AmberCTA
            label="View saved estimates"
            variant="outlined"
            size="lg"
            onPress={goSaved}
            accessibilityLabel="View saved estimates"
          />
        </View>

        <Pressable
          onPress={close}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Keep working offline"
          style={styles.tertiaryWrap}
        >
          <Text allowFontScaling={false} style={styles.tertiary}>
            Keep working offline
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
