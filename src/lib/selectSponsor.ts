import { sponsorContextSchema, sponsorCandidatesSchema } from "../schemas/sponsorSelection";

export type SponsorDecision =
  | { kind: "sponsor"; sponsor_id: string; business_name: string; matched_by: "zip" | "radius"; disclosure: "Sponsored" }
  | { kind: "house"; message: string };

const house = (): SponsorDecision => ({ kind: "house", message: "Explore fictional listings and neighborhood information." });

/** Great-circle miles, not road distance or numeric ZIP proximity. */
function miles(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  // ±180 longitude is the same meridian; longitude is immaterial at an exact
  // pole. Avoid a tiny nonzero trigonometric residual for identical points.
  if (a.latitude === b.latitude && (Math.abs(a.latitude) === 90
    || a.longitude === b.longitude || Math.abs(a.longitude - b.longitude) === 360)) return 0;
  const rad = (n: number) => n * Math.PI / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 3958.7613 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, h))));
}

// Compensate for arithmetic round-off at an inclusive boundary. Cap the allowance
// at 1e-9 miles AND one-billionth of the radius, including for very small radii.
function withinRadius(distance: number, radius: number) {
  return distance <= radius + Math.min(1e-9, radius * 1e-9);
}

/** Pure deterministic boundary: explicit clock/context; no identity, network or mutation. */
export function selectSponsor(context: unknown, candidates: unknown): SponsorDecision {
  const parsedContext = sponsorContextSchema.safeParse(context);
  const parsedCandidates = sponsorCandidatesSchema.safeParse(candidates);
  if (!parsedContext.success || !parsedCandidates.success) return house();
  const ctx = parsedContext.data;
  const rows = parsedCandidates.data;
  if (new Set(rows.map((r) => r.sponsor_id)).size !== rows.length) return house();
  const now = Date.parse(ctx.now);
  const eligible = rows.flatMap((candidate) => {
    if (candidate.status !== "approved" || !candidate.active || !candidate.placements.includes(ctx.placement)
      || now < Date.parse(candidate.starts_at) || now >= Date.parse(candidate.ends_at)) return [];
    const zipMatch = candidate.zip_codes.some((zip) => zip.slice(0, 5) === ctx.zip_code.slice(0, 5));
    const radiusMatch = !!(candidate.coverage && ctx.location
      && withinRadius(miles(candidate.coverage.center, ctx.location), candidate.coverage.radius_miles));
    if (!zipMatch && !radiusMatch) return [];
    return [{ candidate, matched_by: zipMatch ? "zip" as const : "radius" as const }];
  });
  eligible.sort((a, b) => b.candidate.priority - a.candidate.priority
    || Number(b.matched_by === "zip") - Number(a.matched_by === "zip")
    || (a.candidate.sponsor_id < b.candidate.sponsor_id ? -1 : a.candidate.sponsor_id > b.candidate.sponsor_id ? 1 : 0));
  const selected = eligible[0];
  return selected ? {
    kind: "sponsor", sponsor_id: selected.candidate.sponsor_id,
    business_name: selected.candidate.business_name, matched_by: selected.matched_by, disclosure: "Sponsored",
  } : house();
}
