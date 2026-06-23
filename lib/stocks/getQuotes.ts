import getQuote from './getQuote';
import toFinnhubSymbol from './normalizeSymbol';
import type { StockQuote } from './types';

const getQuotes = async (symbols: string[]): Promise<StockQuote[]> => {
  if (symbols.length === 0) return [];

  try {
    const results = await Promise.allSettled(symbols.map((symbol) => getQuote(symbol)));

    return results.map((result, index) => {
      if (result.status === 'fulfilled') return result.value;

      return {
        symbol: symbols[index] ?? 'UNKNOWN',
        apiSymbol: toFinnhubSymbol(symbols[index] ?? 'UNKNOWN'),
        name: null,
        price: null,
        changePercent: null,
        error: 'Unknown error',
      };
    });
  } catch (error) {
    console.error(`Error fetching quotes for ${symbols.join(', ')}:`, error);
    return symbols.map((symbol) => ({
      symbol,
      apiSymbol: toFinnhubSymbol(symbol),
      name: null,
      price: null,
      changePercent: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }));
  }
};

export default getQuotes;
