import React from 'react';
import { StyleSheet, Pressable, View, Text, Platform } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  HomeGlyph,
  RoomsGlyph,
  HistoryGlyph,
  ProfileGlyph,
  CameraGlyph,
} from '@/components/ui/Glyphs';
import { colors, fonts, gradients, radii, shadows, spacing, tracking, typeScale } from '@/constants/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="my-home" options={{ title: 'Rooms' }} />
      <Tabs.Screen name="estimates" options={{ title: 'History' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const visibleRoutes = state.routes.filter((r: any) => !r.name.startsWith('('));

  const onCapture = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.push('/(onboarding)/processing');
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        { paddingBottom: insets.bottom + 12 },
      ]}
    >
      {/* FAB — coral capture orb above the bar */}
      <Pressable
        onPress={onCapture}
        style={[styles.fab, shadows.pillLg]}
        accessibilityRole="button"
        accessibilityLabel="New estimate — take a photo"
      >
        <LinearGradient
          colors={gradients.ctaCoralGlossy.colors as unknown as readonly [string, string, ...string[]]}
          locations={gradients.ctaCoralGlossy.locations as unknown as readonly [number, number, ...number[]]}
          start={gradients.ctaCoralGlossy.start}
          end={gradients.ctaCoralGlossy.end}
          style={StyleSheet.absoluteFillObject}
        />
        <View pointerEvents="none" style={styles.fabHighlight} />
        <CameraGlyph size={30} color={colors.onPrimary} />
      </Pressable>

      {/* Frosted bar */}
      <View style={styles.bar}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
        ) : null}
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(255,255,255,0.80)' },
          ]}
        />
        <View style={styles.row}>
          {visibleRoutes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const label = (() => {
              if (route.name === 'index') return 'Home';
              if (route.name === 'my-home') return 'Rooms';
              if (route.name === 'estimates') return 'History';
              if (route.name === 'profile') return 'Profile';
              return '';
            })();

            return (
              <Pressable
                key={route.key}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  if (!isFocused) {
                    navigation.navigate(route.name);
                  }
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={label}
                style={styles.tab}
                hitSlop={8}
              >
                {renderGlyph(route.name, isFocused)}
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? colors.primary : colors.onSurfaceVariant },
                  ]}
                >
                  {label.toUpperCase()}
                </Text>
                {isFocused ? <View style={styles.activeDot} /> : null}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function renderGlyph(name: string, focused: boolean) {
  const color = focused ? colors.primary : colors.onSurface;
  switch (name) {
    case 'index':     return <HomeGlyph size={22} color={color} filled={focused} />;
    case 'my-home':   return <RoomsGlyph size={22} color={color} filled={focused} />;
    case 'estimates': return <HistoryGlyph size={22} color={color} filled={focused} />;
    case 'profile':   return <ProfileGlyph size={22} color={color} filled={focused} />;
    default:          return null;
  }
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 2,
  },
  fabHighlight: {
    position: 'absolute',
    top: 3,
    left: 12,
    right: 12,
    height: 16,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },
  bar: {
    width: '92%',
    height: 76,
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    ...shadows.warmCardShadow,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
  },
  tabLabel: {
    fontFamily: fonts.labelSemibold,
    fontSize: 9,
    letterSpacing: tracking.labelMicro,
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
