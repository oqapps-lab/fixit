import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';
const TONE_COLOR = {
    neutral: colors.textTertiary,
    amber: colors.amber,
    cyan: colors.cyan,
    mint: colors.mint,
    danger: colors.danger,
    dim: colors.textDim,
};

function toDocRefText(children) {
    return React.Children.toArray(children)
        .map((part) => {
        if (typeof part === 'string' || typeof part === 'number') {
            return String(part);
        }
        return '';
    })
        .join('')
        .toUpperCase();
}

export function DocRef({ children, tone = 'neutral', size = 'xs', align, style }) {
    const fontSize = size === 'xs' ? typeScale.docRef : typeScale.labelSmall;
    return (<Text allowFontScaling={false} style={[
            styles.base,
            {
                color: TONE_COLOR[tone],
                fontSize,
                textAlign: align,
            },
            style,
        ]}>
      {toDocRefText(children)}
    </Text>);
}
const styles = StyleSheet.create({
    base: {
        fontFamily: fonts.mono,
        letterSpacing: tracking.docRef,
    },
});
