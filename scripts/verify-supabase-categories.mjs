// Trusted local development operator. Fictional fixtures only; no schema changes.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const fixtures = {
  active: { id: "30000000-0000-4000-8000-000000000001", name: "Fictional Active Maintenance", slug: "exam-fixture-active", active_status: true },
  inactive: { id: "30000000-0000-4000-8000-000000000002", name: "Fictional Retired Maintenance", slug: "exam-fixture-inactive", active_status: false },
  approved: "20000000-0000-4000-8000-000000000002",
  draft: "20000000-0000-4000-8000-000000000001",
};
const outcomes = [];
const sessions = [];

function elevated(key) {
  if (key?.startsWith("sb_secret_")) return true;
  try { return JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "service_role"; }
  catch { return false; }
}

function db(key) {
  return createClient(process.env.SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(20000) }) },
  });
}

function rows(result) {
  if (result.error) throw Object.assign(new Error("Database check failed"), { code: result.error.code });
  return result.data;
}

async function check(test, run) {
  try {
    await run();
    outcomes.push({ test, result: "PASS" });
    console.log(`PASS: ${test}`);
    return true;
  } catch (error) {
    const code = /^[A-Z0-9_-]{1,30}$/.test(String(error?.code)) ? String(error.code) : "CHECK_FAILED";
    outcomes.push({ test, result: "FAIL", code });
    console.log(`FAIL: ${test} (${code})`);
    return false;
  }
}

async function visibleFixtures(client) {
  const categories = rows(await client.from("service_categories").select("id").in("id", [fixtures.active.id, fixtures.inactive.id]));
  assert.deepEqual(categories.map((row) => row.id), [fixtures.active.id]);
  const mappings = rows(await client.from("service_category_mappings").select("service_id").eq("category_id", fixtures.active.id).in("service_id", [fixtures.approved, fixtures.draft]));
  assert.deepEqual(mappings.map((row) => row.service_id), [fixtures.approved]);
}

async function mutationDenied(client) {
  // No-op values and an already-existing composite key avoid data changes even
  // if a permission is unexpectedly loose. Only 42501 counts as the denial.
  assert.equal((await client.from("service_categories").update({ name: fixtures.active.name }).eq("id", fixtures.active.id)).error?.code, "42501");
  assert.equal((await client.from("service_category_mappings").insert({ service_id: fixtures.approved, category_id: fixtures.active.id })).error?.code, "42501");
}

