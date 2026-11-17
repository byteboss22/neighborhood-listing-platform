Lab 3 AI Studio Generation and Adversarial Review Evidence
Environment: Google AI Studio
Model: models/gemini-3.8-flash
Execution Timestamp: 2026-11-07T22:21:54-08:00
Target Branch: lab3/data-contracts

1. Generation Run 01 (Structured Output)

Inputs and Constraints
Canonical Schema Attached: schemas/listing-bundle.schema.json (Draft 2020-12)

Fictional Source Notes: data/fixtures/listings.synthetic.json

Response Format: application/json (strict JSON, no markdown fences or extraneous keys)

Exact Prompt Sent
Text
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
Raw Output File
Saved verbatim to: data/generated/ai-studio-attempt-01.json

Validation Execution and Result
Bash
npm run validate:data -- data/generated/ai-studio-attempt-01.json
Observed Validator Output:

JSON
{
  "valid": true,
  "properties": 5,
  "sponsors": 3,
  "relationships": 6
}
Exit Code: 0
Outcome: Valid on Attempt 01. All 5 properties, 3 sponsors, and 6 derived relationships passed structural Zod/Ajv validation and cross-record integrity checks without errors. No secondary repair prompt was required.

2. Separate Review Turn: Ambiguities, Rules, and Boundary Rejection Analysis
Per prompt instructions, when strict JSON-only output is enabled, ambiguities, source conflicts, and invalid example analysis are captured in this dedicated review turn:

Ambiguities and Business Rules Evaluated
Address Locality & Country Limitation:

Rule: Country is constrained to "US", state to ^[A-Z]{2}$, and ZIP code to ^[0-9]{5}(?:-[0-9]{4})?$.

Ambiguity: Syntactic validity does not prove deliverable physical addresses or that Maplehaven or Cedarbrook Heights exist.

Resolution: All addresses and cities remain designated as fictional demonstration data.

Monetary Representation & Precision:

Rule: price must be nonnegative() and multipleOf(0.01) in USD per month.

Ambiguity: Does zero rent constitute a valid contract?

Resolution: Price 0 is allowed for subsidized/community arrangements; negative prices are strictly rejected.

Studio Bed/Bath Units:

Rule: bedrooms minimum is 0 (for studio units like cedar-window-studio), bathrooms allow half-units (multipleOf: 0.5).

Relational Representation:

Rule: Properties reference sponsors solely through string IDs in local_sponsors. Full sponsor records reside once in sponsors.

Integrity: Duplicate sponsor IDs within a property or dangling sponsor references not present in the bundle are rejected by validateListingBundle().

Boundary Cases and Expected Rejection Explanations
Case	Input Snippet	Validator / Layer	Expected Reason
Invalid ZIP code	"zip_code": "9000" or 90001	JSON Schema / Zod	Fails regex pattern ^[0-9]{5}(?:-[0-9]{4})?$ or type constraint (must be string).
Negative price	"price": -200	JSON Schema / Zod	Violates minimum: 0.
Missing primary ID	"property_id": "" or missing	JSON Schema / Zod	Violates minLength: 3 and required field declaration.
Unknown property field	"extra_notes": "test"	JSON Schema / Zod	Violates additionalProperties: false.
Dangling sponsor FK	"local_sponsors": ["unknown-id"]	validateListingBundle	Relational check flags referenced sponsor not in sponsors.
Duplicate primary keys	Duplicate property_id in array	validateListingBundle	Set uniqueness check flags duplicate primary key.
Duplicate amenities	["parking", "parking"]	validateListingBundle	Uniqueness check flags repeated amenity membership.
3. Gemini Normalization and Adversarial Review

Exact Review Prompt
Text
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
Review Disposition and Analysis
Contract Architecture (src/schemas/listing.ts & schemas/listing-bundle.schema.json):

Accepted: Strict separation between single-record structural validation (handled by Zod and exported Draft 2020-12 JSON Schema) and cross-record relational validation (handled in validateListingBundle). This is architecturally sound because standard JSON Schema Draft 2020-12 cannot validate foreign key references across sibling arrays without custom meta-schemas.

Accepted: Derivation of PropertySponsor { property_id, sponsor_id } pairs from local_sponsors. Maintaining sponsor master records in a separate top-level sponsors array eliminates data duplication and prevents contradictory business information.

Data Boundaries and Constraints:

Accepted: String representation for zip_code to prevent numeric truncation of leading zeros (e.g. "01234").

Accepted: Whitelist restrictions on image_path (local SVG assets only) and website_url (https://...example.(com|org|net) only) to avoid SSRF, insecure protocols, or arbitrary external image loading.

Accepted: Closed enumeration of amenities.

Fail-Closed Presentation Layer (src/lib/listingView.ts & src/app/page.tsx):

Accepted: listingView() returns { success: false, error: ... } when any validation fails, withholding all listing properties from reaching PropertyExplorer. This enforces strict fail-safe behavior against invalid or tampered external data.

Boundary Cases Recommended for Testing:

Studio units (bedrooms: 0): Valid, properly supported.

Half baths (bathrooms: 1.5, 2.5): Valid, properly supported.

Zero dollar rental (price: 0): Valid, properly supported.

Unrecognized amenity (e.g. luxury): Intentionally invalid, rejected.

Negative dimensions (square_feet: -1): Intentionally invalid, rejected.