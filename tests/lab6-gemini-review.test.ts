// Derived from student-supplied Gemini suggestions; adapted and run by Codex.
// Raw model output is preserved separately and still states NOT RUN.
import { test } from "node:test";
import assert from "node:assert/strict";
import { selectSponsor } from "../src/lib/selectSponsor";
import type { SponsorCandidate, SponsorContext } from "../src/schemas/sponsorSelection";

const baseContext: SponsorContext = {
  zip_code: "01234",
  placement: "property-card",
  now: "2026-11-25T12:00:00Z",
};

const baseSponsor: SponsorCandidate = {
  sponsor_id: "example-maintenance",
  business_name: "Example Maintenance (Fictional)",
  website_url: "https://example.com",
  status: "approved",
  active: true,
  placements: ["property-card"],
  starts_at: "2026-11-25T12:00:00Z",
  ends_at: "2026-11-26T12:00:00Z",
  priority: 1,
  zip_codes: ["01234"],
};

test("Lab 6 candidate ZIP+4 matches 5-digit context and sibling ZIP+4; malformed ZIPs fall back", () => {
  const zipPlus4Sponsor: SponsorCandidate = { ...baseSponsor, zip_codes: ["01234-1111"] };
  assert.equal(selectSponsor({ ...baseContext, zip_code: "01234" }, [zipPlus4Sponsor]).kind, "sponsor");
  assert.equal(selectSponsor({ ...baseContext, zip_code: "01234-2222" }, [zipPlus4Sponsor]).kind, "sponsor");

  for (const badZip of ["1234", "012345", "01234-12", "abcde", ""]) {
    assert.equal(selectSponsor({ ...baseContext, zip_code: badZip }, [baseSponsor]).kind, "house");
  }
});

test("Lab 6 timezone offset equivalence at exclusive ends_at and invalid calendar date guard", () => {
  // 2026-11-26T07:00:00-05:00 === 2026-11-26T12:00:00Z (must be excluded)
  assert.equal(
    selectSponsor({ ...baseContext, now: "2026-11-26T07:00:00-05:00" }, [baseSponsor]).kind,
    "house",
  );
  // 1 second prior must be included
  assert.equal(
    selectSponsor({ ...baseContext, now: "2026-11-26T06:59:59-05:00" }, [baseSponsor]).kind,
    "sponsor",
  );
  // Overflow calendar date (Feb 30) must never bypass time window via NaN comparison
  assert.equal(
    selectSponsor({ ...baseContext, now: "2026-02-30T12:00:00Z" }, [baseSponsor]).kind,
    "house",
  );
});

test("Lab 6 haversine handles antimeridian wrap-around, poles, and higher-priority radius over ZIP", () => {
  const antimeridianSponsor: SponsorCandidate = {
    ...baseSponsor,
    sponsor_id: "anti-sponsor",
    zip_codes: [],
    priority: 10,
    coverage: { center: { latitude: 0, longitude: 179.99 }, radius_miles: 2 },
  };
  // ~1.38 miles across the 180/-180 antimeridian, beating lower-priority exact ZIP match
  const res = selectSponsor(
    { ...baseContext, location: { latitude: 0, longitude: -179.99 } },
    [baseSponsor, antimeridianSponsor],
  );
  assert.equal(res.kind, "sponsor");
  if (res.kind === "sponsor") {
    assert.equal(res.sponsor_id, "anti-sponsor");
    assert.equal(res.matched_by, "radius");
  }

  // North pole convergence check
  const polarSponsor: SponsorCandidate = {
    ...baseSponsor,
    zip_codes: [],
    coverage: { center: { latitude: 90, longitude: 0 }, radius_miles: 1 },
  };
  assert.equal(
    selectSponsor({ ...baseContext, location: { latitude: 89.995, longitude: 135 } }, [polarSponsor]).kind,
    "sponsor",
  );
});

test("Lab 6 schema bounds reject empty coverage, out-of-range priority/radius, and >500 candidates", () => {
  // Neither zip_codes nor coverage
  assert.equal(selectSponsor(baseContext, [{ ...baseSponsor, zip_codes: [] }]).kind, "house");
  // Priority outside [0, 100] or non-integer
  assert.equal(selectSponsor(baseContext, [{ ...baseSponsor, priority: -1 }]).kind, "house");
  assert.equal(selectSponsor(baseContext, [{ ...baseSponsor, priority: 101 }]).kind, "house");
  assert.equal(selectSponsor(baseContext, [{ ...baseSponsor, priority: 1.5 }]).kind, "house");
  // Radius outside (0, 100]
  assert.equal(
    selectSponsor(baseContext, [{ ...baseSponsor, zip_codes: [], coverage: { center: { latitude: 0, longitude: 0 }, radius_miles: 0 } }]).kind,
    "house",
  );
  assert.equal(
    selectSponsor(baseContext, [{ ...baseSponsor, zip_codes: [], coverage: { center: { latitude: 0, longitude: 0 }, radius_miles: 100.01 } }]).kind,
    "house",
  );
  // Over 500 candidates fails batch safely to house fallback
  const oversized = Array.from({ length: 501 }, (_, i) => ({
    ...baseSponsor,
    sponsor_id: `sponsor-${String(i).padStart(3, "0")}`,
  }));
  assert.equal(selectSponsor(baseContext, oversized).kind, "house");
});

// Additional focused checks authored during verification, not claimed model runs.
test("Lab 6 invalid calendars are rejected by the actual schema before any window check", async () => {
  const { sponsorContextSchema } = await import("../src/schemas/sponsorSelection");
  for (const now of ["2026-02-30T12:00:00Z", "2026-11-31T12:00:00Z", "2026-11-25T24:00:00Z"]) {
    assert.equal(sponsorContextSchema.safeParse({ ...baseContext, now }).success, false);
    assert.equal(selectSponsor({ ...baseContext, now }, [baseSponsor]).kind, "house");
  }
});

test("Lab 6 exact five-mile meridian boundary is included; meaningful outside distance excluded", () => {
  const radiusSponsor = { ...baseSponsor, zip_codes: [], coverage: { center: { latitude: 0, longitude: 0 }, radius_miles: 5 } };
  const latitudeForMiles = (distance: number) => distance / (3958.7613 * Math.PI / 180);
  assert.equal(selectSponsor({ ...baseContext, location: { latitude: latitudeForMiles(5), longitude: 0 } }, [radiusSponsor]).kind, "sponsor");
  assert.equal(selectSponsor({ ...baseContext, location: { latitude: latitudeForMiles(5.000001), longitude: 0 } }, [radiusSponsor]).kind, "house");
});

test("Lab 6 negative zero and redundant coverage lists preserve documented selection behavior", () => {
  const radiusSponsor = { ...baseSponsor, zip_codes: [], coverage: { center: { latitude: 0, longitude: 0 }, radius_miles: 1 } };
  assert.deepEqual(selectSponsor({ ...baseContext, location: { latitude: -0, longitude: -0 } }, [radiusSponsor]), selectSponsor({ ...baseContext, location: { latitude: 0, longitude: 0 } }, [radiusSponsor]));
  assert.deepEqual(selectSponsor(baseContext, [{ ...baseSponsor, zip_codes: ["01234", "01234"], placements: ["property-card", "property-card"] }]), selectSponsor(baseContext, [baseSponsor]));
});
