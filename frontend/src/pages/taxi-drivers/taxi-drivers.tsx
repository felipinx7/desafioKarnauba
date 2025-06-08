"use client"

import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'
import { CardTaxi } from './components/card-taxi'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'
import { useRouter } from 'next/navigation'

export const SectionTaxiPage = () => {
  const router = useRouter()

  const handleBackPage = () => {
    router.back()
  }
  const taxistas: dataInfoTaxi[] = [
    {
      name: 'João Silva',
      photoURL: 'https://via.placeholder.com/400x250',
      instagram: 'taxista_joao',
      whatsapp: '5588999999999',
      dataInicial: '06:00',
      dataEnd: '19:00',
    },
    {
      name: 'Maria Souza',
      photoURL: 'https://via.placeholder.com/400x250',
      instagram: 'taxista_maria',
      whatsapp: '5588988888888',
      dataInicial: '08:00',
      dataEnd: '20:00',
    },
  ]

  return (
    <section className="flex flex-col items-center justify-start">
      <header className="font-poppins flex w-full items-start justify-start bg-[#194A99] px-4 py-6 text-white">
        <div className="mx-auto flex w-full max-w-6xl cursor-pointer items-center gap-2 text-left">
          <h1
            onClick={handleBackPage}
            className="flex w-auto items-center gap-3 text-2xl font-semibold lg:text-[1rem]"
          >
            <IconArrowLeft />
          </h1>
          <p className="w-auto">Área Taxista</p>
        </div>
      </header>

      <div className="m-0 grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(280,1fr))] gap-12 p-4 max-sm:grid-cols-1 ">
        {taxistas.map((taxista) => (
          <CardTaxi key={taxista.whatsapp} {...taxista} />
        ))}
      </div>
    </section>
  )
}
