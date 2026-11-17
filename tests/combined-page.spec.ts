import { test, expect } from "@playwright/test";

test("validated Lab 3 listings and filters coexist with midterm appointment controls", async ({ page }) => {
  // Isolate interface integration from live Supabase and real booking writes.
  await page.route("**/api/services", (route) => route.fulfill({ json: [{
    id: "20000000-0000-4000-8000-000000000002",
    title: "Fictional combined-page inspection",
    hourly_rate: 80,
    duration_minutes: 60,
    coverage_radius_miles: 15,
  }] }));
  await page.goto("/");
  const listings = page.getByRole("region", { name: "Sample property listings" });
  const services = page.getByRole("region", { name: "Local services & appointments" });
  await expect(listings.getByRole("article")).toHaveCount(5);
  await expect(services.getByRole("article")).toHaveCount(1);
  await expect(page.getByText("Example Maintenance (Fictional)", { exact: true })).toBeVisible();

  await page.getByLabel("City", { exact: true }).selectOption("Maplehaven");
  await page.getByLabel(/maximum.*rent/i).fill("2000");
  await page.getByRole("button", { name: /apply filters/i }).click();
  await expect(listings.getByRole("article")).toHaveCount(1);
  await expect(listings.getByRole("heading", { name: "Maple Court Apartment", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Show details for Maple Court Apartment", exact: true }).click();
  await expect(listings.getByText(/Twelve months of rent/)).toBeVisible();

  await services.getByRole("button", { name: "Book appointment for Fictional combined-page inspection", exact: true }).click();
  await expect(services.getByRole("form", { name: "Request appointment for Fictional combined-page inspection" })).toBeVisible();
  await services.getByRole("button", { name: "Close form" }).click();
  await page.getByRole("button", { name: /clear/i }).click();
  await expect(listings.getByRole("article")).toHaveCount(5);
  await expect(services.getByRole("article")).toHaveCount(1);
});
