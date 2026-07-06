import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DashboardData, DashboardState, DateRangeOption } from '../types/dashboard.types';

interface DashboardContextValue extends DashboardState {
  setData: (data: DashboardData | null) => void;
  setSelectedRange: (range: DateRangeOption) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const DEFAULT_RANGE: DateRangeOption = '6m';

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>(DEFAULT_RANGE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: DashboardContextValue = {
    data,
    selectedRange,
    isLoading,
    error,
    setData,
    setSelectedRange,
    setIsLoading,
    setError,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboardContext(): DashboardContextValue {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }

  return context;
}