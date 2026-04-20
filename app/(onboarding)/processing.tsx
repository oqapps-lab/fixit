import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { CheckGlyph, BlueprintPhoto } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type State = 'pending' | 'active' | 'done';

const STAGES: Array<{ label: string; answer?: string; tone: 'cyan' | 'amber' | 'mint' }> = [
  { label: 'Identify the issue',              answer: 'LEAKY CARTRIDGE',   tone: 'cyan'  },
  { label: 'Check twelve retailers',           tone: 'amber' },
  { label: 'Calculate Denver labor rates',     tone: 'cyan'  },
  { label: 'Compare DIY vs Pro for this fix',  tone: 'amber' },
  { label: 'Finalize your three routes',       tone: 'mint'  },
];

export default function Processing() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stageIdx, setStageIdx] = useState(0);
  const ring = useSharedValue(0);

  useEffect(() => {
    ring.value = withRepeat(withTiming(360, { duration: 3000, easing: Easing.linear }), -1, false);
    const ticks = [1, 2, 3, 4].map((i) =>
      setTimeout(() => setStageIdx(i), i * 1300)
    );
    const done = setTimeout(() => router.replace('/your-house'), 6800);
    return () => {
      ticks.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [ring, router]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ring.value}deg` }],
  }));

  return (
    <NoirScreen>
      <View style={[
        styles.content,
        { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xxxl },
      ]}>
        <View style={{ alignItems: 'center' }}>
          <DocRef align="center">SYSTEM · ANALYZING · USUALLY 6 SEC</DocRef>
          <Text allowFontScaling={false} style={styles.statusTitle}>
            RUNNING SCAN
          </Text>
        </View>

        {/* Rotating halo with photo center */}
        <View style={styles.haloWrap}>
          <Animated.View style={[styles.halo, ringStyle]}>
            <Svg width={240} height={240} viewBox="0 0 240 240">
              <Defs>
                <SvgLinearGradient id="scan" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor={colors.amber} stopOpacity="0.8" />
                  <Stop offset="0.5" stopColor={colors.amber} stopOpacity="0" />
                  <Stop offset="1" stopColor={colors.cyan} stopOpacity="0.6" />
                </SvgLinearGradient>
              </Defs>
              <Circle cx={120} cy={120} r={108} stroke={colors.hairlineStrong} strokeWidth={1} fill="none" />
              <Circle cx={120} cy={120} r={108} stroke="url(#scan)" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeDasharray="60 300" />
            </Svg>
          </Animated.View>

          <NoirCard variant="blueprint" radius="pill" padding={14} style={styles.photoCircle}>
            <BlueprintPhoto size={120} />
          </NoirCard>
        </View>

        {/* Stage list */}
        <View style={styles.stages}>
          {STAGES.map((s, i) => {
            const state: State = i < stageIdx ? 'done' : i === stageIdx ? 'active' : 'pending';
            return (
              <NoirCard
                key={s.label}
                variant={state === 'active' ? 'elevated' : 'default'}
                radius="md"
                padding={14}
                style={[styles.stageRow, state === 'pending' ? { opacity: 0.45 } : null]}
              >
                <View style={styles.stageInner}>
                  <View style={styles.marker}>
                    {state === 'done' ? (
                      <CheckGlyph size={22} color={colors.mint} />
                    ) : state === 'active' ? (
                      <View style={styles.activeDot} />
                    ) : (
                      <View style={styles.pendingDot} />
                    )}
                  </View>
                  <Text allowFontScaling={false} style={[
                    styles.stageLabel,
                    state === 'active' ? { color: colors.text } : null,
                  ]}>
                    {s.label}
                  </Text>
                  {state === 'done' && s.answer ? (
                    <DocRef tone="mint">{s.answer}</DocRef>
                  ) : null}
                </View>
              </NoirCard>
            );
          })}
        </View>

        <View style={{ alignItems: 'center' }}>
          <DocRef align="center">WHILE YOU WAIT · 12 RETAILERS NO HUMAN HAS TIME TO CHECK</DocRef>
        </View>
      </View>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  statusTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 32,
    color: colors.text,
    letterSpacing: 1.2,
  },
  haloWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },
  halo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCircle: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stages: {
    gap: spacing.sm,
  },
  stageRow: {},
  stageInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  marker: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.amber,
    shadowColor: colors.amber,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  pendingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.2,
    borderColor: colors.hairlineStrong,
  },
  stageLabel: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
});
