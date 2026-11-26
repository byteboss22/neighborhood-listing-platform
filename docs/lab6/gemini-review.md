# Gemini review — verified findings and dispositions

Eric supplied the [actual response](../evidence/lab6/gemini/review-attempt-01.txt)
and identified model “gemini hydrogen.” Raw bytes/hash are retained; displayed
model not independently verified. Exact unchanged-prompt use is not confirmed.
This is Codex-assisted verification, not a final student acceptance decision.

| Finding | Actual local verification / disposition |
| --- | --- |
| 1 — Calendar/NaN time-window bypass | Not reproduced. Installed Zod rejected Feb 30, Nov 31 and 24:00 before selection. Native Date.parse actually returned finite normalized values for these examples. Proposed tests alone did not prove schema acceptance; the new direct-schema test checks that boundary explicitly. A finite-time guard could be future defense, not a confirmed current exploit from these examples. |
| 2 — Radius floating boundary | Reproduced at a mathematically five-mile meridian point: expected sponsor, actual house. Saved red test then introduced a bounded allowance (at most 1e-9 miles and one-billionth of the requested radius). Exact boundary passes; a 5.000001-mile point still fails. This is numerical compensation, not a meaningful geographic coverage increase. |
| 2 — Negative zero | Equivalent decisions observed for zero/negative-zero coordinates. No defect in the actual selector; not a privacy or selection leak. |
| 3 — Repeated ZIP/placement values | Accepted but redundant; tested result equals deduplicated config. No assignment uniqueness requirement and no effect on rank/eligibility. Optional schema hardening, deferred rather than portrayed as a security failure. |
| 4 — ZIP preferred when both match | Deliberate documented ranking policy. Higher priority still outranks ZIP specificity; new test confirms radius can win on priority. |
| 5 — Fictional-domain allowlist | Deliberate prototype boundary. Do not broaden to real business URLs without approved data. Allowlist is not proof that future redirects/HTML/HTTP integration are safe. |

## Tests actually run

Derived/adapted four useful Gemini cases in tests/lab6-gemini-review.test.ts:
ZIP+4 inverse/malformed inputs; offset end boundary/invalid dates; antimeridian,
polar proximity and priority; empty coverage/priority/radius/array bounds.
Codex added three focused verification cases: direct calendar-schema rejection,
red/green exact-radius regression, and zero/redundant-list equivalence.
Raw Gemini code still truthfully says NOT RUN; it was not edited to imply execution.

[Before correction](../evidence/lab6/gemini/regression-before-fix.txt): 13 targeted
tests, 12 pass, 1 fail at the new boundary regression. [After correction](../evidence/lab6/gemini/regression-after-fix.txt):
55 total tests pass, 0 fail. Lint and TypeScript also passed. See
[verification summary](../evidence/lab6/gemini/verification.json).

No unit test proves a live database query, rendered Sponsored label, HTTP redirect,
no-IP telemetry or actual EXPLAIN result. Those integration requirements remain.
The statement that real approved geographic data is necessary applies if real
proximity is used; clearly labeled fictional coordinates remain fictional examples.

## Review state

ChatGPT's independent critique and Eric's retain/reject decisions remain pending.
The private original packet remains unchanged for comparable independent reviews;
it describes the pre-fix selector. This fix/test expansion is separately retained
and must be considered when adjudicating the other model's feedback. No new model
run, instructor approval, commit, push or live action is inferred.

## Subsequent student decisions and independent review — November 25, 2026

Eric confirmed both model prompts unchanged and accepted the verified corrections,
including deferred duplicate-list hardening. ChatGPT review is now received and
verified separately in chatgpt-review.md; earlier pending notices are historical.
The initial calendar-overflow claim remains unproven against Zod; ChatGPT's distinct
sub-millisecond precision finding reproduced and was corrected explicitly.
