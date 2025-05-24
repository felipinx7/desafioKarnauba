import { z } from "zod";

export const citySchema = z.object({
    name: z.string({required_error: "Name is required"}),
    location: z.string({required_error: "Location is required"}),
    description: z.string({required_error: "Description is required"}),
    photoURL: z.string({required_error: "Photo URL is required"}),
    instagram: z.string().optional(),
});