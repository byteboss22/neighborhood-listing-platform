import { z } from "zod";
import { propertySchema } from "./listing";
import { placementSchema } from "./sponsorSelection";

export const placementRequestSchema = z.strictObject({ property_id: propertySchema.shape.property_id, placement: placementSchema });
export const impressionRequestSchema = placementRequestSchema.extend({ sponsor_id: propertySchema.shape.property_id, event_id: z.uuid() });
export const sponsorDecisionSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("house"), message: z.literal("Explore fictional listings and neighborhood information.") }),
  z.strictObject({ kind: z.literal("sponsor"), sponsor_id: propertySchema.shape.property_id, business_name: z.string().min(3), matched_by: z.enum(["zip", "radius"]), disclosure: z.literal("Sponsored") }),
]);
