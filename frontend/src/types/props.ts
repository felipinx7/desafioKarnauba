import { HostingCardData } from "@/dto/places/roomData"


export type CardRoomProps = {
  props: HostingCardData
  handleDeleteRoom: (id: string) => void
}