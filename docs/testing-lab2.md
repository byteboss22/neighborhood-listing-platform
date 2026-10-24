# Lab 2 — Eric Juarez implementation verification

- Date: 2026-10-24.
- Branch: `lab2/property-components`.
- Base commit: `2b1f1fa` (completed Lab 1 merge).
- Implementation commit: **Pending implementation commit**. Verification applies
  to the uncommitted implementation on that base, not to the base commit alone.
- Performer: Codex, not Vanessa. No partner test, review or approval is claimed.
- Runtime: Node.js `v24.19.0`, npm `11.17.0`.

## Command results

All commands below were performed by Codex against this uncommitted implementation.
The existing package-lock.json was inspected and used without changing dependencies.

| Check | Command | Actual outcome |
|---|---|---|
| Lockfile install | `npm ci` | Passed, exit 0; 358 packages added, zero audit vulnerabilities reported. |
| ESLint | `npm run lint` | Passed, exit 0; no diagnostics. |
| TypeScript | `npm exec tsc -- --noEmit` | Passed, exit 0; no diagnostics, after the build generated route types. |
| Production | `npm run build` | Passed, exit 0; compilation, TypeScript and static generation completed; `/` and `/_not-found` generated. |
| Local startup | `npm run dev` | Started successfully; printed `http://localhost:3000`. |
| Whitespace | `git diff --check` | Passed, exit 0. |

Install warnings, not failures: the registry marked ESLint 9.39.5 deprecated;
npm reported a pending install-script approval for unrs-resolver 1.12.2 and a
new npm version notice. No scripts were approved and no dependencies upgraded.

### HTTP/source verification (Codex, not browser testing)

A one-off Python standard-library check used `urllib.request`, `HTMLParser` and
`ElementTree` against the development URL. It exited 0 after verifying:

- `/` returned HTTP 200 with three property images and three disclosure buttons.
- All three image URLs returned HTTP 200, `image/svg+xml`, and an 800 × 500
  SVG viewBox: `/images/maple-court.svg`, `/images/cedar-studio.svg`, and
  `/images/willow-house.svg`. Each rendered image element had descriptive alt text.
- The original `h1` and three Lab 1 `h2` headings remained. The new listing `h2`
  preceded exactly three property `h3` headings.
- The response included Studio and the expected monthly and annual USD amounts.
- The disclosure buttons had distinct `aria-controls` targets. Each matched one
  existing panel with `hidden`; each button initially had `aria-expanded="false"`.

These checks inspect the server response; they do not run hydration, click or
keyboard handlers, inspect browser console messages, or prove visual correctness.
No automated command failed. Browser behavior and partner review remain pending.

Additional one-off source checks passed (exit 0): Node's built-in assertions
imported `src/data/properties.ts` and checked exactly three records, unique IDs,
three different positive rents, at least two cities, a zero-bedroom studio, and
existing local image paths with alt text. This direct `node --input-type=module`
check emitted a MODULE_TYPELESS_PACKAGE_JSON warning when loading TypeScript;
the check passed and the project's package configuration was left unchanged.
A Python comparison against HEAD confirmed that Lab 1 evidence and the original
AI-log content were preserved; package files, config, layout and global styles
were unchanged. A filename scan found no tracked or unignored environment files,
dependency directories or generated build paths. No secret values were printed.

## Manual verification for Vanessa

### Reported Zotero hydration warning

The student reported a hydration warning showing
`data-zotero-connector-injected` on the `html` element. This session did not
observe the browser warning directly. The attribute suggests browser-extension
injection, but that cause and resolution are not confirmed by the CLI checks.
No successful retest with Zotero disabled was documented when the commit/push
session began. The student has been asked for the retest result.

**Retest status: Pending manual verification.** Disable Zotero for the local
site (or use a browser session without that extension), reload the actual
development URL with the console open, and record whether the hydration warning
returns. Do not mark this resolved until a successful retest is confirmed.

### Partner checklist

All items below are **Pending manual verification**. No controllable browser
was available in this implementation session. The previous Lab 1 browser review
does not verify these new interactive cards.

1. In the PR checkout run `npm ci`, then `npm run dev`. Open the actual Local URL
   printed by the server (use its chosen port if the default is occupied).
2. Verify the original Lab 1 heading, purpose and three introductory cards remain.
   Scroll to Sample property listings. Confirm exactly three property cards:
   Maple Court Apartment, Cedar Window Studio and Willow Porch House.
3. Confirm each illustration loads without stretching and has a visible
   fictional-property label. Compare each image with its alt text using browser
   developer tools or a screen reader. Check address/city and USD rent per month.
   Cedar Window Studio must say Studio, not zero bedrooms; all cards show bathrooms.
4. Reload with the browser console open; record any errors or warnings separately.
5. Using only Tab, reach every Show details button. Confirm a visible focus
   outline. Press Enter: only that card's panel should open and its button should
   say Hide details. Press Space: it should close without scrolling the page.
   Repeat for all three cards. Test click activation as well, and open two cards
   at once to check that their state is independent.
6. In developer tools, check that each button's `aria-controls` matches exactly
   one panel ID. `aria-expanded` must switch from false to true and back; the
   controlled panel's hidden state must match. Focus should remain on the button.
7. Inspect heading order: one page `h1`; introductory `h2` headings and the
   Sample property listings `h2`; then one `h3` per property. The visible button
   name includes its property's title. A screen reader should announce expanded
   and collapsed state. Record the reader/browser used if tested.
8. Narrow the viewport to about 320 CSS pixels and also check at 200% zoom.
   Confirm wrapping addresses/button text, readable facts, full images, and no
   horizontal scrolling or clipped focus. Check both light and dark themes.
9. Read the expanded rent-only estimate and fictional-listing notice. Verify
   annual figures: $22,200 for Maple, $15,000 for Cedar, $31,200 for Willow.
10. Compare README startup/check instructions with the commands actually used.
    Record your own results and the implementation commit tested before approval.

The listing grid intentionally has one column. Vanessa owns its final responsive
integration and the future SearchFilters/SponsorBanner components. No filter or
sponsor placeholder controls should appear. Passing automated checks or source
inspection alone does not establish accessibility compliance.

## Commit/push session verification — 2026-10-24

Codex reread AGENTS.md, inspected all modified/untracked implementation files,
confirmed `lab2/property-components` and the partner remote
`https://github.com/vp00-gtm/neighborhood-listing-platform-lab.git`, and preserved
the existing byteboss22 Git author identity. The remote branch did not yet exist
at inspection; no matching implementation commits were already present.

These are fresh checks of the completed implementation before committing:

| Command | Performer | Actual outcome |
|---|---|---|
| `npm run lint` | Codex | Passed, exit 0; no diagnostics. |
| `npm exec tsc -- --noEmit` | Codex | Passed, exit 0; no diagnostics. |
| `npm run build` | Codex | Passed, exit 0; compilation, TypeScript and static route generation completed. |

No application changes were needed to pass the checks. This session did not
repeat browser or HTTP checks and does not claim partner approval. The Zotero
retest and manual checklist remain pending. Implementation commit references
will be recorded after the logical commits exist.
