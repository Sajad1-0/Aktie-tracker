'use client';
import { useActionState, useRef } from 'react';
import addSymbol from '@/app/features/watchlist/actions/addSymbol';
import { AutoDismissMessage } from '@/components/AutoDismissMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddSymbolState {
  success: string | null;
  error: string | null;
}

const initialState: AddSymbolState = {
  success: null,
  error: null,
};

const inputClassName =
  'h-10 border-border-subtle bg-surface text-sm text-foreground placeholder:text-subtle focus-visible:border-sparkline/50 focus-visible:ring-sparkline/20';

const AddSymbolForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<AddSymbolState, FormData>(
    async (prevState, formData) => {
      const result = await addSymbol(formData);

      if (result.success) {
        formRef.current?.reset();
      }

      return {
        error: result.error ?? null,
        success: result.success ?? null,
      };
    },
    initialState,
  );

  return (
    <form action={formAction} ref={formRef} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="symbol" className="text-subtle">
          {' '}
          Add Symbol
        </Label>
        <Input
          id="symbol"
          name="symbol"
          placeholder="AAPL or TSLA"
          required
          autoComplete="off"
          className={inputClassName}
        />
      </div>

      {state.error && (
        <p className="rounded-md border border-loss/25 bg-loss-muted px-3 py-2 text-sm text-loss-foreground">
          {state.error}
        </p>
      )}

      {state.success && (
        <AutoDismissMessage
          key={state.success}
          message={state.success}
          className="rounded-md border border-gain/25 bg-gain-muted px-3 py-2 text-sm text-gain-foreground"
        />
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-10 w-full bg-sparkline text-sm font-semibold text-surface hover:bg-sparkline/90"
      >
        {isPending ? 'Adding...' : 'Add Symbol'}
      </Button>
    </form>
  );
};

export default AddSymbolForm;
