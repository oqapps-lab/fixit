import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, GradientName } from '@/constants/tokens';

type Props = {
  theme?: GradientName;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function AtmosphericGradient({ theme = 'sanctuary', children, style }: Props) {
  const g = gradients[theme];

  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={g.colors as unknown as readonly [string, string, ...string[]]}
        locations={('locations' in g ? g.locations : undefined) as unknown as readonly [number, number, ...number[]] | undefined}
        start={g.start}
        end={g.end}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FEFCF4',
  },
});
