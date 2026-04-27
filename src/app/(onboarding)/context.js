import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { getEstimateDraft, setEstimateContext } from '@/lib/estimate/draft';
import {
    SUPPORTED_COUNTRIES,
    getSupportedCountry,
    normalizePostalCode,
    validatePostalCode,
} from '@/lib/estimate/countries';
const DIY_OPTIONS = [
    { key: 'never', label: 'Never tried', meta: 'Walkthrough every step' },
    { key: 'basic', label: 'Some experience', meta: 'Shorter guides' },
    { key: 'confident', label: 'Done this before', meta: 'Terse, no hand-holding' },
];
const Q_OPTIONS = [
    { key: 'budget', label: 'Budget', meta: 'Off-brand, functional' },
    { key: 'standard', label: 'Mid-range', meta: 'Brand name, durable' },
    { key: 'premium', label: 'Premium', meta: 'Top-tier, lifetime' },
];
export default function Context() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const draft = getEstimateDraft();
    const [countryCode, setCountryCode] = useState(draft.countryCode ?? 'US');
    const [diy, setDiy] = useState(draft.diyComfort ?? 'basic');
    const [quality, setQuality] = useState(draft.qualityTier ?? 'standard');
    const [zipCode, setZipCode] = useState(draft.zipCode ?? '');
    const [zipError, setZipError] = useState(null);
    const [isDetectingZip, setIsDetectingZip] = useState(false);
    const selectedCountry = getSupportedCountry(countryCode);

    const ensureValidZip = (rawZip, selectedCountryCode) => {
        const normalized = normalizePostalCode(selectedCountryCode, rawZip);
        const valid = validatePostalCode(selectedCountryCode, normalized);
        if (!valid) {
            const country = getSupportedCountry(selectedCountryCode);
            setZipError(`Enter a valid ${country.zipHelpText}.`);
            return null;
        }
        setZipError(null);
        return normalized;
    };

    const onContinue = async () => {
        const validZip = ensureValidZip(zipCode, countryCode);
        if (validZip === null) {
            return;
        }

        setEstimateContext({
            countryCode,
            zipCode: validZip,
            qualityTier: quality,
            diyComfort: diy,
        });
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
        router.push('/(onboarding)/processing');
    };

    const onDetectZip = async () => {
        setIsDetectingZip(true);
        setZipError(null);

        try {
            const permission = await Location.requestForegroundPermissionsAsync();
            if (permission.granted !== true) {
                setZipError('Location denied. Enter ZIP manually.');
                return;
            }

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            const places = await Location.reverseGeocodeAsync({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            const firstPlace = places[0];
            const postalCode = firstPlace?.postalCode;
            const detectedCountryCode = typeof firstPlace?.isoCountryCode === 'string'
                ? firstPlace.isoCountryCode.toUpperCase()
                : countryCode;
            const countrySupported = SUPPORTED_COUNTRIES.some((country) => country.code === detectedCountryCode);
            if (!countrySupported) {
                setZipError('Your location is outside supported countries right now.');
                return;
            }
            if (typeof postalCode !== 'string' || postalCode.length < 5) {
                setZipError('Could not detect ZIP. Enter it manually.');
                return;
            }

            const normalizedZip = normalizePostalCode(detectedCountryCode, postalCode);
            setCountryCode(detectedCountryCode);
            setZipCode(normalizedZip);
            setZipError(null);
            await Haptics.selectionAsync().catch(() => { });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Location failed.';
            setZipError(`ZIP detection failed: ${message}`);
        }
        finally {
            setIsDetectingZip(false);
        }
    };

    useEffect(() => {
        if (draft.photoUri === null) {
            router.replace('/(onboarding)/capture');
        }
    }, [draft.photoUri, router]);

    return (<NoirScreen>
      <NoirHeader brand="SECTOR · CONTEXT" showBack/>

      <View style={[
            styles.content,
            { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xxxl },
        ]}>
        <View>
          <DocRef>PRE-SCAN · TWO QUICK QUESTIONS</DocRef>
          <Text allowFontScaling={false} style={styles.title}>
            PERSONALIZE
          </Text>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
            Country (supported)
          </Label>
          <View style={styles.countryGroup}>
            {SUPPORTED_COUNTRIES.map((country) => {
            const on = countryCode === country.code;
            return (<Pressable key={country.code} onPress={() => {
                    setCountryCode(country.code);
                    setZipCode(normalizePostalCode(country.code, zipCode));
                    if (zipError !== null) {
                        setZipError(null);
                    }
                }} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={country.name}>
                  <NoirCard variant={on ? 'elevated' : 'default'} radius="md" padding={16} style={on ? { borderColor: colors.amber } : null}>
                    <View style={styles.rowBetween}>
                      <Text allowFontScaling={false} style={[styles.optLabel, { color: on ? colors.amber : colors.text }]}>
                        {country.name}
                      </Text>
                      <View style={[styles.radio, on ? styles.radioOn : null]}>
                        {on ? <View style={styles.radioDot}/> : null}
                      </View>
                    </View>
                  </NoirCard>
                </Pressable>);
        })}
          </View>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
            Region ({selectedCountry.zipLabel})
          </Label>
          <NoirCard variant="default" radius="md" padding={16} style={{ marginTop: spacing.sm }}>
            <TextInput allowFontScaling={false} value={zipCode} onChangeText={(next) => {
            setZipCode(normalizePostalCode(countryCode, next));
            if (zipError !== null) {
                setZipError(null);
            }
        }} placeholder={`Enter ${selectedCountry.zipLabel} (e.g. ${selectedCountry.zipPlaceholder})`} placeholderTextColor={colors.textDim} keyboardType="number-pad" maxLength={countryCode === 'US' ? 5 : 20} style={styles.zipInput}/>
            <View style={styles.zipActions}>
              <Pressable onPress={onDetectZip} hitSlop={8} accessibilityRole="button" accessibilityLabel="Auto-detect ZIP" style={styles.detectBtn}>
                {isDetectingZip ? <ActivityIndicator color={colors.cyan}/> : <Text allowFontScaling={false} style={styles.detectBtnText}>Use current location</Text>}
              </Pressable>
              <DocRef tone="cyan">{selectedCountry.name} only for now</DocRef>
            </View>
            {zipError !== null ? (<Text allowFontScaling={false} style={styles.errorText}>{zipError}</Text>) : null}
          </NoirCard>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
            Your DIY readiness
          </Label>
          <View style={styles.group}>
            {DIY_OPTIONS.map((o) => {
            const on = diy === o.key;
            return (<Pressable key={o.key} onPress={() => setDiy(o.key)} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={o.label}>
                  <NoirCard variant={on ? 'elevated' : 'default'} radius="md" padding={16} style={on ? { borderColor: colors.amber } : null}>
                    <View style={styles.rowBetween}>
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={[styles.optLabel, { color: on ? colors.amber : colors.text }]}>
                          {o.label}
                        </Text>
                        <Text allowFontScaling={false} style={styles.optMeta}>{o.meta}</Text>
                      </View>
                      <View style={[styles.radio, on ? styles.radioOn : null]}>
                        {on ? <View style={styles.radioDot}/> : null}
                      </View>
                    </View>
                  </NoirCard>
                </Pressable>);
        })}
          </View>

          <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
            Quality tier
          </Label>
          <View style={styles.group}>
            {Q_OPTIONS.map((o) => {
            const on = quality === o.key;
            return (<Pressable key={o.key} onPress={() => setQuality(o.key)} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={o.label}>
                  <NoirCard variant={on ? 'elevated' : 'default'} radius="md" padding={16} style={on ? { borderColor: colors.amber } : null}>
                    <View style={styles.rowBetween}>
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={[styles.optLabel, { color: on ? colors.amber : colors.text }]}>
                          {o.label}
                        </Text>
                        <Text allowFontScaling={false} style={styles.optMeta}>{o.meta}</Text>
                      </View>
                      <View style={[styles.radio, on ? styles.radioOn : null]}>
                        {on ? <View style={styles.radioDot}/> : null}
                      </View>
                    </View>
                  </NoirCard>
                </Pressable>);
        })}
          </View>
        </View>

        <View style={styles.anchor}>
          <AmberCTA label="Continue" variant="primary" size="lg" onPress={onContinue}/>
          <Pressable onPress={() => {
            const fallbackZip = zipCode.trim().length > 0
                ? normalizePostalCode(countryCode, zipCode)
                : selectedCountry.zipPlaceholder;
            setEstimateContext({
                countryCode,
                zipCode: fallbackZip,
                qualityTier: quality,
                diyComfort: diy,
            });
            router.push('/(onboarding)/processing');
        }} hitSlop={8}>
            <Text allowFontScaling={false} style={styles.skipText}>Skip — use defaults</Text>
          </Pressable>
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
        fontSize: 42,
        color: colors.text,
        letterSpacing: 1.4,
    },
    group: {
        marginTop: spacing.sm,
        gap: spacing.sm,
    },
    countryGroup: {
        marginTop: spacing.sm,
        gap: spacing.sm,
    },
    zipInput: {
        fontFamily: fonts.bodySemibold,
        fontSize: typeScale.bodyLarge,
        color: colors.text,
        letterSpacing: tracking.tight,
        borderBottomWidth: 1,
        borderBottomColor: colors.hairlineStrong,
        paddingBottom: spacing.sm,
    },
    zipActions: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detectBtn: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.cyanDim,
        borderRadius: 6,
        minWidth: 144,
        alignItems: 'center',
    },
    detectBtnText: {
        fontFamily: fonts.labelSemibold,
        fontSize: typeScale.labelSmall,
        color: colors.cyan,
        letterSpacing: tracking.labelWide,
    },
    errorText: {
        marginTop: spacing.sm,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.danger,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    optLabel: {
        fontFamily: fonts.displaySemibold,
        fontSize: typeScale.bodyLarge,
        letterSpacing: tracking.tight,
    },
    optMeta: {
        marginTop: 2,
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
    skipText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textTertiary,
    },
});
