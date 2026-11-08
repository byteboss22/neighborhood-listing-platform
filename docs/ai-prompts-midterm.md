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

## Exact follow-up requests from this conversation

The blocks below preserve the student's request wording, including typos.
Replies such as “done” and pasted SQL/test results are supporting evidence,
not reconstructed prompts to another model. The actual SQL table and generated
reports are linked from the journal rather than represented as invented model
outputs. No password, key, JWT or environment-file contents are included.

### P01 Instructor access and PR

```text
can you help me ensure the instructor is added as a colaborator
```

```text
cool can you do a pr so I can put the link
```

### P02 Take-home continuation

```text
alright so i am back to finish this midterm the procesffor gave a home version of the same exam

i'm guessing we congtinue from where we left off and finish the pending items?
```

The attached take-home assignment was compared with the earlier supplied exam.
Its contents matched after trimming surrounding whitespace; neither reference
attachment was copied into the repository.

### P03 Local configuration and Supabase setup

```text
lets take the steps to do it now can you create the local .env and make sure its git ignored and then give me the steps for supabase
```

```text
perfect just did that, can you verify If its correct and working
```

```text
oh my bad didn't save just saved it
```

Codex used the standard Next.js `.env.local` filename for the requested local
configuration. Only a blank file was created; Eric entered the actual values
privately. This ignored file is not reproduced here.

### P04 Password reset and key clarification

```text
looks like I need to reset the password fo rthe provider accounts how can I do so
```

```text
so is the admin key value different from the service key ?
```

The student subsequently pasted terminal output with this failure excerpt:

```text
New password for provider-a@example.test (12+ characters, hidden):
Confirm new password (hidden):
Reset did not finish (ERR_ASSERTION). Check the development key, matching passwords and project password policy. Earlier account updates, if reported, have already taken effect.
```

No password characters were included. The original combined local assertion was
replaced with separate retry messages for short and mismatched passwords.

### P05 Live audit failure evidence

The student supplied the runner's PASS/FAIL output, including:

```text
FAIL: Client: service submission is forbidden; profile role escalation is denied (ERR_ASSERTION)
```

The complete saved interactive report remains at
`docs/evidence/midterm/live-supabase-audit.json`. The corrected independently
executed follow-up is stored separately at
`docs/evidence/midterm/live-supabase-admin-session-audit.json`; its session
generation method is explicit. The old failure was not overwritten with a
fabricated password-run result.

### P06 Collect and publish evidence

```text
perfect yes how can we do the evidence I have the commit ready just need to figure out how to do the other stuff
```

The student then pasted the five-row SQL Editor table. Its exact table names,
boolean values and policy counts are preserved with student attribution in
`docs/evidence/midterm/hosted-rls-catalog.json`.

### P07 Vercel deployment and troubleshooting

```text
perfect so I added it to vercel and I added the secrets

[https://neighborhood-listing-platform-git-exam-serv-3868b7-eric-s-team8.vercel.app](https://neighborhood-listing-platform-git-exam-serv-3868b7-eric-s-team8.vercel.app)
```

```text
okay looks like its not reaching supabase? it doesn't have the local services and appointments
```

The second message included a screenshot showing the services section and its
temporary-unavailability fallback. It did not establish a specific Supabase
error cause. Public requests still encountered Vercel Authentication, so a
successful deployed API/booking check was not claimed. The requested next step
is to defer that troubleshooting while completing this journal.

### P08 Current journal request

```text
before I merge the branch can you help me update the AI log with what we did for the midterm lets get the last assigment compeleted and then we can figure out the supabase
```

## Prepared review prompt — subsequently used unchanged in both tools

Historical preparation status: this prompt had not been run when written.
Eric later supplied Google AI Studio and Gemini review responses, preserved in
[additional review evidence](evidence/midterm/ai-reviews/review-disposition.md).
Eric subsequently confirmed using the following prepared prompt unchanged in
both tools. It is therefore the student-confirmed submitted prompt; execution
and response limits remain documented separately.

The text below was originally prepared as a proposed prompt and was later
confirmed by Eric as the prompt used in both tools. Source context should exclude
all environment files, credentials and test-account passwords. Actual responses
are preserved separately; no test execution is inferred from prompt use.

