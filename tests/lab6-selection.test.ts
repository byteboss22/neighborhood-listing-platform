import { test } from "node:test";
import assert from "node:assert/strict";
import { selectSponsor } from "../src/lib/selectSponsor";
import type { SponsorCandidate, SponsorContext } from "../src/schemas/sponsorSelection";

const context: SponsorContext = { zip_code: "01234", placement: "property-card", now: "2026-11-25T12:00:00Z" };
const sponsor: SponsorCandidate = {
  sponsor_id: "example-maintenance", business_name: "Example Maintenance (Fictional)", website_url: "https://example.com",
  status: "approved", active: true, placements: ["property-card"],
  starts_at: "2026-11-25T12:00:00Z", ends_at: "2026-11-26T12:00:00Z", priority: 1, zip_codes: ["01234"],
};

test("Lab 6 exact ZIP preserves zeroes and ZIP+4; start included, end excluded", () => {
  assert.equal(selectSponsor(context, [sponsor]).kind, "sponsor");
  assert.equal(selectSponsor({ ...context, zip_code: "01234-9999" }, [sponsor]).kind, "sponsor");
  assert.equal(selectSponsor({ ...context, now: sponsor.ends_at }, [sponsor]).kind, "house");
  assert.equal(selectSponsor({ ...context, now: "2026-11-25T11:59:59Z" }, [sponsor]).kind, "house");
  assert.equal(selectSponsor({ ...context, now: "2026-11-25T07:00:00-05:00" }, [sponsor]).kind, "sponsor");
});

test("Lab 6 synthetic nearby radius works; missing coordinates and distant points fail safely", () => {
  const nearby = { ...sponsor, zip_codes: [], coverage: { center: { latitude: 30, longitude: 30 }, radius_miles: 5 } };
  const result = selectSponsor({ ...context, location: { latitude: 30.01, longitude: 30 } }, [nearby]);
  assert.equal(result.kind, "sponsor");
  if (result.kind === "sponsor") assert.equal(result.matched_by, "radius");
  assert.equal(selectSponsor(context, [nearby]).kind, "house");
  assert.equal(selectSponsor({ ...context, location: { latitude: 40, longitude: 40 } }, [nearby]).kind, "house");
});

test("Lab 6 unapproved, inactive, wrong-placement, expired and no-match campaigns fall back", () => {
  for (const candidate of [
    { ...sponsor, status: "draft" }, { ...sponsor, status: "suspended" }, { ...sponsor, active: false },
    { ...sponsor, placements: ["property-detail"] }, { ...sponsor, ends_at: "2026-11-25T11:59:00Z", starts_at: "2026-11-24T00:00:00Z" },
    { ...sponsor, zip_codes: ["01235"] },
  ]) assert.equal(selectSponsor(context, [candidate]).kind, "house");
  assert.equal(selectSponsor(context, []).kind, "house");
});

test("Lab 6 tie uses priority then ZIP specificity then stable ID, independent of input order", () => {
  const first = { ...sponsor, sponsor_id: "aaa-sponsor" };
  const last = { ...sponsor, sponsor_id: "zzz-sponsor" };
  const baseline = selectSponsor(context, [first, last]);
  assert.deepEqual(selectSponsor(context, [last, first]), baseline);
  assert.equal(baseline.kind === "sponsor" && baseline.sponsor_id, "aaa-sponsor");
  const priority = selectSponsor(context, [first, { ...last, priority: 2 }]);
  assert.equal(priority.kind === "sponsor" && priority.sponsor_id, "zzz-sponsor");
  const radius = { ...first, zip_codes: [], coverage: { center: { latitude: 30, longitude: 30 }, radius_miles: 1 } };
  const specific = selectSponsor({ ...context, location: { latitude: 30, longitude: 30 } }, [radius, last]);
  assert.equal(specific.kind === "sponsor" && specific.sponsor_id, "zzz-sponsor");
});

test("Lab 6 rejects invalid/ambiguous input and unsafe URLs without emitting internal fields", () => {
  for (const candidates of [null, {}, [{ ...sponsor, website_url: "javascript:alert(1)" }],
    [{ ...sponsor, website_url: "https://example.com@evil.invalid" }], [{ ...sponsor, internal_notes: "private" }],
    [{ ...sponsor, ends_at: sponsor.starts_at }], [sponsor, sponsor]]) {
    assert.equal(selectSponsor(context, candidates).kind, "house");
  }
  assert.equal(selectSponsor({ ...context, user_id: "do-not-profile" }, [sponsor]).kind, "house");
  assert.equal(selectSponsor({ ...context, now: "invalid" }, [sponsor]).kind, "house");
  const result = selectSponsor(context, [sponsor]);
  assert.deepEqual(Object.keys(result).sort(), ["business_name", "disclosure", "kind", "matched_by", "sponsor_id"]);
  assert.equal(result.kind === "sponsor" && result.disclosure, "Sponsored");
});

test("Lab 6 selection does not mutate frozen fixture input", () => {
  const candidate = Object.freeze({ ...sponsor, placements: Object.freeze([...sponsor.placements]), zip_codes: Object.freeze([...sponsor.zip_codes]) });
  const candidates = Object.freeze([candidate]);
  const ctx = Object.freeze({ ...context });
  assert.deepEqual(selectSponsor(ctx, candidates), selectSponsor(ctx, candidates));
});
