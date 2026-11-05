// Public production HTTP checks. Creates one fictional appointment request.
// Local Supabase admin access verifies persistence; credentials never go to Vercel.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const base = new URL("https://neighborhood-listing-platform-puce.vercel.app");
const approvedId = "20000000-0000-4000-8000-000000000002";
const drafts = ["20000000-0000-4000-8000-000000000001", "20000000-0000-4000-8000-000000000003"];
const publicColumns = ["id", "title", "hourly_rate", "duration_minutes", "coverage_radius_miles"];
const service = { title: "Fictional hosted audit service", hourly_rate: 10, duration_minutes: 15, coverage_radius_miles: 1 };
const outcomes = [];
const marker = `Fictional deployed booking audit ${crypto.randomUUID()}`;
let html = "";
let bookingId;
let chunksChecked = 0;

function elevated(key) {
  if (key?.startsWith("sb_secret_")) return true;
  try { return JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "service_role"; }
  catch { return false; }
}

async function get(path) {
  return fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(20000) });
}

async function post(path, body) {
  return fetch(new URL(path, base), {
    method: "POST", redirect: "manual", signal: AbortSignal.timeout(20000),
    headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
}

async function check(test, run) {
  try {
    await run(); outcomes.push({ test, result: "PASS" }); console.log(`PASS: ${test}`); return true;
  } catch (error) {
    const code = /^[A-Z0-9_-]{1,30}$/.test(String(error?.code)) ? String(error.code) : "CHECK_FAILED";
    outcomes.push({ test, result: "FAIL", code }); console.log(`FAIL: ${test} (${code})`); return false;
  }
}

async function main() {
  const root = await check("Public production homepage returns 200 and contains the services section", async () => {
    const response = await get("/");
    assert.equal(response.status, 200);
    assert.ok(response.headers.get("content-type")?.includes("text/html"));
    html = await response.text();
    assert.ok(html.includes("Local services"));
  });
  const read = await check("Production services GET returns the approved fixture and exactly the public columns", async () => {
    const response = await get("/api/services");
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const services = await response.json();
    const approved = services.find((row) => row.id === approvedId);
    assert.ok(approved?.title.startsWith("Fictional "));
    assert.ok(!services.some((row) => drafts.includes(row.id)));
    for (const row of services) assert.deepEqual(Object.keys(row).sort(), [...publicColumns].sort());
  });
  await check("Production booking GET is unavailable (405)", async () => {
    assert.equal((await get("/api/bookings")).status, 405);
  });
  await check("Invalid production service input returns structured 400", async () => {
    const response = await post("/api/services", {});
    assert.equal(response.status, 400);
    assert.ok((await response.json()).issues.length);
  });
  await check("Production service POST rejects unknown owner/status fields with 400", async () => {
    const response = await post("/api/services", { ...service, status: "approved", provider_id: crypto.randomUUID() });
    assert.equal(response.status, 400);
    assert.ok((await response.json()).issues.length);
  });
  await check("Valid production service POST without authentication returns 401", async () => {
    assert.equal((await post("/api/services", service)).status, 401);
  });
  await check("Invalid production booking input returns structured 400", async () => {
    const response = await post("/api/bookings", {});
    assert.equal(response.status, 400);
    assert.ok((await response.json()).issues.length);
  });
  if (root) await check("Downloaded browser JS contains no configured elevated key or common Supabase secret literal", async () => {
    const sources = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((match) => new URL(match[1].replaceAll("&amp;", "&"), base));
    const paths = [...new Set(sources.filter((url) => url.origin === base.origin && url.pathname.startsWith("/_next/static/")).map((url) => url.href))];
    assert.ok(paths.length);
    for (const path of paths) {
      const response = await fetch(path, { redirect: "manual", signal: AbortSignal.timeout(20000) });
      assert.equal(response.status, 200);
      const source = await response.text();
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      assert.ok(!key || !source.includes(key));
      assert.ok(!/sb_secret_[A-Za-z0-9_-]{20,}/.test(source));
      assert.ok(!source.includes("SUPABASE_SERVICE_ROLE_KEY"));
      chunksChecked++;
    }
  });

  if (!read) {
    outcomes.push({ test: "Hosted booking persistence/privacy checks", result: "NOT_RUN", reason: "Approved fictional fixture was not verified." });
    return;
  }
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = new URL(process.env.SUPABASE_URL);
  assert.ok(url.protocol === "https:" && url.hostname.endsWith(".supabase.co"));
  assert.ok(elevated(key));
  assert.ok(process.env.SUPABASE_ANON_KEY && !elevated(process.env.SUPABASE_ANON_KEY));
  const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
  const admin = createClient(url.href, key, options);
  const anon = createClient(url.href, process.env.SUPABASE_ANON_KEY, options);
  const submitted = await check("Fictional booking submitted through production API returns only 201 receipt", async () => {
    const response = await post("/api/bookings", { service_id: approvedId, client_email: "resident@example.test", requested_date: "2026-11-10", notes: marker });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { received: true });
  });
  if (submitted) {
    await check("Trusted database read confirms the production-submitted fictional booking persisted", async () => {
      const result = await admin.from("bookings").select("id,service_id").eq("notes", marker).single();
      assert.equal(result.error, null);
      assert.equal(result.data.service_id, approvedId);
      bookingId = result.data.id;
    });
    if (bookingId) await check("Anonymous database access cannot read the new production-submitted booking", async () => {
      const result = await anon.from("bookings").select("id").eq("id", bookingId);
      assert.equal(result.error, null);
      assert.deepEqual(result.data, []);
    });
  }
}

try { await main(); }
catch { outcomes.push({ test: "Production verification prerequisites", result: "FAIL", code: "SETUP_FAILED" }); console.log("Verification prerequisites failed; no credentials or raw errors are printed."); }
finally {
  const report = {
    recorded_at: new Date().toISOString(),
    deployment_url: base.href,
    local_reference_commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    scope: "Unauthenticated production HTTP/API checks, same-origin browser JS pattern inspection, one fictional booking and local trusted Supabase confirmation. No credentials are sent to Vercel by this runner.",
    limitations: "Does not independently identify the deployed Git SHA or automate production keyboard navigation/browser rendering. Local-reference commit is not a claim about the Vercel build SHA. Prior browser tests and the student screenshot are separate evidence. A bounded JS scan does not prove absence of every possible secret.",
    browser_chunks_checked: chunksChecked,
    fixture_note: "One fictional booking is retained as verification evidence. No migration or production schema change was performed.",
    outcomes,
  };
  await mkdir("docs/evidence/midterm", { recursive: true });
  await writeFile("docs/evidence/midterm/production-deployment.json", JSON.stringify(report, null, 2) + "\n");
  console.log("Evidence saved: docs/evidence/midterm/production-deployment.json");
  if (outcomes.some((row) => row.result === "FAIL")) process.exitCode = 1;
}
