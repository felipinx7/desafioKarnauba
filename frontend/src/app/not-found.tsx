import { backgroundfound, peoplenotfound } from '@/assets/image'
import Image from 'next/image'

export default function NotFound() {
  return (
    <section className="relative min-h-[100vh] w-full">
      <Image className="absolute" src={backgroundfound} fill alt="" />
      <div className="flex h-[100%] justify-center items-center w-full flex-col">
        <h1 className='font-bold text-primargreen text-[6rem] z-[999999]'>404</h1>
        <p className='text-[1.6rem] text-primargreen z-[99999]'>Página não encontrada</p>
        <Image src={peoplenotfound} className='z-[9999999]' alt="" />
      </div>
    </section>
  )
}
