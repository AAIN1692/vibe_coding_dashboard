import { useDashboardContext } from '../../context/DashboardContext';
import { computeTrend } from '../../utils/calculations';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';
import { KpiCard } from './KpiCard';

export function KpiGrid() {
  const { data } = useDashboardContext();

  if (!data) {
    return null;
  }

  const { current, previous } = data.kpiSummary;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Monthly Revenue"
        value={formatCurrency(current.monthlyRevenue)}
        trend={computeTrend(current.monthlyRevenue, previous.monthlyRevenue)}
      />
      <KpiCard
        label="Orders"
        value={formatNumber(current.orders)}
        trend={computeTrend(current.orders, previous.orders)}
      />
      <KpiCard
        label="Customers"
        value={formatNumber(current.customers)}
        trend={computeTrend(current.customers, previous.customers)}
      />
      <KpiCard
        label="Conversion Rate"
        value={formatPercent(current.conversionRate)}
        trend={computeTrend(current.conversionRate, previous.conversionRate)}
      />
    </div>
  );
}