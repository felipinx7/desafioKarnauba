export const BASE_URL_BACK_END = 'http://localhost:4444/uploads/'

export function baseUrlPhoto(type: 'city' | 'event' | 'place' | 'taxiDrivers', photoName: string) {
  if (!photoName) return null
  return `${BASE_URL_BACK_END}${type}/${photoName}`
}
