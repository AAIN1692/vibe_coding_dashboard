import type { TrendResult } from '../types/dashboard.types';

/**
 * Computes the change between a current and previous period value.
 * Pure function: no side effects, same inputs always produce the same output.
 */
export function computeTrend(current: number, previous: number): TrendResult {
  const deltaValue = current - previous;

  if (previous === 0) {
    return {
      deltaValue,
      deltaPercent: deltaValue === 0 ? 0 : 100,
      direction: deltaValue === 0 ? 'flat' : deltaValue > 0 ? 'up' : 'down',
    };
  }

  const deltaPercent = Number(((deltaValue / previous) * 100).toFixed(1));
  const direction: TrendResult['direction'] =
    deltaValue > 0 ? 'up' : deltaValue < 0 ? 'down' : 'flat';

  return { deltaValue, deltaPercent, direction };
}