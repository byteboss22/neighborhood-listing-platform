# AI Studio attempt 02 — tested proposal review

Received November 23, 2026. [Raw response](../evidence/lab5/ai-studio/ddl-proposal-attempt-02.txt)
and hash metadata are retained unchanged. Studio reports reading all three
attachments. Model label and exact-prompt confirmation remain unavailable.
This is a Codex-assisted review, not a student/team acceptance decision.

## Exact SQL result

The exact proposed migration fails in isolated in-memory PGlite with error 42883:
`function pg_catalog.coalesce(integer, integer) does not exist`.
The amenities CHECK uses `pg_catalog.coalesce(...)`; use SQL `COALESCE(...)`.
No migration was installed in supabase/migrations or applied to a live database.

## Explicit diagnostic variant

To inspect later behavior, Codex used a fresh in-memory database with minimal
Auth/role stubs, the unchanged existing midterm migration, and the second proposal
with ONLY `pg_catalog.coalesce(` replaced by `COALESCE(`. The raw response stays
unchanged. This diagnostic variant loaded successfully. Subsequent observations
are for this variant, not a claim that the exact Studio migration passed.

[Saved actual probe results](../evidence/lab5/ai-studio/local-review-results-02.json):

| Focused check | Observed result |
| --- | --- |
| Anonymous junction read | One approved/active link; draft property's link hidden |
| Anonymous inquiry insert to approved property | One row inserted |
| Anonymous inquiry insert to draft property | RLS denial, 42501 |
| Elevated SELECT after explicit grants | Succeeded |
| Owner A inquiry read | Own property's one inquiry visible |
| Other owner B inquiry read | Zero rows |
| Fractional cent 12.345 | Rejected, 23514 |
| Non-half bath 1.54 | Rejected, 23514 |
| Duplicate amenities | Rejected, 23514 |
| Non-owner authenticated SELECT of approved property's owner_id | Succeeded: privacy boundary is too broad for our proposed design |
| updated_at after update in America/Los_Angeles session | Approximately +28,800 seconds from the actual instant |

## Required corrections before implementation

1. Fix the invalid schema-qualified COALESCE expression.
2. Store timestamptz defaults/updates using `now()` / `clock_timestamp()` directly.
   The proposal converts to a UTC wall-clock timestamp and then implicitly casts
   it back using the session time zone, shifting the instant. Correct only the new
   Lab 5 code; do not rewrite the existing historical midterm migration.
3. Restrict protected column reads for ordinary authenticated non-owners. The
   broad `GRANT SELECT ON ... TO authenticated` plus public approved-row policy
   exposes owner/approval fields on others' public rows. A narrow public column
   grant/projection and independently owner-authorized detail path should be
   designed and tested; a safe API projection alone does not revoke direct-table
   access through the public Supabase API.

## Useful changes retained as proposals

Explicit elevated grants and anonymous status-column grants repair the first
attempt's tested privilege errors. Stable slug IDs match Lab 3. The unconstrained
NUMERIC checks reject the tested fractional values instead of rounding them;
uniqueness trigger rejects tested duplicate amenities. Preserve these test cases.

## Product decisions still explicit, not silently accepted

The second proposal still permits anonymous inquiries while design.md proposes
an authenticated client. It also adds pending lifecycle and restricts suspended
edits; the assignment does not prescribe those exact states. Resolve these before
shipping. The focused anonymous insertion test verifies the proposal's behavior,
not approval to adopt that behavior. Owner inquiry access is now present.

No complete RLS matrix, hosted Supabase audit, route/UI suite, clean production
rebuild or teammate review is claimed. Source requirements remain authoritative;
AI Studio's characterization of suspended records as conflicting with the lab's
unapproved-edit rule is interpretation, not an instructor ruling.

## Next review

Provide Gemini the actual design, midterm migration, runtime schema, revised raw
proposal and this review, with the defensive prompt in ai-prompts.md. Ask for an
independent critique without editing files or applying SQL. Codex can implement
reviewed corrections locally; another Studio generation loop is not required just
to fix these identified defects. Retain both attempts and actual model metadata.
