import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const isConfigured = Boolean(url && anonKey);

// For server-rendered pages: reads as an anonymous visitor, so it only ever
// sees published chapters.
export function serverClient(): SupabaseClient {
  if (!isConfigured) throw new Error('Supabase is not configured: set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.');
  return createClient(url!, anonKey!, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

let browser: SupabaseClient | null = null;

// For code running in the reader's browser: keeps the login session.
export function browserClient(): SupabaseClient {
  if (!isConfigured) throw new Error('Supabase is not configured.');
  if (!browser) {
    browser = createClient(url!, anonKey!, {
      auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  return browser;
}
