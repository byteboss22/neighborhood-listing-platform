import { ListingDatasetSchema, type ListingDataset } from "./listing";

export type ValidationResult =
  | { success: true; data: ListingDataset }
  | { success: false; errors: string[] };

export function validateListingDataset(input: unknown): ValidationResult {
  const result = ListingDatasetSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "dataset";
      return `${path}: ${issue.message}`;
    }),
  };
}
