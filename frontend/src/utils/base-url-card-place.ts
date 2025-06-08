import { backgroundloginpage } from '@/assets/image'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'

export function BaseUrlPlaces(photoURL: string, props: CardPlacesDTO) {
  const photoUrl =
    props.photos.length > 0 ? `http://localhost:4444/uploads/${photoURL}` : backgroundloginpage

  return photoUrl
}
