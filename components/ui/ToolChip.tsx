import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, spacing, tracking, typeScale } from '@/constants/tokens';

export function ToolChip({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text allowFontScaling={false} style={styles.text}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export function ToolChipRow({ labels }: { labels: string[] }) {
  return (
    <View style={styles.row}>
      {labels.map((l) => <ToolChip key={l} label={l} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: colors.surface2,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    color: colors.textSecondary,
    fontFamily: fonts.labelSemibold,
    fontSize: typeScale.labelMicro,
    letterSpacing: tracking.labelWide,
  },
});
