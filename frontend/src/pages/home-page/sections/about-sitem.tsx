import { munckupMobile, wavesBackground } from '@/assets/image'
import Image from 'next/image'

export const AboutSistem = () => {
  return (
    <section id="AboutSistem" className="relative flex min-h-[100vh] w-full items-center py-3">
      {/* Image of background with fill for  cobrir all area */}
      <Image
        src={wavesBackground}
        alt=""
        className="absolute inset-0 -z-10 object-cover"
        priority
        fill
      />

      <div className="m-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-5 max-lg:flex-col-reverse">
        <div className="z-10 w-[70%] max-lg:w-full">
          <Image src={munckupMobile} alt="Mockup Mobile" className="max-lg:w-full" />
        </div>
        <div className="z-10 w-[50%] max-lg:w-full">
          <h1 className="text-primargreen text-[2.4rem] font-medium">Sobre o nosso sistema</h1>
          <p className="text-primargreen text-[1.2rem] font-light">
            O Sistema de Gestão Turística é uma plataforma web responsiva e intuitiva, desenvolvida
            para organizar e divulgar pontos turísticos, eventos e estabelecimentos da cidade.
            Facilita a gestão de conteúdos por administradores locais e oferece aos visitantes uma
            navegação simples e atrativa. Com foco em dispositivos móveis, o sistema valoriza o
            turismo, promove os negócios locais e impulsiona a economia regional por meio da
            inovação.
          </p>
        </div>
      </div>
    </section>
  )
}
