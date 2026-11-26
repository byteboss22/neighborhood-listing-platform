import "server-only";
import { placementRequestSchema } from "../schemas/sponsorTransport";

export function placementQuery(request: Request) {
  const params = new URL(request.url).searchParams;
  // Do not silently pick one of duplicate parameters.
  if ([...params.keys()].length !== new Set(params.keys()).size) return null;
  const parsed = placementRequestSchema.safeParse(Object.fromEntries(params));
  return parsed.success ? parsed.data : null;
}
