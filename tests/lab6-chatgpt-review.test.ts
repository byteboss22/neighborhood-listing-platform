// Codex-adapted regression coverage derived from retained ChatGPT suggestions.
// The external model ran no tests; before/after results are recorded separately.
import { test } from "node:test";
import assert from "node:assert/strict";
import { selectSponsor } from "../src/lib/selectSponsor";
import { sponsorContextSchema, sponsorCandidateSchema, type SponsorCandidate } from "../src/schemas/sponsorSelection";

const context = { zip_code: "01234", placement: "property-card", now: "2026-11-25T12:00:00Z" };
const sponsor: SponsorCandidate = {
  sponsor_id: "example-maintenance", business_name: "Example Maintenance (Fictional)", website_url: "https://example.com",
  status: "approved", active: true, placements: ["property-card"],
  starts_at: "2026-11-25T12:00:00Z", ends_at: "2026-11-26T12:00:00Z", priority: 1, zip_codes: ["01234"],
};

test("Lab 6 rejects precision Date.parse would truncate in all three campaign timestamps", () => {
  for (const field of ["now", "starts_at", "ends_at"]) {
    if (field === "now") assert.equal(sponsorContextSchema.safeParse({ ...context, now: "2026-11-25T12:00:00.000100Z" }).success, false);
    else assert.equal(sponsorCandidateSchema.safeParse({ ...sponsor, [field]: `2026-11-${field === "starts_at" ? "25" : "26"}T12:00:00.000900Z` }).success, false);
  }
  for (const suffix of ["Z", ".1Z", ".12Z", ".123Z"]) {
    assert.ok(sponsorContextSchema.safeParse({ ...context, now: `2026-11-25T12:00:00${suffix}` }).success);
  }
  assert.equal(selectSponsor({ ...context, now: "2026-11-26T07:00:00-05:00" }, [sponsor]).kind, "house");
  assert.equal(selectSponsor({ ...context, now: "2026-11-26T06:59:59.999-05:00" }, [sponsor]).kind, "sponsor");
});

test("Lab 6 equivalent antimeridian and exact-pole coordinates have zero distance at tiny radii", () => {
  for (const [center, location] of [
    [{ latitude: 0, longitude: 180 }, { latitude: 0, longitude: -180 }],
    [{ latitude: 90, longitude: 0 }, { latitude: 90, longitude: 180 }],
    [{ latitude: -90, longitude: 0 }, { latitude: -90, longitude: 180 }],
  ]) {
    assert.equal(selectSponsor({ ...context, location }, [{ ...sponsor, zip_codes: [], coverage: { center, radius_miles: 1e-14 } }]).kind, "sponsor");
  }
  assert.equal(selectSponsor({ ...context, location: { latitude: 0.000001, longitude: -180 } }, [{ ...sponsor, zip_codes: [], coverage: { center: { latitude: 0, longitude: 180 }, radius_miles: 1e-14 } }]).kind, "house");
});

test("Lab 6 frozen three-candidate permutations retain identity, values and priority result", () => {
  const a = { ...sponsor, sponsor_id: "aaa-sponsor" };
  const b = { ...sponsor, sponsor_id: "bbb-sponsor" };
  const c = { ...sponsor, sponsor_id: "zzz-radius", zip_codes: [], priority: 10, coverage: { center: { latitude: 30, longitude: 30 }, radius_miles: 1 } };
  const rows = [a, b, c];
  function freeze(value: unknown) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      Object.freeze(value);
      for (const child of Object.values(value)) freeze(child);
    }
  }
  rows.forEach(freeze);
  const before = JSON.stringify(rows);
  for (const order of [[a,b,c], [a,c,b], [b,a,c], [b,c,a], [c,a,b], [c,b,a]]) {
    const orderBefore = [...order];
    const input = Object.freeze(order);
    const decision = selectSponsor({ ...context, location: { latitude: 30, longitude: 30 } }, input);
    assert.equal(decision.kind === "sponsor" && decision.sponsor_id, "zzz-radius");
    assert.deepEqual(input, orderBefore);
  }
  assert.equal(JSON.stringify(rows), before);
});

test("Lab 6 malformed mixed batches and duplicate IDs fail closed in either order", () => {
  for (const bad of [{ ...sponsor, sponsor_id: "broken-sponsor", priority: -1 }, { ...sponsor, active: false }]) {
    assert.equal(selectSponsor(context, [sponsor, bad]).kind, "house");
    assert.equal(selectSponsor(context, [bad, sponsor]).kind, "house");
  }
});

test("Lab 6 destination lookalikes, insecure scheme and custom port are rejected", () => {
  for (const website_url of ["https://example.com.evil.invalid", "http://example.com", "https://example.com:8443"]) {
    assert.equal(selectSponsor(context, [{ ...sponsor, website_url }]).kind, "house");
  }
  assert.equal(selectSponsor(context, [{ ...sponsor, website_url: "https://local.example.org/" }]).kind, "sponsor");
});

test("Lab 6 candidate ZIP+4 and sibling ZIP+4 match without accepting numeric ZIP", () => {
  const candidate = { ...sponsor, zip_codes: ["01234-1234"] };
  assert.equal(selectSponsor({ ...context, zip_code: "01234-9999" }, [candidate]).kind, "sponsor");
  assert.equal(selectSponsor({ ...context, zip_code: 1234 }, [candidate]).kind, "house");
});
