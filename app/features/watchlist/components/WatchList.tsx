import { SignOutButton } from '@/components/SignOutButton';
import { getAuthenticatedUser } from '@/lib/actions/auth';
import { getUserWatchlist } from '../queries/getUserWatchlist';

export const Watchlist = async () => {
  const user = await getAuthenticatedUser();
  const profile = await getUserWatchlist(user.id);
  const symbols = profile?.watchlists.flatMap((watchlist) => watchlist.symbols) ?? [];

  if (!profile) {
    return <WatchlistProfileMissing />;
  }

  return (
    <div>
      <h1>Watchlist</h1>
      <p>{symbols.length} stocks tracked</p>

      {symbols.length === 0 ? (
        <p>No stocks yet. Add some to get started.</p>
      ) : (
        symbols.map((symbol) => (
          <article key={symbol}>
            <h2>{symbol}</h2>
          </article>
        ))
      )}
    </div>
  );
};

export const WatchlistProfileMissing = () => {
  return (
    <main>
      <h1>Profile not found</h1>
      <p>Please sign out and try again. Or created a new account.</p>
      <SignOutButton />
    </main>
  );
};

export function WatchlistSkeleton() {
  return (
    <div className="space-y-3 p-6">
      <div className="h-8 w-40 animate-pulse rounded bg-muted" />
      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      <div className="h-24 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}
