import { z } from "zod";

export const productSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  price: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;