import { SignOutButton } from '@/components/forms/SignOutButton';
import { getAuthenticatedUser } from '@/lib/actions/auth';
import getUserWatchlist from '../queries/getUserWatchlist';
import AddSymbolForm from '@/components/forms/AddSymbolForm';
import RemoveSymbolForm from '@/components/forms/RemoveSymbolForm';

export const Watchlist = async () => {
  const user = await getAuthenticatedUser();
  const profile = await getUserWatchlist(user.id);
  const symbols = profile?.watchlists.flatMap((watchlist) => watchlist.symbols) ?? [];

  if (!profile) {
    return <WatchlistProfileMissing />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-wide">Watchlist</h1>
        <p className="text-sm text-subtle">{symbols.length} stocks tracked</p>
      </div>

      <AddSymbolForm />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-3.5">
        {symbols.map((symbol) => (
          <article
            key={symbol}
            className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-[0.9375rem] font-bold tracking-wide">{symbol}</h2>
              <RemoveSymbolForm symbol={symbol} />
            </div>
          </article>
        ))}
      </div>
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
