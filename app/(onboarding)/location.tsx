import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, Pressable, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { PinGlyph, ArrowUpRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

export default function Location() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [zip, setZip] = useState('');
  const valid = /^\d{5}$/.test(zip);

  return (
    <NoirScreen>
      <NoirHeader brand="SECTOR · LOCATE" showBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: spacing.xxl, paddingBottom: insets.bottom + spacing.xxxl },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <DocRef>STEP 01 · 03 · REGION</DocRef>
            <Text allowFontScaling={false} style={styles.title}>
              WHERE DO{'\n'}YOU LIVE?
            </Text>
            <Text allowFontScaling={false} style={styles.body}>
              Prices vary 40% by region. Denver ≠ Memphis. We price to your ZIP.
            </Text>
          </View>

          <View style={styles.inputBlock}>
            <Label tone="tertiary" size="micro">Your ZIP code</Label>
            <NoirCard variant="elevated" radius="md" padding={0} style={{ marginTop: spacing.sm }}>
              <View style={styles.inputRow}>
                <PinGlyph size={20} color={valid ? colors.amber : colors.textTertiary} />
                <TextInput
                  value={zip}
                  onChangeText={(t) => {
                    const next = t.replace(/[^\d]/g, '').slice(0, 5);
                    setZip(next);
                    if (next.length === 5) Keyboard.dismiss();
                  }}
                  keyboardType="number-pad"
                  placeholder="80203"
                  placeholderTextColor={colors.textDim}
                  maxLength={5}
                  style={styles.input}
                  accessibilityLabel="ZIP code"
                  accessibilityHint="5-digit US postal code"
                  accessibilityValue={{ text: zip ? zip : 'empty' }}
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>
            </NoirCard>
            <Pressable
              onPress={() => { setZip('80203'); Keyboard.dismiss(); }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Use my location"
              style={styles.useLocation}
            >
              <ArrowUpRightGlyph size={12} color={colors.cyan} />
              <Text allowFontScaling={false} style={styles.useLocationText}>USE MY LOCATION</Text>
            </Pressable>
          </View>

          <View style={styles.anchor}>
            <AmberCTA
              label={valid ? 'Continue' : 'Enter 5-digit ZIP'}
              variant="primary"
              size="lg"
              disabled={!valid}
              onPress={() => router.push('/(onboarding)/camera-primer')}
            />
            <Pressable
              onPress={() => router.push('/(onboarding)/camera-primer')}
              hitSlop={8}
              style={styles.skip}
            >
              <Text allowFontScaling={false} style={styles.skipText}>Skip — use national average</Text>
            </Pressable>
            <View style={styles.dots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
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
    marginTop: spacing.lg,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  inputBlock: {
    marginTop: spacing.huge,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  input: {
    flex: 1,
    fontFamily: fonts.displayExtraBold,
    fontSize: 30,
    letterSpacing: 3,
    color: colors.text,
  },
  useLocation: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  useLocationText: {
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelMicro,
    color: colors.cyan,
    letterSpacing: tracking.labelWide,
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
    color: colors.textTertiary,
  },
  dots: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textDim,
  },
  dotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
});
