'use client';

import { useActionState } from 'react';
import { signOut } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';

interface SignOutState {
  error: string | null;
}

export function SignOutButton() {
  const [state, formAction, isPending] = useActionState<SignOutState, FormData>(
    async () => signOut(),
    { error: null },
  );

  return (
    <form action={formAction}>
      {state.error && (
        <p className="mb-2 text-sm text-loss-foreground">{state.error}</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Signing out...' : 'Sign Out'}
      </Button>
    </form>
  );
}
