import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { z } from "zod";
import { ListingDatasetSchema } from "../src/contracts/listing";

async function main() {
  const destination = resolve("data/schema/listing-dataset.schema.json");
  const jsonSchema = z.toJSONSchema(ListingDatasetSchema, {
    target: "draft-2020-12",
    reused: "ref",
  });

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, `${JSON.stringify(jsonSchema, null, 2)}\n`, "utf8");
  console.log(`Generated ${destination}`);
}

void main();
