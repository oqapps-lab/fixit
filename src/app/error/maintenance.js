import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Polyline } from 'react-native-svg';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { DocRef } from '@/components/ui/DocRef';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
/** Wrench + clock combo glyph — maintenance indicator */
function WrenchClockGlyph({ size = 72, color = colors.cyan }) {
    return (<Svg width={size} height={size} viewBox="0 0 72 72">
      {/* wrench on left */}
      <Path d="M30 14a8 8 0 00-6.4 12.8L10 40.4 13.6 44 27.2 30.4A8 8 0 1030 14z" stroke={color} strokeWidth={1.8} fill="none" strokeLinejoin="round"/>
      {/* clock on right */}
      <Circle cx={52} cy={48} r={14} stroke={color} strokeWidth={1.8} fill="none"/>
      <Polyline points="52,40 52,48 58,51" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>);
}
export default function Maintenance() {
    const insets = useSafeAreaInsets();
    const checkAgain = () => {
        // Would re-ping /health endpoint; stub — no-op for now
    };
    const openTwitter = async () => {
        try {
            await Linking.openURL('https://twitter.com/oqapps');
        }
        catch {
            /* no-op */
        }
    };
    return (<NoirScreen glow="cyan">
      <View style={[
            styles.container,
            { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xxxl },
        ]}>
        {/* Top marker */}
        <View style={styles.topMarker}>
          <DocRef tone="cyan" align="center">
            SYSTEM · MAINTENANCE · IN PROGRESS
          </DocRef>
        </View>

        {/* Centered hero */}
        <View style={styles.centerGroup}>
          <View style={styles.iconRing}>
            <WrenchClockGlyph size={72} color={colors.cyan}/>
          </View>

          <Text allowFontScaling={false} style={styles.title}>
            {"WE'RE DOING\nSOME WORK"}
          </Text>

          <Text allowFontScaling={false} style={styles.body}>
            FixIt is briefly offline for maintenance. Usually done in 15 minutes. Try again shortly.
          </Text>
        </View>

        {/* Bottom CTA + twitter link */}
        <View style={styles.ctaWrap}>
          <AmberCTA label="Check again" variant="primary" size="xl" fullWidth onPress={checkAgain} accessibilityLabel="Check if maintenance is complete"/>

          <Pressable onPress={openTwitter} hitSlop={10} accessibilityRole="link" accessibilityLabel="Open status updates on Twitter" style={styles.statusRow}>
            <Text allowFontScaling={false} style={styles.statusText}>
              Status updates:{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.statusHandle}>
              @oqapps on Twitter/X
            </Text>
          </Pressable>
        </View>
      </View>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        justifyContent: 'space-between',
    },
    topMarker: {
        alignItems: 'center',
    },
    centerGroup: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconRing: {
        width: 132,
        height: 132,
        borderRadius: 66,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.hairlineCyan,
        backgroundColor: colors.surface1,
        marginBottom: spacing.xxl,
    },
    title: {
        fontFamily: fonts.displayNarrowBold,
        fontSize: typeScale.displaySmall,
        color: colors.text,
        letterSpacing: tracking.tight,
        textAlign: 'center',
        lineHeight: 38,
    },
    body: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyLarge,
        lineHeight: 24,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.lg,
        paddingHorizontal: spacing.md,
    },
    ctaWrap: {
        width: '100%',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginTop: spacing.xl,
        flexWrap: 'wrap',
    },
    statusText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textTertiary,
    },
    statusHandle: {
        fontFamily: fonts.bodyMedium,
        fontSize: typeScale.bodySmall,
        color: colors.cyan,
        letterSpacing: tracking.label,
    },
});
