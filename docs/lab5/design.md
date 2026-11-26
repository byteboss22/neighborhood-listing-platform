# Proposed Lab 5 schema and integration decisions

This is a design proposal for review, not an applied schema. The supplied Lab 5
specification requires properties, sponsors, property_sponsors, profiles and
inquiries, public approved listings/active sponsors, owner-only changes to
unapproved records and trusted server-side administrators.

## Existing implementation inspected

- The immutable midterm migration already creates public.profiles with Auth UUID
  IDs and roles admin/merchant/provider/client. It supplies services, bookings,
  service_categories and service_category_mappings with existing RLS policies.
- Lab 3 has a strict Zod source of truth and fictional bundle: five properties,
  three sponsors, six property/sponsor pairs. Homepage currently imports that
  static validated bundle. It does not persist property or sponsor drafts.
- src/lib/supabaseServer.ts creates fresh user-scoped clients with the public
  project key and optional bearer session. Its elevated helper is reserved for
  trusted operator operations. Do not use it for public or owner routes.

Do not replay CREATE TABLE profiles or edit the old migration to add Lab 5.
Use an additive numbered migration following the existing migration. Reuse the
existing profile identity, prohibit client role changes and keep all midterm
policies/privileges intact. In a clean development project apply migrations in
order; never apply classroom fixtures to production.

## Proposed entities and relations

| Entity | Proposed key / relationships | Publication and access |
| --- | --- | --- |
| profiles | Existing id -> auth.users.id | Existing protected self-read; no client role changes |
| properties | Stable property_id compatible with Lab 3; owner_id -> profiles.id | draft/approved/suspended; owner may edit own unapproved records, never self-approve |
| sponsors | Stable sponsor_id compatible with Lab 3; owner_id -> profiles.id | Separate approval status and active flag; public only approved AND active |
| property_sponsors | Composite property_id/sponsor_id, FKs to both | Public relation only if both referenced rows are publicly eligible |
| inquiries | UUID id; property_id -> properties; requester identity and minimal message | Private; proposed authenticated client INSERT for approved property; owner read only for own property |

The lab does not prescribe exact columns or inquiry roles: these are explicit
implementation proposals, not instructor quotations. Define and test inquiry
retention and deletion before collecting real messages. Use fictional fixtures.
Property-to-inquiry deletion should restrict or require an explicit cleanup policy
rather than silently losing correspondence. Junction rows may cascade on parent
deletion. Review owner/profile deletion deliberately; avoid unrelated changes to
the midterm's existing deletion behavior.

Retain Lab 3 scalar constraints (nonnegative monetary values, ZIP strings,
controlled amenities, strict unknown-field rejection). Database rows may normalize
address fields; map them explicitly into the validated public view. Store only
approved fictional asset paths/URLs initially. Private owner IDs, inquiry text,
review/internal notes and Auth details must be excluded from public projections.

Property/sponsor ownership can be based on protected profile identity without
adding new role values to the exam profiles constraint. The lab specifies owners,
not new owner-role names. Require authenticated ownership, protected fields and
RLS; do not permit arbitrary approval/status fields in an owner payload. If new
roles are desired, resolve the exam compatibility implications separately.

## Proposed API and UI boundaries

- GET /api/listings: approved records only, explicit public fields, bounded result
  size, safe errors. Validate the assembled listing bundle before rendering.
- POST /api/listings: strict input, verified Auth user, owner assigned from session,
  draft forced by server/database. Proposed responses 201/400/401/403/503; verify
  the final contract in tests and docs. Do not accept owner_id/status from clients.
- PATCH /api/listings: owner-scoped validated edits to unapproved records only;
  test zero-row results and avoid exposing another owner's private existence.
- Approval remains a trusted operator task, independently authorized before any
  service-role credential is used. No public admin endpoint is required.
- Keep the services/booking slice unchanged. Loading/empty/error states for live
  listings must be visible; do not silently substitute static fixtures on failure
  and label the live connection healthy.

## Review gates

Review DDL constraints, foreign keys, NULL behavior, cents precision, cascade,
grants and RLS before implementation. New RLS tests must prove approved records
cannot be edited through owner credentials or promoted by payload/ownership
changes. Missing credentials and database errors must fail safely.

Lab 4 approval/expiry stories are planning input only and do not establish that
any behavior is implemented. Lab 6 geographic selection/telemetry and Lab 7 copy
approval/media optimization are separate future work.

## Implemented local decisions — November 23, 2026

The earlier sections above are the original proposal retained for provenance.
Eric authorized starting implementation after the signed-in inquiry recommendation.
The current local implementation uses stable slug IDs, four lifecycle states
(draft/pending/approved/suspended), provisioned-profile property ownership, and
signed-in protected client inquiry submission. Requester identity is stored from
Auth; only property owners and trusted operator access can read inquiries.
Owner edits/deletes are draft/pending only. POST is implemented (PATCH optional
under the assignment, not implemented). No instructor approval is inferred.
See setup.md for the exact contract and migration for actual grants/policies.
