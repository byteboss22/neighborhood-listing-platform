# Lab 3 AI collaboration — prepared prompts, not executed evidence

ChatGPT/Codex has proposed and implemented the local contract, validated UI and
tests. Eric has supplied the AI Studio report and actual generation, plus the Gemini
static review, linked below. Eric confirmed unchanged use of the prepared Gemini
prompt; its model name is not supplied. Proposed text alone was not treated as
evidence of an executed request; actual later artifacts are retained separately.

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


## Gemini response subsequently supplied

Eric wrote "perfect here is gemini , AI studio is still working" and supplied
[the actual response](../evidence/lab3/gemini/review.txt). It is retained unchanged
with a hash and [assistant evaluation](../evidence/lab3/gemini/disposition.md).
Eric confirmed the prepared normalization/adversarial prompt was used unchanged.
The displayed model and Eric's Lab 3 finding decisions remain pending. The separate AI Studio generation is still pending;
this static critique is not substituted for it.


## AI Studio summary supplied — raw artifact pending

Eric pasted a report identifying `models/gemini-3.8-flash`, the prepared prompt,
a valid first generation (5 properties, 3 sponsors, 6 relationships), and claimed
successful local checks/UI integration. The attributed summary and independent
inspection limits are in [ai-studio-report.json](../evidence/lab3/ai-studio-report.json).
The actual JSON/review files were not present in this worktree or the published
branch at inspection. Do not relabel the original fixture as the raw generation.


## Generation/review evidence subsequently supplied

Eric supplied [the full generation/review report](../evidence/lab3/ai-studio-generation-and-review.md),
retained unchanged with its hash in the attributed report. It includes the exact
prepared prompts, model label and reported validator output, but does not include
any of the generated property/sponsor records. Those reported command results
remain attributed to AI Studio; independent validation still requires raw JSON.
The statement that zero rent denotes subsidized/community arrangements is not a
source fact. The CLI alone does not establish Ajv validation. No raw dataset has
been reconstructed or silently substituted.


## Actual JSON received and validated

Eric subsequently pasted the complete JSON, saved as
[data/generated/ai-studio-attempt-01.json](../../data/generated/ai-studio-attempt-01.json).
This resolves the earlier raw-artifact gap. [Independent verification](../evidence/lab3/generated-data-verification.json)
confirmed 5 properties, 3 sponsors, 6 relationships and unchanged fictional facts;
Ajv, Zod and integrity checks passed, and the page now consumes the artifact.
No repair/regeneration was required. Eric separately confirmed keeping the current
rules and deferring Gemini's optional hardening. The Studio screenshot/export
remains pending; prior absence reports describe the earlier inspection only.
