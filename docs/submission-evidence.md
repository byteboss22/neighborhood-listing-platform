# Midterm submission evidence checklist

The assignment accepts an authorization matrix or execution log. The JSON
reports below are generated execution evidence; screenshots are optional
supporting evidence unless the instructor requests a particular format.

| Deliverable | Evidence / location | Current status |
| --- | --- | --- |
| Repository and open exam PR | [Repository](https://github.com/byteboss22/neighborhood-listing-platform), [PR #2](https://github.com/byteboss22/neighborhood-listing-platform/pull/2) | PR open; hosted evidence published on the exam branch |
| Preserved Lab 2 baseline | `lab2-baseline` at e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b | Preserved |
| Implementation / verification commits | b1c51af implementation, 4a87d16 documentation, d8344a1 hosted verification framework, 366c906 hosted evidence | Published on the existing exam branch |
| Instructor collaborator | `pdt605` write-access invitation | Pending acceptance at last check |
| Requirements and instructor questions | [requirements](requirements.md) | Three stories, estimates and traceability present; zone/district and deadline questions documented |
| Migration | [exact versioned SQL](../supabase/migrations/20261029140000_exam_services_persistence.sql) | Applied by student to development Supabase; exercised locally and through live fixture queries |
| Hosted RLS enabled on all five tables | [catalog SQL](../supabase/tests/exam_rls_catalog.sql), [student-supplied hosted result](evidence/midterm/hosted-rls-catalog.json) | All five exist and have RLS enabled; policy counts match migration |
| Hosted roles, routes and booking privacy | [14 passing checks](evidence/midterm/live-supabase-admin-session-audit.json) | PASS; real ordinary user JWTs, admin-generated-session method explicitly recorded |
| Password login verification | [interactive report](evidence/midterm/live-supabase-audit.json) | Three password logins passed; historical combined-test failure retained and explained by corrected follow-up |
| Hosted categories and mappings | [8 passing checks](evidence/midterm/live-supabase-categories.json) | PASS using fictional active/inactive and approved/draft fixtures |
| Local constraints, RLS, routes and input validation | [test source](../tests), [initial test log](evidence/midterm/contract-api-rls-tests.txt), [follow-up record](testing-midterm.md) | 25 tests passed in follow-up; initial log preserves original 20-test run |
| Responsive UI / keyboard / automated accessibility | [browser log](evidence/midterm/browser-tests.txt) | 6 Chromium tests passed; whole-site WCAG certification is not claimed |
| Lint / build / TypeScript | [validation record](testing-midterm.md) | Passed at documented checkpoints |
| Credentials and ignore rules | [scanner](../scripts/scan-secrets.py), [initial result](evidence/midterm/secret-scan.txt) | Bounded scans found zero configured-pattern matches; rerun before final push |
| Dependency audit | [full report](evidence/midterm/dependency-audit.json), [production report](evidence/midterm/production-audit.txt) | 16 moderate development-tooling findings remain; zero production findings at last audit |
| AI provenance | [journal](ai-log.md), [task prompts](ai-prompts-midterm.md) | Codex evidence recorded; genuine additional Gemini/AI Studio evidence still required |
| Hosted deployment | Hosting dashboard and live application URL | Pending deployment and hosted smoke/booking tests |
| Student / partner review | Independent review and attributable work | Complete genuinely; do not infer from automated tests |
| Canvas submission | Repository + PR + deployment links, collaborator status and evidence statement | Pending |

The hosted catalog result is now recorded with explicit student attribution.
The evidence follow-up was published on the existing exam branch and PR #2 was
updated to describe the results and remaining work. Continue with deployment,
additional AI evidence, independent review, and final Canvas submission. Do not
merge the exam PR merely to obtain a submission link; the assignment requests an
open PR into main.
