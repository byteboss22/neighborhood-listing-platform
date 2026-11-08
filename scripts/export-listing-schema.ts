import { writeFileSync, readFileSync } from "node:fs";
import { listingJsonSchema } from "../src/schemas/listing";

const file = new URL("../schemas/listing-bundle.schema.json", import.meta.url);
const content = JSON.stringify(listingJsonSchema(), null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (readFileSync(file, "utf8") !== content) throw new Error("Exported JSON Schema is stale. Run npm run schema:export.");
  console.log("PASS: exported JSON Schema matches the Zod source.");
} else {
  writeFileSync(file, content);
  console.log("Exported schemas/listing-bundle.schema.json");
}
