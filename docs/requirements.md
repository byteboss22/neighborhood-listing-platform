# Midterm Version B requirements and traceability

Implementation baseline: `e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b` from fetched
`origin/main`. Preservation branch: `lab2-baseline`. Work branch:
`exam/services-booking-eval`. Existing Lab 1/2 components, evidence and attribution
are retained. Labs 3–5 were read as references; they are not claimed as completed
separate assignments. The supplied Version B practical is the source of truth.

## Story 1 — Service provider / merchant (Medium)

As an authenticated local service provider, I want to submit service listing
drafts with hourly rates so that clients can book appointments once verified by
administrators.

- Given a verified Supabase user with a protected `profiles.role` of `merchant`
  or `provider`, when POST `/api/services` receives a valid four-field payload,
  then it persists a service with `provider_id = auth.uid()` and `status = 'draft'`
  and returns the persisted record with HTTP 201.
- Given missing/invalid authentication, when a valid payload is submitted, then
  the handler returns 401. Given a client, admin-only profile, or no profile, then
  the handler returns 403. Given invalid JSON, invalid values, or extra fields,
  then it returns 400 with structured field issues before any database write.
- Given Provider A, when A changes A's draft or suspended service, then RLS
  permits it. When A changes B's service, changes a pending/approved service,
  transfers ownership, or approves a draft, then the write is denied (an
  UPDATE/DELETE of invisible rows can succeed with zero affected rows).

Both `merchant` and `provider` mean service provider in this implementation.
Both remain valid stored roles exactly as specified; no new role is introduced.

Traceability: [migration](../supabase/migrations/20261029140000_exam_services_persistence.sql),
[services handlers](../src/app/api/services/route.ts),
[runtime contract](../src/schemas/service.ts),
[server clients](../src/lib/supabaseServer.ts).

## Story 2 — Neighborhood client / resident (Large)

As a neighborhood resident, I want to view approved services categorized by
neighborhood district and request an appointment booking without viewing
bookings or contact information submitted by other clients.

- Given an anonymous visitor, when GET `/api/services` is requested, then only
  approved services and `id`, `title`, `hourly_rate`, `duration_minutes`, and
  `coverage_radius_miles` are returned. The handler always uses an anonymous
  client so an authenticated provider cannot expand that public response.
- Given a public or authenticated visitor, when a valid booking referencing an
  existing service is inserted, then it is saved. The booking API returns 201
  and `{ "received": true }` without selecting or echoing contact information.
- Given an anonymous visitor or a client, when selecting bookings, then no
  bookings are visible, including that caller's own bookings. Providers can
  read only bookings for their own services.
- Given approved services, when viewing the service section at mobile, tablet,
  and desktop widths, then it renders 1/2/3 columns. Keyboard users can open,
  navigate, submit, and close the booking form with visible focus. Loading,
  empty, invalid-data and unavailable states are explicit.

**Not implemented: district categorization or active coverage-zone filtering.**
The supplied five-table schema has no district, zone, location, or zone-active
field. `coverage_radius_miles` is a numeric specification, not a coverage zone;
`service_categories.active_status` describes categories, not zones. Neither is
used to simulate the missing behavior. The user explicitly selected option 1:
retain the five-table model and document this gap.

Instructor questions: What entities/fields define a district and an active
coverage zone? What relationship links them to services? Should that requirement
be removed from Story 2 or supported by a separately authorized migration?
Until clarified, the original Story 2 acceptance criterion about active zones
is only partially satisfied and must not be marked complete.

Traceability: [migration](../supabase/migrations/20261029140000_exam_services_persistence.sql),
[public services GET](../src/app/api/services/route.ts),
[booking POST](../src/app/api/bookings/route.ts),
[booking contract](../src/schemas/booking.ts),
[ServiceCard](../src/components/ServiceCard.tsx),
[ServiceExplorer](../src/components/ServiceExplorer.tsx).

## Story 3 — Platform administrator (Medium)

As a platform administrator, I want unrestricted oversight to approve service
listings, deactivate bad actors, and audit all client bookings.

- Given an independently authorized administrator operating in a trusted server
  or Supabase administrative environment, when using elevated service execution,
  then all five exam tables can be read and written and a draft can be approved.
- Given a browser user whose profile says `admin`, when using only that user's
  token, then the user does not receive a service-role credential or bypass RLS.
- Given a bad actor, when an authorized operator suspends their services and
  disables their Auth account through Supabase administration, then that is an
  explicit administrative operation. No user-deactivation field or public admin
  endpoint is added. Disabling an Auth account and provisioning trusted profiles
  remain account-dependent manual actions, not completed remote operations.

Traceability: [migration](../supabase/migrations/20261029140000_exam_services_persistence.sql),
[server admin factory](../src/lib/supabaseServer.ts),
[services handlers that deliberately exclude elevation](../src/app/api/services/route.ts),
[booking handler](../src/app/api/bookings/route.ts).
No admin HTTP route was required in Part 5 and none is exposed.

## Interpretation and implementation boundaries

- `src/app/api/services/route.ts` follows the existing `src/` App Router layout;
  no second root `app/` is created.
- Service-role clients bypass RLS. Provider requests use the anon project key
  plus a verified user bearer token and protected profile lookup. The separate
  elevated factory loads `SUPABASE_SERVICE_ROLE_KEY` only in a `server-only`
  module and is not imported by any route or UI. Instructor clarification:
  confirm this secure interpretation of the simultaneous service-key and
  authenticated-provider-RLS requirements.
- The role ownership rule allows provider reads of their own services at any
  status; mutation is limited to draft/suspended. New provider services must be
  drafts. Both old and new rows are checked on update, preventing self-approval.
- As expressly required, booking INSERT is public for any existing service;
  no unstated approved-only booking policy is substituted. There is no client
  booking SELECT policy or booking-list endpoint. Inactive categories remain
  hidden, and mappings are visible for approved services exactly as specified.
- Rates also respect NUMERIC(10,2) precision and integer inputs respect PostgreSQL
  INTEGER range, preventing runtime/database rounding or overflow drift.
- The specified `timezone('utc'::text, now())` defaults are preserved. Use a UTC
  development database session/server setting when applying and exercising them.
- The assignment says “Sunday, November 7, 2026”; November 7, 2026 is Saturday.
  Ask the instructor whether the date or weekday controls. “Today” in the
  in-class cutoff cannot be resolved from an undated pasted specification.
- Instructor invitation, push/PR, hosted deployment, emails and Canvas submission
  remain manual per user instructions, even where the assignment requests them.
- Validation and pending evidence: [security audit](security-audit.md),
  [testing record](testing-midterm.md), [AI log](ai-log.md).
