import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { ChevronRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type Row = {
  title: string;
  meta: string;
  href: '/settings/account' | '/settings/notifications' | '/settings/appearance' | '/settings/privacy' | '/paywall/manage';
  toneCode: 'cyan' | 'amber' | 'mint' | 'neutral';
  ref: string;
};

const PROFILE: Row[] = [
  { title: 'Account',                meta: 'Email · password · sessions',         href: '/settings/account',       toneCode: 'cyan',   ref: 'SET-01' },
  { title: 'Notifications',          meta: 'Per-channel opt-ins · quiet hours',   href: '/settings/notifications', toneCode: 'amber',  ref: 'SET-02' },
  { title: 'Appearance',             meta: 'Theme · system follow',               href: '/settings/appearance',    toneCode: 'mint',   ref: 'SET-03' },
];

const DATA: Row[] = [
  { title: 'Privacy & data',         meta: 'Photo retention · export · delete',   href: '/settings/privacy',       toneCode: 'neutral', ref: 'SET-04' },
  { title: 'Subscription',           meta: 'Plan · billing · cancel',             href: '/paywall/manage',         toneCode: 'amber',   ref: 'SET-05' },
];

export default function SettingsIndex() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const go = (href: Row['href']) => {
    Haptics.selectionAsync().catch(() => {});
    router.push(href);
  };

  return (
    <NoirScreen>
      <NoirHeader brand="SECTOR · SETTINGS" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>SYSTEM · CONFIGURATION</DocRef>
        <Text allowFontScaling={false} style={styles.title}>SETTINGS</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Tune FixIt to your house. Defaults are sane; adjust only if needed.
        </Text>

        <Label tone="tertiary" size="micro" style={styles.section}>Profile</Label>
        <View style={styles.group}>
          {PROFILE.map((row) => (
            <SettingsRow key={row.href} row={row} onPress={() => go(row.href)} />
          ))}
        </View>

        <Label tone="tertiary" size="micro" style={styles.section}>Data & Plan</Label>
        <View style={styles.group}>
          {DATA.map((row) => (
            <SettingsRow key={row.href} row={row} onPress={() => go(row.href)} />
          ))}
        </View>

        <Text allowFontScaling={false} style={styles.version}>FIXIT NOIR · v0.2.0 · BUILD FP-052</Text>
      </ScrollView>
    </NoirScreen>
  );
}

function SettingsRow({ row, onPress }: { row: Row; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${row.title}. ${row.meta}`}
      hitSlop={6}
    >
      {({ pressed }) => (
        <NoirCard
          variant="default"
          radius="md"
          padding={16}
          style={[styles.row, pressed ? { opacity: 0.65 } : null]}
        >
          <View style={[styles.dot, dotTone(row.toneCode)]} />
          <View style={{ flex: 1 }}>
            <DocRef tone={row.toneCode === 'neutral' ? 'neutral' : row.toneCode}>{row.ref}</DocRef>
            <Text allowFontScaling={false} style={styles.rowTitle}>{row.title}</Text>
            <Text allowFontScaling={false} style={styles.rowMeta}>{row.meta}</Text>
          </View>
          <ChevronRightGlyph size={14} color={colors.textTertiary} />
        </NoirCard>
      )}
    </Pressable>
  );
}

function dotTone(tone: Row['toneCode']) {
  switch (tone) {
    case 'cyan':   return { backgroundColor: colors.cyan };
    case 'amber':  return { backgroundColor: colors.amber };
    case 'mint':   return { backgroundColor: colors.mint };
    default:       return { backgroundColor: colors.textTertiary };
  }
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 44,
    lineHeight: 46,
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  version: {
    marginTop: spacing.huge,
    textAlign: 'center',
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
});
