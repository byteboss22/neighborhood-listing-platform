// Trusted local development test runner. Never import this file into the app.
// Passwords/tokens stay in memory; evidence contains test names and outcomes only.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { secret } from "./hidden-prompt.mjs";
import { assertClientCannotEscalate } from "./client-authorization-check.mjs";

const anonymousOnly = process.argv.includes("--anonymous-only");
const adminTestSessions = process.argv.includes("--admin-test-sessions");
const baseURL = process.env.MIDTERM_APP_URL || "http://localhost:3000";
const fixtures = {
  draftA: "20000000-0000-4000-8000-000000000001",
  approved: "20000000-0000-4000-8000-000000000002",
  draftB: "20000000-0000-4000-8000-000000000003",
  booking: "ec600441-8772-4b4b-a90e-a5adc1680474",
};
const columns = ["id", "title", "hourly_rate", "duration_minutes", "coverage_radius_miles"];
const outcomes = [];
const sessions = [];
const anonKey = process.env.SUPABASE_ANON_KEY;
const projectURL = process.env.SUPABASE_URL;

function isElevated(key) {
  if (key?.startsWith("sb_secret_")) return true;
  try { return JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "service_role"; }
  catch { return false; }
}

function client(key) {
  return createClient(projectURL, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(20000) }) },
  });
}

function rows(result) {
  if (result.error) throw Object.assign(new Error("Database check failed"), { code: result.error.code });
  return result.data;
}

async function check(name, run) {
  try {
    await run();
    outcomes.push({ test: name, result: "PASS" });
    console.log(`PASS: ${name}`);
    return true;
  } catch (error) {
    // Never print raw SDK errors, request headers, credentials or token bodies.
    const code = /^[A-Z0-9_-]{1,30}$/.test(String(error?.code)) ? String(error.code) : "CHECK_FAILED";
    outcomes.push({ test: name, result: "FAIL", code });
    console.log(`FAIL: ${name} (${code})`);
    return false;
  }
}

function skip(name) {
  outcomes.push({ test: name, result: "NOT_RUN" });
  console.log(`NOT RUN: ${name}`);
}

async function login(label, email, expectedRole) {
  let signedIn;
  const method = adminTestSessions ? "real Auth admin-generated test session" : "real Auth password sign-in";
  const ok = await check(`${label}: ${method} and protected profile role`, async () => {
    const db = client(anonKey);
    let response;
    if (adminTestSessions) {
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      assert.ok(key && isElevated(key), "Admin-generated test sessions require the local elevated key.");
      const admin = client(key);
      const users = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      assert.ok(!users.error && users.data.users.some((user) => user.email === email), "Expected existing fictional test user.");
      // generateLink does not send email. Exchange its hash only in memory;
      // database and app requests below still use the ordinary user JWT.
      const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
      assert.ok(!link.error);
      response = await db.auth.verifyOtp({ token_hash: link.data.properties.hashed_token, type: "email" });
    } else {
      let password = await secret(`Password for ${email} (hidden): `);
      response = await db.auth.signInWithPassword({ email, password });
      password = "";
    }
    if (response.error || !response.data.session) throw new Error("Sign-in failed");
    sessions.push(db);
    const { data: { user }, error } = await db.auth.getUser();
    assert.ok(!error && user);
    const profile = rows(await db.from("profiles").select("role").eq("id", user.id).single());
    assert.equal(profile.role, expectedRole);
    signedIn = { db, token: response.data.session.access_token, userId: user.id };
  });
  return ok ? signedIn : null;
}

