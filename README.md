# Neighborhood Listing Platform

An accessible, responsive starter application for connecting residents with local property listings, neighborhood sponsors, and voice assistance.

## Assignment Evidence

- **Live deployment:** [neighborhood-listing-platform-nu.vercel.app](https://neighborhood-listing-platform-nu.vercel.app)
- **App-shell pull request:** [GitHub PR #1](https://github.com/byteboss22/neighborhood-listing-platform/pull/1)
- **Accessibility test notes:** [`docs/accessibility-testing.md`](docs/accessibility-testing.md)
- **AI collaboration record:** [`docs/ai-log.md`](docs/ai-log.md)
- **Development environment:** [`docs/setup-note.md`](docs/setup-note.md)
- **Detailed component audit:** [`Property-Card-Component-Architecture-Audit.md`](Property-Card-Component-Architecture-Audit.md)

## Component Architecture

```text
HomePage
├── Feature overview
├── PropertyListings (filter state and matching results)
│   ├── SearchFilters
│   │   ├── Property type
│   │   ├── Minimum bedrooms
│   │   ├── Maximum price
│   │   └── Submit button
│   ├── Result status
│   └── Responsive listing grid
│       └── PropertyCard × 3
└── SponsorBanner
```

The property grid uses one column by default, two columns at the Tailwind `md` breakpoint, and three columns at `lg`.

## Getting Started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
git status --short
```

The `.gitignore` excludes environment files, dependencies, and generated build output. The starter app requires no secrets or private data.
