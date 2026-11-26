import { test } from "node:test";
import assert from "node:assert/strict";
import { lab6Database } from "./helpers/lab6Database";
import { selectSponsor } from "../src/lib/selectSponsor";

test("Lab 6 additive migration, eligible query and private impression capability enforce boundaries", async () => {
  const { db, as, owner, client, admin } = await lab6Database();
  const selected = "SELECT sponsor_id FROM public.lab6_candidates_for_property($1,$2) ORDER BY priority DESC,sponsor_id";
  try {
    assert.equal((await db.query("SELECT relname FROM pg_class WHERE relname IN ('sponsor_campaigns','sponsor_impressions') AND relrowsecurity")).rows.length, 2);
    await as("anon");
    assert.deepEqual((await db.query(selected, ["maple-court-apartment", "property-card"])).rows, [{ sponsor_id: "example-maintenance" }]);
    assert.deepEqual((await db.query(selected, ["cedar-window-studio", "property-card"])).rows, [{ sponsor_id: "example-gardens" }]);
    assert.deepEqual((await db.query(selected, ["cedar-garden-townhouse", "property-card"])).rows, []);
    assert.deepEqual((await db.query(selected, ["missing-property", "property-card"])).rows, []);
    assert.deepEqual((await db.query(selected, ["maple-court-apartment", "invalid-placement"])).rows, []);
    await assert.rejects(db.query("SELECT internal_notes FROM sponsor_campaigns"), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM sponsor_impressions"), /permission denied/);
    await assert.rejects(db.exec("UPDATE sponsor_campaigns SET priority=100"), /permission denied/);
    const event = "40000000-0000-4000-8000-000000000001";
    const record = "SELECT public.lab6_record_impression($1,$2,$3,$4)";
    await db.query(record, [event, "example-maintenance", "maple-court-apartment", "property-card"]);
    await db.query(record, [event, "example-maintenance", "maple-court-apartment", "property-card"]);
    await assert.rejects(db.query(record, [event, "example-maintenance", "cedar-garden-townhouse", "property-card"]), /Placement unavailable/);
    await assert.rejects(db.query(record, [event, "example-maintenance", "missing-property", "property-card"]), /Placement unavailable/);
    await as("authenticated", owner);
    await assert.rejects(db.exec("UPDATE sponsor_campaigns SET priority=100"), /permission denied/);
    await assert.rejects(db.exec("UPDATE properties SET sponsor_latitude=1,sponsor_longitude=1"), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM sponsor_impressions"), /permission denied/);
    await as("authenticated", client);
    await assert.rejects(db.query("SELECT internal_notes FROM sponsor_campaigns"), /permission denied/);
    await as("authenticated", admin);
    await assert.rejects(db.query("SELECT * FROM sponsor_impressions"), /permission denied/);
    await as("service_role");
    assert.equal((await db.query("SELECT * FROM sponsor_impressions")).rows.length, 1);
    assert.deepEqual((await db.query<{ column_name: string }>("SELECT column_name FROM information_schema.columns WHERE table_name='sponsor_impressions' ORDER BY ordinal_position")).rows.map((r) => r.column_name), ["event_id", "sponsor_id", "placement", "page_context", "created_at"]);
    for (const assignment of ["is_active=false", "ends_at=date_trunc('milliseconds',now()-interval '1 second'),starts_at=date_trunc('milliseconds',now()-interval '1 day')"]) {
      await db.exec("BEGIN");
      await db.exec(`UPDATE sponsor_campaigns SET ${assignment} WHERE sponsor_id='example-maintenance'`);
      await as("anon");
      assert.equal((await db.query(selected, ["maple-court-apartment", "property-card"])).rows.length, 0);
      await assert.rejects(db.query(record, [event, "example-maintenance", "maple-court-apartment", "property-card"]), /Placement unavailable/);
      await db.exec("ROLLBACK");
      await as("service_role");
    }
    await assert.rejects(db.exec("UPDATE sponsor_campaigns SET starts_at='2026-11-25T12:00:00.000900Z' WHERE sponsor_id='example-maintenance'"), /check constraint/);
    await assert.rejects(db.exec("UPDATE sponsor_campaigns SET zip_codes=ARRAY['bad-zip'] WHERE sponsor_id='example-maintenance'"), /Invalid campaign ZIP/);
    // SQL distance policy and pure selector agree on canonical equivalent points.
    const distance = await db.query<{ miles: number }>("SELECT lab6_distance_miles(0,180,0,-180) AS miles");
    assert.equal(Number(distance.rows[0].miles), 0);
    assert.equal(selectSponsor({ zip_code: "01234", placement: "property-card", now: "2026-11-25T00:00:00Z", location: { latitude: 0, longitude: -180 } }, [{ sponsor_id: "equivalent-fixture", business_name: "Fictional equivalent", website_url: "https://example.com", status: "approved", active: true, placements: ["property-card"], starts_at: "2026-11-24T00:00:00Z", ends_at: "2026-11-26T00:00:00Z", priority: 1, zip_codes: [], coverage: { center: { latitude: 0, longitude: 180 }, radius_miles: 1e-14 } }]).kind, "sponsor");
  } finally { await db.close(); }
});
