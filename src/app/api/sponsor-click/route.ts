import { json, unavailable } from "@/lib/apiResponse";
import { loadSponsorSelection, PropertyUnavailable } from "@/lib/sponsorRepository";
import { placementRequestSchema } from "@/schemas/sponsorTransport";
import { propertySchema } from "@/schemas/listing";

const clickQuery = placementRequestSchema.extend({ sponsor_id: propertySchema.shape.property_id });
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = clickQuery.safeParse(Object.fromEntries(params));
  if (!query.success || [...params.keys()].length !== new Set(params.keys()).size) return json({ error: "Invalid sponsor link." }, 400);
  try {
    const { decision, candidates } = await loadSponsorSelection(query.data.property_id, query.data.placement);
    if (decision.kind !== "sponsor" || decision.sponsor_id !== query.data.sponsor_id) return json({ error: "Sponsor unavailable." }, 404);
    const record = candidates.find((c) => c.sponsor_id === decision.sponsor_id);
    if (!record) return json({ error: "Sponsor unavailable." }, 404);
    // Destination is the freshly validated stored URL, never a request parameter.
    return new Response(null, { status: 303, headers: { Location: record.website_url, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  } catch (error) {
    return error instanceof PropertyUnavailable ? json({ error: "Sponsor unavailable." }, 404) : unavailable();
  }
}
