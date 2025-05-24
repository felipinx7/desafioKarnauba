import { z } from "zod";

export const placeSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    location: z.string({required_error: "Location is required"}),
    description: z.string({required_error: "Description is required"}),
    photoURL: z.string({required_error: "Photo URL is required"}),
    category: z.string({required_error: "Category is required"}),
    cityId: z.string({required_error: "City ID is required"}),
    phone: z.string().optional(),
    instagram: z.string().optional(),
});
