'use client'

import { LinksButtonPageCliente } from '@/constants/links-button-page-cliente'
import { SideBarCliente } from './components/side-bar'
import { IconeSearch } from '@/assets/icons/icon-search'
import Image from 'next/image'
import { backgroundclientpage, imageLogo } from '@/assets/image'
import { SectionAtractionTouristic } from './sections/section-atraction-touristic'
import { SectionEvents } from './sections/section-events'
import { SectionLandscape } from './sections/section-landscape'
import { useState } from 'react'
import { SectionRestaurant } from './sections/section-restaurant'

export const PageCliente = () => {
  const [cityName, setCityName] = useState('')

  return (
    <main className="flex min-h-[100vh] w-full flex-col justify-start">
      <SideBarCliente />

      {/* CONATINER INFO MAIN  */}
      <div id="home" className="flex w-full flex-col items-center justify-center p-4 py-[70px]">
        <h1 className="mx-auto w-full animate-typing-with-cursor overflow-hidden whitespace-nowrap break-words border-r-4 border-white text-center text-[2rem] font-bold text-primargreen max-lg:hidden sm:text-[3rem] md:text-[4.6rem] lg:w-[50%] lg:border-none">
          Qual local deseja visitar?
        </h1>

        <h1 className="max mb-5 hidden w-full text-center text-[3.1rem] font-bold leading-[70px] text-primargreen max-lg:block">
          Qual local deseja visitar?
        </h1>

        <p className="w-full text-center text-[1.1rem] font-[400] text-primargreen">
          Veja abaixo as categorias que vão guiar sua próxima descoberta.
        </p>
        <div className='max-w-[1280px] w-[100%] flex items-center justify-center'>
          <div className="flex items-center justify-end gap-3 py-7 max-lg:w-full max-lg:flex-col">
            {LinksButtonPageCliente.map((card, index) => (
              <button
                key={index}
                className="flex w-auto items-center justify-center gap-3 rounded-full bg-primargreen p-3 text-[1.1rem] font-[600] text-white max-lg:w-full"
              >
                <a href={card.href} className="flex w-auto items-center justify-center gap-4">
                  {<card.Icon />}
                  {card.name}
                </a>
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-[70%] max-lg:w-[100%]">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Digite o lugar desejado"
            className="w-[100%] rounded-full border-[0.1rem] border-[#E0E0E0] p-4 px-14 shadow-shadowInputClientePage"
          />
          <div className="absolute left-3 top-3">
            <IconeSearch />
          </div>
          <button
            className="absolute right-2 top-2 rounded-full bg-primargreen p-2.5 px-5 font-[700] text-white"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* CONTAINER PHOTO  */}
      <div className="m-auto max-w-[1280px] p-4">
        <Image src={backgroundclientpage} alt="background" />
      </div>
      <section
        id="explorer"
        className="flex w-full flex-col items-center justify-center gap-10 p-4 pt-16"
      >
        <SectionRestaurant />
        <SectionAtractionTouristic />
        <SectionEvents />
        <SectionLandscape />
      </section>
      <footer className="flex min-h-[20vh] w-full flex-col items-center justify-center gap-3 bg-primarygray max-lg:min-h-[14vh]">
        <Image src={imageLogo} width={200} alt="Image Logo" />
        <p className="font-[400]">Copyright © 2025 Massape Facisnante All Rigths Reserved</p>
      </footer>
    </main>
  )
}
