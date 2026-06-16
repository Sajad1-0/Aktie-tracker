'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/lib/client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const inputClassName =
  'h-10 border-border-subtle bg-surface text-sm text-foreground placeholder:text-subtle focus-visible:border-sparkline/50 focus-visible:ring-sparkline/20';

const SignInForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface bg-[linear-gradient(var(--chart-grid)_1px,transparent_1px),linear-gradient(90deg,var(--chart-grid)_1px,transparent_1px)] bg-size-[24px_24px] p-6">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-border-subtle bg-surface-raised shadow-lg shadow-black/55">
        <div className="flex flex-col items-center gap-2 border-b border-border-subtle px-6 py-8 text-center">
          <span className="rounded-sm border border-sparkline/25 bg-sparkline/10 px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-widest text-sparkline">
            Aktie Tracker
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-sm text-subtle">Sign in to access your watchlist and portfolio.</p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4 p-4 px-[1.125rem]">
          {error && (
            <p className="rounded-md border border-loss/25 bg-loss-muted px-3 py-2 text-sm text-loss-foreground">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-subtle">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-subtle">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              className={inputClassName}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-1 h-10 w-full bg-sparkline text-sm font-semibold text-surface hover:bg-sparkline/90"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="border-t border-border-subtle px-6 py-4 text-center text-sm text-subtle">
          Don&apos;t have an account?{' '}
          <Link
            href="/signUp"
            className="font-semibold text-sparkline hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
