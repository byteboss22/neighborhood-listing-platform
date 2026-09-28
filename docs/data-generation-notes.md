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

The successful synthetic dataset is stored unchanged as JSON at `data/generated/listings.raw.json`. `npm run validate:data` currently reports:

```text
Validation passed: 5 properties, 3 sponsors, 6 property-sponsor relationships.
```

## Which layer fixes each problem

| Problem | Fixing layer | Reason |
|---|---|---|
| Missing primary keys | Prompt and schema | The prompt tells the model to emit IDs; the schema still rejects omissions. |
| Negative price | Schema | A numeric minimum is deterministic and must not depend on model instructions. |
| Malformed ZIP code | Schema | A required pattern provides repeatable enforcement. |
| Unknown property keys | Schema | Strict objects prevent unreviewed fields from entering the application. |
| Inconsistent amenity names | Prompt and enumeration | The prompt supplies the vocabulary; the enum rejects variants. |
| Unknown sponsor reference | Runtime cross-record validator | Referential integrity requires seeing both property relationships and normalized sponsors. |

## Required AI Studio evidence

The repository prepares the exact prompt in `docs/prompts/data-contract-ai-studio.md`. Before the PR is opened:

1. Run that prompt in Google AI Studio with structured `application/json` output.
2. Use only the fictional notes included in the prompt.
3. Download or copy the raw JSON response without silently editing it.
4. Validate it locally and retain any failed response before regenerating.
5. Save a screenshot or export under `docs/evidence/` after removing account names, email addresses, API keys, project identifiers, and other personal data.
6. Update the AI log with the actual model name, useful output, rejected output, verification, and commit.

The current seed file is a local synthetic contract fixture. It must not be represented as an AI Studio export until the real structured-output run is completed.
