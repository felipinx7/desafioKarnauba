import { z } from "zod";

export const citySchema = z.object({
    name: z.string({required_error: "Name is required"}),
    location: z.string({required_error: "Location is required"}),
    description: z.string({required_error: "Description is required"}),
    photoURLs: z.array(z.string()).default([]),
    instagram: z.string().optional(),
});