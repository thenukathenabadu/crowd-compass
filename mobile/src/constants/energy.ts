// Energy score thresholds
export const ENERGY_QUIET_MAX = 33;
export const ENERGY_MODERATE_MAX = 66;

// Scoring weights (must sum to 1.0)
export const WEIGHT_NOISE = 0.60;
export const WEIGHT_CROWD = 0.25;
export const WEIGHT_TIME  = 0.15;

// Vibe labels
export const VIBE_LABELS = {
  quiet: 'Quiet',
  moderate: 'Moderate',
  lively: 'Lively',
} as const;

export type VibeKey = keyof typeof VIBE_LABELS;

export function vibeFromScore(score: number): VibeKey {
  if (score <= ENERGY_QUIET_MAX) return 'quiet';
  if (score <= ENERGY_MODERATE_MAX) return 'moderate';
  return 'lively';
}
