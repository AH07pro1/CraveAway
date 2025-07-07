import { z } from "zod";

export const cravingSchema = z.object({
  intensity: z
    .number({
      required_error: "Intensity is required",
      invalid_type_error: "Intensity must be a number",
    })
    .min(1, { message: "Intensity must be at least 1" })
    .max(10, { message: "Intensity must be at most 10" }),
  notes: z.string().optional(),
  resolved: z.boolean({
    required_error: "Resolved status is required",
  }),
  type: z.enum([
    "food",
    "smoke",
    "drink",
    "cigarette",
    "vape",
    "weed",
    "cocaine",
    "heroin",
    "other",
  ], { required_error: "Type is required" }),
});
