import React from 'react';
import { StyleSheet, Pressable, View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HomeGlyph, WrenchGlyph, ClockGlyph, VaultGlyph } from './NoirGlyphs';
import { colors, fonts, spacing, tracking } from '@/constants/tokens';

const TABS = [
  { name: 'index', label: 'SYSTEMS', Icon: HomeGlyph },
  { name: 'repairs', label: 'PROJECTS', Icon: WrenchGlyph },
  { name: 'blueprints', label: 'BLUEPRINTS', Icon: ClockGlyph },
  { name: 'vault', label: 'VAULT', Icon: VaultGlyph },
];

export function NoirTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const visibleRoutes = state.routes.filter((r) => !r.name.startsWith('('));

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        { paddingBottom: insets.bottom + spacing.md },
      ]}
    >
      <View style={styles.barShell}>
        {/* blur backdrop */}
        {Platform.OS === 'ios' ? (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        ) : null}
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor:
                Platform.OS === 'ios'
                  ? 'rgba(14,15,17,0.78)'
                  : 'rgba(14,15,17,0.92)',
            },
          ]}
        />
        {/* top edge highlight */}
        <View pointerEvents="none" style={styles.edgeTop} />

        <View style={styles.row}>
          {visibleRoutes.map((route, index) => {
            const isFocused = state.index === index;
            const cfg = TABS.find((t) => t.name === route.name) ?? TABS[0]!;
            const Icon = cfg.Icon;
            const tint = isFocused ? colors.amber : colors.textTertiary;

            return (
              <Pressable
                key={route.key}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  if (!isFocused) navigation.navigate(route.name);
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={cfg.label}
                style={styles.tab}
                hitSlop={10}
              >
                <Icon size={22} color={tint} filled={false} />
                <Text
                  allowFontScaling={false}
                  style={[styles.label, { color: tint }]}
                >
                  {cfg.label}
                </Text>
                <View style={[styles.activeDot, { opacity: isFocused ? 1 : 0 }]} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  barShell: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  edgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.edgeHighlight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: spacing.xs,
  },
  label: {
    fontFamily: fonts.labelSemibold,
    fontSize: 9,
    letterSpacing: tracking.labelWide,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.amber,
  },
});
