import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
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
import { getEstimateDraft, setEstimateContext } from '@/lib/estimate/draft';
import {
    SUPPORTED_COUNTRIES,
    getSupportedCountry,
    normalizePostalCode,
    validatePostalCode,
} from '@/lib/estimate/countries';
export default function Location() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const draft = getEstimateDraft();
    const [countryCode, setCountryCode] = useState(draft.countryCode ?? 'US');
    const [zip, setZip] = useState(draft.zipCode ?? '');
    const selectedCountry = getSupportedCountry(countryCode);
    const valid = validatePostalCode(countryCode, zip);
    const onContinue = () => {
        setEstimateContext({
            countryCode,
            zipCode: zip,
        });
        router.push('/(onboarding)/camera-primer');
    };
    return (<NoirScreen>
      <NoirHeader brand="SECTOR · LOCATE" showBack/>

      <View style={[
            styles.content,
            { paddingTop: insets.top + spacing.huge, paddingBottom: insets.bottom + spacing.xxxl },
        ]}>
        <View>
          <DocRef>STEP 01 · 03 · REGION</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            WHERE DO{'\n'}YOU LIVE?
          </Text>
          <Text allowFontScaling={false} style={styles.body}>
            Start with country and ZIP. Pricing, codes, and labor vary by region.
          </Text>
        </View>

        <View style={styles.inputBlock}>
          <Label tone="tertiary" size="micro">Country (supported)</Label>
          <View style={styles.countryGroup}>
            {SUPPORTED_COUNTRIES.map((country) => {
            const active = country.code === countryCode;
            return (<Pressable key={country.code} onPress={() => setCountryCode(country.code)} accessibilityRole="radio" accessibilityState={{ selected: active }} accessibilityLabel={country.name}>
                  <NoirCard variant={active ? 'elevated' : 'default'} radius="md" padding={14} style={active ? { borderColor: colors.amber } : null}>
                    <View style={styles.countryRow}>
                      <Text allowFontScaling={false} style={[styles.countryName, active ? { color: colors.amber } : null]}>
                        {country.name}
                      </Text>
                      <View style={[styles.radio, active ? styles.radioOn : null]}>
                        {active ? <View style={styles.radioDot}/> : null}
                      </View>
                    </View>
                  </NoirCard>
                </Pressable>);
        })}
          </View>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xl }}>
            {selectedCountry.zipLabel}
          </Label>
          <NoirCard variant="elevated" radius="md" padding={0} style={{ marginTop: spacing.sm }}>
            <View style={styles.inputRow}>
              <PinGlyph size={20} color={valid ? colors.amber : colors.textTertiary}/>
              <TextInput value={zip} onChangeText={(next) => setZip(normalizePostalCode(countryCode, next))} keyboardType="number-pad" placeholder={selectedCountry.zipPlaceholder} placeholderTextColor={colors.textDim} maxLength={5} style={styles.input} accessibilityLabel={selectedCountry.zipLabel} autoFocus/>
            </View>
          </NoirCard>
          <Pressable onPress={() => setZip('80203')} hitSlop={8} accessibilityRole="button" accessibilityLabel="Use my location" style={styles.useLocation}>
            <ArrowUpRightGlyph size={12} color={colors.cyan}/>
            <Text allowFontScaling={false} style={styles.useLocationText}>USE MY LOCATION</Text>
          </Pressable>
          <Text allowFontScaling={false} style={styles.helpText}>
            Currently supported: United States ({selectedCountry.zipHelpText})
          </Text>
        </View>

        <View style={styles.anchor}>
          <AmberCTA label={valid ? 'Continue' : 'Enter 5-digit ZIP'} variant="primary" size="lg" disabled={!valid} onPress={onContinue}/>
          <Pressable onPress={() => {
            setEstimateContext({
                countryCode,
                zipCode: '',
            });
            router.push('/(onboarding)/camera-primer');
        }} hitSlop={8} style={styles.skip}>
            <Text allowFontScaling={false} style={styles.skipText}>Skip — use national average</Text>
          </Pressable>
          <View style={styles.dots}>
            <View style={styles.dotActive}/>
            <View style={styles.dot}/>
            <View style={styles.dot}/>
          </View>
        </View>
      </View>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
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
    countryGroup: {
        marginTop: spacing.sm,
        gap: spacing.sm,
    },
    countryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countryName: {
        fontFamily: fonts.bodySemibold,
        fontSize: typeScale.bodyLarge,
        color: colors.text,
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
    helpText: {
        marginTop: spacing.sm,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textTertiary,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.4,
        borderColor: colors.hairlineStrong,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOn: {
        borderColor: colors.amber,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.amber,
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
