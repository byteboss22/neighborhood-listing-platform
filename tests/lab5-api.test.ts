import { test } from "node:test";
import assert from "node:assert/strict";
import seed from "../data/generated/ai-studio-attempt-01.json";
import { GET, POST } from "../src/app/api/listings/route";
import { POST as inquire } from "../src/app/api/inquiries/route";
import { createListingSchema, parsePublicListings, PUBLIC_PROPERTY_COLUMNS } from "../src/schemas/listingPersistence";

const { local_sponsors: sponsorIds, ...listing } = seed.properties[0];
const { address, ...flat } = listing;
const publicRows = { properties: [{ ...flat, ...address }], sponsors: [], relationships: [] };
const uid = "10000000-0000-4000-8000-000000000001";
const request = (body: unknown, token: string | null = "fictional-session") => new Request("http://localhost/api/listings", {
  method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body),
});

test("live boundary accepts empty/no-sponsor results and rejects private fields, invalid data and duplicate amenities", () => {
  assert.ok(sponsorIds.length);
  assert.ok(createListingSchema.safeParse(listing).success);
  assert.ok(parsePublicListings(publicRows));
  assert.ok(parsePublicListings({ properties: [], sponsors: [], relationships: [] }));
  for (const body of [{ ...listing, owner_id: uid }, { ...listing, status: "approved" }, { ...listing, price: 12.345 }, { ...listing, amenities: ["parking", "parking"] }]) {
    assert.equal(createListingSchema.safeParse(body).success, false);
  }
  assert.equal(parsePublicListings({ ...publicRows, properties: [{ ...publicRows.properties[0], owner_id: uid }] }), null);
  assert.equal(parsePublicListings({ ...publicRows, relationships: [{ property_id: listing.property_id, sponsor_id: "missing-sponsor" }] }), null);
});

test("Lab 5 routes bind ownership to verified Auth, use anonymous public projection and keep errors safe", async () => {
  const originalFetch = globalThis.fetch;
  const saved = { ...process.env };
  process.env.SUPABASE_URL = "https://fictional-project.supabase.co";
  process.env.SUPABASE_ANON_KEY = "fictional-public-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "fictional-elevated-canary";
  let role = "provider";
  let fail = "";
  let authFail = false;
  let inserts = 0;
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  globalThis.fetch = async (input, init) => {
    const req = new Request(input, init);
    const url = new URL(req.url);
    assert.equal(req.headers.get("apikey"), "fictional-public-key");
    assert.ok(![...req.headers.values()].some((v) => v.includes("fictional-elevated")));
    if (url.pathname.endsWith("/user")) return authFail ? reply({ message: "Invalid" }, 401) : reply({ id: uid });
    if (url.pathname.endsWith("/profiles")) return reply({ id: uid, role });
    if (req.method === "GET") {
      assert.equal(req.headers.get("authorization"), "Bearer fictional-public-key");
      if (fail) return reply({ code: fail, message: "PRIVATE ERROR" }, 500);
      if (url.pathname.endsWith("/properties")) {
        assert.equal(url.searchParams.get("select"), PUBLIC_PROPERTY_COLUMNS);
        assert.equal(url.searchParams.get("status"), "eq.approved");
        assert.equal(url.searchParams.get("limit"), "100");
        return reply(publicRows.properties);
      }
      if (url.pathname.endsWith("/sponsors")) {
        assert.equal(url.searchParams.get("is_active"), "eq.true");
        return reply([]);
      }
    }
    assert.equal(req.headers.get("authorization"), "Bearer fictional-session");
    assert.ok(!url.searchParams.has("select"));
    const body = await req.json();
    inserts++;
    if (url.pathname.endsWith("/properties")) assert.deepEqual(body, { ...flat, ...address, owner_id: uid, status: "draft" });
    else if (url.pathname.endsWith("/inquiries")) assert.equal(body.requester_id, uid);
    else throw new Error("Unexpected route");
    return fail ? reply({ code: fail, message: "PRIVATE ERROR" }, 400) : new Response(null, { status: 201 });
  };
  try {
    const get = await GET();
    assert.equal(get.status, 200);
    assert.equal(get.headers.get("cache-control"), "no-store");
    assert.deepEqual(await get.json(), publicRows);
    assert.equal((await POST(request({ ...listing, owner_id: uid }))).status, 400);
    assert.equal((await POST(request(listing, null))).status, 401);
    authFail = true;
    assert.equal((await POST(request(listing))).status, 401);
    authFail = false;
    const created = await POST(request(listing));
    assert.equal(created.status, 201);
    assert.deepEqual(await created.json(), { property_id: listing.property_id, status: "draft" });
    for (const [code, expected] of [["42501", 403], ["23505", 409], ["23514", 400], ["XX000", 503]] as const) {
      fail = code;
      const response = await POST(request(listing));
      assert.equal(response.status, expected);
      assert.ok(!(await response.text()).includes("PRIVATE"));
    }
    assert.equal((await GET()).status, 503);
    fail = "";
    const inquiry = { property_id: listing.property_id, requester_name: "Fictional Resident", requester_email: "resident@example.test", message: "Fictional classroom request." };
    assert.equal((await inquire(request(inquiry, null))).status, 401);
    const count = inserts;
    assert.equal((await inquire(request(inquiry))).status, 403);
    assert.equal(inserts, count);
    role = "client";
    const received = await inquire(request(inquiry));
    assert.equal(received.status, 201);
    assert.deepEqual(await received.json(), { received: true });
    fail = "42501";
    assert.equal((await inquire(request(inquiry))).status, 400);
    fail = "23503";
    assert.equal((await inquire(request(inquiry))).status, 400);
    delete process.env.SUPABASE_URL;
    assert.equal((await GET()).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of ["SUPABASE_URL", "SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]) {
      if (saved[key] === undefined) delete process.env[key]; else process.env[key] = saved[key];
    }
  }
});
