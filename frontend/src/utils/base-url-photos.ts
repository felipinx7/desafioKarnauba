export const BASE_URL_BACK_END = 'https://karnaubaapi.onrender.com/uploads/'

export function baseUrlPhoto(type: 'city' | 'event' | 'place' | 'taxiDrivers' | "room", photoName: string) {
  if (!photoName) return null
  return `${BASE_URL_BACK_END}${type}/${photoName}`
}
