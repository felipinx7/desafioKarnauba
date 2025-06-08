import { backgroundclientpage, backgroundloginpage } from '@/assets/image'
import { useState } from 'react'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'

export function CardTaxi(data: dataInfoTaxi) {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
    console.log('Valor do Estado:', showModal)
  }

  const photoURL = baseUrlPhoto('place', data.photoURL[0])
  console.log('photo dos lugar: ', photoURL)
  return (
    <>
      <article
        onClick={handleShowModal}
        className="group flex h-[316px] w-[368px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg max-sm:w-full"
      >
        <div className="relative h-[70%] w-full overflow-hidden bg-primarygray">
          <img
            src={photoURL ? photoURL : backgroundclientpage}
            alt={backgroundloginpage}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 368px"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h6 className="line-clamp-2 text-xl font-semibold text-black">{data.name}</h6>
          <p className="line-clamp-3 text-sm text-gray-700">Instagram: {data.instagram}</p>
          <p className="line-clamp-3 text-sm text-gray-700">Whatsapp: {data.whatsapp}</p>
        </div>
      </article>
    </>
  )
}
