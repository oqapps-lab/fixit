import React, { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ChevronRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type Retention = '30d' | '90d' | 'forever';

const RETENTIONS: Array<{ key: Retention; title: string; meta: string; ref: string }> = [
  { key: '30d',     title: '30 days',     meta: 'Auto-purge after a month — minimal footprint',          ref: 'KEEP-01' },
  { key: '90d',     title: '90 days',     meta: 'Recommended — covers most warranty windows',            ref: 'KEEP-02' },
  { key: 'forever', title: 'Keep forever', meta: 'Photos stay until you delete them',                    ref: 'KEEP-03' },
];

export default function PrivacySettings() {
  const insets = useSafeAreaInsets();
  const [retention, setRetention] = useState<Retention>('90d');
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);
  const [crashReports, setCrashReports] = useState(true);

  const setKeep = (next: Retention) => {
    Haptics.selectionAsync().catch(() => {});
    setRetention(next);
  };

  const onExport = () => {
    Haptics.selectionAsync().catch(() => {});
    Alert.alert('Export started', 'A signed JSON of your projects will be emailed within 24 hours.');
  };

  const onDeletePhotos = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    Alert.alert(
      'Delete all photos?',
      'AI estimates and notes are kept; only the source photos are removed. You can re-upload at any time.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete photos', style: 'destructive' },
      ],
    );
  };

  const openPolicy = (url: string) => {
    Haptics.selectionAsync().catch(() => {});
    Linking.openURL(url).catch(() => {});
  };

  return (
    <NoirScreen>
      <NoirHeader brand="SET-04 · PRIVACY" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>DATA · CONTROL</DocRef>
        <Text allowFontScaling={false} style={styles.title}>PRIVACY{'\n'}& DATA</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Photos stay on your account, never sold, never shared. Tighten or loosen below.
        </Text>

        <Label tone="tertiary" size="micro" style={styles.section}>Photo retention</Label>
        <View style={styles.group}>
          {RETENTIONS.map((opt) => {
            const active = retention === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setKeep(opt.key)}
                accessibilityRole="radio"
                accessibilityLabel={opt.title}
                accessibilityState={{ selected: active }}
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
                      pressed ? { opacity: 0.65 } : null,
                    ]}
                  >
                    <View style={[styles.radio, active ? styles.radioActive : null]}>
                      {active ? <View style={styles.radioInner} /> : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      <DocRef tone={active ? 'amber' : 'neutral'}>{opt.ref}</DocRef>
                      <Text allowFontScaling={false} style={styles.rowTitle}>{opt.title}</Text>
                      <Text allowFontScaling={false} style={styles.rowMeta}>{opt.meta}</Text>
                    </View>
                  </NoirCard>
                )}
              </Pressable>
            );
          })}
        </View>

        <Label tone="tertiary" size="micro" style={styles.section}>Analytics</Label>
        <NoirCard variant="default" radius="md" padding={16} style={styles.row}>
          <View style={{ flex: 1 }}>
            <DocRef tone="cyan">ANL-01</DocRef>
            <Text allowFontScaling={false} style={styles.rowTitle}>Opt out of usage analytics</Text>
            <Text allowFontScaling={false} style={styles.rowMeta}>
              Anonymous events that help us tune AI accuracy. No personal data.
            </Text>
          </View>
          <Switch
            value={analyticsOptOut}
            onValueChange={(v) => {
              Haptics.selectionAsync().catch(() => {});
              setAnalyticsOptOut(v);
            }}
            trackColor={{ false: colors.surface3, true: colors.amberDeep }}
            thumbColor={analyticsOptOut ? colors.amberBright : colors.textTertiary}
            ios_backgroundColor={colors.surface3}
          />
        </NoirCard>

        <NoirCard variant="default" radius="md" padding={16} style={[styles.row, { marginTop: spacing.sm }]}>
          <View style={{ flex: 1 }}>
            <DocRef tone="mint">ANL-02</DocRef>
            <Text allowFontScaling={false} style={styles.rowTitle}>Crash reports</Text>
            <Text allowFontScaling={false} style={styles.rowMeta}>Sentry-style stack traces. Critical for stability.</Text>
          </View>
          <Switch
            value={crashReports}
            onValueChange={(v) => {
              Haptics.selectionAsync().catch(() => {});
              setCrashReports(v);
            }}
            trackColor={{ false: colors.surface3, true: colors.amberDeep }}
            thumbColor={crashReports ? colors.amberBright : colors.textTertiary}
            ios_backgroundColor={colors.surface3}
          />
        </NoirCard>

        <Label tone="tertiary" size="micro" style={styles.section}>Your data</Label>
        <AmberCTA label="Export my data (JSON)" variant="outlined" size="md" onPress={onExport} />
        <View style={{ height: spacing.sm }} />
        <AmberCTA label="Delete all photos" variant="dark" size="md" onPress={onDeletePhotos} />

        <Label tone="tertiary" size="micro" style={styles.section}>Policies</Label>
        <PolicyRow label="Privacy policy"      ref="POL-01" onPress={() => openPolicy('https://oqapps.com/fixit/privacy')} />
        <PolicyRow label="Terms of service"    ref="POL-02" onPress={() => openPolicy('https://oqapps.com/fixit/terms')} />
        <PolicyRow label="Open-source licenses" ref="POL-03" onPress={() => openPolicy('https://oqapps.com/fixit/licenses')} />

        <Text allowFontScaling={false} style={styles.note}>
          GDPR · CCPA compliant. Questions: privacy@oqapps.com.
        </Text>
      </ScrollView>
    </NoirScreen>
  );
}

function PolicyRow({ label, ref, onPress }: { label: string; ref: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={label}
      hitSlop={4}
    >
      {({ pressed }) => (
        <NoirCard
          variant="default"
          radius="md"
          padding={14}
          style={[
            { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm },
            pressed ? { opacity: 0.65 } : null,
          ]}
        >
          <View style={{ flex: 1 }}>
            <DocRef>{ref}</DocRef>
            <Text allowFontScaling={false} style={{ fontFamily: 'Inter_600SemiBold', color: '#F5F5F7', fontSize: 14, marginTop: 2 }}>
              {label}
            </Text>
          </View>
          <ChevronRightGlyph size={14} color={colors.textTertiary} />
        </NoirCard>
      )}
    </Pressable>
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
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.4,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.amber,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.amber,
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
