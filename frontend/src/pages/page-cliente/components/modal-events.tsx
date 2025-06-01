'use client'

import Image from 'next/image'
import { SideBarCliente } from './side-bar'
import { backgroundloginpage } from '@/assets/image'
import { IconInstagram } from '@/assets/icons/icon-instagram'
import { IconClosed } from '@/assets/icons/icone-closed'
import { dataCardEvent } from '@/dto/data-card-event'
import { FC, useEffect, useState } from 'react'
import { getAllEvents } from '@/services/routes/getAllEvents'
import { getInfoCity } from '@/services/routes/getInfoCity'

// Interface para dados da cidade
interface DataCityInfo {
  name: string
  state: string
  population?: number
  location: string
}

interface ModalEventsProps extends dataCardEvent {
  onClose: () => void
  showModal: boolean
}

export const ModalEvents: FC<ModalEventsProps> = ({
  name,
  description,
  location,
  instagram,
  onClose,
  showModal,
}) => {
  const [placesSimilar, setPlacesSimilar] = useState<dataCardEvent[]>([])
  const [infoCity, setInfoCity] = useState<DataCityInfo | null>(null)

  // Load similar places when modal opens
  useEffect(() => {
    if (showModal) {
      const fetchData = async () => {
        try {
          const [eventsResponse, cityResponse] = await Promise.all([getAllEvents(), getInfoCity()])

          // Se a resposta for um array de cidades, extrair todos os places
          if (Array.isArray(eventsResponse)) {
            const allPlaces = eventsResponse.flatMap((city) => city.places || [])
            setPlacesSimilar(allPlaces)
            console.log('Similar places:', allPlaces)
          }
          // Se for um objeto único (uma cidade só)
          else if (eventsResponse && typeof eventsResponse === 'object') {
            const allPlaces = eventsResponse.places || []
            setPlacesSimilar(allPlaces)
            console.log('Similar places:', allPlaces)
          } else {
            console.error('Resposta inesperada de getAllEvents:', eventsResponse)
            setPlacesSimilar([])
          }

          // Setar info da cidade
          setInfoCity(cityResponse)
          console.log('Info da cidade:', cityResponse)
        } catch (error) {
          console.error('Erro ao buscar dados:', error)
          setPlacesSimilar([])
          setInfoCity(null)
        }
      }

      fetchData()
    }
  }, [showModal])

  if (!showModal) return null

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(infoCity?.location ?? '')}&output=embed`

  return (
    <section className="fixed inset-0 z-[999] h-screen w-full overflow-y-auto bg-white">
      <div className="m-auto w-full max-w-[1280px] px-4 py-8">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="flex h-[40px] w-[40px] items-center justify-center gap-2"
        >
          <div className="text-[1.4rem]">
            <IconClosed />
          </div>
          <p className="text-[1.5rem]">Fechar</p>
        </button>

        <SideBarCliente />

        {/* Imagem principal */}
        <div className="max-h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={backgroundloginpage}
            alt="Imagem Local"
            className="h-auto w-full rounded-xl"
          />
        </div>

        {/* Título e descrição */}
        <div className="mt-6">
          <h1 className="text-[2rem] font-bold">{name}</h1>
          <p className="mt-4 text-[1rem] leading-6 text-gray-700">{description}</p>
        </div>

        {/* Mapa de localização */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Localização</h2>
          <div className="h-[300px] w-full overflow-hidden rounded-xl">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${name}`}
            ></iframe>
          </div>
        </div>

        {/* Redes sociais */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Redes Sociais</h2>
          <div className="flex flex-wrap gap-4">
            {instagram && (
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 transition hover:bg-gray-100"
              >
                <IconInstagram />
                Instagram
              </a>
            )}
          </div>
        </div>

        {/* Similar places */}
        <div className="mt-10">
          <h2 className="mb-6 text-lg font-bold">Indicações de Lugares Semelhantes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {placesSimilar.map((place, index) => (
              <div key={index} className="flex flex-col">
                <Image
                  src={backgroundloginpage}
                  alt={`Imagem de ${place.name}`}
                  className="h-auto w-full rounded-lg"
                  width={400}
                  height={250}
                />
                <span className="mt-2 font-semibold">{place.name}</span>
                <span className="text-sm text-gray-600">{place.location}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Informações da cidade */}
        {infoCity && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold">Informações da Cidade</h2>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <strong>Nome:</strong> {infoCity.name}
              </p>
              <p>
                <strong>Estado:</strong> {infoCity.state}
              </p>
              {infoCity.population && (
                <p>
                  <strong>População:</strong> {infoCity.population.toLocaleString()}
                </p>
              )}
              {/* Adicione outros campos conforme necessário */}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
