import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';
const TONE_COLOR = {
    primary: colors.text,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    amber: colors.amber,
    cyan: colors.cyan,
    mint: colors.mint,
    danger: colors.danger,
};
export function Label({ children, tone = 'tertiary', size = 'small', align, style }) {
    const fontSize = size === 'micro' ? typeScale.labelMicro :
        size === 'medium' ? typeScale.bodyMedium :
            typeScale.labelSmall;
    const letterSpacing = size === 'micro' ? tracking.labelMicro : tracking.labelWide;
    return (<Text allowFontScaling={false} style={[
            styles.base,
            { color: TONE_COLOR[tone], fontSize, letterSpacing, textAlign: align },
            style,
        ]}>
      {children.toUpperCase()}
    </Text>);
}
const styles = StyleSheet.create({
    base: { fontFamily: fonts.labelSemibold },
});
