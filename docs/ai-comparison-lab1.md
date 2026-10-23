# Reviewed AI comparison supplied for Lab 1

Author: Eric Juarez. Recorded in this repository on 2026-10-23.

The material below is preserved from the student-supplied attachment. ChatGPT and Gemini are the original explanation sources; Claude assisted with comparison only. Full original responses and the original Claude prompt: **Awaiting student input**. Quoted excerpts are student-supplied, not independently authenticated in this session. The draft reflection still needs Eric’s confirmation. Flagged technical claims and original response links remain unverified unless explicitly stated otherwise; this session read installed Next.js setup/TypeScript guidance for repository verification, not a complete claim-by-claim review. See [AI log](ai-log.md).

---

## Lab 1 – AI Comparison: Development Stack Explanation

**Prompt given to both tools:**
> "I am a beginner building a neighborhood listing platform for CIS 3610. Explain Next.js App Router, TypeScript, Tailwind CSS, GitHub and Vercel in plain language. Explain what each does, how they connect, and what runs locally versus on the host. Identify common beginner mistakes. Do not invent installation results or credentials."

### Two differences

| # | Topic | ChatGPT said | Gemini said | Effect on a beginner's understanding |
|---|---|---|---|---|
| 1 | **Where server code runs** | Treats "server" as a role rather than a place. Your laptop acts as the server during development, and Vercel takes that role after deployment. It also notes that Client Components can have their initial HTML prepared on the server. *Excerpt:* "'Server' describes a job, not necessarily a separate computer." | Says Server Components run only on Vercel and Client Components run in the user's browser, used "strictly for interactive elements." *Excerpt:* "These run only on the remote host (Vercel)." | Gemini's version is simpler, but it could lead a beginner to think server code doesn't run on their laptop while they develop. That would make local errors and local data fetching confusing. ChatGPT's framing explains why server code can run on your own machine before deployment. |
| 2 | **What happens when you push to GitHub** | Separates preview deployments from production. Configured pushes can trigger builds and preview deployments, and changes merged into the configured production branch trigger a production deployment. *Excerpt:* "Changes merged into the configured production branch can trigger a production deployment." | Says any new push leads Vercel to build and publish the live site. *Excerpt:* "The moment it detects a new push, Vercel automatically pulls the code" … "and publishes the live site." | Gemini's description suggests that every push, including one to a feature branch, updates the public site. ChatGPT's description matches a branch-and-pull-request workflow, where the team reviews changes before they reach production. That matters when two partners are pushing branches. |

**Smaller differences noted but not counted:** The beginner-mistake lists emphasize different things. Gemini focuses on tool-specific coding errors: a missing `"use client"`, overusing `any`, building Tailwind class names dynamically, and committing `.env`. ChatGPT focuses on workflow and security misunderstandings: sharing `localhost` links, `NEXT_PUBLIC_` variables being exposed to the browser, needing server-side validation and permission checks, and missing Vercel environment variables. ChatGPT also points out that the stack needs a separate database and file storage, and it opens by saying it has not installed or deployed anything. Gemini does neither.

### What I learned (DRAFT – confirm or edit before submitting)

> Comparing the two explanations showed me that "server" doesn't always mean a remote computer. When I run the project locally, my laptop does the server work, and Vercel does it after deployment. I also learned to check how deployment is configured. Pushing a branch to GitHub doesn't automatically mean the live site changes, because preview and production deployments can be separate. Both tools agreed on the basics, but where they disagreed, the simpler explanation left out details that could confuse me later. I need to check official docs instead of trusting one AI answer.

### Technical claims needing verification

**Actual contradictions** (the two responses cannot both be fully right):

| Claim | ChatGPT | Gemini | Where to verify |
|---|---|---|---|
| Where Server Components run during development | Your computer runs the dev server | "only on the remote host (Vercel)" | Next.js docs: Server and Client Components; `next dev` |
| Whether every push publishes the live site | Preview vs. production depends on branch configuration | Any push publishes the live site | Vercel docs: Git deployments, preview vs. production branch |

**Tension, not a direct contradiction:**
- Gemini says TypeScript catches "data-validation errors" and can require "a valid ZIP code." ChatGPT says TypeScript's checks do not validate submitted form data. Verify what TypeScript checks at compile time versus what needs runtime validation, and whether a type alone can enforce a *valid* ZIP code.
- Gemini says Client Components "run in the user's local browser." ChatGPT adds that they can also have initial HTML prepared on the server. Gemini's statement may be incomplete rather than wrong. Verify in the Next.js docs.

**Details only one response includes** (not contradicted, but unconfirmed):
- *Gemini:* A missing `"use client"` makes Next.js run interactive code on the server and "crash." Verify the actual error behavior.
- *Gemini:* Tailwind cannot detect class names built from variables (e.g., `"bg-" + statusColor + "-500"`). Check the Tailwind docs on dynamic class names.
- *Gemini:* Tailwind generates a single optimized CSS file. Vercel is made by the company that created Next.js.
- *Gemini:* Secrets "must be manually entered" in the Vercel dashboard.
- *ChatGPT:* `NEXT_PUBLIC_` variables can be included in browser JavaScript.
- *ChatGPT:* Environment variables must be configured for each Vercel environment.
- *ChatGPT:* `app/listings/[id]/page.tsx` creates a dynamic route like `/listings/123`.
- *ChatGPT:* The response includes links to nextjs.org, typescriptlang.org, and GitHub Docs. Open them to confirm they support the claims they're attached to.

### AI log entry – Claude's role

| Date | Tool | Purpose | Input provided | Output used | Student verification |
|---|---|---|---|---|---|
| 2026-10-23 | Claude | Organized the ChatGPT vs. Gemini comparison for Lab 1. Not a source of the stack explanation. | The original prompt plus the full ChatGPT and Gemini responses, pasted by me | Draft comparison table, draft reflection paragraph, list of claims to verify | Pending: I will check the flagged claims against official docs and revise the reflection to match my own understanding. Claude did not inspect my repository, run commands, or verify the app. |