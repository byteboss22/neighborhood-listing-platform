import { readFileSync } from "node:fs";
import { validateListingBundle } from "../src/schemas/listing";

const filename = process.argv[2] ?? "data/fixtures/listings.synthetic.json";
try {
  const result = validateListingBundle(JSON.parse(readFileSync(filename, "utf8")));
  if (!result.success) {
    console.error(JSON.stringify({ valid: false, issues: result.issues }, null, 2));
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify({ valid: true, properties: result.data.properties.length,
      sponsors: result.data.sponsors.length, relationships: result.relationships.length }, null, 2));
  }
} catch (error) {
  console.error(JSON.stringify({ valid: false, error: error instanceof SyntaxError ? "Malformed JSON." : "Unable to read or validate the input file." }));
  process.exitCode = 1;
}
