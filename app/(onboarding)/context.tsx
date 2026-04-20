import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type DiyLevel = 'novice' | 'some' | 'expert';
type Quality = 'budget' | 'mid' | 'premium';

const DIY_OPTIONS: Array<{ key: DiyLevel; label: string; meta: string }> = [
  { key: 'novice', label: 'Never tried',        meta: 'Walkthrough every step' },
  { key: 'some',   label: 'Some experience',     meta: 'Shorter guides' },
  { key: 'expert', label: 'Done this before',    meta: 'Terse, no hand-holding' },
];

const Q_OPTIONS: Array<{ key: Quality; label: string; meta: string }> = [
  { key: 'budget',  label: 'Budget',    meta: 'Off-brand, functional' },
  { key: 'mid',     label: 'Mid-range', meta: 'Brand name, durable' },
  { key: 'premium', label: 'Premium',   meta: 'Top-tier, lifetime' },
];

export default function Context() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [diy, setDiy] = useState<DiyLevel>('some');
  const [quality, setQuality] = useState<Quality>('mid');

  return (
    <NoirScreen>
      <NoirHeader brand="SECTOR · CONTEXT" showBack />

      <View style={[
        styles.content,
        { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xxxl },
      ]}>
        <View>
          <DocRef>PRE-SCAN · TWO QUICK QUESTIONS</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            PERSONALIZE
          </Text>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
            Your DIY readiness
          </Label>
          <View style={styles.group}>
            {DIY_OPTIONS.map((o) => {
              const on = diy === o.key;
              return (
                <Pressable
                  key={o.key}
                  onPress={() => setDiy(o.key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={o.label}
                >
                  <NoirCard
                    variant={on ? 'elevated' : 'default'}
                    radius="md"
                    padding={16}
                    style={on ? { borderColor: colors.amber } : null}
                  >
                    <View style={styles.rowBetween}>
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={[styles.optLabel, { color: on ? colors.amber : colors.text }]}>
                          {o.label}
                        </Text>
                        <Text allowFontScaling={false} style={styles.optMeta}>{o.meta}</Text>
                      </View>
                      <View style={[styles.radio, on ? styles.radioOn : null]}>
                        {on ? <View style={styles.radioDot} /> : null}
                      </View>
                    </View>
                  </NoirCard>
                </Pressable>
              );
            })}
          </View>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
            Quality tier
          </Label>
          <View style={styles.group}>
            {Q_OPTIONS.map((o) => {
              const on = quality === o.key;
              return (
                <Pressable
                  key={o.key}
                  onPress={() => setQuality(o.key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={o.label}
                >
                  <NoirCard
                    variant={on ? 'elevated' : 'default'}
                    radius="md"
                    padding={16}
                    style={on ? { borderColor: colors.amber } : null}
                  >
                    <View style={styles.rowBetween}>
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={[styles.optLabel, { color: on ? colors.amber : colors.text }]}>
                          {o.label}
                        </Text>
                        <Text allowFontScaling={false} style={styles.optMeta}>{o.meta}</Text>
                      </View>
                      <View style={[styles.radio, on ? styles.radioOn : null]}>
                        {on ? <View style={styles.radioDot} /> : null}
                      </View>
                    </View>
                  </NoirCard>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.anchor}>
          <AmberCTA
            label="Continue"
            variant="primary"
            size="lg"
            onPress={() => router.push('/(onboarding)/processing')}
          />
          <Pressable
            onPress={() => router.push('/(onboarding)/processing')}
            hitSlop={8}
          >
            <Text allowFontScaling={false} style={styles.skipText}>Skip — use defaults</Text>
          </Pressable>
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
    color: colors.text,
    letterSpacing: 1.4,
  },
  group: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  optLabel: {
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.bodyLarge,
    letterSpacing: tracking.tight,
  },
  optMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: {
    borderColor: colors.amber,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.amber,
  },
  anchor: {
    alignItems: 'center',
    gap: spacing.md,
  },
  skipText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textTertiary,
  },
});
