# Midterm local validation record

Date: 2026-11-02 (America/Los_Angeles). Performer: Codex using local tools.
Student and instructor review are not implied. Worktree branch:
`exam/services-booking-eval`, based on
`e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b`. Initial evidence was captured before
implementation commit `b1c51afc5906bbc9c80141dceb7728d8692dab35`. During PR
preparation, all 20 API/contract/RLS tests passed again on that commit and the
credential-pattern scan found zero matches across 105 reachable historical
blobs. Source code has not changed since the initial browser/build checks.

## Observed results

| Command | Observed outcome | Evidence |
| --- | --- | --- |
| `npm test` | PASS, exit 0; 20 tests, 0 failures | [contract/API/RLS log](evidence/midterm/contract-api-rls-tests.txt) |
| `npm run lint` | PASS, exit 0 | [lint log](evidence/midterm/lint.txt) |
| `npm run build` | PASS, exit 0; homepage and both API routes generated | [build log](evidence/midterm/build.txt) |
| `npx --no-install tsc --noEmit` | PASS, exit 0, no diagnostics | [TypeScript log](evidence/midterm/typescript.txt) |
| `npm run test:ui` | PASS, exit 0; 6 Chromium tests | [browser log](evidence/midterm/browser-tests.txt) |
| `npm audit` | Exit 1; 16 moderate findings, 0 high/critical | [complete JSON](evidence/midterm/dependency-audit.json) |
| `npm audit --omit=dev` | PASS, exit 0; 0 vulnerabilities reported | [production audit](evidence/midterm/production-audit.txt) |
| `python3 scripts/scan-secrets.py` | PASS, exit 0; no matches for configured credential patterns | [bounded secret scan](evidence/midterm/secret-scan.txt) |
| `git diff --check` and added-file whitespace review | PASS, exit 0 | [repository review](evidence/midterm/repository-review.txt) |

The empty TypeScript evidence file is expected: success emitted no diagnostics.
Saved text logs normalize terminal line endings and trailing spaces; diagnostic
text and test outcomes are retained.
No fresh `npm ci` is claimed; dependencies were installed with npm install and
the package/lockfile were updated. Engine requirements are now explicit:
Node 22.12+ for the added tooling, tested on Node 24.19.0.

## What these tests establish

- The exact migration rebuilds in a new embedded PostgreSQL database (PGlite).
  The five table definitions, RLS flags, grants, positive/negative role matrix,
  check constraints, ownership immutability, prevention of self-approval and
  role escalation, and required cascade/restrict behavior were executed.
- API tests invoke the actual Next.js handler exports with the real Supabase
  SDK and a mocked network boundary. They inspect outgoing headers and queries
  and verify 400/401/403/201/503 responses and safe error bodies. They do not
  exercise a real Supabase Auth service or a hosted PostgREST deployment.
- Chromium tests run the actual local app with fictional intercepted service
  and booking responses. They verify 390/820/1280px layouts (1/2/3 columns), no
  horizontal overflow, strict handling of unexpected response fields, booking
  receipt, Tab/Shift+Tab/Enter/Space navigation and visible focus. axe reports
  no violations in the new service section, both collapsed and with a booking
  form open. This is not a declaration of whole-site WCAG compliance.
- Secret scanning inspects current non-ignored files, every reachable Git blob
  across refs, and compiled browser JS. Its patterns cover private keys, common
  GitHub/AWS/Supabase secret formats, JWT-like values and service-role public
  variables. It prints locations only. No real credentials were introduced;
  fictional test strings are identified as fictional. The scan cannot prove
  absence of every possible credential format or inspect unreachable history.

## Findings and iterations

The first browser invocation could not launch because installed Chromium was
older than the newly installed Playwright version. `npx --no-install playwright
install chromium` installed matching Chromium v1248. The next run found a
label-in-name mismatch in the first generated CTA draft (“Book Now” versus
“Book appointment for …”). The visible wording was corrected to “Book
appointment”. All six browser tests then passed. These earlier failures are
resolved, not represented as passing first attempts.

The dependency audit reports a minimatch glob-amplification denial-of-service
advisory ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249))
and its effects across the existing ESLint development dependency tree. No
production dependency findings were reported. The automated audit suggests
major-version replacements/downgrades; no unreviewed `npm audit fix --force`
or unrelated framework/toolchain replacement was performed. This development
dependency finding remains open for a compatible tooling update.

No source/config/asset changes were made to existing PropertyCard,
PropertyExplorer, SearchFilters, SponsorBanner, property fixtures, shared types,
layout or original artwork. The homepage adds the service section. Historical
Lab 1/2 evidence and attribution remain intact; the AI journal is append-only.

## Hosted verification and test-runner follow-up — 2026-11-04

After the student configured the development project and supplied real fictional
Auth accounts/fixtures, the hosted verification runner was added. All 14 checks
passed in [the generated live report](evidence/midterm/live-supabase-admin-session-audit.json).
Provider/client requests used real individual user JWTs. The report explicitly
identifies the admin-generated-session method; successful password logins are
separately present in the student's [interactive report](evidence/midterm/live-supabase-audit.json).
No test passwords, keys, tokens or contact details are recorded.

The interactive report's combined client check failed on an unfiltered profile
UPDATE that returned safe-update error 21000. The runner now scopes the update
to the authenticated ID, requires 42501, and confirms the role remains client;
service POST denial is a separate check. Hosted reproduction confirmed both
denials. No application authorization or database policy was weakened.

The current local suite passed 25 tests after adding password-input and
client-authorization regression coverage. Lint, standalone TypeScript, diff
whitespace and the bounded credential scan also passed. Initial 20-test/build/
browser logs above are retained as historical evidence; no new UI/build run is
claimed for these CLI/test/documentation-only additions.

## Still pending

- Hosted category/mapping fixture tests and administrative catalog evidence of
  all five RLS flags remain pending. The migration was applied by the student,
  and the executed hosted role/API follow-up is linked above. No production
  database operation was performed.
- Independently review the code and evidence. No human approval, partner
  contribution, student keyboard verification, or instructor acceptance is
  inferred from automated tests.
- Resolve district/active-zone schema questions and the contradictory deadline
  wording documented in [requirements](requirements.md).
- Complete genuine Gemini/AI Studio/other required provenance. Implementation
  commit is recorded above; historical Lab logs are not new midterm tool use.
- Instructor `pdt605` was invited with write access; acceptance remains pending.
  The implementation branch is pushed. PR creation is authorized and underway;
  hosting, any required partner email and Canvas submission remain pending.
  See [handoff](midterm-setup.md).
