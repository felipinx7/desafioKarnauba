import Image from 'next/image'

import { walkingman, wavesBackground } from '@/assets/image'
import { InfoCardBenefits } from '@/constants/info-card-benefits'

import { CardFunctionalityBenefits } from '../components/layout/card-funcionality-benefits'
export const SectionBenefits = () => {
  return (
    <section id="Benefits" className="relative min-h-[100vh] w-full p-5 pt-20">
      <Image
        src={wavesBackground}
        alt=""
        className="absolute inset-0 -z-10 rotate-180 object-cover"
        priority
        fill
      />
      <div className="m-auto flex max-w-[1280px] flex-col items-start justify-between gap-10">
        <h1 className="w-[50%] text-[2rem] font-[--font-sora] font-[600] text-primargreen max-lg:w-full">
          Benefícios reais do sistema para sua cidade.
        </h1>
        <div className="flex w-full items-start justify-between max-lg:flex-col-reverse max-lg:gap-10">
          <div className="w-[50%] max-lg:w-[100%]">
            <Image src={walkingman} alt="" />
          </div>
          <div className="flex w-[50%] flex-col items-center justify-center gap-4 max-lg:w-full">
            {InfoCardBenefits.map((card, index) => (
              <CardFunctionalityBenefits
                describre={card.describe}
                icon={card.Icon}
                name={card.name}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
