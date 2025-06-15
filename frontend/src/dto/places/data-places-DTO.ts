import { dataHostingSchema } from "@/schemas/places-schema"
import {z} from 'zod'
import { roomCardData } from "./roomData"


export interface dataPlaceDTO {
  id: string
  name: string
  description: string
  image: string
  cityId: string
  photos?: File[]
  city?: string
  categories?: "RESTAURANT" | "HOTEL" | "TOURIST_ATTRACTIONS" | "LANDSCAPE"
}

export interface dataHostingDTO {
  id: string,
  name: string,
  description: string,
  image: string,
  cityID:string,
  photos?: File[],
  city?: string,
  categories: "HOSTING",
  room: roomCardData
}

export type HostingDTO = z.infer<typeof dataHostingSchema>