import { useState } from 'react';
import { ConversionRateChart } from '../components/charts/ConversionRateChart';
import { CustomersChart } from '../components/charts/CustomersChart';
import { OrdersBarChart } from '../components/charts/OrdersBarChart';
import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { KpiGrid } from '../components/kpi/KpiGrid';
import { useDashboardContext } from '../context/DashboardContext';
import { useDashboardData } from '../hooks/useDashboardData';

interface DashboardContentProps {
  onRetry: () => void;
}

function DashboardContent({ onRetry }: DashboardContentProps) {
  useDashboardData();
  const { data, isLoading, error } = useDashboardContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!data || data.monthlyData.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <KpiGrid />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueTrendChart data={data.monthlyData} />
        <OrdersBarChart data={data.monthlyData} />
        <CustomersChart data={data.monthlyData} />
        <ConversionRateChart data={data.monthlyData} />
      </div>
    </div>
  );
}

export function DashboardPage() {
  // Remount key: lets the retry button force a fresh fetch even when the
  // selected range hasn't changed, without needing to modify useDashboardData.
  const [retryKey, setRetryKey] = useState(0);

  return (
    <ErrorBoundary>
      <DashboardContent key={retryKey} onRetry={() => setRetryKey((k) => k + 1)} />
    </ErrorBoundary>
  );
}