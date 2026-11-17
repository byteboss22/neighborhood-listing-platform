import { bookingSchema } from "@/schemas/booking";
import { supabaseServer } from "@/lib/supabaseServer";
import { invalid, json, unavailable } from "@/lib/apiResponse";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return json({ error: "Invalid JSON.", issues: [{ path: [], message: "Expected a JSON body." }] }, 400);
  }
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return invalid(parsed.error.issues);
  try {
    // Anonymous insert is explicitly permitted. Do not request a returned row:
    // clients, including this caller, have no booking SELECT policy.
    const { error } = await supabaseServer().from("bookings").insert(parsed.data);
    if (error?.code === "23503") return json({ error: "Service is unavailable." }, 400);
    if (error) return unavailable();
    return json({ received: true }, 201);
  } catch {
    return unavailable();
  }
}
