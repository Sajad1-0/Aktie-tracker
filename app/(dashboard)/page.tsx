import { Suspense } from 'react';
import { Watchlist, WatchlistSkeleton } from '@/app/features/watchlist/components/Watchlist';

export default function Home() {
  return (
    <Suspense fallback={<WatchlistSkeleton />}>
      <Watchlist />
    </Suspense>
  );
}
