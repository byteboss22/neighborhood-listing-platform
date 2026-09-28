import rawListingData from "../../data/generated/listings.raw.json";
import { validateListingDataset } from "@/contracts/validation";

const validationResult = validateListingDataset(rawListingData);

export const listingDataErrors = validationResult.success ? [] : validationResult.errors;
export const properties = validationResult.success ? validationResult.data.properties : [];
export const sponsors = validationResult.success ? validationResult.data.sponsors : [];
export const sponsor = sponsors[0] ?? null;
