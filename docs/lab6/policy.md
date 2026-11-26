# Lab 6 policy — deterministic fictional prototype

This is a proposed implementation policy, not stakeholder/instructor approval.
Inputs contain approved fictional sponsor candidates and coarse PROPERTY context,
not viewer/caller identity. Strict context rejects added user/profile fields.

1. Candidate must be approved and active, explicitly allow the placement, and
   satisfy starts_at <= supplied now < ends_at. Require unambiguous ISO timestamps
   with timezone. No implicit clock, randomness or input mutation.
2. Geography: exact five-digit ZIP match, preserving leading zeroes and treating
   ZIP+4 as its parent ZIP; OR great-circle distance <= supplied coverage radius.
   Missing coordinates do not pass radius-only coverage. No numeric ZIP-distance
   approximation. Coordinates/radius must be finite and within schema bounds.
3. Rank eligible rows by descending integer priority, then ZIP over radius match
   at equal priority, then ascending stable sponsor ID using code-point comparison.
   Input order cannot change a tied result. This intentionally favors repeatable
   audit/testing rather than rotation/fairness; rotation is a future extension.
4. Unknown/malformed fields, unsafe fictional URLs, duplicate candidate IDs or
   invalid contexts produce a house fallback, never partial unvalidated output.
5. Return only sponsor ID, public business name, ZIP/radius match reason and the
   Sponsored disclosure field. Never emit internal notes, credentials or viewer
   information. No-match returns an ordinary house message, not paid endorsement.

Current candidates allow only the existing fictional example.com/org/net URL
contract; no live business URL approval or safe HTTP redirect is implied. The
future click route must independently resolve/recheck an approved stored record.

The nearby demonstration uses arbitrary fictional coordinates, NOT real ZIP
centroids or an approved geographic dataset. Great-circle distance is not road
mileage. Before using real proximity data, obtain an approved source and document
accuracy/coverage/updates; do not infer precise resident location from a ZIP.
No sensitive traits, individualized profiling or discriminatory housing targeting.

The 500-candidate/100-ZIP/radius-100-mile bounds are explicit prototype limits;
they are not additional assignment requirements or a query performance finding.
Database campaign fields, timestamps and activation must be agreed with Lab 5
rather than assumed to exist in its current sponsors table. No live migration applied; actual isolated rebuild/query evidence is in the integration runbook.

## Verified numerical boundary correction — November 25, 2026

A five-mile exact-meridian test exposed floating-point exclusion at the inclusive
radius boundary. Comparison now permits only an allowance capped by BOTH 1e-9
miles and one-billionth of the radius. The regression checks a mathematically
exact point is accepted and a 5.000001-mile point is excluded. Synthetic geometry
is still not an approved real geographic dataset. Evidence is in gemini-review.md.

## Accepted precision and equivalent-point contract — November 25, 2026

Eric accepted at most three fractional-second digits (or none) for now, starts_at
and ends_at; finer precision is rejected, never silently truncated to milliseconds.
Future campaign write/read/query contracts must honor this choice or explicitly
revise it with tests; no existing Lab 5 timestamp is silently rewritten here.
Equivalent ±180 meridians at equal latitude, identical coordinates and differing
longitudes at the same exact pole are zero distance before haversine evaluation.
Both fixes were reproduced red/green. Duplicate ZIP/placement lists remain
redundant but accepted; optional uniqueness hardening is deferred.

## Local integration implemented — November 25, 2026

The public query, disclosure/fallback UI, impression storage and safe click route
now exist locally; see integration.md for their precise boundaries. Earlier
references to future integration describe the original selector checkpoint.
SQL eligibility implements the same geometry and timestamp rules; a direct
public insertion capability records eligible anonymous events without trusted
viewership claims. No service-role key is used by these request handlers.
