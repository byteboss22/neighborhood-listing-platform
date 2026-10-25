# CIS 3610 Lab 1 Testing

## CLI verification record

- **Execution date:** 2026-10-23
- **Timezone:** Pacific Daylight Time (UTC-07:00)
- **Environment:** Codex verification environment, Windows 11 Home; Node.js `v24.21.0`, npm `11.19.0`
- **Branch / commit tested:** `setup/app-shell` at `6fdc198` (`feat: add neighborhood platform starter page`)
- **Working-tree state at test time:** No staged files; the existing empty `docs/AI logs` file was untracked. The documentation in this folder was added after these commands ran.
- **Evidence:** Concise command transcripts are in [`docs/evidence/lab1/`](./evidence/lab1/).

| Check | Command | Result | Evidence |
|---|---|---|---|
| ESLint | `npm run lint` | **Passed**, exit code 0; ESLint reported no diagnostics. | [lint.txt](./evidence/lab1/lint.txt) |
| TypeScript | `npm exec tsc -- --noEmit` | **Passed**, exit code 0; no diagnostics. | [typescript.txt](./evidence/lab1/typescript.txt) |
| Production build | `npm run build` | **Passed**, exit code 0; production compilation, TypeScript stage, and static generation completed. | [build.txt](./evidence/lab1/build.txt) |

## Manual verification checklist

These browser checks were not performed during this verification. Complete them manually before marking them passed.

- [ ] **Pending manual verification:** Open the local page and confirm it loads.
- [ ] **Pending manual verification:** Confirm the heading, purpose statement, and three feature cards appear.
- [ ] **Pending manual verification:** Check the browser console for errors.
- [ ] **Pending manual verification:** Check that the layout is readable on a narrow screen.
- [ ] **Pending deployment:** Open the hosted URL in a private browser window and confirm it works. No hosted URL is recorded yet.

The successful build confirms the application compiled and generated its routes; it does not replace the browser checks above.
