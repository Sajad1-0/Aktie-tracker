'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedUser } from '@/lib/actions/auth';

const removeSymbol = async (formData: FormData) => {
  const user = await getAuthenticatedUser();
  const rawSymbol = String(formData.get('symbol') ?? '');
  const normalizedSymbol = rawSymbol.trim().toUpperCase();

  if (!normalizedSymbol) return { error: 'Symbol is required' };

  try {
    const existingWatchList = await prisma.watchList.findFirst({
      where: { userId: user.id },
    });

    if (!existingWatchList) return { error: 'Watchlist not found' };

    const updatedSymbols = existingWatchList.symbols.filter((s) => s !== normalizedSymbol);

    if (updatedSymbols.length === existingWatchList.symbols.length) {
      return { error: 'Symbol not found in watchlist' };
    }

    await prisma.watchList.update({
      where: { id: existingWatchList.id },
      data: { symbols: updatedSymbols },
    });

    revalidatePath('/');
    return { success: 'Symbol removed from watchlist', error: null };
  } catch (error) {
    console.error('Error removing symbol from watchlist:', error);
    return { error: 'Failed to remove symbol from watchlist', success: null };
  }
};

export default removeSymbol;
