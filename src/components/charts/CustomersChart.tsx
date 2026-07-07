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
  import { formatNumber } from '../../utils/formatters';
  
  interface CustomersChartProps {
    data: MonthlyDataPoint[];
  }
  
  export function CustomersChart({ data }: CustomersChartProps) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-gray-700">Customers</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value: number) => formatNumber(value)}
              width={60}
            />
            <Tooltip formatter={(value: number) => formatNumber(value)} labelStyle={{ fontWeight: 600 }} />
            <Area type="monotone" dataKey="customers" stroke="#059669" fill="#a7f3d0" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }