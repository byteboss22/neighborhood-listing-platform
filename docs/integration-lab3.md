# Lab 3 and midterm integration on the Lab 3 branch

Eric authorized preparing this integration after Grace's peer review and the
Lab 3 fixes. The integration merges fetched main **into lab3/data-contracts**;
it does not merge the feature branch into main or deploy production. PR #5 stays
draft for Grace to review the combined result.

## Preserved references

| Reference | Commit before integration |
| --- | --- |
| Lab 3 parent | d999d8a913cdc9da30615e24c7ac297fd0f24102 |
| Main parent | b167c473f406837531ab7d7b796e945dc4ff4099 |
| midterm-baseline | b167c473f406837531ab7d7b796e945dc4ff4099 |
| lab2-baseline | e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b |
| exam/services-booking-eval | 9a4d17e5b18f4d33970dff698fe49b75c12b8217 |

The pre-integration working tree was clean. No existing branch was reset,
rebased, deleted or force-pushed. Main, baseline and other lab refs are checked
again before publication. The original worktree remains on midterm-baseline.

## Conflict decisions

- Homepage: keep the Lab 3 generated-data import and fail-closed listingView
  mapping for five properties/sponsor view props; restore the complete midterm
  Local services & appointments section with ServiceExplorer. Both sections render
  together. No static data bypasses the property validator.
- Manifest: combine dependencies/scripts and retain patched Next.js and
  eslint-config-next 16.4.6. Keep the midterm's server-only/Supabase/PGlite/browser
  tooling and Node >=22.12 requirement. Keep the Lab 3 Zod/Ajv/export tooling.
- Tests: npm test runs every *.test.ts with the midterm's react-server condition.
  Explicit test:lab3 and test:midterm commands remain available. test:ui includes
  the six existing service tests plus a combined-page integration test.
  test:ui:production uses a separate local production server after npm run build.
- Lockfile: regenerate with npm install from the combined manifest, seeded by the
  reviewed Lab 3 lock. No hand-spliced conflict markers or forced audit repair.
- Journal: preserve the shared historical Lab 1/2 prefix once, then retain the
  entire midterm addition and entire Lab 3 addition in order. The source sections
  were verified byte-for-byte before adding the integration entry. No contribution
  or model use is reassigned to another person or lab.

Fifteen imported midterm API/client/schema/service component/migration/test files
were verified byte-for-byte against main. The migration was not edited or applied.
Existing .gitignore protections are retained. No ignored credentials were copied
from the other worktree or committed to this one.

## Verification and limits

[Integration evidence](evidence/lab3/integration/verification.json) records actual
commands and exit codes, with separate logs. npm test includes both contract/API
and PostgreSQL RLS suites. Browser traffic for services/bookings is intercepted
with fictional fixtures; no real Supabase writes, account changes, password resets
or migration operations occur. The new browser test checks five property cards,
city/rent filtering, details expansion, service/form visibility, closing the form,
and restoring the property list. Existing keyboard, responsive and service axe
checks remain in the browser suite.

The first browser run failed before tests could execute because the required
Chromium executable was missing. Its actual output is retained. Matching
Playwright Chromium/headless-shell binaries were installed before the rerun.
That rerun found an existing user dev server for this worktree on port 3000. It
was left running; the next run uses a temporary Playwright config with the same
tests/browser/workers, no managed server startup, and baseURL localhost:3000.
The existing dev config remains unchanged. This existing-server attempt rendered
loading states without the mocked service cards and failed; no definitive cause
was claimed for that running process. The final successful suite used the completed
production build on isolated port 3100. The tracked playwright.production.config.ts
and test:ui:production command reproduce it without stopping the user dev server.
All setup/failed-render attempts are retained.
Historical hosted tests remain historical; this local integration is not a new
live Supabase/production audit or a whole-site accessibility certification.

The final run passed 42 contract/API/RLS tests and all 7 production-browser tests,
plus schema consistency, generated-data validation, lint, TypeScript and build.
These results preserve rather than replace the earlier failed attempts.

The production dependency audit reports zero findings; the full dependency audit
retains seven moderate findings and exits nonzero. No clean full audit is claimed.

## Review and final merge

After all required integration checks pass, commit the resolved main-into-feature
merge and push only lab3/data-contracts. Verify PR #5 has no remaining conflicts.
Grace should review the new combined commit; her prior review is retained but
does not automatically approve the integration. Then mark ready and merge only
after the agreed review/final approval. Do not delete either baseline branch.
Any automatic Vercel preview is separate from a manual production deployment.
