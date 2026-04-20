import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { DocRef } from '@/components/ui/DocRef';
import { SerifHero } from '@/components/ui/SerifHero';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, shadows, spacing, tracking, typeScale } from '@/constants/tokens';

function MintCheckGlyph({ size = 120 }: { size?: number }) {
  return (
    <View style={[styles.glowWrap, shadows.glowMint]}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Circle
          cx={60}
          cy={60}
          r={52}
          stroke={colors.mint}
          strokeWidth={1.6}
          fill={colors.mint}
          fillOpacity={0.1}
        />
        <Circle
          cx={60}
          cy={60}
          r={42}
          stroke={colors.mintDim}
          strokeWidth={0.8}
          strokeDasharray="3 4"
          fill="none"
          opacity={0.6}
        />
        <Polyline
          points="40,62 55,76 82,48"
          stroke={colors.mint}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default function PaywallSuccess() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen glow="cyan">
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.colossal,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          <MintCheckGlyph />
        </View>

        <DocRef tone="mint" align="center" style={{ marginTop: spacing.xxl }}>
          SECTOR · UNLOCKED
        </DocRef>

        <Text allowFontScaling={false} style={styles.display}>
          WELCOME{'\n'}TO PRO
        </Text>

        <SerifHero size={30} align="center" style={{ marginTop: spacing.lg }}>
          Your vault is open.
        </SerifHero>

        <Text allowFontScaling={false} style={styles.body}>
          Unlimited estimates · saved projects · warranty tracker · PDF export · price alerts
        </Text>

        <View style={styles.benefitsList}>
          {[
            'Unlimited estimates',
            'Saved projects · unlimited',
            'Warranty tracker',
            'PDF export',
            'Price alerts on materials',
          ].map((b) => (
            <View key={b} style={styles.benefitRow}>
              <Svg width={12} height={12} viewBox="0 0 12 12">
                <Polyline
                  points="2,6 5,9 10,3"
                  stroke={colors.mint}
                  strokeWidth={1.8}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text allowFontScaling={false} style={styles.benefitText}>
                {b}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.ctaWrap}>
          <AmberCTA
            label="Start using Pro"
            variant="primary"
            size="lg"
            onPress={() => router.replace('/(tabs)')}
            accessibilityLabel="Start using Pro, return to home"
          />
        </View>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    alignItems: 'stretch',
  },
  top: {
    alignItems: 'center',
  },
  glowWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    marginTop: spacing.md,
    fontFamily: fonts.displayNarrowBold,
    fontSize: typeScale.displaySmall,
    color: colors.text,
    letterSpacing: 1.2,
    textAlign: 'center',
    lineHeight: typeScale.displaySmall + 6,
  },
  body: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    alignSelf: 'center',
  },
  benefitsList: {
    marginTop: spacing.xxl,
    gap: spacing.md,
    alignSelf: 'center',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  benefitText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.text,
    letterSpacing: tracking.normal,
  },
  ctaWrap: {
    marginTop: spacing.huge,
  },
});
