import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from 'recharts';
  import type { MonthlyDataPoint } from '../../types/dashboard.types';
  import { formatNumber } from '../../utils/formatters';
  
  interface OrdersBarChartProps {
    data: MonthlyDataPoint[];
  }
  
  export function OrdersBarChart({ data }: OrdersBarChartProps) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-gray-700">Orders</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value: number) => formatNumber(value)}
              width={60}
            />
            <Tooltip formatter={(value: number) => formatNumber(value)} labelStyle={{ fontWeight: 600 }} />
            <Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }