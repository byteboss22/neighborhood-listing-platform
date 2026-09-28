# ADR 001: Listing data contracts

- **Status:** Accepted
- **Date:** September 28, 2026

## Context

Property listings arrive from outside the interface and may be incomplete, malformed, or internally inconsistent. TypeScript checks developer-authored code at compile time, but it does not validate JSON at runtime. The application therefore needs an explicit boundary before data reaches React components or a future database.

### Minimum facts by consumer

| Consumer | Minimum facts |
|---|---|
| Property card | Property ID, type, title, formatted address, price, bedrooms, bathrooms, square feet, image URL, image alternative, and detail URL |
| Detail page | Card facts plus description, amenities, full address, and selected local sponsors |
| Sponsor selection | Sponsor ID, business name, category, message, HTTPS URL, relationship reason, and display order |
| Voice response | Property ID, title, address context, price, bedrooms, bathrooms, and a concise `voice_summary` |

### Entities and relationships

- `Property` uses `property_id` as its primary key.
- `Sponsor` uses `sponsor_id` as its primary key.
- `PropertySponsor` represents the many-to-many relationship. Its logical composite key is `(property_id, sponsor_id)`.
- `Property.local_sponsors` contains relationship records, not duplicated sponsor business details. Each `sponsor_id` must reference the normalized top-level sponsor collection.

## Decision

Zod is the single source of truth in `src/contracts/listing.ts`. TypeScript types are inferred with `z.infer`, and `npm run schema:generate` exports JSON Schema Draft 2020-12 to `data/schema/listing-dataset.schema.json`.

All object schemas are strict, producing `additionalProperties: false` in JSON Schema. The contract also enforces:

- stable, prefixed string IDs;
- nonnegative numeric values and practical upper bounds;
- integer bedrooms and square feet;
- half-step bathroom values;
- five-digit ZIP codes and two-letter state codes;
- controlled property types, sponsor categories, and amenities;
- minimum and maximum string lengths;
- HTTPS sponsor URLs;
- one to three sponsor relationships per property;
- unique primary keys and valid cross-record sponsor references.

JSON Schema covers the structural rules. Zod `superRefine` covers referential integrity and uniqueness rules that plain JSON Schema cannot conveniently express.

Amenities use a controlled string enumeration. This keeps structured output predictable and makes filtering simple without introducing a database join table before amenities have their own metadata or lifecycle.

The UI imports raw JSON only through `src/data/properties.ts`, validates it once, and exports typed data only after success. On validation failure, the page renders a generic availability message and does not expose malformed values or validator internals.

## Alternatives considered

### Hand-maintained JSON Schema plus separate TypeScript interfaces

Rejected because the two definitions can drift. A contract test now compares the committed JSON Schema with the artifact produced from Zod.

### Free-text amenities

Rejected because spelling and naming variants such as “pet friendly,” “pets allowed,” and “pet-friendly” would harm filtering and normalization.

### Amenity join table

Deferred. A join table is appropriate if amenities later require labels, icons, translations, provenance, or database-level reporting. It is unnecessary for the current fixed vocabulary.

### Embedded sponsor details in every property

Rejected because repeated business data can disagree between listings. Normalized sponsors plus `PropertySponsor` relationships keep one sponsor record authoritative.

### Ajv with generated TypeScript types

Viable, but rejected for this milestone because Zod provides runtime validation and inferred TypeScript types from one source while still exporting the required JSON Schema.

## Consequences

### Positive

- Invalid external data fails before rendering.
- Runtime and compile-time contracts share one source.
- Error paths can be recorded and tested precisely.
- Sponsor relationships are explicit and normalized.
- Controlled amenities support consistent filters and voice responses.

### Tradeoffs

- Cross-record rules exist in Zod but cannot be fully represented in the exported JSON Schema.
- Adding a property type, category, or amenity requires a deliberate schema change.
- The application currently fails the entire dataset closed if any record is invalid; partial ingestion may need a quarantine workflow later.
