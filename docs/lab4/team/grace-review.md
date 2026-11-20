# Grace's Lab 4 contribution — source review

## Files/sections actually reviewed

- `docs/lab4/interview-guide.md`: entire v1/v2 status, eight-question draft and
  proposed critique disposition table.
- `docs/lab4/invitation-and-consent.md`: entire invitation, consent checklist
  and operational boundaries.
- Supporting context: `docs/lab4/README.md`, `docs/lab4/source-review.md`,
  `docs/lab4/team-handoff.md`, `docs/lab4/ai-prompts.md`,
  `docs/evidence/lab4/claude/simulation.md` and
  `docs/evidence/lab4/gemini/review.md`.

## Source note IDs and question versions checked

- Original v1 questions: eight topics in `docs/lab4/ai-prompts.md`.
- Original fictional answers: A01-A08 and B01-B08 in
  `docs/evidence/lab4/claude/simulation.md`.
- Gemini critique topics 01-08 and the source-correction findings in
  `docs/lab4/source-review.md`.
- Candidate requirements CR-01-CR-09 were reviewed only as fictional
  inferences, not approved requirements.
- No note was treated as a real interview observation or stakeholder approval.

## Accepted/rejected decisions and reasons

| Decision | Status | Reason |
| --- | --- | --- |
| "If at all" and process-neutral workflow wording | Accepted | The v1 workflow text and source notes do not establish an existing digital process. |
| Ask for observed information requests rather than audience goals | Accepted | This reduces audience-demographic and motive speculation. A02/B02 remain fictional uncertainty. |
| Keep one accuracy question | Accepted | It avoids combining accuracy with mistake frequency as in Gemini's rewrite. |
| Use a single question for publish authority and later removal | Accepted with a caveat | It may still bundle governance topics; a future interviewer should split them if answers are incomplete. |
| Use outcome-neutral success wording | Accepted | "Usefulness" can mean many things and the sources give no numeric targets or ROI requirement. |
| Ask about barriers, devices and findability | Accepted | It does not require diagnosis or disclosure of disability or assistive-tool use. |
| Ask for private boundaries without sensitive examples | Accepted | Privacy scope remains but skipping is explicit. |
| Conflate property freshness and sponsor expiry | Rejected | A05 proposes reminder-or-expiry and dislikes silent expiry; B05 requests end-date removal and early pause. |
| Claim removal transparency is shared by both roles | Rejected | A04 discusses reasons and appeal; B04 does not discuss takedown transparency. |
| Claim v2 generated the existing Claude answers | Rejected | A01-A08/B01-B08 came from the v1 topics, as stated in `docs/lab4/ai-prompts.md`. |
| Claim participant or instructor approval | Rejected | The README, handoff and evidence state that no real outreach or approvals occurred. |

## Concrete edits

- Replaced the interview guide with an explicit prospective v2 heading and
  mismatch warning for A01-A08/B01-B08.
- Revised all eight questions; role-specific terms, "not applicable," uncertainty
  and skipping are now explicit.
- Narrowed the privacy and accessibility prompts so they do not require sensitive
  personal examples or disclosures.
- Marked approval, removal and freshness as distinct areas requiring follow-up
  rather than assuming one shared policy.
- Strengthened the invitation with placeholders for the course section/instructor,
  approved 15-minute request, storage/access, retention/deletion, withdrawal and
  correction.
- Explicitly preserved that the draft is not sent and that both instructor
  approval and participant permission remain pending.

## Unresolved questions

- Which approved CIS 3610 section and instructor may conduct or authorize contact.
- Whether the 15-minute time request is approved.
- Which storage location, access model, retention/deletion period and withdrawal
  process are instructor-approved.
- Which approved student contact method may be used.
- Whether the compensation statement is accurate and whether any payment policy
  exists.
- Whether future v2 questions should be used for a new, separately retained
  simulated response or whether the mismatch should remain explicitly labeled.
- Whether property publish/edit/remove authority and sponsor preview/review
  authority should be one workflow or separate role-specific decisions.

## Cross-scope concerns

- Persona and content-approval workflow details belong to Vanessa.
- Backlog, MVP, acceptance criteria, AI Studio comparison, GitHub board/issue
  and master AI-log integration belong to Eric.
- No changes were made to those files or raw evidence.

## Actual AI help and checks

- AI assistance: Copilot SDK assistant in VS Code helped inspect sources and
  prepare proposed Markdown edits.
- No Gemini or Claude response was generated during this review. Their retained
  artifacts were read and compared as source evidence.
- No real interview, outreach, consent collection or application test occurred.
- Documentation review only; no application tests, dependencies or app build.

## Commands/verification

- Inspected the clean clone, remote, personal branch and Git identity.
- Ran `git diff --check`; it reported no whitespace errors.
- Ran `git diff --stat` and `git diff --name-only`; the diff is limited to the
  three editable Markdown files.
- Commit, push and PR links remain pending.

## Own commit / review / PR link

- Personal commit and PR: pending explicit authorization.
