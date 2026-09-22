# Manual Layout and Accessibility Testing

Record observed results here after testing the running page. Code review entries below describe source markup only; they are not manual test passes or a claim of accessibility compliance.

Test date: Not tested yet

Browser and version: Not tested yet

Operating system: Not tested yet

## Responsive Layout Testing

Use the browser's viewport width in CSS pixels. Check the property grid, page width, and whether every filter can be used at each size.

| Viewport | Expected layout | Actual result | Pass/Fail | Notes |
|---|---|---|---|---|
| 375 px | One property card column; no horizontal overflow; filters remain usable. | Not tested yet | Not tested yet | Not tested yet |
| 768 px | Two property card columns; no horizontal overflow; filters remain usable. | Not tested yet | Not tested yet | Not tested yet |
| 1280 px | Three property card columns; no horizontal overflow; filters remain usable. | Not tested yet | Not tested yet | Not tested yet |

## Keyboard Accessibility Test

Test with **Tab** to move forward, **Shift+Tab** to move backward, **Enter** to activate the focused control, and **Space** to activate a button or interact with a native select where supported. Native select keyboard behavior can vary by browser. For each control, record whether it is reachable, whether focus is visible, whether it can be operated, and any issues. Do not use the mouse during this test.

| Control | Keys to try | Reachable with keyboard | Visible focus indicator | Operable with keyboard | Issues found |
|---|---|---|---|---|---|
| Property type select | Tab, Shift+Tab, Enter, Space | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Minimum bedrooms select | Tab, Shift+Tab, Enter, Space | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Maximum price select | Tab, Shift+Tab, Enter, Space | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Search properties button | Tab, Shift+Tab, Enter, Space | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Cedar Street Bungalow details link | Tab, Shift+Tab, Enter | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Willow Court Apartment details link | Tab, Shift+Tab, Enter | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Oak Terrace Condo details link | Tab, Shift+Tab, Enter | Not tested yet | Not tested yet | Not tested yet | Not tested yet |
| Maple & Main Coffee sponsor link | Tab, Shift+Tab, Enter | Not tested yet | Not tested yet | Not tested yet | Not tested yet |

The sample property detail URLs are placeholders for routes not yet built. Record link focus and keyboard activation separately from destination behavior.

## Heading / Semantic Review

The following items were verified by reading `src/app/page.tsx`, the three component files, `src/data/properties.ts`, and the local property illustrations. They still need any relevant browser or assistive technology checks.

- [x] One page-level `h1` appears in `page.tsx`.
- [x] The listings section has an `h2`.
- [x] Property titles use `h3` in `PropertyCard`.
- [x] Property cards use `article`.
- [x] The sponsor uses `aside`.
- [x] Each search select has a visible text label with matching `htmlFor` and `id`.
- [x] Property facts use a `ul` with `li` items.
- [x] Each sample image has descriptive `imageAlt` text corresponding to its local illustration.

## Manual Test Procedure

1. Start the development server: `npm run dev`.
2. Open [http://localhost:3000](http://localhost:3000).
3. Use browser responsive or developer tools to test viewport widths of **375 px**, **768 px**, and **1280 px**. Fill in the responsive table with what you actually observe.
4. Perform the keyboard test without using the mouse. Use **Tab**, **Shift+Tab**, **Enter**, and **Space** as described above, then fill in every keyboard row.
5. Record every failure and its reproduction steps before changing code.

### Keyboard Testing Observation

During keyboard-only navigation, Tab moved focus through the page controls, but the currently focused element was not visually obvious.

After pressing Tab several times, focus reached the filter select controls and the controls became operable, but there was no clear visible focus indicator showing which control was active beforehand.

Result: Fail

Issue:
Keyboard focus is present, but the visual focus indicator is not sufficiently visible.

Expected:
Each interactive control should show a clearly visible focus state when reached using Tab.

Next action:
Increase the visibility of focus styles on select controls, buttons, and links, then retest using Tab and Shift+Tab.

### Keyboard Navigation Failure

Observed behavior:

- Tab reaches the Property type select.
- Tab reaches the Minimum bedrooms select.
- Tab reaches the Maximum price select.
- After the third select, focus does not visibly move to the "Search properties" button.
- The keyboard focus position becomes unclear and appears to remain within the filter controls.

Expected behavior:

Tab should move through controls in this order:

1. Property type
2. Minimum bedrooms
3. Maximum price
4. Search properties button
5. Property detail links
6. Sponsor link

Result: Fail

Next action:

Investigate whether the submit button is actually receiving focus and whether its focus style is visible. Verify browser keyboard-navigation behavior before changing markup.


### Safari Keyboard Test

Browser: Safari on macOS

Observed behavior:
- Tab reached the select controls.
- Focus was not visually obvious.
- Keyboard navigation did not provide a clear path through the remaining controls.
- At times, Safari moved focus to browser chrome instead of clearly progressing through the page controls.

Result:
Needs improvement / inconclusive for complete keyboard flow.

Notes:
Safari keyboard navigation behavior may also depend on browser or macOS keyboard-navigation settings. The application focus styles should still be made more visually obvious before retesting.

### Keyboard Retest After Focus Fix

Browsers tested:
- Safari
- Chrome

Observed behavior:
- Tab moves through all three filter selects.
- Focus is now clearly visible on the active control.
- Tab continues past the dropdowns to the Search properties button.
- Keyboard navigation can continue through the remaining interactive elements.
- Select controls can be changed using the keyboard arrow keys.
- The dropdowns do not rely on mouse input.

Result:
Pass for keyboard reachability, visible focus, and operation.

Note:
Native select keyboard behavior varies by browser and operating system. Arrow keys successfully operate the controls during testing.

## Lighthouse Accessibility Audit

Browser: Chrome
URL: http://localhost:3000

### Initial Audit

Accessibility score: 100

Automated accessibility issues reported:
- None detected by Lighthouse.

Notes:
- Lighthouse reported that Chrome extensions and stored IndexedDB data may have affected page load performance.
- These warnings related to the Lighthouse run environment and performance measurement, not to the accessibility audit result.
- Manual keyboard testing was still performed separately because Lighthouse automation does not prove complete accessibility.

### Manual Testing Context

Chrome keyboard testing confirmed:
- All three select controls were reachable using Tab.
- Focus indicators were clearly visible after the focus-style improvement.
- Select controls were operable with keyboard arrow keys.
- Tab continued to the Search properties button.
- Property detail links were reachable.
- Enter activated the property links.

Safari showed different browser-level keyboard navigation behavior, so Chrome was used as the primary browser for the final manual keyboard test.