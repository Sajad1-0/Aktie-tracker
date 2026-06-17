import prisma from '@/lib/prisma';

export const getUserWatchlist = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { watchlists: { include: { summaries: true } } },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
