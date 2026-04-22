import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { MOCK_ESTIMATES, formatCapturedAt, type Estimate, type Room } from '@/mock/estimates';

type RoomMeta = {
  label: string;
  tagline: string;
  fields: Array<{ label: string; value: string; hint: string }>;
};

const ROOM_META: Record<Room, RoomMeta> = {
  kitchen: {
    label: 'Kitchen',
    tagline: 'Highest water / electrical density. Worth the notes.',
    fields: [
      { label: 'Faucet brand',       value: 'Moen',            hint: 'Model 7294 (2021)' },
      { label: 'Appliance make',     value: 'Bosch',           hint: 'Dishwasher SHPM78Z55N' },
      { label: 'Shutoff valve',      value: 'Under sink · L',  hint: 'Quarter-turn, Pro unlock' },
    ],
  },
  bath: {
    label: 'Bathroom',
    tagline: 'Tile + grout + hidden pipes. Document now, save later.',
    fields: [
      { label: 'Tile make',          value: 'Daltile',         hint: 'Continental Slate 12x12' },
      { label: 'Grout type',         value: 'Sanded',          hint: 'Mapei Ultracolor Plus FA' },
      { label: 'Shutoff valve',      value: 'Behind toilet',   hint: 'Compression — consider swap' },
    ],
  },
  living: {
    label: 'Living Room',
    tagline: 'Softer wear. Walls + floors + the one good hinge.',
    fields: [
      { label: 'Wall paint',         value: 'Benjamin Moore',  hint: 'Revere Pewter HC-172' },
      { label: 'Floor finish',       value: 'Oak · satin',     hint: 'Bona Traffic HD' },
      { label: 'Outlets',            value: '4 × duplex',      hint: '2020 service upgrade' },
    ],
  },
  bedroom: {
    label: 'Bedroom',
    tagline: 'Mostly cosmetic — still worth the paint code.',
    fields: [
      { label: 'Wall paint',         value: 'Farrow & Ball',   hint: 'Pitch Black 256' },
      { label: 'Window type',        value: 'Double-hung',     hint: 'Andersen 400' },
      { label: 'Closet',             value: 'Built-in',        hint: 'Pre-2015' },
    ],
  },
  exterior: {
    label: 'Exterior',
    tagline: 'Seasonal maintenance hotspot.',
    fields: [
      { label: 'Siding',             value: 'Hardie plank',    hint: 'Installed 2016' },
      { label: 'Gutter',             value: 'Aluminum',        hint: 'With leaf-guard' },
      { label: 'Roof material',      value: 'Asphalt · 30-yr', hint: 'Mid-life — inspect yearly' },
    ],
  },
  laundry: {
    label: 'Laundry',
    tagline: 'Hot / cold / drain — three failure surfaces.',
    fields: [
      { label: 'Washer',             value: 'Samsung',         hint: 'WF45T6000AW · 2021' },
      { label: 'Dryer',              value: 'Samsung',         hint: 'DVE45T6000W · 2021' },
      { label: 'Drain',              value: 'Standpipe 2"',    hint: 'Vented properly' },
    ],
  },
  garage: {
    label: 'Garage',
    tagline: 'Door motor + slab cracks + storage insulation.',
    fields: [
      { label: 'Door opener',        value: 'LiftMaster',      hint: '8550WLB, belt drive' },
      { label: 'Insulation',         value: 'R-13 walls',      hint: 'Ceiling uninsulated' },
      { label: 'Floor',              value: 'Sealed concrete', hint: 'Hairline crack NW corner' },
    ],
  },
  attic: {
    label: 'Attic',
    tagline: 'Nobody looks up here. That is why leaks win.',
    fields: [
      { label: 'Insulation',         value: 'Blown cellulose', hint: 'R-38 (2019 top-off)' },
      { label: 'Ventilation',        value: 'Ridge + soffit',  hint: 'Baffles installed' },
      { label: 'Access',             value: 'Pull-down ladder', hint: 'Insulated hatch cover' },
    ],
  },
};

