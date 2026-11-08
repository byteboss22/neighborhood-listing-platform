# Student-supplied additional AI reviews

Received on November 7, 2026. Eric confirmed that the first attachment is
Google AI Studio and the second is Gemini. He reported both used "gminini 3.8
flash high" (interpreted as Gemini 3.8 Flash High); this is student-reported
model metadata, not an independently observed model identifier. Exact submitted
prompts were not included. The prepared prompt is available in
[the prompt record](../../../ai-prompts-midterm.md), but unchanged use is not
explicitly confirmed. [Provenance](provenance.json) records source hashes.

## What these artifacts establish

- [First supplied response](google-ai-studio-review.txt) reports no confirmed
  defect against the ten review requirements, distinguishes several confirmed
  behaviors from assignment interpretations, and explicitly says it ran no
  tests or builds and did not inspect the database.
- [Second supplied response](gemini-review.txt) gives favorable static findings
  and optional hardening hypotheses. Its activity prefix says "Ran run test
  suite", but provides no command output or exit status. Its body describes a
  static review and disclaims live execution. No additional test pass is counted
  from this artifact. Its PASS labels are review opinions, not executed tests.
- Neither response is instructor approval or proof that the full assignment is
  complete. In particular, documented district/active-zone omissions remain
  unresolved despite the second response labeling that area PASS.

## Codex evaluation of findings

The following are the assistant's evaluations against the source and supplied
assignment. Eric has not yet independently accepted/rejected each finding.
No source, schema, grants or hosted data were changed for these reviews.

| Finding | Source verification and disposition |
| --- | --- |
| Providers can change their own suspended services back to draft | Confirmed from the status column UPDATE grant and old/new-row draft-or-suspended policy. This does not allow approval, but the moderation meaning is ambiguous. Retain as an instructor question; do not silently change the specified permissions. |
| Deleting a suspended service deletes its bookings | Confirmed from the provider DELETE policy and required bookings service foreign key CASCADE. The proposed RESTRICT or draft-only deletion would alter explicit schema/access requirements. Do not adopt for this exam without clarification. |
| Booking INSERT accepts existing unapproved services | Confirmed by WITH CHECK (true), the foreign key and the documented interpretation. Approved-only booking is a reasonable production proposal, but it adds a condition absent from the explicit public INSERT requirement. Do not substitute it silently. |
| Approved-service mappings can expose inactive category IDs | Confirmed: mapping visibility checks service approval; category rows themselves remain active-only. Adding an active-category condition changes the explicit mapping rule. Record as an optional hardening/instructor question. |
| Anonymous booking SELECT grant exists without a matching policy | Confirmed. Current RLS still returns no rows; local and historical live privacy checks are separate execution evidence. Revoking SELECT would change the observable result from empty rows to a privilege error. Optional hardening, not evidence of current booking exposure. |
| Authenticated callers can read provider_id on visible approved services | Confirmed from the authenticated table SELECT grant and public-approved policy. The public API still returns exactly five fields. Narrower direct authenticated grants are optional; the assignment does not explicitly prohibit authenticated provider-ID reads. |
| Whitespace-only titles, no string maxima, past booking dates | Confirmed from current schemas. They follow the specified minimum character counts and DATE contract. Length caps, trimming and future-date restrictions require a deliberate additional product rule; no arbitrary limits introduced. |
| No application-level booking rate limiter | Confirmed from the route. Deployment-level limits were not inspected. The second response's assertion that 50 requests would all succeed is unverified; no flood test was performed. Optional operational work outside this exam slice. |
| Unqualified service_id in the booking read policy | The supplied schema resolves it to the outer booking field; existing provider-isolation tests pass. The proposed future-schema failure was not reproduced. Do not label it a current authorization defect. |
| Hosted grants/policies may drift from the migration | Valid operational limitation. The five-row catalog only proves existence/RLS flags/policy counts, not exact policy expressions. Historical hosted positive/negative role tests add behavioral evidence, but no full hosted policy/grant fingerprint was collected here. |
| Local auth stubs differ from hosted Supabase | Valid limitation of PGlite tests, already complemented by separately attributed real hosted user-session tests. Neither review ran new hosted checks. |
| Build-time missing configuration could leave a static 503 | Unconfirmed hypothesis. Current public production GET returned 200 at the readiness check and the saved build labels the routes dynamic. No environment-removal/build experiment was performed. |

Accepted as corroborating static reasoning: five-table structure, role-protected
profiles, explicit public GET columns, strict input contracts, user-scoped
provider actions, server-only elevated credentials, and documented domain gaps.
These conclusions were compared with the actual files; they do not replace
the recorded tests. No confirmed assignment defect requiring a code change was
established by these attachments.

## Eric's supplied review and reflection

Eric answered that he completed his own review/testing and supplied this exact
reflection (spelling retained):

> Yes I learned how to check for the connection between supabase and vercel.How to safely add the env. How to plan and begin building each piece by piece. I learned how to test locally, how to have AI assist me on the process and coding. How to verify its results by running it locally to test

This is student-reported learning and local testing. It does not assert an
unreported exhaustive manual checklist, partner contribution or instructor
approval. Per-finding student decisions and exact submitted prompts remain pending.
