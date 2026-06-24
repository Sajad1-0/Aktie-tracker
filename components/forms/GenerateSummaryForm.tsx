'use client';

import { useActionState } from 'react';
import { generateSummary } from '@/app/features/watchlist/actions/generateSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const GenerateSummaryForm = ({ symbol }: { symbol: string }) => {
  const [, formAction, isPending] = useActionState(async (_prevState: null, formData: FormData) => {
    const result = await generateSummary(formData);

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);
    }

    return null;
  }, null);

  return (
    <form action={formAction}>
      <Input type="hidden" name="symbol" value={symbol} readOnly />
      <Button
        type="submit"
        variant="outline"
        disabled={isPending}
        size="lg"
        className="mt-2 mb-2 p-2 bg-sparkline border-border-subtle text-surface hover:border-sparkline/30 hover:text-foreground"
      >
        {isPending ? 'Generating...' : 'Generate Summary'}
      </Button>
    </form>
  );
};
