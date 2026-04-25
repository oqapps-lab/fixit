import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { SerifHero } from '@/components/ui/SerifHero';
import { colors, fonts, radii, spacing, typeScale } from '@/constants/tokens';

/**
 * Presented as transparentModal from repair-detail after first estimate.
 * "Save this estimate — $165 saved" hook.
 */
export default function SignupAsk() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  return (
    <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrimStrong }]} />

      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={[
          styles.sheet,
          {
            paddingTop: spacing.lg,
            paddingBottom: insets.bottom + spacing.xl,
          },
        ]}
      >
        <View style={styles.grabber} />

        <DocRef align="center">SECTOR · ACCOUNT · SAVE STATE</DocRef>

        <View style={styles.header}>
          <Label tone="amber" size="micro" align="center">
            You'd save going DIY
          </Label>
          <HeroNumber value="$165" size="xl" tone="amber" align="center" style={{ marginTop: 4 }} />
          <SerifHero size={26} align="center" style={{ marginTop: spacing.md }}>
            Keep this estimate?
          </SerifHero>
          <Text allowFontScaling={false} style={styles.body}>
            Save for later · get price alerts · export PDF when you need to argue with a pro.
          </Text>
        </View>

        <View style={styles.options}>
          <AmberCTA
            label="Continue with Apple"
            variant="glass"
            size="lg"
            onPress={() => router.replace('/(tabs)')}
          />
          <AmberCTA
            label="Continue with Google"
            variant="glass"
            size="lg"
            onPress={() => router.replace('/(tabs)')}
          />
          <AmberCTA
            label="Sign up with email"
            variant="primary"
            size="lg"
            onPress={() => router.push('/(auth)/sign-up')}
          />
        </View>

        <Pressable
          onPress={close}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Continue without signing up"
          style={styles.skip}
        >
          <Text allowFontScaling={false} style={styles.skipText}>
            Not now — I'll lose this estimate
          </Text>
        </Pressable>
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
    marginTop: spacing.md,
    alignItems: 'center',
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  options: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  skip: {
    marginTop: spacing.lg,
    alignSelf: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textTertiary,
  },
});
