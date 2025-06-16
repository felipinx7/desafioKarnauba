export interface Photo {
  id: string
  url: string
}

export interface DataInfoCityDTO {
  name: string
  location: string
  photos: Photo[]
  description: string
  instagram: string
  adminId: string
}
