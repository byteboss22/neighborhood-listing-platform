import { json, unavailable } from "@/lib/apiResponse";
import { placementQuery } from "@/lib/sponsorRequest";
import { loadSponsorSelection, PropertyUnavailable } from "@/lib/sponsorRepository";

export async function GET(request: Request) {
  const query = placementQuery(request);
  if (!query) return json({ error: "Invalid placement request." }, 400);
  try {
    return json((await loadSponsorSelection(query.property_id, query.placement)).decision);
  } catch (error) {
    return error instanceof PropertyUnavailable ? json({ error: "Property unavailable." }, 404) : unavailable();
  }
}
