import assert from "node:assert/strict";

export async function assertClientCannotEscalate(db, userId) {
  // Target the signed-in user explicitly. An unfiltered UPDATE can be rejected
  // by Supabase's safe-update guard (21000) before role privileges are checked.
  const result = await db.from("profiles").update({ role: "admin" }).eq("id", userId);
  assert.equal(result.error?.code, "42501");
  const profile = await db.from("profiles").select("role").eq("id", userId).single();
  assert.equal(profile.error, null);
  assert.equal(profile.data.role, "client");
}
