import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("three fictional properties render disclosed ZIP/radius sponsors and a neutral house message", async ({ page }) => {
  const events: Record<string, unknown>[] = [];
  await page.route("**/api/sponsor-placement?**", async (route) => {
    const params = new URL(route.request().url()).searchParams;
    const id = params.get("property_id");
    const decision = id === "cedar-garden-townhouse" ? { kind: "house", message: "Explore fictional listings and neighborhood information." }
      : { kind: "sponsor", sponsor_id: id === "maple-court-apartment" ? "example-maintenance" : "example-gardens", business_name: id === "maple-court-apartment" ? "Example Maintenance (Fictional)" : "Example Gardens (Fictional)", matched_by: id === "maple-court-apartment" ? "zip" : "radius", disclosure: "Sponsored" };
    return route.fulfill({ json: decision });
  });
  await page.route("**/api/sponsor-impressions", async (route) => {
    events.push(route.request().postDataJSON());
    return route.fulfill({ status: 202, json: { received: true } });
  });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/sponsor-demo");
  await expect(page.getByRole("article")).toHaveCount(3);
  const first = page.getByRole("complementary", { name: "Local information for Maple Court Apartment", exact: true });
  const second = page.getByRole("complementary", { name: "Local information for Cedar Window Studio", exact: true });
  const third = page.getByRole("complementary", { name: "Local information for Cedar Garden Townhouse", exact: true });
  await expect(first.getByText("Sponsored", { exact: true })).toBeVisible();
  await expect(second.getByText("Sponsored", { exact: true })).toBeVisible();
  await expect(third).toHaveText("Explore fictional listings and neighborhood information.");
  await expect(third.getByRole("link")).toHaveCount(0);
  for (const region of [first, second]) await region.scrollIntoViewIfNeeded();
  await expect.poll(() => events.length).toBe(2);
  for (const event of events) expect(Object.keys(event).sort()).toEqual(["event_id", "placement", "property_id", "sponsor_id"]);
  const link = first.getByRole("link");
  await expect(link).toHaveAttribute("href", /\/api\/sponsor-click\?.*sponsor_id=example-maintenance/);
  await link.focus();
  await expect(link).toBeFocused();
  expect(await link.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("placement errors and invalid responses stay distinct from ordinary no-match, details mount only when open", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/sponsor-placement?**", (route) => {
    requests++;
    const id = new URL(route.request().url()).searchParams.get("property_id");
    return id === "maple-court-apartment" ? route.fulfill({ status: 503, json: { error: "Unavailable" } })
      : route.fulfill({ json: { kind: "sponsor", sponsor_id: "bad", business_name: "Fictional", matched_by: "zip", disclosure: "Sponsored", internal_notes: "must reject" } });
  });
  await page.goto("/sponsor-demo");
  await expect(page.getByText("Local sponsor information is temporarily unavailable.")).toHaveCount(3);
  expect(requests).toBe(3);
  await page.getByRole("button", { name: "Show details for Maple Court Apartment", exact: true }).click();
  const details = page.getByRole("complementary", { name: "Local information for Maple Court Apartment — details", exact: true });
  await expect(details.getByRole("status")).toHaveText("Local sponsor information is temporarily unavailable.");
  expect(requests).toBe(4);
  await page.getByRole("button", { name: "Hide details for Maple Court Apartment", exact: true }).click();
  await expect(details).toHaveCount(0);
});
