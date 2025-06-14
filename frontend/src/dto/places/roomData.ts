import { roomSchema } from "@/schemas/room-schema"
import { z } from "zod"

export type roomData = {
    price: number,
    available: boolean,
    placeId?: string,
    description?: string,
    photoURLs?: File[],
}

export type roomCardData = {
    id: string,
    price: number,
    available: boolean,
    placeId?: string,
    description?: string,
    photoURLs?: File[],
}


export type roomDTO = z.infer<typeof roomSchema>;




/*
model Room {
  id          String   @id
  price       Float
  available   Boolean @default(true)
  placeId     String
  place       Place    @relation(fields: [placeId], references: [id])
} */