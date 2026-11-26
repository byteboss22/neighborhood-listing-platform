### Epistemic Boundaries & Review Limitations

This critical review evaluates the supplied **CIS 3610 Lab 4** classroom exercise strictly on its internal methodological rigor, interview instrument design, and requirements traceability.

* **Confirmed Source Content:** The prompt text provided above—specifically the disclaimer framing, the 8 prompt topics (`01`–`08`), the two simulated interview scripts (`A01`–`A08` and `B01`–`B08`), the three "Differing priorities" bullets, the eight "Unknowns," and the nine "Candidate requirements" (`CR-01`–`CR-09`).
* **Model Assumptions (in the Artifact):** All interview answers are explicitly labeled as fictional classroom assumptions (`SIMULATED / ASSUMPTION`). No real property professionals or local sponsors were recruited, interviewed, or consented.
* **Reviewer Inferences:** My critique of question phrasing, identification of traceability gaps, and suggested working hypotheses are analytical deductions based on standard User-Centered Design (UCD) and Requirements Engineering principles applied to the supplied text.
* **Review Limitations:** Because zero real-world empirical data, market statistics, platform architecture constraints, or legal jurisdictions (e.g., specific municipal housing codes or privacy laws) are included in the source material, this review cannot validate whether the candidate requirements are legally compliant, technically feasible, or representative of actual user populations.

---

### 1. Critique of the 8 Discovery Interview Questions

In the provided table, the "Question" column lists abbreviated topic labels rather than full verbatim interview questions. Evaluating these prompts as interview questions reveals several methodological flaws—most notably **double-barreled bundling** (asking multiple distinct things at once) and **presupposition/leading framing** (assuming the user already has a structured workflow or uses digital tools).

| ID | Supplied Prompt | Methodological Flaws Identified | Neutral Rewrite (Preserving 8-Question Scope) | Rationale for Change |
| --- | --- | --- | --- | --- |
| **01** | *Current prep & publishing* | **Double-barreled & Leading:** Combines two distinct workflow stages (preparation and publishing) and presupposes the participant currently publishes online at all. | "Walk me through how you currently put together and share a listing or offer, from start to finish." | Uses neutral, open-ended behavioral framing ("Walk me through...") without assuming digital publishing or forcing two separate answers into one breath. |
| **02** | *Who uses it & their goals* | **Double-barreled & Speculative:** Asks the publisher to identify both the audience demographics/roles *and* their internal motivations, inviting guesswork rather than observed behavior. | "Based on your experience, who typically responds to your listings or offers, and what information do they usually ask for first?" | Anchors the question in the publisher's direct observations (who contacts them and what they ask) rather than forcing them to speculate about silent browsers' goals. |
| **03** | *What needs checking* | **Vague / Slightly Leading:** "Needs checking" implies a formal compliance or QA checklist exists, which may bias respondents toward regulatory answers rather than organic mistakes they encounter. | "What details are most critical to get right before a listing or offer goes public, and what mistakes tend to happen most often?" | Shifts from an abstract audit framing to concrete accuracy risks and common errors without leading the respondent toward legal jargon. |
| **04** | *Who reviews/approves/corrects/removes* | **Quadruple-barreled:** Bundles four distinct governance actions (pre-publish review, final sign-off, post-publish editing, and takedown/removal) into a single prompt, risking incomplete answers. | "Once a listing or offer is drafted or live, who should be able to edit, approve, or take it down?" | Consolidates the lifecycle governance roles into one clear, neutral question about permissions and control without overwhelming the participant. |
| **05** | *Changes & expiry* | **Double-barreled & Presuppositional:** Bundles mid-flight updates ("changes") with end-of-life removal ("expiry"), assuming all listings/offers use fixed expiration dates. | "How do you currently handle updates or take down a listing or offer once it is no longer available?" | Removes the assumption that automated expiry is the default mechanism, allowing the respondent to describe organic lifecycle management. |
| **06** | *Measures of usefulness* | **Ambiguous / Jargon-adjacent:** "Measures of usefulness" can be interpreted as platform usability rather than business outcomes or return on effort. | "How do you tell whether posting a listing or offer was worth your time and effort?" | Translates abstract metrics into plain, outcome-focused language that lets the respondent define success in their own terms. |
| **07** | *Accessibility & devices* | **Double-barreled & Potentially Exclusionary:** Bundles device ergonomics ("devices") with disability access ("accessibility"). Asking a non-disabled publisher about "accessibility" without context often yields guesses (as seen in `A07`/`B07`) or excludes the publisher's own assistive technology needs. | "What devices or assistive tools do you use when working, and what barriers might make it hard for you or your audience to read or use a listing?" | Separates hardware context from usability/accessibility barriers while inclusively accounting for both the publisher's and the audience's access needs. |
| **08** | *Data to avoid collecting/sharing* | **Double-barreled & Leading:** Combines internal data minimization ("avoid collecting") with public privacy ("avoid sharing"), priming the respondent to focus on privacy fears even if they hadn't considered them. | "What information should stay private or never be asked for when creating or viewing a listing or offer?" | Keeps the critical privacy/data-minimization scope intact while using simpler, non-technical phrasing ("stay private or never be asked for"). |

