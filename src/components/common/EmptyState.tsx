interface EmptyStateProps {
    message?: string;
  }
  
  export function EmptyState({
    message = 'No data available for the selected date range.',
  }: EmptyStateProps) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-2.5 5H6.5L4 13m16 0h-4.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293h-1.172a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 008.586 13H4"
          />
        </svg>
        <p className="text-sm font-medium text-gray-600">{message}</p>
      </div>
    );
  }