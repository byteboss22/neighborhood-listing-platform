# Google AI Studio prompt: fictional listing contracts

Use structured output with MIME type `application/json` and the committed schema from `data/schema/listing-dataset.schema.json`.

```text
Act as a data-contract reviewer for a fictional neighborhood property application.

First identify ambiguous business rules in the requirements, especially ID format, address shape, numeric bounds, sponsor relationships, amenity normalization, image alternatives, and voice-response length. Do not invent real people, real clients, credentials, contact details, or private data.

Then generate exactly five fictional property records and the normalized fictional sponsors they reference. Return application/json only and conform exactly to the supplied JSON Schema. Use only the controlled enum values in the schema. Every property must have at least one local_sponsors relationship. Every relationship property_id must match its containing property, and every relationship sponsor_id must exist in the top-level sponsors array. Keep all content clearly fictional.

After generating the valid dataset, separately describe one intentionally invalid example for each of these validator checks: missing property_id, negative price, malformed ZIP code, and unknown property field. Do not mix intentionally invalid examples into the five-record valid dataset.
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
