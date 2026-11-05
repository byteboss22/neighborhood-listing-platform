// Trusted local administrator utility for the two existing fictional providers.
// No credentials are stored or included in command-line arguments/evidence.
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";
import { secret, confirmedPassword } from "./hidden-prompt.mjs";

if (process.argv.includes("--help")) {
  console.log("Run npm run auth:reset-providers in an interactive terminal. Enter the development project's secret/service-role key and new passwords when prompted. Updates only the two known fictional provider accounts, confirms them and verifies password sign-in. Credentials are not saved.");
  process.exit(0);
}

const targets = [
  { id: "011e39db-91ee-4314-9d52-e4d481aceb13", email: "provider-a@example.test" },
  { id: "edf00cab-99fe-4b61-9bce-d60f13466b96", email: "provider-b@example.test" },
];

function elevated(key) {
  if (key.startsWith("sb_secret_")) return true;
  try { return JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "service_role"; }
  catch { return false; }
}

try {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  assert.ok(url && anonKey, "Missing configuration");
  assert.ok(new URL(url).protocol === "https:" && new URL(url).hostname.endsWith(".supabase.co"));
  assert.ok(!elevated(anonKey));
  const options = {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(20000) }) },
  };
  console.log("Resetting the two fictional provider accounts in your configured development project. Existing IDs, profiles and services are preserved.");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || await secret("Development secret/service-role key (hidden): ");
  assert.ok(elevated(key), "An elevated administrative key is required");
  const admin = createClient(url, key, options);
  // Verify both target identities before performing either password change.
  for (const target of targets) {
    const { data, error } = await admin.auth.admin.getUserById(target.id);
    assert.ok(!error && data.user?.email?.toLowerCase() === target.email, "Could not verify expected test account");
  }
  for (const target of targets) {
    let password = await confirmedPassword(target.email);
    const { error } = await admin.auth.admin.updateUserById(target.id, { password, email_confirm: true });
    if (error) throw Object.assign(new Error("Update failed"), { code: error.code });
    console.log(`Password updated: ${target.email}`);
    const db = createClient(url, anonKey, options);
    const result = await db.auth.signInWithPassword({ email: target.email, password });
    password = "";
    assert.ok(!result.error && result.data.user?.id === target.id, "Password updated, but sign-in verification failed");
    await db.auth.signOut({ scope: "local" });
    console.log(`Sign-in verified: ${target.email}`);
  }
  console.log("Both providers are ready. Run npm run test:live with the new passwords.");
} catch (error) {
  const code = /^[A-Za-z0-9_-]{1,40}$/.test(String(error?.code)) ? String(error.code) : "RESET_NOT_COMPLETED";
  console.error(`Reset did not finish (${code}). Check the development key, matching passwords and project password policy. Earlier account updates, if reported, have already taken effect.`);
  process.exitCode = 1;
}
