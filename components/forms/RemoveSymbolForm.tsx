'use client';

import { useActionState } from 'react';
import { toast } from 'sonner';
import removeSymbol from '@/app/features/watchlist/actions/removeSymbol';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RemoveSymbolForm = ({ symbol }: { symbol: string }) => {
  const [, formAction, isPending] = useActionState(
    async (_prevState: null, formData: FormData) => {
      const result = await removeSymbol(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
      }

      return null;
    },
    null,
  );

  return (
    <form action={formAction}>
      <Input name="symbol" value={symbol} readOnly className="hidden" />
      <Button
        type="submit"
        disabled={isPending}
        className="text-surface hover:text-loss hover:bg-loss/10"
      >
        {isPending ? 'Removing...' : 'Remove'}
      </Button>
    </form>
  );
};

export default RemoveSymbolForm;
