import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { listingBundleSchema, listingJsonSchema, validateListingBundle } from "../src/schemas/listing";
import { listingView } from "../src/lib/listingView";

const seed = JSON.parse(readFileSync(new URL("../data/fixtures/listings.synthetic.json", import.meta.url), "utf8"));
const ajv = new Ajv2020({ allErrors: true });
const structural = ajv.compile(listingJsonSchema());

test("five fictional records validate through both Zod and exported JSON Schema", () => {
  const result = validateListingBundle(seed);
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.properties.length, 5);
  assert.equal(result.data.sponsors.length, 3);
  assert.equal(result.relationships.length, 6);
  assert.equal(new Set(result.relationships.map((r) => `${r.property_id}:${r.sponsor_id}`)).size, 6);
  assert.equal(structural(seed), true);
});

for (const [file, path] of [
  ["missing-id", "properties.0.property_id"],
  ["negative-price", "properties.0.price"],
  ["bad-zip", "properties.0.zip_code"],
  ["unknown-property-field", "properties.0"],
]) {
  test(`${file} fails for the expected path in Zod and JSON Schema`, () => {
    const value = JSON.parse(readFileSync(new URL(`./fixtures/${file}.json`, import.meta.url), "utf8"));
    const result = validateListingBundle(value);
    assert.equal(result.success, false);
    if (result.success) return;
    assert.ok(result.issues.some((issue) => issue.path === path), JSON.stringify(result.issues));
    assert.equal(structural(value), false);
  });
}

test("unknown fields are rejected at root, address and sponsor boundaries", () => {
  for (const boundary of ["root", "address", "sponsor"]) {
    const value = structuredClone(seed);
    const object = boundary === "root" ? value : boundary === "address" ? value.properties[0].address : value.sponsors[0];
    object.extra = "Not in contract";
    assert.equal(listingBundleSchema.safeParse(value).success, false);
    assert.equal(structural(value), false);
  }
});

test("duplicate property and sponsor primary keys are denied", () => {
  for (const kind of ["properties", "sponsors"]) {
    const value = structuredClone(seed);
    value[kind].push(value[kind][0]);
    assert.equal(validateListingBundle(value).success, false);
  }
});

test("missing sponsor reference and repeated relationship are denied", () => {
  for (const ids of [["nonexistent-sponsor"], ["example-maintenance", "example-maintenance"]]) {
    const value = structuredClone(seed);
    value.properties[0].local_sponsors = ids;
    assert.equal(validateListingBundle(value).success, false);
  }
});

test("amenities use controlled values with no repeated membership", () => {
  for (const list of [["luxury"], ["garden", "garden"]]) {
    const value = structuredClone(seed);
    value.properties[0].amenities = list;
    assert.equal(validateListingBundle(value).success, false);
  }
});

test("zero rent and studio bedrooms are valid; negative dimensions are denied", () => {
  const free = structuredClone(seed);
  free.properties[0].price = 0;
  free.properties[0].bedrooms = 0;
  assert.equal(validateListingBundle(free).success, true);
  for (const key of ["bedrooms", "bathrooms", "square_feet"]) {
    const value = structuredClone(seed);
    value.properties[0][key] = -1;
    assert.equal(validateListingBundle(value).success, false);
  }
});

test("US ZIP values retain leading zeroes and support ZIP+4", () => {
  for (const zip of ["01234", "01234-5678"]) {
    const value = structuredClone(seed);
    value.properties[0].zip_code = zip;
    assert.equal(validateListingBundle(value).success, true);
  }
  for (const zip of [12345, "1234", "123456", "12345x6789"]) {
    const value = structuredClone(seed);
    value.properties[0].zip_code = zip;
    assert.equal(validateListingBundle(value).success, false);
  }
});

test("price precision, fractional bedrooms and unsupported units fail", () => {
  for (const patch of [{ price: 12.345 }, { bedrooms: 1.5 }, { currency: "EUR" }, { price_period: "week" }]) {
    const value = structuredClone(seed);
    Object.assign(value.properties[0], patch);
    assert.equal(validateListingBundle(value).success, false);
    assert.equal(structural(value), false);
  }
});

test("local image allowlist and fictional HTTPS destinations reject unsafe URLs", () => {
  const image = structuredClone(seed);
  image.properties[0].image_path = "https://unapproved.invalid/pixel";
  assert.equal(validateListingBundle(image).success, false);
  for (const url of ["javascript:alert(1)", "http://example.com", "https://example.com.evil.invalid", "https://example.com@evil.invalid"]) {
    const value = structuredClone(seed);
    value.sponsors[0].website_url = url;
    assert.equal(validateListingBundle(value).success, false);
  }
});

test("invalid source data fails closed before any property reaches the UI", () => {
  const value = structuredClone(seed);
  value.properties[0].price = -1;
  const result = listingView(value);
  assert.equal(result.success, false);
  assert.equal("properties" in result, false);
  const valid = listingView(seed);
  assert.equal(valid.success, true);
  if (!valid.success) return;
  assert.equal(valid.properties.length, 5);
  assert.equal(valid.properties[0].monthlyRentUsd, seed.properties[0].price);
  assert.equal(valid.sponsors[0].id, seed.sponsors[0].sponsor_id);
});

test("malformed containers and whitespace-only facts fail safely", () => {
  for (const value of [null, [], { synthetic: true }, { ...seed, synthetic: false }]) {
    assert.equal(validateListingBundle(value).success, false);
  }
  const value = structuredClone(seed);
  value.properties[0].title = "     ";
  assert.equal(validateListingBundle(value).success, false);
});
