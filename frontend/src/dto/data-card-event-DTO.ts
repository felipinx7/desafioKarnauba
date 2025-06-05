import { Photo } from './data-photo-DTO'

export interface CardEventAndLocationProps {
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
