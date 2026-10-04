import { z } from "zod";

export const amenityValues = [
  "accessible_entry",
  "balcony",
  "laundry",
  "parking",
  "pet_friendly",
  "public_transit",
  "yard",
] as const;

const propertyIdSchema = z
  .string()
  .regex(/^prop_[a-z0-9]+(?:_[a-z0-9]+)*$/, "Use a prop_ snake-case ID.");

const sponsorIdSchema = z
  .string()
  .regex(/^sponsor_[a-z0-9]+(?:_[a-z0-9]+)*$/, "Use a sponsor_ snake-case ID.");

const amenitiesSchema = z
  .array(z.enum(amenityValues))
  .min(1)
  .max(12)
  .refine((amenities) => new Set(amenities).size === amenities.length, {
    message: "Amenities must not contain duplicates.",
  })
  .meta({ uniqueItems: true });

export const AddressSchema = z
  .strictObject({
    line_1: z.string().trim().min(5).max(100),
    line_2: z.string().trim().min(1).max(60).optional(),
    city: z
      .string()
      .trim()
      .min(2)
      .max(60)
      .regex(/^[A-Za-z .'-]+$/, "City may contain letters, spaces, periods, apostrophes, and hyphens."),
    state: z.string().regex(/^[A-Z]{2}$/, "Use a two-letter state code."),
    zip_code: z.string().regex(/^\d{5}$/, "Use a five-digit ZIP code."),
  })
  .meta({ id: "Address", description: "A fictional US mailing address." });

export const SponsorSchema = z
  .strictObject({
    sponsor_id: sponsorIdSchema,
    business_name: z.string().trim().min(2).max(80),
    category: z.enum(["coffee", "financial", "home_services", "moving", "retail"]),
    message: z.string().trim().min(10).max(180),
    website_url: z.url().refine((url) => url.startsWith("https://"), {
      message: "Sponsor URLs must use HTTPS.",
    }),
  })
  .meta({ id: "Sponsor", description: "A neighborhood business eligible for sponsorship." });

export const PropertySponsorSchema = z
  .strictObject({
    property_id: propertyIdSchema,
    sponsor_id: sponsorIdSchema,
    selection_reason: z.string().trim().min(10).max(160),
    display_order: z.number().int().min(1).max(3),
  })
  .meta({
    id: "PropertySponsor",
    description: "A relationship between one property and one selected local sponsor.",
  });

export const PropertySchema = z
  .strictObject({
    property_id: propertyIdSchema,
    property_type: z.enum(["apartment", "condo", "duplex", "house", "loft"]),
    title: z.string().trim().min(5).max(100),
    address: AddressSchema,
    price: z.number().int().nonnegative().max(100_000_000),
    bedrooms: z.number().int().nonnegative().max(20),
    bathrooms: z.number().nonnegative().max(20).multipleOf(0.5),
    square_feet: z.number().int().positive().max(100_000),
    amenities: amenitiesSchema,
    description: z.string().trim().min(30).max(600),
    voice_summary: z.string().trim().min(20).max(240),
    image_url: z.string().regex(/^\/properties\/[a-z0-9-]+\.svg$/),
    image_alt: z.string().trim().min(15).max(180),
    property_url: z.string().regex(/^\/properties\/[a-z0-9-]+$/),
    local_sponsors: z.array(PropertySponsorSchema).min(1).max(3),
  })
  .meta({ id: "Property", description: "A validated fictional property listing." });

export const ListingDatasetSchema = z
  .strictObject({
    synthetic: z.literal(true),
    generation_note: z.string().trim().min(20).max(240),
    properties: z.array(PropertySchema).min(1).max(100),
    sponsors: z.array(SponsorSchema).min(1).max(100),
  })
  .superRefine((dataset, context) => {
    const propertyIds = new Set<string>();
    const sponsorIds = new Set<string>();

    dataset.sponsors.forEach((sponsor, sponsorIndex) => {
      if (sponsorIds.has(sponsor.sponsor_id)) {
        context.addIssue({
          code: "custom",
          path: ["sponsors", sponsorIndex, "sponsor_id"],
          message: "Sponsor IDs must be unique.",
        });
      }
      sponsorIds.add(sponsor.sponsor_id);
    });

    dataset.properties.forEach((property, propertyIndex) => {
      if (propertyIds.has(property.property_id)) {
        context.addIssue({
          code: "custom",
          path: ["properties", propertyIndex, "property_id"],
          message: "Property IDs must be unique.",
        });
      }
      propertyIds.add(property.property_id);

      const relationshipIds = new Set<string>();
      const displayOrders = new Set<number>();
      property.local_sponsors.forEach((relationship, relationshipIndex) => {
        const path = ["properties", propertyIndex, "local_sponsors", relationshipIndex];

        if (relationship.property_id !== property.property_id) {
          context.addIssue({
            code: "custom",
            path: [...path, "property_id"],
            message: "Relationship property_id must match its containing property.",
          });
        }

        if (!sponsorIds.has(relationship.sponsor_id)) {
          context.addIssue({
            code: "custom",
            path: [...path, "sponsor_id"],
            message: "Relationship must reference a known sponsor_id.",
          });
        }

        if (relationshipIds.has(relationship.sponsor_id)) {
          context.addIssue({
            code: "custom",
            path: [...path, "sponsor_id"],
            message: "A sponsor may appear only once per property.",
          });
        }
        relationshipIds.add(relationship.sponsor_id);

        if (displayOrders.has(relationship.display_order)) {
          context.addIssue({
            code: "custom",
            path: [...path, "display_order"],
            message: "Sponsor display_order values must be unique per property.",
          });
        }
        displayOrders.add(relationship.display_order);
      });

      const orderedPositions = [...displayOrders].sort((left, right) => left - right);
      orderedPositions.forEach((position, positionIndex) => {
        if (position !== positionIndex + 1) {
          context.addIssue({
            code: "custom",
            path: ["properties", propertyIndex, "local_sponsors"],
            message: "Sponsor display_order values must start at 1 and be sequential.",
          });
        }
      });
    });
  })
  .meta({
    id: "ListingDataset",
    description: "Synthetic property listings and normalized sponsor records.",
  });

export type Address = z.infer<typeof AddressSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type Sponsor = z.infer<typeof SponsorSchema>;
export type PropertySponsor = z.infer<typeof PropertySponsorSchema>;
export type ListingDataset = z.infer<typeof ListingDatasetSchema>;
