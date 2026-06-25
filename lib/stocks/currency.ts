import toFinnhubSymbol from './normalizeSymbol';

export type QuoteCurrency = 'USD' | 'SEK';

export const getQuoteCurrency = (symbol: string): QuoteCurrency => {
  const apiSymbol = toFinnhubSymbol(symbol);

  if (apiSymbol.endsWith('.ST')) return 'SEK';

  return 'USD';
};
