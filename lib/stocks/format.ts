import { type QuoteCurrency, getQuoteCurrency } from './currency';

export const formatPrice = (price: number | null, currency: QuoteCurrency): string => {
  if (price === null) return '-';

  const locale = currency === 'SEK' ? 'sv-SE' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatPriceForSymbol = (price: number | null, symbol: string): string => {
  return formatPrice(price, getQuoteCurrency(symbol));
};

export const formatChangePercent = (changePercent: number | null): string => {
  if (changePercent === null) return '-';

  const prefix = changePercent > 0 ? '+' : '';
  return `${prefix}${changePercent.toFixed(2)}%`;
};

export const isPositiveChange = (changePercent: number | null): boolean => {
  return changePercent !== null && changePercent >= 0;
};
