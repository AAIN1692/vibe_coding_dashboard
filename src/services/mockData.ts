import type { MonthlyDataPoint } from '../types/dashboard.types';

/**
 * Generates a plausible, gradually-varying 12-month dataset ending at the
 * current month, so the mock data always looks "current" regardless of
 * when the app is run.
 */
function generateMockMonthlyData(): MonthlyDataPoint[] {
  const monthCount = 12;
  const now = new Date();
  const points: MonthlyDataPoint[] = [];

  // Base values and gentle per-month growth/seasonality so the trend
  // looks realistic rather than flat or random.
  const baseRevenue = 32000;
  const baseOrders = 420;
  const baseCustomers = 180;
  const baseConversionRate = 0.032;

  for (let i = monthCount - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const monthNumber = date.getMonth() + 1; // 1-12
    const month = `${year}-${String(monthNumber).padStart(2, '0')}`;

    const monthsElapsed = monthCount - 1 - i; // 0 for oldest, 11 for newest
    const growthFactor = 1 + monthsElapsed * 0.035;
    const seasonalWave = Math.sin(monthsElapsed / 2) * 0.05;

    const revenue = Math.round(baseRevenue * growthFactor * (1 + seasonalWave));
    const orders = Math.round(baseOrders * growthFactor * (1 + seasonalWave * 0.8));
    const customers = Math.round(baseCustomers * growthFactor * (1 + seasonalWave * 0.6));
    const conversionRate = Number(
      (baseConversionRate * (1 + monthsElapsed * 0.01) * (1 + seasonalWave * 0.5)).toFixed(4)
    );

    points.push({ month, revenue, orders, customers, conversionRate });
  }

  return points;
}

export const mockMonthlyData: MonthlyDataPoint[] = generateMockMonthlyData();