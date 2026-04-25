import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
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
import { listEstimates } from '@/services/estimates';
import { getMyProfile } from '@/services/profile';
import type { EstimateRow, ProfileRow } from '@/types/database';

export default function VaultTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [estimates, setEstimates] = useState<EstimateRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [p, e] = await Promise.all([getMyProfile(), listEstimates()]);
        if (cancelled) return;
        setProfile(p);
        setEstimates(e);
        setError(null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const savedCount = estimates.filter((e) => e.is_saved).length;
  const totalEstimates = estimates.length;
  const displayName = profile?.display_name ?? profile?.email ?? 'Your house';

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
        {error ? (
          <NoirCard
            variant="outlined"
            radius="md"
            padding={12}
            style={[styles.errorBanner, { borderColor: colors.hairlineDanger }]}
          >
            <Text allowFontScaling={false} style={styles.errorText}>
              {error}
            </Text>
          </NoirCard>
        ) : null}

        <NoirCard variant="elevated" radius="lg" padding={32} style={styles.emptyCard}>
          <View style={{ alignItems: 'center' }}>
            <HouseCalmIllustration size={160} />
          </View>

          {loading ? (
            <View style={{ marginTop: spacing.xl, alignItems: 'center' }}>
              <ActivityIndicator color={colors.amber} />
            </View>
          ) : (
            <>
              <Text
                allowFontScaling={false}
                style={styles.heroTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {displayName}
              </Text>
              <Text allowFontScaling={false} style={styles.heroBody}>
                {totalEstimates === 0
                  ? 'Snap a photo when something needs attention. Your saved fixes will live here.'
                  : `${totalEstimates} estimate${totalEstimates === 1 ? '' : 's'} on file · ${savedCount} saved.`}
              </Text>
            </>
          )}

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
            refLabel={`SAVED · ${savedCount} ITEM${savedCount === 1 ? '' : 'S'}`}
            tone="mint"
            onPress={() => router.push('/estimates')}
          />
          <CollectionRow
            label="Warranty Vault"
            refLabel="WARRANTY · COMING SOON"
            tone="cyan"
            disabled
            onPress={() => {}}
          />
          <CollectionRow
            label="Photo Journal"
            refLabel={`ESTIMATES · ${totalEstimates} FILE${totalEstimates === 1 ? '' : 'S'}`}
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
            refLabel="SECTOR · CONFIG"
            tone="amber"
            onPress={() => router.push('/settings')}
          />
          <CollectionRow
            label="Invite friends"
            refLabel="REFERRAL · +1 ESTIMATE"
            tone="mint"
            onPress={() => router.push('/invite')}
          />
        </View>
      </ScrollView>
    </NoirScreen>
  );
}

function CollectionRow({
  label, refLabel, tone, onPress, disabled,
}: {
  label: string;
  refLabel: string;
  tone: 'mint' | 'cyan' | 'amber' | 'neutral';
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={() => {
        if (disabled) return;
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={6}
    >
      {({ pressed }) => (
        <NoirCard
          variant="default"
          radius="md"
          padding={16}
          style={[
            { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
            pressed && !disabled ? { opacity: 0.65 } : null,
            disabled ? { opacity: 0.45 } : null,
          ]}
        >
          <View style={{ flex: 1 }}>
            <DocRef tone={tone === 'neutral' ? 'neutral' : tone}>{refLabel}</DocRef>
            <Text allowFontScaling={false} style={styles.collItem}>{label}</Text>
          </View>
          {disabled ? null : <ChevronRightGlyph size={14} color={colors.textTertiary} />}
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
  errorBanner: {
    marginTop: spacing.md,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.danger,
  },
});
