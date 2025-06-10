'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { IoClose } from 'react-icons/io5'

import { CardEventPageAdministrative } from '@/dto/event/data-card-event-DTO'
import { eventSchema } from '@/schemas/event-schema'
import { udpateEvent } from '@/services/routes/events/update-event'
import { baseUrlPhoto } from '@/utils/base-url-photos'

export const CardEventAndLocation = ({
  id,
  name,
  description,
  photos,
  handleDeleteEvent,
  date,
  lastDate,
  active,
  instagram,
  location,
}: CardEventPageAdministrative) => {
  const [showModal, setShowModal] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      description: '',
      photoURLs: [],
      active: '',
      date: '',
      lastDate: '',
      location: '',
      instagram: '',
    },
  })

  const photoUrl = baseUrlPhoto('event', photos[0]?.url || '')

  useEffect(() => {
    if (showModal) {
      setValue('name', name || '')
      setValue('description', description || '')
      setValue('active', active?.toString() || '')
      setValue('instagram', instagram || '')
      setValue('location', location || '')
      setValue('photoURLs', [])

      // Convertemos as datas para yyyy-MM-dd para aparecer corretamente no input type="date"
      const formatDate = (d: string) => (d ? new Date(d).toISOString().split('T')[0] : '')

      setValue('date', formatDate(date || ''))
      setValue('lastDate', formatDate(lastDate || ''))

      setPreviewImages([])
    }
  }, [
    showModal,
    setValue,
    name,
    description,
    active,
    instagram,
    location,
    date,
    lastDate,
    setPreviewImages,
  ])

  const toggleModal = () => {
    setShowModal((prev) => !prev)
    setPreviewImages([])
    reset()
  }

  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    try {
      const response = await udpateEvent(id, data)
      console.log('Evento atualizado com sucesso!', response)
      reset()
      toggleModal()
    } catch (error) {
      console.error('Erro ao atualizar evento:', error)
    }
  }

  const clearImages = () => {
    setPreviewImages([])
    setValue('photoURLs', [])
  }

  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      <div className="relative h-[80%] w-full">
        <Image
          src={photoUrl || backgroundloginpage}
          fill
          alt="Foto de Evento"
          className="h-full w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
        />
        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => handleDeleteEvent?.(id)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
          >
            <IconTrash />
          </button>

          <button
            onClick={toggleModal}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
          >
            <IconPencil />
          </button>
        </div>
      </div>

      <div className="flex h-[70%] flex-col p-3">
        <h1 className="truncate text-[1.2rem] font-[500] text-black">{name}</h1>
        <p className="line-clamp-4 break-words text-secundarygray900">{description}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Atualizar Evento</h2>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                >
                  <IconClosed />
                </button>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Atualizar Foto
                </label>

                {previewImages.length === 0 && (
                  <Controller
                    name="photoURLs"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <div className="relative flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-500">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const files = e.target.files ? Array.from(e.target.files) : []
                            field.onChange(files)
                            const previews = files.map((file) => URL.createObjectURL(file))
                            setPreviewImages(previews)
                          }}
                        />
                        <span>Clique para atualizar as imagens</span>
                      </div>
                    )}
                  />
                )}

                {previewImages.length > 0 && (
                  <>
                    <Swiper spaceBetween={10} slidesPerView={1} className="mt-2 h-48 rounded-lg">
                      {previewImages.map((src, idx) => (
                        <SwiperSlide key={idx}>
                          <Image
                            src={src}
                            alt={`Preview ${idx + 1}`}
                            width={300}
                            height={300}
                            className="h-full w-full rounded object-cover"
                          />
                        </SwiperSlide>
                      ))}
                      <button
                        type="button"
                        onClick={clearImages}
                        className="absolute right-0 top-0 z-10 m-2 flex h-[25px] w-[25px] items-center justify-center rounded bg-primargreen text-white"
                      >
                        <IoClose />
                      </button>
                    </Swiper>
                  </>
                )}

                {errors.photoURLs && (
                  <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
                )}
              </div>

              {/* Campos de formulário (nome, data, etc.) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Evento</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Começa em</label>
                  <input
                    {...register('date')}
                    type="date"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Termina em</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Localização</label>
                <input
                  {...register('location')}
                  type="text"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  {...register('instagram')}
                  type="text"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.instagram && (
                  <p className="text-sm text-red-500">{errors.instagram.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('description')}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full rounded bg-primargreen px-4 py-2 text-sm font-semibold text-white"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </article>
        </div>
      )}
    </article>
  )
}
