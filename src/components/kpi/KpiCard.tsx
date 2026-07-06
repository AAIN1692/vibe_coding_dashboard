import type { TrendResult } from '../../types/dashboard.types';

interface KpiCardProps {
  label: string;
  value: string;
  trend: TrendResult;
}

const TREND_STYLES: Record<TrendResult['direction'], { color: string; icon: string }> = {
  up: { color: 'text-green-600', icon: '▲' },
  down: { color: 'text-red-600', icon: '▼' },
  flat: { color: 'text-gray-500', icon: '▬' },
};

export function KpiCard({ label, value, trend }: KpiCardProps) {
  const { color, icon } = TREND_STYLES[trend.direction];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
      <p className={`mt-2 flex items-center gap-1 text-sm font-medium ${color}`}>
        <span aria-hidden="true">{icon}</span>
        <span>{Math.abs(trend.deltaPercent)}% vs previous period</span>
      </p>
    </div>
  );
}