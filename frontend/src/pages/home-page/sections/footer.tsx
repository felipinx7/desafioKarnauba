import Image from 'next/image'

import { imageLogo } from '@/assets/image'
import { LinksFooter } from '@/constants/links-footer'

export const Footer = () => {
  return (
    <footer className="mt-10 flex min-h-[30vh] w-full items-center justify-center bg-white">
      <div className="m-auto flex w-full max-w-[1280px] flex-col items-start justify-between px-2 py-2">
        <div className="flex w-full items-start justify-between max-md:flex-col">
          <div className="flex flex-col gap-3">
            <Image src={imageLogo} width={250} alt="" />
            <p className="text-primargreen w-[70%] text-[1.01rem] font-[--font-sora] font-[300]">
              Uma nova forma de tornar a experiência turística mais acessível, confiável e
              inteligente.
            </p>
          </div>
          <div className="flex items-center justify-start justify-center gap-10 max-md:mt-4 max-sm:my-10 max-sm:flex-col max-sm:items-start">
            {LinksFooter.map((link, index) => (
              <div key={index} className="flex flex-col items-start justify-center">
                <h4 className="text-primargreen text-[1.1rem] font-[--font-sora] font-bold">
                  {link.title}
                </h4>
                <div>
                  <a href="#" className="text-primargreen list-none text-[1rem] font-[400]">
                    {link.links.map((link, index) => (
                      <li key={index}>{link.name}</li>
                    ))}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="bg-primargreen my-2 h-[0.2rem] w-full" />
        <div className="flex w-full items-center justify-center">
          <h3 className="text-primargreen mt-4 font-[--font-sora] font-[300]">
            Copyright © 2025 CocoTour All Rigths Reserved
          </h3>
        </div>
      </div>
    </footer>
  )
}
