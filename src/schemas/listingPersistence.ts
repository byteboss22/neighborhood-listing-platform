import { z } from "zod";
import { propertySchema, sponsorSchema, validateListingBundle } from "./listing";

// Keep the Lab 3 source of truth; ownership/moderation never come from a payload.
export const createListingSchema = propertySchema.omit({ local_sponsors: true }).extend({
  price: propertySchema.shape.price.max(99999999.99),
  bathrooms: propertySchema.shape.bathrooms.max(99),
  bedrooms: propertySchema.shape.bedrooms.max(2147483647),
  square_feet: propertySchema.shape.square_feet.max(2147483647),
}).superRefine((data, ctx) => {
  if (new Set(data.amenities).size !== data.amenities.length) {
    ctx.addIssue({ code: "custom", path: ["amenities"], message: "Amenities must be unique." });
  }
});

export const inquirySchema = z.strictObject({
  property_id: propertySchema.shape.property_id,
  requester_name: z.string().trim().min(2).max(120),
  requester_email: z.email().max(254),
  message: z.string().trim().min(10).max(2000),
});

export const PUBLIC_PROPERTY_COLUMNS = "property_id,title,street,city,state,country,zip_code,price,currency,price_period,property_type,bedrooms,bathrooms,square_feet,amenities,image_path,image_alt";
export const PUBLIC_SPONSOR_COLUMNS = "sponsor_id,business_name,website_url";
const publicProperty = propertySchema.omit({ address: true, local_sponsors: true }).extend({
  street: propertySchema.shape.address.shape.street,
  city: propertySchema.shape.address.shape.city,
  state: propertySchema.shape.address.shape.state,
  country: propertySchema.shape.address.shape.country,
});
const publicRows = z.strictObject({
  properties: z.array(publicProperty).max(100),
  sponsors: z.array(sponsorSchema).max(100),
  relationships: z.array(z.strictObject({
    property_id: propertySchema.shape.property_id,
    sponsor_id: sponsorSchema.shape.sponsor_id,
  })).max(1000),
});

/** Empty is valid for a live query, unlike the nonempty Lab 3 generation exercise. */
export function parsePublicListings(input: unknown) {
  const parsed = publicRows.safeParse(input);
  if (!parsed.success) return null;
  const { properties, sponsors, relationships } = parsed.data;
  const ids = new Set(properties.map((p) => p.property_id));
  const sponsorIds = new Set(sponsors.map((s) => s.sponsor_id));
  if (relationships.some((r) => !ids.has(r.property_id) || !sponsorIds.has(r.sponsor_id))) return null;
  if (new Set(sponsors.map((s) => s.sponsor_id)).size !== sponsors.length) return null;
  if (!properties.length) return relationships.length ? null : parsed.data;
  const records = properties.map(({ street, city, state, country, ...p }) => ({
    ...p, address: { street, city, state, country },
    local_sponsors: relationships.filter((r) => r.property_id === p.property_id).map((r) => r.sponsor_id),
  }));
  // Bundles may have no eligible sponsors; validate properties without inventing one.
  const checkedProperties = z.array(propertySchema).safeParse(records);
  if (!checkedProperties.success || new Set(records.map((p) => p.property_id)).size !== records.length) return null;
  if (records.some((p) => new Set(p.amenities).size !== p.amenities.length || new Set(p.local_sponsors).size !== p.local_sponsors.length)) return null;
  if (sponsors.length && !validateListingBundle({ synthetic: true, properties: records, sponsors }).success) return null;
  return parsed.data;
}

export type PublicListings = NonNullable<ReturnType<typeof parsePublicListings>>;
