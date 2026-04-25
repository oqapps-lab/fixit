import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type Channel = {
  key: 'progress' | 'seasonal' | 'pricedrop' | 'savings' | 'tips';
  title: string;
  meta: string;
  defaultOn: boolean;
  ref: string;
  tone: 'cyan' | 'amber' | 'mint' | 'neutral';
};

const CHANNELS: Channel[] = [
  { key: 'progress',  title: 'Project progress',     meta: 'Step reminders for active repairs',                      defaultOn: true,  ref: 'CH-01', tone: 'cyan' },
  { key: 'seasonal',  title: 'Seasonal maintenance', meta: '“Spring is coming — three small fixes worth knowing”',   defaultOn: true,  ref: 'CH-02', tone: 'amber' },
  { key: 'pricedrop', title: 'Price drop alerts',    meta: 'When a watched material drops 10%+',                     defaultOn: true,  ref: 'CH-03', tone: 'mint' },
  { key: 'savings',   title: 'Savings anniversary',  meta: '“Remember the $185 you saved? It’s been a year.”',       defaultOn: true,  ref: 'CH-04', tone: 'amber' },
  { key: 'tips',      title: 'FixIt tips',           meta: 'Marketing — off by default',                             defaultOn: false, ref: 'CH-05', tone: 'neutral' },
];

export default function NotificationsSettings() {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<Record<Channel['key'], boolean>>(() =>
    CHANNELS.reduce((acc, c) => ({ ...acc, [c.key]: c.defaultOn }), {} as Record<Channel['key'], boolean>),
  );
  const [quietHours, setQuietHours] = useState(true);

  const toggle = (key: Channel['key']) => {
    Haptics.selectionAsync().catch(() => {});
    setState((s) => ({ ...s, [key]: !s[key] }));
  };

  const toggleQuiet = () => {
    Haptics.selectionAsync().catch(() => {});
    setQuietHours((v) => !v);
  };

  return (
    <NoirScreen>
      <NoirHeader brand="SET-02 · NOTIFICATIONS" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>SIGNAL · CONFIGURATION</DocRef>
        <Text allowFontScaling={false} style={styles.title}>NOTIFICATIONS</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Choose only the signals you want. We err quiet — defaults skip marketing.
        </Text>

        <Label tone="tertiary" size="micro" style={styles.section}>Channels</Label>
        <View style={styles.group}>
          {CHANNELS.map((c) => (
            <Pressable
              key={c.key}
              onPress={() => toggle(c.key)}
              accessibilityRole="switch"
              accessibilityLabel={c.title}
              accessibilityState={{ checked: state[c.key] }}
              hitSlop={4}
            >
              {({ pressed }) => (
                <NoirCard
                  variant="default"
                  radius="md"
                  padding={16}
                  style={[styles.row, pressed ? { opacity: 0.65 } : null]}
                >
                  <View style={[styles.dot, dotTone(c.tone)]} />
                  <View style={{ flex: 1 }}>
                    <DocRef tone={c.tone}>{c.ref}</DocRef>
                    <Text allowFontScaling={false} style={styles.rowTitle}>{c.title}</Text>
                    <Text allowFontScaling={false} style={styles.rowMeta}>{c.meta}</Text>
                  </View>
                  <Switch
                    value={state[c.key]}
                    onValueChange={() => toggle(c.key)}
                    trackColor={{ false: colors.surface3, true: colors.amberDeep }}
                    thumbColor={state[c.key] ? colors.amberBright : colors.textTertiary}
                    ios_backgroundColor={colors.surface3}
                  />
                </NoirCard>
              )}
            </Pressable>
          ))}
        </View>

        <Label tone="tertiary" size="micro" style={styles.section}>Schedule</Label>
        <Pressable
          onPress={toggleQuiet}
          accessibilityRole="switch"
          accessibilityLabel="Quiet hours"
          accessibilityState={{ checked: quietHours }}
          hitSlop={4}
        >
          {({ pressed }) => (
            <NoirCard
              variant="default"
              radius="md"
              padding={16}
              style={[styles.row, pressed ? { opacity: 0.65 } : null]}
            >
              <View style={{ flex: 1 }}>
                <DocRef tone="cyan">SCHED-01</DocRef>
                <Text allowFontScaling={false} style={styles.rowTitle}>Quiet hours</Text>
                <Text allowFontScaling={false} style={styles.rowMeta}>10:00 PM → 7:00 AM · local</Text>
              </View>
              <Switch
                value={quietHours}
                onValueChange={toggleQuiet}
                trackColor={{ false: colors.surface3, true: colors.amberDeep }}
                thumbColor={quietHours ? colors.amberBright : colors.textTertiary}
                ios_backgroundColor={colors.surface3}
              />
            </NoirCard>
          )}
        </Pressable>

        <Text allowFontScaling={false} style={styles.note}>
          System permissions are managed in iOS Settings → FixIt Noir → Notifications.
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

function dotTone(tone: Channel['tone']) {
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
    fontSize: 36,
    lineHeight: 38,
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
  note: {
    marginTop: spacing.xxl,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
});
