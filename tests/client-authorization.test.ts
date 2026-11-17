import { test } from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";
import { assertClientCannotEscalate } from "../scripts/client-authorization-check.mjs";

const userId = "10000000-0000-4000-8000-000000000003";

function database(patchCode = "42501", storedRole = "client") {
  return createClient("https://fictional-project.supabase.co", "fictional-anon-key", {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: async (input, init) => {
      const request = new Request(input, init);
      const url = new URL(request.url);
      assert.equal(url.pathname, "/rest/v1/profiles");
      // Regression: absence of this filter would yield a safe-update 21000,
      // which does not establish that a targeted role change is forbidden.
      assert.equal(url.searchParams.get("id"), `eq.${userId}`);
      if (request.method === "PATCH") {
        assert.deepEqual(await request.json(), { role: "admin" });
        return new Response(JSON.stringify({ code: patchCode, message: "Fictional denial" }), {
          status: patchCode === "42501" ? 403 : 400, headers: { "Content-Type": "application/json" },
        });
      }
      assert.equal(request.method, "GET");
      assert.equal(url.searchParams.get("select"), "role");
      return Response.json({ role: storedRole });
    } },
  });
}

test("client escalation audit targets the authenticated profile and confirms unchanged role", async () => {
  await assertClientCannotEscalate(database(), userId);
});

test("client escalation audit does not accept an unrelated safe-update error as authorization proof", async () => {
  await assert.rejects(assertClientCannotEscalate(database("21000"), userId));
});

test("client escalation audit rejects a changed role even after a denial response", async () => {
  await assert.rejects(assertClientCannotEscalate(database("42501", "admin"), userId));
});
