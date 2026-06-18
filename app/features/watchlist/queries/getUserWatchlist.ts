import prisma from '@/lib/prisma';

const getUserWatchlist = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { watchlists: { include: { summaries: true } } },
  });

  if (!user) {
    return null;
  }

  return user;
};

export default getUserWatchlist;
