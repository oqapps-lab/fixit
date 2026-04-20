import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Rect, Line, Circle, Path } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { CameraGlyph, ChevronLeftGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function Capture() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen glow="none">
      {/* Viewfinder simulation — dark photograph-ish area with framing crosshairs */}
      <View style={styles.viewfinder}>
        <Svg width="100%" height="100%" viewBox="0 0 420 800" preserveAspectRatio="xMidYMid slice">
          <Rect x={0} y={0} width={420} height={800} fill="#0A0B0E" />

          {/* grid guides */}
          <Line x1={140} y1={60} x2={140} y2={740} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <Line x1={280} y1={60} x2={280} y2={740} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <Line x1={20} y1={280} x2={400} y2={280} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <Line x1={20} y1={520} x2={400} y2={520} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />

          {/* suggested subject — faucet silhouette */}
          <Path
            d="M170 330 h80 v40 h-24 v60 h8 c20 0 30 14 30 30 h-108 c0-16 10-30 30-30 h8 v-60 h-24 z"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1}
          />
          <Circle cx={210} cy={475} r={3} fill={colors.cyan} opacity={0.7} />

          {/* corner brackets */}
          <Path d="M40 240 v-18 h18" stroke={colors.amber} strokeWidth={1.5} fill="none" />
          <Path d="M380 240 v-18 h-18" stroke={colors.amber} strokeWidth={1.5} fill="none" />
          <Path d="M40 560 v18 h18" stroke={colors.amber} strokeWidth={1.5} fill="none" />
          <Path d="M380 560 v18 h-18" stroke={colors.amber} strokeWidth={1.5} fill="none" />
        </Svg>
      </View>

      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={styles.backBtn}
        >
          <ChevronLeftGlyph size={22} color={colors.text} />
        </Pressable>
        <View style={styles.stepChip}>
          <DocRef tone="amber">STEP 03 · 03 · FRAME</DocRef>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Guidance band */}
      <View style={styles.guidance}>
        <NoirCard variant="glass" radius="md" padding={14}>
          <DocRef tone="cyan">AI HINT · 94% CONFIDENT</DocRef>
          <Text allowFontScaling={false} style={styles.guidanceText}>
            Place the problem inside the frame. Bright side works best.
          </Text>
        </NoirCard>
      </View>

      {/* Bottom band */}
      <View style={[styles.bottomBand, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.bottomRow}>
          <Pressable
            onPress={() => router.push('/(onboarding)/context')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Use saved photo"
            style={styles.smallBtn}
          >
            <Text allowFontScaling={false} style={styles.smallBtnText}>GALLERY</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(onboarding)/context')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Capture"
            style={styles.shutterOuter}
          >
            <View style={styles.shutterInner}>
              <CameraGlyph size={24} color={colors.text} />
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(onboarding)/context')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Describe with text"
            style={styles.smallBtn}
          >
            <Text allowFontScaling={false} style={styles.smallBtnText}>TEXT</Text>
          </Pressable>
        </View>

        <Text allowFontScaling={false} style={styles.hint}>
          Tap when framed · hold for multi-angle
        </Text>
      </View>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  viewfinder: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10,11,14,0.6)',
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,169,92,0.10)',
    borderWidth: 1,
    borderColor: colors.hairlineAmber,
  },
  spacer: { width: 40 },
  guidance: {
    position: 'absolute',
    bottom: 220,
    left: spacing.xl,
    right: spacing.xl,
  },
  guidanceText: {
    marginTop: 6,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.text,
    lineHeight: 18,
  },
  bottomBand: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    backgroundColor: 'rgba(8,8,10,0.85)',
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  smallBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtnText: {
    fontFamily: fonts.labelSemibold,
    fontSize: 9,
    color: colors.textSecondary,
    letterSpacing: tracking.labelWide,
  },
  shutterOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.amber,
    shadowOpacity: 0.5,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  shutterInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.bg,
    borderWidth: 3,
    borderColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    marginTop: spacing.md,
    textAlign: 'center',
    fontFamily: fonts.mono,
    fontSize: typeScale.labelMicro,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
});
