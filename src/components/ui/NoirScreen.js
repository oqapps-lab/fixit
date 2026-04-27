import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { colors, gradients } from '@/constants/tokens';
export function NoirScreen({ children, glow = 'amber', style }) {
    const { width } = Dimensions.get('window');
    const orbSize = width * 1.6;
    return (<View style={[styles.root, style]}>
      {/* base vertical atmospheric gradient */}
      <LinearGradient pointerEvents="none" colors={gradients.bgAtmosphere.colors} locations={gradients.bgAtmosphere.locations} start={gradients.bgAtmosphere.start} end={gradients.bgAtmosphere.end} style={StyleSheet.absoluteFill}/>

      {/* bottom-right amber glow — warm light source */}
      {glow === 'amber' ? (<View pointerEvents="none" style={{
                position: 'absolute',
                width: orbSize,
                height: orbSize,
                bottom: -orbSize * 0.55,
                right: -orbSize * 0.25,
                opacity: 0.75,
            }}>
          <Svg width={orbSize} height={orbSize} viewBox={`0 0 ${orbSize} ${orbSize}`}>
            <Defs>
              <RadialGradient id="amberOrb" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FFA95C" stopOpacity="0.28"/>
                <Stop offset="55%" stopColor="#E8752A" stopOpacity="0.08"/>
                <Stop offset="100%" stopColor="#000000" stopOpacity="0"/>
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width={orbSize} height={orbSize} fill="url(#amberOrb)"/>
          </Svg>
        </View>) : null}

      {/* top-left cyan glow — cool tech hint */}
      {glow === 'amber' || glow === 'cyan' ? (<View pointerEvents="none" style={{
                position: 'absolute',
                width: orbSize * 0.9,
                height: orbSize * 0.9,
                top: -orbSize * 0.4,
                left: -orbSize * 0.3,
                opacity: glow === 'cyan' ? 0.85 : 0.55,
            }}>
          <Svg width={orbSize * 0.9} height={orbSize * 0.9} viewBox={`0 0 ${orbSize * 0.9} ${orbSize * 0.9}`}>
            <Defs>
              <RadialGradient id="cyanOrb" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#6BCBD9" stopOpacity="0.18"/>
                <Stop offset="55%" stopColor="#3E7E88" stopOpacity="0.06"/>
                <Stop offset="100%" stopColor="#000000" stopOpacity="0"/>
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width={orbSize * 0.9} height={orbSize * 0.9} fill="url(#cyanOrb)"/>
          </Svg>
        </View>) : null}

      {children}
    </View>);
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.bg,
    },
});
