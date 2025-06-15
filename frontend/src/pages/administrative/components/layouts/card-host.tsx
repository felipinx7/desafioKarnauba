'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { HostingCardData } from '@/dto/places/roomData'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { dataHostingSchema } from '@/schemas/places-schema'
import { updatePlace } from '@/services/routes/places/update-place'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { formatPhoneNumber } from '@/utils/formatPhone'

export const CardHost = (props: HostingCardData) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [valuePhone, setValuePhone] = useState('')
  const [previewImages, setPreviewImages] = useState<string[]>([])


  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof dataHostingSchema>>({
    resolver: zodResolver(dataHostingSchema),
  })

  const handleOpenModalUpdate = () => {
    if (!showModalUpdate) {
      reset({
        name: props.name,
        phone: props.phone || '',
        instagram: props.instagram || '',
        location: props.location || '',
        description: props.description || '',
        photoURLs: [], // limpar campo de arquivos
        room: {
          price: props.room?.price || 0,
        },
      })

      setValuePhone(props.phone || '')

      // Gerar URLs preview para as fotos existentes, que podem ser arquivos ou URLs
      const urls = (props.photos || []).map((photo) => {
        if (photo instanceof File) {
          return URL.createObjectURL(photo)
        }
        // photo.url deve existir
        return baseUrlPhoto('place', (photo as any).url || '')
      })




      setPreviewImages(urls)
    } else {
      // Fechar modal limpa tudo
      reset()

      setPreviewImages([])
      setValuePhone('')
    }

    setShowModalUpdate((prev) => !prev)
  }

  const onSubmit = async (data: z.infer<typeof dataHostingSchema>) => {
    console.log("foi")
    try {
      const response = await updatePlace(props.id, data)
      console.log('Update successful!', response)

      reset()
      setPreviewImages([])
      setShowModalUpdate(false)
      setValuePhone('')
    } catch (error) {
      console.error('Error updating place:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phone', formatted)
    setValuePhone(formatted)
  }

  const handlePreviewImages = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(urls)
    setValue('photoURLs', files, { shouldValidate: true, shouldDirty: true })
  }



  const handleRemovePreviewImage = (indexToRemove: number) => {
    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[indexToRemove])
      const newPreviews = prev.filter((_, i) => i !== indexToRemove)

      // Também remover o arquivo correspondente de photoURLs no form
      // Pegar os arquivos atuais
      const currentFiles: File[] = (control.getValues('photoURLs') || []) as File[]
      const newFiles = currentFiles.filter((_, i) => i !== indexToRemove)
      setValue('photoURLs', newFiles)

      return newPreviews
    })
  }

  

  const photo = props.photos?.[0]?.url
    ? baseUrlPhoto('place', props.photos[0].url)
    : backgroundloginpage

  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      <div className="relative h-[80%] w-full">
        <Image
          src={photo}
          alt="Place photo"
          fill
          className="h-full w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
        />

        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => props.handleDeletePlace?.(props.id)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Delete place"
          >
            <IconTrash />
          </button>

          <button
            onClick={handleOpenModalUpdate}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Edit place"
          >
            <IconPencil />
          </button>
        </div>
      </div>

      <div className="flex h-[80%] flex-col p-3 py-1">
        <h1 className="w-[95%] truncate text-[1.1rem] font-medium text-black">R${props.room.price}</h1>
        <h1 className="w-[95%] truncate text-[0.9rem] font-medium text-black">{props.name}</h1>
        <p className="line-clamp-3 h-full text-secundarygray900">{props.description}</p>
      </div>

      {showModalUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Update Place</h2>
                <button
                  onClick={handleOpenModalUpdate}
                  type="button"
                  className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                  title="Close modal"
                >
                  <IconClosed />
                </button>
              </div>

              {/* Photos input and preview */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Update Photos
                </label>

                {previewImages.length === 0 ? (
                  <Controller
                    name="photoURLs"
                    control={control}
                    render={({ field }) => (
                      <div className="relative flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-500">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const files = e.target.files
                            const fileArray = files ? Array.from(files) : []
                            field.onChange(fileArray)
                            handlePreviewImages(fileArray)
                          }}
                          aria-label="Select images"
                        />
                        <span>Click to update images</span>
                      </div>
                    )}
                  />
                ) : (
                  <Swiper spaceBetween={10} slidesPerView={1} className="mt-2 h-[250px]">
                    {previewImages.map((url, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative h-[250px] w-full overflow-hidden rounded-md">
                          <Image
                            src={url}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePreviewImage(index)}
                            className="absolute right-2 top-2 z-10 rounded bg-white p-1 text-white"
                            title="Remove image"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                {errors.photoURLs && (
                  <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
                )}
              </div>

              {/* Text inputs */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Example: Winter Festival"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                <input
                  {...register('phone')}
                  type="text"
                  value={valuePhone}
                  maxLength={15}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  {...register('instagram')}
                  type="text"
                  placeholder="@event"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.instagram ? 'true' : 'false'}
                />
                {errors.instagram && (
                  <p className="text-sm text-red-500">{errors.instagram.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="Location here"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.location ? 'true' : 'false'}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  placeholder="Description here"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  rows={4}
                  aria-invalid={errors.description ? 'true' : 'false'}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              {/* Fotos do quarto */}
              

              {/* Room price and description */}
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Valor</label>
                  <span className="absolute bottom-2 left-2 text-gray-500">R$</span>
                  <input
                    {...register('room.price', { valueAsNumber: true })}
                    type="number"
                    placeholder="300,00"
                    className="w-full rounded border border-gray-300 p-2 pl-8 text-sm"
                  />
                </div>
              </div>



              <button type="submit" className="w-full rounded bg-primargreen py-2 text-white">
                Update Place
              </button>
            </form>
          </article>
        </div>
      )}
    </article>
  )
}
