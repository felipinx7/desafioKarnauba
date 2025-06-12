import { z } from "zod";

export const roomSchema = z.object({
    price: z.number(),
    avaliable: z.boolean().default(true),
    photoURLs: z.array(z.string()),
    description: z.string()
})

/*
model Room {
  id          String   @id
  price       Float
  available   Boolean @default(true)
  placeId     String
  place       Place    @relation(fields: [placeId], references: [id])
} */