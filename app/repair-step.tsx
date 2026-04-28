import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { SerifHero } from '@/components/ui/SerifHero';
import { BlueprintPhoto } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function RepairStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { n } = useLocalSearchParams<{ id?: string; n?: string }>();
  const stepN = parseInt(n ?? '2', 10);

  return (
    <NoirScreen>
      <NoirHeader brand="REPAIR_MANUAL" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.sm,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <DocRef>SYSTEM STATUS</DocRef>
          <DocRef tone="amber">STEP {stepN} OF 5</DocRef>
        </View>

        <NoirCard variant="blueprint" radius="md" padding={18} style={styles.photoCard}>
          <BlueprintPhoto size={160} />
          <View style={{ marginTop: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' }}>
            <DocRef tone="cyan">AXIAL_VIEW</DocRef>
            <DocRef tone="cyan">1:1 SCALE</DocRef>
          </View>
        </NoirCard>

        <SerifHero size={34} align="left" style={{ marginTop: spacing.xxl }}>
          Loosen the top nut
        </SerifHero>

        <Text allowFontScaling={false} style={styles.body}>
          Use an adjustable wrench to loosen the upper retaining nut. Turn
          counter-clockwise with steady, even pressure. Keep the wrench
          flush against the flats of the nut to avoid scarring the
          decorative finish.
        </Text>

        <NoirCard variant="default" radius="md" padding={14} style={styles.warnRow}>
          <View style={styles.warnBar} />
          <View style={{ flex: 1 }}>
            <DocRef tone="amber">STEP WARNING</DocRef>
            <Text allowFontScaling={false} style={styles.warnText}>
              Don't strike the nut — it can crack under impact.
            </Text>
          </View>
        </NoirCard>

        <View style={styles.ctaRow}>
          <View style={{ flex: 1 }}>
            <AmberCTA
              label="DONE"
              variant="outlined"
              onPress={() => router.back()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AmberCTA
              label="I'M STUCK"
              variant="dark"
              onPress={() => router.push('/find-a-pro')}
            />
          </View>
        </View>

        <Text allowFontScaling={false} style={styles.timeNote}>
          THIS STEP · 12 MIN
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  headerRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoCard: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  warnRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.md,
  },
  warnBar: {
    width: 3,
    backgroundColor: colors.amber,
    borderRadius: 1.5,
  },
  warnText: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.text,
    lineHeight: 18,
  },
  ctaRow: {
    marginTop: spacing.huge,
    flexDirection: 'row',
    gap: spacing.md,
  },
  timeNote: {
    marginTop: spacing.lg,
    textAlign: 'center',
    fontFamily: fonts.mono,
    fontSize: typeScale.labelMicro,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
});
