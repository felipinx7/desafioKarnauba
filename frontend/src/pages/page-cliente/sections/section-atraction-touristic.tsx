'use client'

import { getAllPlaces } from '@/services/routes/get-all-places'
import { CardPLaces } from '../components/card-places'
import { useEffect, useState } from 'react'
import { CardPlacesDTO } from '@/dto/data-card-placesDTO'

export const SectionAtractionTouristic = () => {
  const [infoPlaces, setInfoPlaces] = useState<CardPlacesDTO[]>([])

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await getAllPlaces()
      setInfoPlaces(response)
    }

    fetchPlaces()
  }, [])

  return (
    <section
      id="atraction"
      className="flex w-full max-w-[1280px] flex-col items-start justify-start gap-5"
    >
      <div className="w-full">
        <h1 className="text-[2rem] font-[700]">Principais Pontos de Interesse Turístico</h1>
        <p className="text-[1.1rem] text-[400]">
          Conheça os destinos preferidos por quem valoriza cultura, natureza e lazer.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(infoPlaces) &&
          infoPlaces
            .filter((place) => place.category === 'TOURIST_ATTRACTIONS')
            .map((place) => <CardPLaces key={place.id} {...place} />)}
      </div>
    </section>
  )
}
