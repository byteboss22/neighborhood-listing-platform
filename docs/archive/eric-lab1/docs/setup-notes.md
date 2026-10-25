# CIS 3610 Lab 1 setup notes

Student and implementation author: **Eric Juarez**. Planned partner reviewer: **Vanessa Palomera**; review is not recorded as complete.

The Neighborhood Listing Platform aims to connect neighbors with local listings, neighborhood sponsors, and accessible help. Lab 1 is a static app shell: one main heading, a purpose paragraph, and three informational cards (Listings, Neighborhood Sponsors, Voice Help). Voice help is planned; there is no voice implementation, database, or login.

## Observed environment

Observed on **2026-10-23, America/Los_Angeles (PDT, UTC−07:00)** in the **Codex verification session on the local Mac**. These are current tool observations, not a reconstruction of the original installation environment. The execution environment is macOS rather than a separate Linux container; historical Mac versions at setup time are **not recorded**.

| Component | Observed version |
| --- | --- |
| OS | macOS 26.6.1, arm64 |
| Node.js | v24.19.0 |
| npm | 11.17.0 |
| Git | 2.55.0 |

Source: [environment and hygiene log](evidence/lab1/environment-and-hygiene.txt). No personal absolute paths or machine hostname are included in the saved logs.

## Project packages

Declared versions come from `package.json`; resolved versions below were observed with `npm ls --depth=0`. The repository includes `package-lock.json` for reproducible installation.

| Package | Declared | Installed |
| --- | --- | --- |
| next | 16.4.3 | 16.4.3 |
| react / react-dom | 19.3.0 each | 19.3.0 each |
| tailwindcss | ^4 | 4.3.3 |
| @tailwindcss/turbopack | ^4 | 4.3.3 |
| typescript | ^5 | 5.9.3 |
| eslint | ^9 | 9.39.5 |
| eslint-config-next | 16.4.3 | 16.4.3 |
| @types/node | ^20 | 20.19.43 |
| @types/react / @types/react-dom | ^19 each | 19.3.0 each |

The project uses Next.js App Router, React, TypeScript in strict mode, Tailwind CSS, ESLint, npm, and Git/GitHub. `next.config.ts` enables Cache Components and Partial Prefetching and configures the Tailwind Turbopack loader. `src/app/layout.tsx` uses Geist and Geist Mono through `next/font/google`. Hosting on Vercel is a planned workflow, not an observed deployment.

## Actual structure

```text
.gitignore                  # Dependencies, build output, environment files
AGENTS.md                   # Repository instructions
README.md
package.json
package-lock.json
eslint.config.mjs
next.config.ts
tsconfig.json
public/                     # Original starter SVG assets remain
src/app/
  page.tsx                  # Neighborhood app shell
  layout.tsx                # Root layout and font setup
  globals.css               # Tailwind import and global styles
  favicon.ico
docs/
  setup-notes.md
  testing-lab1.md
  ai-log.md
  ai-comparison-lab1.md      # Preserved student-supplied comparison
  evidence/lab1/            # Actual text logs and screenshot checklist
```

`node_modules/`, `.next/`, generated `next-env.d.ts`, and TypeScript build information are local/generated, not tracked source.

## Setup history and commands

- `d7f7cd4`: initial repository commit.
- `ac067268ae153026a22d2d6f4d1a277292ac303f`: initialized the Next.js app with TypeScript and Tailwind. The previous README identifies `create-next-app` as the generator. The exact invocation, prompt selections, original package-install output, and original installation date/tool versions beyond commit metadata are **not recorded**.
- `2daf216a9f405c848a4c2d2559c9413ff491845e`: implemented the neighborhood starter page.
- This documentation session began on `setup/app-shell`, tracking `origin/setup/app-shell`, at `2daf216`, with a clean working tree and no staged files.

Earlier conversation evidence records these repository configuration commands (not rerun in this documentation session):

```bash
git config --local user.name "byteboss22"
git config --local user.email "323376031+byteboss22@users.noreply.github.com"
gh auth switch --hostname github.com --user byteboss22
git remote add origin https://github.com/byteboss22/neighborhood-listing-platform
```

The identity settings are repository-local; `gh auth switch` changes the active GitHub CLI account for the host and is not repository-local. The remote URL was inspected in this session and matches the intended GitHub repository.

For a fresh checkout, use the following instructions; **clone and `npm ci` were not executed in this verification session** because the project and dependencies were already present:

```bash
git clone https://github.com/byteboss22/neighborhood-listing-platform.git
cd neighborhood-listing-platform
git switch setup/app-shell
npm ci
npm run dev
```

For this existing checkout, run `npm ci` when dependencies need a clean installation, then `npm run dev` from the repository root. Open `http://localhost:3000` (or the port printed by Next.js if 3000 is occupied). Stop the server with Ctrl+C. Edit `src/app/page.tsx`; Next.js updates the development page after changes. For production locally, run `npm run build`, then `npm start`.

## Setup issues supported by evidence

- **Git identity mismatch:** Earlier configuration inspection showed a globally inherited Atomic-Rose commit identity. The student supplied successful repository-local byteboss22 configuration output. The two implementation commits are authored under byteboss22. This was a configuration issue, not a build failure.
- **Missing branch tracking:** Earlier student terminal output showed `git pull` failing because local `main` had no upstream. At that time local `main` had no commits. Codex fetched `origin`, used `git reset --mixed origin/main` while preserving working files, and set `main` to track `origin/main`. The current working branch is now `setup/app-shell` with an upstream. No reset is needed or recommended in this session.
- **Starter README path:** The previous README named `app/page.tsx`; actual source is `src/app/page.tsx`. This documentation corrects the path and preserves the relevant startup, font, learning, and deployment references.
- No lint, build, or standalone TypeScript failure was observed in this session. Other historical setup failures are **not recorded**. No browser or deployment success is inferred from a successful build.

## Repository hygiene

The existing `.gitignore` covers `.env*`, `/node_modules`, `/.next/`, `/out/`, `/build`, coverage, `.vercel`, `*.tsbuildinfo`, and `next-env.d.ts`. Representative ignore checks succeeded, including a nested `.env.local`. Inspection of tracked filenames found none of these environment, dependency, or generated artifacts; staged filenames were empty. This was a filename/ignore-rule audit, not a comprehensive secret-content scan. No environment-file contents were read. See the [audit log](evidence/lab1/environment-and-hygiene.txt).

See [testing](testing-lab1.md) for actual verification outcomes and [AI log](ai-log.md) for attribution.
