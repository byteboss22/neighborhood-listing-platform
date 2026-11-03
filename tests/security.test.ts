import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

// Only this disposable test database gets the auth stub and synthetic users.
// Supabase supplies auth.users, auth.uid() and these roles in a real dev project.
test("migration rebuild and PostgreSQL RLS positive/negative authorization matrix", async (t) => {
  const db = new PGlite();
  const a = "10000000-0000-4000-8000-000000000001";
  const b = "10000000-0000-4000-8000-000000000002";
  const c = "10000000-0000-4000-8000-000000000003";
  const admin = "10000000-0000-4000-8000-000000000004";
  const draft = "20000000-0000-4000-8000-000000000001";
  const approved = "20000000-0000-4000-8000-000000000002";
  const other = "20000000-0000-4000-8000-000000000003";
  const suspended = "20000000-0000-4000-8000-000000000004";
  const pending = "20000000-0000-4000-8000-000000000005";
  const active = "30000000-0000-4000-8000-000000000001";
  const inactive = "30000000-0000-4000-8000-000000000002";
  try {
    await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
      CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid primary key);
      CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS
        $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated, service_role;`);
    await db.exec(await readFile("supabase/migrations/20261029140000_exam_services_persistence.sql", "utf8"));
    await db.exec(`INSERT INTO auth.users VALUES ('${a}'),('${b}'),('${c}'),('${admin}');
      INSERT INTO public.profiles(id,role) VALUES ('${a}','provider'),('${b}','merchant'),('${c}','client'),('${admin}','admin');
      INSERT INTO public.services(id,provider_id,title,hourly_rate,duration_minutes,coverage_radius_miles,status) VALUES
      ('${draft}','${a}','Fictional draft',50,60,5,'draft'),
      ('${approved}','${a}','Fictional approved',80,30,10,'approved'),
      ('${other}','${b}','Fictional other',60,45,8,'draft'),
      ('${suspended}','${a}','Fictional suspended',10,15,1,'suspended'),
      ('${pending}','${a}','Fictional pending',10,15,1,'pending');
      INSERT INTO public.service_categories(id,name,slug,active_status) VALUES
      ('${active}','Plumbing','plumbing',true),('${inactive}','Retired','retired',false);
      INSERT INTO public.service_category_mappings VALUES ('${draft}','${active}'),('${approved}','${active}');
      INSERT INTO public.bookings(service_id,client_email,requested_date,notes) VALUES
      ('${approved}','resident@example.test','2026-12-01','Fictional appointment notes'),
      ('${other}','another@example.test','2026-12-02','Other fictional appointment');`);

    async function as(role: string, uid = "") {
      await db.exec("RESET ROLE");
      await db.query("SELECT set_config('request.jwt.claim.sub', $1, false)", [uid]);
      await db.exec(`SET ROLE ${role}`);
    }
    async function count(sql: string) { return (await db.query(sql)).rows.length; }
    const serviceInsert = (provider: string, status = "draft") => `INSERT INTO public.services(provider_id,title,hourly_rate,duration_minutes,coverage_radius_miles,status)
      VALUES ('${provider}','Fictional new service',20,30,5,'${status}') RETURNING id`;

    await t.test("all five tables have RLS enabled", async () => {
      const result = await db.query<{ relrowsecurity: boolean }>(`SELECT relrowsecurity FROM pg_class
        WHERE relnamespace='public'::regnamespace AND relkind='r'`);
      assert.equal(result.rows.length, 5);
      assert.ok(result.rows.every((row) => row.relrowsecurity));
    });
    await t.test("anonymous sees approved services, active categories and approved mappings only", async () => {
      await as("anon");
      assert.equal(await count("SELECT id FROM public.services"), 1);
      assert.equal(await count(`SELECT id FROM public.services WHERE id='${draft}'`), 0);
      assert.equal(await count("SELECT * FROM public.service_categories"), 1);
      assert.equal(await count("SELECT * FROM public.service_category_mappings"), 1);
      await assert.rejects(db.query("SELECT provider_id FROM public.services"), /permission denied/);
      await assert.rejects(db.query("SELECT * FROM public.profiles"), /permission denied/);
      await assert.rejects(db.query(serviceInsert(a)), /permission denied/);
    });
    await t.test("anonymous may insert a booking but sees no bookings, including its own", async () => {
      await db.exec(`INSERT INTO public.bookings(service_id,client_email,requested_date,notes)
        VALUES ('${approved}','public@example.test','2026-12-03','Fictional public request')`);
      assert.equal(await count("SELECT * FROM public.bookings"), 0);
    });
    await t.test("provider owns draft/suspended CRUD; other-provider, pending/live writes denied", async () => {
      await as("authenticated", a);
      assert.equal(await count(`UPDATE public.services SET title='Updated draft' WHERE id='${draft}' RETURNING id`), 1);
      assert.equal(await count(`UPDATE public.services SET title='Updated suspended' WHERE id='${suspended}' RETURNING id`), 1);
      for (const id of [other, approved, pending]) {
        assert.equal(await count(`UPDATE public.services SET title='Forbidden update' WHERE id='${id}' RETURNING id`), 0);
        assert.equal(await count(`DELETE FROM public.services WHERE id='${id}' RETURNING id`), 0);
      }
      assert.equal(await count(`SELECT id FROM public.services WHERE id='${other}'`), 0);
      await assert.rejects(db.query(`UPDATE public.services SET status='approved' WHERE id='${draft}'`), /row-level security/);
      await assert.rejects(db.query(`UPDATE public.services SET provider_id='${b}' WHERE id='${draft}'`), /permission denied/);
      await assert.rejects(db.query(serviceInsert(b)), /row-level security/);
      await assert.rejects(db.query(serviceInsert(a, "approved")), /row-level security/);
      assert.equal(await count(serviceInsert(a)), 1);
      assert.equal(await count("SELECT * FROM public.profiles"), 1);
      await assert.rejects(db.query("UPDATE public.profiles SET role='admin'"), /permission denied/);
      assert.equal(await count(`DELETE FROM public.services WHERE id='${suspended}' RETURNING id`), 1);
    });
    await t.test("provider reads only bookings for its services; merchant is equivalent", async () => {
      assert.equal(await count("SELECT * FROM public.bookings"), 2);
      await as("authenticated", b);
      assert.equal(await count("SELECT * FROM public.bookings"), 1);
      assert.equal(await count(serviceInsert(b)), 1);
    });
    await t.test("client can book but cannot read bookings or create services/escalate role", async () => {
      await as("authenticated", c);
      await db.exec(`INSERT INTO public.bookings(service_id,client_email,requested_date,notes)
        VALUES ('${approved}','client@example.test','2026-12-04','Fictional client request')`);
      assert.equal(await count("SELECT * FROM public.bookings"), 0);
      await assert.rejects(db.query(serviceInsert(c)), /row-level security/);
      await assert.rejects(db.query("INSERT INTO public.profiles(id,role) VALUES (gen_random_uuid(),'admin')"), /permission denied/);
      await assert.rejects(db.query("UPDATE public.profiles SET role='admin'"), /permission denied/);
      await assert.rejects(db.query("DELETE FROM public.bookings"), /permission denied/);
    });
    await t.test("admin profile alone has no elevation; trusted service_role has oversight of all five tables", async () => {
      await as("authenticated", admin);
      assert.equal(await count("SELECT * FROM public.bookings"), 0);
      await assert.rejects(db.query("UPDATE public.profiles SET role='admin'"), /permission denied/);
      await as("service_role");
      for (const table of ["profiles", "service_categories", "services", "service_category_mappings", "bookings"]) {
        assert.ok(await count(`SELECT * FROM public.${table}`) > 0);
        await db.exec(`UPDATE public.${table} SET ${table === "service_category_mappings" ? "category_id=category_id" : "created_at=created_at"}`);
      }
      assert.equal(await count(`UPDATE public.services SET status='approved' WHERE id='${draft}' RETURNING id`), 1);
      assert.equal(await count("SELECT * FROM public.bookings"), 4);
    });
    await t.test("database rejects invalid checks, duplicate mappings and missing foreign keys", async () => {
      const base = `INSERT INTO public.services(provider_id,title,hourly_rate,duration_minutes,coverage_radius_miles) VALUES`;
      for (const values of [`('${a}','bad',1,15,1)`, `('${a}','Valid title',-1,15,1)`, `('${a}','Valid title',1,14,1)`, `('${a}','Valid title',1,15,0)`]) {
        await assert.rejects(db.exec(`${base} ${values}`), /check constraint/);
      }
      await assert.rejects(db.exec(`INSERT INTO public.profiles(id,role) VALUES (gen_random_uuid(),'invalid')`));
      await assert.rejects(db.exec(`INSERT INTO public.service_category_mappings VALUES ('${approved}','${active}')`), /duplicate key/);
      await assert.rejects(db.exec(`INSERT INTO public.service_category_mappings VALUES (gen_random_uuid(),'${active}')`), /foreign key/);
      await assert.rejects(db.exec(`INSERT INTO public.bookings(service_id,client_email,requested_date,notes) VALUES ('${approved}','bad','2026-12-01','Long enough notes')`), /check constraint/);
      await assert.rejects(db.exec(`INSERT INTO public.bookings(service_id,client_email,requested_date,notes) VALUES ('${approved}','a@example.test','2026-12-01','short')`), /check constraint/);
      await assert.rejects(db.exec(`DELETE FROM public.profiles WHERE id='${a}'`), /foreign key/);
    });
    await t.test("category/service cascading deletes and auth-user cascade with provider RESTRICT", async () => {
      await db.exec(`DELETE FROM public.service_categories WHERE id='${active}'`);
      assert.equal(await count("SELECT * FROM public.service_category_mappings"), 0);
      await db.exec(`DELETE FROM public.services WHERE id='${approved}'`);
      assert.equal(await count(`SELECT * FROM public.bookings WHERE service_id='${approved}'`), 0);
      await assert.rejects(db.exec(`DELETE FROM auth.users WHERE id='${a}'`), /permission denied/);
      await as("postgres");
      await assert.rejects(db.exec(`DELETE FROM auth.users WHERE id='${a}'`), /foreign key/);
      await db.exec(`DELETE FROM auth.users WHERE id='${c}'`);
      assert.equal(await count(`SELECT * FROM public.profiles WHERE id='${c}'`), 0);
    });
  } finally { await db.close(); }
});
