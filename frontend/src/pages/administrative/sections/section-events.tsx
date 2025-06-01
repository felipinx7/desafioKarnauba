'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { NameAdminstrative } from '../components/layouts/name-adm'
import { IconClosed } from '@/assets/icons/icone-closed'
import { CardEventAndLocation } from '../components/layouts/card-event-and-location'

import { createEvent } from '@/services/routes/createEvent'
import { getInfoCity } from '@/services/routes/getInfoCity'

import { eventSchema } from '@/schemas/event-schema'
import { dataEventDTO } from '@/dto/data-create-event-DTO'
import { CardEventAndLocationProps } from '@/dto/data-card-event-DTO'
import { DeleteEvent } from '@/services/routes/delete-event'

export const SectionEvents = () => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [events, setEvents] = useState<CardEventAndLocationProps[] | null>(null)
  const [originalEvents, setOriginalEvents] = useState<CardEventAndLocationProps[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  })

  // Toggle modal
  const handleVisibility = () => {
    setIsVisibility((prev) => !prev)
  }

  // Submit form
  const onSubmit = async (data: dataEventDTO) => {
    try {
      const response = await createEvent(data)
      console.log('Resposta da API:', response)
      reset()
      setIsVisibility(false)
      await fetchInfoEvents()
    } catch (error) {
      console.error('Erro ao criar evento:', error)
    }
  }

  // Search for city events
  const fetchInfoEvents = async () => {
    try {
      const { events } = await getInfoCity()
      setEvents(events)
      setOriginalEvents(events)
      console.log("T", events)
    } catch (error) {
      console.error('Erro ao buscar eventos:', error)
    }
  }

  useEffect(() => {
    fetchInfoEvents()
  }, [])

  // Filter events
  const handleSearch = () => {
    if (!originalEvents) return

    const filtered = originalEvents.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setEvents(filtered)
  }

  const functionDeleteEvent = async (id: string) => {
    await DeleteEvent(id)

    setEvents((prev) => prev?.filter((event) => event.id !== id) || null)
    setOriginalEvents((prev) => prev.filter((event) => event.id !== id))
  }


  return (
    <section>
      {/* Header */}
      <div className="max-lg:hidden">
        <NameAdminstrative />
      </div>

      {/* Search and Add */}
      <div>
        <div className="relative w-[80%] max-lg:w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do evento."
            className="w-full rounded-[1rem] bg-primarygray p-5 outline-none focus:border-2 focus:border-primargreen"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1.5 rounded-[1rem] bg-primargreen p-3.5 font-bold text-white"
          >
            Buscar
          </button>
        </div>
        <button
          onClick={handleVisibility}
          className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
        >
          Adicionar um Evento
        </button>
      </div>

      {/* Modal of create */}
      {isVisibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Novo Evento</h2>
                <button
                  onClick={handleVisibility}
                  type="button"
                  className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                >
                  <IconClosed />
                </button>
              </div>

              {/* Upload */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Fotos do Evento
                </label>
                <div className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
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
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const files = e.target.files
                            field.onChange(files ? Array.from(files) : [])
                          }}
                        />
                        <span>Clique para adicionar imagens</span>
                      </>
                    )}
                  />
                </div>
                {errors.photoURLs && (
                  <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
                )}
              </div>

              {/* name + Status */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nome do Evento
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Ex: Festival de Verão"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    {...register('active')}
                    className="rounded border border-gray-300 p-2 text-sm"
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                  {errors.active && <p className="text-sm text-red-500">{errors.active.message}</p>}
                </div>
              </div>

              {/* Instagram + location */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Instagram</label>
                  <input
                    {...register('instagram')}
                    type="text"
                    placeholder="@nomedoevento"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                  {errors.instagram && (
                    <p className="text-sm text-red-500">{errors.instagram.message}</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Localização
                  </label>
                  <input
                    {...register('location')}
                    type="text"
                    placeholder="Rua Tal, Bairro"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* date */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Começa em</label>
                  <input
                    {...register('date')}
                    type="date"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Termina em</label>
                  <input
                    {...register('lastDate')}
                    type="date"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                </div>
              </div>

              {/* description */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Conte mais sobre o evento..."
                  className="w-full resize-none rounded border border-gray-300 p-2 text-sm"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              {/* button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded bg-primargreen px-4 py-2 font-semibold text-white transition hover:bg-green-600"
                >
                  Cadastrar Evento
                </button>
              </div>
            </form>
          </article>
        </div>
      )}

      {/* Cards */}
      <div className="mt-4 grid min-h-[80vh] w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10">
        {events ? (
          events.length > 0 ? (
            events.map((event, index) => (
              <CardEventAndLocation
                key={index}
                handleDeleteEvent={() => functionDeleteEvent(event.id)}
                {...event}
              />
            ))
          ) : (
            <p className="text-gray-500">Nenhum evento encontrado.</p>
          )
        ) : (
          <p className="text-gray-500">Carregando eventos...</p>
        )}
      </div>
    </section>
  )
}
