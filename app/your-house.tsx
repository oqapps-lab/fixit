import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { HouseWireframe, PulseDot } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function YourHouse() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="First Estimate" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.lg,
            paddingBottom: insets.bottom + spacing.xxxl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>INITIAL SCAN · 2 ISSUES FOUND</DocRef>
        <Text allowFontScaling={false} style={styles.title}>YOUR HOUSE</Text>

        <NoirCard variant="blueprint" radius="lg" padding={24} style={styles.scanCard}>
          <View style={styles.wireframeWrap}>
            <HouseWireframe size={260} />

            {/* Tags */}
            <View style={[styles.tag, { top: '18%', right: '6%', backgroundColor: colors.cyanTint15, borderColor: colors.cyan }]}>
              <Text style={[styles.tagText, { color: colors.cyan }]}>ROOF INTEGRITY</Text>
            </View>
            <View style={[styles.tag, { top: '58%', left: '10%', backgroundColor: colors.amberTint15, borderColor: colors.amber }]}>
              <Text style={[styles.tagText, { color: colors.amber }]}>MAIN LINE</Text>
            </View>

            {/* Pulse dots */}
            <View style={{ position: 'absolute', top: '24%', right: '18%' }}>
              <PulseDot size={8} color={colors.cyan} />
            </View>
            <View style={{ position: 'absolute', top: '66%', left: '22%' }}>
              <PulseDot size={8} color={colors.amber} />
            </View>
          </View>
        </NoirCard>

        <View style={styles.summaryRow}>
          <NoirCard variant="default" radius="md" padding={14} style={styles.summaryCard}>
            <DocRef tone="cyan">LOW</DocRef>
            <Text allowFontScaling={false} style={styles.summaryTitle}>Roof Integrity</Text>
            <Text allowFontScaling={false} style={styles.summaryMeta}>Sub-layer flex within spec</Text>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={14} style={styles.summaryCard}>
            <DocRef tone="amber">MODERATE</DocRef>
            <Text allowFontScaling={false} style={styles.summaryTitle}>Main Line</Text>
            <Text allowFontScaling={false} style={styles.summaryMeta}>Pressure drop 12% · monitor</Text>
          </NoirCard>
        </View>

        <AmberCTA
          label="Review fixes"
          variant="primary"
          onPress={() => router.push('/fix-selection')}
          style={{ marginTop: spacing.xxl }}
        />
        <Pressable
          onPress={() => router.back()}
          style={styles.skip}
          accessibilityRole="button"
          accessibilityLabel="Scan again"
          hitSlop={8}
        >
          <Text allowFontScaling={false} style={styles.skipText}>Re-scan</Text>
        </Pressable>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 42,
    color: colors.text,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  scanCard: { marginTop: spacing.xl, alignItems: 'center' },
  wireframeWrap: {
    width: 260,
    height: 260,
    position: 'relative',
  },
  tag: {
    position: 'absolute',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  tagText: {
    fontFamily: fonts.labelSemibold,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  summaryRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryCard: { flex: 1 },
  summaryTitle: {
    marginTop: 6,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  summaryMeta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  skip: { alignSelf: 'center', marginTop: spacing.md, paddingVertical: spacing.sm },
  skipText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textTertiary,
  },
});
