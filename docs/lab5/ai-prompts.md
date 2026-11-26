# Lab 5 prompts — attempts 01 and 02 received; implementation pending

Use placeholders and fictional source data only. Save actual raw outputs, model
labels, prompts and dates. Record useful/rejected advice, verification and actual
commit links. Do not relabel prior midterm/Lab 3 reviews as new Lab 5 evidence.

## AI Studio — required DDL proposal

Attach design.md, the existing midterm migration and the Lab 3 listing schema.

```text
For CIS 3610 Lab 5, propose an additive PostgreSQL migration for properties,
sponsors, property_sponsors and inquiries, reusing the existing protected profiles
table. The existing midterm migration and its five tables must remain intact.
Treat design.md as a proposed design, identify ambiguities before recommending
changes, and distinguish assignment rules from proposed decisions.
Use fictional data only. Review keys, foreign keys, NULLs, checks, timestamps,
cascade behavior, column grants and default-deny RLS. Public readers may see only
approved listings and approved active sponsors. Authenticated owners may edit
only their own unapproved records and cannot approve or transfer ownership.
Service-role credentials are trusted server-only operations, never owner routes.
Return proposed SQL plus risks and executable positive/negative test suggestions.
Do not connect to any project, change files, apply a migration or claim tests ran.
```

## ChatGPT / Gemini — defensive review checkpoint

Use the actual proposed migration when available, plus the design and matrix.

```text
Review this PostgreSQL schema and RLS plan as a defensive database engineer.
Identify privilege escalation, ownership, validation, and cascade risks. Give
executable tests, but use placeholders for all credentials.

This is CIS 3610 Lab 5 layered onto an existing midterm/Lab 3 application.
Do not recreate profiles or alter the midterm service/booking behavior. Check
column grants as well as RLS, status/owner spoofing, approved-row edits, hidden
joins, private inquiries and safe server-only credential boundaries. Cite exact
SQL/policy locations. Separate confirmed defects from optional hardening.
Do not edit files, use credentials, apply migrations or invent test results.
```

AI Studio is explicitly named for the DDL proposal; preserve that actual run.
The checkpoint requests ChatGPT and Gemini critique: record the tools truly used,
and clarify any substitution rather than claiming a tool ran when it did not.

## Attempt 01 received — revise with complete context

The [actual first response and local review](ai-studio-review.md) are retained.
It lacked the design and midterm migration. Attach these files directly:

1. docs/lab5/design.md
2. supabase/migrations/20261029140000_exam_services_persistence.sql
3. src/schemas/listing.ts

Then send this follow-up along with the original response and local review:

```text
Your first response reported missing design.md and the midterm migration and an
old Lab 3 workspace. I am attaching the actual three source files now. First
confirm which attachments you can read. If any are unavailable, stop and name
them rather than proposing SQL from guesses.

Review your first proposal against these files. Preserve the original midterm
migration and profiles table. Identify differences in key format, lifecycle and
inquiry authorization; label alternatives instead of silently deciding them.

A focused isolated PostgreSQL check observed: direct anonymous approved property
and sponsor reads worked, but anonymous junction reads and inquiry INSERT failed
with 42501 permission denied for table properties. Cross-table policies refer to
parent status columns absent from the anonymous SELECT grants. Also no explicit
service_role grants were supplied for new tables; clean bootstrap lacks SELECT.
Explain and fix these while preserving least privilege/default-deny RLS. Provide
positive/negative SQL tests for the revised grants and policies. Check numeric
rounding and duplicate amenities against the runtime contract as well.

Return revised proposed SQL and a change/risk summary only. Do not modify files,
apply migrations, connect a database or claim tests ran. Mark unresolved product
decisions for review. Use fictional records and credential placeholders only.
```

## Attempt 02 received — independent Gemini review

Attach the three original source files, the raw second proposal at
`docs/evidence/lab5/ai-studio/ddl-proposal-attempt-02.txt`, and
`docs/lab5/ai-studio-review-02.md`. Use the defensive review prompt above. Ask for
independent checks of the SQL bootstrap error, authenticated private-column
access, timestamp behavior and positive/negative RLS cases. Findings remain
proposals until verified; no need to regenerate in Studio solely for these fixes.

## Gemini response received — November 23, 2026

[Actual review and verified dispositions](gemini-disposition.md) are retained.
Eric confirmed use of the prepared prompts unchanged and reported model label
“gemini hydrogen”; tool-specific display attribution remains unverified. Some
claimed defects are optional hardening and the supplied suite has a syntax error.
No further model generation is required merely to repair the verified findings.
