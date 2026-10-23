# Neighborhood Listing Platform

A CIS 3610 project by **Eric Juarez** to connect neighbors with local listings, neighborhood sponsors, and accessible help. **Vanessa Palomera** is the planned partner reviewer; her review is pending.

## Lab 1 scope

The initial app shell contains one main heading, a short project-purpose statement, and three informational feature cards: **Listings**, **Neighborhood Sponsors**, and **Voice Help**. The cards describe planned features. Voice functionality, a database, and login are not implemented.

## Technology stack

- Next.js 16.4.3 with App Router and React/React DOM 19.3.0.
- TypeScript 5.9.3 (declared `^5`) with strict checking.
- Tailwind CSS 4.3.3 (declared `^4`) through `@tailwindcss/turbopack`.
- ESLint 9.39.5 (declared `^9`) with `eslint-config-next` 16.4.3.
- npm with a committed lockfile; Git and GitHub for version control.
- Vercel is the planned hosting option; deployment is not recorded.

Installed versions and the observed macOS/Node/npm/Git environment are recorded in [setup notes](docs/setup-notes.md). The installed Next.js guide lists Node.js 20.9 as the minimum; verification used Node.js v24.19.0 and npm 11.17.0.

## Install and run locally

For a new checkout:

```bash
git clone https://github.com/byteboss22/neighborhood-listing-platform.git
cd neighborhood-listing-platform
git switch setup/app-shell
npm ci
npm run dev
```

For an existing checkout, run `npm ci` and `npm run dev` from the repository root. Open [http://localhost:3000](http://localhost:3000), or use the port printed by the development server. Stop it with Ctrl+C.

The homepage source is **`src/app/page.tsx`**. Save edits there to update the development page. `src/app/layout.tsx` supplies the root layout and uses `next/font/google` for Geist and Geist Mono; `src/app/globals.css` imports Tailwind. The project was bootstrapped with `create-next-app`; the exact historical creation command is not recorded.

## Verification

```bash
npm run lint
npm run build
npx --no-install tsc --noEmit
```

TypeScript is installed locally; no separate `typecheck` script exists. After a successful production build, `npm start` serves it locally. See [Lab 1 testing and actual results](docs/testing-lab1.md) for dated checks, tested commit, text logs, and pending browser checks. A fresh `npm ci` was not run in the documentation verification session.

## Deployment and documentation

Deployment URL: **Pending deployment**. No hosted/private-window verification is recorded. Vercel deployment is a future step; pushes should not be represented as successful deployments without observing their results.

- [Setup notes](docs/setup-notes.md)
- [Testing and verification evidence](docs/testing-lab1.md)
- [Screenshot checklist](docs/evidence/lab1/screenshot-checklist.md)
- [AI assistance log](docs/ai-log.md)
- [Preserved ChatGPT/Gemini comparison with Claude assistance](docs/ai-comparison-lab1.md)

Environment files, dependencies, and build output are ignored. Do not stage generated output or secrets; review actual staged filenames before committing.

## Learning references

The relevant starter README resources remain useful:

- [Next.js documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js source repository](https://github.com/vercel/next.js)
- [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel](https://vercel.com/new)
