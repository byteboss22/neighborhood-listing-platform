# Hosted development Supabase verification

The development Supabase project is now configured locally through ignored
`.env.local`. The student reported applying the prescribed migration, created
the four fictional Auth accounts and protected profiles, seeded three services,
and submitted a booking through the local UI. The student's administrative SQL
result confirmed that booking exists. Anonymous PostgREST queries independently
confirmed that the known booking and both known draft services are hidden.
The local services API independently returned the approved fictional service
with exactly the five required public columns.

Those public checks do not establish authenticated provider/client behavior.
Use the new local runner for that evidence:

```sh
# Keep npm run dev running in another terminal.
npm run test:live
```

The runner prompts, with terminal echo disabled, for the passwords of
`provider-a@example.test`, `provider-b@example.test`, and `client@example.test`.
Type each password and press Enter. Nothing appears while typing. Do not paste
passwords into chat or source files. Passwords and session tokens are held only
in process memory, and the newly created sessions are signed out afterward.

At the optional admin-key prompt, Enter skips trusted elevated execution and
explicitly records it as NOT_RUN. Alternatively, an authorized operator can
enter the development project's legacy service_role key or modern secret key
for the local admin checks. It is never written to evidence or used by the
public/provider routes. Do not use a production project or credential.

The runner checks the known fixtures seeded during this conversation. Provider
updates reuse the existing titles, and the temporary service created through
the real authenticated API is deleted after its response is checked. A
fictional authenticated booking is retained as test evidence. An unexpected
policy failure may require trusted administrative cleanup of test data.

Results are saved to `docs/evidence/midterm/live-supabase-audit.json`. Only test
names, PASS/FAIL/NOT_RUN outcomes, safe error codes, a timestamp and the current
commit are saved. A successful public-only run is separately recorded in
`docs/evidence/midterm/live-supabase-public.json`; that mode deliberately skips
authenticated and admin checks. A PASS does not stand in for NOT_RUN items.

This runner does not inspect PostgreSQL catalog metadata or prove inactive
category/mapping filtering without corresponding fixtures. The full migration,
category/mapping and constraint/cascade tests remain in the local PostgreSQL
suite. Additional hosted category fixtures and catalog confirmation are still
needed before calling all hosted database checks complete.

## Forgotten fictional provider passwords

The example.test addresses cannot receive email recovery links. Supabase's
supported administrative password update can preserve existing user IDs and
their profile/service relationships:

```sh
npm run auth:reset-providers
```

From the development project's Settings > API Keys, copy a secret key (or the
legacy service_role key). Enter only its value at the hidden terminal prompt,
then enter and confirm a new password of at least 12 characters for each of the
two providers. This local tool verifies both known user-ID/email pairs before
changing either password, confirms the fictional test emails, updates the
passwords using auth.admin.updateUserById, and verifies sign-in afterward.
It does not delete/recreate users, store credentials, or update application data.
The client password is unchanged. Never paste keys or passwords into chat.

The first interactive audit report contains failed provider logins and other
failed/not-run checks; it is not a passing security report. After resetting,
keep the local app running in one terminal and rerun npm run test:live in a
second terminal. The admin test also requires an actual elevated key, not the
publishable key. Review the newly generated outcomes before claiming completion.

## Verified follow-up results

The latest interactive password run passed real password sign-in for both
providers and the client. Its combined client test failed because an unfiltered
profile UPDATE was rejected by the hosted safe-update guard with SQLSTATE 21000,
before role permissions could produce the expected 42501. The application
already returned 403 for client service submission. An explicitly filtered
profile update returns 42501 and the profile remains client. The runner now
checks the two behaviors separately and targets the authenticated user's ID.
The older failed report is preserved rather than relabeled as a passing run.

For an authorized local operator who already has the development service key
configured, all checks can be rerun without knowing/resetting user passwords:

```sh
npm run test:live -- --admin-test-sessions
```

This mode generates an in-memory magic-link hash for each existing fictional
account and exchanges it for an ordinary user session. No email is sent and
passwords are unchanged. Provider/client app and database requests still use
their individual user JWTs, not elevated credentials. This is session-based
verification and does not replace the separately observed password-entry tests.
See [Supabase generateLink](https://supabase.com/docs/reference/javascript/auth-admin-generatelink).

The executed follow-up passed all 14 checks and is saved separately in
`docs/evidence/midterm/live-supabase-admin-session-audit.json`. The helper's
regression tests also require the authenticated-ID filter and reject unrelated
error codes or a changed role. Local tests now total 25 passing tests; lint,
TypeScript, whitespace and the bounded credential scan also passed.

References: [administrative user update](https://supabase.com/docs/reference/javascript/auth-admin-updateuserbyid)
and [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys).

## Additional hosted category evidence

`npm run test:live:categories` now adds/retains two fictional category fixtures
and mappings for the known approved/draft services. It refuses to overwrite a
conflicting category fixture. It verifies public and real provider/client
session reads, checks that unprivileged mutations return 42501, and verifies
trusted administrative access. All eight executed checks passed; the report is
`docs/evidence/midterm/live-supabase-categories.json`.

The remaining hosted metadata evidence requires a database administrative query:
open `supabase/tests/exam_rls_catalog.sql`, paste its contents into Supabase SQL
Editor, and run it. Expect five rows, both boolean columns true for every row,
and positive policy counts. Save the returned table or a screenshot with the
result visible; API keys and passwords do not belong in the screenshot.

The student supplied the expected five-row catalog result. It is now saved as
`docs/evidence/midterm/hosted-rls-catalog.json`, attributed to the student's SQL
Editor execution. All five tables exist, RLS is true on each, and policy counts
match the migration. A separate screenshot is not required to represent the
supplied table as evidence.
