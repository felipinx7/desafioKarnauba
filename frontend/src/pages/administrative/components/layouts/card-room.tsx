'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { BASE_URL_BACK_END } from '@/utils/base-url-photos'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { roomSchema } from '@/schemas/room-schema'
import type { CardRoomProps } from '@/types/props'

import { updatePlace } from '@/services/routes/places/update-place'

export const CardRoom = ({ props, handleDeleteRoom }: CardRoomProps) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
  })

  const handleOpenModalUpdate = () => {
    if (!showModalUpdate) {
      // Abre modal e popula dados
      reset({
        price: props.price,
        available: props.available,
        description: props.description || '',
        photoURLs: [], // limpa form
      })

      if (props.photoURLs && props.photoURLs.length > 0) {
        // props.photoURLs assumed to be string[] with relative URLs from backend
        const urls = props.photoURLs.map((relativeUrl) => BASE_URL_BACK_END + relativeUrl)
        setPreviewImages(urls)
      }
    } else {
      // Fecha modal, limpa estados
      reset()
      setPreviewImages([])
      setSelectedFiles([])
    }

    setShowModalUpdate(prev => !prev)
  }

  const onSubmit = async (data: z.infer<typeof roomSchema>) => {
    try {
      const updatedRoom = {
        ...data,
        photoURLs: selectedFiles,
      }

      await updatePlace(props.id, updatedRoom)

      reset()
      setPreviewImages([])
      setSelectedFiles([])
      setShowModalUpdate(false)
    } catch (error) {
      console.error('Erro ao atualizar o quarto:', error)
    }
  }

  const handlePreviewImages = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(urls)
    setSelectedFiles(files)
    setValue('photoURLs', files)
  }

  const handleRemovePreviewImage = (indexToRemove: number) => {
    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[indexToRemove])
      return prev.filter((_, i) => i !== indexToRemove)
    })
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToRemove))
    setValue(
      'photoURLs',
      selectedFiles.filter((_, i) => i !== indexToRemove),
    )
  }

  // Thumbnail principal - mostra primeira foto do backend (url) ou imagem padrão
  const photo = props.photoURLs && props.photoURLs.length > 0
    ? BASE_URL_BACK_END + props.photoURLs[0]
    : backgroundloginpage

  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      {/* Cover image with action buttons */}
      <div className="relative h-[80%] w-full">
        <Image
          src={photo}
          alt="Room photo"
          fill
          className="h-full w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
        />

        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => handleDeleteRoom?.(props.id)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Deletar quarto"
          >
            <IconTrash />
          </button>

          <button
            onClick={handleOpenModalUpdate}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Editar quarto"
          >
            <IconPencil />
          </button>
        </div>
      </div>

      <div className="flex h-[70%] flex-col p-3">
        <h1 className="w-[95%] truncate text-[1.1rem] font-medium text-black">
          R$ {props.price.toFixed(2)}
        </h1>
        <p className="line-clamp-3 h-full text-secundarygray900">{props.description}</p>
      </div>

      {showModalUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Atualizar Quarto</h2>
                <button
                  onClick={handleOpenModalUpdate}
                  type="button"
                  className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                  title="Fechar"
                >
                  <IconClosed />
                </button>
              </div>

              {/* Imagens */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Fotos do Quarto
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
                            const files = Array.from(e.target.files || [])
                            handlePreviewImages(files)
                            field.onChange(files)
                          }}
                        />
                        <span>Clique para adicionar fotos</span>
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
                            className="absolute right-2 top-2 z-10 rounded bg-white p-1 text-gray-800"
                            title="Remover imagem"
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

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Preço</label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <button type="submit" className="w-full rounded bg-primargreen py-2 text-white">
                Atualizar Quarto
              </button>
            </form>
          </article>
        </div>
      )}
    </article>
  )
}
