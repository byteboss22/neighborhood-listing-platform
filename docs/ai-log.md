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

## Midterm Version B — Eric Juarez, 2026-11-02

All preceding Lab 1/2 attribution remains unchanged. This entry records AI
assistance, not independent student verification or instructor approval.
Exact implementation prompts: [midterm task prompts](ai-prompts-midterm.md).
The user authorized the prescribed five-table schema and explicitly deferred
district and active coverage-zone behavior. Reference attachments were read
without adding them to Git.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Branch inspection / Codex | Inspect refs, fetch origin, preserve completed Lab 2 and isolate the exam. Exact corrected authorization is linked above. | Confirmed remote main integration; created preservation and exam branches at e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b. | Rejected stale local main as baseline after inspection showed only README/ignore files; user explicitly authorized remote-main base. | Git status, branch refs, tree inspection and source/config comparison. No lab branch was reset. | No new commit; baseline e57a87b. |
| Requirements and schema / Codex | Implement Version B using the existing Lab 2 app; follow option 1 without district/zone extensions. Exact task prompts linked above. | Five-table migration, strict contract, RLS ownership/status checks, protected profile roles and user-scoped server API. | Rejected substituting radius/category-active flags for zones: those facts are absent from the schema. Rejected elevated provider writes: service credentials bypass RLS. These were design alternatives, not fabricated outputs from another tool. | Executable PGlite migration, constraints/cascades and multi-role positive/negative tests; actual route tests with mocked Supabase HTTP. See security-audit.md and testing-midterm.md. Hosted Supabase remains pending. | `b1c51afc5906bbc9c80141dceb7728d8692dab35` (implementation; human review pending). |
| Interface and accessibility / Codex | Build semantic ServiceCard, 1/2/3-column grid, visible focus and keyboard-operable booking. | New service section and public booking form without replacing Lab 2 components. | Rejected first generated CTA draft: visible “Book Now” with “Book appointment for …” aria-label failed axe label-content-name-mismatch. Changed visible wording to “Book appointment”, preserving a service-specific name. Initial browser run also lacked matching Chromium; installed it and reran. | Playwright viewport/keyboard/form tests and axe inspection of the new service section. Boundary data is fictional and intercepted, not a hosted result. | `b1c51afc5906bbc9c80141dceb7728d8692dab35`. |
| ChatGPT outside Codex | Not independently used for this midterm session. | None recorded. | Not applicable; no separate output exists in this session. | Student must supply real prompt/output evidence if required by instructor. Historical Lab 1/2 entries above are not relabeled as midterm work. | Pending genuine evidence. |
| Gemini | Not invoked during this midterm session. | None. | Not applicable; no output fabricated. | Required independent critique/prompt/output remains a student manual step. | Pending genuine evidence. |
| Google AI Studio | Not invoked during this midterm session. | None. | Not applicable; no output fabricated. | Required prompt/export/output evidence remains a student manual step. | Pending genuine evidence. |

The student still needs to review the implementation and add any genuine partner
contributions. At initial implementation no external submission actions were
performed. Subsequently, the user authorized inviting `pdt605` and opening a PR.
The instructor invitation was sent and remains pending acceptance; implementation
commit `b1c51af` is now pushed. PR preparation reran all 20 API/contract/RLS tests
successfully and the credential-pattern scan found zero matches. The exact PR
request was: “cool can you do a pr so I can put the link”. Codex updated stale
status notes and removed trailing blank lines in two evidence logs. No new
application code, deployment, partner email or Canvas submission was performed.
This documentation follow-up commit will be identifiable in Git history; no
self-referencing hash is invented.

## Midterm hosted development verification continuation — 2026-11-04

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Codex | Student asked to continue the take-home midterm, create ignored local configuration, verify saved settings and fictional services, then reported creating accounts/profiles and supplied an administrative booking result. | Created blank ignored .env.local; independently checked live public Supabase/local API reads, known draft isolation and hiding of the known persisted booking. Prepared npm run test:live to gather real password-session provider/client evidence without recording credentials. | Did not interpret zero rows in an empty database as proof of booking privacy. Did not fabricate authenticated or elevated results; interactive tests remain pending until actually run. | Public-only runner and actual hosted SDK/localhost requests. Administrative booking existence comes from the student's pasted SQL result, explicitly attributed. See live-supabase-checks.md. | Continuation changes uncommitted; original implementation b1c51af, prior documentation 4a87d16. |
| Codex | “looks like I need to reset the password fo rthe provider accounts how can I do so” | Prepared a trusted local utility using Supabase's admin update API, hidden prompts and identity checks to reset/confirm only the two known fictional provider accounts and verify subsequent sign-in. Shared hidden-input helper with the live audit runner. | Avoided email recovery to non-deliverable fictional addresses and deleting/recreating providers referenced by services. Did not label the student's first interactive audit as passing: provider logins, local API and admin checks had failures. | Official Supabase administrative-update/API-key docs; syntax, help path and lint checks. No actual password reset is claimed until the user runs the command with their own local admin credential. | Uncommitted continuation changes. |
| Codex | Student supplied terminal output showing ERR_ASSERTION immediately after confirming Provider A's new password. | Replaced the generic local password assertion with distinct short-password/mismatch messages and retry prompts before any update. | Rejected the original generic failure message because it conflated local input validation with administrative-key and server-policy failures. The supplied output showed neither provider password had yet been updated by that invocation. | Added tests with fictional inputs for retry behavior, the 12-character boundary and cancellation; no real password values read or recorded. | Uncommitted continuation changes. |
| Codex | Student supplied the live audit output with one combined client test still failing. | Independently reproduced client API 403, unfiltered profile UPDATE 21000, filtered UPDATE 42501 and unchanged client role. Split the assertions, added an explicit authenticated-ID filter and regression tests. Added a trusted operator mode using admin-generated in-memory user sessions to rerun without requesting passwords again. | Rejected changing RLS or accepting any error as a denial. Preserved the older failed password-run report. The corrected run is separately labeled session-based and does not claim new password-entry tests. | Official generateLink/verifyOtp docs; 14 hosted checks passed using ordinary user JWTs after session creation, with no emails sent/password changes. All 25 local tests, lint, TypeScript, whitespace and credential-pattern checks passed. | Uncommitted continuation changes. |
