import createServerClient from '@/lib/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/signIn', origin));
  }

  const supabase = await createServerClient();
  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(new URL('/', origin));
};
