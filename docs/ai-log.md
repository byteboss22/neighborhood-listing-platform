# AI Collaboration Log

AI output was treated as a draft. Suggestions were accepted only after source review, local testing, and comparison with the assignment requirements.

## Reusable Components Assignment

| Tool | Prompt | Output used | Output rejected or changed | Verification | Commit |
|---|---|---|---|---|---|
| Google AI Studio / Gemini | “Create TypeScript prop interfaces for a real-estate listing application. Return interfaces only for `Property` and `Sponsor`; include stable IDs, listing facts, image and alt text, URLs, business name, and sponsor message. Clearly distinguish required and optional fields.” | Used shared `Property` and `Sponsor` interfaces. All fields needed to render a complete card or banner were kept required. A `propertyType` union was later added for type-safe filtering. | Did not add component markup, packages, API models, secrets, or speculative optional fields. | Reviewed required versus optional fields against every component use; TypeScript and the production build pass. | `5f5c0de`, `b4ec305` |
| ChatGPT / Codex | “Review `PropertyCard`, `SponsorBanner`, `SearchFilters`, and their page composition for semantic HTML, WCAG-oriented keyboard access, responsive behavior, and TypeScript safety. Return: issue, why it matters, smallest change, and a manual test. Do not claim compliance from code alone.” | Kept `article`, `aside`, native labeled controls, logical `h1` → `h2` → `h3` order, facts lists, and descriptive link text. Added a stateful `PropertyListings` boundary so the form has observable behavior, narrowed `propertyType` to the shared union, and added a polite result-count announcement plus a visible empty-result message. | Rejected whole-card click handlers, redundant ARIA on native controls, and any claim that source review alone proves accessibility. | Inspected the control order recorded in the manual notes; lint and build pass; the no-result state can be produced with House + 4 bedrooms. | `b4ec305`, `77ca176` |
| Google AI Studio / Gemini | “Critique these components for accessible names, keyboard operation, focus visibility, heading order, image alternatives, responsive behavior, and form feedback. Give the smallest change and a manual test for each issue. Do not claim WCAG compliance from code alone.” | Used the recommendation to make focus indicators unmistakable on selects, the submit button, property links, and sponsor link. Retained native controls and specific visible link labels. | Rejected replacing native selects with custom ARIA widgets and rejected treating a Lighthouse score as proof of full compliance. | Initial keyboard testing found unclear focus. After the focus-style change, Chrome testing reached and operated every control and link; Lighthouse accessibility scored 100 with no automated accessibility issues. Safari behavior and browser settings are documented separately. | `6c929ff` |

### Before/after review evidence

- **Before:** keyboard focus existed but was not visually obvious, and the search submit handler only prevented navigation without changing the listings.
- **After:** every interactive element has a high-contrast `focus-visible` outline; the filters update the listing set; zero matches produce visible feedback; and result-count changes are announced through a polite live region.
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
