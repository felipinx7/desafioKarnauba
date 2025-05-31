import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { CardPlacesDTO } from '@/dto/data-card-placesDTO'
import { DeletePlace } from '@/services/routes/delete-place'
import { BaseUrlPlaces } from '@/utils/base-url-card-place'
import Image from 'next/image'

export const CardPlaces = (props: CardPlacesDTO) => {
  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      <div className="relative h-[80%] w-full">
        <Image
          src={BaseUrlPlaces(props.photos[0].url, props)}
          className="h-[100%] w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
          fill
          alt="Foto de Evento"
        />
        <div className="rigth-0 absolute bottom-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => props.handleDeletePlace?.(props.id)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
          >
            <IconTrash />
          </button>
          <button className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white">
            <IconPencil />
          </button>
        </div>
      </div>
      <div className="flex h-[70%] flex-col p-3">
        <h1 className="w-[95%] break-words text-[1.1rem] font-[500] text-black">{props.name}</h1>
        <p className="text-secundarygray900">{props.description}</p>
      </div>
    </article>
  )
}
