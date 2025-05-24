import { z } from "zod";

export const eventSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    date: z.date({required_error: "Date is required"}),
    location: z.string({required_error: "Location is required"}),
    description: z.string({required_error: "Description is required"}),
    photoURL: z.string({required_error: "Photo URL is required"}),
    instagram: z.string().optional(),
    cityId: z.number({required_error: "City ID is required"}),
});
