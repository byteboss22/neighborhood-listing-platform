# Lab 5 — local implementation and paired review

Status November 23, 2026: Eric/Codex-assisted local implementation, recorded in
local Git history; unpublished and not applied to a live project. Grace's work and hosted checks pending.
Branch lab5/database starts at main 7a5dc1c. Existing feature/database at Lab 2 and
all baseline branches stay unchanged; confirm literal branch-name grading if needed.

## Deliverables

| Deliverable | Actual files/status |
| --- | --- |
| Configuration hygiene | .env.example contains blank values; .env.local ignored; no new credentials copied |
| ER diagram | [ERD](erd.md) |
| Additive migration | supabase/migrations/20261123000000_lab5_listing_persistence.sql; existing profiles and midterm migration preserved |
| Fictional seed | scripts/seed-lab5.mjs generates SQL only; no live execution |
| Default-deny RLS | Four new tables enabled, narrow column grants, existing profile protection retained |
| Server-only client | Existing src/lib/supabaseServer.ts reused; owner/client routes use user session, never service role |
| Runtime/API contract | src/schemas/listingPersistence.ts; src/app/api/listings/route.ts; src/app/api/inquiries/route.ts |
| UI | src/components/LiveListings.tsx adds live loading/empty/error/retry; sample properties and midterm services retained |
| Baseline checks | tests/lab5-baseline.test.ts, tests/lab5-api.test.ts, tests/lab5-listings.spec.ts; see [actual local validation](../evidence/lab5/local-validation.json) |
| AI provenance | [Studio 01](ai-studio-review.md), [Studio 02](ai-studio-review-02.md), [Gemini dispositions](gemini-disposition.md); raw responses unchanged |
| Paired work | [Grace's reserved handoff](team/grace-handoff.md); no contribution or acceptance claimed for her |

[Setup and safe manual steps](setup.md), [original design and current decisions](design.md),
[planned security matrix](security-matrix.md), [prepared/actual AI workflow](ai-prompts.md).

## Still required

- Grace independently reviews and expands tests, makes genuine contribution and
  records actual driver/navigator or review participation.
- Owner applies migrations and fictional seed only to a dedicated development
  Supabase project and records real Auth/denial evidence; no production changes.
- Review bounded secret/history scan and full diff before publishing a starter/PR.
- Push only when authorized, then Grace can fetch the committed starter. No PR URL, new hosted
  demonstration, instructor approval or final completion is invented.
- Canvas: repository, relevant lab PR, applicable demo, test/AI-log evidence and
  each student's individual contribution. Supplemental Vanessa work does not
  silently replace her separately assigned pair; clarify that with the instructor.
