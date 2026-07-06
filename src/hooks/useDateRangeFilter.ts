import { useDashboardContext } from '../context/DashboardContext';
import type { DateRangeOption } from '../types/dashboard.types';

export interface UseDateRangeFilterResult {
  selectedRange: DateRangeOption;
  setSelectedRange: (range: DateRangeOption) => void;
}

export function useDateRangeFilter(): UseDateRangeFilterResult {
  const { selectedRange, setSelectedRange } = useDashboardContext();
  return { selectedRange, setSelectedRange };
}