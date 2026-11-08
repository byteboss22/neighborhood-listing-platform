# Lab 3 implementation and handoff

Working folder: `neighborhood-listing-platform-lab3` (separate Git worktree).
Branch: `lab3/data-contracts`; baseline: `lab2-baseline` at `e57a87b`.
Other lab branches and the midterm remain unchanged. This branch is not deployed.

## Implemented locally

- Strict Zod contract, inferred canonical TS types, generated JSON Schema,
  independent Ajv structural validation and cross-record integrity checks.
- Five assistant-authored fictional test records, four authored invalid JSON
  fixtures and additional boundary tests. They are not claimed AI Studio output.
- The existing Lab 2 page renders only a validated view; failures return no
  listing props and show a safe unavailable message. Original components,
  artwork and attribution remain preserved.
- ADR, generation provenance instructions, exact proposed prompts and logs.

## Commands

```bash
npm install
npm run schema:export
npm run schema:check
npm run validate:data
npm test
npm run lint
npm run build
npx tsc --noEmit
```

Run build before a standalone type check in a fresh checkout so Next generates
the project layout types. The initial pre-build type check reported missing
LayoutProps; do not change the existing layout just to suppress generated types.

## Still requires genuine external/student work

1. Run the [AI Studio and Gemini prompts](ai-prompts.md); retain raw response,
   model details and redacted Studio export/screenshot. Do not post secrets.
2. Validate actual generated output, preserve any errors, and regenerate only
   if needed. Then select the passing dataset for the UI and revalidate.
3. Student reviews assumptions, normalization decisions and AI suggestions;
   record real accepted/rejected decisions and individual contributions.
4. Commit and push only after review; open a Lab 3 PR with validator output and
   evidence. Main already includes the midterm, so the PR base/integration strategy
   must be reviewed before merging this historical-baseline branch.
5. Deploy a lab-specific preview if needed and submit actual links to Canvas.

## Later labs

The user supplied full Labs 4–7. Their branches currently start at Lab 2, not at
completed Lab 3. Bring in earlier lab changes deliberately after review; no
unimplemented feature is implied by a branch name.

- Lab 4: Team B discovery, ethical consent/invitation, simulated or approved
  interviews, eight stories, traceability, MVP, approval workflow, Project board
  and team planning issue. No outreach without instructor/participant approval.
- Lab 5: Eric + Grace; properties/sponsors/property_sponsors/profiles/inquiries
  database, isolated development migration, CRUD and RLS. Do not apply it to the
  midterm project without reviewing schema conflicts and choosing a dev target.
- Lab 6: Eric + Estevan; deterministic eligibility/selection, coarse events,
  disclosed placements, safe record-based redirect, edge-case tests and explain.
- Lab 7: Team B; licensed/owned asset inventory, optimized derivatives, facts-only
  AI copy, actual human approval/expiration, failure testing and measured LCP/page
  weight. No fabricated approvals, model outputs or performance measurements.
