'use client'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { CardEventAndLocationProps } from '@/dto/data-card-event-DTO'
import { eventSchema } from '@/schemas/event-schema'
import { udpateEvent } from '@/services/routes/update-event'
import { BaseUrl } from '@/utils/base-url-photo'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export const CardEventAndLocation = (props: CardEventAndLocationProps) => {
  //State utils in components
  const [showMoldalUpdate, setShowMoldalUpdate] = useState(false)

  //Open Moldal Update Info
  const handleOpenMoldarUpdate = () => {
    setShowMoldalUpdate((prev) => !prev)

    if (!showMoldalUpdate) {
      reset()
    }
  }

  // Form submited for data Update
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  })

  // Update with com API
  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    const response = await udpateEvent(props.id, data)
    console.log('Atualização Feita com sucesso!', response)
    reset()
  }

  const photoUrl = baseUrlPhoto('event', props.photos[0].url)
  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      <div className="relative h-[80%] w-full">
        <Image
          src={photoUrl ? photoUrl : backgroundloginpage}
          className="h-[100%] w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
          fill
          alt="Foto de Evento"
        />
        <div className="rigth-0 absolute bottom-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => props.handleDeleteEvent?.(props.id)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
          >
            <IconTrash />
          </button>
          <button
            onClick={handleOpenMoldarUpdate}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
          >
            <IconPencil />
          </button>
        </div>
      </div>
      <div className="flex h-[70%] flex-col p-3">
        <h1 className="text-[1.2rem] font-[500] text-black">{props.name}</h1>
        <p className="text-secundarygray900">{props.description}</p>
      </div>

      {/* Moldal of Update Info  */}
      <div
        className={`${
          showMoldalUpdate ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Modal Header with Close Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Atualizar Evento</h2>
              <button
                onClick={handleOpenMoldarUpdate}
                type="button"
                className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
              >
                <IconClosed />
              </button>
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Atualizar Foto</label>
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
                      <span>Clique para a atualizar as imagens</span>
                    </>
                  )}
                />
              </div>
              {errors.photoURLs && (
                <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
              )}
            </div>

            {/* Event Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name do Evento</label>
              <input
                {...register('name')}
                type="text"
                placeholder="Exemplo: Festival de Inverno"
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Event Dates */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Começa em </label>
                <input
                  {...register('date')}
                  type="date"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Termina em </label>
                <input
                  {...register('lastDate')}
                  type="date"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.lastDate && (
                  <p className="text-sm text-red-500">{errors.lastDate.message}</p>
                )}
              </div>
            </div>

            {/* Event Location */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Localização</label>
              <input
                {...register('location')}
                type="text"
                placeholder="Rua, Cidade"
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>

            {/* Instagram Field (optional) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Instagram</label>
              <input
                {...register('instagram')}
                type="text"
                placeholder="@eventhandle"
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              {errors.instagram && (
                <p className="text-sm text-red-500">{errors.instagram.message}</p>
              )}
            </div>

            {/* Active Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('active')}
                className="w-full rounded border border-gray-300 p-2 text-sm"
              >
                <option value="">Status do Evento</option>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
              {errors.active && <p className="text-sm text-red-500">{errors.active.message}</p>}
            </div>

            {/* Event Description */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                {...register('description')}
                placeholder="Descrição do evento..."
                rows={3}
                className="w-full resize-none rounded border border-gray-300 p-2 text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Submit Button for Updating */}
            <div>
              <button
                type="submit"
                className="w-full rounded bg-primargreen px-4 py-2 font-semibold text-white transition hover:bg-secundaryGreen700"
              >
                Atualizar Evento
              </button>
            </div>
          </form>
        </article>
      </div>
    </article>
  )
}
