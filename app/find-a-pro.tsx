import React from 'react';
import { StyleSheet, Text, View, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { SerifHero } from '@/components/ui/SerifHero';
import { ChevronRightGlyph, PinGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

const PLATFORMS = [
  { name: 'Thumbtack',   meta: '3-5 quotes · free',        url: 'https://www.thumbtack.com/' },
  { name: 'Google Maps', meta: 'Plumbers near 80203',       url: 'https://www.google.com/maps/search/plumbers+near+80203' },
  { name: 'Yelp',        meta: 'Local reviews',             url: 'https://www.yelp.com/search?find_desc=plumbers&find_loc=80203' },
];

export default function FindAPro() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const open = async (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try { await Linking.openURL(url); } catch {}
  };

  const close = () => {
    if (router.canGoBack()) router.back(); else router.replace('/(tabs)');
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim }]} />
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + spacing.xxl, paddingTop: spacing.lg },
        ]}
      >
        <View style={styles.grabber} />

        <View style={styles.header}>
          <DocRef>PRO_ARCHITECT</DocRef>
          <DocRef tone="cyan">ARCHITECTURAL · 0.4 MI</DocRef>
        </View>

        <View style={styles.heroWrap}>
          <PinGlyph size={28} color={colors.cyan} />
          <SerifHero size={32} align="center" style={{ marginTop: spacing.md }}>
            Find a pro
          </SerifHero>
          <DocRef align="center" tone="neutral" style={{ marginTop: 6 }}>
            ARCHITECTURAL MAINTENANCE SEARCH
          </DocRef>
        </View>

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Handoff channels
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {PLATFORMS.map((p) => (
            <Pressable
              key={p.name}
              onPress={() => open(p.url)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${p.name}`}
            >
              <NoirCard variant="default" radius="md" padding={16}>
                <View style={styles.pRow}>
                  <View style={styles.pDot} />
                  <View style={{ flex: 1 }}>
                    <Text allowFontScaling={false} style={styles.pName}>{p.name.toUpperCase()}</Text>
                    <DocRef>{p.meta}</DocRef>
                  </View>
                  <ChevronRightGlyph size={14} color={colors.cyan} />
                </View>
              </NoirCard>
            </Pressable>
          ))}
        </View>

        <Text allowFontScaling={false} style={styles.disclaimer}>
          We don't earn from these links. Pick whoever you trust.
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
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
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroWrap: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  pRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cyan,
  },
  pName: {
    fontFamily: fonts.displayBold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
    marginBottom: 2,
  },
  disclaimer: {
    marginTop: spacing.xxl,
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
});