```text
I am reviewing my CIS 3610 Version B midterm: a Local Merchant Services and
Appointment Booking subsystem in an existing Next.js src/ App Router project.
Review the source I paste below as a defensive code reviewer. Do not invent
requirements, claim to run tests, or infer facts from files I did not provide.

The assignment requires the five supplied tables (profiles, service_categories,
services, service_category_mappings, bookings), RLS on each, public approved-only
service reads, active category reads, provider-owned draft/suspended mutations,
public booking INSERT, and booking SELECT restricted to the service provider
or trusted elevated admin execution. Providers must never self-assign roles or
approve their own services. Service POST input must reject unknown properties.
GET returns only id, title, hourly_rate, duration_minutes, coverage_radius_miles.
Provider API requests must use the authenticated user's database scope; elevated
credentials must remain server-only. Service cards require semantic structure,
1/2/3 responsive columns, explicit booking names and visible keyboard focus.

The assignment also mentions districts/active coverage zones but supplies no
schema for them. My documented decision is to preserve the exact five-table
schema and flag that gap, not simulate zones with category activity or radius.

Identify specific authorization, validation, data-exposure, accessibility or
reproducibility problems. For each finding, cite the file and relevant code,
explain the impact, distinguish a confirmed defect from a hypothesis, and give
a concrete positive/negative test. If the code is already adequate on a point,
say why instead of inventing a defect. State limitations and questions requiring
the instructor. Do not output secrets, guessed test results or approval claims.

I will provide the migration, service/booking schemas, server client, API routes,
ServiceCard/ServiceExplorer, and security audit as context.
```

After actually using a tool, retain its real prompt and response/export, record
the displayed model name (or “not shown” if unavailable), date, student decisions
on findings, verification performed, and the real associated commit. A proposed
review or a response that was never obtained must remain NOT RUN. A student's
reflection must be written/confirmed by the student rather than invented here.

## P09 Student production confirmation

```text
okay now its working now that we merged to producation
```

The message included a screenshot of the rendered Fictional HVAC Inspection
service card. After Codex requested the public production URL, Eric supplied:

```text
https://neighborhood-listing-platform-puce.vercel.app
```

The URL was verified with public HTTP/API requests and one fictional booking.
The merge was independently observed through GitHub; it was not performed by
Codex. Actual execution results are saved in
`docs/evidence/midterm/production-deployment.json`, with the verification limits
and credential-handling scope stated explicitly.

## P10 Submission readiness request

```text
perfect that fixed her issue, now we can look back at my repo can you help me complete any outstanding items I have let me know if you need the assignemnt info again
```

Codex returned to Eric's repository, checked GitHub status and public production
GET endpoints, reran the 25 local tests and lint, and corrected stale publication
notes. Actual results are in `docs/evidence/midterm/submission-readiness.json`.
Missing additional AI-tool evidence and Eric's independent review were requested
from Eric; no responses, tool use, reflection or instructor approval are invented.

## P11 Additional review evidence and student reflection

Eric first reported that neither additional tool had yet been used and requested
prompts. He then asked whether the prepared prompt could be used with both
Gemini and Google AI Studio; Codex confirmed and requested the real responses
and model labels. Eric subsequently supplied both attached responses:

- Google AI Studio: [verbatim response](evidence/midterm/ai-reviews/google-ai-studio-review.txt).
- Gemini: [verbatim response](evidence/midterm/ai-reviews/gemini-review.txt).

On confirmation of tool mapping, model names and unchanged prompt use, Eric wrote:

```text
yes that is corect they were uing gminini 3.8 flash high
```

Tool mapping is confirmed and the model label is student-reported. Eric later
confirmed unchanged use of the prepared prompt in both tools. No exact tool
invocation timestamp is inferred from the response-receipt date.

Eric also supplied this reflection in response to the independent-review question:

```text
Yes I learned how to check for the connection between supabase and vercel.How to safely add the env. How to plan and begin building each piece by piece. I learned how to test locally, how to have AI assist me on the process and coding. How to verify its results by running it locally to test
```

Assistant source verification, suggested dispositions and evidence limits are
recorded in [review disposition](evidence/midterm/ai-reviews/review-disposition.md).
These are distinguished from Eric's later confirmed decision below.

## P12 Student confirmation of prompt use and review decision

```text
perfect ya I sent the prepared prompt to both toosl, and yes I agree with keeping the exam behavoir since I want to meet those requirements and we can do that as future improvements
```

This confirms the prepared prompt was used unchanged in both tools and Eric
agrees with retaining the exam behavior while deferring optional hardening.
It is not instructor approval or a new execution result.
