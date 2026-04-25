import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { HeroNumber } from '@/components/ui/HeroNumber';
import { RingChart } from '@/components/ui/RingChart';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { FridgePhoto } from '@/components/ui/NoirGlyphs';
import { spacing } from '@/constants/tokens';

export default function Warranty() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <NoirScreen>
      <NoirHeader brand="MAINTENANCE_SYSTEM" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: spacing.sm,
            paddingBottom: insets.bottom + spacing.huge,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <NoirCard variant="blueprint" radius="md" padding={24} style={styles.applianceCard}>
          <FridgePhoto size={140} />
        </NoirCard>

        <View style={styles.ringWrap}>
          <RingChart size={220} value={58} tone="amber" strokeWidth={3} />
          <View style={styles.ringCenter}>
            <HeroNumber value="423" size="lg" tone="white" align="center" />
            <Label tone="tertiary" size="micro" align="center">DAYS</Label>
          </View>
        </View>

        <DocRef align="center" style={{ marginTop: spacing.lg }}>
          WARRANTY · UNTIL JUL 2027
        </DocRef>

        <AmberCTA
          label="+ Add Receipt PDF"
          variant="outlined"
          onPress={() => {}}
          style={{ marginTop: spacing.xl, alignSelf: 'center', width: '70%' }}
        />

        <View style={styles.coordRow}>
          <DocRef>40.7128° N</DocRef>
          <DocRef>74.0060° W</DocRef>
          <DocRef>REF: 0092-B2</DocRef>
        </View>
      </ScrollView>
    </NoirScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.xl },
  applianceCard: {
    marginTop: spacing.xl,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  ringWrap: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 220,
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coordRow: {
    marginTop: spacing.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
});
