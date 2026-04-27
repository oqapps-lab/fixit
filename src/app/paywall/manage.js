import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { ChevronRightGlyph } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
const BENEFITS = [
    'Unlimited estimates',
    'Saved projects',
    'Warranty tracker',
    'PDF export',
    'Price alerts',
];
const ACTIONS = [
    { id: 'change', label: 'Change tier', hint: 'Switch annual ↔ monthly' },
    { id: 'pause', label: 'Pause subscription', hint: 'Up to 3 months' },
    { id: 'restore', label: 'Restore purchases', hint: 'From another device' },
    { id: 'support', label: 'Contact support', hint: 'help@fixit.app' },
];
function CheckMark({ size = 12, color = colors.mint }) {
    return (<Svg width={size} height={size} viewBox="0 0 12 12">
      <Polyline points="2,6 5,9 10,3" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>);
}
export default function ManageSubscription() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const handleCancel = () => {
        router.push('/error/sub-failed');
    };
    const handleAction = (id) => {
        // Demo only — all rows flow to the sub-failed error screen.
        router.push('/error/sub-failed');
    };
    return (<NoirScreen glow="amber">
      <NoirHeader brand="SUBSCRIPTION · MANAGE" showBack showAvatar={false}/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + spacing.huge },
        ]} showsVerticalScrollIndicator={false}>
        <View style={styles.docRow}>
          <DocRef>REF: SUB-0001</DocRef>
          <View style={styles.dot}/>
          <DocRef tone="amber">ACTIVE</DocRef>
          <View style={styles.dot}/>
          <DocRef>BUILD: FP-052</DocRef>
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          FIXIT PRO · ANNUAL
        </Text>

        <NoirCard variant="elevated" radius="lg" padding={24} style={styles.planCard}>
          <Label tone="tertiary" size="micro">
            Current tier
          </Label>
          <View style={styles.priceRow}>
            <HeroNumber value="$49.99" size="md" tone="white"/>
            <Text allowFontScaling={false} style={styles.perYear}>
              /YEAR
            </Text>
          </View>

          <View style={styles.renewRow}>
            <DocRef tone="cyan">RENEWS APR 20 2027</DocRef>
          </View>

          <View style={styles.divider}/>

          <Label tone="tertiary" size="micro">
            Included
          </Label>
          <View style={styles.benefits}>
            {BENEFITS.map((b) => (<View key={b} style={styles.benefitRow}>
                <CheckMark />
                <Text allowFontScaling={false} style={styles.benefitText}>
                  {b}
                </Text>
              </View>))}
          </View>
        </NoirCard>

        <Label tone="tertiary" size="micro" style={styles.sectionLabel}>
          Manage
        </Label>

        <View style={styles.actionsList}>
          {ACTIONS.map((a) => (<Pressable key={a.id} onPress={() => handleAction(a.id)} accessibilityRole="button" accessibilityLabel={a.label} accessibilityHint={a.hint}>
              <NoirCard variant="default" radius="md" padding={18}>
                <View style={styles.actionRow}>
                  <View style={{ flex: 1 }}>
                    <Text allowFontScaling={false} style={styles.actionLabel}>
                      {a.label}
                    </Text>
                    {a.hint ? (<Text allowFontScaling={false} style={styles.actionHint}>
                        {a.hint}
                      </Text>) : null}
                  </View>
                  <ChevronRightGlyph size={14} color={colors.textTertiary}/>
                </View>
              </NoirCard>
            </Pressable>))}
        </View>

        <View style={styles.danger}>
          <AmberCTA label="Cancel subscription" variant="danger" size="lg" onPress={handleCancel} accessibilityLabel="Cancel subscription" accessibilityHint="Opens a confirmation flow"/>
        </View>

        <Text allowFontScaling={false} style={styles.fineprint}>
          You'll keep Pro access until your current billing period ends.
        </Text>
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
    },
    docRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: spacing.md,
        flexWrap: 'wrap',
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: colors.textTertiary,
    },
    title: {
        marginTop: spacing.md,
        fontFamily: fonts.displayNarrowBold,
        fontSize: 32,
        color: colors.text,
        letterSpacing: 1.2,
    },
    planCard: {
        marginTop: spacing.lg,
    },
    priceRow: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: spacing.sm,
    },
    perYear: {
        marginBottom: 6,
        fontFamily: fonts.labelSemibold,
        fontSize: typeScale.labelSmall,
        color: colors.textSecondary,
        letterSpacing: tracking.labelWide,
    },
    renewRow: {
        marginTop: spacing.sm,
    },
    divider: {
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
        height: 1,
        backgroundColor: colors.hairline,
    },
    benefits: {
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    benefitText: {
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.text,
    },
    sectionLabel: {
        marginTop: spacing.xxl,
        marginBottom: spacing.md,
    },
    actionsList: {
        gap: spacing.sm,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    actionLabel: {
        fontFamily: fonts.bodyMedium,
        fontSize: typeScale.bodyLarge,
        color: colors.text,
    },
    actionHint: {
        marginTop: 2,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textTertiary,
    },
    danger: {
        marginTop: spacing.huge,
    },
    fineprint: {
        marginTop: spacing.md,
        fontFamily: fonts.body,
        fontSize: typeScale.bodySmall,
        color: colors.textTertiary,
        textAlign: 'center',
        lineHeight: 18,
    },
});
