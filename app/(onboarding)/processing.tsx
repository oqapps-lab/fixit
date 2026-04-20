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
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DotRow } from '@/components/ui/TokenDot';
import { CheckGlyph, HaloRings, FaucetDropGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale, shadows } from '@/constants/tokens';

type StageState = 'done' | 'active' | 'upcoming';

const STAGES: Array<{ label: string; answer?: string; tint: 'sage' | 'peach' | 'coral' | 'lavender' | 'default' }> = [
  { label: 'Identifying the issue',                 answer: 'Leaky cartridge', tint: 'sage' },
  { label: 'Checking twelve retailers for prices',  tint: 'peach' },
  { label: 'Calculating labor rates for Denver',    tint: 'coral' },
  { label: 'Comparing DIY vs. Pro for this fix',    tint: 'peach' },
  { label: 'Finalizing your three routes',          tint: 'lavender' },
];

export default function Processing() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stage, setStage] = useState(0);
  const haloRotation = useSharedValue(0);

  useEffect(() => {
    haloRotation.value = withRepeat(withTiming(360, { duration: 4000, easing: Easing.linear }), -1, false);
    const tickMs = 1300;
    const t1 = setTimeout(() => setStage(1), tickMs);
    const t2 = setTimeout(() => setStage(2), tickMs * 2);
    const t3 = setTimeout(() => setStage(3), tickMs * 3);
    const t4 = setTimeout(() => setStage(4), tickMs * 4);
    const tDone = setTimeout(() => {
      router.replace('/(onboarding)/result');
    }, tickMs * 5 + 400);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(tDone);
    };
  }, [haloRotation, router]);

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${haloRotation.value}deg` }],
  }));

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      <View style={[styles.content, { paddingTop: insets.top + spacing.huge, paddingBottom: insets.bottom + spacing.xxxl }]}>
        <View style={styles.header}>
          <Eyebrow tone="slate" align="center">Analyzing</Eyebrow>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: spacing.xs,
              textAlign: 'center',
              fontFamily: fonts.heroItalic,
              fontSize: 24,
              color: colors.primary,
            }}
          >
            Hold on. We're doing the math.
          </Text>
        </View>

        {/* Photo centerpiece */}
        <View style={styles.centerpiece}>
          <Animated.View style={[styles.halo, haloStyle]}>
            <HaloRings size={240} color={colors.primaryContainer} />
          </Animated.View>
          <View style={[styles.photoCircle, shadows.glowHaloLg]}>
            <GlassCard tint="default" radius="pill" padding={0} noShadow style={styles.photoInner}>
              <View style={styles.photoFill}>
                <FaucetDropGlyph size={80} color={colors.primary} secondary={colors.sage} />
              </View>
            </GlassCard>
          </View>
        </View>

        {/* Stages */}
        <View style={styles.stages}>
          {STAGES.map((s, i) => {
            const state: StageState = i < stage ? 'done' : i === stage ? 'active' : 'upcoming';
            return (
              <StageRow key={s.label} label={s.label} answer={s.answer} tint={s.tint} state={state} />
            );
          })}
        </View>

        <View style={styles.footer}>
          <Eyebrow tone="slate" align="center">Usually takes about 6 seconds</Eyebrow>
          <View style={styles.dots}>
            <DotRow count={3} active={1} tone="coral" />
          </View>
        </View>
      </View>
    </AtmosphericGradient>
  );
}

function StageRow({ label, answer, tint, state }: { label: string; answer?: string; tint: 'sage' | 'peach' | 'coral' | 'lavender' | 'default'; state: StageState }) {
  const opacity = state === 'upcoming' ? 0.45 : 1;
  const boldMark = state === 'active';
  return (
    <View style={[styles.row, { opacity }]}>
      <GlassCard tint={state === 'upcoming' ? 'default' : tint} radius="pill" padding={0} noShadow={state === 'upcoming'} style={styles.pill}>
        <View style={styles.pillInner}>
          <View style={styles.markSlot}>
            {state === 'done' ? (
              <CheckGlyph size={22} color={colors.sage} />
            ) : (
              <View
                style={[
                  styles.hollowDot,
                  boldMark ? { borderColor: colors.primary, borderWidth: 2 } : null,
                ]}
              />
            )}
          </View>
          <Text
            allowFontScaling={false}
            style={{
              flex: 1,
              fontFamily: boldMark ? fonts.bodyMedium : fonts.body,
              fontSize: typeScale.bodyMedium,
              color: colors.onSurface,
            }}
          >
            {label}
          </Text>
          {answer && state === 'done' ? (
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: fonts.labelSemibold,
                fontSize: typeScale.labelMicro,
                letterSpacing: tracking.labelMicro,
                color: colors.primary,
              }}
            >
              {answer.toUpperCase()}
            </Text>
          ) : null}
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  centerpiece: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    height: 240,
    position: 'relative',
  },
  halo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  photoInner: {
    flex: 1,
    borderRadius: 70,
    overflow: 'hidden',
  },
  photoFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stages: {
    gap: spacing.sm,
  },
  row: {},
  pill: {
    width: '100%',
  },
  pillInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  markSlot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hollowDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.4,
    borderColor: colors.outline,
  },
  footer: {
    alignItems: 'center',
  },
  dots: {
    marginTop: spacing.md,
  },
});
