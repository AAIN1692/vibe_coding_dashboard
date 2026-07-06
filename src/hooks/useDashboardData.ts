import { useEffect } from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import { getDashboardData } from '../services/dataService';

/**
 * Side-effect-only hook: keeps DashboardContext's data/isLoading/error in
 * sync with the data service, refetching whenever selectedRange changes.
 * Components read the resulting state via useDashboardContext(); this hook
 * does not return anything itself.
 */
export function useDashboardData(): void {
  const { selectedRange, setData, setIsLoading, setError } = useDashboardContext();

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getDashboardData(selectedRange);
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load dashboard data.';
          setError(message);
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [selectedRange, setData, setIsLoading, setError]);
}