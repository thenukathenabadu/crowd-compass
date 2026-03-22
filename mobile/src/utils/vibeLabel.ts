import { ENERGY_QUIET_MAX, ENERGY_MODERATE_MAX, VIBE_LABELS, VibeKey } from '../constants/energy';

export function vibeFromScore(score: number): VibeKey {
  if (score <= ENERGY_QUIET_MAX) return 'quiet';
  if (score <= ENERGY_MODERATE_MAX) return 'moderate';
  return 'lively';
}

export function vibeLabelFromScore(score: number): string {
  return VIBE_LABELS[vibeFromScore(score)];
}
