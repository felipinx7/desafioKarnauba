import { imageLogo } from '@/assets/image'
import Image from 'next/image'

export const SideBarCliente = () => {
  return (
    <header className="flex w-full p-8 items-center justify-center">
      <div className="m-auto flex max-w-[1280px] w-[100%] items-center justify-between">
        <div className="">
          <Image src={imageLogo} width={200} alt="logo do sistema" />
        </div>
        <div className="flex gap-4">
          <a href="#home" className='text-[1.2rem] font-[400]'>Inicio</a>
          <a href="#explorer" className='text-[1.2rem] font-[400]'>Explorar</a>
        </div>
      </div>
    </header>
  )
}
