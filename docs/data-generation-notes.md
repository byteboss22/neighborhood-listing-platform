# Structured-output experiment notes

All examples in this experiment are fictional and synthetic. No client, student, or other personal data is included.

## Local contract rehearsal

`data/generated/listings.initial.invalid.json` is intentionally retained rather than silently corrected. Running:

```bash
npx tsx scripts/validate-listings.ts data/generated/listings.initial.invalid.json
```

produces these captured error categories:

```text
properties.0.property_id: missing required string
properties.0.address.zip_code: invalid five-digit ZIP
properties.0.price: value below zero
properties.0.local_sponsors: array contains fewer than one item
properties.0: unrecognized unknown_property key
sponsors: array contains fewer than one item
```

The original successful local rehearsal fixture remains at `data/generated/listings.raw.json`. It was used to test the contract before the AI Studio experiment and is not represented as model output.

Validating that rehearsal fixture directly reports:

```text
Validation passed: 5 properties, 3 sponsors, 6 property-sponsor relationships.
```

`docs/evidence/image.png` captures the regenerated AI Studio response before the final correction. It is retained as redacted before evidence and visibly includes rejected amenity synonyms such as `in_unit_laundry` and `central_ac`.

## AI Studio initial structured-output attempt

Gemini 3.8 Flash produced five fictional properties and three fictional sponsors. The response is preserved without edits at `data/generated/listings.ai-studio.initial.invalid.json`.

The response used a different contract than the committed schema. The local validator rejected it and reported:

- `id` instead of the required `property_id` and `sponsor_id` fields;
- missing structured `address`, price, bedrooms, bathrooms, square feet, amenities, description, voice summary, image alternative, and application paths;
- relationship IDs using unsupported kebab-case patterns;
- missing relationship `selection_reason` and `display_order`;
- unknown property fields such as `community`, `street_address`, and `detail_path`;
- sponsor categories outside the controlled vocabulary;
- missing sponsor business name and message fields under the required names.

No malformed values were silently renamed, filled in, or removed. This failed response is the evidence used to refine the regeneration prompt.

### Regenerated attempt

After the prompt named every required field, Gemini regenerated a substantially improved response, preserved unchanged at `data/generated/listings.ai-studio.regenerated.invalid.json`.

The second response corrected the entity keys, required property facts, structured addresses, sponsor vocabulary, and PropertySponsor metadata. Validation then failed only because it invented amenity values outside the controlled enumeration:

- `in_unit_laundry`
- `central_ac`
- `parking_garage`
- `private_yard`
- `wheelchair_accessible`

The schema remains authoritative because accepting near-synonyms would undermine the normalization decision. The next prompt iteration lists the seven exact allowed values rather than expanding the schema or silently translating generated values.

### Final corrected attempt

The final AI Studio response is preserved unchanged at `data/generated/listings.ai-studio.final.json`. The corrective prompt constrained every amenity to one of these exact values:

```text
accessible_entry, balcony, laundry, parking, pet_friendly, public_transit, yard
```

No generated value was manually renamed or removed. The same file is now used by the CLI validator, contract tests, and application data boundary. Running `npm run validate:data` reports:

```text
Validation passed: 5 properties, 5 sponsors, 9 property-sponsor relationships.
```

This final iteration demonstrates that the prompt layer fixed model vocabulary while the unchanged schema continued to enforce the contract.

## Which layer fixes each problem

| Problem | Fixing layer | Reason |
|---|---|---|
| Missing primary keys | Prompt and schema | The prompt tells the model to emit IDs; the schema still rejects omissions. |
| Negative price | Schema | A numeric minimum is deterministic and must not depend on model instructions. |
| Malformed ZIP code | Schema | A required pattern provides repeatable enforcement. |
| Unknown property keys | Schema | Strict objects prevent unreviewed fields from entering the application. |
| Inconsistent amenity names | Prompt and enumeration | The prompt supplies the vocabulary; the enum rejects variants. |
| Unknown sponsor reference | Runtime cross-record validator | Referential integrity requires seeing both property relationships and normalized sponsors. |

## AI Studio evidence retained

- The exact generation workflow and corrective instruction are recorded in `docs/prompts/data-contract-ai-studio.md`.
- Both invalid JSON responses are retained rather than silently repaired.
- The final unchanged response is retained and consumed only after validation.
- `docs/evidence/image.png` is a redacted screenshot of the failed regenerated response; it contains no visible account name, email address, API key, or project identifier.
- The AI collaboration log records the accepted output, rejected output, verification result, and implementation commit.
