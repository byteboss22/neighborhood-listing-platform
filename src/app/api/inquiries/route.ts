import { supabaseServer } from "@/lib/supabaseServer";
import { invalid, json, unavailable } from "@/lib/apiResponse";
import { inquirySchema } from "@/schemas/listingPersistence";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return invalid(parsed.error.issues);
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) return json({ error: "Authentication required." }, 401);
  try {
    const db = supabaseServer(token);
    const { data: { user }, error } = await db.auth.getUser(token);
    if (error || !user) return json({ error: "Invalid or expired session." }, 401);
    const profile = await db.from("profiles").select("role").eq("id", user.id).maybeSingle();
    if (profile.error) return unavailable();
    if (profile.data?.role !== "client") return json({ error: "A client account is required." }, 403);
    const saved = await db.from("inquiries").insert({ ...parsed.data, requester_id: user.id });
    if (saved.error) {
      if (["42501", "23503"].includes(saved.error.code)) return json({ error: "Property is unavailable." }, 400);
      if (saved.error.code === "23514") return json({ error: "Invalid inquiry." }, 400);
      return unavailable();
    }
    // No contact information, message or database row is echoed.
    return json({ received: true }, 201);
  } catch { return unavailable(); }
}
