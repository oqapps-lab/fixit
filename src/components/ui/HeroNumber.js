import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, tracking, typeScale } from '@/constants/tokens';
const SIZE_MAP = {
    sm: typeScale.titleLarge,
    md: typeScale.displaySmall,
    lg: typeScale.displayMedium,
    xl: typeScale.displayLarge,
    mega: typeScale.displayMega,
};
const TONE_COLOR = {
    white: colors.text,
    amber: colors.amber,
    mint: colors.mint,
    cyan: colors.cyan,
};
export function HeroNumber({ value, suffix, size = 'lg', tone = 'white', align = 'left', style, }) {
    const fontSize = SIZE_MAP[size];
    const color = TONE_COLOR[tone];
    return (<View style={[
            styles.wrap,
            { alignItems: alignFrom(align), flexDirection: 'row', justifyContent: alignFrom(align) },
            style,
        ]}>
      <Text allowFontScaling={false} numberOfLines={1} style={{
            fontFamily: fonts.displayExtraBold,
            fontSize,
            letterSpacing: tracking.tight,
            color,
            includeFontPadding: false,
        }}>
        {value}
      </Text>
      {suffix ? (<Text allowFontScaling={false} style={{
                fontFamily: fonts.bodyMedium,
                fontSize: Math.round(fontSize * 0.28),
                color: colors.textSecondary,
                letterSpacing: tracking.labelWide,
                marginLeft: 6,
                marginBottom: 6,
                alignSelf: 'flex-end',
            }}>
          {suffix.toUpperCase()}
        </Text>) : null}
    </View>);
}
function alignFrom(a) {
    if (a === 'left')
        return 'flex-start';
    if (a === 'right')
        return 'flex-end';
    return 'center';
}
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});
