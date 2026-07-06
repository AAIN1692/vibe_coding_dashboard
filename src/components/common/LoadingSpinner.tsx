interface LoadingSpinnerProps {
    label?: string;
  }
  
  export function LoadingSpinner({ label = 'Loading dashboard data...' }: LoadingSpinnerProps) {
    return (
      <div role="status" aria-live="polite" className="flex items-center justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <span className="sr-only">{label}</span>
      </div>
    );
  }