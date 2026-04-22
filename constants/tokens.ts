/**
 * FixIt Noir — design tokens v2.1.
 * Darker, richer, more tonal — not flat-black.
 */

export const colors = {
  // canvas — multi-tonal dark
  bg: '#08080A',
  bgMid: '#0D0E11',
  bgHigh: '#13151A',

  surface1: '#161719',       // card base
  surface2: '#1D1F22',       // elevated card
  surface3: '#26292D',       // pressed / hover
  surface4: '#30333A',       // max tonal

  surfaceBlueprint: '#0C1114',

  // glass overlays (for BlurView content)
  glass1: 'rgba(255,255,255,0.04)',
  glass2: 'rgba(255,255,255,0.07)',
  glass3: 'rgba(255,255,255,0.11)',

  // edge highlights (top of cards — catches "light")
  edgeHighlight: 'rgba(255,255,255,0.08)',
  edgeHighlightStrong: 'rgba(255,255,255,0.14)',

  // hairlines
  hairline: 'rgba(255,255,255,0.06)',
  hairlineStrong: 'rgba(255,255,255,0.12)',
  hairlineCyan: 'rgba(107,203,217,0.20)',
  hairlineAmber: 'rgba(255,169,92,0.28)',
  hairlineDanger: 'rgba(255,90,90,0.35)',

  // text
  text: '#F5F5F7',
  textSecondary: '#A8A8AD',
  textTertiary: '#6E6E74',
  textQuaternary: '#4A4A50',
  textDim: '#33343A',
  textOnAmber: '#1A0F05',

  // accents
  amber: '#FFA95C',
  amberBright: '#FFC089',
  amberDeep: '#E8752A',
  amberDim: '#7A4A22',
  amberGlow: 'rgba(255,169,92,0.22)',

  cyan: '#6BCBD9',
  cyanBright: '#8EDDE9',
  cyanDim: '#3E7E88',
  cyanGlow: 'rgba(107,203,217,0.18)',

  mint: '#6BDE9A',
  mintBright: '#9BEAB5',
  mintDim: '#2C8A52',
  mintGlow: 'rgba(107,222,154,0.18)',

  danger: '#FF5A5A',
  dangerDim: '#8F2929',
  dangerGlow: 'rgba(255,90,90,0.18)',
} as const;

export type ColorToken = keyof typeof colors;

export const gradients = {
  // atmospheric screen background — very subtle vertical depth
  bgAtmosphere: {
    colors: ['#0B0C0F', '#0A0A0B', '#08080A', '#0B0C0F'] as const,
    locations: [0, 0.4, 0.75, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // radial warm glow at bottom (amber)
  glowAmber: {
    colors: ['rgba(255,169,92,0.14)', 'rgba(255,169,92,0.04)', 'rgba(0,0,0,0)'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0.5, y: 1 },
    end: { x: 0.5, y: 0.3 },
  },
  // radial cool glow at top (cyan)
  glowCyan: {
    colors: ['rgba(107,203,217,0.10)', 'rgba(107,203,217,0.03)', 'rgba(0,0,0,0)'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0.2, y: 0 },
    end: { x: 0.8, y: 0.5 },
  },
  // card tonal gradient — for depth feel
  cardTone: {
    colors: ['rgba(38,41,45,1)', 'rgba(22,23,25,1)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  cardToneElevated: {
    colors: ['rgba(48,51,58,1)', 'rgba(29,31,34,1)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // CTA — clean 2-stop amber
  ctaAmber: {
    colors: ['#FFA95C', '#E8752A'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // CTA filled — slightly richer but no streak
  ctaAmberRich: {
    colors: ['#FFC089', '#FFA95C', '#E8752A'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // ring colors
  ringAmber: { colors: ['#FFA95C', '#E8752A'] as const, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  ringCyan:  { colors: ['#8EDDE9', '#6BCBD9'] as const, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  ringMint:  { colors: ['#9BEAB5', '#6BDE9A'] as const, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
} as const;

export type GradientName = keyof typeof gradients;

export const radii = {
  xs: 6,
  sm: 10,
  md: 18,
  lg: 28,
  xl: 36,
  pill: 999,
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
  huge: 52,
  colossal: 72,
  tabBarClearance: 120,
} as const;

export const tracking = {
  docRef: 1.6,
  labelMicro: 2.0,
  labelWide: 1.4,
  label: 0.8,
  normal: 0,
  tight: -0.4,
  tighter: -0.8,
  heroItalic: -0.6,
} as const;

export const typeScale = {
  docRef: 10,
  labelMicro: 10,
  labelSmall: 11,
  bodySmall: 13,
  bodyMedium: 14,
  bodyLarge: 16,
  titleSmall: 18,
  titleMedium: 22,
  titleLarge: 28,
  displaySmall: 34,
  displayMedium: 48,
  displayLarge: 64,
  displayMega: 84,
} as const;

export const fonts = {
  displayNarrowBold: 'ArchivoNarrow_700Bold',
  displayNarrowMedium: 'ArchivoNarrow_500Medium',
  displayExtraBold: 'Archivo_800ExtraBold',
  displayBold: 'Archivo_700Bold',
  displaySemibold: 'Archivo_600SemiBold',

  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  label: 'Inter_500Medium',
  labelSemibold: 'Inter_600SemiBold',

  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',

  heroItalic: 'InstrumentSerif_400Regular_Italic',
} as const;

export const shadows = {
  // Dark-theme "shadow" is actually a colored soft glow for accents.
  glowAmber: {
    shadowColor: '#FFA95C',
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  glowCyan: {
    shadowColor: '#6BCBD9',
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  glowMint: {
    shadowColor: '#6BDE9A',
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  cardLift: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
} as const;
