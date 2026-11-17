import type { Property, Sponsor } from "../types/index";
import { validateListingBundle } from "../schemas/listing";

/** Unknown source data is rejected before it can reach the Lab 2 components. */
export function listingView(input: unknown):
  | { success: true; properties: Property[]; sponsors: Sponsor[] }
  | { success: false; error: string } {
  const result = validateListingBundle(input);
  if (!result.success) return { success: false, error: "Sample listings are unavailable because their data did not pass validation." };
  return {
    success: true,
    properties: result.data.properties.map((p) => ({
      id: p.property_id,
      title: p.title,
      streetAddress: p.address.street,
      city: p.address.city,
      monthlyRentUsd: p.price,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      imagePath: p.image_path,
      imageAlt: p.image_alt,
    })),
    sponsors: result.data.sponsors.map((s) => ({
      id: s.sponsor_id, businessName: s.business_name, websiteUrl: s.website_url,
    })),
  };
}
