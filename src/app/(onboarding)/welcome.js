import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Polyline, Rect, G, Path } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { SerifHero } from '@/components/ui/SerifHero';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
function CategoryGlyph({ kind }) {
    const size = 46;
    const color = colors.text;
    if (kind === 'plumbing') {
        return (<Svg width={size} height={size} viewBox="0 0 46 46">
        <G stroke={color} strokeWidth={1.4} fill="none" strokeLinejoin="round">
          <Path d="M10 12h12v8h-4v10h2c5 0 7 3 7 8h-18c0-5 2-8 7-8h2V20h-4v-8z" fill="rgba(255,255,255,0.04)"/>
        </G>
        <Circle cx={23} cy={40} r={2.2} fill={colors.cyan}/>
      </Svg>);
    }
    if (kind === 'electrical') {
        return (<Svg width={size} height={size} viewBox="0 0 46 46">
        <Polyline points="26,4 14,26 22,26 18,42 34,18 26,18 30,4" stroke={colors.amber} strokeWidth={1.6} fill="rgba(255,169,92,0.08)" strokeLinejoin="round"/>
      </Svg>);
    }
    if (kind === 'walls') {
        return (<Svg width={size} height={size} viewBox="0 0 46 46">
        <G stroke={color} strokeWidth={1.2} fill="none">
          <Rect x={6} y={8} width={34} height={30}/>
          <Line x1={6} y1={18} x2={26} y2={18}/>
          <Line x1={26} y1={18} x2={26} y2={38}/>
          <Line x1={6} y1={28} x2={26} y2={28}/>
          <Line x1={26} y1={8} x2={40} y2={8}/>
          <Line x1={36} y1={8} x2={36} y2={38}/>
        </G>
      </Svg>);
    }
    return (<Svg width={size} height={size} viewBox="0 0 46 46">
      <Rect x={12} y={4} width={22} height={38} stroke={color} strokeWidth={1.3} fill="none"/>
      <Line x1={12} y1={18} x2={34} y2={18} stroke={color} strokeWidth={1}/>
      <Rect x={30} y={8} width={2} height={6} fill={color} opacity={0.5}/>
      <Rect x={30} y={22} width={2} height={6} fill={color} opacity={0.5}/>
    </Svg>);
}
export default function Welcome() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (<NoirScreen>
      <ScrollView contentContainerStyle={[
            styles.scroll,
            {
                paddingTop: insets.top + spacing.huge,
                paddingBottom: insets.bottom + spacing.huge,
            },
        ]} showsVerticalScrollIndicator={false}>
        <DocRef>FIXIT NOIR · SECTOR 00 · INSTALL</DocRef>

        <View style={{ marginTop: spacing.xxxl }}>
          <Text allowFontScaling={false} style={styles.displayLine}>
            KNOW
          </Text>
          <Text allowFontScaling={false} style={styles.displayLine}>
            THE PRICE
          </Text>
          <SerifHero size={34} align="left" tone="amber" style={{ marginTop: spacing.sm }}>
            before the panic.
          </SerifHero>
        </View>

        <Text allowFontScaling={false} style={styles.body}>
          Snap a photo of what's broken. In sixty seconds you'll know if it's a $15 fix or a $500 one — and the three routes to get there.
        </Text>

        <View style={styles.grid}>
          {[
            { kind: 'plumbing', label: 'PLUMBING' },
            { kind: 'electrical', label: 'ELECTRICAL' },
            { kind: 'walls', label: 'WALLS' },
            { kind: 'appliances', label: 'APPLIANCES' },
        ].map((tile) => (<NoirCard key={tile.kind} variant="default" radius="md" padding={18} style={styles.tile}>
              <CategoryGlyph kind={tile.kind}/>
              <Label tone="tertiary" size="micro" style={{ marginTop: spacing.md }}>
                {tile.label}
              </Label>
            </NoirCard>))}
        </View>

        <View style={styles.samples}>
          <Label tone="tertiary" size="micro" style={{ marginBottom: spacing.sm }}>
            Sample outputs
          </Label>
          <View style={styles.samplesRow}>
            {[
            { tag: 'FAUCET', price: '$15' },
            { tag: 'TILE', price: '$120' },
            { tag: 'DISHWASHER', price: '$200' },
        ].map((s) => (<NoirCard key={s.tag} variant="outlined" radius="md" padding={12} style={styles.sampleCard}>
                <DocRef size="xs">{s.tag}</DocRef>
                <Text allowFontScaling={false} style={styles.samplePrice}>{s.price}</Text>
              </NoirCard>))}
          </View>
        </View>

        <View style={styles.anchor}>
          <AmberCTA label="Take a photo of your problem" variant="primary" size="lg" onPress={() => router.push('/(onboarding)/location')}/>
          <Pressable onPress={() => router.push('/repair/rp-002')} hitSlop={8} accessibilityRole="button" accessibilityLabel="See a sample estimate instead" style={styles.secondaryLink}>
            <Text allowFontScaling={false} style={styles.secondaryText}>
              See a sample estimate instead →
            </Text>
          </Pressable>
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: colors.amber }]}/>
          <View style={styles.dot}/>
          <View style={styles.dot}/>
        </View>
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: spacing.xl,
    },
    displayLine: {
        fontFamily: fonts.displayNarrowBold,
        fontSize: 52,
        lineHeight: 56,
        color: colors.text,
        letterSpacing: 1.2,
    },
    body: {
        marginTop: spacing.xl,
        fontFamily: fonts.body,
        fontSize: typeScale.bodyLarge,
        color: colors.textSecondary,
        lineHeight: 24,
        maxWidth: 360,
    },
    grid: {
        marginTop: spacing.huge,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    tile: {
        width: '47%',
        aspectRatio: 1.2,
        justifyContent: 'space-between',
    },
    samples: {
        marginTop: spacing.huge,
    },
    samplesRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    sampleCard: {
        flex: 1,
    },
    samplePrice: {
        marginTop: 4,
        fontFamily: fonts.displayExtraBold,
        fontSize: 22,
        color: colors.text,
        letterSpacing: tracking.tight,
    },
    anchor: {
        marginTop: spacing.huge,
        alignItems: 'center',
        gap: spacing.md,
    },
    secondaryLink: {
        paddingVertical: spacing.sm,
    },
    secondaryText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textTertiary,
    },
    dots: {
        marginTop: spacing.huge,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.textDim,
    },
});
