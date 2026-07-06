export type DateRangeOption = '7d' | '30d' | '6m' | 'ytd' | '12m';

export interface MonthlyDataPoint {
  month: string; // ISO format, e.g., "2026-01"
  revenue: number;
  orders: number;
  customers: number;
  conversionRate: number; // decimal, e.g., 0.045 = 4.5%
}

export interface PeriodMetrics {
  monthlyRevenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
}

export interface KpiSummary {
  current: PeriodMetrics;
  previous: PeriodMetrics; // used to compute trend deltas
}

export interface DashboardData {
  kpiSummary: KpiSummary;
  monthlyData: MonthlyDataPoint[];
}

export interface DashboardState {
  data: DashboardData | null;
  selectedRange: DateRangeOption;
  isLoading: boolean;
  error: string | null;
}

// Derived/computed (not stored, calculated via utils/calculations.ts)
export interface TrendResult {
  deltaValue: number;
  deltaPercent: number;
  direction: 'up' | 'down' | 'flat';
}