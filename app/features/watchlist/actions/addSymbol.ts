'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedUser } from '@/lib/actions/auth';

const addSymbol = async (formData: FormData) => {
  const user = await getAuthenticatedUser();
  const rawSymbol = String(formData.get('symbol') ?? '');
  const symbol = rawSymbol.trim().toUpperCase();

  if (!symbol) return { error: 'Symbol is required' };

  try {
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
