import { Suspense } from 'react';
import { Watchlist, WatchlistSkeleton } from '../features/watchlist/components/WatchList';

export default function Home() {
  return (
    <Suspense fallback={<WatchlistSkeleton />}>
      <Watchlist />
    </Suspense>
  );
}
