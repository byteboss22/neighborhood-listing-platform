import { describe, expect, it } from "vitest";
import generatedJsonSchema from "../../data/schema/listing-dataset.schema.json";
import seedData from "../../data/generated/listings.ai-studio.final.json";
import { z } from "zod";
import { ListingDatasetSchema, PropertySchema } from "./listing";
import { validateListingDataset } from "./validation";

const validProperty = seedData.properties[0];

describe("property contract", () => {
  it("accepts a valid property record", () => {
    expect(PropertySchema.safeParse(validProperty).success).toBe(true);
  });

  it("rejects a missing property ID", () => {
    const invalid = { ...validProperty } as Record<string, unknown>;
    delete invalid.property_id;

    const result = PropertySchema.safeParse(invalid);

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "property_id")).toBe(true);
  });

  it("rejects a negative price", () => {
    const result = PropertySchema.safeParse({ ...validProperty, price: -1 });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "price")).toBe(true);
  });

  it("rejects a malformed ZIP code", () => {
    const result = PropertySchema.safeParse({
      ...validProperty,
      address: { ...validProperty.address, zip_code: "90A1" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "address.zip_code")).toBe(
      true,
    );
  });

  it("rejects an invalid city name", () => {
    const result = PropertySchema.safeParse({
      ...validProperty,
      address: { ...validProperty.address, city: "Brookhaven123" },
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "address.city")).toBe(true);
  });

  it("rejects an unknown property field", () => {
    const result = PropertySchema.safeParse({ ...validProperty, private_note: "not allowed" });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.code === "unrecognized_keys")).toBe(true);
  });
});

describe("listing dataset boundary", () => {
  it("accepts all five synthetic seed records", () => {
    const result = validateListingDataset(seedData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toHaveLength(5);
    }
  });

  it("rejects a relationship to an unknown sponsor", () => {
    const invalid = structuredClone(seedData);
    invalid.properties[0].local_sponsors[0].sponsor_id = "sponsor_missing";

    const result = validateListingDataset(invalid);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((error) => error.includes("known sponsor_id"))).toBe(true);
    }
  });

  it("rejects duplicate sponsor display positions", () => {
    const invalid = structuredClone(seedData);
    invalid.properties[3].local_sponsors[1].display_order = 1;

    const result = validateListingDataset(invalid);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((error) => error.includes("display_order values must be unique"))).toBe(
        true,
      );
    }
  });

  it("keeps the committed JSON Schema synchronized with Zod", () => {
    const generated = JSON.parse(
      JSON.stringify(
        z.toJSONSchema(ListingDatasetSchema, {
          target: "draft-2020-12",
          reused: "ref",
        }),
      ),
    );

    expect(generated).toEqual(generatedJsonSchema);
  });
});
