import { z } from "zod";

const identifier = z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().min(1).regex(/\S/, "Must include a non-whitespace character.");

export const amenities = ["parking", "laundry", "elevator", "balcony", "garden", "air_conditioning"] as const;

/** Serializable structural rules; cross-record integrity is checked separately. */
export const propertySchema = z.strictObject({
  property_id: identifier,
  title: text.min(5),
  address: z.strictObject({
    street: text,
    city: text,
    state: z.string().regex(/^[A-Z]{2}$/),
    country: z.literal("US"),
  }),
  zip_code: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/),
  price: z.number().nonnegative().multipleOf(0.01),
  currency: z.literal("USD"),
  price_period: z.literal("month"),
  property_type: z.enum(["apartment", "studio", "house", "condo", "townhouse"]),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative().multipleOf(0.5),
  square_feet: z.number().int().positive(),
  amenities: z.array(z.enum(amenities)),
  // IDs only: sponsor details live once in sponsors; join rows are derived.
  local_sponsors: z.array(identifier),
  image_path: z.enum(["/images/maple-court.svg", "/images/cedar-studio.svg", "/images/willow-house.svg"]),
  image_alt: text.min(10),
});

export const sponsorSchema = z.strictObject({
  sponsor_id: identifier,
  business_name: text.min(3),
  website_url: z.string().regex(/^https:\/\/(?:[a-z0-9-]+\.)?example\.(?:com|org|net)\/?$/),
});

export const listingBundleSchema = z.strictObject({
  synthetic: z.literal(true),
  properties: z.array(propertySchema).min(1),
  sponsors: z.array(sponsorSchema).min(1),
});

export type PropertyRecord = z.infer<typeof propertySchema>;
export type SponsorRecord = z.infer<typeof sponsorSchema>;
export type ListingBundle = z.infer<typeof listingBundleSchema>;
export type PropertySponsor = { property_id: string; sponsor_id: string };

export function listingJsonSchema() {
  return z.toJSONSchema(listingBundleSchema, { target: "draft-2020-12" });
}

export type ContractIssue = { path: string; message: string };
export type ValidationResult =
  | { success: true; data: ListingBundle; relationships: PropertySponsor[] }
  | { success: false; issues: ContractIssue[] };

/** The full boundary includes structure, unique IDs and foreign-key membership. */
export function validateListingBundle(input: unknown): ValidationResult {
  const parsed = listingBundleSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join("."), message: issue.message,
    })) };
  }
  const issues: ContractIssue[] = [];
  function unique(values: string[], path: string) {
    if (new Set(values).size !== values.length) issues.push({ path, message: "Duplicate values are not allowed." });
  }
  unique(parsed.data.properties.map((p) => p.property_id), "properties");
  unique(parsed.data.sponsors.map((s) => s.sponsor_id), "sponsors");
  const sponsorIds = new Set(parsed.data.sponsors.map((s) => s.sponsor_id));
  const relationships: PropertySponsor[] = [];
  parsed.data.properties.forEach((property, index) => {
    unique(property.amenities, `properties.${index}.amenities`);
    unique(property.local_sponsors, `properties.${index}.local_sponsors`);
    property.local_sponsors.forEach((id, sponsorIndex) => {
      if (!sponsorIds.has(id)) issues.push({
        path: `properties.${index}.local_sponsors.${sponsorIndex}`,
        message: "Referenced sponsor does not exist in this bundle.",
      });
      relationships.push({ property_id: property.property_id, sponsor_id: id });
    });
  });
  return issues.length ? { success: false, issues } : { success: true, data: parsed.data, relationships };
}
