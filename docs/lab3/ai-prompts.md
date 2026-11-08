# Lab 3 AI collaboration — prepared prompts, not executed evidence

ChatGPT/Codex has proposed and implemented the local contract, validated UI and
tests. Actual AI Studio generation and Gemini responses have not yet been
supplied. These proposed prompts are not evidence of having used either tool.

## AI Studio generation

Attach `schemas/listing-bundle.schema.json` as the response schema if the selected
model supports structured output. Set the response MIME type to application/json.
If the UI rejects schema features, retain the error/screenshot and use the full
schema in the prompt instead; local validation is still mandatory. Do not weaken
the canonical schema just to conceal a model/tool limitation.

Attach `data/fixtures/listings.synthetic.json` as **fictional source notes** and
the schema. The fixture is transparent Codex-authored input, not previous Studio
output. Ask the model to encode the facts, not invent property descriptions.

```text
Given these fictional listing requirements, propose a strict JSON Schema.
Identify ambiguous business rules before writing the schema. Then provide valid
and intentionally invalid examples and explain what a validator should reject.

For this generation run, use the attached canonical JSON Schema and fictional
source notes as constraints. Return only one JSON object matching the schema
(application/json), with synthetic=true, exactly five properties and the three
supplied sponsors. Preserve all source facts and identifiers. local_sponsors
contains existing sponsor IDs only; do not embed sponsor details or repeat IDs.
Do not invent real people, addresses, businesses, links, claims or availability.
Use the supplied local image paths and preserve that the art is fictional and
may be reused. Use only the enumerated amenities, US ZIP strings, monthly USD
prices and the supplied room/area values. No additional keys or Markdown fences.

When strict JSON-only output is enabled, do not insert prose about ambiguities
or invalid examples into the dataset. Provide those as a separate review turn.
If the source conflicts with the schema, report the conflict in a separate
review turn rather than silently altering the source or inventing facts.
```

Save the raw output and run:

```bash
npm run validate:data -- data/generated/ai-studio-attempt-01.json
```

If the actual response fails, preserve the validation errors and send a second
prompt quoting only those errors and the same fictional facts. Save the new raw
response separately. We will record which prompt/schema/model layer changed and
whether it corrected each error. A valid first attempt requires no fake failure.

## Gemini normalization and adversarial review

Attach `src/schemas/listing.ts`, `schemas/listing-bundle.schema.json`,
`src/lib/listingView.ts`, `docs/adr/001-data-contract.md`, the fictional dataset
and `tests/listing-contract.test.ts`.

```text
Review this CIS 3610 Lab 3 property/sponsor contract and normalization decision.
Do not claim to run tests, inspect deployments or approve the assignment.
Identify ambiguity before recommending new business rules. Check Property,
Sponsor and derived PropertySponsor identities, duplicate membership, dangling
references, amenities normalization, US ZIP strings, nonnegative monthly USD
prices, strict unknown-field rejection and safe UI handling of invalid input.
Distinguish JSON Schema structural checks from cross-record integrity checks.
Recommend valid and intentionally invalid boundary cases with expected reasons.
Explain what you accept or would change and why; cite the supplied files.
Use no real client data or secrets. Avoid stereotypes or housing targeting.
```

Keep actual responses, model labels, exact prompts, rejected proposals and
student decisions. Do not transfer midterm AI reviews into this lab as new use.
