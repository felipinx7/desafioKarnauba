import { Photo } from "./data-photo-DTO"

export interface dataCardEvent {
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
