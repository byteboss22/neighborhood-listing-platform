# Midterm submission evidence checklist

The assignment accepts an authorization matrix or execution log. The JSON
reports below are generated execution evidence; screenshots are optional
supporting evidence unless the instructor requests a particular format.

| Deliverable | Evidence / location | Current status |
| --- | --- | --- |
| Repository and exam PR | [Repository](https://github.com/byteboss22/neighborhood-listing-platform), [implementation PR #2](https://github.com/byteboss22/neighborhood-listing-platform/pull/2), [production evidence PR #3](https://github.com/byteboss22/neighborhood-listing-platform/pull/3) | Both PRs are merged; no open exam PR at the readiness check. Ask whether merged links are acceptable, or publish this substantive documentation follow-up in a new open PR |
| Preserved Lab 2 baseline | `lab2-baseline` at e57a87bd3b71ab5d8332d9fa8b918c42149a6b7b | Preserved |
| Implementation / verification commits | b1c51af implementation, 4a87d16 documentation, d8344a1 hosted verification framework, 366c906 hosted evidence | Published on the existing exam branch |
| Instructor collaborator | `pdt605` write-access invitation | Rechecked: invitation is unexpired and pending; direct collaborator access is not yet confirmed |
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
| AI provenance | [journal](ai-log.md), [task prompts](ai-prompts-midterm.md), [additional reviews and evaluation](evidence/midterm/ai-reviews/review-disposition.md) | Actual Google AI Studio/Gemini responses preserved; tool mapping and model label student-confirmed. Exact submitted prompts and student per-finding decisions remain pending |
| Hosted deployment | [Production app](https://neighborhood-listing-platform-puce.vercel.app), [executed production evidence](evidence/midterm/production-deployment.json) | 11 HTTP/API/security/persistence checks passed; student supplied a screenshot of the service card |
| Student / partner review | [Eric's supplied reflection](evidence/midterm/ai-reviews/review-disposition.md) | Eric reports local verification and learning about Supabase/Vercel, environment safety and iterative AI-assisted development. No new partner contribution or detailed unreported checklist is claimed |
| Canvas submission | Repository + PR + deployment links, collaborator status and evidence statement | Pending |

The student subsequently merged PR #2 and supplied the public production URL.
GitHub confirms merge commit `5633c3fb4c4774a1229f09d817b30904f69b46d3`.
The merged PR is authentic historical evidence; do not claim it remains open or
attempt to manufacture an empty replacement. Confirm the submission requirement
with the instructor. No merge/revert was performed by the deployment verifier.

The production-verification report was committed as `a422e8f` and published in
PR #3, subsequently merged at `69708ad56b82945c29cebb0322cd569b1e3d8151`.
The newer [submission readiness check](evidence/midterm/submission-readiness.json)
records public GET checks, 25 passing local tests, clean lint, and current GitHub
status. It does not replace the separately attributed live Supabase evidence.
This readiness documentation is a new local follow-up requiring publication.
Additional AI review responses and Eric's own reflection are now supplied and
preserved. Exact submitted prompts, student decisions on review findings,
collaborator acceptance and Canvas submission remain pending. Automated
production browser/keyboard testing is not claimed.

## Canvas handoff draft — review before submitting

- Repository: https://github.com/byteboss22/neighborhood-listing-platform
- Implementation PR (merged): https://github.com/byteboss22/neighborhood-listing-platform/pull/2
- Production evidence PR (merged): https://github.com/byteboss22/neighborhood-listing-platform/pull/3
- Open exam PR: **pending; do not label either merged link as open**.
- Hosted app: https://neighborhood-listing-platform-puce.vercel.app
- Collaborator statement: **An unexpired write-access invitation was sent to
  pdt605; acceptance is still pending.** Do not claim accepted access yet.
- Credential review statement: bounded scans of non-ignored files, reachable
  Git blobs and browser assets found no configured credential-pattern matches
  at the recorded checkpoints. This is evidence of the checks performed, not
  an absolute guarantee covering every possible secret format.
- Verification: 25 local tests and lint pass at the readiness checkpoint;
  historical reports contain six browser checks, 14 live role/API checks,
  eight category/mapping checks and 11 production checks. These were separate
  runs with the scope and limitations recorded in each report.
- Instructor questions: district/active-zone schema omissions, secure
  user-scoped provider authorization, deadline wording, and acceptance of
  merged PRs are documented; no instructor approval is claimed.
- AI-tool evidence: actual additional responses and student-reported model
  labels are recorded; confirm exact prompts and student review decisions.
- Personal review: Eric's supplied reflection and report of local testing are
  recorded. No unreported partner work is claimed.
