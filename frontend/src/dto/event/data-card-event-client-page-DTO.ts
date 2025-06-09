import { Photo } from '../photo/data-photo-DTO'

// Data of Card Event ( CLIENT PAGE )
export interface dataCardEventClientPage {
  id: string
  name: string
  date: Date
  lastDate: Date
  description: string
  instagram: string
  location: string
  active: boolean
  photoURLs: Photo[]
  showModal?: boolean
  handleShowModal?: () => void
}
