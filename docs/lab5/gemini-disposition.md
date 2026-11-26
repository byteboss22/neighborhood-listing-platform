# Gemini defensive review — Codex disposition

Received November 23, 2026. [Raw response](../evidence/lab5/gemini/defensive-review-01.txt)
is unchanged. Eric confirmed using the prepared prompts unchanged and reported
“gemini hydrogen” as the model label; exact display/tool-specific attribution is
not verified. This disposition is assistant review, not Eric/Grace approval.

| Gemini finding | Disposition and evidence |
| --- | --- |
| created_at spoofing is a confirmed client defect | Reclassify as optional trusted-operator/future-grant hardening. The existing column INSERT grants omit created_at; an actual ordinary authenticated spoof attempt failed 42501. Decide whether operator backdating is allowed. Do not adopt its timezone-conversion fix: the prior non-UTC test showed an 8-hour shift. Use direct timestamptz now()/clock_timestamp(). |
| approved_by consistency | Audit design improvement, not a prescribed Lab 5 requirement. The schema permits approvals without a reviewer. If both fields must be set/cleared together, use explicit all-null versus all-present branches; Gemini's suggested equivalence alone permits a non-approved row with only one populated field. Test suspension semantics and reviewer-profile deletion. |
| Authenticated cross-tenant protected-column access | Confirmed by prior focused test. Must correct grants/owner-detail access, preserving direct-table least privilege as well as explicit API projections. |
| Missing junction UPDATE / inability to unlink after publication | Not a demonstrated defect. Immutable IDs and delete+insert membership suffice; limiting owner changes to unapproved properties follows the proposed approval rule. Published corrections need a reviewed workflow, not broad owner write privileges. |
| Trigger role-check bypass | Hypothetical privileged-function/custom-role scenario; no exposed security-definer function is shown here. Column grants and RLS independently enforce the current client boundary. Do not introduce its postgres/supabase_admin allowlist as a universal solution. Audit any future elevated callable path independently. |
| Inquiry submission/read policy | Explicit product choice. Codex recommends authenticated client submission, own-property owner reads, trusted admin oversight; no anonymous submission or third-party inquiry reads. Eric asked for the recommendation; this is not a claim he approved it. |
| Immutable slug IDs | Intentional stable identifier proposal, not a requirement to support renaming IDs. Titles/address can change within allowed lifecycle; do not grant ID mutation merely for presentation renaming. |
| CRLF handling / composite index / owner default / function EXECUTE revoke | Optional hardening or convenience. No SMTP forwarding exists. Index changes require query evidence. Owner identity must still be bound to verified Auth; a default is not authorization. Review helper function exposure in context, not as proof that direct RPC can execute trigger bodies. |

## Test script limitations

[Actual focused checks](../evidence/lab5/gemini/local-review-results.json) used
isolated PGlite and the explicitly COALESCE-only diagnostic variant from Studio
attempt 02; no live database or credentials.

- Ordinary authenticated INSERT including created_at: denied, 42501.
- Gemini's `WITH ... DO` structure: syntax error, 42601. A CTE must be attached
  to a suitable statement; assert affected rows inside a proper PL/pgSQL block.
- Its placeholders must be replaced with fictional fixtures, including a real
  fixture for approved_by's profile FK. Seed Auth identities in a trusted bootstrap
  context or via approved Auth tooling; service_role has no guaranteed Auth-table
  INSERT grant in a clean bootstrap.
- Two table-existence assertions do not establish all five midterm schemas,
  privileges and policies stayed unchanged. Compare actual catalogs/definitions
  and run regressions.

The complete Gemini suite has not been run and is not recorded as passing. Its
useful cases will become corrected tests, preserving failed results and source
attribution. No new migration/routes/UI were implemented in this review step.

## Implementation direction

No additional AI review round is needed before correcting verified SQL defects.
Use stable IDs, explicit protected-column boundaries, direct timestamptz values,
strict runtime inputs and additive migrations. Resolve inquiry access/lifecycle
choices explicitly, then implement and run the full role/API/UI/regression suite.
Preserve existing midterm behavior, its historical migration and lab branches.
