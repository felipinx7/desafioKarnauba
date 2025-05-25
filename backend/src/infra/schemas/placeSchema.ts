import { z } from "zod";

export const placeSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    location: z.string({required_error: "Location is required"}),
    description: z.string({required_error: "Description is required"}),
    photoURLs: z.array(z.string()),
    category: z.enum(['hotel', 'restaurant', 'tourist_attractions']),
    phone: z.string().max(14).optional(),
    instagram: z.string().optional(),
});
