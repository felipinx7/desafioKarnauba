import { Photo } from "./data-photo-DTO"

export interface CardEventAndLocationProps {
  id: string
  name: string
  cityId: string
  description: string
  location: string
  instagram?: string
  photos: Photo[]
  handleDeleteEvent?: (id: string) => void;
  date: string
  lastDate: string
}