---

### 2. Audit of Simulated Answers, Synthesized Priorities & Candidate Requirements

#### A. Audit of Simulated Answers & Priorities

* **Role-Persona Conflation & Idealized Expertise (No crude stereotypes, but notable role assumptions):** The simulated answers avoid offensive demographic stereotypes (consistent with the prompt's note that participants have no names or demographics). However, they exhibit **designer-projection bias**: both fictional participants spontaneously volunteer technical UX concepts that typical lay users rarely articulate unprompted—such as `alt text` (`A07`, `B07`), cross-site user tracking (`B08`), contact relay forms (`A08`), and fair-housing compliance (`A03`).
* **Unsupported Claims & Internal Speculation:**
* In `A02` and `B02`, both personas speculate about audience overlap ("Neighbors browse too... I don't know if that turns into actual inquiries" / "possibly new movers... I'm not sure the people looking at homes and my customers are actually the same people"). This is appropriately flagged in Unknown #5, but represents unverified behavioral theory embedded in the simulation.
* In `A03` and `B03`, legal/regulatory rules ("fair-housing wording rules" and deceptive advertising claims like `'best in town'`) are introduced as hypothetical concerns without jurisdiction or legal basis.


* **Summary Bullet Distortion ("Differing priorities observed"):**
* Bullet 3 claims: *"Both want removal to be transparent and personal data kept to a minimum (A04, A08, B04, B08)."* While `A04` explicitly asks for takedown reasons and appeals, **`B04` never mentions content removal or takedown transparency**—`B04` only discusses pre-publish previews, platform review to prevent implied endorsement, and "sponsored" labels. Citing `B04` for removal transparency is an **unsupported synthesis claim**.



#### B. Traceability & Logic Audit of Candidate Requirements (`CR-01` to `CR-09`)

* **`CR-01` (Traces to `A04, B04`) — Moderate Traceability (Over-generalized):** `B04` explicitly requests a preview before going live. However, `A04` says *"I’d want to sign off on my own listings,"* which implies ownership/authorization control rather than specifically a UI "preview" step. Merging these into a single requirement blurs editorial approval with preview rendering.
* **`CR-02` (Traces to `A05, B05`) — Weak / Distorted Traceability:**
* `A05` asks for *"a reminder to confirm the listing is still current, **or** an expiry date"* and explicitly warns against silent automatic expiry (*"If it expired automatically without warning me, I’d be annoyed"*). `CR-02` turns an *either/or* preference into a mandatory expiry date for all listings.
* Conversely, `B05` demands hard automatic expiry (*"Offers have to disappear on their end date"*) and makes **zero mention of wanting a pre-expiry reminder**. `CR-02` forces reminders onto offers where none were requested.


* **`CR-03` (Traces to `B04`) — Strong Traceability:** Directly reflects `B04` (*"Sponsored posts should be clearly labeled"*).
* **`CR-04` (Traces to `A08`) — Strong Traceability:** Directly reflects `A08` (*"A contact form that hides my email would be better"*). Note that `B08` is omitted here because Local Sponsors direct users to external redemption rather than direct contact forms.
* **`CR-05` (Traces to `A07, B07`) — Strong Traceability, Weak Empirical Grounding:** Accurately reflects the simulated text in `A07` and `B07`, though as noted above, the requirement rests on simulated publishers guessing what disabled end-users need rather than actual accessibility testing or WCAG standards.
* **`CR-06` (Traces to `A07, B01`) — Weak / Inferred Traceability:** `A07` explicitly requires mobile publishing (*"I’d post from my phone between showings"*). However, `B01` only mentions speed (*"if posting here takes more than a few minutes, I’d probably skip it"*) and social media—it **never mentions mobile devices**. Tracing `CR-06` to `B01` is an unsupported inference.
* **`CR-07` (Traces to `A04`) — Strong Traceability (Single-Source):** Accurately captures `A04`, though it applies only to Property Professionals; Local Sponsors (`B04`) were never asked about appeals or removal notices.
* **`CR-08` (Traces to `A06, B06, B08`) — Strong Traceability with Metric Ambiguity:** Accurately synthesizes `B08` (no cross-visit tracking; totals only) with `A06` (inquiries) and `B06` (clicks/redemptions). However, `A06` also asks for *"how long a listing was up before it was filled"* and `B06` mentions tracking redemptions via a promo code—neither of which is addressed in `CR-08`.
* **`CR-09` (Traces to `A03, B03`) — Partially Supported / Omission of Key Data:** Captures price/terms, availability/dates, and image rights from `A03`/`B03`, **but drops** `A03`'s requirement for verifying the property address and accurate property photos, as well as `B03`'s requirement for business hours. Furthermore, "confirmation that the publisher has the right to use the images" is a legal checkbox, whereas `B03` asks for *"checking... that the image is one I'm allowed to use"* (an operational vs. legal distinction).

---

### 3. Working Hypotheses (Provisional Personas)

Because zero real participants were interviewed, the two roles must be treated strictly as **unvalidated working hypotheses** to guide recruitment and real discovery interviews—not as established user personas:

* **Working Hypothesis A — Independent / Small-Portfolio Property Lister:**
* *Assumed Profile:* A leasing agent, property manager, or small landlord who already maintains listing data in external tools (spreadsheets or existing property software) and posts across multiple sites (`A01`).
* *Hypothesized Core Tension:* Wants maximum control over accuracy, personal privacy, and lead quality (`A03`, `A04`, `A06`, `A08`) while minimizing duplicate manual data entry (`A01`) and working on the go between showings (`A07`).
* *Key Risk if False:* Enterprise property management firms with automated MLS/syndication feeds will reject manual mobile forms (`CR-06`), while casual individual landlords may lack spreadsheets (`A01`) and need guided templates instead.


* **Working Hypothesis B — Time-Constrained Neighborhood Merchant / Sponsor:**
* *Assumed Profile:* A local business owner or manager accustomed to quick social media promotion (`B01`) who views a neighborhood platform as a low-effort channel for time-bound deals (`B05`).
* *Hypothesized Core Tension:* Will abandon the platform if onboarding or posting takes more than a few minutes (`B01`), yet faces severe real-world customer friction if expired or out-of-stock offers remain visible (`B05`).
* *Key Risk if False:* Larger local franchises or service providers may have formal marketing compliance teams, require multi-user approval workflows, or care deeply about brand presentation—contradicting `B06`'s assumption that offer aesthetics don't matter.



---

### 4. Expanded Unknowns Requiring Real Stakeholder Confirmation

In addition to the 8 unknowns already listed in the exercise, real stakeholder discovery must resolve the following gaps exposed by this review:

1. **Duplicate Entry vs. Syndication Needs (`A01`):** Do real property professionals rely on manual entry, CSV/spreadsheet uploads, or automated API/MLS feeds?
2. **Takedown & Appeal Expectations for Sponsors (`B04` vs. `A04`):** Do local sponsors also require formal removal notices and appeal workflows (`CR-07`), or only property professionals?
3. **Device Context for Local Sponsors (`B01` vs. `B07`):** Do local sponsors actually publish offers from mobile phones (`CR-06`), or do they create offers on desktop computers while designing graphics?
4. **End-User Accessibility & Assistive Technology Needs (`A07`, `B07`):** What actual barriers do renters, buyers, and neighborhood residents with visual, motor, or cognitive disabilities face on listing platforms (beyond publisher assumptions about alt text)?
5. **Offer Expiry Notification Preferences (`B05` vs. `CR-02`):** Do local sponsors want pre-expiry reminders or auto-renewal options, or strictly hard cutoffs with zero notifications?
6. **In-Platform vs. External Redemption Tracking (`B06`, `B08`):** Are sponsors willing to use platform-generated promo codes/links for redemption metrics, or will they only use their own POS codes?
7. **Verification Burden for Address, Photos, and Business Hours (`A03`, `B03`, `CR-09`):** Who bears responsibility for verifying property addresses, photo authenticity, and business hours—self-attestation by the publisher, automated checks, or human moderators?
8. **Role Boundaries & Organizational Size:** Are real platform users solo operators (where the author is also the approver) or multi-person teams (requiring separate creator, reviewer, and billing roles)?