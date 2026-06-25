'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedUser } from '@/lib/actions/auth';
import { validateSymbol } from '@/lib/stocks/validateSymbol';
import getQuote from '@/lib/stocks/getQuote';

const addSymbol = async (formData: FormData) => {
  const user = await getAuthenticatedUser();
  const rawSymbol = String(formData.get('symbol') ?? '');
  const validation = validateSymbol(rawSymbol);

  if (!validation.success) return { error: validation.error, success: null };

  const { symbol } = validation;

  try {
    // validate symbol exists in Finnhub
    const quote = await getQuote(symbol);
    if (quote.price === null) {
      return {
        error: quote.error ?? `Symbol ${symbol} not found in market`,
        success: null,
      };
    }

    const existingWatchList = await prisma.watchList.findFirst({
      where: { userId: user.id },
    });

    if (!existingWatchList) {
      await prisma.watchList.create({
        data: {
          userId: user.id,
          symbols: [symbol],
        },
      });

      revalidatePath('/');
      return { success: 'Symbol added to watchlist', error: null };
    }

    if (existingWatchList.symbols.includes(symbol)) {
      return { error: 'Symbol already exists in watchlist' };
    }

    await prisma.watchList.update({
      where: { id: existingWatchList.id },
      data: {
        symbols: [...existingWatchList.symbols, symbol],
      },
    });

    revalidatePath('/');
    return { success: 'Watchlist updated', error: null };
  } catch (error) {
    console.error('Error adding symbol to watchlist:', error);
    return { error: 'Failed to add symbol to watchlist', success: null };
  }
};

export default addSymbol;
