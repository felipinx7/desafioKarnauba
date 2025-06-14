'use client'

import Image from 'next/image'
import { backgroundloginpage } from '@/assets/image'
import { IconInstagram } from '@/assets/icons/icon-instagram'
import { FC, useEffect, useState } from 'react'
import { getAllEvents } from '@/services/routes/events/get-all-events'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { dataCardEventClientPage } from '@/dto/event/data-card-event-client-page-DTO'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'

interface DataCityInfo {
  name: string
  state: string
  population?: number
  location: string
}

interface ModalEventsProps extends dataCardEventClientPage {
  onClose: () => void
  showModal: boolean
}

export const ModalEvents: FC<ModalEventsProps> = ({
  name,
  description,
  location,
  instagram,
  photoURLs,
  onClose,
  showModal,
}) => {
  const [placesSimilar, setPlacesSimilar] = useState<dataCardEventClientPage[]>([])
  const [infoCity, setInfoCity] = useState<DataCityInfo | null>(null)

  useEffect(() => {
    if (showModal) {
      const fetchPlacesSimilar = async () => {
        try {
          const response = await getAllEvents()
          if (response && typeof response === 'object') {
            const placesArray: any[] = Object.values(response)
            setPlacesSimilar(placesArray)
          } else {
            console.error('Resposta inesperada de getAllEvents:', response)
            setPlacesSimilar([])
          }
        } catch (error) {
          console.error('Erro ao buscar eventos semelhantes:', error)
          setPlacesSimilar([])
          setInfoCity(null)
        }
      }
      fetchPlacesSimilar()
    }
  }, [showModal])

  if (!showModal) return null

  const photo = baseUrlPhoto('event', photoURLs)
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`

  return (
    <section className="fixed inset-0 z-[999] h-screen w-full overflow-y-auto bg-white">
      <div className="flex items-center justify-center bg-primargreen px-4 py-3">
        <div className="flex w-full max-w-[1280px] flex-row-reverse items-center justify-end gap-4">
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <button
            onClick={onClose}
            className="hover:bg-primargreen/80 flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-white transition"
            aria-label="Voltar"
          >
            <IconArrowLeft />
            Voltar
          </button>
        </div>
      </div>

      <div className="m-auto w-full max-w-[1280px] px-4 py-8">
        {/* Main image */}
        <div className="max-h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={photo || backgroundloginpage}
            alt={`Imagem de ${name}`}
            className="h-full w-full rounded-xl object-cover"
            width={1200}
            height={400}
            priority
          />
        </div>

        {/* Title & description */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="mt-4 text-base leading-7 text-gray-700">{description}</p>
        </div>

        {/* Location map */}
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
              className="rounded-xl border-0"
            />
          </div>
        </div>

        {/* Contato */}
        {instagram && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold">Contato</h2>
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-2 text-black transition hover:bg-gray-100"
            >
              <IconInstagram />
              Instagram
            </a>
          </div>
        )}

        {/* Similar places */}
        <div className="mt-10">
          <h2 className="mb-6 text-lg font-bold">Indicações de Lugares Semelhantes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {placesSimilar.map((place, index) => (
              <div key={index} className="flex flex-col">
                {place?.photos?.map((photoItem, idx) => {
                  const photoUrl = baseUrlPhoto('event', photoItem.url)
                  return (
                    <div key={idx} className="h-[250px] w-full overflow-hidden rounded-lg">
                      <Image
                        src={photoUrl || backgroundloginpage}
                        alt={`Imagem de ${place.name}`}
                        className="h-full w-full object-cover"
                        width={400}
                        height={250}
                        priority={idx === 0}
                      />
                    </div>
                  )
                })}
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
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
