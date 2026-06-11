'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/lib/client';
import createUserProfile from '@/lib/actions/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const SignUpForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputClassName =
    'h-10 border-border-subtle bg-surface text-sm text-muted placeholder:text-subtle focus-visible:border-sparkline/50 focus-visible:ring-sparkline/20';

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

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
      setError(signupError.message);
      setIsLoading(false);
      return;
    }

    if (data.user) {
      await createUserProfile({
        id: data.user.id,
        email,
        name: name || email,
      });
    }

    router.push('/');
    router.refresh(); // refresh the page to update the user data
    setIsLoading(false);
  };

  return (
    <form action={handleSubmit} className="mx-auto mt-20 flex max-w-md flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" placeholder="Your name..." required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="Your email@example.com" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Your password..."
          required
          minLength={6}
          className={inputClassName}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/signin" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
