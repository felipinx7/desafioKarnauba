'use client'

import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'
import { CardTaxi } from './components/card-taxi'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GetAllTaxi } from '@/services/routes/taxi/get-taxi'

export const SectionTaxiPage = () => {
  const [showTaxi, setShowTaxi] = useState<dataInfoTaxi[]>([])
  const router = useRouter()

  const handleBackToPage = () => {
    router.back()
  }

  async function fetchTaxi() {
    const response = await GetAllTaxi()
    const taxi = response?.data ?? []
    console.log('valores do taxi', taxi)
    setShowTaxi(taxi)
  }

  useEffect(() => {
    const fetchAll = async () => {
      await fetchTaxi()
    }

    fetchAll()
  }, [])

  return (
    <section className="flex flex-col items-center justify-start">
      <header className="font-poppins flex w-full items-start justify-start bg-[#194A99] px-4 py-6 text-white">
        <div className="mx-auto flex w-full max-w-6xl cursor-pointer items-center gap-2 text-left">
          <h1
            onClick={handleBackToPage}
            className="flex w-auto items-center gap-3 text-2xl font-semibold lg:text-[1rem]"
          >
            <IconArrowLeft />
          </h1>
          <p className="w-auto">Área Taxista</p>
        </div>
      </header>

      <div className="m-0 grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(280,1fr))] gap-12 p-4 max-sm:grid-cols-1">
        {showTaxi.map((taxista) => (
          <CardTaxi
            key={taxista.phone}
            id={taxista.id}
            name={taxista.name}
            phone={taxista.phone}
            photoURLs={taxista.photoURLs}
            workingDescription={taxista.workingDescription}
          />
        ))}
      </div>
    </section>
  )
}
