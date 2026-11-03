# Midterm development setup and handoff

Install with `npm ci` using Node.js 22.12+ (Node 24 recommended). Next.js alone
supports 20.9+, but the added Supabase SDK requires 22+ and the accessibility
test adapter requires 22.12+. This implementation was exercised with Node
24.19.0. Existing Lab 2 behavior and
attribution are retained. New runtime dependencies are Zod, supabase-js and
server-only. Test dependencies are tsx, PGlite, Playwright and axe-core.

Create a local, ignored `.env.local` at the project root with your own development
project values for `SUPABASE_URL` and `SUPABASE_ANON_KEY`. Do not use a service
credential as the anon key. `SUPABASE_SERVICE_ROLE_KEY` is optional for public
and provider routes and is only needed for independently authorized trusted
administrative operations. Never prefix it with `NEXT_PUBLIC_`. No credentials
or environment files are provided with this change.

Apply [the migration](../supabase/migrations/20261029140000_exam_services_persistence.sql)
only to a clean development Supabase project after checking table collisions.
See [security audit](security-audit.md) for provisioning, test identities, and
the hosted verification steps that remain. Do not apply to production.

Run `npm run dev` and open the printed localhost URL. The existing property
section remains present. The new services section reads `/api/services`; without
database configuration it honestly reports temporary unavailability. No mock
listings are silently substituted. Only approved persisted services are displayed.

## API usage

- GET `/api/services`: anonymous query, HTTP 200 array of five public columns;
  HTTP 503 for unavailable configuration/database. No private caching.
- POST `/api/services`: supply `Authorization: Bearer <your development user
  access token>` and JSON containing exactly `title`, `hourly_rate`,
  `duration_minutes`, `coverage_radius_miles`. Example fictional payload:
  `{ "title": "Fictional HVAC inspection", "hourly_rate": 80,
  "duration_minutes": 60, "coverage_radius_miles": 10 }`.
  A trusted provisioner must have assigned the authenticated user a `merchant`
  or `provider` profile. Returns 201 with persisted draft; 400 invalid payload,
  401 absent/invalid session, 403 non-provider or RLS denial, 503 unavailable.
  This slice accepts a bearer session; it does not add a login/refresh UI.
- POST `/api/bookings`: public, strict `service_id`, `client_email`,
  `requested_date` (YYYY-MM-DD), `notes` (10+ characters). Returns 201 receipt,
  400 invalid payload/absent service, 503 unavailable. No booking GET route or
  contact information response. Requests do not reserve time slots or confirm
  availability; conflict detection was not specified in the provided schema.

## Reproducible checks

```sh
npm test
npm run lint
npm run build
npx --no-install tsc --noEmit
npx --no-install playwright install chromium
npm run test:ui
python3 scripts/scan-secrets.py
npm audit
npm audit --omit=dev
git diff --check
```

`npm test` uses the react-server export condition to permit Node test imports
of `server-only` route modules. Browser tests run against a local development
server and intercept only the services/booking HTTP boundary with fictional
fixtures; they do not claim hosted database integration. See actual results in
[testing-midterm.md](testing-midterm.md).

## Submission actions still manual

- Confirm the instructor's date: the spec says Sunday, November 7, 2026, but that
  date is Saturday. Confirm the in-class cutoff's intended date as well.
- Add/verify instructor `pdt605` as an explicit repository collaborator. The
  assignment states a missing collaborator causes an automatic zero. No
  active-access confirmation was performed at implementation time. Since then,
  the user authorized an invitation: `pdt605` has been invited with write access
  and acceptance remains pending.
- Complete real development Supabase application and role tests; configure
  hosting secrets only in server-side hosting settings and deploy when authorized.
- Supply genuine ChatGPT, Gemini and Google AI Studio prompt/output evidence
  required by the assignment; this session did not operate Gemini or AI Studio.
- Review the diff, independently verify it, make attributable commits, and
  replace pending provenance hashes with real commit IDs. Do not manufacture
  partner contributions or claim an absent partner was contacted.
- When authorized, push `exam/services-booking-eval`, open a PR into the current
  remote `main`, and submit the repository/PR/deployment links and genuine
  collaborator confirmation in Canvas. No local `main` update is needed to base
  the PR on the fetched integration commit.

PR preparation update: implementation commit `b1c51af` is already pushed on
`exam/services-booking-eval`; the user has authorized an open PR into remote
`main`. This does not authorize merging or deployment.
