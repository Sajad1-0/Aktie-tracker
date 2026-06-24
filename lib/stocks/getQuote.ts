import toFinnhubSymbol from './normalizeSymbol';
import type { StockQuote } from './types';

interface FinnhubQuoteResponse {
  c: number; // Current price
  d: number; // Change amount
  dp: number; // Percent change (dp = d / pc * 100)
  pc: number; // Previous close price
}

interface FinnhubSymbolResponse {
  name?: string; // Full company name
}

const getQuote = async (symbol: string): Promise<StockQuote> => {
  const apiSymbol = toFinnhubSymbol(symbol);
  const apiKey = process.env.FINNHUB_API_KEY?.trim();

  if (!apiKey) throw new Error('FINNHUB_API_KEY is not set');

  try {
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(apiSymbol)}&token=${apiKey}`;
    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(apiSymbol)}&token=${apiKey}`;

    // Why cache 5 minutes? Stock prices don't need to update every second.
    // next.revalidate tells Next.js to cache this fetch on the server.
    const cacheOptions = { next: { revalidate: 300 } } as const;

    const [quoteResponse, profileResponse] = await Promise.all([
      fetch(quoteUrl, cacheOptions),
      fetch(profileUrl, cacheOptions),
    ]);

    if (!quoteResponse.ok) {
      return {
        symbol,
        apiSymbol,
        name: null,
        price: null,
        changePercent: null,
        error: `Failed to fetch quote: ${quoteResponse.statusText}`,
      };
    }

    const quoteData = (await quoteResponse.json()) as FinnhubQuoteResponse;
    const profileData = profileResponse.ok
      ? ((await profileResponse.json()) as FinnhubSymbolResponse)
      : {};

    // Finnhub return zeros when symbol is invalid or market closed with no data.
    const hasValidPrice = quoteData.c > 0;

    return {
      symbol,
      apiSymbol,
      name: profileData.name ?? null,
      price: hasValidPrice ? quoteData.c : null,
      changePercent: hasValidPrice ? quoteData.dp : null,
      error: hasValidPrice ? null : `No market data for this symbol: ${apiSymbol}`,
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    throw error;
  }
};

export default getQuote;
