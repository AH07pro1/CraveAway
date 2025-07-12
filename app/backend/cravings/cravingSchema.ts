import { z } from "zod";

export const cravingSchema = z.object({
  intensity: z.number().min(1).max(10),
  notes: z.string().optional(),
  resolved: z.boolean(),
  type: z.string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string",
  }),
});
