'use server';

import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/actions/auth';
import { generateStockSummary } from '@/lib/ai/generateStockSummary';
import { getTodayUtcDate } from '@/lib/summaries/date';
import { revalidatePath } from 'next/cache';
import getQuote from '@/lib/stocks/getQuote';

interface GenerateSummaryResult {
  success: string | null;
  error: string | null;
}

export const generateSummary = async (formData: FormData): Promise<GenerateSummaryResult> => {
  const user = await getAuthenticatedUser();
  const rawSymbol = String(formData.get('symbol') ?? '');
  const symbol = rawSymbol.trim().toUpperCase();

  if (!symbol) return { success: null, error: 'Symbol is required' };

  try {
    const watchlist = await prisma.watchList.findFirst({
      where: { userId: user.id },
      include: { summaries: true },
    });

    if (!watchlist) return { success: null, error: 'Watchlist not found' };

    // Security: user can only generate for symbols they own
    if (!watchlist.symbols.includes(symbol))
      return { success: null, error: 'Symbol not found in watchlist' };

    const today = getTodayUtcDate();

    const existingSummary = await prisma.stockSummary.findFirst({
      where: {
        watchListId: watchlist.id,
        symbol,
        date: today,
      },
    });

    if (existingSummary) return { success: 'Summary already exists for today', error: null };

    const quote = await getQuote(symbol);

    if (quote.price === null || quote.changePercent === null) {
      return {
        error: quote.error ?? 'Cannot generate summary without market data',
        success: null,
      };
    }

    const summaryText = await generateStockSummary(quote);

    await prisma.stockSummary.create({
      data: {
        watchListId: watchlist.id,
        symbol,
        date: today,
        summary: summaryText ?? '',
      },
    });

    revalidatePath('/');
    return { success: 'Summary generated successfully', error: null };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate summary', success: null };
  }
};
