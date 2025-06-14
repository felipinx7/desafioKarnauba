import { roomCardData } from "@/dto/places/roomData"


export type CardRoomProps = {
  props: roomCardData
  handleDeleteRoom: (id: string) => void
}