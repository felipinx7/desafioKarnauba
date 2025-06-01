'use client'

import { LinksButtonPageCliente } from '@/constants/links-button-page-cliente'
import { SideBarCliente } from './components/side-bar'
import { IconeSearch } from '@/assets/icons/icon-search'
import Image from 'next/image'
import { backgroundclientpage, backgroundloginpage, imageLogo } from '@/assets/image'
import { SectionAtractionTouristic } from './sections/section-atraction-touristic'
import { SectionEvents } from './sections/section-events'
import { SectionLandscape } from './sections/section-landscape'
import { ModalLocation } from './components/modal-places'
import { useState } from 'react'
import { SectionRestaurant } from './sections/section-restaurant'

export const PageCliente = () => {
  const [openModal, setOpenModal] = useState(false)
  const [cityName, setCityName] = useState('')

  const handleOpenModal = () => {
    setOpenModal((prev) => !prev)
  }
  return (
    <main className="flex min-h-[100vh] w-full flex-col justify-start">
      <SideBarCliente />

      {/* CONATINER INFO MAIN  */}
      <div id="home" className="flex w-full flex-col items-center justify-center p-4 py-[70px]">
        <h1 className="animate-typing-with-cursor mx-auto w-full overflow-hidden whitespace-nowrap break-words border-r-4 border-white text-center text-[2rem] font-bold max-lg:hidden sm:text-[3rem] md:text-[4.6rem] lg:w-[50%] lg:border-none">
          Qual local deseja visitar?
        </h1>

        <h1 className="max mb-5 hidden w-full text-center text-[4rem] font-bold leading-[70px] max-lg:block">
          Qual local deseja visitar?
        </h1>

        <p className="w-full text-center text-[1.1rem] font-[400]">
          Veja abaixo as categorias que vão guiar sua próxima descoberta.
        </p>
        <div className="flex items-center justify-end gap-3 py-7 max-lg:w-full max-lg:flex-col">
          {LinksButtonPageCliente.map((card, index) => (
            <button
              key={index}
              className="bg-secundaryblack800 flex w-auto items-center justify-center gap-3 rounded-full p-3 text-[1.1rem] font-[600] text-white max-lg:w-full"
            >
              <a href={card.href} className="flex items-center justify-center gap-4">
                {<card.Icon />}
                {card.name}
              </a>
            </button>
          ))}
        </div>
        <div className="relative w-[50%] max-lg:w-[100%]">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Digite o lugar desejado"
            className="shadow-shadowInputClientePage w-[100%] rounded-full border-[0.1rem] border-[#E0E0E0] p-4 px-14"
          />
          <div className="absolute left-3 top-3">
            <IconeSearch />
          </div>
          <button
            onClick={handleOpenModal}
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
      <footer className="flex min-h-[30vh] w-full flex-col items-center justify-center gap-3 bg-primarygray max-lg:min-h-[14vh]">
        <Image src={imageLogo} alt="Image Logo" />
        <p className="font-[400]">Copyright © 2025 CocoTour All Rigths Reserved</p>
      </footer>
    </main>
  )
}
