import { NameAdminstrative } from '../components/name-adm'

export const SectionLocation = () => {
  return (
    <section className="w-[cacl(100% - 20%)]">
      <NameAdminstrative />
      <div className="relative w-[80%]">
        <input
          type="text"
          placeholder="Digite o nome do eventos."
          className="w-[100%] rounded-[1rem] bg-primarygray p-5 outline-none focus:border-[2px] focus:border-primargreen"
        />
        <button className="absolute right-2 top-1.5 w-[10%] rounded-[1rem] bg-primargreen p-3.5 font-[700] text-white">
          buscar
        </button> 
      </div>
      <div className='grid w-[cacl(100% - 20%)]'>
      </div>
    </section>
  )
}
