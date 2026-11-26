import { test } from "node:test";
import assert from "node:assert/strict";
import { GET as placement } from "../src/app/api/sponsor-placement/route";
import { GET as click } from "../src/app/api/sponsor-click/route";
import { POST as impression } from "../src/app/api/sponsor-impressions/route";
import { PUBLIC_CANDIDATE_COLUMNS } from "../src/lib/sponsorRepository";

const base = "http://localhost";
const query = "property_id=maple-court-apartment&placement=property-card";
const candidate = { sponsor_id: "example-maintenance", business_name: "Example Maintenance (Fictional)", website_url: "https://example.com", status: "approved", active: true, placements: ["property-card"], starts_at: "2020-01-01T00:00:00+00:00", ends_at: "2099-01-01T00:00:00.000000+00:00", priority: 1, zip_codes: ["90001"], center_latitude: null, center_longitude: null, radius_miles: null };
const get = (path: string) => new Request(`${base}/api/${path}`);
const body = { property_id: "maple-court-apartment", placement: "property-card", sponsor_id: candidate.sponsor_id, event_id: "40000000-0000-4000-8000-000000000001" };
const post = (data: unknown) => new Request(`${base}/api/sponsor-impressions`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });

test("Lab 6 actual routes use scoped public query, approved-record redirect and minimal event RPC", async (t) => {
  const originalFetch = globalThis.fetch;
  const saved = Object.fromEntries(["SUPABASE_URL", "SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"].map((k) => [k, process.env[k]]));
  process.env.SUPABASE_URL = "https://fictional-project.supabase.co";
  process.env.SUPABASE_ANON_KEY = "fictional-public-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "fictional-elevated-canary";
  let rows: unknown[] = [candidate];
  let unavailable = false;
  let missing = false;
  let requests = 0;
  let recorded = 0;
  const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
  globalThis.fetch = async (input, init) => {
    const req = new Request(input, init);
    const url = new URL(req.url);
    requests++;
    assert.equal(req.headers.get("apikey"), "fictional-public-key");
    assert.equal(req.headers.get("authorization"), "Bearer fictional-public-key");
    assert.ok(![...req.headers.values()].some((v) => v.includes("elevated-canary")));
    if (unavailable) return reply({ code: "XX000", message: "PRIVATE DATABASE DETAIL" }, 500);
    if (url.pathname.endsWith("/properties")) {
      assert.equal(url.searchParams.get("status"), "eq.approved");
      assert.equal(url.searchParams.get("select"), "property_id,zip_code,sponsor_latitude,sponsor_longitude");
      return reply(missing ? null : { property_id: "maple-court-apartment", zip_code: "90001", sponsor_latitude: null, sponsor_longitude: null });
    }
    if (url.pathname.endsWith("/rpc/lab6_candidates_for_property")) {
      assert.equal(url.searchParams.get("select"), PUBLIC_CANDIDATE_COLUMNS);
      assert.equal(url.searchParams.get("limit"), "501");
      assert.equal(url.searchParams.get("contains"), null);
      assert.deepEqual(await req.json(), { target_property_id: "maple-court-apartment", target_placement: "property-card" });
      return reply(rows);
    }
    if (url.pathname.endsWith("/rpc/lab6_record_impression")) {
      assert.deepEqual(await req.json(), { target_event_id: body.event_id, target_sponsor_id: body.sponsor_id, target_property_id: body.property_id, target_placement: body.placement });
      recorded++;
      return new Response(null, { status: 204 });
    }
    throw new Error("Unexpected network call");
  };
  try {
    await t.test("public response never includes destination, coordinates or internal campaign fields", async () => {
      const response = await placement(get(`sponsor-placement?${query}`));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { kind: "sponsor", sponsor_id: candidate.sponsor_id, business_name: candidate.business_name, matched_by: "zip", disclosure: "Sponsored" });
      assert.equal(response.headers.get("cache-control"), "no-store");
    });
    await t.test("invalid/malicious query parameters and duplicate keys fail before database access", async () => {
      const before = requests;
      for (const extra of ["&url=https://evil.invalid", "&now=2026-11-25T00:00:00Z", "&zip_code=90001", "&placement=property-detail"]) {
        assert.equal((await placement(get(`sponsor-placement?${query}${extra}`))).status, 400);
      }
      assert.equal((await click(get(`sponsor-click?${query}&sponsor_id=example-maintenance&url=https://evil.invalid`))).status, 400);
      assert.equal(requests, before);
    });
    await t.test("click re-resolves approved stored URL; changed/ineligible/unsafe records do not redirect", async () => {
      const response = await click(get(`sponsor-click?${query}&sponsor_id=example-maintenance`));
      assert.equal(response.status, 303);
      assert.equal(response.headers.get("location"), "https://example.com");
      assert.equal(response.headers.get("referrer-policy"), "no-referrer");
      rows = [];
      assert.equal((await click(get(`sponsor-click?${query}&sponsor_id=example-maintenance`))).status, 404);
      rows = [{ ...candidate, active: false }];
      assert.equal((await click(get(`sponsor-click?${query}&sponsor_id=example-maintenance`))).status, 404);
      rows = [{ ...candidate, website_url: "https://example.com@evil.invalid" }];
      const unsafe = await click(get(`sponsor-click?${query}&sponsor_id=example-maintenance`));
      assert.equal(unsafe.status, 503);
      assert.equal(unsafe.headers.get("location"), null);
      rows = [candidate];
    });
    await t.test("impression allows only minimal validated event, rechecks winner and never echoes fields", async () => {
      const before = recorded;
      assert.equal((await impression(post({ ...body, ip_address: "do-not-store" }))).status, 400);
      assert.equal((await impression(post({ ...body, sponsor_id: "other-sponsor" }))).status, 409);
      const response = await impression(post(body));
      assert.equal(response.status, 202);
      assert.deepEqual(await response.json(), { received: true });
      assert.equal(recorded, before + 1);
    });
    await t.test("empty query falls back; missing property, over-limit rows, precision and DB errors fail safely", async () => {
      rows = [];
      assert.equal((await (await placement(get(`sponsor-placement?${query}`))).json()).kind, "house");
      missing = true;
      assert.equal((await placement(get(`sponsor-placement?${query}`))).status, 404);
      missing = false;
      rows = Array(501).fill(candidate);
      assert.equal((await placement(get(`sponsor-placement?${query}`))).status, 503);
      rows = [{ ...candidate, starts_at: "2020-01-01T00:00:00.000900Z" }];
      assert.equal((await placement(get(`sponsor-placement?${query}`))).status, 503);
      rows = [candidate];
      unavailable = true;
      const response = await placement(get(`sponsor-placement?${query}`));
      assert.equal(response.status, 503);
      assert.ok(!(await response.text()).includes("PRIVATE"));
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
