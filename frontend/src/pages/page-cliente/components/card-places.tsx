import Image from 'next/image'
import { backgroundclientpage, backgroundloginpage } from '@/assets/image'
import { CardPlacesDTO } from '@/dto/data-card-placesDTO'
import { ModalLocation } from './modal-places'
import { useState } from 'react'
import { baseUrlPhoto } from '@/utils/base-url-photos'

export function CardPLaces(data: CardPlacesDTO) {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
    console.log('Valor do Estado:', showModal)
  }

  return (
    <>
      <article
        onClick={handleShowModal}
        className="group flex h-[316px] w-[368px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
      >
        <div className="relative h-[70%] w-full bg-primarygray">
          <img
            alt={backgroundloginpage}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 368px"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h6 className="line-clamp-2 text-xl font-semibold text-black">{data.name}</h6>
          <p className="line-clamp-3 text-sm text-gray-700">{data.description}</p>
        </div>
      </article>

      <ModalLocation
        cityId={data.cityId}
        description={data.description}
        id={data.id}
        phone={data.phone}
        instagram={data.instagram}
        photos={data.photos}
        location={data.location}
        name={data.name}
        onClose={handleShowModal}
        showModal={showModal}
      />
    </>
  )
}
