export const Colors = {
  // Energy scale
  energyQuiet: '#22C55E',     // 0–33
  energyModerate: '#EAB308',  // 34–66
  energyLively: '#EF4444',    // 67–100

  // Background
  bgPrimary: '#0F172A',
  bgSecondary: '#1E293B',
  bgCard: '#1E293B',
  bgElevated: '#334155',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#475569',

  // Accent
  accent: '#6366F1',
  accentLight: '#818CF8',

  // Tab bar
  tabActive: '#6366F1',
  tabInactive: '#475569',
  tabBackground: '#1E293B',

  // Border
  border: '#334155',

  // Status
  success: '#22C55E',
  error: '#EF4444',
  warning: '#EAB308',
} as const;

export function energyColor(score: number): string {
  if (score <= 33) return Colors.energyQuiet;
  if (score <= 66) return Colors.energyModerate;
  return Colors.energyLively;
}

export function energyColorAlpha(score: number, alpha: number): string {
  const hex = energyColor(score).replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
