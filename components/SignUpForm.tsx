'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/lib/client';
import createUserProfile from '@/lib/actions/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const inputClassName =
  'h-10 border-border-subtle bg-surface text-sm text-foreground placeholder:text-subtle focus-visible:border-sparkline/50 focus-visible:ring-sparkline/20';

interface FormMessage {
  type: 'error' | 'success';
  text: string;
}

const SignUpForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const name = String(formData.get('name'));

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (signupError) {
      setMessage({ type: 'error', text: signupError.message });
      setIsLoading(false);
      return;
    }

    if (data.user?.identities?.length === 0) {
      setMessage({
        type: 'error',
        text: 'This email is already registered. Please sign in instead.',
      });
      setIsLoading(false);
      return;
    }

    if (!data.session) {
      setMessage({
        type: 'success',
        text: 'Check your email to confirm your account before signing in.',
      });
      setIsLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await createUserProfile({
        id: data.user.id,
        email,
        name: name || email,
      });

      if (profileError) {
        setMessage({ type: 'error', text: profileError });
        setIsLoading(false);
        return;
      }
    }

    router.replace('/');
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface bg-[linear-gradient(var(--chart-grid)_1px,transparent_1px),linear-gradient(90deg,var(--chart-grid)_1px,transparent_1px)] bg-size-[24px_24px] p-6">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-border-subtle bg-surface-raised shadow-lg shadow-black/55">
        <div className="flex flex-col items-center gap-2 border-b border-border-subtle px-6 py-8 text-center">
          <span className="rounded-sm border border-sparkline/25 bg-sparkline/10 px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-widest text-sparkline">
            Aktie Tracker
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-subtle">Start tracking stocks with your personal watchlist.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 px-[1.125rem]">
          {message && (
            <p
              className={
                message.type === 'error'
                  ? 'rounded-md border border-loss/25 bg-loss-muted px-3 py-2 text-sm text-loss-foreground'
                  : 'rounded-md border border-gain/25 bg-gain-muted px-3 py-2 text-sm text-gain-foreground'
              }
            >
              {message.text}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-subtle">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              required
              className={inputClassName}
            />
          </div>

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
              placeholder="At least 6 characters"
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
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="border-t border-border-subtle px-6 py-4 text-center text-sm text-subtle">
          Already have an account?{' '}
          <Link
            href="/signIn"
            className="font-semibold text-sparkline hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
