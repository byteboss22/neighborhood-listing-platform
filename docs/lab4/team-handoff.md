# Team handoff — three active contributors, real attribution

Assigned Team B roster: Grace Bernardo, Estevan Figueroa, Eric Juarez and Vanessa
Palomera. On November 19 Eric reported Estevan unresponsive and requested dividing
active work among Eric/Grace/Vanessa. This is workload planning, not an instructor-
approved roster change or a claim about Estevan's conduct beyond Eric's report.
No email, invitation, outreach or instructor decision is fabricated.

## Proposed responsibilities

| Person | Proposed work to inspect/edit personally | Review record | Status |
| --- | --- | --- | --- |
| Grace | interview-guide.md and invitation-and-consent.md: select eight neutral questions, privacy/consent boundaries and guide versioning | [Grace review](team/grace-review.md) | Draft assignment; confirmation/work pending |
| Vanessa | personas.md and content-approval-workflow.md: verify note IDs, role distinctions, correction/expiry and authority | [Vanessa review](team/vanessa-review.md) | Draft assignment; confirmation/work pending |
| Eric | value-proposition.md, backlog.md, mvp.md, Studio themes/comparison, board/issue and consolidated journal | [Eric review](team/eric-review.md) | Coordinating assistant-prepared draft; student decisions/Studio pending |

Both Grace (`Gracie-B-code`) and Vanessa (`vp00-gtm`) have push access at the
November 19 owner-API check. Use each student's own account/Git identity. Do not
create commits under a teammate's name or use a shared login as evidence of work.

Proposed rotation, not yet performed: during discovery review Grace facilitates,
Vanessa develops the workflow/personas, Eric handles traceability and release.
During final package review Vanessa facilitates, Eric develops backlog revisions,
Grace leads accessibility/ethics verification; Eric consolidates release evidence.
The team must confirm or revise this plan and record actual participation.

## What counts as each person's contribution

The current files are starter drafts authored with Codex at Eric's request. Each
teammate should read the relevant raw sources, make useful corrections/decisions,
and record specific findings in their own review file. A real review may accept
parts with reasons and reject/edit others. Merely adding a name, changing whitespace,
or claiming the entire starter as independently authored does not describe the work.

For each record include exact files/sections inspected, source IDs checked, real
edits or accepted/rejected choices, remaining uncertainty, any AI assistance and
actual commands/review links. Documentation review does not require claiming app
tests or real interviews. A pending template is not completed peer review.

## Clone and branch safely

Start after Eric publishes the shared branch. If a folder already exists, inspect
its branch/status; do not overwrite it or discard uncommitted work.

```bash
git clone --branch lab4/discovery-requirements --single-branch https://github.com/byteboss22/neighborhood-listing-platform.git neighborhood-lab4-review
cd neighborhood-lab4-review
git status --short --branch
git config --get user.name
git config --get user.email
```

Confirm the identity is yours. No environment keys or npm installation are needed
for these document/source reviews. Do not paste personal email or credentials
into the review. Then create your own branch (choose the appropriate name):

```bash
# Grace
git switch -c lab4/grace-discovery-review
# Vanessa instead uses: git switch -c lab4/vanessa-personas-workflow
```

If that branch already exists, inspect it instead of recreating/resetting it.
Review and edit the assigned files and your review record. Stage only those paths.

Grace example:

```bash
git add docs/lab4/interview-guide.md docs/lab4/invitation-and-consent.md docs/lab4/team/grace-review.md
git diff --cached
git diff --cached --check
git commit -m "docs: review Lab 4 discovery questions and consent"
git push -u origin HEAD
```

Vanessa example:

```bash
git add docs/lab4/personas.md docs/lab4/content-approval-workflow.md docs/lab4/team/vanessa-review.md
git diff --cached
git diff --cached --check
git commit -m "docs: review Lab 4 personas and content approval"
git push -u origin HEAD
```

Open each teammate PR **into lab4/discovery-requirements**, not main. Eric reviews
and merges genuine contributions into the shared branch. The final Lab 4 PR then
targets main. Keep branch histories/commit authors and link the actual PRs in the
contribution records. Do not merge to main or rewrite another student's history.
If access is unavailable, use a fork PR with the same target branch or ask Eric;
do not publish under someone else's account.

## Suggested assistant prompt for Grace

```text
Help me, Grace Bernardo, contribute my own Lab 4 ethics/discovery review.
Use the lab4/discovery-requirements branch of byteboss22/neighborhood-listing-platform.
Read AGENTS.md, inspect status/identity, and stop rather than overwrite existing work.
Create my personal review branch if it does not exist. Read docs/lab4/README.md,
team-handoff.md, interview-guide.md, invitation-and-consent.md, source-review.md
and the actual Claude/Gemini evidence. All interviews are simulated assumptions.
Explain weaknesses in the eight questions, privacy/consent templates and version
mapping. Let me make the decisions; do not fill review claims on my behalf.
Help me make meaningful edits and record what I actually checked in
docs/lab4/team/grace-review.md. Do not invent outreach, consent, approval, tests,
model use or team work. Prepare a diff and commit message for my review; do not
commit/push/post a review unless I explicitly authorize it. Target my eventual
PR to lab4/discovery-requirements, never main. No app-code or secret changes.
```

## Suggested assistant prompt for Vanessa

```text
Help me, Vanessa Palomera, contribute my own Lab 4 persona/workflow review.
Use the lab4/discovery-requirements branch of byteboss22/neighborhood-listing-platform.
Read AGENTS.md, inspect status/identity, and stop rather than overwrite existing work.
Create my personal review branch if absent. Read docs/lab4/README.md,
team-handoff.md, personas.md, content-approval-workflow.md, source-review.md and
the actual Claude/Gemini evidence. Verify each persona/workflow claim against
note IDs, separate author sign-off from platform approval, and separate property
freshness from sponsor expiry. Flag unsupported claims and policy assumptions.
Explain findings and let me decide. Help me make meaningful edits and record
what I actually reviewed in docs/lab4/team/vanessa-review.md. Do not invent real
interviews, demographics, legal compliance, approval, tests or tool use. Prepare
the diff for my review; do not commit/push/post unless I explicitly authorize it.
Target my eventual PR to lab4/discovery-requirements, never main. No app/secrets.
```
