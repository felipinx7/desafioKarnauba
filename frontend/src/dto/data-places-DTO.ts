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
