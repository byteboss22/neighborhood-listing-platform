import { z } from "zod";
import { sponsorSchema } from "./listing";

const zip = z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/);
// JavaScript's Date.parse compares milliseconds. Reject finer precision rather
// than silently moving campaign start/end instants during validation/selection.
const timestamp = z.iso.datetime({ offset: true }).refine(
  (value) => !/\.[0-9]{4}/.test(value), "Use at most three fractional-second digits.",
);
export const placementSchema = z.enum(["property-card", "property-detail"]);
export const pointSchema = z.strictObject({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
export const sponsorContextSchema = z.strictObject({
  zip_code: zip,
  location: pointSchema.optional(),
  placement: placementSchema,
  now: timestamp,
});
export const sponsorCandidateSchema = sponsorSchema.extend({
  status: z.enum(["draft", "approved", "suspended"]),
  active: z.boolean(),
  placements: z.array(placementSchema).min(1),
  starts_at: timestamp,
  ends_at: timestamp,
  priority: z.number().int().min(0).max(100),
  zip_codes: z.array(zip).max(100),
  coverage: z.strictObject({ center: pointSchema, radius_miles: z.number().positive().max(100) }).optional(),
}).refine((c) => Date.parse(c.starts_at) < Date.parse(c.ends_at), "Campaign end must follow start.")
  .refine((c) => c.zip_codes.length > 0 || !!c.coverage, "At least one coverage rule is required.");
export const sponsorCandidatesSchema = z.array(sponsorCandidateSchema).max(500);
export type SponsorContext = z.infer<typeof sponsorContextSchema>;
export type SponsorCandidate = z.infer<typeof sponsorCandidateSchema>;
