import React from 'react';
import Svg, {
  Circle,
  G,
  Line,
  Path,
  Rect,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Ellipse,
} from 'react-native-svg';

type GlyphProps = {
  size?: number;
  color?: string;
  secondary?: string;
};

/** Faucet with a drop — welcome hero glyph. */
export function FaucetDropGlyph({ size = 40, color = '#AC4218', secondary = '#037524' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path
        d="M10 10h10v6h-4v6h2c4 0 6 3 6 7h-16c0-4 2-7 6-7h2v-6h-4v-6z"
        fill={color}
        fillOpacity={0.85}
      />
      <Circle cx={20} cy={34} r={2.4} fill={secondary} opacity={0.85} />
      <Path
        d="M20 30c-.5 1.2-1.2 2.4-1.2 3.2a1.2 1.2 0 002.4 0c0-.8-.7-2-1.2-3.2z"
        fill={secondary}
      />
    </Svg>
  );
}

/** Wrench — DIY card glyph. */
export function WrenchGlyph({ size = 28, color = '#037524' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Path
        d="M20 4a5 5 0 00-4.6 6.9L4 22.3l1.7 1.7 11.4-11.4A5 5 0 1020 4z"
        fill={color}
        fillOpacity={0.9}
      />
      <Circle cx={20} cy={9} r={1.6} fill="#FFFFFF" opacity={0.6} />
    </Svg>
  );
}

/** Handshake — Hybrid card glyph. */
export function HandshakeGlyph({ size = 28, color = '#FE7E4F' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Path
        d="M2 14l6-6 4 4-2 2-2-1-4 4zm24 0l-6-6-4 4 2 2 2-1 4 4zM14 10l-4 4 4 4 4-4-4-4z"
        fill={color}
        fillOpacity={0.88}
      />
    </Svg>
  );
}

/** Toolbox — Pro card glyph. */
export function ToolboxGlyph({ size = 28, color = '#AC4218' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Rect x={3} y={9} width={22} height={14} rx={2} fill={color} fillOpacity={0.88} />
      <Path
        d="M9 9V6a2 2 0 012-2h6a2 2 0 012 2v3"
        stroke={color}
        strokeWidth={1.8}
        fill="none"
      />
      <Rect x={12} y={13} width={4} height={2.5} rx={0.6} fill="#FFFFFF" opacity={0.6} />
    </Svg>
  );
}

/** Cottage — seasonal card glyph (spring vibe). */
export function CottageGlyph({ size = 36, color = '#626374', secondary = '#96F996' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      <Path
        d="M6 18l12-10 12 10v10a2 2 0 01-2 2H8a2 2 0 01-2-2V18z"
        fill={color}
        fillOpacity={0.82}
      />
      <Rect x={15} y={22} width={6} height={8} fill="#FFFFFF" opacity={0.7} />
      <Circle cx={27} cy={10} r={2} fill={secondary} opacity={0.8} />
      <Circle cx={29.5} cy={13} r={1.4} fill={secondary} opacity={0.6} />
      <Circle cx={24.5} cy={13} r={1} fill={secondary} opacity={0.6} />
    </Svg>
  );
}

/** Piggy-house — savings glyph. */
export function PiggyHouseGlyph({ size = 44, color = '#AC4218', secondary = '#96F996' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Defs>
        <SvgLinearGradient id="piggyGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFB896" />
          <Stop offset="1" stopColor="#FE7E4F" />
        </SvgLinearGradient>
      </Defs>
      <Path
        d="M6 24l16-12 16 12v8a4 4 0 01-4 4H10a4 4 0 01-4-4v-8z"
        fill="url(#piggyGrad)"
        fillOpacity={0.95}
      />
      <Ellipse cx={14} cy={28} rx={2} ry={1.2} fill={color} opacity={0.7} />
      <Ellipse cx={30} cy={28} rx={2} ry={1.2} fill={color} opacity={0.7} />
      <Rect x={20} y={22} width={4} height={2} rx={0.5} fill="#FFFFFF" opacity={0.7} />
      <Circle cx={36} cy={14} r={2.2} fill={secondary} opacity={0.7} />
    </Svg>
  );
}

/** Sparkle — used for pulse accents. */
export function SparkleGlyph({ size = 16, color = '#FE7E4F' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M8 0l1.4 5.2L15 6l-5.6 1.4L8 13l-1.4-5.2L1 6l5.6-.8L8 0z"
        fill={color}
      />
    </Svg>
  );
}

