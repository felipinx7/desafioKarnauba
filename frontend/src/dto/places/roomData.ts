import { roomSchema } from "@/schemas/room-schema"
import { z } from "zod"
import { Photo } from "../photo/data-photo-DTO"


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

export type HostingCardData = {

    id: string
     name: string
     phone: string
     instagram?: string
     location: string
     description: string
     photos: Photo[],
     category: "HOSTING",
     cityId: string
  room: {
    id: string,
    price: number,
    available: boolean,
    placeId?: string,
  }
  handleDeletePlace?: (id: string) => void
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