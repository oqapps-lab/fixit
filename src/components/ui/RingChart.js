import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop, G, Line, } from 'react-native-svg';
import { colors } from '@/constants/tokens';
export function RingChart({ size = 180, value = 87, track = colors.surface2, tone = 'cyan', strokeWidth = 3, segments = 0, }) {
    const r = (size - strokeWidth) / 2 - 8;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - value / 100);
    const center = size / 2;
    const gradId = `ring-${tone}`;
    const stops = tone === 'amber' ? ['#FFA95C', '#E8752A'] :
        tone === 'mint' ? ['#6BDE9A', '#2C8A52'] :
            ['#4FE5F9', '#6BCBD9'];
    return (<View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <SvgLinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={stops[0]}/>
            <Stop offset="1" stopColor={stops[1]}/>
          </SvgLinearGradient>
        </Defs>

        {/* segment ticks outside ring */}
        {segments > 0
            ? Array.from({ length: segments }).map((_, i) => {
                const theta = (i / segments) * 2 * Math.PI - Math.PI / 2;
                const inner = r + 6;
                const outer = r + 12;
                return (<Line key={i} x1={center + inner * Math.cos(theta)} y1={center + inner * Math.sin(theta)} x2={center + outer * Math.cos(theta)} y2={center + outer * Math.sin(theta)} stroke={colors.hairlineStrong} strokeWidth={1}/>);
            })
            : null}

        <G rotation="-90" origin={`${center},${center}`}>
          <Circle cx={center} cy={center} r={r} stroke={track} strokeWidth={strokeWidth} fill="none"/>
          <Circle cx={center} cy={center} r={r} stroke={`url(#${gradId})`} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}/>
        </G>
      </Svg>
    </View>);
}