export default function RoomDetail() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();
  const roomKey = (name as Room) ?? 'kitchen';
  const meta = ROOM_META[roomKey] ?? ROOM_META.kitchen;

  const related = MOCK_ESTIMATES.filter((e) => e.room === roomKey);
  const totalSaved = related.reduce((acc, e) => acc + (e.savingsVsPro ?? 0), 0);

  const goEstimate = (e: Estimate) => {
    Haptics.selectionAsync().catch(() => {});
    router.push(`/estimates/${e.id}` as any);
  };

  const newEstimate = () => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/your-house');
  };

  return (
    <NoirScreen>
      <NoirHeader brand={`ROOM · ${meta.label.toUpperCase()}`} showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef>BLUEPRINT · ROOM</DocRef>
        <Text allowFontScaling={false} style={styles.title}>{meta.label.toUpperCase()}</Text>
        <Text allowFontScaling={false} style={styles.body}>{meta.tagline}</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <DocRef tone="cyan">ESTIMATES</DocRef>
            <Text allowFontScaling={false} style={styles.statNumber}>{related.length}</Text>
          </View>
          <View style={styles.statBox}>
            <DocRef tone="mint">SAVED VS PRO</DocRef>
            <Text allowFontScaling={false} style={styles.statNumber}>{`$${totalSaved}`}</Text>
          </View>
          <View style={styles.statBox}>
            <DocRef tone="amber">FIELDS</DocRef>
            <Text allowFontScaling={false} style={styles.statNumber}>{meta.fields.length}</Text>
          </View>
        </View>

        {/* Metadata */}
        <Label tone="tertiary" size="micro" style={styles.section}>Metadata</Label>
        <View style={{ gap: spacing.sm }}>
          {meta.fields.map((f, i) => (
            <NoirCard key={`${f.label}-${i}`} variant="default" radius="md" padding={16}>
              <DocRef>{`FIELD · ${String(i + 1).padStart(2, '0')}`}</DocRef>
              <View style={styles.fieldRow}>
                <View style={{ flex: 1 }}>
                  <Text allowFontScaling={false} style={styles.fieldLabel}>{f.label}</Text>
                  <Text allowFontScaling={false} style={styles.fieldValue}>{f.value}</Text>
                  <Text allowFontScaling={false} style={styles.fieldHint}>{f.hint}</Text>
                </View>
              </View>
            </NoirCard>
          ))}
        </View>

        {/* Related estimates */}
        <Label tone="tertiary" size="micro" style={styles.section}>Estimates in this room</Label>
        {related.length === 0 ? (
          <NoirCard variant="outlined" radius="md" padding={18}>
            <Text allowFontScaling={false} style={styles.emptyTitle}>No estimates yet</Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>
              Snap a photo of anything here and FixIt will start the timeline.
            </Text>
          </NoirCard>
        ) : (
          <View style={{ gap: spacing.sm }}>
            {related.map((e) => (
              <Pressable
                key={e.id}
                onPress={() => goEstimate(e)}
                accessibilityRole="button"
                accessibilityLabel={`${e.title} · ${formatCapturedAt(e.capturedAt)}`}
                hitSlop={4}
              >
                {({ pressed }) => (
                  <NoirCard
                    variant="default"
                    radius="md"
                    padding={14}
                    style={[
                      { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
                      pressed ? { opacity: 0.7 } : null,
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <DocRef tone={e.severity === 'moderate' ? 'amber' : 'neutral'}>{e.code}</DocRef>
                      <Text allowFontScaling={false} style={styles.relTitle}>{e.title}</Text>
                      <Text allowFontScaling={false} style={styles.relMeta}>
                        {`${formatCapturedAt(e.capturedAt)} · $${
                          e.chosenMode === 'diy' ? e.diyPrice : e.chosenMode === 'hybrid' ? e.hybridPrice : e.proPrice
                        }`}
                      </Text>
                    </View>
                    <ChevronRightGlyph size={14} color={colors.textTertiary} />
                  </NoirCard>
                )}
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: spacing.xxxl }} />
        <AmberCTA
          label={`New estimate in ${meta.label}`}
          variant="primary"
          size="lg"
          onPress={newEstimate}
        />
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
    color: colors.text,
    letterSpacing: 1.4,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  statsRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    padding: 14,
    backgroundColor: colors.glass1,
  },
  statNumber: {
    marginTop: 4,
    fontFamily: fonts.displayBold,
    fontSize: 28,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  fieldRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  fieldValue: {
    marginTop: 2,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  fieldHint: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  relTitle: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  relMeta: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textSecondary,
    letterSpacing: tracking.docRef,
  },
  emptyTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.textSecondary,
  },
  emptyMeta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textTertiary,
  },
});
