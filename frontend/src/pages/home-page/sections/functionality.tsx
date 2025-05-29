import { manwithsuitcase, wavesBackground } from '@/assets/image'
import Image from 'next/image'
import { CardFunctionalityBenefits } from '../components/layout/card-funcionality-benefits'
import { InfoCardFunctionality } from '@/constants/info-card-funcionality'

export const SectionFunctionality = () => {
  return (
    <section id="Functionality" className="relative min-h-[100vh] w-full bg-white">
      <div className="m-auto flex w-full max-w-[1280px] flex-col items-start justify-between px-5 py-5 max-lg:flex-col">
        <h1 className="text-primargreen w-[70%] break-all text-[2rem] font-[--font-sora] font-[600] max-lg:w-full">
          Funcionalidades que tornam nosso sistema intuitivo e ideal para a sua cidade
        </h1>
        <div className="relative mt-[2rem] flex w-full items-end justify-between max-lg:flex-col max-lg:gap-20">
          <div className="flex w-[50%] flex-col items-center justify-center gap-4 max-lg:w-full">
            {InfoCardFunctionality.map((card, index) => (
              <CardFunctionalityBenefits
                describre={card.describe}
                icon={card.Icon}
                name={card.name}
                key={index}
              />
            ))}
          </div>
          <div className="w-[50%] max-lg:w-full">
            <Image src={manwithsuitcase} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
