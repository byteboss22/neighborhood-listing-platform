import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateListingDataset } from "../src/contracts/validation";

async function main() {
  const inputPath = resolve(process.argv[2] ?? "data/generated/listings.raw.json");

  try {
    const rawText = await readFile(inputPath, "utf8");
    const result = validateListingDataset(JSON.parse(rawText));

    if (!result.success) {
      console.error(`Validation failed for ${inputPath}:`);
      result.errors.forEach((error) => console.error(`- ${error}`));
      process.exitCode = 1;
    } else {
      const relationshipCount = result.data.properties.reduce(
        (total, property) => total + property.local_sponsors.length,
        0,
      );
      console.log(
        `Validation passed: ${result.data.properties.length} properties, ${result.data.sponsors.length} sponsors, ${relationshipCount} property-sponsor relationships.`,
      );
    }
  } catch (error) {
    console.error(`Could not validate ${inputPath}:`, error);
    process.exitCode = 1;
  }
}

void main();
