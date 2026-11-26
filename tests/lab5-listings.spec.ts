import { test, expect } from "@playwright/test";
import seed from "../data/generated/ai-studio-attempt-01.json";

const { address, local_sponsors, ...property } = seed.properties[0];
const data = { properties: [{ ...property, ...address }], sponsors: [], relationships: [] };

test("live listings show loading, empty, unavailable/retry and validated success without replacing samples", async ({ page }) => {
  expect(local_sponsors.length).toBeGreaterThan(0);
  await page.route("**/api/services", (r) => r.fulfill({ json: [] }));
  let resolveGate!: () => void;
  const gate = new Promise<void>((resolve) => { resolveGate = resolve; });
  let mode: "empty" | "error" | "success" | "invalid" = "empty";
  await page.route("**/api/listings", async (route) => {
    await gate;
    if (mode === "error") return route.fulfill({ status: 503, json: { error: "Unavailable" } });
    if (mode === "invalid") return route.fulfill({ json: { ...data, properties: [{ ...data.properties[0], owner_id: "private" }] } });
    return route.fulfill({ json: mode === "success" ? data : { properties: [], sponsors: [], relationships: [] } });
  });
  await page.goto("/");
  const region = page.getByRole("region", { name: "Approved property listings" });
  await expect(region.getByRole("status")).toHaveText(/Loading approved/);
  resolveGate();
  await expect(region.getByRole("status")).toHaveText(/No approved/);
  mode = "error";
  await page.reload();
  await expect(region.getByRole("status")).toHaveText(/temporarily unavailable/);
  mode = "invalid";
  await region.getByRole("button", { name: "Try loading listings again" }).click();
  await expect(region.getByRole("status")).toHaveText(/temporarily unavailable/);
  mode = "success";
  const retry = region.getByRole("button", { name: "Try loading listings again" });
  await retry.focus();
  await expect(retry).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(region.getByRole("article")).toHaveCount(1);
  await expect(region.getByRole("heading", { name: property.title, exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Sample property listings" }).getByRole("article")).toHaveCount(5);
});
