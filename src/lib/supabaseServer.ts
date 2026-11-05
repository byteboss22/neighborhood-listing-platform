import "server-only";
import { createClient } from "@supabase/supabase-js";

const auth = { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false };

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error("Database configuration unavailable.");
  return value;
}

/** Each request gets a fresh client; never share a user's authorization state. */
export function supabaseServer(accessToken?: string) {
  return createClient(required("SUPABASE_URL"), required("SUPABASE_ANON_KEY"), {
    auth,
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  });
}

/** Trusted operator scripts only. Never use this for public/provider request handlers.
 * The caller must authorize the admin independently before invoking this function.
 * No HTTP endpoint imports it. service_role bypasses RLS by design.
 */
export function supabaseAdminForTrustedOperation() {
  return createClient(required("SUPABASE_URL"), required("SUPABASE_SERVICE_ROLE_KEY"), { auth });
}
