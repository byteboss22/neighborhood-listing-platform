# Grace Bernardo peer review and follow-up

Grace's GitHub account `Gracie-B-code` submitted a COMMENTED review on
[PR #5](https://github.com/byteboss22/neighborhood-listing-platform/pull/5#pullrequestreview-5931301507)
on November 16, 2026 in America/Los_Angeles (01:47 UTC November 17).
The [API-captured review](grace-review.json) preserves her words, timestamp,
reviewed commit `3a13871`, authorship and state. This is an attributable peer
review contribution, not an APPROVED review or an assistant-authored comment.

Grace reports inspecting the listed code/docs and fixtures, running the commands,
reading the schema and invalid fixtures personally, and viewing localhost:3100.
Her reported 16-test pass and failed build remain distinct from Codex's subsequent
execution evidence. No additional manual checklist is inferred.

## Findings addressed on the Lab 3 branch

| Finding | Investigation / change |
| --- | --- |
| Valid cent prices rejected by Ajv | Reproduced for 19.99, 1234.56 and 0.29 using default Ajv while Zod accepted them. Configure the independent Ajv test instance with multipleOfPrecision=8, as documented by Ajv for fractional divisors. Add valid-cent and negative/sub-cent cases through both engines. No price is rounded, coerced or silently repaired, and the canonical schema/raw generation are unchanged. |
| Ajv failures not checked for the expected reason | The four required fixture tests now assert Ajv instancePath, keyword and relevant error parameter as well as the existing Zod path. A failure from an unrelated field no longer satisfies the assertions. |
| Duplicate ID errors too broad | The full validator now reports the repeated index and ID field, such as properties.5.property_id or sponsors.3.sponsor_id, and identifies the original index. Tests assert the exact diagnostic. |
| Stale pending notes | Current ADR, checklist, review disposition and AI log now distinguish supplied screenshot/student decisions/published PR/peer review from remaining integration and Canvas steps. Historical checkpoint records remain dated and explicitly superseded; raw model responses and Grace's review are unchanged. |
| Next 16.4.3 build security stop | Independently reproduced exit 1 after static page generation. The vendor advisory identifies affected versions through 16.4.4 and a fix in 16.4.5. Upgraded only this branch to Next 16.4.6 and matching eslint-config-next 16.4.6, retaining React and the app conventions. No unsafe bypass or forced audit repair. |

Ajv's option uses a numeric division tolerance, not decimal arbitrary-precision
arithmetic. The tests cover the stated cent/sub-cent cases; they do not establish
universal equality for every possible IEEE-754 number or every external schema
consumer. Zod plus the full integrity validator remains mandatory at the UI/data
boundary. Other Ajv consumers must select the documented fractional-multiple
configuration rather than assuming its defaults handle decimal currency.

References: [Ajv fractional multipleOf option](https://ajv.js.org/options.html#multipleofprecision),
[vendor advisory](https://github.com/vercel/next.js/security/advisories/GHSA-mfr8-8qww-v76h),
[Next 16.4.6 release](https://github.com/vercel/next.js/releases/tag/v16.4.6).

[Actual follow-up execution](verification.json): 17 tests, lint, build, TypeScript,
schema consistency and generated-data validation passed with Next 16.4.6. The
production-only dependency audit reports zero findings; the full audit exits 1
with seven moderate findings. No force fix or clean full-audit claim is made.
The actual command logs are retained alongside the report. These fixes do not resolve the existing merge conflicts against main.
Main, midterm-baseline, lab2-baseline and the midterm feature branch are unchanged.
No review reply, approval, merge, production migration or deployment is claimed.
