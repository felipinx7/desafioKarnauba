export interface dataCardInfoTaxiDTO {
  id: string
  name: string
  photoURLs: string[]
  phone: string
  workingDescription: string
  onDelete: (id: string) => void
}
