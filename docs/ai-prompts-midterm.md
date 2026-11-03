# Midterm task prompts

These are the exact task prompts that direct the implementation, copied from
the conversation. The separate Version B assignment and Labs 3–5 attachment
remain read-only external references and are not copied into this repository.
Earlier branch inspection/setup conversation is summarized in the provenance
table; the recorded branch hashes can be independently inspected in Git.

## Original implementation request

```text
I’m working in my personal repository:
https://github.com/byteboss22/neighborhood-listing-platform

I need to prepare and complete the CIS 3610 midterm practical in an isolated branch. The current project is the Lab 1/2 Neighborhood Listing Platform. Read the repository files and the midterm assignment document available in this workspace before changing code. Treat the assignment document as the source of truth.

BRANCH SAFETY
1. Inspect the current branch, HEAD, working tree, and existing branches first.
2. If there are uncommitted changes, stop and report them. Do not discard, stash, or overwrite them.
3. Create a preservation branch named `lab2-baseline` at the current `main` commit, unless it already exists. Never move or reset an existing branch.
4. Create and check out `exam/services-booking-eval` from the current `main` commit, unless it already exists. If it exists, inspect it and report its state before continuing.
5. Keep `main` and all other lab branches unchanged. Do not push, open a pull request, merge, deploy, or invite collaborators during this task. Prepare the work locally and tell me what remains for those steps.

MIDTERM WORK
First compare the current repository with the assignment and give me a short checklist of what is missing. Then implement the midterm requirements in the exam branch, preserving the existing Lab 1/2 work and its attribution.

The exam feature is a Local Merchant Services and Appointment Booking subsystem. Implement the required items from the assignment, including:

- `.gitignore` protection for `.env`, `.env*.local`, build output, and dependencies. Never add real credentials.
- `docs/requirements.md` with the three required merchant/provider, client, and admin stories; Given/When/Then acceptance criteria; scope estimates; and links to the relevant migration and route files.
- The required versioned PostgreSQL migration under `supabase/migrations/`, using the exact filename and schema requirements in the assignment.
- Row-Level Security on all required tables, with least-privilege policies and positive/negative coverage for anonymous, provider, client, and admin roles. Add `docs/security-audit.md`.
- A strict runtime data contract at `src/schemas/service.ts`.
- A server-only Supabase client at `src/lib/supabaseServer.ts`. Never expose a service-role key to browser code or use a `NEXT_PUBLIC_` prefix for it.
- The required API route handlers. This repository uses the Next.js `src/` layout, so use `src/app/api/services/route.ts` unless the project’s actual routing setup proves otherwise. GET should return only approved services and the specified public columns. POST should validate input, require the appropriate authenticated user, and return the required status codes and safe errors.
- The accessible `src/components/ServiceCard.tsx` and responsive 1/2/3-column layout, with semantic HTML and visible keyboard focus.
- Required AI provenance updates and any other documentation or evidence requested by the assignment.

IMPORTANT IMPLEMENTATION NOTES
- Reuse the repository’s existing Next.js, TypeScript, Tailwind, and `src/` conventions. Do not recreate the app from scratch.
- The assignment uses both “merchant” and “provider.” Check the full assignment and repository, choose a consistent mapping only if it is clear, and document any unresolved mismatch for me.
- The assignment’s service-role-key requirement can conflict with its requirement to enforce provider access through RLS. Do not let a service-role client bypass provider authorization. Prefer an authenticated, user-scoped server client for provider actions; reserve any elevated credential for a clearly authorized server-only admin action. Document the design and flag any interpretation that needs instructor clarification.
- Use fictional seed data only. Do not apply migrations to a production database.
- Do not invent credentials, a deployment URL, collaborator invitation, test results, or instructor approval. If something requires my account access or a decision, leave it as a clearly labeled manual step.

VALIDATION AND HANDOFF
Run the validation and security checks required by the assignment. Review the diff and confirm no secrets were added. Do not claim a check passed unless you ran it and saw it pass.

When finished, report:
1. The preservation and exam branch names and their starting commits.
2. What you implemented and the files changed.
3. Validation results and any remaining failures.
4. Any assignment contradictions or decisions needing instructor clarification.
5. Manual steps still needed, including collaborator access, hosted deployment, push, and the pull request from `exam/services-booking-eval` into `main`.

Reference materials:
- Read the midterm assignment file I provide; it is the source of truth for required deliverables.
- Also review Labs 3–5 if provided, to understand the course expectations and prior exercises.
- Treat reference files as read-only. Do not add or commit them to the project.
- If a required detail is missing or conflicts between documents, stop and report the question instead of guessing.
```

## Corrected branch authorization

```text
The working tree is clean. I fetched origin, and `origin/main` is at
e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b. It contains the completed Lab 2 app and is the required PR target.

Do not use the stale local `main` at d7f7cd4 as the base. Do not modify `main`, `setup/app-shell`, or other lab branches.

After confirming these branch names do not already exist:
1. Create `lab2-baseline` at `origin/main`.
2. Create and check out `exam/services-booking-eval` at `origin/main`.
3. Verify both point to the Lab 2 integration commit before making exam changes.
Do not push, open a PR, merge, or deploy yet.
```

## Continue implementation

```text
Branch setup is complete. Continue on `exam/services-booking-eval`.

Confirm the working tree is clean and read the full CIS 3610 midterm practical specification and Labs 3–5 reference materials available in this workspace. Implement the assignment in this branch using the existing Lab 2 app. Follow the exact midterm requirements, flag any contradictions instead of guessing, and keep `main`, `lab2-baseline`, and the other lab branches unchanged.

After implementation, run the checks required by the assignment and summarize the files changed, results, and remaining manual steps. Do not push, open a PR, merge, deploy, or invite collaborators.
```

## Resolution of schema conflict

```text
Proceed with option 1. Implement the prescribed five-table schema and explicit RLS/API requirements exactly. Do not add district or coverage-zone tables or fields.

In docs/requirements.md, document that district categorization and active coverage-zone filtering cannot be implemented from the supplied schema, and list them as questions for the instructor. Do not claim those behaviors are implemented or simulate them using coverage_radius_miles or service_categories.active_status. Continue with the other requirements, and keep the work on exam/services-booking-eval.
```

## Tools and evidence boundaries

No separate Gemini or Google AI Studio prompt was sent during this midterm
session. No outputs, account actions or model names for those tools are invented.
The student must supply genuine additional-tool evidence before calling the
assignment's multi-tool provenance deliverable complete.

Codex read the installed Next.js route-handler, environment-variable and
server/client-boundary guides before coding. Official Supabase documentation on
RLS and `auth.getUser`, Zod's API documentation, and PGlite's API documentation
were consulted. These documentation lookups are not represented as independent
AI critiques. Tests and their limitations are linked from the journal.
