# ADR 001: Validated listing data from a single contract

Status: implemented locally; additional-model responses and student hardening
decision, retrieval screenshot and student-reported UI review recorded; publication pending.
Branch: `lab3/data-contracts`, starting at the preserved Lab 2 commit `e57a87b`.
This is new Lab 3 work, not a retroactive claim that the midterm completed it.

## Context and minimum facts

Lab 3 requires strict Property, Sponsor and PropertySponsor concepts, JSON
Schema, a validator, synthetic data, intentionally invalid examples and UI
integration. Existing Lab 2 components use camelCase view props and original
SVG illustrations. Their attribution and component behavior should survive.

| Use | Minimum facts / source |
| --- | --- |
| Card | Property ID, title, street/city, monthly USD price, beds/baths, image purpose |
| Detail disclosure / future detail page | Address with state/country/ZIP, square feet and amenities; a separate detail route is not implemented in this lab |
| Sponsor selection | Sponsor ID, name, fictional HTTPS URL and property membership; eligibility/geographic ranking belongs to later labs |
| Future voice response | Title, city, price period/currency, beds/baths and area; no voice endpoint or unverified sponsor claim is invented |

## Decision

`src/schemas/listing.ts` is the source of truth. TypeScript types are inferred
from Zod; `npm run schema:export` emits Draft 2020-12 JSON Schema. Ajv checks the
export independently, and `schema:check` detects stale generated files. See
[Zod's official conversion reference](https://zod.dev/json-schema).

All object boundaries reject unknown fields. IDs are stable lowercase slugs,
not database row positions. ZIP is a string to preserve leading zeroes. Price
is nonnegative USD/month with cent precision; bedrooms are nonnegative integers,
bathrooms permit half units, and floor area is a positive integer in square feet.
US-only addressing, monthly rent, permitted property types and half-bath units
are explicit local product assumptions, not instructor-supplied business rules.
Two-letter state syntax does not prove an actual state/address exists; ZIP format
does not prove location or postal deliverability. Fictional cities can share
real-format ZIPs; no geographic accuracy is claimed.

Sponsor details live once in `sponsors`. Required `local_sponsors` contains IDs,
not copied business records. A PropertySponsor relationship is derived as
`{property_id, sponsor_id}` with a composite key; duplicate membership and missing
references are rejected. A future SQL migration can persist the same composite
relationship without storing two independently editable copies. No independently
maintained top-level relationship array is added to the JSON input.

Amenities are a controlled list for predictable filtering; repeated values are
rejected. Alternatives were free text (simple but inconsistent spellings) or a
database amenity join table (appropriate when persistent administration is needed).
The latter is deferred until a lab actually requires that storage design.

This exercise permits only three original local SVG paths and reserved example
HTTPS domains. These restrictions prevent generated tracking URLs or fabricated
business websites from reaching the demo. They are fictional-fixture rules, not
a complete production URL-validation policy. The last two listings visibly reuse
the original illustrative assets and are not represented as photographed homes.

Structural rules are exportable. Cross-record primary-key uniqueness,
foreign-key membership and set uniqueness run after structural validation in
`validateListingBundle`. JSON Schema alone is not claimed to encode these rules.
`listingView` accepts unknown input and produces no property/sponsor view props
if any record fails. The page displays a generic validation failure message.
Valid records map into the existing Lab 2 components; no duplicate runtime type
interfaces for the canonical fields are maintained.

## Alternatives and consequences

- Handwritten JSON Schema plus TS interfaces: rejected because separate edits
  would drift. The emitted schema is versioned and checked against the source.
- Silently strip unknown fields, fix a bad ZIP or coerce a negative price:
  rejected because malformed model output must remain observable evidence.
- Embed full sponsor objects inside every property: rejected because identity
  and updates would be duplicated across listings.
- Import raw generated text straight into JSX: rejected. Keep raw outputs,
  validate explicitly, retain failures and then select a validated dataset.

The source fixture remains assistant-authored synthetic test data. Eric later
supplied the actual JSON attributed to AI Studio as a separate first-attempt
artifact. It preserves all source facts and independently passes both validators
and integrity checks. The page now consumes this generated artifact through
listingView. No repair or regeneration was needed; no failure is fabricated.
See [generation notes](../data-generation-notes.md).

## Additional review follow-up

Eric subsequently supplied a Gemini static review, preserved with the
[assistant evaluation](../evidence/lab3/gemini/disposition.md). The response
corroborates the contract design but does not supply new test execution.
The local nonnegative rule permits zero rent and zero bathrooms; no subsidy,
habitability or availability claim follows from that. Properties may have no
sponsors, and the catalog may contain an unlinked sponsor. Those are explicit
local choices, not new stakeholder facts. Later sponsor geography/eligibility is
still unimplemented here.

The exported schema currently leaves primitive-array uniqueness to the full
validator, although standard JSON Schema can express it with uniqueItems. That
portability improvement is deferred by Eric's confirmed Lab 3 decision;
it must be implemented from the source/export pipeline and tested if adopted.
Unchanged prompt use is student-confirmed. Eric agreed to keep the current
nonnegative rules and defer optional hardening. Gemini's displayed model name
was not supplied; it is not inferred from another tool or assignment.
