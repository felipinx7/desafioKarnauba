import { Photo } from "./data-photo-DTO"

export interface CardPlacesDTO {
  id: string
  name: string
  phone: string
  instagram?: string
  location: string
  description: string
  photos: Photo[]
  category: "RESTAURANT"| "HOTEL" | "TOURIST_ATTRACTIONS" | "LANDSCAPE"
  cityId: string
  handleDeletePlace?: (id: string) => void
}
