import Image from 'next/image'

import { IconeEmail } from '@/assets/icons/icon-email'
import { IconeEnterPrise } from '@/assets/icons/icon-enterprise'
import { manformladdingpage } from '@/assets/image'

export const SectionFormContact = () => {
  return (
    <section
      id="SectionFormContact"
      className="flex min-h-[100vh] w-full items-center justify-center max-sm:py-5"
    >
      <div className="m-auto flex max-w-[1280px] items-center justify-center">
        <form
          action=""
          method="post"
          className="flex h-auto w-[90%] items-center justify-between rounded-[1rem] bg-white p-8 py-3"
        >
          <div className="w-[50%] max-lg:w-full">
            <div className="mb-10 flex flex-col items-start justify-center">
              <h1 className="text-[2.5rem] font-[600] text-primargreen">Entre em Contato</h1>
              <p className="text-[1.2rem] font-[300] text-primargreen">
                Um sistema feito sob medida para mostrar ao mundo as riquezas de Massapê,
                impulsionar o turismo local e facilitar a administração com eficiência e tecnologia.
              </p>
            </div>

            {/* FIELDS INPUTS  */}
            <div className="flex w-full flex-col items-start justify-center gap-6">
              {/* INPUT FIELD NAME CITY  */}
              <div className="flex w-full flex-col">
                <label htmlFor="name" className="mb-1 text-[1.2rem] font-medium text-primargreen">
                  Nome da Cidade
                </label>
                <div className="relative w-full">
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Digite o nome da sua cidade"
                    className="w-full rounded-full border border-2 border-primargreen px-4 py-4 pr-10 text-primargreen transition-all duration-500 ease-in-out placeholder:text-primargreen focus:shadow-shadowInputFormContact focus:outline-none"
                  />
                  <div className="pointer-events-none absolute right-3 top-2 block w-[7%] -translate-y-1/2 max-sm:hidden">
                    <IconeEnterPrise />
                  </div>
                </div>
              </div>

              {/* INPUT - EMAIL */}
              <div className="flex w-full flex-col">
                <label htmlFor="email" className="mb-1 text-[1.2rem] font-medium text-primargreen">
                  Email
                </label>
                <div className="relative w-full">
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="seuemail@gmail.com"
                    className="w-full rounded-full border border-2 border-primargreen px-4 py-4 pr-10 text-primargreen transition-all duration-500 ease-in-out placeholder:text-primargreen focus:shadow-shadowInputFormContact focus:outline-none"
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 block -translate-y-1/2 max-sm:hidden">
                    <IconeEmail />
                  </div>
                </div>
              </div>
              <button className="w-full cursor-pointer rounded-[0.8rem] bg-secundaryGreen700 p-2 text-[1.2rem] font-[--font-sora] font-[700] text-white hover:bg-secundaryGreen700">
                ENVIAR DADOS
              </button>
            </div>
          </div>
          <div className="block w-[50%] max-lg:hidden">
            <Image src={manformladdingpage} width={800} alt="" />
          </div>
        </form>
      </div>
    </section>
  )
}
