'use client';

import { createBrowserClient } from '@supabase/ssr';
import { validateSupabaseEnv } from './env';

export const createClient = () => {
  const { supabaseUrl, supabaseAnonKey } = validateSupabaseEnv();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
