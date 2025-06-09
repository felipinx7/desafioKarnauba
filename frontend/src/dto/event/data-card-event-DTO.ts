import { Photo } from '../photo/data-photo-DTO'

//  Data of Card Event ( PAGE ADMINISTRATIVE )
export interface CardEventPageAdministrative {
  id: string
  name: string
  date: string
  lastDate: string
  active: boolean
  cityId: string
  description: string
  location: string
  instagram?: string
  photos: Photo[]
  phone: string
  handleDeleteEvent?: (id: string) => void
}
