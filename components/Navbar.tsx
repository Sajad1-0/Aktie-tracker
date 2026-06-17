import Link from 'next/link';
import { SignOutButton } from './SignOutButton';

const Navbar = () => {
  return (
    <aside className="flex flex-col gap-2 border-b border-border-subtle bg-sidebar p-5 md:sticky md:top-0 md:h-dvh md:border-b-0 md:border-r md:shadow-xl md:shadow-black/40">
      <div className="mb-2 flex items-center gap-2.5 border-b border-border-subtle px-2 pb-4">
        <span className="text-[0.9375rem] font-semibold tracking-tight text-foreground">Aktie</span>
        <span className="rounded-sm border border-sparkline/25 bg-sparkline/10 px-1.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-widest text-sparkline">
          Pro
        </span>
      </div>

      <nav className="flex flex-col gap-0.5">
        <Link
          href="/"
          className="rounded-md border border-accent/20 bg-surface-raised px-3 py-2 text-sm font-medium text-accent-foreground"
        >
          Watchlist
        </Link>
        <Link
          href="/portfolio"
          className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
        >
          Portfolio
        </Link>
        <Link
          href="/news"
          className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
        >
          News
        </Link>
      </nav>

      <div className="mt-auto border-t border-border-subtle pt-4">
        <SignOutButton />
      </div>
    </aside>
  );
};

export default Navbar;
