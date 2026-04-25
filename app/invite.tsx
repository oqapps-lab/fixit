import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Clipboard, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { CheckGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { getMyProfile, getMyReferral } from '@/services/profile';

function shareCopyFor(code: string): string {
  return `I saved on home repairs with FixIt — try it with code ${code}: https://fixit.oqapps.com/r/${code}`;
}

export default function Invite() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [invited, setInvited] = useState(0);
  const [earned, setEarned] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([getMyProfile(), getMyReferral()])
      .then(([profile, referral]) => {
        if (cancelled) return;
        setCode(profile?.referral_code ?? '');
        setInvited(referral?.invited_count ?? 0);
        setEarned(referral?.earned_count ?? 0);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load referral');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const SHARE_COPY = shareCopyFor(code || 'FIXIT');

  const copyCode = () => {
    if (!code) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    Clipboard.setString(code);
    Alert.alert('Copied', `${code} is on your clipboard.`);
  };

  const share = async () => {
    Haptics.selectionAsync().catch(() => {});
    try {
      await Share.share({ message: SHARE_COPY });
    } catch {
      // silent — user cancelled
    }
  };

  return (
    <NoirScreen>
      <NoirHeader brand="REFERRAL · FRIENDS" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DocRef tone="amber">LOOP · VIRAL</DocRef>
        <Text allowFontScaling={false} style={styles.title}>BRING A{'\n'}FRIEND.</Text>
        <Text allowFontScaling={false} style={styles.body}>
          Share FixIt with anyone who’s ever paid a pro blind. You both earn a free estimate.
        </Text>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <NoirCard variant="outlined" radius="md" padding={18} style={{ marginTop: spacing.xl }}>
            <DocRef tone="danger">ERROR</DocRef>
            <Text allowFontScaling={false} style={styles.errorText}>{error}</Text>
          </NoirCard>
        ) : (
          <>
            {/* Code card */}
            <NoirCard variant="elevated" radius="lg" padding={22} style={{ marginTop: spacing.xl }}>
              <DocRef tone="amber">YOUR CODE</DocRef>
              <Text allowFontScaling={false} style={styles.code}>{code || '—'}</Text>
              <Text allowFontScaling={false} style={styles.codeMeta}>
                Works on any new install. Trial starts immediately.
              </Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
                <View style={{ flex: 1 }}>
                  <AmberCTA label="Copy" variant="outlined" size="md" onPress={copyCode} />
                </View>
                <View style={{ flex: 2 }}>
                  <AmberCTA label="Share link" variant="primary" size="md" onPress={share} />
                </View>
              </View>
            </NoirCard>

            {/* Stats */}
            <View style={styles.statsRow}>
              <NoirCard variant="default" radius="md" padding={16} style={{ flex: 1 }}>
                <DocRef tone="cyan">INVITED</DocRef>
                <HeroNumber value={String(invited)} size="md" tone="white" />
              </NoirCard>
              <NoirCard variant="default" radius="md" padding={16} style={{ flex: 1 }}>
                <DocRef tone="mint">EARNED</DocRef>
                <HeroNumber value={`+${earned}`} size="md" tone="mint" />
                <Text allowFontScaling={false} style={styles.statMeta}>free estimates</Text>
              </NoirCard>
            </View>

            {/* How it works */}
            <Label tone="tertiary" size="micro" style={styles.section}>How it works</Label>
            <View style={{ gap: spacing.sm }}>
              <Step
                n="01"
                title="Share your link"
                meta="Message, email, or any share sheet that pops up."
              />
              <Step
                n="02"
                title="They install + finish onboarding"
                meta="First ZIP + first photo. That’s all."
              />
              <Step
                n="03"
                title="Both of you unlock a free estimate"
                meta="Stackable — invite 10, earn 10. Fair enough."
              />
            </View>

            {/* Preview share copy */}
            <Label tone="tertiary" size="micro" style={styles.section}>Share preview</Label>
            <NoirCard variant="blueprint" radius="md" padding={18}>
              <DocRef tone="cyan">MESSAGE · PREVIEW</DocRef>
              <Text allowFontScaling={false} style={styles.sharePreview}>{SHARE_COPY}</Text>
            </NoirCard>

            <Text allowFontScaling={false} style={styles.disclaimer}>
              Referral credits apply to your next billing cycle. Fraud detection on duplicate installs.
            </Text>
          </>
        )}
      </ScrollView>
    </NoirScreen>
  );
}

function Step({ n, title, meta }: { n: string; title: string; meta: string }) {
  return (
    <NoirCard variant="default" radius="md" padding={16}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }}>
        <View style={styles.stepNum}>
          <Text allowFontScaling={false} style={styles.stepNumText}>{n}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text allowFontScaling={false} style={styles.stepTitle}>{title}</Text>
          <Text allowFontScaling={false} style={styles.stepMeta}>{meta}</Text>
        </View>
        <CheckGlyph size={16} color={colors.mint} />
      </View>
    </NoirCard>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  loadingWrap: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 42,
    color: colors.text,
    letterSpacing: 1.2,
    lineHeight: 44,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  code: {
    marginTop: spacing.sm,
    fontFamily: fonts.mono,
    fontSize: 24,
    color: colors.amber,
    letterSpacing: 2,
  },
  codeMeta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  statsRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statMeta: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.hairlineAmber,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.amberGlow,
  },
  stepNumText: {
    fontFamily: fonts.monoMedium,
    fontSize: 11,
    color: colors.amber,
    letterSpacing: tracking.docRef,
  },
  stepTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.text,
  },
  stepMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
  },
  sharePreview: {
    marginTop: spacing.sm,
    fontFamily: fonts.heroItalic,
    fontSize: 18,
    color: colors.text,
    lineHeight: 24,
  },
  disclaimer: {
    marginTop: spacing.xxl,
    fontFamily: fonts.mono,
    fontSize: typeScale.docRef,
    color: colors.textTertiary,
    letterSpacing: tracking.docRef,
    textAlign: 'center',
  },
});
