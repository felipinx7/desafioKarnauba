import Image from 'next/image'
import { dataCardEventClientPage } from '@/dto/event/data-card-event-client-page-DTO'
import { backgroundclientpage } from '@/assets/image'
import { ModalEvents } from './modal-events'
import { useState } from 'react'
import { baseUrlPhoto } from '@/utils/base-url-photos'

export function CardEvent(data: dataCardEventClientPage) {
  const hasImage = !!backgroundclientpage
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
    console.log('Valor do Estado:', showModal)
  }

  const photoURL = baseUrlPhoto('event', data.photoURLs)

  return (
    <div>
      <article
        onClick={handleShowModal}
        className="group flex w-full max-w-[368px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg max-sm:w-full max-sm:max-w-full"
      >
        <div className="relative h-[229px] w-full bg-primarygray">
          {hasImage ? (
            <Image
              src={photoURL ? photoURL : backgroundclientpage}
              alt={`Imagem de ${data.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 368px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
              Sem imagem
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h6 className="line-clamp-2 text-xl font-semibold text-black">{data.name}</h6>
          <p className="line-clamp-3 text-sm text-gray-700">{data.description}</p>
        </div>
      </article>

      <ModalEvents
        active={data.active}
        id={data.id}
        date={data.date}
        onClose={() => setShowModal(false)}
        showModal={showModal}
        description={data.description}
        instagram={data.instagram}
        lastDate={data.lastDate}
        location={data.location}
        name={data.name}
        photoURLs={data.photoURLs}
      />
    </div>
  )
}
