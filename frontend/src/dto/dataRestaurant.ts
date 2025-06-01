// @/types/location.ts

export interface LocationType {
  id: string
  name: string
  description: string
  image: string
  cityId: string
  instagram?: string
  date?: Date
  lastDate?: Date
  active: boolean
  photos: string[]
  city?: {
    id: string
    name: string
    // adicione outros campos da cidade se houver
  }
  categories: {
    id: string
    name: string
    // adicione outros campos da categoria se houver
  }[]
}
