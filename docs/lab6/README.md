# Lab 6 — contextual sponsor selection starter

Status: partial local implementation, November 25, 2026. No commit/push, database
query, live telemetry, redirect route, UI integration or external AI run claimed.

Branch feature/sponsor-matching from main a2af796 (completed Lab 4, Lab 3/midterm
preserved). The pre-existing lab6 branch at Lab 2 prevents a lab6/... ref; it was
left unchanged. Worktree: neighborhood-listing-platform-lab6. Lab 5 is separately
under review; it is not copied into this branch yet.

## Implemented locally

- src/schemas/sponsorSelection.ts: strict public candidate/page context contract.
- src/lib/selectSponsor.ts: pure deterministic eligibility and selection, explicit
  clock, public minimal decision plus house fallback, no identity or network.
- tests/lab6-selection.test.ts: baseline functional/adversarial cases.
- data/fixtures/lab6-sponsors.synthetic.json and scripts/demo-sponsor-selection.ts:
  three fictional properties with predictable ZIP/radius/house outcomes.

[Policy](policy.md), [Eric’s solo work plan](team-handoff.md) and [prepared AI prompts](ai-prompts.md).
[Actual local evidence](../evidence/lab6/local-validation.json): 48 tests pass, lint
passes, and typecheck passes after Next type generation. Initial fresh-worktree
LayoutProps failure is retained in the report. Three fixture outcomes matched
ZIP sponsor, radius sponsor and house fallback. No live integration tests claimed.

## Required work still pending

- Safe eligible-sponsor query and explicit public projection against reviewed
  Lab 5 persistence; no schema/explain-plan result invented.
- Disclosure/fallback UI at every integrated placement (a returned disclosure
  field alone does not prove rendered disclosure).
- Minimal impression event with sponsor ID, placement, timestamp, coarse page
  context; no IP/caller/resident identity. Define request validation/retention.
- Click route resolves destination from the approved stored record, validates it,
  rechecks eligibility and rejects caller-supplied redirect URLs.
- Real EXPLAIN evidence and only justified indexes.
- Gemini review received and locally verified: [findings and red/green evidence](gemini-review.md).
  [ChatGPT review](chatgpt-review.md) is also received/verified, and Eric accepted
  the corrections and confirmed unchanged prompts.
- Eric’s genuine solo contribution/AI provenance, PR and eventual demo/submission;
  original pair requirement remains disclosed for instructor clarification.

No .env is needed for this starter's tests/demo. Use current installed Next docs
before later framework changes and current official provider/API docs if needed.

## Ownership update — November 25, 2026

Eric chose to complete his full Lab 6 himself. Proposed tasks for Grace/Vanessa
are superseded; their separate assignments/reviews remain unchanged. No fake
partner participation or instructor approval is claimed. See the solo work plan.

## Gemini verification checkpoint — November 25, 2026

Original 48-test results above are the starter snapshot. Following Gemini feedback,
seven additional review cases were run and one real radius-boundary issue was
fixed. Current full suite: 55 pass, 0 fail; lint and TypeScript pass. The initial
failed boundary result is retained rather than hidden. No live integration or
external ChatGPT critique is claimed.

## Both reviews complete — November 25, 2026

ChatGPT (student-reported sol 6.2) and Gemini (student-reported gemini hydrogen)
reviewed the original packet. Verified fixes now include radius equality,
millisecond timestamp precision and equivalent-point geometry. All 61 tests,
lint and TypeScript pass; original red results remain evidence. Eric accepted
these choices and deferred optional duplicate-list hardening. The lab remains
partial until query/UI/telemetry/redirect/EXPLAIN and end-to-end evidence exist.
