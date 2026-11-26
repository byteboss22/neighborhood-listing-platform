# Lab 6 integration contract and development runbook

Local implementation November 25, 2026. Checkpoint 4e4bc1d preserves the reviewed
selector. Commit ac17c67 merges Lab 5 b07575c into this feature branch ONLY as a
prerequisite; that does not approve Lab 5, modify Grace's work or promote it to main.
Future Grace fixes must be merged deliberately. No branch was pushed by this task.

## Dedicated development setup

1. Use a clean dedicated development Supabase project. Never use the existing
   production project for classroom fixtures. Supabase supplies Auth/API roles;
   PGlite test stubs are isolated test fixtures, never a deployable migration.
2. Apply the three versioned migrations in order: midterm 20261029140000,
   Lab 5 20261123000000, then Lab 6 20261125000000. Review prerequisite policies
   and Grace's eventual feedback before hosted application. No live migration
   has been performed here.
3. Provision fictional owner/client/admin Auth accounts and protected profiles
   through trusted operator tooling. Use the Lab 5 SQL generator and inspect/apply
   only in that development project with existing owner/admin UUID parameters.
4. Generate `npm run seed:lab6:sql`, inspect the SQL and apply only to that seeded
   development project in trusted operator context. It refuses nonempty campaign
   or coordinate data, reuses the fictional Lab 5 sponsors/properties, and sets
   two active campaigns for both placements. No Auth/data credential is emitted.
5. Copy the blank .env.example to ignored .env.local and configure only that
   development project's URL/public key. No elevated key is required by any new
   route. No local credentials were copied or invented by this task.
6. Run the app and open /sponsor-demo. Expected outcomes with the generated seed:
   Maple Court Apartment -> Example Maintenance by ZIP; Cedar Window Studio ->
   Example Gardens by synthetic radius; Cedar Garden Townhouse -> house message.
   Expand details to verify the separate detail placement. Dates use the actual
   seed instant (start yesterday/end 30 days later), not a hardcoded expired demo.
7. Record real hosted query, disclosure, redirect and event results separately.
   The local evidence uses isolated SQL and mocked HTTP; it is not a hosted audit.

All positions are arbitrary fictional coordinates, not actual ZIP centroids.
No resident location, identity or sensitive housing trait is requested or stored.

## Persistence and eligible query

The additive migration adds optional trusted-operator property coordinates,
public.sponsor_campaigns, sponsor_impressions, a security-invoker public projection
and a parameterized lab6_candidates_for_property RPC. Existing Lab 5/midterm
columns/policies remain unchanged; two coordinate columns are added to properties.
Owners cannot alter campaign/coordinate data. Admin profile alone is not elevation.

Read requests always use the anonymous server client. Context comes from an
approved stored property; clock comes from the server. RLS and the SQL function
filter approved active parents/campaigns, placement, dates and ZIP/radius; the pure
selector validates/chooses again. Geography math, exact-point handling and bounded
radius allowance match the accepted selector policy. No numeric ZIP proximity.

The public view exposes only the enumerated candidate projection, not internal_notes
or owner metadata. The database query orders by priority then stable ID and
requests 501 rows to detect exceeding the 500-candidate contract; over-limit data
fails unavailable rather than silently choosing from a truncated candidate set.

Campaign timestamps are finite and must already align to milliseconds; database
CHECK rejects nonzero finer precision. API timestamp normalization accepts extra
trailing zeroes only (lossless formatting), never arbitrary sub-millisecond
truncation. Public Date.parse comparisons therefore follow the accepted contract.

## HTTP contract

- GET /api/sponsor-placement?property_id=...&placement=property-card|property-detail
  returns 200 minimal sponsor decision or house message. Requester ZIP/location/
  clock/identity fields and duplicate parameters are rejected with 400. Missing
  approved property -> 404; query/configuration/invalid stored data -> safe 503.
  All responses are no-store. Errors do not masquerade as ordinary no-match.
- GET /api/sponsor-click additionally requires sponsor_id. It re-queries current
  stored eligibility, requires the current winner, and redirects 303 only to its
  freshly validated stored fictional URL. Caller destination parameters rejected.
  Revoked/stale/nonwinning sponsor -> 404; database/invalid stored URL -> 503;
  no Location header in an error. Redirect uses no-referrer/no-store.
- POST /api/sponsor-impressions accepts exactly event_id UUID, sponsor_id,
  property_id and placement. It rechecks winner then calls a narrow insertion
  capability. Unknown fields, including IP/viewer data, -> 400; stale/invalid
  placement -> 409; accepted -> 202 {received:true}; database failure -> safe 503.

No ordinary action uses an elevated credential. Routes use SDK parameterization,
strict schemas and fixed projections; no interpolation of requester SQL or URLs.

## Minimal event storage and limits

The UI sends once when at least half the sponsored aside intersects the viewport.
Closed detail content is not mounted, so it generates neither lookup nor event.
Payloads contain public property/sponsor IDs, placement and a one-event random UUID.
The database stores only event UUID, sponsor ID, placement, coarse page_context
literal property, and server timestamp. Property ID is used for eligibility and
not persisted. No IP/caller/resident/session identity is read or stored by this
code; application code does not log raw request headers, payloads or credentials.

Direct table INSERT/SELECT/UPDATE/DELETE are denied to anon/authenticated. A pinned
search_path SECURITY DEFINER RPC grants only insert-if-currently-eligible behavior;
parameterized readonly eligibility recheck and fixed storage prevent arbitrary
payload writes. Repeated event UUID is a no-op. The HTTP route requires the winner;
the publicly callable RPC checks geographic/placement eligibility, not ranking.
These anonymous reports can be fabricated by clients and are not billing, unique-
visitor or trustworthy viewership metrics. No IP-based identity/rate counter added.

Retention/access policy is a classroom proposal: trusted operators inspect only
aggregate counts and remove stale events after 30 days in the development project.
No scheduled cleanup is claimed implemented. Operator can use a separately
reviewed DELETE bounded by created_at; no deletion or hosted inspection performed.
Hosting-provider request logs/settings require an independent operator review;
this application-storage test cannot certify external log retention.

## Performance and evidence

`npm run explain:lab6` creates an isolated PGlite instance, applies actual migrations,
loads fictional seeds and saves actual anonymous EXPLAIN ANALYZE JSON. The measured
plan is for five properties/three sponsors/two campaigns, not production performance.
Required primary keys/prerequisite indexes exist; no extra performance index was
added without evidence of need. Reassess with representative volume before scale.

Run npm test, npm run lint, npm run build, npm run test:ui:production,
npm run explain:lab6 and the retained pure demo. Browser/SDK tests mock external
HTTP; SQL tests use actual isolated PostgreSQL. Keep those evidence types separate.
No live/production connection or deployment result is invented.
