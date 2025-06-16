import { backgroundclientpage } from '@/assets/image'
import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import Image from 'next/image'

export const CardTaxi = (props: dataInfoTaxi) => {
  const photoBaseUrl = baseUrlPhoto('taxiDrivers', props.photoURLs[0])
  const cleanedPhone = props.phone.replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/55${cleanedPhone}`

  return (
    <article className="flex w-[280px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl">
      {/* Imagem com fundo suave, ocupando bem o espaço */}
      <div className="relative h-[180px] w-full bg-gradient-to-tr from-[#f0f4ff] to-[#dbe8ff]">
        <Image
          src={photoBaseUrl || backgroundclientpage}
          alt="Foto do taxista"
          fill
          className="rounded-t-xl object-cover"
        />
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-2">
          <h2 className="truncate text-lg font-semibold text-[#194A99]">{props.name}</h2>

          <p className="line-clamp-3 text-sm text-gray-700">
            <strong>Descrição:</strong> {props.workingDescription}
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-[#194A99] px-4 py-2 text-center text-white transition hover:bg-[#143d7a]"
        >
          Chamar no WhatsApp
        </a>
      </div>
    </article>
  )
}
