import React from 'react';
import { StyleSheet, Text, View, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PinGlyph, ArrowRightGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

const PLATFORMS: Array<{ name: string; tagline: string; color: string; url: string }> = [
  {
    name: 'Thumbtack',
    tagline: 'Get 3-5 quotes · free',
    color: '#1C6DFF',
    url: 'https://www.thumbtack.com/',
  },
  {
    name: 'Google Maps',
    tagline: 'Plumbers near 80203',
    color: '#34A853',
    url: 'https://www.google.com/maps/search/plumbers+near+80203',
  },
  {
    name: 'Yelp',
    tagline: 'Read local reviews',
    color: '#D32323',
    url: 'https://www.yelp.com/search?find_desc=plumbers&find_loc=80203',
  },
];

export default function FindAPro() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const open = async (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    try {
      await Linking.openURL(url);
    } catch {
      // ignore
    }
  };

  return (
    <Pressable style={styles.backdrop} onPress={() => router.back()} accessibilityLabel="Close">
      {Platform.OS === 'ios' ? (
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(26,16,10,0.55)' }]} />
      )}

      <Pressable
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        onPress={(e) => e.stopPropagation()}
      >
        <View style={styles.grabber} />

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <PinGlyph size={22} color={colors.primary} />
          </View>
          <View>
            <Eyebrow tone="coral">Find a pro near you</Eyebrow>
            <Text
              allowFontScaling={false}
              style={{
                marginTop: 4,
                fontFamily: fonts.heroItalicBold,
                fontSize: 26,
                color: colors.onSurface,
                letterSpacing: tracking.hero,
                lineHeight: 30,
              }}
            >
              Three trusted places.{'\n'}You choose.
            </Text>
          </View>
        </View>

        <View style={{ gap: spacing.md, marginTop: spacing.xl }}>
          {PLATFORMS.map((p) => (
            <Pressable
              key={p.name}
              onPress={() => open(p.url)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${p.name}`}
            >
              <GlassCard tint="default" radius="pill" padding={0}>
                <View style={styles.platformRow}>
                  <View style={[styles.platformSwatch, { backgroundColor: p.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: fonts.displayBold,
                        fontSize: typeScale.titleSmall,
                        color: colors.onSurface,
                        letterSpacing: tracking.hero,
                      }}
                    >
                      {p.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        marginTop: 2,
                        fontFamily: fonts.body,
                        fontSize: typeScale.bodySmall,
                        color: colors.onSurfaceVariant,
                      }}
                    >
                      {p.tagline}
                    </Text>
                  </View>
                  <ArrowRightGlyph size={16} color={colors.primary} />
                </View>
              </GlassCard>
            </Pressable>
          ))}
        </View>

        <Text
          allowFontScaling={false}
          style={styles.disclaimer}
        >
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
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  platformSwatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  disclaimer: {
    marginTop: spacing.xl,
    textAlign: 'center',
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodySmall,
    color: colors.tertiary,
    letterSpacing: tracking.label,
  },
});
