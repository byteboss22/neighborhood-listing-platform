import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { PGlite } from "@electric-sql/pglite";

// Eric/Codex baseline. Grace owns an independent expansion, not this authorship.
test("Lab 5 clean rebuild, fictional seed and baseline PostgreSQL access boundaries", async () => {
  const db = new PGlite();
  const owner = "10000000-0000-4000-8000-000000000001";
  const other = "10000000-0000-4000-8000-000000000002";
  const client = "10000000-0000-4000-8000-000000000003";
  const admin = "10000000-0000-4000-8000-000000000004";
  try {
    await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
      CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid PRIMARY KEY);
      CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      GRANT USAGE ON SCHEMA auth TO anon,authenticated,service_role;
      GRANT EXECUTE ON FUNCTION auth.uid() TO anon,authenticated,service_role;`);
    await db.exec(await readFile("supabase/migrations/20261029140000_exam_services_persistence.sql", "utf8"));
    const catalogSQL = `SELECT c.relname, pg_get_expr(p.polqual,p.polrelid) AS using_expression,
      pg_get_expr(p.polwithcheck,p.polrelid) AS check_expression, p.polname
      FROM pg_policy p JOIN pg_class c ON c.oid=p.polrelid
      WHERE c.relname IN ('profiles','services','bookings','service_categories','service_category_mappings') ORDER BY c.relname,p.polname`;
    const before = await db.query(catalogSQL);
    await db.exec(await readFile("supabase/migrations/20261123000000_lab5_listing_persistence.sql", "utf8"));
    assert.deepEqual((await db.query(catalogSQL)).rows, before.rows);
    assert.equal((await db.query(`SELECT relname FROM pg_class WHERE relname IN ('properties','sponsors','property_sponsors','inquiries') AND relrowsecurity`)).rows.length, 4);
    await db.exec(`INSERT INTO auth.users VALUES ('${owner}'),('${other}'),('${client}'),('${admin}');
      INSERT INTO profiles(id,role) VALUES ('${owner}','provider'),('${other}','merchant'),('${client}','client'),('${admin}','admin');`);
    const seed = execFileSync(process.execPath, ["scripts/seed-lab5.mjs", "--owner-id", owner, "--reviewer-id", admin], { encoding: "utf8" });
    await db.exec(seed);
    await assert.rejects(db.exec(seed), /empty Lab 5 tables/);
    await db.exec("ROLLBACK");
    async function as(role: string, id = "") {
      await db.exec("RESET ROLE");
      await db.query("SELECT set_config('request.jwt.claim.sub',$1,false)", [id]);
      await db.exec(`SET ROLE ${role}`);
    }
    await as("anon");
    assert.equal((await db.query("SELECT property_id FROM properties")).rows.length, 5);
    assert.equal((await db.query("SELECT sponsor_id FROM sponsors")).rows.length, 3);
    assert.equal((await db.query("SELECT property_id,sponsor_id FROM property_sponsors")).rows.length, 6);
    await assert.rejects(db.query("SELECT owner_id FROM properties"), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM inquiries"), /permission denied/);
    await assert.rejects(db.exec(`INSERT INTO inquiries(property_id,requester_id,requester_name,requester_email,message) VALUES ('maple-court-apartment','${client}','Fictional Resident','resident@example.test','Fictional classroom request.')`), /permission denied/);
    await as("authenticated", other);
    await assert.rejects(db.query("SELECT owner_id,approved_by FROM properties"), /permission denied/);
    assert.deepEqual((await db.query("SELECT public.lab5_owns_property('maple-court-apartment') AS owns")).rows, [{ owns: false }]);
    await as("authenticated", owner);
    assert.equal((await db.query(`UPDATE properties SET title='Forbidden Title' WHERE property_id='maple-court-apartment' RETURNING property_id`)).rows.length, 0);
    await db.exec(`INSERT INTO properties(property_id,owner_id,title,street,city,state,zip_code,price,property_type,bedrooms,bathrooms,square_feet,image_path,image_alt) VALUES ('draft-fixture','${owner}','Fictional Draft','1 Example Way','Example','CA','01234',0,'studio',0,0.5,100,'/images/maple-court.svg','Fictional demonstration illustration')`);
    assert.equal((await db.query("SELECT property_id FROM properties WHERE property_id='draft-fixture'")).rows.length, 1);
    for (const assignment of ["price=12.345", "bathrooms=1.54", "amenities=ARRAY['parking','parking']"]) {
      await assert.rejects(db.exec(`UPDATE properties SET ${assignment} WHERE property_id='draft-fixture'`), /check constraint|Duplicate/);
    }
    await assert.rejects(db.exec("UPDATE properties SET status='approved' WHERE property_id='draft-fixture'"), /row-level security|cannot approve/);
    await assert.rejects(db.exec(`UPDATE properties SET owner_id='${other}' WHERE property_id='draft-fixture'`), /permission denied/);
    await db.exec("SET TIME ZONE 'America/Los_Angeles'");
    const clock = await db.query<{ seconds: number }>(`UPDATE properties SET title='Updated Draft' WHERE property_id='draft-fixture' RETURNING extract(epoch FROM (now()-clock_timestamp()))::float AS seconds`);
    assert.ok(Math.abs(clock.rows[0].seconds) < 2);
    await as("service_role");
    const timestamps = await db.query<{ seconds: number }>("SELECT extract(epoch FROM (updated_at-clock_timestamp()))::float AS seconds FROM properties WHERE property_id='draft-fixture'");
    assert.ok(Math.abs(timestamps.rows[0].seconds) < 2);
    await as("authenticated", client);
    await db.exec(`INSERT INTO inquiries(property_id,requester_id,requester_name,requester_email,message) VALUES ('maple-court-apartment','${client}','Fictional Resident','resident@example.test','Fictional classroom request.')`);
    assert.equal((await db.query("SELECT * FROM inquiries")).rows.length, 0);
    await assert.rejects(db.exec(`INSERT INTO inquiries(property_id,requester_id,requester_name,requester_email,message) VALUES ('draft-fixture','${client}','Fictional Resident','resident@example.test','Fictional classroom request.')`), /row-level security/);
    await as("authenticated", other);
    assert.equal((await db.query("SELECT * FROM inquiries")).rows.length, 0);
    await as("authenticated", owner);
    assert.equal((await db.query("SELECT * FROM inquiries")).rows.length, 1);
    await as("service_role");
    assert.equal((await db.query("SELECT * FROM inquiries")).rows.length, 1);
  } finally { await db.close(); }
});
