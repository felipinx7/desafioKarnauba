'use client'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { CardPlacesDTO } from '@/dto/data-card-placesDTO'
import { placeSchema } from '@/schemas/places-schema'
import { DeletePlace } from '@/services/routes/delete-place'
import { updatePlace } from '@/services/routes/update-place'
import { BaseUrlPlaces } from '@/utils/base-url-card-place'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export const CardPlaces = (props: CardPlacesDTO) => {
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
  } = useForm<z.infer<typeof placeSchema>>({
    resolver: zodResolver(placeSchema),
  })

  // Update with com API
  const onSubmit = async (data: z.infer<typeof placeSchema>) => {
    const response = await updatePlace(props.id, data)
    console.log('Atualização Feita com sucesso!', response)
    reset()
    setShowMoldalUpdate(false)
  }

  const photo = props.photos?.[0]?.url
    ? baseUrlPhoto('place', props.photos[0].url)
    : backgroundloginpage

  console.log('foto que deve aparecer: ', photo)
  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      <div className="relative h-[80%] w-full">
        <Image
          src={photo || backgroundloginpage}
          alt="Foto de Evento"
          fill
          className="h-full w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
        />

        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => props.handleDeletePlace?.(props.id)}
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
        <h1 className="w-[95%] truncate text-[1.1rem] font-medium text-black">{props.name}</h1>

        <p className="line-clamp-3 h-full text-secundarygray900">{props.description}</p>
      </div>

      {/* Moldal of Update Info  */}
      <div
        className={`${
          showMoldalUpdate ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Header */}
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

            {/* Foto (photoURLs) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Atualizar Foto</label>
              <div className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                <Controller
                  name="photoURLs"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        multiple
                        required
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => {
                          const files = e.target.files
                          field.onChange(files ? Array.from(files) : [])
                        }}
                      />
                      <span>Clique para atualizar as imagens</span>
                    </>
                  )}
                />
              </div>
              {errors.photoURLs && (
                <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome do Evento</label>
              <input
                {...register('name')}
                type="text"
                placeholder="Exemplo: Festival de Inverno"
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Telefone (Opcional)
              </label>
              <input
                {...register('phone')}
                type="text"
                placeholder="(00) 00000-0000"
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Instagram */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Instagram (Opcional)
              </label>
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

            {/* Location */}
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

            {/* Category */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Categoria</label>
              <select
                {...register('category')}
                className="w-full rounded border border-gray-300 p-2 text-sm"
              >
                <option value="RESTAURANT">Restaurante</option>
                <option value="HOTEL">Hotel</option>
                <option value="TOURIST_ATTRACTIONS">Atrações Turísticas</option>
                <option value="LANDSCAPE">Paisagem</option>
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            {/* Description */}
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

            {/* Submit */}
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
