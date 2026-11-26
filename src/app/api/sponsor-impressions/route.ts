import { json, unavailable } from "@/lib/apiResponse";
import { loadSponsorSelection, PropertyUnavailable } from "@/lib/sponsorRepository";
import { impressionRequestSchema } from "@/schemas/sponsorTransport";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  const parsed = impressionRequestSchema.safeParse(body);
  if (!parsed.success) return json({ error: "Invalid impression." }, 400);
  try {
    const { db, decision } = await loadSponsorSelection(parsed.data.property_id, parsed.data.placement);
    if (decision.kind !== "sponsor" || decision.sponsor_id !== parsed.data.sponsor_id) return json({ error: "Placement unavailable." }, 409);
    const result = await db.rpc("lab6_record_impression", {
      target_event_id: parsed.data.event_id, target_sponsor_id: parsed.data.sponsor_id,
      target_property_id: parsed.data.property_id, target_placement: parsed.data.placement,
    });
    if (result.error) return result.error.code === "42501" ? json({ error: "Placement unavailable." }, 409) : unavailable();
    return json({ received: true }, 202);
  } catch (error) {
    return error instanceof PropertyUnavailable ? json({ error: "Placement unavailable." }, 409) : unavailable();
  }
}
