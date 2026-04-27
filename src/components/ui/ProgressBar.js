import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/tokens';
const TONE_GRADIENT = {
    amber: ['#FFA95C', '#E8752A'],
    cyan: ['#4FE5F9', '#6BCBD9'],
    mint: ['#6BDE9A', '#2C8A52'],
};
export function ProgressBar({ value, tone = 'amber', height = 2, style }) {
    const pct = Math.min(1, Math.max(0, value));
    return (<View style={[styles.track, { height, backgroundColor: colors.surface2 }, style]}>
      <View style={[styles.fillWrap, { width: `${pct * 100}%` }]}>
        <LinearGradient colors={TONE_GRADIENT[tone]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill}/>
      </View>
    </View>);
}
const styles = StyleSheet.create({
    track: {
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden',
    },
    fillWrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
    },
});
