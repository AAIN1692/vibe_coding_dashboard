import type { ChangeEvent } from 'react';
import type { DateRangeOption } from '../../types/dashboard.types';
import { useDateRangeFilter } from '../../hooks/useDateRangeFilter';

const RANGE_OPTIONS: { value: DateRangeOption; label: string }[] = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '6m', label: '6M' },
  { value: 'ytd', label: 'YTD' },
  { value: '12m', label: '12M' },
];

export function DateRangeFilter() {
  const { selectedRange, setSelectedRange } = useDateRangeFilter();

  return (
    <div>
      {/* Mobile: dropdown (avoids overlap / cramped controls on narrow screens) */}
      <select
        aria-label="Select date range"
        value={selectedRange}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setSelectedRange(event.target.value as DateRangeOption)
        }
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:hidden"
      >
        {RANGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Tablet/Desktop: inline segmented control */}
      <div
        role="group"
        aria-label="Select date range"
        className="hidden overflow-hidden rounded-md border border-gray-300 sm:inline-flex"
      >
        {RANGE_OPTIONS.map((option) => {
          const isActive = option.value === selectedRange;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedRange(option.value)}
              aria-pressed={isActive}
              className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}