# Lab 4 discovery — simulated work and prepared prompts

Working copy: neighborhood-listing-platform-lab4.
Branch: lab4/discovery-requirements, fast-forwarded from its untouched Lab 2
starting point to merged main at 7a5dc1c on November 16, 2026.
The midterm and Lab 3 are preserved. This is a linked Git worktree, not a fork.

Eric chose simulated interviews. No real interview, outreach, consent,
instructor approval or team contribution is claimed. This file contains prompts
prepared by Codex. Eric subsequently supplied a Gemini critique, linked below.
The original Claude simulation was subsequently supplied. The required AI Studio
theme output is still pending; no claim is made that discovery is complete.
Historical Lab 3/midterm outputs are not reused as Lab 4 evidence.

Lab 4 explicitly requests ChatGPT discovery questions, Gemini's critique and
AI Studio themes from notes. This assistant's eight-question proposal is below.
Claude is optional simulation assistance, not silently substituted for the
required Studio step. Record the actual tool names used. Do not invent another
ChatGPT session, a stakeholder quote or a teammate's work.

## Eight proposed neutral questions

These are proposals from the actual Codex session, not stakeholder-approved
questions. Use Gemini's critique to decide whether any need revision.

1. How would you currently prepare and publish a property listing or sponsor offer?
2. Who would use that information, and what would they need to accomplish?
3. What information would need checking before it could be published?
4. Who would review, approve, correct or remove that content?
5. How would changes or expired information be handled?
6. What results would help you judge whether publishing was useful?
7. What accessibility or device needs should the workflow support?
8. What information would you prefer not to collect or share, and why?

## Claude — two simulated interviews (original response supplied)

Copy this prompt unchanged if suitable, and retain the actual response:

```text
Help with a CIS 3610 Lab 4 classroom simulation for the Neighborhood Listing
Platform. This is fictional discovery, not real stakeholder research.

Simulate two separate interviews: (A) a property professional publishing listings,
(B) a local sponsor publishing an offer. Use these role descriptions only; no
instructor personas have been supplied. Do not invent personal identities,
contact information, real business facts, consent, instructor approval, actual
interviews, demographic traits or market statistics. Do not contact anyone.

Ask each simulated participant the same eight questions:
1. How would you currently prepare and publish a property listing or sponsor offer?
2. Who would use that information, and what would they need to accomplish?
3. What information would need checking before it could be published?
4. Who would review, approve, correct or remove that content?
5. How would changes or expired information be handled?
6. What results would help you judge whether publishing was useful?
7. What accessibility or device needs should the workflow support?
8. What information would you prefer not to collect or share, and why?

For each question give a short fictional answer with a stable note ID (A01-A08
and B01-B08). Label every answer SIMULATED / ASSUMPTION. Include realistic
uncertainty and differing priorities without stereotyping or implying these
answers reflect real research. Keep privacy-invasive details out.

Finish with a list of unknowns requiring real stakeholder confirmation and a
few candidate requirements traced to the note IDs. Label those requirements
INFERENCES, not confirmed facts. Do not claim implementation, approval or tests.
Return Markdown with a prominent SIMULATED CLASSROOM EXERCISE heading.
```

Save the unchanged response/model label/date. Review it before using its notes;
do not treat generated answers as observed user behavior or approved requirements.

## Gemini — question and simulation critique (response supplied)

Attach the questions above and Claude's actual response, then send:

```text
Review this CIS 3610 Lab 4 simulated discovery exercise as a critical reviewer.
The two stakeholder roles are property professional and local sponsor. All
interview answers are fictional assumptions, not real research. No outreach or
instructor/participant consent has occurred or should be implied.

Identify leading, double-barreled, privacy-invasive or exclusionary questions.
Recommend neutral rewrites where needed, preserving exactly eight questions
covering workflow, audience, content review/approval, success and accessibility.
Explain any change instead of rewriting gratuitously.

Check the supplied simulated answers and candidate requirements for invented
facts, stereotypes, unsupported claims or weak traceability. Cite exact note
IDs/passages. Separate confirmed source content, model assumptions and your
inferences. Keep all suggested personas as working hypotheses. List unknowns
requiring real stakeholder confirmation. Do not contact anyone, claim real
interviews/approval, run tests or invent results. State review limitations.
```

