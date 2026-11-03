import { serviceSchema, PUBLIC_SERVICE_COLUMNS } from "@/schemas/service";
import { supabaseServer } from "@/lib/supabaseServer";
import { invalid, json, unavailable } from "@/lib/apiResponse";

export async function GET() {
  try {
    // Deliberately anonymous, even when the requester has a provider session.
    const { data, error } = await supabaseServer().from("services")
      .select(PUBLIC_SERVICE_COLUMNS).eq("status", "approved").order("created_at");
    if (error) return unavailable();
    return json(data);
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return json({ error: "Invalid JSON.", issues: [{ path: [], message: "Expected a JSON body." }] }, 400);
  }
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return invalid(parsed.error.issues);

  const token = request.headers.get("authorization")?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) return json({ error: "Authentication required." }, 401);

  try {
    const db = supabaseServer(token);
    const { data: { user }, error: authError } = await db.auth.getUser(token);
    if (authError || !user) return json({ error: "Invalid or expired session." }, 401);
    // Role comes from a protected database row, never editable user metadata.
    const { data: profile, error: profileError } = await db.from("profiles")
      .select("role").eq("id", user.id).maybeSingle();
    if (profileError) return unavailable();
    if (!profile || !["provider", "merchant"].includes(profile.role)) {
      return json({ error: "A service provider account is required." }, 403);
    }
    const { data, error } = await db.from("services").insert({
      ...parsed.data, provider_id: user.id, status: "draft",
    }).select(`${PUBLIC_SERVICE_COLUMNS},provider_id,status,created_at`).single();
    if (error) {
      if (error.code === "42501") return json({ error: "Service creation is not permitted." }, 403);
      return unavailable();
    }
    return json(data, 201);
  } catch {
    return unavailable();
  }
}
