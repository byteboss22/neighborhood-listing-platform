# CIS 3610 Lab 1 AI Log

**Author / implementation author:** Vanessa Palomera  
**Planned partner reviewer:** Eric Juarez (review not yet recorded)

## Lab 1

The reviewed comparison supplied for this record describes differences in AI explanations of the neighborhood-platform development stack. Its key takeaways are:

- One response emphasized a starter plan, proposed file structure, setup commands, and accessibility recommendations.
- Another emphasized plain-language descriptions of the technologies and the local-development-to-hosting workflow.
- The supplied comparison presents these as differences in emphasis and coverage, not direct contradictions.
- The learning note recommends checking technical details against the actual project and official documentation rather than treating AI suggestions as verified facts.

The comparison also identifies claims to verify: App Router routing, Tailwind configuration for the installed version, GitHub-to-Vercel deployment behavior, server/client component conventions, accessibility requirements, and deployment timing. Its caution is that an AI summary or accessibility recommendation does not itself prove technical correctness, a successful deployment, or WCAG conformance.

### Source and provenance note

The task instruction identifies **ChatGPT and Gemini as the original sources** and **Claude as comparison assistance**. The supplied reviewed comparison itself labels its original responses “AI Studio” and “Gemini.” The original prompts and full response texts were not included, and the AI Studio/ChatGPT attribution difference cannot be resolved from the available material. No text is relabeled as a ChatGPT response; missing source details are marked **Awaiting student input**.

### AI activity record

| Tool | Prompt | Output used | Output rejected | Verification | Commit |
|---|---|---|---|---|---|
| ChatGPT (original source per task instruction) | The reviewed comparison supplies this prompt: “I am a beginner building a neighborhood listing platform for CIS 3610. Explain Next.js App Router, TypeScript, Tailwind CSS, GitHub and Vercel in plain language. Explain what each does, how they connect, and what runs locally versus on the host. Identify common beginner mistakes. Do not invent installation results or credentials.” The separate ChatGPT prompt is **Awaiting student input**. | A direct ChatGPT response was not supplied; no response content is attributed to ChatGPT. | No rejected ChatGPT output is recorded; source response is **Awaiting student input**. | Cannot verify the original response without the source text. | Pending documentation commit |
| Gemini (original source per task instruction) | The prompt above is included in the supplied comparison; whether it is the exact prompt used for Gemini is **Awaiting student input**. | The supplied comparison summarizes Gemini as explaining technology roles, local versus hosted workflow, and common beginner mistakes. Its excerpts and summary are recorded as supplied comparison notes, not as an independently retrieved response. | No rejected Gemini output is recorded; full source response is **Awaiting student input**. | Technical claims remain to be checked against the official documentation listed below. | Pending documentation commit |
| Claude (comparison assistance) | Exact prompt is **Awaiting student input**. | Comparison assistance is identified in the task instruction; its specific output is **Awaiting student input**. | No rejected output is recorded. | No separate Claude response was supplied for verification. | Pending documentation commit |
| Copilot SDK in VS Code (this documentation session) | “please reverse the rolls of Eric and Vanessa” with the supplied Lab 1 documentation and evidence requirements. | Documented the existing app-shell baseline at `6fdc198`; created setup, testing, evidence, AI-log, and README documentation with Vanessa as implementation author and Eric as planned reviewer; recorded actual environment versions and observed CLI checks; retained missing browser and source evidence as pending. | No application code or unobserved browser results were added. | CLI results are captured in the linked text logs. Browser checks remain pending; source attribution discrepancy is disclosed above. | Pending documentation commit; app baseline `6fdc198` |

### Claims and references to check

The reviewed comparison recommends validating these points before treating them as established:

1. App Router route conventions against the actual project and Next.js documentation.
2. Tailwind configuration advice against the installed Tailwind version.
3. GitHub-to-Vercel automatic deployments against the repository and deployment configuration; a push does not guarantee an immediate successful deployment.
4. Server/client component behavior against the installed Next.js documentation.
5. Accessibility recommendations against applicable criteria; recommendations alone do not demonstrate WCAG 2.1 AA conformance.

References supplied with the comparison:

- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [GitHub documentation](https://docs.github.com/en)
- [Vercel Git deployments](https://vercel.com/docs/deployments/git)
- [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21/)

## Eric Juarez — Lab 2

Date: 2026-10-24. Branch: `lab2/property-components`. Implementation starts from
the completed Lab 1 merge `2b1f1fa`. All Lab 1 entries above are preserved.
Vanessa's testing/review and Eric's later review of her work remain pending.

| Tool | Prompt | Output used | Output rejected | Verification | Commit |
|---|---|---|---|---|---|
| Google AI Studio (proposal supplied by the student) | Original AI Studio prompt was not supplied. The student pasted interfaces for Property, Sponsor, PropertyCardProps, SponsorBannerProps and SearchFiltersProps, with an explanation of required and optional fields. | Accepted the supplied fields, numeric rent, required descriptive imageAlt, and optional maxRentUsd. Added the assignment-required onSubmit callback and documented draft-versus-applied filter state, empty-city and undefined-rent conventions. | No supplied interface was rejected. The proposal lacked onSubmit, so it was extended. Actual SearchFilters and SponsorBanner implementations are deferred to Vanessa. | Compared proposal with the supplied Lab 2 requirements; the implementation uses typed sample data and shared PropertyCardProps. Command results are recorded in testing-lab2.md. Required string types do not by themselves guarantee meaningful alt text, valid URLs or accessibility. | `8854758` (shared interfaces) |
| Codex (this implementation session) | Student request begins “Help me implement Eric Juarez’s portion of CIS 3610 Lab 2: Semantic Components, Responsive Design, and Accessibility.” Summary: inspect the partner repository, preserve Lab 1, implement only shared types/data/PropertyCard and minimal integration, document evidence, run checks, and do not commit, push or open a PR. The original attached request also supplied the AI Studio proposal above. | Created the shared types and callback contract, three typed fictional properties including a studio, three original SVG illustrations and source notes, a stateful semantic card with a native disclosure button, and minimal page integration. Read installed Next.js client-boundary and image guides before implementation. | No generated output was rejected. Final responsive integration, SearchFilters, SponsorBanner, backend, authentication and voice implementation were excluded as instructed. Browser checks were not represented as completed. | Codex command results and exact pending manual steps are in testing-lab2.md. No controllable browser was available; no partner testing or approval is claimed. | `8854758` (types), `eb73cc2` (data/artwork), `d50a584` (card/integration/docs) |
| Codex (commit/push session, 2026-10-24) | “Help me commit and push Eric Juarez’s completed first-half implementation for CIS 3610 Lab 2 in this workspace.” Student authorized logical commits and a non-force push, required actual implementation references, and prohibited opening a PR, review, merge or deployment. | Inspected branch, remote, attribution, all changed files and prior notes; reran lint, TypeScript and build; created explicit-path commits for shared interfaces, data/artwork, and PropertyCard integration/documentation. Prepared the branch for the authorized normal push; remote confirmation is reported separately after pushing. | No output rejected. No invented browser retest, partner approval or self-referencing documentation hash. | All three required CLI checks passed with exit 0. The student reported a data-zotero-connector-injected hydration warning; no documented Zotero-disabled retest was initially found. Codex asked, and the student confirmed the retest passed (“yes its good to go”). Recorded as resolved per student report, not as a Codex-observed browser test. Other manual checks and partner review remain pending. See testing-lab2.md. | `8854758`, `eb73cc2`, `d50a584`; follow-up documentation records these existing references |

### Vanessa Palomera — Lab 2 Planning and Development Support

**Purpose:** I used ChatGPT to help me understand the Lab 2 requirements, plan
the implementation, and prepare for testing and GitHub collaboration.

**How I used ChatGPT:**

- It helped me create prompts for Copilot to implement and connect the
  `SponsorBanner`, `SearchFilters`, and `PropertyExplorer` components.
- It explained Git status, modified and untracked files, and the steps needed
  to prepare commits.
- It helped me understand the testing process and prepare a pull request
  description for my partner to review.
- It helped me plan accessibility testing, responsive layout testing, and the
  Lighthouse accessibility audit.

**Outcome:** ChatGPT helped me break the assignment into smaller steps and
understand the development and collaboration process. Copilot assisted with
implementing the components, running checks, organizing commits, and pushing
the feature branch to GitHub.

**Human review and testing:** I verified the implementation and personally
performed the required manual tests with my partner. We reviewed the application
rather than relying only on AI-generated code or AI-reported test results.

**Reflection:** Using ChatGPT helped me understand the assignment and work
through the process step by step. Copilot helped with implementation, while my
partner and I reviewed and tested the results. This experience taught me that
AI-generated code still needs to be checked and tested by the people developing
the application.

## Eric Juarez — PR #3 review evidence, 2026-10-24

Earlier entries above are historical records and remain preserved. This is
Eric's reviewer evidence, not Vanessa's AI-use record or a submitted approval.

| Tool | Prompt | Output used | Output rejected | Verification | Commit |
|---|---|---|---|---|---|
| Codex (review evidence documentation) | Eric asked to add the supplied Lighthouse tests to the repository, confirmed sponsor/layout/filter tests passed, and confirmed the application worked in a browser without Zotero. | Preserved both supplied Lighthouse JSON reports unchanged, recorded scores and findings in testing-lab2.md, attributed browser tests to Eric, and marked Zotero resolved rather than an outstanding retest. | No output rejected. Did not convert Lighthouse scores into full accessibility compliance, infer detailed unreported keyboard/viewport results, or invent Vanessa's AI critiques. | Parsed both reports and verified copied bytes; Accessibility 100 in both, 25 automated accessibility passes each, no automated accessibility failures. Review checkout: fbce716. Specific unconfirmed manual details remain identified separately. | Pending documentation commit; implementation reviewed at `fbce716` |


## Eric Juarez — personal repository integration, 2026-10-24

| Tool | Prompt | Output used | Output rejected | Verification | Commit |
|---|---|---|---|---|---|
| Codex | Eric requested merging lab2-partner-copy into his personal repository's main. | Prepared a merge of both histories, imported the completed shared implementation, archived original personal Lab 1 records unchanged, and updated the personal README and integration record. | No output rejected. No history rewrite, new browser results, accessibility compliance, or partner approval claimed. | npm ci, lint, build and TypeScript passed; imported application files and archived originals verified byte-for-byte. See integration-lab2.md. | This integration merge; source refs 1d551eb and ab694d7. No self-referencing hash invented. |

## Midterm Version B — Eric Juarez

Record covers the November 2 and November 4, 2026 implementation and follow-up
sessions (America/Los_Angeles). Eric is the student repository owner and
submitter. Codex provided the implementation and documentation assistance
recorded below; this is not a claim that Eric independently wrote every line,
that a partner contributed to this midterm, or that an instructor approved it.
All historical Lab 1/2 entries and their attribution above are preserved.

Branch: `exam/services-booking-eval`, based on fetched remote main
`e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b`. The same commit is preserved on
`lab2-baseline`. Existing Lab 2 components, original artwork, evidence and
attribution were retained. The supplied Version B assignment and Labs 3–5 were
read as references; their source attachments were not added to the repository.

Exact task prompts and later requests are recorded in
[midterm prompt evidence](ai-prompts-midterm.md). The Prompt Summary column is
intentionally a summary; it does not replace those verbatim prompts. Outputs
are represented by the actual source files and test reports linked below.
Official documentation lookups are references, not independent AI critiques.

### Activity, decisions and verification

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1. Scope and branch safety / Codex | Inspect the repository, read the assignment and preserve Lab 2 in an isolated exam branch; later use fetched origin/main rather than stale local main. | Inspected refs and source trees; preserved the Lab 2 integration as lab2-baseline and created the exam branch from it. Compared the later take-home attachment with the earlier assignment and found them identical after trimming surrounding whitespace. | Rejected starting from stale local main because it contained only README/ignore files. Paused implementation while the actual exam specification was missing. | Git status, branch refs, histories and tree comparison; source attachment comparison. No existing lab branch was reset. | Baseline `e57a87b`; branch creation itself creates no source commit. |
| 2. Requirements and schema interpretation / Codex | Implement the exact five-table Version B schema and three stories; proceed with option 1 when district/coverage-zone requirements conflict with the schema. | Wrote requirements, Given/When/Then criteria, estimates and traceability. Treated merchant/provider as equivalent service-provider roles while retaining both stored values. Recorded missing district/zone structure and contradictory weekday/date wording as instructor questions. | Rejected inventing district/zone tables or treating radius/category active_status as zone activity. Rejected claiming a partially supported Story 2 was fully implemented. | Compared the full assignment with the prescribed migration, requirements and actual routes. The student explicitly authorized the five-table interpretation. | `b1c51af`; later evidence/documentation `d8344a1`, `366c906`, `084de1f`. |
| 3. Persistence and RLS / Codex | Create the exact versioned PostgreSQL migration with checks, foreign keys, grants and default-deny role isolation. | Added all five required tables, exact filename, checks/cascades/restrict behavior and RLS. Protected profile roles from client writes; limited provider mutations to owned draft/suspended services; allowed public booking inserts and provider-only booking reads. | Rejected self-service role assignment, ownership transfers, provider self-approval and live-service edits. Kept public booking INSERT behavior as expressly specified rather than silently adding a different eligibility rule. | Executed the actual migration in embedded PostgreSQL/PGlite, including positive/negative grants/RLS and constraint/cascade checks. Hosted checks and catalog evidence followed separately; see rows 9–11. | `b1c51af`; live evidence `d8344a1`, `366c906`. |
| 4. Runtime contracts and server APIs / Codex | Add strict runtime validation, a server-only client and approved-only services GET/authenticated-provider POST. | Used Zod strict objects, database-compatible numeric bounds and explicit public columns. Verified users through Supabase Auth and protected profiles. Set owner/status on the server. Added public booking POST without returning contact data. Used a fresh user-scoped client per provider request and a separate trusted admin factory. | Rejected service-role credentials for provider actions because they bypass RLS. Rejected browser exposure of elevated credentials, client-selected owner/status, unknown fields and raw database error responses. | Actual route exports tested through the real SDK with a mocked HTTP boundary; 400/401/403/201/503 paths and outgoing credential/query scope checked. Later real Supabase Auth/PostgREST and localhost API tests used user JWTs. | `b1c51af`, `d8344a1`. |
| 5. Accessible UI / Codex | Build semantic ServiceCard, a responsive grid, keyboard focus and booking behavior within the existing app. | Added article/header/heading/list semantics, service-specific booking names, visible focus, a 1/2/3-column grid, booking form and loading/empty/error states. Kept existing Lab 2 components intact. | Rejected the initial generated CTA combination of visible “Book Now” and aria-label “Book appointment for …”: axe reported label-content-name-mismatch. Changed visible text to “Book appointment”. Did not equate automated passes with whole-site WCAG certification. | Six Chromium tests passed at 390/820/1280px, covering columns/overflow, Tab/Shift+Tab/Enter/Space, form receipt and axe checks of the new section. A missing matching Chromium binary was installed before the successful rerun. | `b1c51af`; initial logs in `docs/evidence/midterm/`. |
| 6. Initial validation and secret hygiene / Codex | Run meaningful checks, review the diff and avoid fabricated evidence or credentials. | Ran lint, production build, TypeScript, the initial 20-test suite, browser tests, ignore checks and bounded credential-pattern scans. Preserved actual results and dependency-audit output. | Did not claim a fresh npm ci, unperformed hosted tests, absolute absence of every possible credential format, or a clean full dependency audit. Avoided an unreviewed audit fix --force. | Initial CLI/browser logs and audit reports: [testing record](testing-midterm.md). Initial production audit reported zero findings; full audit recorded 16 moderate development-tooling findings. The later suite grew to 25 passing tests. | `b1c51af`, `4a87d16`; follow-up tests `d8344a1`, `366c906`. |
| 7. Instructor invitation and PR / Codex | Ensure the instructor is an explicit collaborator; then create a PR that can be submitted. | Checked direct collaborators and pending invitations through the authenticated owner CLI when the connector lacked access. Sent pdt605 a write-access invitation. Opened PR #2 from the exam branch into main and updated it with actual validation/pending work. | Did not mistake public repository read access for explicit collaborator access, equate an invitation with acceptance, or merge the PR. Did not add unsupported reviewer approvals or deployment claims. | GitHub owner API responses, invitation verification, PR open/head/base checks and normal non-force pushes. Invitation acceptance was still pending at the last check. | Documentation `4a87d16`, `084de1f`; invitation and PR creation are external actions, not separate code commits. |
| 8. Development configuration and student setup / Codex | Create ignored local configuration, guide Supabase setup and verify saved settings/accounts/services. | Created blank owner-readable .env.local, confirmed Git ignored it and provided SQL/setup steps. After Eric saved configuration, independently queried the approved fixture and verified known drafts were hidden. Provided profile/fixture queries for Eric to run in SQL Editor. | An unsaved/blank file produced 503 and was not represented as a working connection. Did not invent account credentials, apply a production migration, or interpret zero rows in an empty database as sufficient privacy evidence. | Git ignore/status checks and actual hosted SDK/localhost requests. Eric created the development project/accounts, applied SQL and seeded fictional data. Supplied profile/booking results are student evidence, not Codex-executed administrative SQL. | Framework and records `d8344a1`; .env.local remains untracked and is not in a commit. |
| 9. Real authentication, password recovery and test repair / Codex | Diagnose failed provider logins, help reset fictional provider passwords and resolve the remaining live client-test failure. | Added hidden terminal prompts and a trusted local reset utility that preserves provider IDs, confirms the fictional emails and verifies sign-in. Eric ran it with his own credentials. Replaced a generic password assertion with explicit short/mismatch retry prompts. Split client service denial from role escalation and scoped the profile update to the authenticated ID. | Rejected email recovery to fictional addresses, deleting/recreating referenced providers, and the original ambiguous password error. Rejected weakening RLS or accepting any database error as a denial: unfiltered UPDATE produced safe-update 21000, while the corrected targeted request produces permission-denied 42501 and leaves the role client. | Student terminal output and saved interactive report show password logins passed. Added regression tests for hidden-input validation and client authorization. The earlier failed report is retained and explained. Local API checks initially failed while the server was stopped; starting it resolved that prerequisite. | `d8344a1`; [live verification details](live-supabase-checks.md). |
| 10. Live role/API audit / Codex | Verify real provider/client/admin behavior without requesting that passwords be posted in chat. | Executed 14 checks against hosted Supabase and the localhost app. For the follow-up, obtained ordinary user JWTs by exchanging admin-generated links in memory. Provider/client requests themselves used their individual user sessions. Verified draft creation/deletion, booking insertion/privacy, ownership/live-status restrictions, client role denial and trusted admin execution. | Did not label admin-generated sessions as a new password-entry test, expose tokens, send emails, reset passwords during that rerun, or overwrite the historical failed password-run report with invented passes. These results do not establish that the Vercel app works. | [14 PASS outcomes](evidence/midterm/live-supabase-admin-session-audit.json); separate [interactive password evidence](evidence/midterm/live-supabase-audit.json). All 25 local tests, lint and TypeScript passed after the test repairs. | `d8344a1`; published with `366c906` and `084de1f`. |
| 11. Categories, mappings and actual RLS flags / Codex | Collect remaining hosted evidence, then record Eric's five-row SQL Editor result. | Added two fictional active/inactive category fixtures and approved/draft service mappings, ran eight hosted role checks, and prepared a read-only catalog query. Transcribed Eric's exact result: all five tables exist with RLS true and policy counts 2/1/1/1/5 in table-name order. | Did not substitute category activity for coverage-zone activity, overwrite unrelated fixtures, invent a screenshot, or claim Codex directly executed the hosted catalog query. Local query execution was not substituted for the hosted result. | [8 PASS outcomes](evidence/midterm/live-supabase-categories.json), [student-supplied catalog result](evidence/midterm/hosted-rls-catalog.json), local PostgreSQL tests and [submission index](submission-evidence.md). | `366c906cc646ee27601543687cb5f2ea8832218f`, publication `084de1f`. |
| 12. Vercel deployment troubleshooting / Codex | Eric reported adding the app/secrets to Vercel, supplied a preview URL and showed a service-unavailable screenshot. | Inspected the deployed URL without authentication, reviewed the existing server variable names and explained Preview environment scope, redeployment after variable changes and Deployment Protection settings. Read official Vercel documentation before giving those steps. | Did not mistake Vercel's authentication gateway for our API handler, claim a working hosted booking flow, or assert that missing variables were proven to be the cause. The screenshot shows the section and its fallback message. Environment scope/redeployment remain troubleshooting suggestions, not verified fixes. | Guest requests to the supplied preview URL redirected to Vercel sign-in; POST probes were blocked by the deployment gateway. No connected authenticated browser was available. No secrets were read from Vercel or posted into the journal. | This journal follow-up; no application-code change or Vercel fix is claimed. |
| 13. Journal completion / Codex | Update the AI log with the actual midterm work before any merge, and defer further Supabase/Vercel troubleshooting. | Consolidated the midterm journal, replaced stale uncommitted references with real hashes, linked exact follow-up prompts and evidence, and recorded the remaining tool/deployment limitations. | Did not relabel historical Lab 1/2 AI use as new midterm work, invent Gemini/AI Studio responses, manufacture a student's reflection or partner contribution, or perform a merge. | Git history and report review, historical Lab 1/2 preservation check, local links, whitespace and bounded secret scan. No application checks rerun solely for this documentation edit. | `c4d2f7b4c8d23b49532b1fadff23ad9954d93044`. |
| 14. Production verification / Codex | Eric reported that production worked after merging and supplied https://neighborhood-listing-platform-puce.vercel.app. | Added and executed a production HTTP verifier, saved 11 passing checks and updated deployment evidence. Confirmed public approved-only data, validation/authentication errors, no booking-read route, checked browser chunks, and persisted a fictional hosted booking whose row is hidden from anonymous access. | Did not attribute the student's Git merge/Vercel deployment to Codex, equate the old protected preview with production, infer a Vercel build SHA, or claim automated production keyboard testing. No elevated credentials were sent to Vercel by the verifier. | Actual production HTTP requests plus local trusted Supabase persistence and anonymous privacy queries. GitHub confirms PR #2 was merged at 5633c3f; the production report distinguishes local-reference commit from unverified build SHA. Student screenshot is attributed separately. | `a422e8f612fb2797bbdb5320966dbd71b138f1b8`, published in PR #3. |
| 15. Submission readiness / Codex | Eric asked to return to his repository and complete outstanding midterm items; exact request is recorded as P10. | Rechecked his clean exam branch, remote PR/invitation status, production public GET endpoints, 25 local tests and lint. Corrected stale publication notes and prepared a Canvas handoff draft. | Did not fabricate missing Gemini/AI Studio use, student reflection, accepted instructor access, an open PR, or instructor approval. Did not merge, push, change lab branches, or modify the partner clone. | [Readiness report](evidence/midterm/submission-readiness.json); both existing exam PRs are merged and the invitation is unexpired but pending. Historical hosted/browser checks remain separately attributed. | Local documentation follow-up; commit pending. |
| 16. Google AI Studio review / student-supplied response | Defensive midterm review; Eric confirmed using the prepared prompt unchanged, with its exact text in the prompt record. Eric confirmed tool attribution and reported the model as Gemini 3.8 Flash High; identifier not independently observed. | Preserved the actual response and used its static reasoning to cross-check provider scope, public columns, strict contracts and credential isolation. Recorded suspension transitions, cascading deletion and other hardening tradeoffs. | Codex did not adopt proposed RESTRICT/draft-only deletion, approved-only booking or active-category mapping changes because they alter explicit exam rules or add conditions. Eric agreed to retain the exam behavior and defer these proposals to future improvements. No static opinion was treated as a test pass. | Compared migration, schemas, handlers and existing test assertions; [response and disposition](evidence/midterm/ai-reviews/review-disposition.md). The tool explicitly claims no test/build/database execution. | Reviewed source `a422e8f`; local evidence commit pending. |
| 17. Gemini review / student-supplied response | Defensive midterm review; Eric confirmed using the prepared prompt unchanged. Eric confirmed tool attribution and reported the model as Gemini 3.8 Flash High; identifier not independently observed. | Preserved the actual response; used its reasoning on user-scoped provider access, booking privacy and strict public projection as corroborating review. Recorded optional input/rate-limit proposals and policy/grant drift limitations. | Rejected the blanket conclusion that all assignment requirements are complete: district/zone questions remain open. Did not count the activity prefix's test-run claim without command output, treat 50-request success as observed, or label the unqualified SQL reference a current defect. Eric agreed to retain the exam behavior and defer optional hardening to future improvements. | Source comparison and [documented limitations](evidence/midterm/ai-reviews/review-disposition.md); existing executed reports remain separate. No new database, load or browser test run for this documentation change. | Reviewed source `a422e8f`; local evidence commit pending. |

### What Eric did versus what the assistant did

Eric supplied the assignment, chose the five-table interpretation, created the
Supabase project and fictional Auth accounts, ran administrative SQL, entered
credentials privately in local terminal prompts, submitted a booking through
the local UI, supplied actual SQL results and test output, committed the hosted
verification framework as `d8344a1`, and reported creating the Vercel deployment.
These actions are recorded as student work or student reports as appropriate.

Codex inspected the repository, proposed/implemented the subsystem and helper
scripts, explained the setup/SQL, ran the independently attributed tests, fixed
the generated test/markup issues, and organized the documentation and PR.
Eric subsequently reported his own local review/testing and supplied a reflection
about verifying the Supabase/Vercel connection, configuring environment variables
safely, building incrementally, and checking AI output locally. His exact words
are preserved in the [review disposition](evidence/midterm/ai-reviews/review-disposition.md).
No exhaustive unreported manual checklist, midterm partner work, instructor
approval, partner email or Canvas submission is claimed.

### Other named AI tools and remaining evidence

| Tool | Midterm evidence actually available | Status |
| :--- | :--- | :--- |
| Codex / OpenAI assistant in this conversation | Exact task prompts, source changes, technical decisions, real test reports and commit references above. | Recorded. This is the actual assistant used for the work in this conversation. |
| ChatGPT outside this Codex conversation | No separate midterm prompt/response transcript supplied. | Not separately recorded; do not invent another ChatGPT session. |
| Gemini | Actual review response supplied November 7, 2026; mapping confirmed by Eric. Model label reported as Gemini 3.8 Flash High, not independently observed. | Actual response, unchanged prepared prompt and student-confirmed decision to defer hardening recorded. |
| Google AI Studio | Actual review response supplied November 7, 2026; mapping confirmed by Eric. Model label reported as Gemini 3.8 Flash High, not independently observed. | Actual response, unchanged prepared prompt and student-confirmed decision to defer hardening recorded. |

The assignment names ChatGPT, Gemini and Google AI Studio in its provenance
deliverable. The additional review responses are now supplied and retained
verbatim, with source hashes and explicit execution limitations. Eric confirmed using the prepared
prompt unchanged in both tools and agreed to retain the exam behavior, treating
the hardening suggestions as future improvements. Assistant technical evaluation
is labeled separately from that student decision. No model activity or test
output is invented.

### Current handoff

- Eric subsequently merged [PR #2](https://github.com/byteboss22/neighborhood-listing-platform/pull/2).
  GitHub confirms merge commit `5633c3fb4c4774a1229f09d817b30904f69b46d3`.
  PR #3 was also subsequently merged at `69708ad56b82945c29cebb0322cd569b1e3d8151`.
  The assignment requests an open PR; neither existing link is currently open.
  Confirm acceptance of merged links or publish the substantive readiness
  follow-up in a new PR. No merge or rollback was performed by this assistant.
- [Production](https://neighborhood-listing-platform-puce.vercel.app) is public
  and its API/fictional booking round trip passed 11 executed checks in
  [production evidence](evidence/midterm/production-deployment.json). The student
  supplied a screenshot of the rendered approved service. Exact Vercel build SHA
  and automated production browser/keyboard verification are not claimed.
- Production evidence was published as `a422e8f` in PR #3. The newer readiness
  follow-up remains local on the exam branch and requires publication.
- The instructor invitation was sent; acceptance was not confirmed at the last
  owner-account check. No acceptance or instructor approval is inferred.
- Domain/coverage-zone schema gaps and the contradictory deadline wording remain
  documented in [requirements](requirements.md).
- The saved audit reports retain 16 moderate development-tooling findings and
  zero production findings at the recorded audit checkpoint; no newer clean
  audit is claimed.


## Eric Juarez — Lab 3 data contracts, November 7, 2026

This is newly performed Lab 3 work on `lab3/data-contracts` from the preserved
Lab 2 integration commit `e57a87b`. Historical Lab 1/2 entries remain unchanged.
The midterm work is not relabeled as completion of Labs 3–7.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Lab planning / Codex | Eric requested separate Lab 3–7 branches from the preserved post-Lab-2 baseline and supplied the lab specifications. He clarified that the attachment's completed Lab 3/PR #5 summary was unrelated and should be disregarded. | Inspected Git and GitHub, retained all existing branches, created five local branch starting points and a separate Lab 3 worktree. Recorded the actual later-lab partners and pending external evidence. | Did not claim the nonexistent PR #5, prior passing lab tests or midterm evidence as completion of these labs. No retroactive dates or partner contributions. | Clean-tree and branch-ref checks; GitHub had PRs #1–#4 only. Main and midterm were not changed. | Baseline `e57a87b`; implementation `bbd69036fd3451ab159dff95bc94b212ba53d04b`. |
| Contract and normalization / Codex | Implement the supplied Lab 3 strict property contract, JSON Schema, validator, seeds, tests and ADR in the existing Lab 2 app. | Added strict Zod source with inferred types and generated Draft 2020-12 JSON Schema. Derived PropertySponsor pairs from ID-only local_sponsors; added primary-key/reference/set checks beyond structural validation. Controlled amenities and fixture-only URLs/images are explicit assumptions. | Rejected duplicate sponsor business records, silent coercion/repair, handwritten parallel canonical TS types, and pretending the exported JSON Schema can enforce cross-record foreign keys. | Read installed Next server/client and image documentation and official Zod JSON Schema conversion documentation. Compared ADR and contract; independent Ajv structural checks and schema export consistency. | `bbd69036fd3451ab159dff95bc94b212ba53d04b`. |
| Fixtures and UI / Codex | Render only validated records through the existing components, with safe failure handling. | Added five Codex-authored synthetic fixtures, four intentionally invalid fixtures and a fail-closed view adapter. Reused existing original Lab 2 SVGs with accurate illustrative alt text; retained existing components and old unconsumed seed file. | Did not label these fixtures as AI Studio output or fake a failed model generation, external critique, screenshot, human approval or hosted preview. | 15 tests passed, including the four required invalid cases, normalization, unsafe URLs, leading-zero ZIPs and invalid data producing no UI props. CLI invalid-fixture logs retain actual nonzero outcomes. | `bbd69036fd3451ab159dff95bc94b212ba53d04b`. |
| Validation / Codex | Run the supplied lab checks and record actual failures and fixes. | Tests, lint and production build passed. The initial standalone TypeScript check failed because Next LayoutProps were not generated yet; build generated the required types, then the check was rerun. | Did not change the existing layout to hide the initial error. Did not apply npm audit fix --force or call the dependency audit clean; npm reported eight moderate findings. | [Actual verification summary](evidence/lab3/verification.json) and CLI logs; dependency installation warnings retained as a limitation. | `bbd69036fd3451ab159dff95bc94b212ba53d04b`. |
| AI Studio / student-supplied raw generation and report | [Exact prepared prompt](lab3/ai-prompts.md) and reported model models/gemini-3.8-flash are in the supplied generation report. | Saved the actual JSON pasted by Eric as attempt 01 and preserved its five property/three sponsor facts. The page now consumes this validated artifact; six join pairs are derived. No repair needed. | Did not fabricate a failed model generation or screenshot, reconstruct raw output from the source fixture, or equate external reported commands with local evidence. Corrected the report's CLI/Ajv attribution. | [16-test independent follow-up](evidence/lab3/generated-data-verification.json) includes Ajv plus Zod/integrity checks, exact source-fact preservation, CLI validation, schema consistency, lint, build and TypeScript. Actual retrieval screenshot subsequently saved and inspected; no original generation-settings screenshot or deployment claim. | Implementation bbd6903/publication 30eec3d; generation integration/evidence `9f4620c`. |
| Gemini / student-supplied Lab 3 review | [Prepared normalization/adversarial prompt](lab3/ai-prompts.md); Eric confirmed using it unchanged; displayed model not supplied. | Preserved the actual static response and used its reasoning to cross-check IDs, normalization, strict boundaries and fail-closed UI behavior. Recorded optional uniqueness-export and input-limit proposals. | Codex rejected unsupported subsidy/habitability explanations, formal 3NF/zero-drift assurances and the claim that JSON Schema cannot express primitive-array uniqueness. Eric confirmed retaining current nonnegative rules and deferring stricter bathroom minima, unspecified string caps and export uniqueness as future improvements. | [Source comparison and limitations](evidence/lab3/gemini/disposition.md), raw response/hash. No test execution is attributed to Gemini; no schema, UI or test code changed in this review. | Reviewed implementation `bbd6903`, publication `30eec3d`; review documentation `9f4620c`. |

Assistant-performed local checks are distinguished from the student's supplied
external-model artifacts. The UI report, actual retrieval screenshot and draft
PR #5 were subsequently recorded. Grace's attributable peer review is recorded
below; integration and Canvas steps remain pending. Eric subsequently authorized
committing and publishing the current branch so AI Studio can inspect it.

### Initial branch publication preparation

Eric asked: "okay so I will have ai studio load the repo can we make some commits so it gets the lastest info are we forking or how are we doing this?"

Codex reviewed/staged the 28 implementation/evidence files, checked staged
whitespace and common credential patterns (zero findings), and created the
implementation commit referenced above. This follow-up records that real hash.
A normal push of only `lab3/data-contracts` was authorized; remote verification
is reported after the push. No fork, main/midterm merge, deployment, completed
external generation or new test pass is implied by publication.

### Received generation follow-up

Eric supplied the full attempt-01 JSON and confirmed the Lab 3 review decision
"Keep current rules; defer hardening (recommended)". Codex stored the supplied
JSON without altering values, independently validated it through Zod/integrity
and Ajv, checked the source facts, updated the page import, and recorded all
six successful command runs with logs. No schema changes or fake regeneration
were introduced. [Generation notes](data-generation-notes.md) distinguish the
raw response, original fixture, negative tests and external reported execution.


### Screenshot evidence received

Eric supplied an AI Studio image showing Gemini 3.8 Flash, the exact follow-up
request to print the original JSON file, the JSON response beginning, and an
application preview. [Visual observation and limitations](evidence/lab3/ai-studio-screenshot-observation.md)
distinguish the retrieval step from generation settings and test execution.
No accessible image binary was found locally; the actual image still needs
saving for repository evidence or separate Canvas submission. No screenshot was
fabricated or recreated. The original generation model identifier remains
attributed to the supplied text report; the screenshot confirms the shorter
visible model label for the retrieval session only.


### Screenshot file saved and inspected

Eric saved the actual image under docs/lab3. Codex inspected the local PNG,
moved it without modifying image bytes to
[ai-studio-retrieval.png](evidence/lab3/ai-studio-retrieval.png), and recorded its
hash/dimensions in the Studio provenance report. This resolves the earlier missing
binary status. The screenshot's limits remain explicit; no new test execution,
student UI review, publication or deployment is inferred from saving the file.


### Student local review

After receiving local-page review instructions, Eric reported: "perfect looks
like its working and no issues". This is preserved as
[student review evidence](evidence/lab3/student-review.json). It is a general
student-reported success, not an invented detailed keyboard/viewport checklist
or an assistant-observed browser session. Codex prepared the reviewed generation,
UI import, screenshot and review evidence for the next normal branch publication.


### Published follow-up and integration check

Generation/review/student-report evidence was committed and pushed as `9f4620c`.
A read-only merge-tree check against current origin/main found conflicts in the
AI log, package manifest/lock and homepage, where midterm work also changed the
Lab 2 baseline. No merge, rebase or main modification was performed. The next
PR is a draft review artifact; reconciling these changes requires preserving
both lab and midterm behavior before merge. Build/lint logs had trailing terminal
whitespace; a formatting-only follow-up removes it without altering results or
raw model artifacts. No new full test pass is claimed for that documentation fix.


### November 16, 2026 — Grace's actual peer review

[Grace Bernardo (Gracie-B-code)](https://github.com/byteboss22/neighborhood-listing-platform/pull/5#pullrequestreview-5931301507)
submitted a COMMENTED review of commit 3a13871. Her actual findings, reported
commands and manual inspection are preserved in
[grace-review.json](evidence/lab3/peer-review/grace-review.json). She reported a
16-test pass and a build security stop; neither is relabeled as approval or a
new assistant test run. This supplies the previously pending peer contribution.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Peer-review follow-up / Codex | Eric asked to inspect his partner's submitted review, then asked to resume after interruption. | Reproduced default Ajv's valid-cent failures, strengthened both-engine fixture diagnostics and duplicate-ID locations, corrected current pending status, and pinned Next/eslint-config-next to patched 16.4.6 on Lab 3 only. Preserved Grace's attributable review. | Did not dismiss a genuine reviewer defect, round/repair prices, claim universal float parity, bypass the security warning, alter raw model/peer artifacts, invent approval, or merge main into the lab branch. | Official Ajv option/vendor advisory and installed Next guides; [actual follow-up commands](evidence/lab3/peer-review/verification.json) distinguish the observed initial build failure from the patched run. [Disposition](evidence/lab3/peer-review/disposition.md) maps each finding to the change. | Reviewed 3a13871; follow-up commit pending. |


## Lab 3 / midterm integration — November 16, 2026

Eric agreed to prepare the combined branch after the proposal to merge main into
Lab 3, resolve conflicts, run both suites and let Grace review before merging
back into main. Exact request: "okay that sounds like a good idea can we proceed
with that? SO we can get this resolved?"

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Combined integration / Codex | Resolve Lab 3/main conflicts while preserving validated property data and midterm services/bookings, then update PR #5 for review. | Merged fetched main into Lab 3 locally. Combined the homepage and manifest, regenerated the lock and preserved both complete journal additions. Kept Next 16.4.6, all test commands and protected refs. Added a browser regression for the combined page. | Did not choose one side wholesale, remove either feature, rewrite raw generation/review evidence, move backups, copy credentials, apply migrations or perform the final merge into main. Browser network fixtures are not live Supabase evidence. | [Integration decisions](integration-lab3.md), [actual combined checks](evidence/lab3/integration/verification.json), raw-section/source-file preservation checks. Initial browser launch lacked the matching Chromium binary; that failure is retained and the binary installed. A second attempt found a user dev server on port 3000; it was not stopped. That existing-server attempt stayed in the loading state and failed. The final production-build suite passed all seven tests on isolated port 3100; test:ui:production and a separate tracked config now reproduce that check without stopping the user server. | Lab 3 parent d999d8a; main parent b167c47; merge commit recorded by Git. |


## Lab 4 — simulated discovery preparation, November 16, 2026

Eric chose simulated interviews and requested prompts for Claude/Gemini and a
separate working copy on the Lab 4 branch. The untouched Lab 4 starting branch
was fast-forwarded normally to merged main `7a5dc1c`; no reset or rewrite, fork,
real outreach, team role/contribution or instructor approval is claimed.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Setup and discovery questions / Codex | Eric requested simulated discovery, different model assistance and a Lab 4 copy of newly merged main. | Created a linked Lab 4 worktree and proposed eight questions covering workflow, audience, accuracy, approval, updates, success, accessibility and privacy. Prepared separate Claude simulation, Gemini critique and required Studio theme prompts with explicit synthetic/assumption labels. | Did not claim real interview evidence, consent, approval, board creation or actual teammate work. Claude is optional assistance, not a silent replacement for the required Studio step. | Verified clean baseline at 7a5dc1c, preserved protected refs, exactly eight questions and read the supplied Lab 4 specification. | Baseline 7a5dc1c; local documentation pending commit. |
| Gemini critique / student-supplied response | Eric supplied a Lab 4 critical review. [Prepared prompt](lab4/ai-prompts.md) exists; unchanged use and model are not yet confirmed. | Preserved response/hash and used the critique to identify candidate source-traceability checks (notably CR-02), caution against invented consensus and keep personas hypothetical. | Codex did not accept source-specific accusations without the original Claude notes, classify abbreviated labels as the full question wording, automatically adopt multi-part rewrites as neutral, or treat an opinion about typical users' expertise as fact. Student dispositions remain pending. | [Source gap and assistant evaluation](evidence/lab4/gemini/disposition.md). Original simulation A01-A08/B01-B08 and CR-01..CR-09 are not yet supplied; no line-by-line theme verification or actual interviews/tests claimed. | Local evidence pending commit; no application changes. |

Original Claude simulation, tool/prompt metadata, Studio themes, student decisions,
traceable personas/backlog/MVP, actual team contributions and GitHub planning
artifacts remain pending. The supplied critique is not substituted for those
sources. Historical labs and midterm entries above remain unchanged.


### Lab 4 Claude source received and compared

Eric supplied Claude's complete original and stated it came before the Gemini
critique. The earlier source gap is now resolved. All sixteen interview-note
rows and nine original candidate requirements are preserved as synthetic model
output, not real interview evidence.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Claude simulation / student-supplied response | Classroom simulation with property professional/local sponsor roles; the prepared prompt exists, exact use and model not yet confirmed. | Preserved A01-A08/B01-B08, unknowns and original CR-01..09 unchanged, with explicit simulated-assumption labels and a hash. | Codex rejected unsupported synthesis that both roles want removal transparency, universal expiry/reminders, shared preview/sign-off and citing sponsor speed as mobile-authoring evidence. No raw text was silently corrected. Student dispositions remain pending. | [Original/hash](evidence/lab4/claude/provenance.json), [line-by-line source comparison](lab4/source-review.md), and comparison with the actual Gemini critique. This checks fidelity to fictional notes, not real-world truth. | Local discovery evidence; commit pending. |
| Source adjudication / Codex | Compare the first Claude response with Gemini's concerns and prepare the reviewed-source step. | Verified source-dependent findings, split role-specific requirements and retained explicit uncertainties. Prepared source packet for the required Studio theme turn after Eric's decisions. | Did not assume every Gemini rewrite is neutral, omit source ideas without scope labels, infer jurisdictional rules, fabricate real interviews or generate a fake Studio result. | All 16 note IDs and CR-01..09 identified; source-to-inference corrections cite exact IDs. Real stakeholder confirmation remains required for any future empirical claim. | Local documentation; commit pending. |


### Lab 4 team starter — November 19, 2026

Eric asked for current Lab 4 status and a package that each teammate can review
and commit. He reported Estevan unresponsive and requested dividing active work
among Eric, Grace and Vanessa. He confirmed Studio has not yet been run and asked
to prepare drafts. No formal roster change, outreach or instructor approval is
inferred. The Claude/Gemini model names and unchanged-prompt confirmations remain
not supplied; no new invocation is invented.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Discovery package / Codex | Prepare Lab 4 drafts and divide meaningful contribution work across three active students while retaining actual model provenance. | Drafted value proposition, facts/assumptions, prospective v2 guide, unsent consent/invitation, source-traced personas, ten-story backlog with high-priority criteria/owners/estimates, MVP, content workflow, board-entry aid and Studio worksheet. | Did not claim v2 produced the existing Claude answers, implement future backlog stories, invent Studio themes, real stakeholder research, approval or teammate participation. Source corrections remain proposed for student review. | [Package checks](evidence/lab4/package-check.json), source-ID/link/hash checks, bounded secret scan; no app test rerun for document-only work. | Assisted starter on lab4/discovery-requirements; commit recorded by Git. |
| Team handoff / Codex | Make the starter available so Grace, Vanessa and Eric can each make attributable work. | Prepared distinct file ownership/review templates, personal-branch/PR workflow and assistant prompts. Verified Grace/Vanessa push access through owner API. Proposed role rotation, not claimed performed. | Did not create commits under classmates' identities, fill their reviews, accept roles on their behalf, tag absent users, or treat prepared templates as completed contributions. | [Team handoff](lab4/team-handoff.md), actual publication links when created, current Git/permissions check. Project access/Studio/individual work remain pending. | Shared starter only; teammate commit links pending. |


### Lab 4 starter publication

The assisted starter was committed/pushed as `c177deae295ac1a5dde59e28757b4dbc8b08868c` on the shared Lab 4
branch. Actual planning issue: https://github.com/byteboss22/neighborhood-listing-platform/issues/6. Actual draft PR: https://github.com/byteboss22/neighborhood-listing-platform/pull/7.
These publish reviewable drafts; they do not complete Studio, Project setup,
student review decisions or classmates' contributions. No main merge or manual
app deployment occurred. The teammate handoff identifies personal branches and
PR targets, preserving each person's actual future work and authorship.


### Lab 4 planning continuation — November 23, 2026

Eric asked to advance his Lab 4 work and start Lab 5 without waiting for all
teammates or merging to main. He confirmed Studio is still pending and explicitly
approved MVP US-01–05/US-07, the relay/reminder/appeal/analytics deferrals and
D-02/D-03/D-04/D-07 as his own planning decisions. Codex recorded these decisions
and Grace's actual merged PR #8, leaving Vanessa's files and decisions to her.
The Project scope check failed (`read:project` missing); no Project or Studio
completion is claimed. Documentation verification is recorded in Git and the
session report; no application changes or new app test results are implied.


### Lab 4 team consolidation — November 25, 2026

Eric authorized the next Lab 4 steps. Codex merged Vanessa's PR #9 into the shared
branch at e0c7705, preserving commits 3424692 and 70f7678, and hash-checked the six
pending Eric planning files during fast-forward. Recorded Grace/Vanessa's real
contributions, Eric's previously confirmed decisions, explicit Sponsored default
and factual publication metadata. Original model responses and teammate decisions
are unchanged. Documentation checks are retained; no new app test pass is claimed.
CLI Project access still lacks read:project; no Project connector/browser is
available. Actual Studio themes/comparison and Project evidence remain pending.
Lab 5 starter 20a718f was observed published already; no main merge or deploy.


### Lab 4 actual AI Studio themes — November 25, 2026

Eric supplied the actual theme-summary response. Codex retained raw bytes/hash
and the separately labeled prepared prompt, then compared ten themes, eleven
uncertainties and twelve candidate requirements to A01–A08/B01–B08. Proposed
corrections retain role limits, reject unsupported aggregate-counter satisfaction
and replace universal nonempty alt with purpose-based alternatives. Deferred
relay/freshness/appeal/analytics/localization are not promoted into MVP.
Human decisions, this run’s model and exact-prompt confirmation remain pending;
no real research, new app feature, completed human review or live board is claimed.

Eric subsequently agreed to the proposed Studio review decisions: retain
source-supported simulated hypotheses, correct aggregate-counter satisfaction
and universal nonempty alt, preserve MVP deferrals. Reported model label is
“gemini hydogen”; spelling retained, not verified. Exact submitted prompt remains
unconfirmed. Acceptance of assisted recommendations does not imply an independent
re-performance of all source checks or instructor/stakeholder approval.


### Lab 4 Project URL recorded — November 25, 2026

Eric supplied Project 2 view 1 and reported configuring all five required statuses.
Codex recorded the real URL and prepared per-card copy text from the existing
backlog, without inventing board items or implementation progress. CLI view/item
reads failed (read:project missing), web access was restricted. Live card details
and access verification remain pending. No Project writes or permissions changed.


### Lab 4 finalization authorization — November 25, 2026

Eric confirmed prepared Studio prompt use, reported completing Project card
descriptions after status setup, and authorized merging Lab 4 to main. Codex
recorded those reports without claiming a private-board API audit, refreshed
submission documentation and performed final documentation/source checks.
The final merge preserves Grace/Vanessa commits; no new application feature,
independent manual source recheck, actual role rotation, outreach, roster
approval or new deployment verification is inferred from this documentation.
