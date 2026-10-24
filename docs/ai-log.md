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
| Google AI Studio (proposal supplied by the student) | Original AI Studio prompt was not supplied. The student pasted interfaces for Property, Sponsor, PropertyCardProps, SponsorBannerProps and SearchFiltersProps, with an explanation of required and optional fields. | Accepted the supplied fields, numeric rent, required descriptive imageAlt, and optional maxRentUsd. Added the assignment-required onSubmit callback and documented draft-versus-applied filter state, empty-city and undefined-rent conventions. | No supplied interface was rejected. The proposal lacked onSubmit, so it was extended. Actual SearchFilters and SponsorBanner implementations are deferred to Vanessa. | Compared proposal with the supplied Lab 2 requirements; the implementation uses typed sample data and shared PropertyCardProps. Command results are recorded in testing-lab2.md. Required string types do not by themselves guarantee meaningful alt text, valid URLs or accessibility. | Pending implementation commit |
| Codex (this implementation session) | Student request begins “Help me implement Eric Juarez’s portion of CIS 3610 Lab 2: Semantic Components, Responsive Design, and Accessibility.” Summary: inspect the partner repository, preserve Lab 1, implement only shared types/data/PropertyCard and minimal integration, document evidence, run checks, and do not commit, push or open a PR. The original attached request also supplied the AI Studio proposal above. | Created the shared types and callback contract, three typed fictional properties including a studio, three original SVG illustrations and source notes, a stateful semantic card with a native disclosure button, and minimal page integration. Read installed Next.js client-boundary and image guides before implementation. | No generated output was rejected. Final responsive integration, SearchFilters, SponsorBanner, backend, authentication and voice implementation were excluded as instructed. Browser checks were not represented as completed. | Codex command results and exact pending manual steps are in testing-lab2.md. No controllable browser was available; no partner testing or approval is claimed. | Pending implementation commit |
| Codex (commit/push session, 2026-10-24) | “Help me commit and push Eric Juarez’s completed first-half implementation for CIS 3610 Lab 2 in this workspace.” Student authorized logical commits and a non-force push, required actual implementation references, and prohibited opening a PR, review, merge or deployment. | Inspected branch, remote, attribution, all changed files and prior notes; reran lint, TypeScript and build; prepared explicit file groups for shared interfaces, data/artwork, and PropertyCard integration/documentation. | No output rejected. No invented browser retest, partner approval or self-referencing documentation hash. | All three required CLI checks passed with exit 0. The student reported a data-zotero-connector-injected hydration warning; no documented Zotero-disabled retest was found, so the result was requested and remains pending. See testing-lab2.md. | Pending implementation commit |