async function request(path, body, token) {
  return fetch(new URL(path, baseURL), {
    method: "POST", signal: AbortSignal.timeout(20000),
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
}

async function main() {
  assert.ok(projectURL && anonKey, "Fill in .env.local first.");
  assert.ok(!isElevated(anonKey), "The anonymous-key variable must not contain an elevated key.");
  assert.equal(new URL(projectURL).protocol, "https:");
  assert.ok(new URL(projectURL).hostname.endsWith(".supabase.co"));
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(new URL(baseURL).hostname), "Run API tests against the local app.");
  console.log("Live development Supabase checks. Only fictional exam fixtures are used.");
  const anon = client(anonKey);
  await check("Anonymous: known approved service is visible; both known drafts are hidden", async () => {
    const visible = rows(await anon.from("services").select("id").in("id", [fixtures.draftA, fixtures.approved, fixtures.draftB]));
    assert.deepEqual(visible.map((row) => row.id), [fixtures.approved]);
  });
  await check("Anonymous: known persisted booking is hidden", async () => {
    assert.equal(rows(await anon.from("bookings").select("id").eq("id", fixtures.booking)).length, 0);
  });
  await check("Anonymous: profile and provider-ID column reads are denied", async () => {
    assert.equal((await anon.from("profiles").select("id").limit(1)).error?.code, "42501");
    assert.equal((await anon.from("services").select("provider_id").limit(1)).error?.code, "42501");
  });
  await check("Local GET services: exact public columns and approved fixture only", async () => {
    const response = await fetch(new URL("/api/services", baseURL), { signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 200);
    const services = await response.json();
    assert.ok(services.some((service) => service.id === fixtures.approved));
    assert.ok(!services.some((service) => [fixtures.draftA, fixtures.draftB].includes(service.id)));
    for (const service of services) assert.deepEqual(Object.keys(service).sort(), [...columns].sort());
  });
  if (anonymousOnly) {
    skip("Real provider/client password sessions and elevated admin execution (anonymous-only run)");
    return;
  }

  const a = await login("Provider A", "provider-a@example.test", "provider");
  const b = await login("Merchant B", "provider-b@example.test", "merchant");
  const resident = await login("Client", "client@example.test", "client");
  if (a && b) {
    await check("Providers: own draft update succeeds; other-provider/live-service updates affect zero rows", async () => {
      const ownA = rows(await a.db.from("services").select("title,status").eq("id", fixtures.draftA).single());
      const ownB = rows(await b.db.from("services").select("title,status").eq("id", fixtures.draftB).single());
      const approved = rows(await anon.from("services").select("title,status").eq("id", fixtures.approved).single());
      assert.equal(ownA.status, "draft");
      assert.equal(ownB.status, "draft");
      assert.equal(rows(await a.db.from("services").update({ title: ownA.title }).eq("id", fixtures.draftA).select("id")).length, 1);
      assert.equal(rows(await b.db.from("services").update({ title: ownB.title }).eq("id", fixtures.draftB).select("id")).length, 1);
      assert.equal(rows(await a.db.from("services").update({ title: ownB.title }).eq("id", fixtures.draftB).select("id")).length, 0);
      assert.equal(rows(await b.db.from("services").update({ title: ownA.title }).eq("id", fixtures.draftA).select("id")).length, 0);
      assert.equal(rows(await a.db.from("services").update({ title: approved.title }).eq("id", fixtures.approved).select("id")).length, 0);
    });
    await check("Providers: A sees the known booking; B cannot read it", async () => {
      assert.equal(rows(await a.db.from("bookings").select("id").eq("id", fixtures.booking)).length, 1);
      assert.equal(rows(await b.db.from("bookings").select("id").eq("id", fixtures.booking)).length, 0);
    });
    await check("Provider API: real bearer session persists own draft with 201; own draft deletion succeeds", async () => {
      const response = await request("/api/services", { title: "Fictional live audit service", hourly_rate: 10, duration_minutes: 15, coverage_radius_miles: 1 }, a.token);
      assert.equal(response.status, 201);
      const persisted = await response.json();
      try {
        const { data: { user } } = await a.db.auth.getUser();
        assert.equal(persisted.provider_id, user.id);
        assert.equal(persisted.status, "draft");
      } finally {
        assert.equal(rows(await a.db.from("services").delete().eq("id", persisted.id).select("id")).length, 1);
      }
    });
  } else skip("Provider ownership, booking visibility and authenticated API tests (login prerequisite failed)");

  if (resident) {
    await check("Client: service submission API returns 403", async () => {
      const response = await request("/api/services", { title: "Fictional forbidden client service", hourly_rate: 10, duration_minutes: 15, coverage_radius_miles: 1 }, resident.token);
      assert.equal(response.status, 403);
    });
    await check("Client: own-profile role escalation is denied and role remains client", async () => {
      await assertClientCannotEscalate(resident.db, resident.userId);
    });
    await check("Client: real authenticated booking INSERT succeeds, with no booking read access", async () => {
      const marker = `Fictional live audit ${crypto.randomUUID()}`;
      const result = await resident.db.from("bookings").insert({ service_id: fixtures.approved, client_email: "client@example.test", requested_date: "2026-11-10", notes: marker });
      assert.ok(!result.error);
      assert.equal(rows(await resident.db.from("bookings").select("id").eq("service_id", fixtures.approved)).length, 0);
      if (a) assert.equal(rows(await a.db.from("bookings").select("id").eq("notes", marker)).length, 1);
    });
  } else skip("Authenticated client booking/denial tests (login prerequisite failed)");

  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY || await secret("Optional service-role/secret key for trusted admin tests (Enter to skip): ");
  if (!adminKey) skip("Trusted admin service execution (no elevated credential supplied)");
  else await check("Trusted admin: reads all five tables and updates an already-approved service", async () => {
    assert.ok(isElevated(adminKey), "Expected an elevated administrative key");
    const admin = client(adminKey);
    for (const table of ["profiles", "service_categories", "services", "service_category_mappings", "bookings"]) {
      const data = rows(await admin.from(table).select("*").limit(1));
      if (["profiles", "services", "bookings"].includes(table)) assert.equal(data.length, 1);
    }
    assert.equal(rows(await admin.from("services").update({ status: "approved" }).eq("id", fixtures.approved).eq("status", "approved").select("id")).length, 1);
  });
}

try { await main(); }
catch { outcomes.push({ test: "Runner prerequisites or interactive session", result: "FAIL", code: "SETUP_FAILED" }); console.log("Could not complete setup. Check saved configuration, local server and terminal input."); }
finally {
  for (const db of sessions) {
    try { await db.auth.signOut({ scope: "local" }); } catch { /* Never print session details. */ }
  }
  const report = {
    recorded_at: new Date().toISOString(),
    implementation_commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    mode: anonymousOnly ? "public-only" : adminTestSessions ? "admin-generated-user-sessions" : "interactive-authenticated",
    authentication_note: adminTestSessions ? "User JWTs were obtained by verifying in-memory admin-generated links for existing fictional users. No email was sent and no password was changed. This mode does not test password entry." : "Interactive password sign-in, except for anonymous-only mode.",
    scope: "Hosted Supabase Auth/PostgREST and localhost API; no passwords, keys, tokens or contact details recorded.",
    fixture_note: "Requires the three fictional seeded services and the known public booking. Provider updates retain existing titles. A temporary audit service is deleted; an authenticated fictional audit booking is retained.",
    limitations: "Does not inspect PostgreSQL RLS enablement metadata or prove inactive-category filtering without category fixtures. NOT_RUN items remain pending.",
    outcomes,
  };
  const output = `docs/evidence/midterm/live-supabase-${anonymousOnly ? "public" : adminTestSessions ? "admin-session-audit" : "audit"}.json`;
  await mkdir("docs/evidence/midterm", { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
  console.log(`Evidence saved: ${output}`);
  if (outcomes.some((outcome) => outcome.result === "FAIL")) process.exitCode = 1;
}
