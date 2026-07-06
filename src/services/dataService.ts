import type {
    DashboardData,
    DateRangeOption,
    MonthlyDataPoint,
    PeriodMetrics,
  } from '../types/dashboard.types';
  import { mockMonthlyData } from './mockData';
  
  /**
   * Toggle used by tests/dev tools to force getDashboardData() to reject,
   * so the app's error-state UI can be exercised without a real backend.
   */
  let shouldSimulateFailure = false;
  
  export function setSimulatedFailure(enabled: boolean): void {
    shouldSimulateFailure = enabled;
  }
  
  /** Maps a fixed-length range to how many trailing months of data to include. */
  const RANGE_TO_MONTH_COUNT: Record<Exclude<DateRangeOption, 'ytd'>, number> = {
    '7d': 1,
    '30d': 1,
    '6m': 6,
    '12m': 12,
  };
  
  function resolveWindowStartIndex(
    monthlyData: MonthlyDataPoint[],
    range: DateRangeOption
  ): number {
    const lastIndex = monthlyData.length - 1;
  
    if (range === 'ytd') {
      const currentYear = monthlyData[lastIndex].month.slice(0, 4);
      const yearStartIndex = monthlyData.findIndex((point) =>
        point.month.startsWith(currentYear)
      );
      return yearStartIndex === -1 ? 0 : yearStartIndex;
    }
  
    const monthCount = RANGE_TO_MONTH_COUNT[range];
    return Math.max(0, lastIndex - monthCount + 1);
  }
  
  function aggregatePeriod(points: MonthlyDataPoint[]): PeriodMetrics {
    const totals = points.reduce(
      (acc, point) => ({
        monthlyRevenue: acc.monthlyRevenue + point.revenue,
        orders: acc.orders + point.orders,
        customers: acc.customers + point.customers,
        conversionRateSum: acc.conversionRateSum + point.conversionRate,
      }),
      { monthlyRevenue: 0, orders: 0, customers: 0, conversionRateSum: 0 }
    );
  
    return {
      monthlyRevenue: totals.monthlyRevenue,
      orders: totals.orders,
      customers: totals.customers,
      conversionRate: Number((totals.conversionRateSum / points.length).toFixed(4)),
    };
  }
  
  function buildDashboardData(
    monthlyData: MonthlyDataPoint[],
    range: DateRangeOption
  ): DashboardData {
    const startIndex = resolveWindowStartIndex(monthlyData, range);
    const currentWindow = monthlyData.slice(startIndex, monthlyData.length);
  
    const windowLength = currentWindow.length;
    const previousEndIndex = startIndex - 1;
    const previousStartIndex = Math.max(0, previousEndIndex - windowLength + 1);
  
    // Fall back to the current window itself (flat trend) when there isn't
    // enough preceding history in the mock dataset to form a real comparison.
    const previousWindow =
      previousEndIndex >= 0
        ? monthlyData.slice(previousStartIndex, previousEndIndex + 1)
        : currentWindow;
  
    return {
      kpiSummary: {
        current: aggregatePeriod(currentWindow),
        previous: aggregatePeriod(previousWindow),
      },
      monthlyData: currentWindow,
    };
  }
  
  /**
   * Public data access contract used by hooks/components. Simulates an async
   * network call (latency + optional failure) over the local mock dataset,
   * so this function can be swapped for a real API call later without any
   * caller-side changes.
   */
  export function getDashboardData(range: DateRangeOption): Promise<DashboardData> {
    const simulatedLatencyMs = 500 + Math.random() * 300; // 500-800ms
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSimulateFailure) {
          reject(new Error('Failed to load dashboard data. Please try again.'));
          return;
        }
  
        resolve(buildDashboardData(mockMonthlyData, range));
      }, simulatedLatencyMs);
    });
  }