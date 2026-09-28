# AI Collaboration Log

AI output was treated as a draft. Suggestions were accepted only after source review, local testing, and comparison with the assignment requirements.

## Data Contracts Assignment

| Tool | Prompt | Output used | Output rejected or changed | Verification | Commit |
|---|---|---|---|---|---|
| ChatGPT / Codex | “Given these fictional listing requirements, propose a strict JSON Schema. Identify ambiguous business rules before writing the schema. Then provide valid and intentionally invalid examples and explain what a validator should reject.” | Used separate Property, Sponsor, and PropertySponsor concepts; prefixed keys; strict objects; numeric bounds; controlled enums; ZIP and path patterns; normalized sponsors; and tests for required invalid cases. Chose Zod as the TypeScript/runtime source and generated JSON Schema Draft 2020-12. | Rejected separate hand-maintained TypeScript interfaces, free-text amenities, embedded duplicate sponsor details, silent correction of invalid data, and claims that TypeScript validates incoming JSON. | Five synthetic records pass the CLI validator. Eight tests cover a valid property, missing ID, negative price, bad ZIP, unknown field, unknown sponsor reference, five-record seed validation, and schema drift. | Data-contract implementation commits |
| Google AI Studio / Gemini | Use the structured-output and normalization prompts in `docs/prompts/data-contract-ai-studio.md` with fictional notes only. | **Pending real run:** record the actual model output and normalization critique here after export. | Do not accept real addresses, personal data, unknown keys, free-text amenity variants, broken sponsor references, or claims of validity without local validation. | Save a redacted screenshot/export under `docs/evidence/`, validate the raw response, and record the exact commit before opening the PR. | Pending |

### Normalization decision

Amenities are controlled string values for this milestone. Free text was rejected because equivalent concepts would fragment into spelling variants. A join table was deferred until amenities need their own display metadata, translations, provenance, or lifecycle. Sponsors remain normalized top-level records, with PropertySponsor holding relationship-specific reason and display order.

## Reusable Components Assignment

| Tool | Prompt | Output used | Output rejected or changed | Verification | Commit |
|---|---|---|---|---|---|
| Google AI Studio / Gemini | “Create TypeScript prop interfaces for a real-estate listing application. Return interfaces only for `Property` and `Sponsor`; include stable IDs, listing facts, image and alt text, URLs, business name, and sponsor message. Clearly distinguish required and optional fields.” | Used shared `Property` and `Sponsor` interfaces. All fields needed to render a complete card or banner were kept required. A `propertyType` union was later added for type-safe filtering. | Did not add component markup, packages, API models, secrets, or speculative optional fields. | Reviewed required versus optional fields against every component use; TypeScript and the production build pass. | `5f5c0de`, `b4ec305` |
| ChatGPT / Codex | “Review `PropertyCard`, `SponsorBanner`, `SearchFilters`, and their page composition for semantic HTML, WCAG-oriented keyboard access, responsive behavior, and TypeScript safety. Return: issue, why it matters, smallest change, and a manual test. Do not claim compliance from code alone.” | Kept `article`, `aside`, native labeled controls, logical `h1` → `h2` → `h3` order, facts lists, and descriptive link text. Added a stateful `PropertyListings` boundary so the form has observable behavior, narrowed `propertyType` to the shared union, and added a polite result-count announcement plus a visible empty-result message. | Rejected whole-card click handlers, redundant ARIA on native controls, and any claim that source review alone proves accessibility. | Inspected the control order recorded in the manual notes; lint and build pass; the no-result state can be produced with House + 4 bedrooms. | `b4ec305`, `77ca176` |
| Google AI Studio / Gemini | “Critique these components for accessible names, keyboard operation, focus visibility, heading order, image alternatives, responsive behavior, and form feedback. Give the smallest change and a manual test for each issue. Do not claim WCAG compliance from code alone.” | Used the recommendation to make focus indicators unmistakable on selects, the submit button, property links, and sponsor link. Retained native controls and specific visible link labels. | Rejected replacing native selects with custom ARIA widgets and rejected treating a Lighthouse score as proof of full compliance. | Initial keyboard testing found unclear focus. After the focus-style change, Chrome testing reached and operated every control and link; Lighthouse accessibility scored 100 with no automated accessibility issues. Safari behavior and browser settings are documented separately. | `6c929ff` |
| GitHub Copilot code review | Reviewed pull request #4 for correctness and accessibility risks. | Accepted both findings: filter criteria were added to the live-region message so same-count result changes update its text, and the one-bathroom fact now uses a singular label. | The review’s summary was not treated as completed responsive testing because it explicitly reported the visual breakpoint checks as pending. | Re-ran lint and the production build successfully after both fixes. A later collaborator review completed the checks at 375, 768, and 1280 px. | `2c088e3` |

### Before/after review evidence

- **Before:** keyboard focus existed but was not visually obvious, and the search submit handler only prevented navigation without changing the listings.
- **After:** every interactive element has a high-contrast `focus-visible` outline; the filters update the listing set; zero matches produce visible feedback; and result changes are announced with both the count and selected criteria through a polite live region.
- **Human verification:** [`docs/accessibility-testing.md`](accessibility-testing.md) separates manual observations from automated Lighthouse results and source-only checks.

## App Shell Assignment

| Tool | Prompt | Output used | Output rejected | Verification | Commit |
|---|---|---|---|---|---|
| ChatGPT | Explain the proposed Next.js, TypeScript, Tailwind CSS, ESLint, and App Router stack in plain language. | Explained the purpose of each tool and how the pieces work together. | No additional packages or architecture were needed for the app shell. | Compared the explanation with `package.json`, `src/app`, and the installed Next.js documentation. | Documentation commit |
| Gemini | Explain the proposed stack in plain language. | Used the minimal project structure and semantic HTML guidance. | Suggestions that could not be confirmed from the saved response were not used. | Confirmed the App Router, TypeScript, Tailwind CSS, ESLint, npm, and `src` directory in the repository. | `8136e89` |
| Google AI Studio / Gemini | Act as an “App Shell Architect.” Provide commands, a minimal file plan, accessibility requirements, and verification steps without secrets or a giant code dump. | Used the scaffold plan, semantic regions, responsive feature layout, metadata, and lint/build checklist. | Excluded authentication, databases, APIs, maps, credentials, and unnecessary packages. | Lint and build passed; `/` was generated as a static route and the local page returned HTTP 200. | `e8d7500` and final evidence commit |

### Comparison notes

1. ChatGPT focused on semantic structure, TypeScript boundaries, and the smallest code changes.
2. Gemini focused on interface shape, keyboard/focus risks, and a concrete manual verification checklist.
