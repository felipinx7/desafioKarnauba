import { backgroundclientpage } from '@/assets/image'
import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import Image from 'next/image'

export const CardTaxi = (props: dataInfoTaxi) => {
  const photoBaseUrl = baseUrlPhoto("taxiDrivers", props.photoURLs[0])
  return (
    <article className="w-[300px] rounded-xl bg-white shadow-lg">
      <Image
        fill
        src={photoBaseUrl || backgroundclientpage}
        alt="Foto do taxista"
        className="h-48 w-full rounded-t-xl object-cover"
      />

      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-xl font-semibold text-[#194A99]">{props.name}</h2>

        <p className="text-sm text-gray-700">
          <strong>Instagram:</strong>{' '}
          <a
            href="https://instagram.com/taxista_joao"
            target="_blank"
            className="text-[#194A99] hover:underline"
          >
            {props.phone}
          </a>
        </p>

        <p className="text-sm text-gray-700">
          <strong>Descrição:</strong>
          {props.workingDescription}
        </p>

        <a
          href={`https://wa.me/${props.phone}`}
          target="_blank"
          className="mt-3 inline-block rounded-lg bg-[#194A99] px-4 py-2 text-center text-white transition hover:bg-[#143d7a]"
        >
          Chamar no WhatsApp
        </a>
      </div>
    </article>
  )
}