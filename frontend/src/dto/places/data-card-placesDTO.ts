import { Photo } from "../photo/data-photo-DTO"

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
  rooms?: {
    id: string,
    price: number,
    available: boolean,
    placeId?: string,
    description?: string,
    photoURLs?: string[],
  },
  handleDeletePlace?: (id: string) => void
}
