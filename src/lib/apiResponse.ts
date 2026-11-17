import "server-only";
import type { z } from "zod";

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function invalid(issues: z.core.$ZodIssue[]) {
  return json({ error: "Invalid request.", issues: issues.map(({ path, message }) => ({ path, message })) }, 400);
}

export function unavailable() {
  return json({ error: "Service temporarily unavailable." }, 503);
}
