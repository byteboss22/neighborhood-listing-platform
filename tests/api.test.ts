import { test } from "node:test";
import assert from "node:assert/strict";
import { GET, POST } from "../src/app/api/services/route";
import { POST as book } from "../src/app/api/bookings/route";
import { serviceSchema } from "../src/schemas/service";

const id = "10000000-0000-4000-8000-000000000001";
const valid = { title: "Fictional inspection", hourly_rate: 75.25, duration_minutes: 30, coverage_radius_miles: 5 };
const post = (body: unknown = valid, token: string | null = "fictional-user-token") => new Request("http://localhost/api/services", {
  method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body),
});

test("strict runtime contract rejects absent, malformed, extra and PostgreSQL-overflow values", () => {
  assert.ok(serviceSchema.safeParse(valid).success);
  assert.ok(serviceSchema.safeParse({ ...valid, hourly_rate: 0, duration_minutes: 15, coverage_radius_miles: 1 }).success);
  for (const body of [null, [], {}, { ...valid, title: "tiny" }, { ...valid, title: "😀😀😀" },
    { ...valid, hourly_rate: -1 }, { ...valid, hourly_rate: "75" }, { ...valid, hourly_rate: 1.234 },
    { ...valid, hourly_rate: 100000000 }, { ...valid, duration_minutes: 14 }, { ...valid, duration_minutes: 15.5 },
    { ...valid, duration_minutes: 2147483648 }, { ...valid, coverage_radius_miles: 0 },
    { ...valid, coverage_radius_miles: 1.5 }, { ...valid, status: "approved" }, { ...valid, provider_id: id }]) {
    assert.equal(serviceSchema.safeParse(body).success, false, JSON.stringify(body));
  }
});

test("actual route handlers through Supabase SDK with a mocked network boundary", async (t) => {
  const originalFetch = globalThis.fetch;
  process.env.SUPABASE_URL = "https://fictional-project.supabase.co";
  process.env.SUPABASE_ANON_KEY = "fictional-anon-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "fictional-admin-canary-never-send";
  let role: string | null = "provider";
  let authFail = false;
  let dbFail = false;
  let insertDenied = false;
  let missingService = false;
  const seen: Request[] = [];
  const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
  globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    seen.push(request.clone());
    assert.equal(request.headers.get("apikey"), "fictional-anon-key");
    assert.ok(![...request.headers.values()].some((value) => value.includes("fictional-admin-canary")));
    const url = new URL(request.url);
    if (url.pathname === "/auth/v1/user") {
      assert.equal(request.headers.get("authorization"), "Bearer fictional-user-token");
      return authFail ? reply({ message: "invalid session" }, 401) : reply({ id, aud: "authenticated", role: "authenticated" });
    }
    if (dbFail) return reply({ code: "XX000", message: "PRIVATE DATABASE DETAIL", hint: "PRIVATE HINT" }, 500);
    if (url.pathname.endsWith("/profiles")) return reply(role === null ? null : { role });
    if (url.pathname.endsWith("/services")) {
      if (request.method === "GET") {
        assert.equal(url.searchParams.get("select"), "id,title,hourly_rate,duration_minutes,coverage_radius_miles");
        assert.equal(url.searchParams.get("status"), "eq.approved");
        assert.equal(request.headers.get("authorization"), "Bearer fictional-anon-key");
        return reply([{ id, ...valid }]);
      }
      assert.equal(request.headers.get("authorization"), "Bearer fictional-user-token");
      const body = await request.json();
      assert.deepEqual(body, { ...valid, provider_id: id, status: "draft" });
      return insertDenied ? reply({ code: "42501", message: "PRIVATE POLICY DETAIL" }, 403) : reply({ id, ...body, created_at: "2026-11-02T00:00:00Z" }, 201);
    }
    if (url.pathname.endsWith("/bookings")) {
      assert.equal(request.method, "POST");
      assert.ok(!url.searchParams.has("select"));
      assert.ok(!request.headers.get("prefer")?.includes("return=representation"));
      return missingService ? reply({ code: "23503", message: "PRIVATE FOREIGN KEY" }, 409) : new Response(null, { status: 201 });
    }
    throw new Error(`Unexpected network request: ${url.pathname}`);
  };
  try {
    await t.test("GET uses anonymous approved-only public-column query", async () => {
      const response = await GET();
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.deepEqual(await response.json(), [{ id, ...valid }]);
    });
    await t.test("400 structured errors and malformed JSON do not reach database", async () => {
      const before = seen.length;
      const response = await POST(post({ ...valid, provider_id: id }));
      assert.equal(response.status, 400);
      assert.ok((await response.json()).issues.length > 0);
      const malformed = await POST(new Request("http://localhost/api/services", { method: "POST", body: "{" }));
      assert.equal(malformed.status, 400);
      assert.ok((await malformed.json()).issues.length > 0);
      assert.equal(seen.length, before);
    });
    await t.test("missing/invalid user returns 401", async () => {
      assert.equal((await POST(post(valid, null))).status, 401);
      authFail = true;
      assert.equal((await POST(post())).status, 401);
      authFail = false;
    });
    await t.test("client, admin-profile-only and absent profile return 403", async () => {
      for (const nextRole of ["client", "admin", null]) {
        role = nextRole;
        assert.equal((await POST(post())).status, 403);
      }
    });
    await t.test("provider and merchant insert their own draft, returning persisted row/201", async () => {
      for (const nextRole of ["provider", "merchant"]) {
        role = nextRole;
        const response = await POST(post());
        assert.equal(response.status, 201);
        assert.deepEqual(await response.json(), { id, ...valid, provider_id: id, status: "draft", created_at: "2026-11-02T00:00:00Z" });
      }
    });
    await t.test("database RLS denial is safe 403; database failure is safe 503", async () => {
      insertDenied = true;
      const denied = await POST(post());
      assert.equal(denied.status, 403);
      assert.ok(!(await denied.text()).includes("PRIVATE"));
      insertDenied = false;
      dbFail = true;
      for (const response of [await GET(), await POST(post())]) {
        assert.equal(response.status, 503);
        assert.ok(!(await response.text()).includes("PRIVATE"));
      }
      dbFail = false;
    });
    await t.test("public booking inserts without selecting/echoing client contact information", async () => {
      const body = { service_id: id, client_email: "resident@example.test", requested_date: "2026-12-01", notes: "Fictional appointment request" };
      const response = await book(post(body, null));
      assert.equal(response.status, 201);
      assert.deepEqual(await response.json(), { received: true });
      assert.equal((await book(post({ ...body, client_email: "bad" }, null))).status, 400);
      assert.equal((await book(post({ ...body, requested_date: "2026-02-30" }, null))).status, 400);
      assert.equal((await book(post({ ...body, notes: "short" }, null))).status, 400);
      missingService = true;
      assert.equal((await book(post(body, null))).status, 400);
    });
    await t.test("missing server configuration fails closed with safe response", async () => {
      delete process.env.SUPABASE_URL;
      const response = await GET();
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { error: "Service temporarily unavailable." });
    });
  } finally {
    globalThis.fetch = originalFetch;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
});
