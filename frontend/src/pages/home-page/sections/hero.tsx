import { wavesDecored, womanSitting } from '@/assets/image'
import Image from 'next/image'
import { ButtonRegister } from '../components/ui/button-registred'

export const SectionHero = () => {
  return (
    <section className="mt-17 z-10 m-auto flex w-full max-w-[1280px] justify-between px-6 pb-20 max-lg:flex-col max-lg:gap-20">
      <Image src={wavesDecored} alt="" className="absolute right-0 top-0 z-0 max-lg:hidden" />
      <div className="z-5 flex w-[60%] flex-col items-start justify-center gap-[1.3rem] text-left max-lg:w-[100%]">
        <h1 className="text-[3rem] font-[600] leading-[3.2rem] break-all text-white">
          TRANSFORMANDO O JEITO DE APRESENTAR MORAÚJO AO MUNDO.
        </h1>
        <p className="text-primaryWhite500 text-[1.2rem] font-[---font-sora]">
          Um sistema completo e acessível que organiza os pontos turísticos e estabelecimentos da
          cidade, facilita a administração e valoriza o que Moraújo tem de melhor.
        </p>
        <div className="w-[45%] max-lg:hidden">
          <ButtonRegister />
        </div>
      </div>
      <div className="z-[1] flex w-[50%] items-center justify-end max-lg:w-[100%]">
        <Image src={womanSitting} alt="Image girl" width={520} className="max-lg:w-full" />
      </div>
      <div className="hidden w-full max-lg:block">
        <ButtonRegister />
      </div>
    </section>
  )
}
