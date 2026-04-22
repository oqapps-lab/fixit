import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ChevronRightGlyph, HouseCalmIllustration } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function VaultTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="ARCHITECT.REPAIR" showMenu />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.md,
            paddingBottom: insets.bottom + 130,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <NoirCard variant="elevated" radius="lg" padding={32} style={styles.emptyCard}>
          <View style={{ alignItems: 'center' }}>
            <HouseCalmIllustration size={160} />
          </View>

          <Text allowFontScaling={false} style={styles.heroTitle}>
            Your house is calm
          </Text>
          <Text allowFontScaling={false} style={styles.heroBody}>
            Snap a photo when something needs attention. Your saved fixes will live here.
          </Text>

          <AmberCTA
            label="Take a photo →"
            variant="outlined"
            size="md"
            onPress={() => router.push('/your-house')}
            style={{ marginTop: spacing.xxl, alignSelf: 'center', width: '70%' }}
          />
        </NoirCard>

        {/* Sub-nav chips */}
        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Collections
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          <CollectionRow
            label="Saved Projects"
            ref="SAVED · 0 ITEMS"
            tone="mint"
            onPress={() => router.push('/saved-projects' as any)}
          />
          <CollectionRow
            label="Warranty Vault"
            ref="WARRANTY · 3 TRACKED"
            tone="cyan"
            onPress={() => router.push('/warranty')}
          />
          <CollectionRow
            label="Photo Journal"
            ref="PHOTOS · 12 FILES"
            tone="neutral"
            onPress={() => router.push('/your-house')}
          />
        </View>

        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxxl }}>
          Account
        </Label>
        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          <CollectionRow
            label="Settings"
            ref="SECTOR · CONFIG"
            tone="amber"
            onPress={() => router.push('/settings')}
          />
          <CollectionRow
            label="Invite friends"
            ref="REFERRAL · +1 ESTIMATE"
            tone="mint"
            onPress={() => router.push('/invite' as any)}
          />
        </View>
      </ScrollView>
    </NoirScreen>
  );
}

function CollectionRow({
  label, ref, tone, onPress,
}: {
  label: string;
  ref: string;
  tone: 'mint' | 'cyan' | 'amber' | 'neutral';
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
    >
      {({ pressed }) => (
        <NoirCard
          variant="default"
          radius="md"
          padding={16}
          style={[
            { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
            pressed ? { opacity: 0.65 } : null,
          ]}
        >
          <View style={{ flex: 1 }}>
            <DocRef tone={tone === 'neutral' ? 'neutral' : tone}>{ref}</DocRef>
            <Text allowFontScaling={false} style={styles.collItem}>{label}</Text>
          </View>
          <ChevronRightGlyph size={14} color={colors.textTertiary} />
        </NoirCard>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  emptyCard: {
    marginTop: spacing.xl,
  },
  heroTitle: {
    marginTop: spacing.xl,
    fontFamily: fonts.displayExtraBold,
    fontSize: 28,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: tracking.tight,
  },
  heroBody: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  collItem: {
    marginTop: 4,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
});
