# Lab 1 Setup Notes

## Project

- **Student / implementation author:** Vanessa Palomera
- **Planned partner reviewer:** Eric Juarez; review not yet recorded.
- **Purpose:** Introduce neighborhood property listings, neighborhood sponsors, and voice assistance in a simple informational platform.

## Codex verification environment

These are the versions observed in the Windows verification environment, not versions from a Mac:

- OS: Microsoft Windows 11 Home
- Node.js: `v24.21.0`
- npm: `11.19.0`
- Git: `2.55.0.windows.5`
- Next.js: `16.4.3`
- React / React DOM: `19.3.0`
- TypeScript: `5.9.3`
- Tailwind CSS: `4.3.3`
- ESLint: `9.39.5`

The package versions above were read from the project lockfile or version commands on 2026-10-23. Historical Mac setup details are **not recorded**.

## Project structure

```text
.
├── public/                 # Starter SVG assets
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx        # Neighborhood platform home page
├── docs/                   # Lab setup, AI, and verification records
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Setup and local startup

From the project directory, install the lockfile-defined dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Stop the server with **Ctrl+C**.

Available verification commands:

```bash
npm run lint
npm exec tsc -- --noEmit
npm run build
```

## Setup issues and evidence limits

- Historical installation steps or setup problems are **not recorded**.
- `npm ci` was not run as part of this verification; dependencies were already available for the recorded checks.
- No setup failure was observed during the lint, type-check, or production build commands recorded for Lab 1.
- This record describes the Codex verification environment only; it does not assert that the environment matches the student's Mac.
