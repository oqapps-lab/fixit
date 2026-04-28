import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import { ChevronLeftGlyph, MenuGlyph, AvatarCircle } from './NoirGlyphs';

type Props = {
  brand?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showAvatar?: boolean;
  right?: React.ReactNode;
  style?: ViewStyle;
};

export function NoirHeader({
  brand = 'FIXIT NOIR',
  showBack = false,
  showMenu = false,
  showAvatar = true,
  right,
  style,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.row,
        { paddingTop: insets.top + spacing.sm, paddingBottom: spacing.md },
        style,
      ]}
    >
      <View style={styles.left}>
        {showBack ? (
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ChevronLeftGlyph size={20} color={colors.text} />
          </Pressable>
        ) : null}
        {showMenu ? (
          <Pressable
            onPress={() => router.push('/settings')}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
          >
            <MenuGlyph size={20} color={colors.text} />
          </Pressable>
        ) : null}
        <Text allowFontScaling={false} style={styles.brand}>
          {brand.toUpperCase()}
        </Text>
      </View>
      <View style={styles.right}>
        {right}
        {showAvatar ? <AvatarCircle size={28} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  brand: {
    fontFamily: fonts.displayNarrowBold,
    fontSize: typeScale.labelSmall,
    color: colors.text,
    letterSpacing: tracking.docRef,
  },
});
