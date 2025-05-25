import { z } from "zod";

export const eventSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    date: z.date({required_error: "Date is required"}),
    location: z.string({required_error: "Location is required"}),
    description: z.string({required_error: "Description is required"}),
    active: z.boolean({required_error: "Active is required"}),
    photoURLs: z.array(z.string()),
    instagram: z.string().optional(),
});
