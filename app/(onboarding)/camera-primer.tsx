import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Rect, Line, Circle, Path } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { CameraGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, typeScale } from '@/constants/tokens';

function SampleThumb({ kind }: { kind: 'pipe' | 'tile' | 'hinge' | 'fridge' }) {
  if (kind === 'pipe') {
    return (
      <Svg width={60} height={60} viewBox="0 0 60 60">
        <Rect x={2} y={2} width={56} height={56} fill="rgba(255,255,255,0.03)" stroke={colors.hairline} strokeWidth={1} />
        <Path d="M10 22h12v6h-4v10h2c3 0 4 2 4 5h-12c0-3 1-5 4-5h2V28h-4v-6z" stroke={colors.text} strokeWidth={1} fill="none" />
        <Circle cx={20} cy={48} r={1.5} fill={colors.cyan} />
      </Svg>
    );
  }
  if (kind === 'tile') {
    return (
      <Svg width={60} height={60} viewBox="0 0 60 60">
        <Rect x={2} y={2} width={56} height={56} fill="rgba(255,255,255,0.03)" stroke={colors.hairline} strokeWidth={1} />
        <Rect x={10} y={14} width={40} height={32} stroke={colors.text} strokeWidth={1} fill="none" />
        <Line x1={14} y1={20} x2={30} y2={32} stroke={colors.amber} strokeWidth={0.8} />
        <Line x1={30} y1={32} x2={42} y2={26} stroke={colors.amber} strokeWidth={0.8} />
      </Svg>
    );
  }
  if (kind === 'hinge') {
    return (
      <Svg width={60} height={60} viewBox="0 0 60 60">
        <Rect x={2} y={2} width={56} height={56} fill="rgba(255,255,255,0.03)" stroke={colors.hairline} strokeWidth={1} />
        <Rect x={10} y={10} width={18} height={40} stroke={colors.text} strokeWidth={1} fill="none" />
        <Rect x={32} y={10} width={18} height={40} stroke={colors.text} strokeWidth={1} fill="none" />
        <Circle cx={30} cy={20} r={3} fill={colors.text} opacity={0.7} />
        <Circle cx={30} cy={40} r={3} fill={colors.text} opacity={0.7} />
      </Svg>
    );
  }
  return (
    <Svg width={60} height={60} viewBox="0 0 60 60">
      <Rect x={2} y={2} width={56} height={56} fill="rgba(255,255,255,0.03)" stroke={colors.hairline} strokeWidth={1} />
      <Rect x={18} y={8} width={24} height={44} stroke={colors.text} strokeWidth={1} fill="none" />
      <Line x1={18} y1={22} x2={42} y2={22} stroke={colors.text} strokeWidth={1} />
      <Rect x={38} y={12} width={2} height={6} fill={colors.text} opacity={0.6} />
    </Svg>
  );
}

export default function CameraPrimer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="SECTOR · CAPTURE" showBack />

      <View style={[
        styles.content,
        { paddingTop: insets.top + spacing.huge, paddingBottom: insets.bottom + spacing.xxxl },
      ]}>
        <View>
          <DocRef>STEP 02 · 03 · PERMISSION</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            SHOW US{'\n'}WHAT'S BROKEN
          </Text>
          <Text allowFontScaling={false} style={styles.body}>
            A single photo. Anything from a leaky pipe to a dead dishwasher. Photos stay on your account — never shared.
          </Text>
        </View>

        <View style={styles.grid}>
          <NoirCard variant="default" radius="md" padding={14} style={styles.tile}>
            <SampleThumb kind="pipe" />
            <DocRef size="xs" style={{ marginTop: spacing.sm }}>LEAKY PIPE</DocRef>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={styles.tile}>
            <SampleThumb kind="tile" />
            <DocRef size="xs" style={{ marginTop: spacing.sm }}>CRACKED TILE</DocRef>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={styles.tile}>
            <SampleThumb kind="hinge" />
            <DocRef size="xs" style={{ marginTop: spacing.sm }}>BROKEN HINGE</DocRef>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={styles.tile}>
            <SampleThumb kind="fridge" />
            <DocRef size="xs" style={{ marginTop: spacing.sm }}>DEAD FRIDGE</DocRef>
          </NoirCard>
        </View>

        <View style={styles.anchor}>
          <AmberCTA
            label="Allow camera"
            variant="primary"
            size="lg"
            icon={<CameraGlyph size={18} color={colors.textOnAmber} />}
            onPress={() => router.push('/(onboarding)/capture')}
          />
          <Pressable
            onPress={() => router.push('/(onboarding)/capture')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Upload a saved photo instead"
          >
            <Text allowFontScaling={false} style={styles.secondaryText}>
              Upload a saved photo instead
            </Text>
          </Pressable>
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dotActive} />
            <View style={styles.dot} />
          </View>
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
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 42,
    lineHeight: 44,
    color: colors.text,
    letterSpacing: 1.2,
  },
  body: {
    marginTop: spacing.lg,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  tile: {
    width: '47%',
    aspectRatio: 1.3,
    alignItems: 'flex-start',
  },
  anchor: {
    alignItems: 'center',
    gap: spacing.md,
  },
  secondaryText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textTertiary,
  },
  dots: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textDim,
  },
  dotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
});
