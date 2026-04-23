/** Supabase client factories.
 *
 * Two shapes live here:
 *   * getBrowserSupabase()  — @supabase/auth-helpers-nextjs browser client.
 *       Uses NEXT_PUBLIC_* env vars, persists the session in a cookie
 *       so a future server-rendered dashboard can pick it up.
 *   * getServerAdminSupabase() — server-only admin client using the
 *       service-role key. Used by /api/register to create users and
 *       insert their profile row (bypassing RLS).
 */

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Browser-side client. Safe to call from Client Components. */
export function getBrowserSupabase() {
  return createClientComponentClient();
}

/** Admin client for server-only operations (API routes, server actions).
 * Must never be imported into a client component. Throws if the service
 * role key isn't configured, so misconfiguration fails loud rather than
 * silently attempting writes as the anon role. */
export function getServerAdminSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL not set");
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
