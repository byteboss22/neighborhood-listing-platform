# CIS 3610 Lab 1 verification

Author: Eric Juarez. Checks executed by Codex on **2026-10-23**, timezone **America/Los_Angeles (PDT, UTC−07:00)**.

## Tested state and environment

Branch: `setup/app-shell`, tracking `origin/setup/app-shell`.

HEAD: `2daf216a9f405c848a4c2d2559c9413ff491845e` (`feat: add neighborhood platform starter page`). The working tree was clean before documentation work. During automated checks, only documentation/evidence was being added; application and configuration files matched HEAD and nothing was staged. The final documentation has **Pending documentation commit** status. No commit, push, PR, merge, or deployment was performed.

Environment: Codex verification session on the local Mac, macOS 26.6.1 arm64, Node v24.19.0, npm 11.17.0, Git 2.55.0. These observations do not establish historical setup versions. See [environment and filename audit](evidence/lab1/environment-and-hygiene.txt).

## Executed automated checks

All timestamps below are on 2026-10-23 in America/Los_Angeles (UTC−07:00). Logs contain full start/end timestamps, command, environment, HEAD, working-tree description, exit status, and captured output. Repository/home paths are redacted when present.

| Command | Start–finish | Exit status | Actual result | Evidence |
| --- | --- | --- | --- | --- |
| `npm run lint` | 12:50:00–12:50:01 | 0 | Passed: ESLint completed without diagnostics. | [lint.txt](evidence/lab1/lint.txt) |
| `npm run build` | 12:50:00–12:50:02 | 0 | Passed: optimized build compiled, completed TypeScript, and generated static routes `/` and `/_not-found`. | [build.txt](evidence/lab1/build.txt) |
| `npx --no-install tsc --noEmit` | 12:50:02–12:50:03 | 0 | Passed: installed TypeScript 5.9.3 completed without diagnostics. | [typescript.txt](evidence/lab1/typescript.txt) |

Lint and build ran concurrently; standalone TypeScript ran after build so generated route types were available. TypeScript is supported by the existing dependency and `tsconfig.json`; there is no separate `typecheck` npm script. No additional dependency was installed. Generated build/type artifacts remain ignored.

**Failures:** None among these three commands; no correction is indicated by their outputs. No application code was changed to force a pass. A clean `npm ci` installation was not tested. These checks do not establish browser behavior, accessibility compliance, or deployment availability.

## Manual browser verification

No browser session or local development server was started in this documentation session. Source inspection confirms the intended heading/card markup and responsive classes, but does not count as a browser pass. No deployment URL or completed deployment evidence is recorded in the repository or supplied material.

| Check | Procedure | Status |
| --- | --- | --- |
| Local page loads | Run `npm run dev`; open the printed localhost URL; observe the rendered page. | Pending manual verification |
| Heading, purpose, and cards | Confirm one main heading, the project-purpose paragraph, and Listings, Neighborhood Sponsors, Voice Help cards. | Pending manual verification |
| Browser console | Open developer tools, reload, and inspect for errors. Record actual messages if any. | Pending manual verification |
| Narrow-screen readability | Use a narrow viewport (for example 375 px); check stacked cards, legible text, and no horizontal scrolling. | Pending manual verification |
| Hosted URL in private window | After deployment, open the public URL in a private/incognito window without signing in; verify the page and cards load. | Pending deployment |

Deployment URL: **Pending deployment**. Vanessa Palomera is the planned partner reviewer; her review is not complete or evidenced here. When manual checks are performed, record the date/timezone, browser, viewport, tested commit or working tree, result, reviewer, and screenshot references. Do not change a pending status based solely on this build.

## Evidence to collect

Text logs already exist for checks actually executed. Follow the [screenshot checklist](evidence/lab1/screenshot-checklist.md) to capture browser evidence manually. No screenshots or placeholder image files were created in this session.
