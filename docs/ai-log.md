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
| 13. Journal completion / Codex | Update the AI log with the actual midterm work before any merge, and defer further Supabase/Vercel troubleshooting. | Consolidated the midterm journal, replaced stale uncommitted references with real hashes, linked exact follow-up prompts and evidence, and recorded the remaining tool/deployment limitations. | Did not relabel historical Lab 1/2 AI use as new midterm work, invent Gemini/AI Studio responses, manufacture a student's reflection or partner contribution, or perform a merge. | Git history and report review, historical Lab 1/2 preservation check, local links, whitespace and bounded secret scan. No application checks rerun solely for this documentation edit. | New documentation commit identified by Git history; no self-referencing hash invented. |

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
The student still needs to independently review the implementation and confirm
any learning/reflection statement in their own words. No midterm partner work,
instructor approval, partner email or Canvas submission is claimed.

### Other named AI tools and remaining evidence

| Tool | Midterm evidence actually available | Status |
| :--- | :--- | :--- |
| Codex / OpenAI assistant in this conversation | Exact task prompts, source changes, technical decisions, real test reports and commit references above. | Recorded. This is the actual assistant used for the work in this conversation. |
| ChatGPT outside this Codex conversation | No separate midterm prompt/response transcript supplied. | Not separately recorded; do not invent another ChatGPT session. |
| Gemini | No new midterm Gemini prompt/response supplied or tool invocation observed. | Not recorded. Historical Lab 1/2 entries are not midterm evidence. |
| Google AI Studio | No new midterm AI Studio prompt/export/response supplied or invocation observed. | Not recorded. The historical Lab 2 proposal remains attributed only to Lab 2. |

The assignment names ChatGPT, Gemini and Google AI Studio in its provenance
deliverable. This journal accurately completes the work evidenced in this
conversation; it does not claim the missing tools were used. If the instructor
requires separate use/evidence for each named tool, Eric must run the review
prompt provided in the prompt file and supply the real response/export before
that part can be marked complete. Prepared prompts are labeled NOT RUN until
actually used. Accepted/rejected findings must reflect Eric's real decisions.

### Current handoff

- [PR #2](https://github.com/byteboss22/neighborhood-listing-platform/pull/2)
  remains open into main. The assignment requests an open PR link for submission;
  a merge is not needed to obtain that link and no merge was performed here.
- The passing reports cover local code/browser checks and real hosted Supabase
  behavior with localhost API calls. They do not prove a successful Vercel UI/API
  deployment. Eric reported the deployment URL; its public access, environment
  configuration and hosted booking flow still need verification.
- The instructor invitation was sent; acceptance was not confirmed at the last
  owner-account check. No acceptance or instructor approval is inferred.
- Domain/coverage-zone schema gaps and the contradictory deadline wording remain
  documented in [requirements](requirements.md).
- The saved audit reports retain 16 moderate development-tooling findings and
  zero production findings at the recorded audit checkpoint; no newer clean
  audit is claimed.
