# Midterm security audit

The executable matrix is [tests/security.test.ts](../tests/security.test.ts).
It applies the actual migration to a new in-memory PGlite PostgreSQL database,
then switches between non-owner `anon`, `authenticated` and `service_role`
roles. Fictional identities and an `auth.uid()` test stub stand in for Supabase
Auth. PostgreSQL itself evaluates grants, RLS, constraints and cascades; these
are not mocked SQL outcomes. Hosted Supabase, Auth JWT validation, PostgREST,
project default privileges and deployed environment remain separate manual checks.

## Executed authorization matrix

| Principal | Attempt | Expected and locally observed result |
| --- | --- | --- |
| Anonymous | Read approved service | PASS: one approved fixture visible |
| Anonymous | Read draft service | DENIED: zero rows |
| Anonymous | Read provider ID / profiles | DENIED: column/table permission error |
| Anonymous | Read active/inactive categories | PASS active; inactive hidden |
| Anonymous | Read approved/draft category mappings | PASS approved; draft hidden |
| Anonymous | Insert service | DENIED: permission error |
| Anonymous | Insert booking, then select bookings | INSERT PASS; SELECT zero rows |
| Provider A | Update own draft / suspended service | PASS: one affected row each |
| Provider A | Update/delete Provider B service | DENIED: zero affected rows |
| Provider A | Update/delete own approved or pending service | DENIED: zero affected rows |
| Provider A | Change draft status to approved | DENIED: RLS error |
| Provider A | Transfer provider_id | DENIED: column permission error |
| Provider A | Insert own draft / another provider's draft / approved service | PASS own draft; other two DENIED |
| Provider A | Delete own suspended service | PASS |
| Provider A | Read own / another provider's bookings | Own visible; other hidden |
| Merchant B | Insert own draft; read own bookings | PASS; same provider semantics |
| Client | Insert booking | PASS |
| Client | Select bookings, including others' submissions | DENIED: zero rows |
| Client | Insert service or insert/update role profile | DENIED: RLS or table permission error |
| Client | Delete bookings | DENIED: table permission error |
| Admin profile with user token | Read bookings / change roles | DENIED: no implicit elevation |
| Trusted admin service execution | Read/update all five tables and approve draft | PASS under service_role BYPASSRLS |
| Database | Invalid service values, email, short notes, duplicate mappings, absent foreign keys | Rejected by constraints |
| Database | Delete referenced provider | RESTRICT enforced |
| Database | Delete service/category; delete auth user without services | Required cascades enforced |

RLS is enabled on all five public tables. The migration removes default public,
anon and authenticated table grants before adding explicit permissions. There
are no self-service profile writes, no policies based on user-editable metadata,
and no SECURITY DEFINER functions. Profiles and category/mapping writes are
trusted administrative operations. Admin profile values alone never elevate a
request. The existing Lab 2 property fixtures remain local and unchanged.

## API and credential boundary

[API tests](../tests/api.test.ts) run the actual route exports through the real
Supabase SDK with a mocked HTTP boundary. They verify public columns/status
filter, strict 400 validation, 401 authentication, 403 role/ownership denials,
201 persisted drafts, no client-selected owner/status, safe 503 errors and
booking inserts without contact-data responses. A fictional admin canary asserts
that elevated credentials are never used in provider/public requests.

No real credentials are supplied or required for these tests. The service-role
key factory is server-only and unused by HTTP routes. There is no public admin
endpoint. Do not substitute the service-role key for `SUPABASE_ANON_KEY`.

Secret-scan results and exact validation scope appear in
[testing record](testing-midterm.md). A pattern scan is evidence of what was
checked, not proof that every possible credential format is absent. No statement
of absolute credential absence or hosted security approval is made.

## Hosted development verification continuation

The student applied the migration in a development project and provided an
administrative SQL result confirming the fictional booking. Independently
executed hosted Auth/PostgREST and localhost API checks now pass all 14 cases
in [the live session report](evidence/midterm/live-supabase-admin-session-audit.json).
They cover known approved/draft visibility, known booking privacy, protected
profile/column access, actual provider/client sessions, own/cross-provider/live
service updates, provider booking visibility, authenticated draft creation and
cleanup, client service denial, targeted role-escalation denial, authenticated
booking insertion and trusted service-role reads of all five tables/write access.

The [interactive report](evidence/midterm/live-supabase-audit.json) separately
records successful password logins for all three test accounts. Its single
remaining failure came from the old combined client test's unfiltered UPDATE:
the hosted safe-update guard returned 21000 rather than the expected 42501.
Targeting the actual authenticated profile produces the required 42501 denial;
the role is unchanged. The corrected follow-up was executed, not merely marked
passing. Application code and RLS were not loosened to accommodate the test.

The follow-up obtains ordinary user JWTs from admin-generated in-memory test
links; no email is sent or password changed. Elevated credentials are used only
for session provisioning and the explicit admin test. No credentials appear in
the report. Details: [live check instructions](live-supabase-checks.md).

Hosted PostgreSQL catalog confirmation of all five RLS flags and category/mapping
positive/negative fixtures still need separate evidence. These are covered in
embedded PostgreSQL but are not silently treated as completed hosted checks.

## Development Supabase verification procedure and remaining evidence

1. Use a new, non-production development Supabase project. Inspect existing
   `public.profiles`/other table names first; the migration intentionally fails
   on collisions rather than replacing existing objects.
2. Apply the exact migration through the Supabase migration workflow or SQL
   editor in a UTC session. Record the development project and actual result
   privately; do not commit project keys or JWTs.
3. Create fictional provider A, merchant B, client and admin test accounts via
   Supabase Auth. A trusted operator inserts their profiles; signup metadata
   cannot assign roles. Seed fictional services/categories/bookings only.
4. Repeat the matrix using anon and each real user JWT via PostgREST. Verify
   SELECT results and affected-row counts, not just HTTP success. For booking
   INSERT request minimal response, since clients have no SELECT access.
5. Verify admin operations through an independently authorized trusted context
   using the server-only service credential; test suspending services and
   account deactivation through Supabase administration. Never give the
   credential to the browser or a general provider route.
6. Record redacted real execution evidence. The local PGlite matrix does not
   satisfy the assignment's separate requirement to apply to a Supabase instance.
