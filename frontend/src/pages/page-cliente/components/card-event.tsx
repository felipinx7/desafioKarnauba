import Image from 'next/image'
import { dataCardEvent } from '@/dto/data-card-event'
import { backgroundclientpage } from '@/assets/image'
import { ModalEvents } from './modal-events'
import { useState } from 'react'

export function CardEvent(data: dataCardEvent) {
  const hasImage = !!backgroundclientpage // Suponha que isso futuramente será dinâmico
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
    console.log('Valor do Estado:', showModal)
  }

  return (
    <div className="">
      <article
        onClick={handleShowModal}
        className="group flex w-full max-w-[368px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
      >
        <div className="relative h-[229px] w-full bg-primarygray">
          {hasImage ? (
            <Image
              src={backgroundclientpage}
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
