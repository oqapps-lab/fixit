import React from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient as SvgLinearGradient,
  Path,
  Polyline,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { colors } from '@/constants/tokens';

type GlyphProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function ChevronLeftGlyph({ size = 20, color = '#F5F5F7', strokeWidth = 1.6 }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Polyline
        points="12,4 5,10 12,16"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronRightGlyph({ size = 16, color = '#A8A8AD', strokeWidth = 1.4 }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Polyline
        points="6,3 11,8 6,13"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MenuGlyph({ size = 20, color = '#F5F5F7' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Line x1={3} y1={6} x2={17} y2={6} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={3} y1={10} x2={17} y2={10} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={3} y1={14} x2={17} y2={14} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function AvatarCircle({ size = 28 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: colors.hairlineStrong,
        backgroundColor: colors.surface2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20">
        <Circle cx={10} cy={7.5} r={3.5} stroke={colors.textSecondary} strokeWidth={1.2} fill="none" />
        <Path
          d="M3.5 17c1-3 3.5-4.5 6.5-4.5s5.5 1.5 6.5 4.5"
          stroke={colors.textSecondary}
          strokeWidth={1.2}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export function GearGlyph({ size = 18, color = '#A8A8AD' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Circle cx={9} cy={9} r={2.4} stroke={color} strokeWidth={1.3} fill="none" />
      <Circle cx={9} cy={9} r={6} stroke={color} strokeWidth={1.3} strokeDasharray="1.8 2" fill="none" />
    </Svg>
  );
}

export function BellGlyph({ size = 18, color = '#A8A8AD' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path
        d="M9 2v1M4 14V9a5 5 0 0110 0v5l1 1.5H3L4 14zM7 16a2 2 0 004 0"
        stroke={color}
        strokeWidth={1.3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HomeGlyph({ size = 22, color = '#F5F5F7', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path
        d="M3 11l8-7 8 7v9H3v-9z"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.18 : 0}
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Rect x={9} y={13} width={4} height={7} stroke={color} strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

export function WrenchGlyph({ size = 22, color = '#F5F5F7', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path
        d="M15 3a4 4 0 00-3.2 6.4L3 18.2l1.8 1.8L14 10.2A4 4 0 1015 3z"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.2 : 0}
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ClockGlyph({ size = 22, color = '#F5F5F7', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={1.4} fill={filled ? color : 'none'} fillOpacity={filled ? 0.2 : 0} />
      <Polyline points="11,5 11,11 15,13" stroke={color} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function VaultGlyph({ size = 22, color = '#F5F5F7', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Rect x={3} y={4} width={16} height={14} rx={2} stroke={color} strokeWidth={1.4} fill={filled ? color : 'none'} fillOpacity={filled ? 0.16 : 0} />
      <Circle cx={11} cy={11} r={3.5} stroke={color} strokeWidth={1.4} fill="none" />
      <Line x1={11} y1={11} x2={14} y2={8} stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function PinGlyph({ size = 18, color = '#6BCBD9' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path
        d="M9 16s5-5 5-9a5 5 0 10-10 0c0 4 5 9 5 9z"
        fill={color}
        fillOpacity={0.18}
        stroke={color}
        strokeWidth={1.2}
      />
      <Circle cx={9} cy={7} r={1.8} fill={color} />
    </Svg>
  );
}

export function ArrowUpRightGlyph({ size = 14, color = '#A8A8AD' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Line x1={3} y1={11} x2={11} y2={3} stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Polyline points="5,3 11,3 11,9" stroke={color} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function RescanGlyph({ size = 14, color = '#6BCBD9' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Path
        d="M12 7a5 5 0 11-1.5-3.6M12 3v2.5h-2.5"
        stroke={color}
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CameraGlyph({ size = 18, color = '#F5F5F7' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Rect x={2} y={5} width={14} height={10} rx={1.6} stroke={color} strokeWidth={1.4} fill="none" />
      <Path d="M6 5l1-1.5h4L12 5" stroke={color} strokeWidth={1.4} fill="none" strokeLinejoin="round" />
      <Circle cx={9} cy={10} r={2.6} stroke={color} strokeWidth={1.4} fill="none" />
    </Svg>
  );
}

/**
 * House wireframe — used on Your House / Home screens.
 * Thin 1px lines, optional tags at positions.
 */
export function HouseWireframe({
  size = 240,
  withGrid = true,
}: {
  size?: number;
  withGrid?: boolean;
}) {
  const w = size;
  const h = size * 1.0;
  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {withGrid ? (
        <G opacity={0.12}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Line
              key={`v${i}`}
              x1={(i + 1) * (w / 8)}
              y1={0}
              x2={(i + 1) * (w / 8)}
              y2={h}
              stroke={colors.cyanDim}
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <Line
              key={`hg${i}`}
              x1={0}
              y1={(i + 1) * (h / 8)}
              x2={w}
              y2={(i + 1) * (h / 8)}
              stroke={colors.cyanDim}
              strokeWidth={0.5}
            />
          ))}
        </G>
      ) : null}

      {/* house frame */}
      <G stroke={colors.text} strokeWidth={1.2} fill="none" strokeLinejoin="round">
        <Polyline points={`${w * 0.15},${h * 0.58} ${w * 0.5},${h * 0.22} ${w * 0.85},${h * 0.58}`} />
        <Rect x={w * 0.15} y={h * 0.58} width={w * 0.7} height={h * 0.32} />
        <Rect x={w * 0.25} y={h * 0.65} width={w * 0.14} height={h * 0.13} />
        <Rect x={w * 0.61} y={h * 0.65} width={w * 0.14} height={h * 0.13} />
        <Rect x={w * 0.44} y={h * 0.72} width={w * 0.12} height={h * 0.18} />
      </G>

      {/* chimney */}
      <Rect
        x={w * 0.65}
        y={h * 0.3}
        width={w * 0.05}
        height={h * 0.15}
        stroke={colors.text}
        strokeWidth={1.2}
        fill="none"
      />
    </Svg>
  );
}

export function BlueprintPhoto({ size = 120 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Rect x={4} y={4} width={112} height={112} stroke={colors.cyanDim} strokeWidth={0.6} fill={colors.surface1} />
      <G opacity={0.4}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Line key={`bv${i}`} x1={(i + 1) * 12} y1={0} x2={(i + 1) * 12} y2={120} stroke={colors.cyanDim} strokeWidth={0.3} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <Line key={`bh${i}`} x1={0} y1={(i + 1) * 12} x2={120} y2={(i + 1) * 12} stroke={colors.cyanDim} strokeWidth={0.3} />
        ))}
      </G>
      <Circle cx={60} cy={60} r={16} stroke={colors.text} strokeWidth={1} fill="none" />
      <Circle cx={60} cy={60} r={8} stroke={colors.text} strokeWidth={1} fill="none" />
      <Line x1={52} y1={60} x2={68} y2={60} stroke={colors.text} strokeWidth={1} />
    </Svg>
  );
}

export function PulseDot({ size = 10, color = '#6BCBD9' }: GlyphProps) {
  return (
    <View style={{ width: size * 3, height: size * 3, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: size * 2.4, height: size * 2.4, borderRadius: size * 1.2, backgroundColor: color, opacity: 0.15 }} />
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
    </View>
  );
}

export function ToolsPhoto({ size = 120 }: { size?: number }) {
  // Stylized wireframe of tools on bench
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Rect x={0} y={0} width={120} height={120} fill={colors.surface2} />
      <Rect x={30} y={46} width={60} height={10} fill={colors.surface3} />
      <Circle cx={40} cy={50} r={8} stroke={colors.textSecondary} strokeWidth={1} fill="none" />
      <Rect x={46} y={40} width={30} height={4} fill={colors.textSecondary} opacity={0.7} />
      <Path d="M30 75 L55 65 L55 80 Z" fill={colors.textSecondary} opacity={0.7} />
      <Circle cx={80} cy={74} r={6} stroke={colors.textSecondary} strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

export function HandshakePhoto({ size = 120 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Rect x={0} y={0} width={120} height={120} fill={colors.surface2} />
      <Path d="M20 60 L40 50 L50 60 L60 55 L70 60 L80 50 L100 60" stroke={colors.textSecondary} strokeWidth={2} fill="none" strokeLinejoin="round" />
      <Circle cx={35} cy={35} r={10} stroke={colors.textSecondary} strokeWidth={1.2} fill="none" />
      <Circle cx={85} cy={35} r={10} stroke={colors.textSecondary} strokeWidth={1.2} fill="none" />
      <Path d="M30 45 L28 75 M40 45 L42 75 M80 45 L78 75 M90 45 L92 75" stroke={colors.textSecondary} strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

export function ToolboxPhoto({ size = 120 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Rect x={0} y={0} width={120} height={120} fill={colors.surface2} />
      <Rect x={25} y={50} width={70} height={40} stroke={colors.textSecondary} strokeWidth={1.4} fill="none" />
      <Path d="M40 50 V42 H80 V50" stroke={colors.textSecondary} strokeWidth={1.4} fill="none" />
      <Rect x={50} y={60} width={20} height={6} fill={colors.textSecondary} opacity={0.6} />
      <Circle cx={35} cy={50} r={2} fill={colors.textSecondary} />
      <Circle cx={85} cy={50} r={2} fill={colors.textSecondary} />
    </Svg>
  );
}

export function FridgePhoto({ size = 140 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.2} viewBox="0 0 140 168">
      <Rect x={40} y={12} width={60} height={140} stroke={colors.textSecondary} strokeWidth={1.2} fill={colors.surface2} />
      <Line x1={40} y1={64} x2={100} y2={64} stroke={colors.textSecondary} strokeWidth={0.8} />
      <Rect x={92} y={32} width={4} height={12} fill={colors.textSecondary} opacity={0.7} />
      <Rect x={92} y={82} width={4} height={12} fill={colors.textSecondary} opacity={0.7} />
    </Svg>
  );
}

export function HouseCalmIllustration({ size = 140 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.85} viewBox="0 0 140 120">
      <G stroke={colors.text} strokeWidth={1.2} fill="none" strokeLinejoin="round">
        <Polyline points="30,60 70,24 110,60" />
        <Rect x={30} y={60} width={80} height={50} />
        <Rect x={44} y={70} width={14} height={14} />
        <Rect x={82} y={70} width={14} height={14} />
        <Rect x={62} y={82} width={16} height={28} />
      </G>
      <Path d="M44 16 Q48 10 52 16 Q56 22 48 20 Q42 20 44 16Z" fill={colors.text} opacity={0.5} />
      <Circle cx={36} cy={10} r={2} fill={colors.text} opacity={0.4} />
      <Circle cx={58} cy={8} r={1.5} fill={colors.text} opacity={0.3} />
    </Svg>
  );
}

export function WarmHouse({ size = 160 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.8} viewBox="0 0 160 128">
      <Defs>
        <SvgLinearGradient id="warmWindow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFC89A" stopOpacity={0.9} />
          <Stop offset="1" stopColor="#E8752A" stopOpacity={0.7} />
        </SvgLinearGradient>
      </Defs>
      <G stroke={colors.textSecondary} strokeWidth={1.2} fill={colors.surface1} strokeLinejoin="round">
        <Polyline points="20,64 80,20 140,64" />
        <Rect x={20} y={64} width={120} height={58} />
      </G>
      {/* lit windows */}
      <Rect x={34} y={72} width={18} height={20} fill="url(#warmWindow)" />
      <Rect x={108} y={72} width={18} height={20} fill="url(#warmWindow)" />
      <Rect x={72} y={72} width={16} height={20} fill="url(#warmWindow)" opacity={0.6} />
      <Rect x={56} y={88} width={48} height={34} stroke={colors.textSecondary} strokeWidth={1} fill={colors.surface1} />
      <Rect x={66} y={92} width={28} height={28} fill="url(#warmWindow)" opacity={0.4} />
    </Svg>
  );
}

export function BlueprintRoofScene({ size = 200 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.9} viewBox="0 0 200 180">
      <G opacity={0.25}>
        {Array.from({ length: 14 }).map((_, i) => (
          <Line key={`xv${i}`} x1={(i + 1) * (200 / 14)} y1={0} x2={(i + 1) * (200 / 14)} y2={180} stroke={colors.cyanDim} strokeWidth={0.4} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <Line key={`xh${i}`} x1={0} y1={(i + 1) * (180 / 12)} x2={200} y2={(i + 1) * (180 / 12)} stroke={colors.cyanDim} strokeWidth={0.4} />
        ))}
      </G>
      <G stroke={colors.text} strokeWidth={1.2} fill="none" strokeLinejoin="round">
        <Polyline points="40,110 100,50 160,110" />
        <Line x1={40} y1={110} x2={160} y2={110} />
        <Line x1={70} y1={90} x2={100} y2={80} />
      </G>
      <Circle cx={80} cy={82} r={5} fill={colors.cyan} />
      <Circle cx={120} cy={92} r={5} fill={colors.cyan} />
      <Circle cx={100} cy={72} r={4} fill={colors.cyan} />
    </Svg>
  );
}
