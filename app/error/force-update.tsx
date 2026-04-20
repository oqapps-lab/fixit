import React from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line, Polyline, Rect } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

const APP_STORE_URL = Platform.select({
  ios: 'https://apps.apple.com/app/idYOUR_APP_ID',
  android: 'https://play.google.com/store/apps/details?id=YOUR_PACKAGE',
  default: 'https://apps.apple.com/app/idYOUR_APP_ID',
});

/** Download-arrow glyph — update indicator */
function DownloadArrowGlyph({ size = 72, color = colors.amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72">
      {/* arrow shaft */}
      <Line x1={36} y1={10} x2={36} y2={46} stroke={color} strokeWidth={2} strokeLinecap="round" />
      {/* arrow head */}
      <Polyline
        points="22,34 36,48 50,34"
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* landing tray */}
      <Rect x={16} y={54} width={40} height={8} rx={2} stroke={color} strokeWidth={1.8} fill="none" />
    </Svg>
  );
}

export default function ForceUpdate() {
  const insets = useSafeAreaInsets();

  const openStore = async () => {
    try {
      await Linking.openURL(APP_STORE_URL as string);
    } catch {
      /* no-op */
    }
  };

  return (
    <NoirScreen glow="amber">
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xxxl },
        ]}
      >
        {/* Top brand marker */}
        <View style={styles.topMarker}>
          <DocRef tone="amber" align="center">
            SYSTEM · VERSION · UPGRADE REQUIRED
          </DocRef>
        </View>

        {/* Centered hero */}
        <View style={styles.centerGroup}>
          <View style={styles.iconRing}>
            <DownloadArrowGlyph size={72} color={colors.amber} />
          </View>

          <Text allowFontScaling={false} style={styles.title}>
            {'NEW VERSION\nAVAILABLE'}
          </Text>

          <Text allowFontScaling={false} style={styles.body}>
            A critical update is required to continue. Please update FixIt from the App Store.
          </Text>
        </View>

        {/* Bottom full-width CTA */}
        <View style={styles.ctaWrap}>
          <AmberCTA
            label="Open App Store"
            variant="primary"
            size="xl"
            fullWidth
            onPress={openStore}
            accessibilityLabel="Open the App Store to update FixIt"
          />
          <DocRef align="center" style={{ marginTop: spacing.lg }}>
            BUILD · UPDATE REQUIRED
          </DocRef>
        </View>
      </View>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  topMarker: {
    alignItems: 'center',
  },
  centerGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRing: {
    width: 132,
    height: 132,
    borderRadius: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairlineAmber,
    backgroundColor: colors.surface1,
    marginBottom: spacing.xxl,
  },
  title: {
    fontFamily: fonts.displayNarrowBold,
    fontSize: typeScale.displaySmall,
    color: colors.text,
    letterSpacing: tracking.tight,
    textAlign: 'center',
    lineHeight: 38,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  ctaWrap: {
    width: '100%',
  },
});
