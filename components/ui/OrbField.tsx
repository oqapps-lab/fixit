import React from 'react';
import { StyleSheet, View, DimensionValue } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { orbs } from '@/constants/tokens';

type OrbKey = keyof typeof orbs;

type OrbProps = {
  name: OrbKey;
};

function Orb({ name }: OrbProps) {
  const o = orbs[name];
  const pos = {
    top: 'top' in o ? (o.top as DimensionValue) : undefined,
    bottom: 'bottom' in o ? (o.bottom as DimensionValue) : undefined,
    left: 'left' in o ? (o.left as DimensionValue) : undefined,
    right: 'right' in o ? (o.right as DimensionValue) : undefined,
  };

  return (
    <View
      pointerEvents="none"
      style={[
        styles.orb,
        pos,
        { width: o.size, height: o.size, opacity: o.opacity },
      ]}
    >
      <Svg width={o.size} height={o.size} viewBox={`0 0 ${o.size} ${o.size}`}>
        <Defs>
          <RadialGradient id={`grad-${name}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor={o.color1} stopOpacity="1" />
            <Stop offset="60%" stopColor={o.color1} stopOpacity="0.4" />
            <Stop offset="100%" stopColor={o.color2} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={o.size}
          height={o.size}
          fill={`url(#grad-${name})`}
        />
      </Svg>
    </View>
  );
}

type Props = {
  density?: 'normal' | 'sparse';
};

export function OrbField({ density = 'normal' }: Props) {
  const keys: OrbKey[] =
    density === 'sparse'
      ? ['peach', 'sage']
      : ['peach', 'lavender', 'sage', 'coralEmber'];

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {keys.map((k) => (
        <Orb key={k} name={k} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
  },
});
