import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { CheckGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type Theme = 'system' | 'dark' | 'light';

const OPTIONS: Array<{ key: Theme; title: string; meta: string; ref: string; swatch: [string, string]; locked?: string }> = [
  { key: 'system', title: 'Follow system',    meta: 'Match iOS appearance setting',                ref: 'THM-01', swatch: ['#08080A', '#F5F5F7'] },
  { key: 'dark',   title: 'FixIt Noir',       meta: 'Industrial blueprint dark — recommended',     ref: 'THM-02', swatch: ['#08080A', '#FFA95C'] },
  { key: 'light',  title: 'Daylight (preview)', meta: 'Coming in v0.3 — not yet shipped',          ref: 'THM-03', swatch: ['#F5F5F7', '#1A0F05'], locked: 'PREVIEW' },
];

export default function AppearanceSettings() {
  const insets = useSafeAreaInsets();
  const [theme, setTheme] = useState<Theme>('dark');

  const select = (next: Theme, locked?: string) => {
    if (locked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      return;
    }
    Haptics.selectionAsync().catch(() => {});
    setTheme(next);
  };

  return (
    <NoirScreen>
      <NoirHeader brand="SET-03 · APPEARANCE" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>VISUAL · SURFACE</DocRef>
        <Text allowFontScaling={false} style={styles.title}>APPEARANCE</Text>
        <Text allowFontScaling={false} style={styles.body}>
          The whole app is built around the dark Noir surface. Light mode preview is on the v0.3 roadmap.
        </Text>

        <Label tone="tertiary" size="micro" style={styles.section}>Theme</Label>
        <View style={styles.group}>
          {OPTIONS.map((opt) => {
            const active = theme === opt.key;
            const disabled = !!opt.locked;
            return (
              <Pressable
                key={opt.key}
                onPress={() => select(opt.key, opt.locked)}
                accessibilityRole="radio"
                accessibilityLabel={opt.title}
                accessibilityState={{ selected: active, disabled }}
                hitSlop={4}
              >
                {({ pressed }) => (
                  <NoirCard
                    variant={active ? 'elevated' : 'default'}
                    radius="md"
                    padding={16}
                    style={[
                      styles.row,
                      active ? styles.activeRow : null,
                      disabled ? { opacity: 0.55 } : null,
                      pressed ? { opacity: 0.65 } : null,
                    ]}
                  >
                    <View style={[styles.swatch, { backgroundColor: opt.swatch[0] }]}>
                      <View style={[styles.swatchAccent, { backgroundColor: opt.swatch[1] }]} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <DocRef tone={active ? 'amber' : 'neutral'}>{opt.ref}</DocRef>
                      <Text allowFontScaling={false} style={styles.rowTitle}>{opt.title}</Text>
                      <Text allowFontScaling={false} style={styles.rowMeta}>{opt.meta}</Text>
                    </View>
                    {opt.locked ? (
                      <DocRef tone="cyan">{opt.locked}</DocRef>
                    ) : active ? (
                      <CheckGlyph size={20} color={colors.amber} />
                    ) : (
                      <View style={styles.radio} />
                    )}
                  </NoirCard>
                )}
              </Pressable>
            );
          })}
        </View>

        <Text allowFontScaling={false} style={styles.note}>
          Wallpapers, accent tints and font-size scale will land in v0.3.
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 40,
    lineHeight: 42,
    color: colors.text,
    letterSpacing: 1.2,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  group: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  activeRow: {
    borderColor: colors.hairlineAmber,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
  },
  swatchAccent: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  rowTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  rowMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
  },
  note: {
    marginTop: spacing.xxl,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
});
