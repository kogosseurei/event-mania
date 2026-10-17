export const breakpoints = {
  base: 0,
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
export type Breakpoint = keyof typeof breakpoints;
