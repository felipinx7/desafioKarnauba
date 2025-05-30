'use client'

import { useState } from 'react'
import { NameAdminstrative } from '../components/name-adm'
import { IconClosed } from '@/assets/icons/icone-closed'
import { createEvent } from '@/services/routes/createEvent'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { dataEventDTO } from '@/dto/data-create-event-DTO'
import { eventSchema } from '@/schemas/event-schema'
import { z } from 'zod'

export const SectionEvents = () => {
  // State utils in Section
  const [isVisibility, setIsVisibility] = useState(false)

  //Functios utils
  const handleVisibility = () => {
    setIsVisibility((prev) => !prev)
  }
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  })
  console.log(errors)
  async function onSubmit(data: dataEventDTO) {
    const response = await createEvent(data)
    console.log('Resposta da API:', response)
  }

  return (
    <section className="w-[cacl(100% - 20%)]">
      <NameAdminstrative />
      <div>
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
        <button
          onClick={handleVisibility}
          className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
        >
          Adicionar um Evento
        </button>
      </div>

      {/* Modal of register Eventos  */}
      <div
        className={`${isVisibility ? 'hidden' : 'fixed'} inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Upload image */}
            <div>
              <div className="flex items-center justify-between">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Escolha fotos do evento
                </label>
                <div
                  onClick={handleVisibility}
                  className="absolute right-3 top-3 h-[30px] w-[30px] text-[1.1rem]"
                >
                  <IconClosed />
                </div>
              </div>
              <div className="relative h-48 w-full rounded border-2 border-black/50 bg-white">
                <Controller
                  name="photoURLs"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files
                          field.onChange(files ? Array.from(files) : [])
                        }}
                      />
                      {errors.photoURLs && (
                        <p className="text-red-500">{errors.photoURLs.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              {errors && <div>{errors.photoURLs?.message}</div>}
            </div>

            {/* name event + status event */}
            <div className='flex gap-2 items-center justify-start'>
              {/* name event */}
              <div>
                <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                  Nome do Evento
                </label>
                <input
                  id="name"
                  {...register('name')}
                  type="text"
                  placeholder="Ex: Festival de Verão"
                  className="w-full rounded-md border-2 border-black/50 p-3 outline-none placeholder:text-black/60 focus:ring-1 focus:ring-primargreen"
                />
                {errors && <div>{errors.name?.message}</div>}
              </div>
              {/* Status event */}
              <div className="flex items-center justify-start gap-2">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    {...register('active')}
                    className="rounded-[0.2rem] border-2 border-black/50 p-2.5"
                    id=""
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </div>
                {errors && <div>{errors.active?.message}</div>}
              </div>
            </div>

            {/* container location + Instagram */}

            <div className="flex gap-2">
              {/* Instagram */}
              <div>
                <label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  {...register('instagram')}
                  id="instagram"
                  type="text"
                  placeholder="@nomedoevento"
                  className="w-full rounded-md border-2 border-black/50 p-3 outline-none placeholder:text-black/60 focus:ring-1 focus:ring-primargreen"
                />
                {errors && <div>{errors.instagram?.message}</div>}
              </div>

              <div>
                {/* Location */}
                <label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Localização
                </label>
                <input
                  {...register('location')}
                  id="location"
                  type="text"
                  placeholder="Rua Tal, Bairro, Cidade"
                  className="w-full rounded-md border-2 border-black/50 p-3 outline-none placeholder:text-black/60 focus:ring-1 focus:ring-primargreen"
                />
                {errors && <div>{errors.location?.message}</div>}
              </div>
            </div>

            {/* Date of event */}

            <div className="flex gap-2">
              <div>
                <label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                  Começa em
                </label>
                <input
                  {...register('date')}
                  id="date"
                  type="date"
                  className="w-full rounded-md border-2 border-black/50 p-3 outline-none placeholder:text-black/60 focus:ring-1 focus:ring-primargreen"
                />
                {errors && <div>{errors.date?.message}</div>}
              </div>

              <div>
                {/* last date */}
                <label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Termina em
                </label>
                <input
                  {...register('lastDate')}
                  id="lastDate"
                  type="date"
                  className="w-full rounded-md border-2 border-black/50 p-3 outline-none placeholder:text-black/60 focus:ring-1 focus:ring-primargreen"
                />
              </div>
            </div>

            {/* Descprition */}
            <div>
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Descrição do Evento
              </label>
              <textarea
                id="description"
                {...register('description')}
                placeholder="Conte mais sobre o evento..."
                className="w-full rounded-md border-2 border-black/50 p-3 outline-none placeholder:text-black/60 focus:ring-1 focus:ring-primargreen"
              />
              {errors && (
                <div>
                  <h1>{errors.description?.message}</h1>
                </div>
              )}
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                type="submit"
                className="w-full rounded-[0.3rem] bg-primargreen p-2 text-[1.1rem] font-bold text-white"
              >
                Cadastrar Evento
              </button>
            </div>
          </form>
        </article>
      </div>
    </section>
  )
}
