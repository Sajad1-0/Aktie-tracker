'use client';

import { createBrowserClient } from '@supabase/ssr';
import env from './env';

const createClient = () => {
  const { supabaseUrl, supabaseAnonKey } = env();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

export default createClient;
