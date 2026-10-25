# Neighborhood Listing Platform

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
