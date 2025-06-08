'use client'

import { useEffect, useState } from 'react'
import { CardPLaces } from '../components/card-places'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'
import { getAllPlaces } from '@/services/routes/places/get-all-places'

export function SectionRestaurant() {
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
      id="restaurant"
      className="flex w-full max-w-[1280px] flex-col items-start justify-start gap-5"
    >
      <div className="w-full">
        <h1 className="text-[2rem] font-[700] text-primargreen">
          Principais Restaurantes da Cidade
        </h1>
        <p className="text-[1.1rem] font-[400] text-primargreen">
          Conheça os restaurantes destaques na nossa cidade
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(infoPlaces) &&
          infoPlaces
            .filter((place) => place.category === 'RESTAURANT')
            .map((place) => <CardPLaces key={place.id} {...place} />)}
      </div>
    </section>
  )
}
