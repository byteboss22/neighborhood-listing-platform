# Lab 6 — contextual sponsor matching, local integration

Status November 25, 2026: local implementation and verification complete;
no new push, deployment or live database application. Eric chose solo completion;
original pair requirements remain disclosed in [his work plan](team-handoff.md).

Branch feature/sponsor-matching, originally from main a2af796. Preserved old lab6
and baseline branches unchanged. Checkpoint 4e4bc1d retains selector/AI review
work; ac17c67 merges Lab 5 b07575c as an unreviewed feature-branch prerequisite.
Lab 5's separate review/branch is untouched; this does not approve it for main.

## Implemented files

| Requirement | Implementation/evidence |
| --- | --- |
| Strict eligibility, pure deterministic selector | src/schemas/sponsorSelection.ts; src/lib/selectSponsor.ts; [policy](policy.md) |
| Public eligible query with least privilege | supabase/migrations/20261125000000_lab6_sponsor_matching.sql; src/lib/sponsorRepository.ts |
| ZIP/radius/house outcomes | Fictional fixture/demo script; /sponsor-demo with existing fictional property cards |
| Visible Sponsored disclosure/fallback | src/components/SponsorPlacement.tsx; card/detail integration |
| Minimal no-IP impression | /api/sponsor-impressions; narrow default-deny database insertion capability |
| Approved-record safe redirect | /api/sponsor-click; current stored winner, fixed validated destination |
| Adversarial reviews and actual decisions | [Gemini](gemini-review.md), [ChatGPT](chatgpt-review.md), raw evidence and submitted prompts |
| SQL query plan | [Actual isolated EXPLAIN](../evidence/lab6/query-plan.json), scripts/explain-lab6.ts |
| Reproducible dev setup and security limits | [Integration runbook](integration.md), SQL-only fictional seed generator |

The initial 48/55/61-test reports are historical snapshots. [Current integration
evidence](../evidence/lab6/integration/validation.json): 71 unit/database/API tests,
10 compiled production-browser tests, lint and build pass. Actual local EXPLAIN
is retained. Initial type/script/lint/browser failures and fixes are documented.
[Security audit](security-audit.md) distinguishes isolated/mocked checks from live evidence.

## Still required for final submission

- Review the completed local implementation/evidence and retained limitations.
- Integrate reviewed Lab 5 fixes before final main promotion; do not bypass Grace.
- Dedicated development Supabase migration/seed/session and live smoke evidence
  require owner access; local/mocked checks are not a hosted deployment audit.
- Final source/diff/credential review, authorized commit/push/PR and Canvas links.
- Instructor clarification if solo work needs approval under the assigned pair.
  No fake teammate work or role rotation is claimed.

No env is needed for isolated tests/demo/EXPLAIN. Real UI data requires the
separately configured development project; no sample fallback hides an outage.
Campaign activation and public property geography are trusted operator data,
not owner-submitted paid claims. No real geographic dataset is represented.
