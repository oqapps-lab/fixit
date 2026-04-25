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
          Открути верхнюю гайку
        </SerifHero>

        <Text allowFontScaling={false} style={styles.body}>
          Используйте разводной ключ, чтобы ослабить верхнюю крепёжную
          гайку. Поворачивайте против часовой стрелки, прилагая равномерное
          усилие. Что бы ключ плотно прилегал к граням гайки, чтобы избежать
          повреждения декоративного покрытия.
        </Text>

        <NoirCard variant="default" radius="md" padding={14} style={styles.warnRow}>
          <View style={styles.warnBar} />
          <View style={{ flex: 1 }}>
            <DocRef tone="amber">STEP WARNING</DocRef>
            <Text allowFontScaling={false} style={styles.warnText}>
              Не применяйте резких ударов — гайка может треснуть.
            </Text>
          </View>
        </NoirCard>

        <View style={styles.ctaRow}>
          <View style={{ flex: 1 }}>
            <AmberCTA
              label="ГОТОВО"
              variant="outlined"
              onPress={() => router.back()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AmberCTA
              label="Я ЗАСТРЯЛ"
              variant="dark"
              onPress={() => router.push('/find-a-pro')}
            />
          </View>
        </View>

        <Text allowFontScaling={false} style={styles.timeNote}>
          ВРЕМЯ ЭТОГО ШАГА · 12 MIN
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
