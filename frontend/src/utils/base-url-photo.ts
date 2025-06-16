import { backgroundloginpage } from "@/assets/image";
import { CardEventPageAdministrative } from "@/dto/event/data-card-event-DTO";

export function BaseUrl (photoURL: string, props: CardEventPageAdministrative){
     const photoUrl =
    props.photos.length > 0
      ? `https://karnaubaapi.onrender.com/uploads/${photoURL}`
      : backgroundloginpage

      return photoUrl

}