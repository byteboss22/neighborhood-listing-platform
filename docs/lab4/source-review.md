# Lab 4 source review — simulated assumptions only

Sources, in the sequence confirmed by Eric:

1. [Claude's original simulation](../evidence/lab4/claude/simulation.md): answers
   A01-A08/B01-B08, differing priorities, eight unknowns and CR-01..CR-09.
2. [Gemini's critique](../evidence/lab4/gemini/review.md).
3. This source comparison by Codex. It is an assistant's proposed disposition;
   Eric has not yet accepted/rejected the individual Lab 4 discovery findings.

Every answer is SIMULATED / ASSUMPTION. Source agreement only means a synthesis
matches this fictional text; it does not establish real demand, factual accuracy,
legal compliance, consent, team participation or instructor approval. Raw outputs
remain unchanged. Neither model's response is substituted for real research.

## Verified Gemini findings

| Source / model synthesis | Exact source comparison | Proposed disposition |
| --- | --- | --- |
| Differing-priorities bullet: both want transparent removal (A04/A08/B04/B08) | A04 asks for takedown reasons/appeal. B04 discusses preview, content review, endorsement and sponsored labels, with no removal-transparency request. A08/B08 support privacy preferences. | Correct the shared claim: privacy minimization is shared in the simulation; removal transparency is evidenced only by A04. Sponsor preference remains unknown. |
| CR-01: everyone previews and approves their own content | A04 requests property-publisher sign-off. B04 requests a sponsor preview and suggests platform review. It does not establish identical author approval/preview workflows for both. | Split the role-specific inferences; any combined approval workflow is an explicit proposed product decision, not a consensus quote. |
| CR-02: each listing/offer has expiry plus reminder | A05 says reminder to confirm freshness OR expiry, and dislikes silent automatic expiry. B05 requests offers disappear at their end date and can pause early; no reminder request. | Split property freshness from sponsor hard expiry/pause. Do not mandate expiry on every property or claim sponsor reminders were requested. |
| CR-06: mobile publishing supported by A07 and B01 | A07 explicitly says phone publishing. B01 supports quick posting, not a device. B07 supports small-screen consumption but does not establish sponsor publishing-device preference. | Scope mobile publishing evidence to A07. Keep sponsor authoring-device needs unknown; do not cite B01 as direct mobile evidence. |
| CR-08: aggregate metrics | A06 supports inquiries and asks tentatively about time-to-fill. B06 supports clicks and self-tracked redemption codes. B08 rejects personal data/cross-visit tracking. | Aggregate-only analytics is a reasonable inference, not a fully specified implementation. Explicitly defer fill-time and POS/redemption integration if outside MVP rather than claiming to cover them. |
| CR-09: complete accuracy/rights checklist | A03 includes price, availability, correct address and accurate property photos. B03 includes terms/dates, business hours and image-use permission. | Retain all candidate fields in traceability, then record any MVP exclusions explicitly. Do not claim a checkbox alone verifies image ownership or legal compliance. |
| CR-03/04/05/07 otherwise well traced | B04 supports sponsored disclosure. A08 supports property contact relay. A07/B07 support text alternatives/text details. A04 supports removal reasons/appeal for property publishers. | Keep as provisional inferences with the stated role limits; no evidence that all other stakeholder roles requested each behavior. |

## Critique limits retained after source verification

Gemini critiques the abbreviated topic labels actually used in Claude's table.
Those labels do not reproduce the full proposed eight questions in the prompt
record. Several Gemini rewrites remain multi-part; they are candidate alternatives,
not an automatically improved approved guide. Keep v1 and do not claim a revised
question set produced the existing answers. A new guide requires a new recorded
simulation or a clear answer/question mismatch label.

Claude and Gemini both introduce technically fluent publisher answers and legal
concerns. These remain role-play assumptions/unknowns. The generalization that
ordinary users rarely mention UX terms is not proven by this exercise. Do not
add personal/demographic traits or treat the persona labels as observed people.

## Candidate corrections for Studio to consider — INFERENCES, NOT APPROVED

| ID | Proposed inference | Source IDs / uncertainty |
| --- | --- | --- |
| R01 | A property publisher can sign off on their draft before submission/publication. | A04; platform review boundary is unknown. |
| R02 | A sponsor can preview an offer and see whether platform review is required. | B04; review policy needs a product decision. |
| R03 | Property publishers can reconfirm freshness; reminder/expiry alternatives require confirmation. | A05; no mandatory automatic expiry inferred. |
| R04 | Sponsor offers stop displaying at the stated end date and can be paused early. | B05; exact timezone/inclusive date behavior remains to be specified. |
| R05 | Sponsor placements visibly disclose sponsorship. | B04; disclosure wording/placement is a proposed design detail. |
| R06 | Property inquiries can use a relay rather than exposing the publisher's private contact details. | A08; data retention/delivery details unknown; sponsor use not established. |
| R07 | Property and offer information remains available as readable text with image alternatives. | A07/B07; needs accessibility verification, not publisher guesses alone. |
| R08 | Property publishing supports a mobile workflow; sponsor posting should minimize unnecessary steps. | A07/B01 separately; sponsor authoring-device preference unknown. |
| R09 | A property publisher can receive a removal reason and request review. | A04; sponsor appeal preferences unknown. |
| R10 | Prefer aggregate measures while excluding unnecessary resident identity/cross-visit tracking. | A06/B06/B08; fill-time/redemption integrations unconfirmed. |
| R11 | Draft accuracy review considers address/photos/price/availability for properties and terms/dates/hours/image permission for offers. | A03/B03; responsible verifier and applicable rules remain unknown. |

These candidate corrections are review input for the required Studio theme step,
not a completed backlog, measured usability result or statement that the current
code implements the features. Eric must decide what to retain/defer, and each
eventual high-priority story needs scope, owner and testable acceptance criteria.
