import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

export async function lab6Database() {
  const db = new PGlite();
  const owner = "10000000-0000-4000-8000-000000000001";
  const client = "10000000-0000-4000-8000-000000000002";
  const admin = "10000000-0000-4000-8000-000000000003";
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
    CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid PRIMARY KEY);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    GRANT USAGE ON SCHEMA auth TO anon,authenticated,service_role;
    GRANT EXECUTE ON FUNCTION auth.uid() TO anon,authenticated,service_role;`);
  for (const migration of ["20261029140000_exam_services_persistence.sql", "20261123000000_lab5_listing_persistence.sql", "20261125000000_lab6_sponsor_matching.sql"]) {
    await db.exec(await readFile(`supabase/migrations/${migration}`, "utf8"));
  }
  await db.exec(`INSERT INTO auth.users VALUES ('${owner}'),('${client}'),('${admin}');
    INSERT INTO profiles(id,role) VALUES ('${owner}','provider'),('${client}','client'),('${admin}','admin');`);
  await db.exec(execFileSync(process.execPath, ["scripts/seed-lab5.mjs", "--owner-id", owner, "--reviewer-id", admin], { encoding: "utf8" }));
  await db.exec(execFileSync(process.execPath, ["scripts/seed-lab6.mjs"], { encoding: "utf8" }));
  async function as(role: "anon" | "authenticated" | "service_role" | "postgres", uid = "") {
    await db.exec("RESET ROLE");
    await db.query("SELECT set_config('request.jwt.claim.sub',$1,false)", [uid]);
    await db.exec(`SET ROLE ${role}`);
  }
  return { db, as, owner, client, admin };
}
