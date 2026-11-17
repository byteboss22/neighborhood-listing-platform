import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

// Run after npm run build. A separate production server avoids stopping an
// existing Next dev session while verifying the exact compiled application.
export default defineConfig({
  ...base,
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
  },
});
