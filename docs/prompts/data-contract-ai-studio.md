# Google AI Studio prompt: fictional listing contracts

Use the following three runs. Keeping the rule review separate from schema-constrained generation prevents explanatory prose from violating the JSON Schema.

## Run 1: ambiguous business rules

```text
Act as a data-contract reviewer for a fictional neighborhood property application.

Identify ambiguous business rules in the requirements, especially ID format, address shape, numeric bounds, sponsor relationships, amenity normalization, image alternatives, and voice-response length. For each ambiguity, recommend one minimal rule and explain why. Do not generate listing records yet. Do not invent real people, real clients, credentials, contact details, or private data.
```

Save the response for the AI log. Review it before accepting any recommendation.

## Run 2: structured fictional dataset

Enable structured output with MIME type `application/json` and the committed schema from `data/schema/listing-dataset.schema.json`. Then use:

```text
Generate exactly five fictional property records and the normalized fictional sponsors they reference. Return application/json only and conform exactly to the supplied JSON Schema. Use only the controlled enum values in the schema. Every property must have at least one local_sponsors relationship. Every relationship property_id must match its containing property, and every relationship sponsor_id must exist in the top-level sponsors array. Keep all content clearly fictional.

Use the fictional source notes below. Do not include markdown fences, explanations, real people, real addresses, credentials, contact details, or private data in the JSON response.
```

Download or copy the response exactly as returned. Do not silently repair it before running the local validator.

### Corrective follow-up after validation

The first regeneration satisfied the record shape but failed the controlled amenity vocabulary. The final corrective instruction was:

```text
Regenerate the same fictional structured dataset without changing the schema. For every amenities array, use only these exact values: accessible_entry, balcony, laundry, parking, pet_friendly, public_transit, yard. Do not emit synonyms such as in_unit_laundry, central_ac, parking_garage, private_yard, or wheelchair_accessible. Return application/json only and preserve all other required fields, IDs, relationships, and synthetic-data notices. Do not include real or personal data.
```

The unchanged final response is stored at `data/generated/listings.ai-studio.final.json` and must pass the local validator before use.

## Run 3: intentionally invalid examples

Do not enable the valid dataset schema for this run, because the purpose is to produce invalid examples.

```text
Using fictional data only, provide one intentionally invalid JSON example for each validator check: missing property_id, negative price, malformed ZIP code, and unknown property field. Label the four examples and explain the expected rejection. Do not include real or personal data.
```

## Fictional source notes

- Community name: Brookhaven, California (fictional context for this assignment).
- Property styles may include apartment, condo, duplex, house, and loft.
- Sponsor categories must come from the schema.
- Use `example.com` HTTPS URLs only.
- Use local SVG paths under `/properties/` and matching fictional detail paths.

## Follow-up critique prompt for ChatGPT and Gemini

```text
Review this synthetic listing contract for normalization problems. Focus on Property, Sponsor, PropertySponsor, addresses, amenities, and voice summaries. For each issue return: issue, why it matters, smallest contract change, migration impact, and a test. Decide whether amenities should be free text, a controlled value list, or a join table. Do not claim correctness from schema inspection alone and do not introduce real or personal data.
```
