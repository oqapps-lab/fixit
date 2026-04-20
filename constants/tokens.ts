/**
 * FixIt design tokens — single source of truth.
 * Derived from Stitch 'Sunday Morning Sanctuary' + DESIGN-GUIDE.md.
 * No inline hex allowed outside this file.
 */

export const colors = {
  background: '#FEFCF4',
  surface: '#FEFCF4',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#FBF9F1',
  surfaceContainer: '#F5F4EB',
  surfaceContainerHigh: '#EFEEE5',
  surfaceContainerHighest: '#E9E9DE',
  surfaceDim: '#E4E3D8',

  onSurface: '#383833',
  onSurfaceVariant: '#65655F',
  onSurfaceDim: '#9E9D96',

  outline: '#81817A',
  outlineVariant: '#BAB9B2',

  primary: '#AC4218',
  primaryContainer: '#FE7E4F',
  primaryDim: '#9C370B',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#491300',

  secondary: '#037524',
  secondaryContainer: '#96F996',
  secondaryDim: '#00671E',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#005F1B',

  tertiary: '#626374',
  tertiaryContainer: '#E6E6FA',
  tertiaryDim: '#565768',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#525464',

  error: '#BE2D06',
  errorContainer: '#F95630',
  onError: '#FFFFFF',

  // atmospheric tones — used in gradients + orbs
  cream: '#FEFCF4',
  peachWash: '#FFF1E3',
  peachSoft: '#FFE8D8',
  peach: '#FFDCC4',
  peachWarm: '#FFB896',
  coralEmber: '#FFC1A8',
  coralBright: '#FE7E4F',
  coralDeep: '#AC4218',
  sageWash: '#E4F3E8',
  sageSoft: '#CFE8D5',
  mint: '#96F996',
  sage: '#037524',
  lavenderWash: '#F0EDF7',
  lavender: '#E6E6FA',
  lavenderDeep: '#C9C7E8',
  slate: '#626374',

  // on-gradient helpers (text/glass on atmospheric bg)
  glassWhite: 'rgba(255,255,255,0.85)',
  glassWhiteDim: 'rgba(255,255,255,0.65)',
  glassBorder: 'rgba(255,255,255,0.55)',
  ghostWhite: 'rgba(255,255,255,0.30)',
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Gradients. Named by *mood*, not by location.
 * Each is a tuple of hex stops with start/end in 0-1 space.
 */
export const gradients = {
  // master canvas — vertical atmosphere, every screen
  sanctuary: {
    colors: ['#FEFCF4', '#FFF1E3', '#FFE1D2', '#F1E8DC', '#E8EEE6', '#ECE7F4'] as const,
    locations: [0, 0.22, 0.45, 0.62, 0.8, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // dawn-warmer gradient for welcome / home upper band
  dawn: {
    colors: ['#FEFCF4', '#FFE8D8', '#FFDCC4'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Primary CTA — the glossy coral anchor
  ctaCoral: {
    colors: ['#AC4218', '#FE7E4F'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  ctaCoralGlossy: {
    colors: ['#AC4218', '#D55120', '#FE7E4F', '#FFB896'] as const,
    locations: [0, 0.35, 0.75, 1] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // category tints (carded contexts)
  sageWin: {
    colors: ['#037524', '#5BC26D', '#96F996'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  peachWarm: {
    colors: ['#FFB896', '#FE7E4F', '#ED7244'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  coralDeep: {
    colors: ['#AC4218', '#8A3212'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  lavenderQuiet: {
    colors: ['#F0EDF7', '#E6E6FA', '#C9C7E8'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // glass-pane tints (card backdrop tones)
  glassPeach: {
    colors: ['rgba(255,232,216,0.75)', 'rgba(255,220,196,0.75)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  glassSage: {
    colors: ['rgba(228,243,232,0.75)', 'rgba(207,232,213,0.75)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  glassCoral: {
    colors: ['rgba(255,217,199,0.78)', 'rgba(255,193,168,0.78)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  glassLavender: {
    colors: ['rgba(240,237,247,0.78)', 'rgba(230,230,250,0.78)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // ghost watermark number fill (low-opacity gradient text)
  ghostedNumber: {
    colors: ['rgba(172,66,24,0.22)', 'rgba(254,126,79,0.08)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

export type GradientName = keyof typeof gradients;

/**
 * 4 orbs per screen — soft-blurred radial color patches sitting
 * behind content. Positions in % of screen W/H (can overflow).
 */
export const orbs = {
  peach:      { color1: '#FFDCC4', color2: 'rgba(255,241,227,0.0)', size: 420, top: '-12%',  right:  '-18%', opacity: 0.70 },
  lavender:   { color1: '#E6E1F5', color2: 'rgba(243,240,250,0.0)', size: 360, top:  '34%',  left:   '-22%', opacity: 0.58 },
  sage:       { color1: '#CFE8D5', color2: 'rgba(228,243,232,0.0)', size: 340, bottom: '6%', right:  '-18%', opacity: 0.60 },
  coralEmber: { color1: '#FFC1A8', color2: 'rgba(255,225,210,0.0)', size: 280, bottom: '-8%', left:  '30%',  opacity: 0.55 },
} as const;

export const radii = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 28,
  xl: 36,
  pill: 999,
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  tabBarClearance: 140,
} as const;

export const tracking = {
  labelMicro: 1.8,
  labelWide: 1.2,
  label: 0.6,
  normal: 0,
  hero: -0.8,
  heroDisplay: -1.2,
} as const;

export const typeScale = {
  labelMicro: 10,
  labelSmall: 11,
  bodySmall: 13,
  bodyMedium: 14,
  bodyLarge: 16,
  titleSmall: 18,
  titleMedium: 22,
  titleLarge: 28,
  displaySmall: 32,
  displayMedium: 42,
  displayLarge: 56,
  displayGhost: 120,
  displayGhostMega: 180,
} as const;

export const fonts = {
  // Plus Jakarta Sans
  displayExtraBold: 'PlusJakartaSans_800ExtraBold',
  displayBold: 'PlusJakartaSans_700Bold',
  displaySemibold: 'PlusJakartaSans_600SemiBold',
  displayMedium: 'PlusJakartaSans_500Medium',
  body: 'PlusJakartaSans_400Regular',
  bodyMedium: 'PlusJakartaSans_500Medium',
  bodyLight: 'PlusJakartaSans_300Light',
  // Fraunces italic — hero verdict moments only
  heroItalic: 'Fraunces_500Medium_Italic',
  heroItalicBold: 'Fraunces_700Bold_Italic',
  // Inter — tracked labels
  label: 'Inter_500Medium',
  labelSemibold: 'Inter_600SemiBold',
} as const;

/**
 * Shadows. ALL warm-tinted using `primary` at low opacity.
 * Never neutral grey — that kills the atmospheric mood.
 */
export const shadows = {
  warmCardShadow: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
  },
  warmCardShadowSm: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sageShadow: {
    shadowColor: '#037524',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  peachShadow: {
    shadowColor: '#FE7E4F',
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  coralShadow: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.20,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  lavenderShadow: {
    shadowColor: '#626374',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  pillLg: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.35,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  pillSm: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  glowDotSm: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  glowHaloLg: {
    shadowColor: '#AC4218',
    shadowOpacity: 0.28,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
} as const;
