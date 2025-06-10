export interface dataCardTaxiDTO {
  id: string
  name: string
  photoURLs: string
  phone: string
  workingDescription: string
  onDelete: (id: string) => void
}
