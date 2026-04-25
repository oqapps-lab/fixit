import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

/** Camera-with-slash glyph — permission denied indicator */
function CameraSlashGlyph({ size = 56, color = colors.amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56">
      <Rect x={8} y={16} width={40} height={28} rx={4} stroke={color} strokeWidth={1.6} fill="none" />
      <Path d="M18 16l3-4h14l3 4" stroke={color} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <Circle cx={28} cy={30} r={7} stroke={color} strokeWidth={1.6} fill="none" />
      <Line x1={10} y1={10} x2={46} y2={46} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function CameraUnavailable() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      /* no-op — simulator may not support */
    }
  };

  const useGallery = () => {
    // Return to capture with gallery mode — stub
    close();
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close camera error">
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        <View style={styles.grabber} />

        <View style={styles.topRow}>
          <DocRef tone="amber">ERR-08.2 · PERMISSION · CAMERA</DocRef>
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
          <CameraSlashGlyph size={56} color={colors.amber} />
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          {'CAMERA ACCESS\nNEEDED'}
        </Text>

        <Text allowFontScaling={false} style={styles.body}>
          FixIt needs camera to analyze repair photos. Enable in Settings, or pick from your gallery instead.
        </Text>

        <View style={styles.ctaStack}>
          <AmberCTA
            label="Open Settings"
            variant="primary"
            size="lg"
            onPress={openSettings}
            accessibilityLabel="Open iOS Settings to enable camera"
          />
          <AmberCTA
            label="Use gallery instead"
            variant="outlined"
            size="lg"
            onPress={useGallery}
            accessibilityLabel="Pick a photo from your gallery"
          />
        </View>

        <Pressable
          onPress={close}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Describe with text"
          style={styles.tertiaryWrap}
        >
          <Text allowFontScaling={false} style={styles.tertiary}>
            Describe with text
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
