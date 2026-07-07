import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from 'recharts';
  import type { MonthlyDataPoint } from '../../types/dashboard.types';
  import { formatPercent } from '../../utils/formatters';
  
  interface ConversionRateChartProps {
    data: MonthlyDataPoint[];
  }
  
  export function ConversionRateChart({ data }: ConversionRateChartProps) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-gray-700">Conversion Rate</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value: number) => formatPercent(value)}
              width={60}
            />
            <Tooltip formatter={(value: number) => formatPercent(value)} labelStyle={{ fontWeight: 600 }} />
            <Line type="monotone" dataKey="conversionRate" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }