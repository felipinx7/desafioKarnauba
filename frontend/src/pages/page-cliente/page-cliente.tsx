import { SideBarCliente } from './components/side-bar'

export const PageCliente = () => {
  return (
    <main className="flex min-h-[100vh] w-full flex-col justify-start">
      <SideBarCliente />
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className='text-[4.6rem] font-bold'>Qual local deseja visitar?</h1>
        <p>Veja abaixo as categorias que vão guiar sua próxima descoberta.</p>
        <div>
          <button className=""></button>
          <button className=""></button>
          <button className=""></button>
          <button className=""></button>
        </div>
      </div>
    </main>
  )
}
