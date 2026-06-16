import { Button } from '@/components/ui/button';
import { signOut } from '../lib/actions/auth';
export default function Home() {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-background md:grid-cols-[15rem_1fr]">
      <aside className="sticky top-0 flex h-dvh flex-col gap-2 overflow-y-auto border-r border-border-subtle bg-sidebar p-5 shadow-xl shadow-black/40">
        <div className="mb-2 flex items-center gap-2.5 border-b border-border-subtle px-2 pb-4">
          <span className="text-[0.9375rem] font-semibold tracking-tight text-foreground">
            Aktie
          </span>
          <span className="rounded-sm border border-sparkline/25 bg-sparkline/10 px-1.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-widest text-sparkline">
            Pro
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          <a className="rounded-md border border-accent/20 bg-surface-raised px-3 py-2 text-sm font-medium text-accent-foreground">
            Watchlist
          </a>
          <a className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground">
            Portfolio
          </a>
          <a className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground">
            News
          </a>
        </nav>
        <div className="flex-1 overflow-y-auto px-6 py-5 pb-8">
          <form action={signOut}>
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-4 border-b border-border-subtle bg-surface/80 px-6 py-5 backdrop-blur-md">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Watchlist</h1>
            <p className="mt-0.5 text-[0.8125rem] text-subtle">12 stocks tracked</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5 pb-8">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-3.5">
            <article className="flex cursor-pointer flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-4 shadow-lg shadow-black/55 transition-all hover:-translate-y-px hover:border-sparkline/30 hover:shadow-xl hover:shadow-black/65 active:translate-y-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[0.9375rem] font-bold tracking-wide text-foreground">
                    AAPL
                  </div>
                  <div className="mt-0.5 max-w-40 truncate text-xs text-subtle">Apple Inc.</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-[1.0625rem] font-semibold tabular-nums text-foreground">
                    $198.42
                  </div>
                  <span className="mt-0.5 inline-flex rounded-sm bg-gain-muted px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums text-gain">
                    +1.24%
                  </span>
                </div>
              </div>
              <div className="h-10 w-full overflow-hidden rounded-sm bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sparkline)_6%,transparent)_0%,transparent_100%)]">
                {/* chart */}
              </div>
              <div className="line-clamp-2 border-t border-border-subtle pt-2.5 text-xs leading-normal text-muted-foreground">
                <div className="mb-1 inline-flex items-center gap-1 text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
                  AI · 2m ago
                </div>
                Strong momentum above SMA 50; volume rising on breakout.
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
