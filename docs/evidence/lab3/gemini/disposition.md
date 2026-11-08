# Gemini Lab 3 review — assistant evaluation

Eric supplied this [raw review](review.txt) as Gemini output on November 7, 2026.
It is retained byte-for-byte; [provenance](provenance.json) contains its hash.
Eric confirmed that he used the prepared Lab 3 normalization/adversarial prompt
unchanged. The displayed model name is not supplied and is not inferred from
the midterm session.

The response explicitly describes static inspection and disclaims test execution,
deployment inspection and course approval. Its activity list includes an initial
directory lookup failure followed by reading the actual Lab 3 worktree. This is
the review's reported activity, not a new Codex execution log. No passing test
count is added from this response.

## Findings compared with the current source

| Review claim / proposal | Codex evaluation and disposition |
| --- | --- |
| IDs, sponsor references and unknown-field rejection | Corroborated by the strict Zod source, post-parse uniqueness/reference checks, view adapter and existing tests. Retain the reasoning as additional review evidence, not proof of deployed behavior. |
| ZIP strings, controlled amenities and sponsor normalization | Consistent with the local documented design. ZIP syntax does not establish real geography/deliverability. Do not call the document array representation formally certified 3NF; a future SQL join is a separate storage design. |
| A zero-bathroom dwelling must be rejected | Not established by the supplied lab. The contract intentionally follows nonnegative numeric requirements, and whether zero means unknown/shared facilities is unresolved. Do not add a habitability rule or claim a legal standard from a model opinion. Keep as a stakeholder question. |
| Zero rent implies subsidized/community housing | The code permits zero because the lab asks for nonnegative values. No subsidy, community status or transaction classification is established by the fixture or ADR. Reject that invented explanation as a source fact. |
| Empty membership or an unlinked sponsor is ambiguous | The contract allows a property without sponsors and an unlinked catalog sponsor. Document this explicit local choice; it is not evidence of actual campaign eligibility. No requirement to force a relationship is supplied. |
| Add uniqueItems to exported arrays | Useful portability proposal. The statement that primitive-array uniqueness requires imperative checks is too broad: standard JSON Schema supports uniqueItems. The current export does not emit it, while the mandatory full validator rejects repeats. Defer an export change while AI Studio is generating against the published schema; do not hand-edit only the generated artifact. Any future change needs schema/source consistency and duplicate-array checks through both engines. |
| String maxima such as title 150/street 100 | Potential hardening, with no supplied product limits. Record as optional; do not choose unexplained ceilings or alter the canonical generation contract mid-run. |
| Single source guarantees zero drift | Overstated. Inferred types/export reduce drift, but stale generated files and semantic checks still require schema:check and tests. Existing execution evidence establishes those checks at its own checkpoint. |
| Cent precision is immune to floating-point artifacts | Overstated as a blanket guarantee about JavaScript numbers or validator implementations. Existing tests exercise the supplied fixtures and selected invalid precision cases; no universal numeric correctness is claimed. |

JSON Schema's standard array-uniqueness mechanism is documented in the
[official array reference](https://json-schema.org/understanding-json-schema/reference/array#uniqueItems).
Cross-record foreign-key membership still needs the application integrity check
used in this lab; uniqueItems is not a substitute for that check.

## Current decision status

This is Codex's source-based evaluation. Eric confirmed for Lab 3 that he wants to keep the current rules and defer the
stricter bathroom minimum, arbitrary string limits and exported uniqueness
changes as future improvements. This is a new Lab 3 decision, not a copied
midterm decision. No schema, UI or test implementation changed for this review.
AI Studio raw generation has subsequently been supplied and independently
validated; see [generated-data evidence](../generated-data-verification.json).
The redacted Studio screenshot/export is still pending.
