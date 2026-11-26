# ⚠️ SIMULATED CLASSROOM EXERCISE ⚠️
## CIS 3610 Lab 4: Neighborhood Listing Platform, Fictional Discovery Interviews

> **Every answer below is SIMULATED / ASSUMPTION.** No real stakeholders took part, no one was contacted, and nobody gave consent or approval. These notes are made-up classroom material, not research findings. The participants are described only by role. They have no names, identities, demographics or business details, and the notes include no market statistics.

---

### Interview A: Property Professional (publishes listings)

| ID | Question | Simulated answer (SIMULATED / ASSUMPTION) |
|---|---|---|
| **A01** | Current prep & publishing | "I'd probably put the details together in a spreadsheet or our own listing tool, pick the photos, and then type it all in again by hand on each site. I'm not sure a new platform would let me import what I already have, and that matters a lot to me." |
| **A02** | Who uses it & their goals | "Mostly people looking to rent or buy who want to compare places fast: price, size, availability, and whether pets are allowed. Neighbors browse too, though I don't know if that turns into actual inquiries." |
| **A03** | What needs checking | "Price, whether it's still available, the address being right, and photos that actually show this property. There might also be fair-housing wording rules, but I'd need someone to tell me exactly what applies." |
| **A04** | Who reviews/approves/corrects/removes | "I'd want to sign off on my own listings. I'm not sure whether the platform should review them as well. If a moderator can take a listing down, I'd want to be told why and have a way to appeal." |
| **A05** | Changes & expiry | "Listings go stale quickly. I'd like a reminder to confirm the listing is still current, or an expiry date on it. If it expired automatically without warning me, I'd be annoyed." |
| **A06** | Measures of usefulness | "Real inquiries I can follow up on. Views alone don't tell me much. It would also help to know how long a listing was up before it was filled, but I'm not sure the platform can know that." |
| **A07** | Accessibility & devices | "I'd post from my phone between showings, so the phone version has to work well. Renters would need photos with alt text, and the listing should say what accessibility features the unit has, like step-free entry, if it has them." |
| **A08** | Data to avoid collecting/sharing | "I don't want the exact unit number or my personal phone shown publicly, and I don't want details about the current tenants anywhere. A contact form that hides my email would be better." |

### Interview B: Local Sponsor (publishes an offer)

| ID | Question | Simulated answer (SIMULATED / ASSUMPTION) |
|---|---|---|
| **B01** | Current prep & publishing | "I'd write a short offer, add an image, and post it on social media. I don't have much time, so if posting here takes more than a few minutes, I'd probably skip it." |
| **B02** | Who uses it & their goals | "Local residents, and possibly new movers coming from the listings. They'd want to know what the offer is, when it ends, and how to redeem it. I'm not sure the people looking at homes and my customers are actually the same people." |
| **B03** | What needs checking | "The offer terms, the dates, the business hours, and that the image is one I'm allowed to use. Claims like 'best in town' might need checking, but I don't know who would do that." |
| **B04** | Who reviews/approves/corrects/removes | "I'd want a preview before anything goes live. The platform should probably review sponsored content so it doesn't look like the platform is endorsing it. Sponsored posts should be clearly labeled." |
| **B05** | Changes & expiry | "Offers have to disappear on their end date. It's bad if someone shows up for a deal that's over. I'd also like to be able to pause an offer early if we run out of stock." |
| **B06** | Measures of usefulness | "How many people redeemed it, which I'd probably track myself with a code. Clicks would be a decent sign too. I care more about this than about how the offer looks, and that might not be what listing publishers care about." |
| **B07** | Accessibility & devices | "Images need text alternatives, and redemption details shouldn't exist only inside an image. Text should be readable on small screens. It might also need a language option, but I'm not sure." |
| **B08** | Data to avoid collecting/sharing | "I don't want customers' personal information. Totals are enough. I'd also rather the platform didn't track residents across visits just to measure my offer." |

---

### Differing priorities observed (SIMULATED)
- **A** is focused on accuracy, staying in control of listings, and getting qualified leads (A03, A04, A06).
- **B** is focused on speed, clear expiry, and measuring redemptions (B01, B05, B06).
- Both want **removal to be transparent** and **personal data kept to a minimum** (A04, A08, B04, B08).

---

### Unknowns requiring real stakeholder confirmation
1. Which fair-housing or advertising-wording rules apply, and who enforces them on the platform (A03, B03)
2. Whether the platform moderates content before or after it goes live, and how much (A04, B04)
3. Whether import or bulk upload is needed, and from which formats (A01)
4. Default expiry periods for listings and for offers (A05, B05)
5. Whether listing viewers and sponsor audiences actually overlap (A02, B02)
6. Which analytics publishers can get without tracking individual users (A06, B06, B08)
7. Language and localization needs (B07)
8. How the appeal process for removed content should work (A04)

---

### Candidate requirements (INFERENCES, not confirmed facts)

| Req | Candidate requirement (INFERENCE) | Traces to |
|---|---|---|
| CR-01 | Publishers can preview and approve their own content before it is published. | A04, B04 |
| CR-02 | Each listing and offer has an expiry date, with a reminder sent before it expires. Offers can be paused manually. | A05, B05 |
| CR-03 | Sponsored offers are visibly labeled as sponsored. | B04 |
| CR-04 | Contact goes through a relay form, so publishers' direct contact details aren't shown publicly. | A08 |
| CR-05 | Every image must have alt text, and important details such as price, terms and redemption info must also appear as text. | A07, B07 |
| CR-06 | The publishing flow can be completed on a mobile device. | A07, B01 |
| CR-07 | Removed content triggers a notice to the publisher with the reason and a way to appeal. | A04 |
| CR-08 | Publishers see aggregate metrics only (such as inquiries and clicks), and individual residents are not tracked. | A06, B06, B08 |
| CR-09 | Required fields include price/terms, availability/dates, and a confirmation that the publisher has the right to use the images. | A03, B03 |

> **Status:** These are candidate requirements for class discussion only. Nothing here has been implemented, approved or tested.