import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const services = [1, 2, 3].map((i) => ({
  id: `20000000-0000-4000-8000-00000000000${i}`,
  title: `Fictional inspection ${i}`, hourly_rate: 50, duration_minutes: 30, coverage_radius_miles: 5,
}));

test.beforeEach(async ({ page }) => {
  await page.route("**/api/services", (route) => route.fulfill({ json: services }));
});

for (const [width, columns] of [[390, 1], [820, 2], [1280, 3]]) {
  test(`services grid at ${width}px has ${columns} columns, no overflow, and no automated accessibility violations`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const section = page.getByRole("region", { name: "Local services & appointments" });
    await expect(section.getByRole("article")).toHaveCount(3);
    const actualColumns = await section.locator(".grid").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(actualColumns).toBe(columns);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const results = await new AxeBuilder({ page }).include('[aria-labelledby="services-heading"]').analyze();
    expect(results.violations).toEqual([]);
  });
}

test("Tab, Shift+Tab, Enter and Space navigate/open/close booking form with visible focus", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Book appointment for Fictional inspection 1", exact: true });
  await expect(button).toBeVisible();
  for (let i = 0; i < 20 && !(await button.evaluate((element) => element === document.activeElement)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(button).toBeFocused();
  expect(await button.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe("none");
  await page.keyboard.press("Enter");
  const form = page.getByRole("form", { name: "Request appointment for Fictional inspection 1" });
  await expect(form.getByLabel("Your email")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(form.getByLabel("Requested date")).toBeFocused();
  // Native date controls have multiple browser-specific subfields. Walk forward
  // through them using Tab until notes, then verify reverse navigation as well.
  for (let i = 0; i < 6 && !(await form.getByRole("textbox", { name: /Appointment notes/ }).evaluate((element) => element === document.activeElement)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(form.getByRole("textbox", { name: /Appointment notes/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(form.getByRole("button", { name: "Request appointment", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(form.getByRole("button", { name: "Close form" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(form.getByRole("button", { name: "Request appointment", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(form).toBeHidden();
  await expect(button).toBeFocused();
  await page.keyboard.press("Space");
  await expect(form.getByLabel("Your email")).toBeFocused();
  expect((await new AxeBuilder({ page }).include('[aria-labelledby="services-heading"]').analyze()).violations).toEqual([]);
});

test("booking form posts fictional details and announces receipt", async ({ page }) => {
  await page.route("**/api/bookings", async (route) => {
    expect(route.request().postDataJSON()).toEqual({ service_id: services[0].id, client_email: "resident@example.test", requested_date: "2026-12-01", notes: "Fictional inspection request" });
    await route.fulfill({ status: 201, json: { received: true } });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Book appointment for Fictional inspection 1", exact: true }).click();
  const form = page.getByRole("form", { name: "Request appointment for Fictional inspection 1" });
  await form.getByLabel("Your email").fill("resident@example.test");
  await form.getByLabel("Requested date").fill("2026-12-01");
  await form.getByLabel(/Appointment notes/).fill("Fictional inspection request");
  await form.getByRole("button", { name: "Request appointment", exact: true }).click();
  await expect(form.getByRole("status")).toContainText("Your request was received");
});

test("empty, unavailable and invalid service data fail safely", async ({ page }) => {
  await page.route("**/api/services", (route) => route.fulfill({ json: [] }));
  await page.goto("/");
  await expect(page.getByText("No approved services are available yet.")).toBeVisible();
  await page.route("**/api/services", (route) => route.fulfill({ status: 503, json: { error: "Unavailable" } }));
  await page.reload();
  await expect(page.getByText("Local services are temporarily unavailable. Please try again later.")).toBeVisible();
  await page.route("**/api/services", (route) => route.fulfill({ json: [{ ...services[0], client_email: "private@example.test" }] }));
  await page.reload();
  await expect(page.getByText("Local services are temporarily unavailable. Please try again later.")).toBeVisible();
  await expect(page.getByText("private@example.test")).toHaveCount(0);
});
