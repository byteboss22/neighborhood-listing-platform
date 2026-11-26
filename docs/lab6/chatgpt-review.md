# ChatGPT review — reproduced defects and accepted decisions

Eric supplied the [actual response](../evidence/lab6/chatgpt/review-attempt-01.txt)
and reported model label “sol 6.2.” The response itself could not see its interface
model label; the student's report is retained without independent verification.
Eric confirmed both prepared Lab 6 prompts were sent unchanged; exact prompt
copies and raw hashes are retained. Neither external model ran tests.

## Findings verified locally

| Finding | Local evidence and disposition |
| --- | --- |
| Sub-millisecond boundaries | Reproduced: now .000100 was accepted and selected before starts_at .000900 because Date.parse truncated both to the same millisecond. Candidate windows wholly within one millisecond can likewise collapse. Implemented strict zero-to-three fractional-second digits consistently for now/starts_at/ends_at; reject finer precision, do not silently round/truncate it. Eric accepted this contract choice. |
| Equivalent coordinates | Reproduced with ±180 at the equator and differing longitudes at the same exact north/south pole, using radius 1e-14 miles. The prior bounded tolerance does not erase the tiny trigonometric residual at these extreme radii. Canonical equivalent points now return zero before the formula; nearby distinct points remain excluded at that radius. Eric accepted the correction. |
| Missing boundary tests | Added millisecond end boundary, reverse ZIP+4/numeric ZIP, all six frozen three-candidate permutations with nested data, higher-priority radius, malformed/duplicate mixed-batch orders and safe URL lookalikes/positive control. Prior Gemini tests already cover normal antimeridian/pole vicinity. |
| Whole-batch failure, stable-ID ties, fictional URL rules | Deliberate documented policies; preserved. Unknown data is not silently partially accepted. |
| Pending query/disclosure/redirect/telemetry | Valid integration checklist, not verified implementation. Those deliverables remain unfinished. |

## Red/green evidence

[Before correction](../evidence/lab6/chatgpt/regression-before-fix.txt): 19 targeted
Lab 6 tests, 17 pass, 2 fail. [After correction](../evidence/lab6/chatgpt/regression-after-fix.txt):
61 full-suite tests pass, 0 fail. Lint and TypeScript passed. Results are local
Codex execution, not fabricated external model runs; raw proposed tests remain
unchanged in the original response. See [summary](../evidence/lab6/chatgpt/verification.json).

The regression tests adopt the explicitly chosen millisecond contract instead of
pretending to preserve microsecond semantics. Future DB campaign writes must
validate/enforce that contract. Reads must not truncate arbitrary timestamps to
make them pass: reject incompatible data or deliberately revise the comparator
and contract with tests. Lab 5 does not yet define the new campaign date fields;
compatibility remains a future Lab 6 migration/query integration requirement.

## Actual student review decisions — November 25, 2026

Eric agreed to reject finer-than-millisecond timestamps, handle equivalent
coordinates as zero, preserve the verified radius round-off correction, and defer
duplicate ZIP/placement list hardening while retaining the current deterministic
selection policy. This is acceptance of assisted review recommendations, not a
claim of independently re-performing the entire test/source review.

Both critiques reviewed the original 48-test private packet; neither should be
retroactively represented as reviewing the corrected 61-test source. The packet
is retained unchanged and the corrected implementation/evidence are separate.
No commit, push, live database work, deployment or completed Lab 6 is claimed.
