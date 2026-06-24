import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RemoveSymbolForm from '@/components/forms/RemoveSymbolForm';
import { formatPrice, formatChangePercent, isPositiveChange } from '@/lib/stocks/format';
import type { StockQuote } from '@/lib/stocks/types';
import { cn } from '@/lib/utils';
import { StockSummary } from '@/generated/prisma/client';
import { formatSummaryAge } from '@/lib/summaries/format';
import { GenerateSummaryForm } from '@/components/forms/GenerateSummaryForm';

interface StockCardProps {
  quote: StockQuote;
  summary?: StockSummary | null;
}

const StockCard = ({ quote, summary }: StockCardProps) => {
  const isUp = isPositiveChange(quote.changePercent);
  const hasQuoteData = quote.price !== null && quote.changePercent !== null;

  return (
    <Card
      size="sm"
      className={cn(
        'border-border-subtle bg-surface py-0 shadow-lg shadow-black/55',
        'transition-all hover:-translate-y-px hover:border-sparkline/30',
        'hover:shadow-xl hover:shadow-black/65',
      )}
    >
      <CardHeader className="border-b border-border-subtle pb-3">
        <CardTitle className="text-base font-bold tracking-wide text-foreground mt-2">
          {quote.symbol}
        </CardTitle>

        <CardDescription className="max-w-40 truncate text-sm text-subtle">
          {quote.name ?? quote.apiSymbol}
        </CardDescription>

        <CardAction className="flex flex-col items-end gap-2">
          {hasQuoteData ? (
            <div className="text-right mt-2 mb-1.5">
              <div className="font-mono text-base font-semibold tabular-nums text-foreground">
                {formatPrice(quote.price, 'USD')}
              </div>
              {/* change % pill - uses market colors */}
              <Badge
                className={cn(
                  'mt-1.5 font-mono tabular-nums text-xs',
                  isUp
                    ? 'border-gain/25 bg-gain-muted text-gain'
                    : 'border-loss/25 bg-loss-muted text-loss',
                )}
              >
                {formatChangePercent(quote.changePercent)}
              </Badge>
            </div>
          ) : (
            <p className="max-w-40 text-sm text-subtle text-right mt-2 mb-1.5">
              {quote.error ?? 'No data available'}
            </p>
          )}
          <RemoveSymbolForm symbol={quote.symbol} />
        </CardAction>
      </CardHeader>

      {/* Sparkline placeholder */}
      <CardContent className="pt-3">
        <div className="h-10 w-fill overflow-hidden rounded-sm bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sparkline)_6%,transparent)_0%,transparent_100%)]"></div>
      </CardContent>

      {/* AI summary placeholder */}
      <CardFooter className="flex-col items-start border-t border-border-subtle pt-3">
        {summary ? (
          <>
            <div className="text-sm font-semibold tracking-wider text-accent">
              AI . {formatSummaryAge(summary.createdAt)}
            </div>
            <p className="line-clamp-3 text-xs leading-normal text-muted-foreground">
              {summary.summary}
            </p>
          </>
        ) : (
          <>
            <p className="text-xs text-subtle">No Summary for today yet.</p>
            <GenerateSummaryForm symbol={quote.symbol} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default StockCard;
