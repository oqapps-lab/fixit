import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { HouseCalmIllustration } from '@/components/ui/NoirGlyphs';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
export default function VaultTab() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (<NoirScreen>
      <NoirHeader brand="ARCHITECT.REPAIR" showMenu/>

      <ScrollView contentContainerStyle={[
            styles.scroll,
            {
                paddingTop: spacing.md,
                paddingBottom: insets.bottom + 130,
            },
        ]} showsVerticalScrollIndicator={false}>
        <NoirCard variant="elevated" radius="lg" padding={32} style={styles.emptyCard}>
          <View style={{ alignItems: 'center' }}>
            <HouseCalmIllustration size={160}/>
          </View>

          <Text allowFontScaling={false} style={styles.heroTitle}>
            Your house is calm
          </Text>
          <Text allowFontScaling={false} style={styles.heroBody}>
            Snap a photo when something needs attention. Your saved fixes will live here.
          </Text>

          <AmberCTA label="Take a photo →" variant="outlined" size="md" onPress={() => router.push('/your-house')} style={{ marginTop: spacing.xxl, alignSelf: 'center', width: '70%' }}/>
        </NoirCard>

        {/* Sub-nav chips */}
        <Label tone="tertiary" size="micro" style={{ marginTop: spacing.xxl }}>
          Collections
        </Label>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          <NoirCard variant="default" radius="md" padding={16}>
            <DocRef tone="mint">SAVED · 0 ITEMS</DocRef>
            <Text allowFontScaling={false} style={styles.collItem}>Saved Projects</Text>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={16}>
            <DocRef tone="cyan">WARRANTY · 3 TRACKED</DocRef>
            <Text allowFontScaling={false} style={styles.collItem}>Warranty Vault</Text>
          </NoirCard>
          <NoirCard variant="default" radius="md" padding={16}>
            <DocRef>PHOTOS · 12 FILES</DocRef>
            <Text allowFontScaling={false} style={styles.collItem}>Photo Journal</Text>
          </NoirCard>
        </View>
      </ScrollView>
    </NoirScreen>);
}
const styles = StyleSheet.create({
    scroll: { paddingHorizontal: spacing.xl },
    emptyCard: {
        marginTop: spacing.xl,
    },
    heroTitle: {
        marginTop: spacing.xl,
        fontFamily: fonts.displayExtraBold,
        fontSize: 28,
        color: colors.text,
        textAlign: 'center',
        letterSpacing: tracking.tight,
    },
    heroBody: {
        marginTop: spacing.md,
        fontFamily: fonts.body,
        fontSize: typeScale.bodyMedium,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    collItem: {
        marginTop: 4,
        fontFamily: fonts.displaySemibold,
        fontSize: typeScale.bodyLarge,
        color: colors.text,
        letterSpacing: tracking.tight,
    },
});