async function main() {
  const url = new URL(process.env.SUPABASE_URL);
  assert.ok(url.protocol === "https:" && url.hostname.endsWith(".supabase.co"));
  assert.ok(process.env.SUPABASE_ANON_KEY && !elevated(process.env.SUPABASE_ANON_KEY));
  assert.ok(elevated(process.env.SUPABASE_SERVICE_ROLE_KEY));
  const admin = db(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const anon = db(process.env.SUPABASE_ANON_KEY);
  console.log("Development category/mapping checks; retains fictional fixtures for grading evidence.");
  const seeded = await check("Trusted admin: fictional categories and approved/draft mapping fixtures exist", async () => {
    const services = rows(await admin.from("services").select("id,title,status").in("id", [fixtures.approved, fixtures.draft]));
    assert.equal(services.length, 2);
    for (const service of services) {
      assert.ok(service.title.startsWith("Fictional "));
      assert.equal(service.status, service.id === fixtures.approved ? "approved" : "draft");
    }
    const expected = [fixtures.active, fixtures.inactive];
    const existing = rows(await admin.from("service_categories").select("id,name,slug,active_status").in("id", expected.map((category) => category.id)));
    for (const category of existing) assert.deepEqual(category, expected.find((row) => row.id === category.id), "Do not overwrite an existing unrelated fixture.");
    const missing = expected.filter((category) => !existing.some((row) => row.id === category.id));
    if (missing.length) rows(await admin.from("service_categories").insert(missing));
    rows(await admin.from("service_category_mappings").upsert([
      { service_id: fixtures.approved, category_id: fixtures.active.id },
      { service_id: fixtures.draft, category_id: fixtures.active.id },
    ], { onConflict: "service_id,category_id", ignoreDuplicates: true }));
    assert.equal(rows(await admin.from("service_categories").select("id").in("id", expected.map((category) => category.id))).length, 2);
    assert.equal(rows(await admin.from("service_category_mappings").select("service_id").eq("category_id", fixtures.active.id).in("service_id", [fixtures.approved, fixtures.draft])).length, 2);
  });
  if (!seeded) return;
  await check("Anonymous: active category visible; known inactive category hidden", async () => {
    const categories = rows(await anon.from("service_categories").select("id").in("id", [fixtures.active.id, fixtures.inactive.id]));
    assert.deepEqual(categories.map((row) => row.id), [fixtures.active.id]);
  });
  await check("Anonymous: approved-service mapping visible; known draft-service mapping hidden", async () => {
    const mappings = rows(await anon.from("service_category_mappings").select("service_id").eq("category_id", fixtures.active.id).in("service_id", [fixtures.approved, fixtures.draft]));
    assert.deepEqual(mappings.map((row) => row.service_id), [fixtures.approved]);
  });
  const accounts = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  assert.ok(!accounts.error);
  for (const [label, email, role] of [["Provider", "provider-a@example.test", "provider"], ["Client", "client@example.test", "client"]]) {
    let signedIn;
    await check(`${label}: real user session sees active categories and approved mappings only`, async () => {
      const account = accounts.data.users.find((user) => user.email === email);
      assert.ok(account, "Use an existing fictional account only.");
      const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
      assert.ok(!link.error);
      signedIn = db(process.env.SUPABASE_ANON_KEY);
      const response = await signedIn.auth.verifyOtp({ token_hash: link.data.properties.hashed_token, type: "email" });
      assert.ok(!response.error && response.data.user?.id === account.id);
      sessions.push(signedIn);
      const profile = rows(await signedIn.from("profiles").select("role").eq("id", account.id).single());
      assert.equal(profile.role, role);
      await visibleFixtures(signedIn);
    });
    if (signedIn) await check(`${label}: category update and mapping insert are forbidden`, () => mutationDenied(signedIn));
  }
  await check("Trusted admin: inactive category remains visible and administrative update succeeds", async () => {
    const inactive = rows(await admin.from("service_categories").select("id,active_status").eq("id", fixtures.inactive.id).single());
    assert.equal(inactive.active_status, false);
    assert.equal(rows(await admin.from("service_categories").update({ name: fixtures.inactive.name }).eq("id", fixtures.inactive.id).select("id")).length, 1);
  });
}

try { await main(); }
catch { outcomes.push({ test: "Category runner prerequisites", result: "FAIL", code: "SETUP_FAILED" }); console.log("Could not complete setup. Check local development configuration and fixture prerequisites."); }
finally {
  for (const session of sessions) {
    try { await session.auth.signOut({ scope: "local" }); } catch { /* Do not print session details. */ }
  }
  const report = {
    recorded_at: new Date().toISOString(),
    implementation_commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    mode: "hosted-category-mapping-user-sessions",
    scope: "Development Supabase/PostgREST. Category fixtures are fictional. Ordinary user JWTs enforce provider/client RLS. Admin-generated links are exchanged in memory; no email is sent or password changed.",
    limitations: "Does not query PostgreSQL RLS catalog flags. Category active_status is not a coverage-zone flag.",
    outcomes,
  };
  await mkdir("docs/evidence/midterm", { recursive: true });
  await writeFile("docs/evidence/midterm/live-supabase-categories.json", JSON.stringify(report, null, 2) + "\n");
  console.log("Evidence saved: docs/evidence/midterm/live-supabase-categories.json");
  if (outcomes.some((outcome) => outcome.result === "FAIL")) process.exitCode = 1;
}
