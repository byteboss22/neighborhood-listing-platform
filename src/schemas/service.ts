import { z } from "zod";

const pgInteger = z.number().int().max(2147483647);
const title = z.string().refine((value) => [...value].length >= 5, {
  message: "Title must contain at least 5 characters.",
});

export const serviceSchema = z.strictObject({
  title,
  hourly_rate: z.number().min(0).max(99999999.99).multipleOf(0.01),
  duration_minutes: pgInteger.min(15),
  coverage_radius_miles: pgInteger.positive(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

export const publicServiceSchema = serviceSchema.extend({ id: z.uuid() });
export const publicServicesSchema = z.array(publicServiceSchema);
export type PublicService = z.infer<typeof publicServiceSchema>;

export const PUBLIC_SERVICE_COLUMNS =
  "id,title,hourly_rate,duration_minutes,coverage_radius_miles";
