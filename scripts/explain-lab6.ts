// Actual isolated PostgreSQL query plan; no network/database credentials used.
import { mkdir, writeFile } from "node:fs/promises";
import { lab6Database } from "../tests/helpers/lab6Database";
async function main() {
const { db, as } = await lab6Database();
try {
  await as("anon");
  const query = "SELECT * FROM public.lab6_candidates_for_property('maple-court-apartment','property-card') WHERE status='approved' AND active AND placements @> ARRAY['property-card']::text[] AND starts_at<=$1::timestamptz AND ends_at>$1::timestamptz ORDER BY priority DESC,sponsor_id LIMIT 501";
  const clock = new Date().toISOString();
  const plan = await db.query(`EXPLAIN (ANALYZE, FORMAT JSON) ${query}`, [clock]);
  await mkdir("docs/evidence/lab6", { recursive: true });
  await writeFile("docs/evidence/lab6/query-plan.json", JSON.stringify({ scope: "Actual in-memory PGlite, three migrations, five fictional properties/three sponsors/two campaigns, anonymous role. Not a hosted/production benchmark.", query, parameters: [clock], plan: plan.rows, index_decision: "No additional performance indexes added; only required primary keys and prerequisite indexes. Reassess with representative data before production optimization." }, null, 2) + "\n");
  console.log("Saved actual anonymous EXPLAIN ANALYZE to docs/evidence/lab6/query-plan.json");
} finally { await db.close(); }

}
main().catch((error) => { console.error(error); process.exitCode = 1; });
