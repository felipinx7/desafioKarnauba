'use client'

import { backgroundclientpage } from '@/assets/image'
import { useState } from 'react'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import Image from 'next/image'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconPencil } from '@/assets/icons/icon-pencil'
import { updateTaxi } from '@/services/routes/taxi/update-taxi'
import { Controller, useForm } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { IconClosed } from '@/assets/icons/icone-closed'
import { dataCardInfoTaxiDTO } from '@/dto/taxi/data-card-info-DTO'

export type UpdateTaxiFormData = {
  name: string
  phone: string
  workingDescription: string
  photoURLs: File[]
}

export function CardTaxi(data: dataCardInfoTaxiDTO) {
  const [showModal, setShowModal] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [valuePhone, setValuePhone] = useState(data.phone)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateTaxiFormData>({
    defaultValues: {
      name: data.name,
      phone: data.phone,
      workingDescription: data.workingDescription,
      photoURLs: [],
    },
  })

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
    console.log('Estado do modal', showModal)
  }

  const handlePreviewImages = (files: File[]) => {
    const previews = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const handleRemovePreviewImage = (index: number) => {
    const newPreviews = [...previewImages]
    newPreviews.splice(index, 1)
    setPreviewImages(newPreviews)
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '')
    if (input.length > 11) input = input.slice(0, 11)

    let formatted = ''
    if (input.length <= 10) {
      formatted = input.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else {
      formatted = input.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }

    setValuePhone(formatted)
    setValue('phone', formatted)
  }

  const onSubmit = async (formData: UpdateTaxiFormData) => {
    const response = await updateTaxi(data.id, formData)
    console.log('Dados Atualizados', response)
    setShowModal(false)
  }

  const photoURL = baseUrlPhoto('taxiDrivers', data.photoURLs)

  return (
    <>
      <article
        className="flex h-[300px] w-[280px] cursor-pointer flex-col overflow-hidden rounded-[0.9rem] bg-white shadow-shadowCardEventLocation transition-shadow hover:shadow-lg max-sm:w-full"
      >
        <div className="relative h-[80%] w-full">
          <Image
            fill
            src={photoURL || backgroundclientpage}
            alt="Imagem do motorista de táxi"
            className="rounded-t-[0.9rem] object-cover"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                data.onDelete(data.id)
              }}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
              title="Delete place"
            >
              <IconTrash />
            </button>

            <button
              onClick={handleShowModal}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
              title="Edit place"
            >
              <IconPencil />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h1 className="truncate text-[1.2rem] font-semibold text-black">{data.name}</h1>
          <p className="line-clamp-4 text-gray-700">{data.workingDescription}</p>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Atualizar Taxistas</h2>
                  <button
                    onClick={handleShowModal}
                    type="button"
                    className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                    title="Close modal"
                  >
                    <IconClosed />
                  </button>
                </div>

                {/* Upload de imagens */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Atualizar Foto
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
                          />
                          <span>Clique para Atualizar Foto</span>
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
                              className="absolute right-2 top-2 z-10 rounded bg-white p-1"
                            >
                              <IconTrash />
                            </button>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>

                {/* Campos de texto */}
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  placeholder="Nome"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

                <input
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  placeholder="Telefone"
                  value={valuePhone}
                  onChange={handleChangePhone}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}

                <textarea
                  {...register('workingDescription')}
                  rows={3}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  placeholder="Descrição"
                />

                <button
                  type="submit"
                  className="w-full rounded bg-primargreen py-2 text-white transition hover:opacity-90"
                >
                  Atualizar Dados
                </button>
              </form>
            </article>
          </div>
        )}
      </article>
    </>
  )
}
