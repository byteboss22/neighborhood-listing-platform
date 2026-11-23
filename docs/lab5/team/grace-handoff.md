# Grace's Lab 5 security review and test contribution

Status: prepared handoff, not Grace's work or acceptance. Lab 5 assigned pair is
Eric + Grace. Eric authorized implementation while reserving independent work
for Grace; no role rotation or review is claimed yet.

## What Eric/Codex has prepared

- Shared local branch: lab5/database from main 7a5dc1c.
- Additive migration: supabase/migrations/20261123000000_lab5_listing_persistence.sql.
- Seed generator, strict listing/inquiry contracts, scoped API routes and live UI.
- Baseline tests are tests/lab5-baseline.test.ts and tests/lab5-api.test.ts;
  they are Eric/Codex-assisted work, not attributed to you.
- Actual Studio/Gemini raw outputs and dispositions are in docs/evidence/lab5/
  and docs/lab5/. These are source evidence; do not rewrite them.

The starter is recorded in local Git history but remains UNPUBLISHED until Eric
pushes lab5/database. You cannot fetch it before then; remote main does not include
these files. Confirm the remote starter commit matches Eric’s handoff.
Do not build a duplicate migration in an old branch just because these are absent.

## Your owned files and meaningful decisions

Create your personal branch lab5/grace-security-review from the published
origin/lab5/database. Work in:

- tests/lab5-grace-security.test.ts: your independently designed executable cases.
- docs/lab5/team/grace-review.md: your findings, accepted/rejected advice,
  unresolved issues, actual checks and own commit/PR links.
- docs/evidence/lab5/grace/: your actual redacted results, including any live
  development Supabase evidence. No fake output or credentials.

Do not rewrite the migration, routes, source artifacts, Eric's baseline tests or
shared AI log unilaterally. Report implementation defects in your PR/review with
a reproducible test; coordinate any correction with Eric.

## Cases still reserved for your independent expansion

1. Other-owner INSERT spoofing and UPDATE/DELETE isolation for draft properties
   and sponsors; verify affected rows and unchanged original values.
2. Direct role/ownership/ID/timestamp escalation, including explicit created_at
   INSERT, malicious approval metadata and forged requester_id.
3. Sponsor approval/activation: owners cannot activate or modify approved rows;
   anonymous and authenticated public readers cannot see draft/inactive sponsors.
4. Join insert/delete: own unapproved property vs other/approved property; inactive
   sponsor; duplicate membership; owner helper cannot disclose other ownership.
5. Pending and suspended records: explicitly verify the chosen edit boundary;
   approved/suspended writes affect zero rows. Test DELETE and FK restrictions.
6. Inquiry access: anonymous denied; signed-in non-client denied; client cannot
   read submissions; owner sees only own property's inquiries; owner B denied.
7. Public field grants for anon AND authenticated; explicit owner/approval/timestamp
   SELECT denied; profile role escalation denied; trusted admin oversight works.
8. Compare all five midterm table columns/constraints/grants/policies before/after,
   not just policy expressions/table existence as the current baseline does.
9. Independently rebuild in a dedicated development Supabase project using real
   test Auth sessions. Verify denial results and record actual returned counts.
   Do not apply migrations/fixtures to production or use service role to impersonate
   an ordinary owner/client. Elevated setup is not proof that RLS authorized a user.

Use the existing PGlite bootstrap as a reference, but choose your cases and explain
what each proves. Do not merely copy tests and change their names. If you cannot
run hosted checks, label them pending rather than claiming the mocked/local run
is live evidence. No paid or production access is needed for isolated tests.

## Checks and commit

Read AGENTS.md first. Inspect status/branch; stop rather than overwriting another
person's changes. Run your targeted test, npm test, npm run lint and the relevant
route/browser checks if your work changes behavior. Record actual commands and
results. Stage only your three scoped paths, inspect staged diff, and commit with
your own Git identity and an accurate message. Open your PR into lab5/database,
not main. Record actual driver/navigator work if you pair; do not backdate it.

## Prompt for your assistant

```text
I am Grace, reviewing CIS 3610 Lab 5 with Eric. Read the assignment, AGENTS.md,
docs/lab5/README.md, this handoff, actual migration/routes and prior AI review
before changing files. Inspect status and branch. The starter must be published
on origin/lab5/database; if absent, stop and report rather than inventing it.
Create my personal lab5/grace-security-review branch only from that agreed base.

Help me independently design and implement the remaining security tests listed
in docs/lab5/team/grace-handoff.md. Own only tests/lab5-grace-security.test.ts,
docs/lab5/team/grace-review.md and docs/evidence/lab5/grace/. Leave Eric's migration,
routes, baseline tests, raw model evidence and shared AI log alone; propose fixes
with failing tests/review comments. Explain results for my own review and decisions.
Use fictional fixtures; never print credentials or copy .env into Git. No live
migration, production changes, messages, deployment, merge, commit or push until
I explicitly authorize those actions. Run actual checks and retain failures.
Do not claim I reviewed/approved anything until I actually do. End with the diff,
real results, remaining manual work and a scoped commit/PR draft.
```
