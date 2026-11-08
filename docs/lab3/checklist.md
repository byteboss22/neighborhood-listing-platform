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

## Generation and final local validation

Eric supplied the [AI Studio report](../evidence/lab3/ai-studio-generation-and-review.md)
and [actual JSON](../../data/generated/ai-studio-attempt-01.json). It passed on its
first received attempt; no regeneration is claimed. The page now imports that
validated generated artifact. Gemini's static response, unchanged-prompt
confirmation and Eric's decision to defer optional hardening are recorded.

[Independent follow-up evidence](../evidence/lab3/generated-data-verification.json):
16 tests, lint, build, TypeScript, schema consistency and generated-data CLI
validation passed. Both Ajv and Zod/integrity checks cover the generated dataset;
all five properties, three sponsors, six relationships and source facts match.

## Remaining handoff

1. The [actual retrieval screenshot](../evidence/lab3/ai-studio-retrieval.png) is
   saved and visually inspected, with hash/dimensions in the provenance record.
   The displayed Studio label is Gemini 3.8 Flash; the separate Gemini critique
   model is not supplied. It does not show original generation settings.
2. Eric [reported the local page works without issues](../evidence/lab3/student-review.json).
   No item-by-item browser checklist or partner contribution is inferred. His
   generation/tool interactions and hardening decision are separately recorded.
3. Generation/review follow-up is published as `9f4620c`; initial implementation
   is `bbd6903` and publication `30eec3d`. A read-only merge check found conflicts
   against main in docs/ai-log.md, package.json, package-lock.json and
   src/app/page.tsx. Prepare a draft PR and resolve integration deliberately
   before any merge, retaining both the Lab 3 and midterm work.
4. Deploy a lab-specific preview if needed and submit actual Canvas links.

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
