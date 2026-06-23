export const formatPrice = (price: number | null, currency: 'USD'): string => {
  if (price === null) return '-';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatChangePercent = (changePercent: number | null): string => {
  if (changePercent === null) return '-';

  const prefix = changePercent > 0 ? '+' : '';
  return `${prefix}${changePercent.toFixed(2)}%`;
};

export const isPositiveChange = (changePercent: number | null): boolean => {
  return changePercent !== null && changePercent >= 0;
};
