# Neighborhood Listing Platform

The local midterm services/booking slice is documented in
[midterm setup and handoff](docs/midterm-setup.md),
[requirements and unresolved instructor questions](docs/requirements.md),
[security audit](docs/security-audit.md), and
[actual validation results](docs/testing-midterm.md).
The Lab 1/2 history and attribution below remain preserved.

CIS 3610 project maintained by **Eric Juarez**, using the shared Lab 2
implementation developed with **Vanessa Palomera**.

## Current scope

The home page includes the project introduction, three fictional property
listings, city and optional maximum-rent filters, a fictional sponsor banner,
and expandable property details. The listing grid uses one, two or three columns
at small, medium and large widths. No backend, authentication or working voice
feature is implemented.

- **Eric:** shared TypeScript interfaces, fictional property data, original SVG
  illustrations, PropertyCard, initial integration and reviewer evidence.
- **Vanessa:** SearchFilters, SponsorBanner and final responsive integration.

## Install and run

Use Node.js 20.9 or later with npm. From the repository directory:

```bash
npm ci
npm run dev
```

Open the actual local URL printed by the server. Stop it with Ctrl+C.
The main page is `src/app/page.tsx`.

## Checks

```bash
npm run lint
npm run build
npm exec tsc -- --noEmit
```

The build generates Next.js route types used by TypeScript checking. Run
`npm run build` before standalone type checking in a fresh checkout.

## Evidence and provenance

- [Shared Lab 2 testing and reviewer evidence](docs/testing-lab2.md)
- [Original illustration sources](docs/image-sources.md)
- [Shared AI-use log](docs/ai-log.md)
- [Personal-repository integration record](docs/integration-lab2.md)
- [Eric's original Lab 1 README](docs/archive/eric-lab1/README.md)
- [Eric's original Lab 1 AI log](docs/archive/eric-lab1/docs/ai-log.md)

The shared implementation was imported from Vanessa's completed `main` at
`ab694d7`. Both repositories' Git histories are preserved by the integration
merge. Original personal Lab 1 documentation and evidence are archived unchanged
under `docs/archive/eric-lab1/`; shared files retain their original attribution
and dated test contexts. Historical test records are not new test results.

Deployment URL: **Pending deployment**. No new hosted-site test or deployment
is claimed by this repository integration.


## Lab 3 — strict data contracts (local work in progress)

See [Lab 3 checklist](docs/lab3/checklist.md), [ADR 001](docs/adr/001-data-contract.md)
and [actual validation evidence](docs/evidence/lab3/verification.json).
Run `npm run validate:data`, `npm test`, and `npm run schema:check`.
Codex-authored source fixtures remain separate from the student-supplied AI Studio
first generation now rendered through validation. See [generation notes](docs/data-generation-notes.md)
and [16-test follow-up evidence](docs/evidence/lab3/generated-data-verification.json).
Gemini review, the student's hardening decision and the actual Studio retrieval
screenshot are recorded. [Draft PR #5](https://github.com/byteboss22/neighborhood-listing-platform/pull/5)
is published and Grace's peer review is recorded. See [current peer follow-up](docs/evidence/lab3/peer-review/disposition.md)
for validation fixes, patched Next 16.4.6 and new execution evidence. The [combined integration](docs/integration-lab3.md) reconciles the main conflicts
on the Lab 3 branch and preserves the midterm services/booking subsystem. Final
combined review/merge and Canvas submission remain pending.


### Combined Lab 3 + midterm checks

The Lab 3 branch incorporates main's services/booking subsystem while retaining
validated generated property data. Run `npm test` for all contract/API/RLS tests,
or `npm run test:lab3` / `npm run test:midterm` separately. For the compiled
combined interface, run `npm run build` then `npm run test:ui:production`.
The latter starts an isolated local production server on port 3100; service and
booking requests in the tests use fictional intercepted responses. It does not
submit live bookings. See [integration evidence](docs/integration-lab3.md).