/** Check circle — stage completed. */
export function CheckGlyph({ size = 20, color = '#037524' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={9} fill={color} fillOpacity={0.18} />
      <Path
        d="M5.5 10.5l3 3L14.5 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** Camera — tab bar / CTA icon. */
export function CameraGlyph({ size = 28, color = '#FFFFFF' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Rect x={3} y={8} width={22} height={15} rx={3} stroke={color} strokeWidth={1.8} fill="none" />
      <Path d="M10 8l1.5-2h5L18 8" stroke={color} strokeWidth={1.8} fill="none" strokeLinejoin="round" />
      <Circle cx={14} cy={15.5} r={4} stroke={color} strokeWidth={1.8} fill="none" />
    </Svg>
  );
}

/** Plus — FAB icon. */
export function PlusGlyph({ size = 24, color = '#FFFFFF' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={12} y1={5} x2={12} y2={19} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <Line x1={5} y1={12} x2={19} y2={12} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

/** Home tab icon. */
export function HomeGlyph({ size = 22, color = '#383833', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path
        d="M3 10l8-7 8 7v8a2 2 0 01-2 2h-3v-6H8v6H5a2 2 0 01-2-2v-8z"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.9 : 0}
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** My-Home tab icon — overlapping houses. */
export function RoomsGlyph({ size = 22, color = '#383833', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Rect x={3} y={7} width={7} height={12} stroke={color} strokeWidth={1.6} fill={filled ? color : 'none'} fillOpacity={filled ? 0.9 : 0} />
      <Rect x={12} y={3} width={7} height={16} stroke={color} strokeWidth={1.6} fill={filled ? color : 'none'} fillOpacity={filled ? 0.6 : 0} />
    </Svg>
  );
}

/** History tab icon. */
export function HistoryGlyph({ size = 22, color = '#383833', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={1.6} fill={filled ? color : 'none'} fillOpacity={filled ? 0.3 : 0} />
      <Path d="M11 5v7l4 2" stroke={color} strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/** Profile tab icon. */
export function ProfileGlyph({ size = 22, color = '#383833', filled }: GlyphProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Circle cx={11} cy={8} r={4} stroke={color} strokeWidth={1.6} fill={filled ? color : 'none'} fillOpacity={filled ? 0.9 : 0} />
      <Path d="M3 19c1.5-4 5-6 8-6s6.5 2 8 6" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

/** Pin — location glyph. */
export function PinGlyph({ size = 22, color = '#AC4218' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path
        d="M11 20s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
        fill={color}
        fillOpacity={0.16}
        stroke={color}
        strokeWidth={1.6}
      />
      <Circle cx={11} cy={8} r={2.6} fill={color} />
    </Svg>
  );
}

/** Arrow-right — inline links. */
export function ArrowRightGlyph({ size = 16, color = '#AC4218' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M3 8h10m0 0L9 4m4 4l-4 4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** Ring-progress (simple) — home health widget. */
export function HealthRing({
  size = 120,
  value = 87,
  trackColor = '#EFEEE5',
  primary = '#AC4218',
  secondary = '#FE7E4F',
}: {
  size?: number;
  value?: number;
  trackColor?: string;
  primary?: string;
  secondary?: string;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const center = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <SvgLinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={primary} />
          <Stop offset="1" stopColor={secondary} />
        </SvgLinearGradient>
      </Defs>
      <G rotation="-90" origin={`${center},${center}`}>
        <Circle cx={center} cy={center} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <Circle
          cx={center}
          cy={center}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </G>
    </Svg>
  );
}

/** Concentric arcs — processing halo. */
export function HaloRings({ size = 180, color = '#FE7E4F' }: GlyphProps) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={size / 2} cy={size / 2} r={size / 2 - 4} stroke={color} strokeOpacity={0.18} strokeWidth={2} fill="none" />
      <Circle cx={size / 2} cy={size / 2} r={size / 2 - 16} stroke={color} strokeOpacity={0.10} strokeWidth={2} fill="none" />
      <Circle cx={size / 2} cy={size / 2} r={size / 2 - 28} stroke={color} strokeOpacity={0.06} strokeWidth={2} fill="none" />
    </Svg>
  );
}
