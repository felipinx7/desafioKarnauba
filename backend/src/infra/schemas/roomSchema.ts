import { z } from "zod";

export const roomSchema = z.object({
    price: z.number().min(0, "Price must be a positive number"),
    available: z.boolean().default(true),
});