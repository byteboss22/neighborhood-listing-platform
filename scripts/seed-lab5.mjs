import { readFileSync } from "node:fs";

// Generates SQL only. No credentials, network, Auth provisioning or DB mutation.
const args = process.argv.slice(2);
function option(name) { return args[args.indexOf(name) + 1]; }
const owner = option("--owner-id");
const reviewer = option("--reviewer-id");
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
if (!args.includes("--owner-id") || !args.includes("--reviewer-id") || !uuid.test(owner ?? "") || !uuid.test(reviewer ?? "")) {
  console.error("Generate fictional-development SQL: node scripts/seed-lab5.mjs --owner-id <existing-profile-uuid> --reviewer-id <existing-admin-profile-uuid>");
  process.exit(1);
}
const bundle = JSON.parse(readFileSync(new URL("../data/generated/ai-studio-attempt-01.json", import.meta.url), "utf8"));
if (bundle.synthetic !== true) throw new Error("Only the synthetic fixture may be seeded.");
const literal = (value) => value === null ? "NULL" : typeof value === "number" ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
const lines = [
  "-- Fictional Lab 5 development seed. Generated SQL only; inspect before applying.",
  "-- Use only an empty dedicated development database, never production.",
  "BEGIN;",
  `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id=${literal(owner)}) THEN RAISE EXCEPTION 'Owner profile missing'; END IF; IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id=${literal(reviewer)} AND role='admin') THEN RAISE EXCEPTION 'Admin reviewer profile missing'; END IF; IF EXISTS (SELECT 1 FROM public.properties) OR EXISTS (SELECT 1 FROM public.sponsors) THEN RAISE EXCEPTION 'Seed requires empty Lab 5 tables'; END IF; END $$;`,
];
for (const p of bundle.properties) {
  const fields = [p.property_id, owner, p.title, p.address.street, p.address.city, p.address.state, p.address.country, p.zip_code, p.price, p.currency, p.price_period, p.property_type, p.bedrooms, p.bathrooms, p.square_feet];
  lines.push(`INSERT INTO public.properties(property_id,owner_id,title,street,city,state,country,zip_code,price,currency,price_period,property_type,bedrooms,bathrooms,square_feet,amenities,image_path,image_alt,status,approved_at,approved_by) VALUES (${fields.map(literal).join(",")},ARRAY[${p.amenities.map(literal).join(",")}]::text[],${literal(p.image_path)},${literal(p.image_alt)},'approved',now(),${literal(reviewer)});`);
}
for (const s of bundle.sponsors) {
  lines.push(`INSERT INTO public.sponsors(sponsor_id,owner_id,business_name,website_url,status,is_active,approved_at,approved_by) VALUES (${[s.sponsor_id, owner, s.business_name, s.website_url].map(literal).join(",")},'approved',true,now(),${literal(reviewer)});`);
}
for (const p of bundle.properties) for (const sponsor of p.local_sponsors) {
  lines.push(`INSERT INTO public.property_sponsors(property_id,sponsor_id) VALUES (${literal(p.property_id)},${literal(sponsor)});`);
}
lines.push("COMMIT;");
process.stdout.write(lines.join("\n") + "\n");
