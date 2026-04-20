import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '@/components/ui/AtmosphericGradient';
import { OrbField } from '@/components/ui/OrbField';
import { GlassCard } from '@/components/ui/GlassCard';
import { PillCTA } from '@/components/ui/PillCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DotRow } from '@/components/ui/TokenDot';
import { PinGlyph, ArrowRightGlyph } from '@/components/ui/Glyphs';
import { colors, fonts, spacing, tracking, typeScale, radii } from '@/constants/tokens';

export default function Location() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [zip, setZip] = useState('');
  const valid = /^\d{5}$/.test(zip);

  return (
    <AtmosphericGradient theme="sanctuary">
      <OrbField />

      <View style={[styles.content, { paddingTop: insets.top + spacing.huge, paddingBottom: insets.bottom + spacing.xxxl }]}>
        <Eyebrow tone="slate">Step 1 of 3</Eyebrow>
        <Text
          allowFontScaling={false}
          style={{
            marginTop: spacing.sm,
            fontFamily: fonts.heroItalicBold,
            fontSize: 38,
            color: colors.onSurface,
            letterSpacing: tracking.heroDisplay,
          }}
        >
          Where do you live?
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            marginTop: spacing.md,
            fontFamily: fonts.body,
            fontSize: typeScale.bodyLarge,
            color: colors.onSurfaceVariant,
            lineHeight: 24,
          }}
        >
          Prices vary 40%+ by region. Denver ≠ Memphis — we price to your ZIP.
        </Text>

        {/* ZIP input as a horizontal glass plane */}
        <View style={styles.inputWrap}>
          <Eyebrow tone="slate" size="micro" style={{ marginBottom: 6 }}>
            Your ZIP code
          </Eyebrow>
          <GlassCard tint="default" radius="md" padding={0}>
            <View style={styles.inputRow}>
              <PinGlyph size={20} color={colors.primary} />
              <TextInput
                value={zip}
                onChangeText={(t) => setZip(t.replace(/[^\d]/g, '').slice(0, 5))}
                keyboardType="number-pad"
                placeholder="80203"
                placeholderTextColor={colors.outline}
                maxLength={5}
                style={styles.input}
                accessibilityLabel="ZIP code"
              />
              <View style={{ width: 20 }} />
            </View>
          </GlassCard>

          <Pressable
            onPress={() => setZip('80203')}
            style={styles.useLocation}
            accessibilityRole="button"
            accessibilityLabel="Use my location"
            hitSlop={8}
          >
            <ArrowRightGlyph size={14} color={colors.primary} />
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: fonts.bodyMedium,
                fontSize: typeScale.bodyMedium,
                color: colors.primary,
              }}
            >
              Use my location
            </Text>
          </Pressable>
        </View>

        <View style={styles.anchor}>
          <PillCTA
            label={valid ? 'Continue' : 'Enter 5-digit ZIP'}
            disabled={!valid}
            onPress={() => router.push('/(onboarding)/camera-primer')}
          />
          <Pressable
            onPress={() => router.push('/(onboarding)/camera-primer')}
            style={styles.skip}
            accessibilityRole="button"
            accessibilityLabel="Skip for now"
            hitSlop={8}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </Pressable>
        </View>

        <View style={styles.dots}>
          <DotRow count={3} active={0} tone="coral" />
        </View>
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'space-between',
  },
  inputWrap: {
    marginTop: spacing.huge,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  input: {
    flex: 1,
    fontFamily: fonts.displayExtraBold,
    fontSize: 28,
    letterSpacing: 2,
    color: colors.onSurface,
  },
  useLocation: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  anchor: {
    alignItems: 'center',
    gap: spacing.md,
  },
  skip: {
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.tertiary,
  },
  dots: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});
