import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';
const TONE = {
    low: { bar: colors.mint, text: colors.mint, label: 'Low' },
    moderate: { bar: colors.amber, text: colors.amber, label: 'Moderate' },
    high: { bar: colors.danger, text: colors.danger, label: 'High' },
};
export function SeverityChip({ level, label }) {
    const t = TONE[level];
    return (<View style={styles.row}>
      <View style={[styles.bar, { backgroundColor: t.bar }]}/>
      <Text allowFontScaling={false} style={[styles.text, { color: t.text }]}>
        {(label ?? t.label).toUpperCase()}
      </Text>
    </View>);
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bar: {
        width: 3,
        height: 22,
        borderRadius: 1.5,
    },
    text: {
        fontFamily: fonts.displaySemibold,
        fontSize: typeScale.titleSmall,
        letterSpacing: tracking.label,
    },
});
