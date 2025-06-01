export interface dataCardEvent {
  name: string
  date: Date
  lastDate: Date
  description: string
  instagram: string
  location: string
  active: boolean
  photoURLs: string
  showModal?: boolean
  handleShowModal?: () => void
}
