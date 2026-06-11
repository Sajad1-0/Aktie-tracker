import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { validateSupabaseEnv } from './env';

export const createClient = async () => {
  const cookieStore = await cookies();
  const { supabaseUrl, supabaseAnonKey } = validateSupabaseEnv();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch (error) {
          console.warn('Failed to set cookies (expected in Server Components):', error);
        }
      },
    },
  });
};
