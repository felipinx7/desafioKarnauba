import { Photo } from "./data-photo-DTO"

export interface CardEventAndLocationProps {
  name: string
  description: string
  location: string
  instagram?: string
  photos: Photo[]
}
