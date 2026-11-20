# Listing and sponsor content approval — proposed workflow

Proposed review owner: Vanessa. Sources A03/A04/A05 and B03/B04/B05, with
[source-review corrections](source-review.md). Status: team-draft product policy;
it is not implemented by this documentation and is not stakeholder approval.

## Roles and states

- Author: prepares/corrects owned content and attests accuracy/permission.
- Platform reviewer: checks required facts and records a decision/reason/revision.
- Authorized release/moderation operator: publishes only an approved revision and
  can unpublish inaccurate, unsafe or expired content with a recorded reason.
- Reader: sees only the eligible public projection, not review notes or contacts.

Proposed states: Draft → In review → Approved → Published. Changes requested or
Rejected records a reason and returns work to the author. Paused, Expired and
Unpublished stop public display. These are conceptual product states, not new
columns or changes to the midterm's prescribed service-status enum.

## Property path

1. Author checks address, accurate property illustration/photo context, price,
   currency/period and availability. Private unit/contact/tenant details are
   excluded from public data (A03/A08).
2. Author sign-off submits a revision for platform review (D-02). It does not mean
   automatic publication or that a second real person has approved it.
3. Reviewer checks accuracy completeness and stated media permission; uncertain
   legal/advertising matters are held for instructor/qualified review, not
   declared compliant by a model or checkbox.
4. Approved revision can be published. Public-facing changes require re-review
   (D-03). Author freshness reconfirmation/reminder/expiry policy is unresolved;
   do not silently impose automatic property expiry from sponsor B05.

## Sponsor path

1. Author checks business identity as fictional/approved source facts, offer,
   terms, dates/times, hours where applicable, destination and image permission.
   No unsupported "best", guarantee or endorsement claim is added (B03/B04).
2. Preview shows the actual offer and visible Sponsored/Local Partner disclosure
   before submission. Preview is not publication (B04).
3. Platform reviewer checks the revision and records reason/decision. Publication
   requires approval and eligibility. Proposed UTC window is start inclusive,
   end exclusive (D-04); timezone/display details need team confirmation.
4. Offer becomes non-public at end time or authorized early pause (B05). Reminders,
   auto-renewal and sponsor appeals are not claimed requested by the source.

## Corrections and unpublishing

Anyone may report a suspected error through a future defined channel. An
authorized moderator can immediately pause/unpublish questionable content,
record the reason and affected revision privately, notify the author by an
approved method, and require corrected review before republishing. Author may
request review of a property removal (A04); a full appeal implementation is
deferred in the MVP. Do not include personal contact data or internal notes in
public records, prompts or the Git repository.

## Vanessa's review task

Check source/role distinctions, who can change state, how edits/expiry prevent
stale public claims, and which policies are team proposals. Record concrete
accept/reject/edit decisions and unresolved questions in your review file.
Do not sign as an approver or claim this future workflow already runs in the app.
