const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  
  const numberFormatter = new Intl.NumberFormat('en-US');
  
  /** Formats a raw number as USD currency with no decimal places, e.g. 45231 -> "$45,231". */
  export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
  }
  
  /** Formats a decimal ratio as a percentage with one decimal place, e.g. 0.045 -> "4.5%". */
  export function formatPercent(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
  }
  
  /** Formats a raw number with thousands separators, e.g. 12000 -> "12,000". */
  export function formatNumber(value: number): string {
    return numberFormatter.format(value);
  }