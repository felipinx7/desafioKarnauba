import { backgroundloginpage } from "@/assets/image";
import { CardEventAndLocationProps } from "@/dto/data-card-event-DTO";

export function BaseUrl (photoURL: string, props: CardEventAndLocationProps){
     const photoUrl =
    props.photos.length > 0
      ? `http://localhost:4444/uploads/${photoURL}`
      : backgroundloginpage

      return photoUrl

}