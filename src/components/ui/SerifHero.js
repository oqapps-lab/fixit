import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts, tracking } from '@/constants/tokens';
export function SerifHero({ children, size = 30, align = 'center', tone = 'white', style }) {
    const color = tone === 'amber' ? colors.amber :
        tone === 'cyan' ? colors.cyan :
            tone === 'mint' ? colors.mint :
                tone === 'secondary' ? colors.textSecondary :
                    tone === 'tertiary' ? colors.textTertiary :
                        colors.text;
    return (<Text allowFontScaling={false} style={[
            styles.base,
            {
                fontSize: size,
                textAlign: align,
                color,
            },
            style,
        ]}>
      {children}
    </Text>);
}
const styles = StyleSheet.create({
    base: {
        fontFamily: fonts.heroItalic,
        letterSpacing: tracking.heroItalic,
        lineHeight: undefined,
    },
});
