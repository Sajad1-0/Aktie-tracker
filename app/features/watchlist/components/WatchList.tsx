import { SignOutButton } from '@/components/forms/SignOutButton';
import { getAuthenticatedUser } from '@/lib/actions/auth';
import getUserWatchlist from '../queries/getUserWatchlist';
import AddSymbolForm from '@/components/forms/AddSymbolForm';
import getQuotes from '@/lib/stocks/getQuotes';
import StockCard from './StockCard';

export const Watchlist = async () => {
  const user = await getAuthenticatedUser();
  const profile = await getUserWatchlist(user.id);

  if (!profile) {
    return <WatchlistProfileMissing />;
  }

  const symbols = profile?.watchlists.flatMap((watchlist) => watchlist.symbols) ?? [];
  const quotes = await getQuotes(symbols);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-wide">Watchlist</h1>
        <p className="text-sm text-subtle">{symbols.length} stocks tracked</p>
      </div>

      <AddSymbolForm />

      {symbols.length === 0 ? (
        <p className="rounded-lg border border-border-subtle bg-surface-raised p-4 text-sm text-subtle">
          No stocks yet. Add your first symbol above - try <strong>AAPL</strong> or{' '}
          <strong>VOLV-B</strong>
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-3.5">
          {quotes.map((quote) => (
            <StockCard key={quote.symbol} quote={quote} />
          ))}
        </div>
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
