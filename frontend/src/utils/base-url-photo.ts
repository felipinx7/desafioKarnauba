import { backgroundloginpage } from "@/assets/image";
import { CardEventPageAdministrative } from "@/dto/event/data-card-event-DTO";

export function BaseUrl (photoURL: string, props: CardEventPageAdministrative){
     const photoUrl =
    props.photos.length > 0
      ? `http://localhost:4444/uploads/${photoURL}`
      : backgroundloginpage

      return photoUrl

}