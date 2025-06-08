'use client'

import { IconInstagram } from '@/assets/icons/icon-instagram'
import Image from 'next/image'
import {
  photomassapeprimary,
  photomassapesecundary,
  photomassapethird,
  photomassapefourth,
  photomassapefifth,
} from '@/assets/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { IconWhatsapp } from '@/assets/icons/icone-whatsapp'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'

export const AboutCity = () => {
  const router = useRouter()

  const handleBackPage = () => {
    router.back()
  }
  return (
    <section className="fixed inset-0 z-[999] h-screen w-full overflow-y-auto">
      <div className="flex items-center justify-center bg-primargreen px-4 py-3">
        <div className="m-0 flex w-[100%] max-w-[1280px] flex-row-reverse items-center justify-end">
          {/* Título */}
          <h2 className="text-xl font-bold text-white">Sobre Massapê</h2>

          {/* Botão de voltar/fechar */}
          <button
            onClick={handleBackPage}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-white"
            aria-label="Voltar"
          >
            <span>
              <IconArrowLeft />
            </span>
          </button>
        </div>
      </div>

      <div className="m-auto w-full max-w-[1280px] px-4 py-8">
        {/* Swiper com imagens da cidade */}
        <div className="w-full items-center justify-center text-center font-[600] text-primargreen">
          <p>Role as imagens para visualizar mais sobre</p>
        </div>
        <div className="mt-3">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            className="rounded-xl"
          >
            {[
              photomassapeprimary,
              photomassapesecundary,
              photomassapethird,
              photomassapefourth,
              photomassapefifth,
            ].map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="h-[500px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1} de Moraújo`}
                    width={1200}
                    height={500}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Título e descrição */}
        <div className="mt-6">
          <div className="mt-6">
            <h1 className="text-[2rem] font-bold text-blue-900">Massapê - CE</h1>
            <ul className="mt-4 space-y-4 pl-2 text-[1rem] leading-6 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-blue-600"></span>
                Massapê está localizado na região Norte do Ceará, sendo um importante município da
                microrregião de Sobral.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-blue-600"></span>
                Possui uma forte presença na agricultura familiar, destacando-se na produção de
                milho, feijão e mandioca.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-blue-600"></span>
                Sua origem remonta ao século XIX, e o nome “Massapê” vem do tipo de solo fértil
                predominante na região.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-blue-600"></span>A cidade possui
                manifestações culturais tradicionais, como festas religiosas e quadrilhas juninas.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-blue-600"></span>
                Conforme dados do IBGE de 2019, sua população foi estimada em cerca de 37.585
                habitantes.
              </li>
            </ul>

            <p className="mt-4 text-sm text-gray-600">
              <strong>Área:</strong> 1.152,3 km²
            </p>
          </div>
        </div>

        {/* Localização - Mapa */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Localização</h2>
          <div className="h-[300px] w-full overflow-hidden rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.144183992605!2d-40.34304612414647!3d-3.5233585432383835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x794fa94386b3f77%3A0x26e768e2895606ef!2sMassap%C3%AA%2C%20CE%2C%2062100-000!5e0!3m2!1spt-BR!2sbr!4v1717851921926!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Moraújo"
            ></iframe>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Redes Sociais</h2>
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/moraujoce"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 transition hover:bg-gray-100"
              >
                <IconInstagram />
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/moraujoce"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 transition hover:bg-gray-100"
              >
                <IconWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
