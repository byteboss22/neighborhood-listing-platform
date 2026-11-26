# AI Studio attempt 01 — context gap and local review

Received November 23, 2026. [Raw response](../evidence/lab5/ai-studio/ddl-proposal-attempt-01.txt)
is preserved unchanged with a SHA-256 provenance record. Model/exact-prompt
confirmation is pending. This review is Codex-assisted, not a student approval.

## Context gap

Studio explicitly reports running in lab3/data-contracts without design.md or
the actual midterm migration. It did not modify files, connect a database, apply
a migration or run tests. Do not treat its inferred schema as repository-verified.

## Observed SQL findings

Codex extracted its BEGIN..COMMIT proposal to a temporary file and applied the
actual existing midterm migration followed by that proposal in isolated in-memory
PGlite. Minimal Auth/role stubs and fictional records were used; no live Supabase
connection, credentials or production change occurred.

[Actual focused results](../evidence/lab5/ai-studio/local-review-results.json):

- Anonymous explicit-column property read: succeeded, one approved fixture.
- Anonymous explicit-column sponsor read: succeeded, one approved fixture.
- Anonymous junction read: failed 42501, permission denied for table properties.
- Anonymous inquiry INSERT for an approved property: failed with the same error.
- service_role SELECT privilege on the new properties table: false in the isolated
  bootstrap. The migration lacks explicit elevated table grants; hosted defaults
  must not be assumed when rebuilding a clean database.

The junction/inquiry policies query parent status columns that anon is not granted
permission to select. Parent-table RLS filtering itself did not prevent direct
approved reads. Revise cross-table checks/grants with a precise public-column
contract and rerun positive and negative cases; do not disable RLS to fix this.
These are focused proposal checks, not a completed Lab 5 test suite or live audit.

## Design differences to resolve

- Studio proposes UUID keys plus slugs instead of the proposed stable Lab 3 keys.
  A mapping is possible, but this is an unaccepted alternative, not a requirement.
- Studio uses draft/pending/rejected; design.md proposes draft/approved/suspended.
- Studio permits anonymous inquiry creation with no ordinary-user read; design.md
  proposes authenticated-client insertion and property-owner read of own inquiries.
  These choices were acknowledged as ambiguous; do not silently adopt either.
- Keep additive migration/reuse of protected profiles, owner-bound RLS, explicit
  column grants and the suggested privilege-escalation tests as useful proposals.
- Review SQL/runtime parity: fixed-scale numeric storage may round inputs before
  constraints, and the amenities subset check alone does not prohibit duplicates.
  These latter cases were not exercised by this focused run.

## Next Studio pass

Use a fresh chat or explicitly attach all three local files. Repository import
alone does not provide uncommitted Lab 5 documents. Ask Studio to confirm it can
read them before generating revised SQL. Keep this attempt even if the next one
fixes the gaps; do not replace the raw record or claim a missing test passed.
