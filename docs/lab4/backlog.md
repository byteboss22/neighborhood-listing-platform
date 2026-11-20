# Product backlog — proposed requirements, not implemented features

Sources: [fictional notes](../evidence/lab4/claude/simulation.md) and
[corrected traceability](source-review.md). All stories are INFERENCES from a
simulation or explicitly labeled design decisions. Studio comparison/team sign-off
is pending. No real stakeholder or instructor approved this backlog.

Owners below are proposed accountable reviewers, not proof they accepted the task
or implemented a feature. Eric redistributed the active work to Eric, Grace and
Vanessa after reporting Estevan unresponsive; no formal roster change is claimed.
Small/Medium/Large are relative effort estimates, not measured hours or promises.
Every product story starts in Backlog; existing midterm services are not evidence
that these property/sponsor stories are complete.

| ID | User story | Source / distinction | Priority | Estimate | Proposed owner | MVP |
| --- | --- | --- | --- | --- | --- | --- |
| US-01 | As a property professional, I want to save and correct a listing draft, so that its address, price, availability and photos are accurate before publication. | A01/A03; field validation is a proposed implementation constraint | High | Medium | Eric | Yes |
| US-02 | As a property professional, I want to sign off on my own draft before platform review, so that I retain control of the information I submit. | A04; author sign-off differs from platform approval | High | Medium | Grace | Yes |
| US-03 | As a local sponsor, I want to preview an offer before it is reviewed and published, so that I can check its terms, dates, hours and image permission. | B03/B04; sponsor preview is not evidence every role requested identical sign-off | High | Medium | Vanessa | Yes |
| US-04 | As a local sponsor, I want an offer to stop showing at its end time and be pausable early, so that residents do not see an unavailable offer. | B05; UTC/exclusive boundary is proposed D-04 below | High | Medium | Vanessa | Yes |
| US-05 | As a resident, I want sponsored placements clearly labeled, so that I can distinguish paid content from platform information. | B04; resident wording is an inference, not a resident interview | High | Small | Grace | Yes |
| US-06 | As a property professional, I want inquiries relayed without publishing my private contact details, so that prospective residents can contact me without exposing unnecessary personal information. | A08; delivery/retention and anti-abuse rules need confirmation | Medium | Large | Eric | No |
| US-07 | As a reader, I want essential listing and offer information available in accessible text, so that I can understand it without relying only on an image. | A07/B07; reader needs are simulated publisher guesses, not accessibility-user research | High | Medium | Grace | Yes |
| US-08 | As a property professional, I want to reconfirm that my listing is current, so that stale information can be corrected without unexpected silent expiry. | A05; do not impose sponsor hard-expiry behavior on property listings | Medium | Small | Eric | No |
| US-09 | As a property professional, I want a removal reason and a way to request review, so that I can understand and contest a moderation decision. | A04; sponsor appeal preference remains unknown | Medium | Medium | Vanessa | No |
| US-10 | As a publisher, I want useful aggregate measures without resident-level tracking, so that I can assess content usefulness while minimizing personal-data collection. | A06/B06/B08; time-to-fill/POS integration explicitly deferred | Low | Large | Eric | No |

## High-priority acceptance criteria

### US-01 — accurate draft

- Given a property author, when they submit a draft missing required address/price
  or with invalid values, then the system identifies the fields and does not
  publish the content. Required fields are listed in the proposed content checklist.
- Given a valid draft, when its owner saves it, then it remains non-public and can
  be corrected before submission. Another publisher cannot change that draft.
- Given private contact/tenant details, when the public listing is assembled,
  then those details are excluded. No relay or inquiry feature is implied by
  displaying the listing.

### US-02 — author sign-off and platform review

- Given the author's valid draft, when they sign off and submit it, then the
  state becomes In review; author sign-off alone does not make it public.
- Given a different author, when they try to sign off or approve it, then the
  action is denied and the state is unchanged.
- Given an authorized platform review, when required checks pass, then approval
  records the decision and content revision before publication. The separation
  of author/moderator authority is proposed D-02, not established by A04 alone.

### US-03 — sponsor preview and content checklist

- Given a draft offer, when its author opens preview, then the visible text shows
  the intended offer, terms, dates, business hours or "not applicable", and
  sponsorship disclosure without making it public.
- Given missing offer terms/end time or absent image-permission attestation,
  when submission is attempted, then it remains draft with field-level feedback.
  Attestation alone is not independent proof of image rights.
- Given an edited approved offer, when public-facing claims change, then the new
  revision requires review before it replaces the published revision (D-03).

### US-04 — sponsor expiry and early pause

- Given an approved, unpaused offer with a future end time, when a public read
  occurs within its approved window, then it may be displayed with disclosure.
- Given now equal to or after its end timestamp, when a public read occurs, then
  the offer is excluded, including at the exact boundary. This uses proposed D-04.
- Given an authorized sponsor pauses its offer early, when the next public read
  occurs, then the offer is absent. Another sponsor cannot pause it. A client-side
  hidden element alone does not satisfy the public-read exclusion.

### US-05 — visible sponsorship

- Given a sponsor placement on a card/page, when rendered, then the text
  "Sponsored" or "Local Partner" is visible and programmatically associated
  with the placement; it is not conveyed only by color or an image.
- Given no eligible approved sponsor placement, when the region renders, then
  it does not imply a sponsor endorsement. Detailed geographic selection belongs
  to a later lab and is not invented from these notes.

### US-07 — accessible essential content

- Given listing/offer images unavailable, when the page is read, then title,
  price/terms, availability/dates and redemption instructions remain readable
  as text where applicable. Informative images have purpose-appropriate text
  alternatives; purely decorative images may use empty alt text (D-07).
- Given a keyboard user, when using Tab/Shift+Tab/Enter/Space, then publishing,
  preview and correction controls have visible focus and operable names.
- Given narrow and wide viewports, when reading the fictional fixtures, then
  essential information is not clipped. These are proposed verification cases,
  not a claim that future authoring screens already exist or pass accessibility tests.

## Explicit proposed design decisions

| ID | Decision to review | Source versus proposal |
| --- | --- | --- |
| D-02 | Separate author sign-off from platform publication approval | A04/B04 motivate controls; exact role policy is the team's proposal |
| D-03 | Public-facing edits need re-review with a revision identifier | Accuracy/review inference from A03/B03/B04; not quoted stakeholder wording |
| D-04 | Normalize offer timestamps to UTC; start inclusive/end exclusive | Defines a testable boundary absent from B05; must be team-confirmed |
| D-07 | Purpose-based image alternatives and keyboard checks | Verification/design constraints; simulated notes are not standards certification |

## Definition of Ready / Done

Ready: owner confirms responsibility, note IDs or assumption label are present,
criteria can be checked, open policy questions are documented, and dependencies
are understood. Done for a product story: implementation/evidence and actual
review meet its criteria. Writing this backlog does not complete those stories.
Done for a Lab 4 document task: its owner reviews/edits it, records real decisions
and commits/review links, and the team checks traceability and provenance.
