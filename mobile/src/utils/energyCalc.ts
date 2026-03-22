import { DB_FLOOR, DB_CEILING, WEIGHT_NOISE, WEIGHT_CROWD, WEIGHT_TIME } from '../constants/config';
import { WEIGHT_NOISE as WN, WEIGHT_CROWD as WC, WEIGHT_TIME as WT } from '../constants/energy';

// Time-of-day prior lookup (day 0=Sun, hour 0-23) → 0-100
// Weekend nights high, early weekday mornings low
function getTimePrior(date: Date): number {
  const day = date.getDay();   // 0 Sun – 6 Sat
  const hour = date.getHours();

  const isWeekend = day === 0 || day === 6;
  const isFriSat = day === 5 || day === 6;

  if (hour >= 0 && hour < 6) return isWeekend ? 20 : 5;
  if (hour >= 6 && hour < 9) return isWeekend ? 15 : 25;
  if (hour >= 9 && hour < 12) return isWeekend ? 35 : 45;
  if (hour >= 12 && hour < 14) return 60;                      // lunch
  if (hour >= 14 && hour < 17) return isWeekend ? 55 : 40;
  if (hour >= 17 && hour < 19) return 65;                      // rush hour
  if (hour >= 19 && hour < 21) return isFriSat ? 75 : 55;
  if (hour >= 21 && hour < 24) return isFriSat ? 80 : 40;
  return 30;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function normalizeDb(dbfs: number): number {
  return clamp((dbfs - DB_FLOOR) / (DB_CEILING - DB_FLOOR) * 100, 0, 100);
}

export function normalizeCrowd(crowdLevel: number): number {
  return (crowdLevel - 1) / 4 * 100;
}

export function computeEnergyScore(
  dbfs: number,
  crowdLevel: number,
  date: Date = new Date()
): number {
  const noiseNorm = normalizeDb(dbfs);
  const crowdNorm = normalizeCrowd(crowdLevel);
  const timePrior = getTimePrior(date);

  return Math.round(
    WEIGHT_NOISE * noiseNorm +
    WEIGHT_CROWD * crowdNorm +
    WEIGHT_TIME  * timePrior
  );
}
