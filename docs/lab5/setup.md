# Lab 5 development setup — no live changes performed

Use a NEW dedicated development Supabase project, or a disposable local Supabase
instance. Do not apply classroom seed data or migrations to the existing production
project. Actual hosted verification remains pending owner access and review.

1. Copy .env.example to ignored .env.local in this Lab 5 worktree. Fill only the
   development project's URL and public project key for ordinary routes. The
   optional elevated key is for independently authorized operator scripts, never
   owner/client API actions. No local credentials have been copied by this work.
2. Apply migrations in order to the clean development database: the unchanged
   midterm migration first, then 20261123000000_lab5_listing_persistence.sql.
   Supabase supplies auth.users/auth.uid()/API roles; test bootstrap stubs are
   for PGlite ONLY and must not be deployed.
3. Provision fictional Auth accounts and protected profiles through trusted admin
   tooling: owner A, owner B, client (role client) and trusted admin (role admin).
   Do not let public callers create/change profile roles.
4. Generate fictional seed SQL, inspect it, then apply only to that development
   project in trusted operator context. Existing owner/admin profile UUIDs are
   parameters, not credentials. Example generation command (does not connect):

   npm run seed:lab5:sql -- --owner-id <owner-profile-uuid> --reviewer-id <admin-profile-uuid>

   The generator requires empty Lab 5 property/sponsor tables and verifies owner
   and admin profiles in the generated SQL. It creates no Auth users. Seeding
   generates five approved properties, three approved active sponsors, six joins
   from the existing synthetic Lab 3 fixture. It fails instead of overwriting data.
5. Run npm run dev. The sample fixture section is retained and labeled separately.
   The Approved property listings section calls GET /api/listings. A configuration
   or database error must show unavailable, not silently substitute sample data.
6. POST /api/listings with a real bearer Auth session and valid contract creates
   an own draft; POST /api/inquiries requires a protected client profile. Neither
   uses elevated credentials. There is no login/authoring UI in this lab slice;
   use a trusted local API client and avoid putting tokens in command history.
7. Run npm test, lint, build, schema:check, validate:data and test:ui:production.
   Hosted session/RLS evidence is a distinct pending task for the paired review.

## API contract

- GET /api/listings: 200 public property/sponsor/link projection, including empty
  arrays, or safe 503. Anonymous query, approved properties and approved active
  sponsors only; capped at 100 properties/100 sponsors/1,000 relationships. This
  classroom slice has no pagination. Missing data does not disable RLS.
- POST /api/listings: strict Lab 3-based fields without local_sponsors, owner_id,
  status or moderation metadata. Verified provisioned profile owns forced draft.
  Returns only property_id/status with 201; invalid 400, session 401, forbidden
  403, identifier conflict 409, unavailable 503. Linking sponsors is not part of
  this route. POST satisfies the assignment's POST-or-PATCH requirement.
- POST /api/inquiries: strict property_id/requester_name/requester_email/message;
  requester_id comes from verified Auth. Requires protected role client. No contact
  details are echoed; 201 {received:true}, safe 400/401/403/503. Client has no read
  policy. Property owners can read own inquiries through RLS; no public inquiry
  read endpoint, outbound forwarding or automated deletion is implemented.

## Security and retained limitations

Both anon and authenticated get only public property/sponsor column grants.
The boolean lab5_owns_property helper is security-definer, pinned to pg_catalog,
uses qualified public/auth references, takes no arbitrary user ID, returns only
current-user ownership, and is executable only by authenticated. It exists so
cross-table ownership predicates do not require broad private-column SELECT.
RLS remains enabled; owner actions use the public key plus verified user session.

States are draft/pending/approved/suspended. Owners edit/delete only draft/pending;
approval/activation/suspension is trusted operator work. Stable IDs are immutable.
This is a documented Lab 5 design choice, not a change to the midterm lifecycle.
No public metadata endpoint is added. Trustworthy approval history, requester
retention, spam rate limiting, full authoring/login UI and geographic matching
remain future work; do not collect real inquiries until retention/abuse controls
and applicable approval are settled.
