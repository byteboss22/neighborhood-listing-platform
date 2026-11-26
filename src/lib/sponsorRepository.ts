import "server-only";
import { z } from "zod";
import { supabaseServer } from "./supabaseServer";
import { selectSponsor } from "./selectSponsor";
import { sponsorCandidatesSchema, sponsorContextSchema } from "../schemas/sponsorSelection";

export const PUBLIC_CANDIDATE_COLUMNS = "sponsor_id,business_name,website_url,status,active,placements,starts_at,ends_at,priority,zip_codes,center_latitude,center_longitude,radius_miles";
const propertyRow = z.strictObject({ property_id: z.string(), zip_code: z.string(), sponsor_latitude: z.number().nullable(), sponsor_longitude: z.number().nullable() });
export class PropertyUnavailable extends Error {}

// PostgreSQL may format exact millisecond values with extra trailing zeroes.
// Accept those losslessly; never truncate a nonzero sub-millisecond fraction.
function timestamp(value: unknown) {
  if (typeof value !== "string") throw new Error("Invalid campaign timestamp");
  const fraction = value.match(/\.(\d+)/)?.[1] ?? "";
  if (/[1-9]/.test(fraction.slice(3))) throw new Error("Unsupported campaign precision");
  const milliseconds = Date.parse(value);
  if (!Number.isFinite(milliseconds)) throw new Error("Invalid campaign timestamp");
  return new Date(milliseconds).toISOString();
}

export async function loadSponsorSelection(propertyId: string, placement: "property-card" | "property-detail", now = new Date().toISOString()) {
  const db = supabaseServer(); // always anonymous, even on authenticated pages
  const property = await db.from("properties").select("property_id,zip_code,sponsor_latitude,sponsor_longitude")
    .eq("property_id", propertyId).eq("status", "approved").maybeSingle();
  if (property.error) throw new Error("Property query unavailable");
  if (!property.data) throw new PropertyUnavailable();
  const p = propertyRow.parse(property.data);
  if ((p.sponsor_latitude === null) !== (p.sponsor_longitude === null)) throw new Error("Invalid page geography");
  const context = sponsorContextSchema.parse({ zip_code: p.zip_code, placement, now,
    ...(p.sponsor_latitude === null ? {} : { location: { latitude: p.sponsor_latitude, longitude: p.sponsor_longitude } }),
  });
  const result = await db.rpc("lab6_candidates_for_property", { target_property_id: propertyId, target_placement: placement }).select(PUBLIC_CANDIDATE_COLUMNS)
    .eq("status", "approved").eq("active", true).contains("placements", [placement])
    .lte("starts_at", now).gt("ends_at", now)
    .order("priority", { ascending: false }).order("sponsor_id").limit(501);
  if (result.error) throw new Error("Candidate query unavailable");
  const rows = z.array(z.record(z.string(), z.unknown())).max(500).parse(result.data);
  const candidates = sponsorCandidatesSchema.parse(rows.map((row) => ({
    sponsor_id: row.sponsor_id, business_name: row.business_name, website_url: row.website_url,
    status: row.status, active: row.active, placements: row.placements,
    starts_at: timestamp(row.starts_at), ends_at: timestamp(row.ends_at), priority: row.priority, zip_codes: row.zip_codes,
    ...(row.radius_miles === null ? {} : { coverage: { center: { latitude: row.center_latitude, longitude: row.center_longitude }, radius_miles: row.radius_miles } }),
  })));
  return { db, decision: selectSponsor(context, candidates), candidates };
}
