# Lab 5 security matrix — baseline executed, independent expansion pending

The baseline subset ran in PGlite and mocked route tests; see
[actual local validation](../evidence/lab5/local-validation.json). This complete
matrix has not all been independently exercised. Grace owns the expanded review.

Run against an isolated PostgreSQL fixture and then a dedicated development
Supabase project where feasible. A service-role pass is trusted bypass evidence,
not proof that RLS authorized an ordinary user. Preserve actual command/results.

| Actor | Operation | Expected result |
| --- | --- | --- |
| Anonymous | Read listings | Approved public fields only; drafts/suspended rows absent |
| Anonymous | Read sponsors/relationships | Approved active sponsors; links only between public parents |
| Anonymous | Read private owner/review/inquiry fields | Denied; public projection never includes them |
| Anonymous | Create/edit listing or change profile | Denied |
| Owner A | Insert valid own draft | Succeeds with owner from verified session |
| Owner A | Update own unapproved record | Succeeds only for allowed columns |
| Owner A | Edit own approved listing or approve own draft | Denied / zero rows; state unchanged |
| Owner A | Change ownership/ID/timestamps/protected profile role | Denied; original values unchanged |
| Other user B | Read or edit A's draft/inquiries | Denied / zero rows |
| Client | Submit inquiry for approved property | Succeeds only under final validated inquiry contract |
| Client | Read other inquiries; inquire about draft | Denied |
| Profile marked admin with ordinary token | Gain elevated access merely by role label | No implicit bypass |
| Trusted operator using elevated server credential | Authorized administrative read/approval | Succeeds in explicit trusted test; never browser credential |
| Malformed route input | Unknown fields, negative price, invalid ZIP, bad FK | Safe validation error; no persistence |
| Unauthenticated route mutation | Missing/invalid/expired bearer token | Safe authentication error; no persistence |
| Database unavailable / missing env | GET and write paths | Safe unavailable state; no raw DB/credential leakage |

Also verify migrations rebuild cleanly, fictional seeds preserve referential
integrity, all exposed tables have RLS, existing midterm tests remain passing,
and fixture teardown affects only dedicated test records. Check tracked files,
reachable Git history and production browser bundles for secret exposure with
bounded output; never print credential values to logs.
