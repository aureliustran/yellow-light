// Loads .env (if present) and returns an admin Supabase client for scripts.
// The service role key bypasses every security rule: keep it on your computer
// and in GitHub secrets only, never on Vercel.
import { existsSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

export function adminClient() {
  if (existsSync('.env') && typeof process.loadEnvFile === 'function') process.loadEnvFile('.env');
  const url = process.env.PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Thiếu PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY (trong .env hoặc biến môi trường).');
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