If questions change, record old/new wording and reasons. Do not silently edit
Claude's raw response or claim answers to new questions were actually generated.
Either mark the mismatch or perform and retain a new genuine simulation turn.

## AI Studio — themes from reviewed simulated notes (NOT RUN)

Only after Eric reviews the notes, attach the de-identified simulation with note
IDs and send this required assignment prompt with explicit simulation context:

```text
Convert these de-identified interview notes into themes, uncertainties, and
candidate requirements. Quote no more than necessary. Mark every inference as
an inference and list questions that require stakeholder confirmation.

These are SIMULATED CLASSROOM NOTES, not real interviews. Preserve that label
throughout. For each theme/requirement cite supporting note IDs. Flag conflicts
and missing evidence rather than inventing consensus, facts or approvals.
Do not infer demographic traits, invent a stakeholder quote, contact anyone,
or claim a product feature is implemented. Return a source-to-theme table and
a list of uncertainties suitable for a student line-by-line comparison.
```

Compare the actual Studio response with the notes line by line. Record retained
and rejected claims with reasons; do not copy model approval labels as human
approval. Retain actual prompts, outputs, model labels and student decisions.

## Remaining Lab 4 deliverables

- One-page value proposition and separate facts/assumptions list.
- Interview guide, transparent invitation and consent language; no outreach.
- Two simulated working-hypothesis personas and traceable notes/themes.
- At least eight user stories, high-priority Given/When/Then criteria, owners,
  Small/Medium/Large estimates and a Week 8 MVP.
- Content approval/correction/unpublishing workflow for listings/sponsor claims.
- GitHub Project: Backlog, Ready, In Progress, Review, Done; team planning issue.
- Actual team contribution/review records, AI log, verification and PR/Canvas links.

Assigned Lab 4 team: Grace Bernardo, Estevan Figueroa, Eric Juarez and Vanessa
Palomera. Do not assign completed contributions or role rotations without their
actual participation. The existing GitHub CLI token lacks read:project scope;
prepare reviewable backlog content before requesting access for Project actions.


## Gemini critique subsequently received

Eric supplied the [actual critique](../evidence/lab4/gemini/review.md), retained
unchanged with [provenance](../evidence/lab4/gemini/provenance.json). The displayed
model and exact prompt are not yet supplied/confirmed. Its claims refer to
A01-A08/B01-B08 and CR-01..CR-09, but the original Claude response has not reached
this worktree. [Codex evaluation](../evidence/lab4/gemini/disposition.md) marks
source-dependent conclusions provisional and distinguishes suggested rewrites
from the actual eight-question proposal. No simulated answer or revised guide
has been fabricated from the critique's partial quotations.


## Claude original subsequently received — Studio source packet

Eric supplied [Claude's complete original](../evidence/lab4/claude/simulation.md)
and stated it came before the Gemini critique. Codex verified the critique against
those notes and documented [proposed source corrections](source-review.md).
The raw model responses remain unchanged. Source fidelity does not establish real
user demand. Model names and exact-prompt confirmations are still pending.

After Eric reviews the correction decisions, provide AI Studio these files:

1. docs/evidence/lab4/claude/simulation.md (raw fictional source).
2. docs/lab4/source-review.md (Codex's explicitly proposed corrections).

Use the prepared Studio prompt above. It must cite note IDs, preserve simulation
labels and distinguish source content from inference. Explain that the raw
Claude summary/candidate requirements contain known synthesis errors, so the
original answer rows are the authority. Keep the actual Studio response for a
line-by-line comparison; do not replace it with a proposed summary.

## Actual Studio theme response subsequently received — November 25, 2026

See ../evidence/lab4/ai-studio/ for raw response, prepared prompt and provenance.
The original NOT RUN sections above are historical prepared instructions. The
response reports reading both source attachments. Codex compared all numbered
items in themes-and-comparison.md. This run’s displayed model and unchanged-prompt
confirmation are still missing; do not import Lab 5 model labels as substitutes.
Final student decisions remain pending.

Eric subsequently accepted the review recommendations and reported model label
“gemini hydogen.” Earlier pending-model/decision notices are historical. His
answer did not confirm the exact prompt; the stored prepared prompt is not
misrepresented as verified verbatim submitted wording.
