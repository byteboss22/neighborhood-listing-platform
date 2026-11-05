import { z } from "zod";

export const bookingSchema = z.strictObject({
  service_id: z.uuid(),
  client_email: z.string().regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
  requested_date: z.iso.date(),
  notes: z.string().refine((value) => [...value].length >= 10, {
    message: "Notes must contain at least 10 characters.",
  }),
});
