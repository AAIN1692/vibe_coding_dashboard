import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from 'recharts';
  import type { MonthlyDataPoint } from '../../types/dashboard.types';
  import { formatCurrency } from '../../utils/formatters';
  
  interface RevenueTrendChartProps {
    data: MonthlyDataPoint[];
  }
  
  export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-gray-700">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value: number) => formatCurrency(value)}
              width={80}
            />
            <Tooltip formatter={(value: number) => formatCurrency(value)} labelStyle={{ fontWeight: 600 }} />
            <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="#bfdbfe" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }