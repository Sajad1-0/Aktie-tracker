import type { StockSummary, WatchList } from '@/generated/prisma/client';
import { isSameUtcDay } from './date';

type WatchListWithSummaries = WatchList & {
  summaries: StockSummary[];
};

export function findSummaryForSymbol(
  watchlists: WatchListWithSummaries[],
  symbol: string,
): StockSummary | null {
  for (const watchlist of watchlists) {
    if (!watchlist.symbols.includes(symbol)) {
      continue;
    }

    const summary = watchlist.summaries.find(
      (item) => item.symbol === symbol && isSameUtcDay(item.date, new Date()),
    );

    if (summary) {
      return summary;
    }
  }

  return null;
}

// Which watchlist owns this symbol - needed when saving a new summary
export const findWatchListIdForSymbol = (
  watchlists: WatchListWithSummaries[],
  symbol: string,
): string | null => {
  const watchlist = watchlists.find((watchlist) => watchlist.symbols.includes(symbol));
  return watchlist?.id ?? null;
};
