import { supabaseServer } from "@/lib/supabaseServer";
import { invalid, json, unavailable } from "@/lib/apiResponse";
import { createListingSchema, parsePublicListings, PUBLIC_PROPERTY_COLUMNS, PUBLIC_SPONSOR_COLUMNS } from "@/schemas/listingPersistence";

export async function GET() {
  try {
    // Always anonymous so an owner's session cannot expand public results.
    const db = supabaseServer();
    const properties = await db.from("properties").select(PUBLIC_PROPERTY_COLUMNS)
      .eq("status", "approved").order("property_id").limit(100);
    if (properties.error) return unavailable();
    if (!properties.data?.length) return json({ properties: [], sponsors: [], relationships: [] });
    const sponsors = await db.from("sponsors").select(PUBLIC_SPONSOR_COLUMNS)
      .eq("status", "approved").eq("is_active", true).order("sponsor_id").limit(100);
    if (sponsors.error) return unavailable();
    const relationships = sponsors.data?.length
      ? await db.from("property_sponsors").select("property_id,sponsor_id")
        .in("property_id", properties.data.map((p) => p.property_id))
        .in("sponsor_id", sponsors.data.map((s) => s.sponsor_id))
        .order("property_id").order("sponsor_id").limit(1000)
      : { data: [], error: null };
    if (relationships.error) return unavailable();
    const result = parsePublicListings({ properties: properties.data, sponsors: sponsors.data, relationships: relationships.data });
    return result ? json(result) : unavailable();
  } catch { return unavailable(); }
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  const parsed = createListingSchema.safeParse(body);
  if (!parsed.success) return invalid(parsed.error.issues);
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) return json({ error: "Authentication required." }, 401);
  try {
    const db = supabaseServer(token);
    const { data: { user }, error } = await db.auth.getUser(token);
    if (error || !user) return json({ error: "Invalid or expired session." }, 401);
    const profile = await db.from("profiles").select("id").eq("id", user.id).maybeSingle();
    if (profile.error) return unavailable();
    if (!profile.data) return json({ error: "A provisioned account is required." }, 403);
    const { address, ...fields } = parsed.data;
    const saved = await db.from("properties").insert({ ...fields, ...address, owner_id: user.id, status: "draft" });
    if (saved.error) {
      if (saved.error.code === "23505") return json({ error: "Listing identifier unavailable." }, 409);
      if (saved.error.code === "42501") return json({ error: "Listing creation is not permitted." }, 403);
      if (["23503", "23514", "22003"].includes(saved.error.code)) return json({ error: "Invalid listing." }, 400);
      return unavailable();
    }
    return json({ property_id: fields.property_id, status: "draft" }, 201);
  } catch { return unavailable(); }
}
