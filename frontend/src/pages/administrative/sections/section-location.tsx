'use client'

import { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/name-adm'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataPlaces } from '@/dto/data-create-places-DTO'
import { createPlace } from '@/services/routes/createLocation'
import { placeSchema } from '@/schemas/places-schema'
import { IconClosed } from '@/assets/icons/icone-closed'
import { CardPlaces } from '../components/layouts/card-places'
import { getInfoCity } from '@/services/routes/getInfoCity'
import { CardPlacesDTO } from '@/dto/data-card-placesDTO'
import { DeletePlace } from '@/services/routes/delete-place'

export const SectionLocation = () => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [showPlaces, setShowPlaces] = useState<CardPlacesDTO[] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState<CardPlacesDTO[] | null>(null)

  const handleVisibility = () => {
    setIsVisibility((prev) => !prev)
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof placeSchema>>({
    resolver: zodResolver(placeSchema),
  })

  async function onSubmit(data: DataPlaces) {
    const response = await createPlace(data)
    console.log('Resposta da API:', response)
    reset()
    setIsVisibility(false)
  }

  useEffect(() => {
    const fetchInfoEvents = async () => {
      const places = await getInfoCity()
      setShowPlaces(places.places)
    }

    fetchInfoEvents()
  }, [])

  const handleFilter = () => {
    if (!searchValue.trim()) {
      setFilteredPlaces(null)
      return
    }

    const filtered = showPlaces?.filter((place) =>
      place.name.toLowerCase().includes(searchValue.toLowerCase()),
    )

    setFilteredPlaces(filtered ?? [])
  }

  const FunctiondeletePlace = async (id: string) => {
    await DeletePlace(id)
    console.log('Card Excluido com sucesso!')

    // Update list of Places with alters
    setShowPlaces((prev) => prev?.filter((place) => place.id !== id) ?? null)
    setFilteredPlaces((prev) => prev?.filter((place) => place.id !== id) ?? null)
  }

  return (
    <section className="w-[cacl(100%-20%)]">
      <div className="max-lg:hidden">
        <NameAdminstrative SibeBarMobile={false} />
      </div>

      {/* Inpurt for Search */}
      <div className="relative w-[80%] max-lg:w-full">
        <input
          type="text"
          placeholder="Digite o nome do eventos."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[100%] rounded-[1rem] bg-primarygray p-5 outline-none focus:border-[2px] focus:border-primargreen"
        />
        <button
          onClick={handleFilter}
          className="absolute right-2 top-1.5 w-auto rounded-[1rem] bg-primargreen p-3.5 font-[700] text-white"
        >
          buscar
        </button>
      </div>

      {/* Botton of add location */}
      <button
        onClick={handleVisibility}
        className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
      >
        Adicionar um Local
      </button>

      {/* Modal */}
      <div
        className={`${
          isVisibility ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">New Place</h2>
              <button
                onClick={handleVisibility}
                type="button"
                className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
              >
                <IconClosed />
              </button>
            </div>

            {/* Upload de fotos */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Upload Photos</label>
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
                      <span>Click to upload images</span>
                    </>
                  )}
                />
              </div>
              {errors.photoURLs && (
                <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
              )}
            </div>

            {/* Campos de nome e telefone */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Example: Beach Restaurant"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                <input
                  {...register('phone')}
                  type="text"
                  placeholder="(99) 99999-9999"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Campos Instagram e local */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  {...register('instagram')}
                  type="text"
                  placeholder="@placehandle"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.instagram && (
                  <p className="text-sm text-red-500">{errors.instagram.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="Street, Neighborhood"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Categoria */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <select
                  {...register('category')}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                >
                  <option value="">Selecione a Categoria</option>
                  <option value="RESTAURANT">Restaurante</option>
                  <option value="LANDSCAPE">Paisagem</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="TOURIST_ATTRACTIONS">Tourismo</option>
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                placeholder="Tell more about this place..."
                rows={3}
                className="w-full resize-none rounded border border-gray-300 p-2 text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Botão de envio */}
            <div>
              <button
                type="submit"
                className="w-full rounded bg-primargreen px-4 py-2 font-semibold text-white transition hover:bg-green-600"
              >
                Register Place
              </button>
            </div>
          </form>
        </article>
      </div>

      {/* Filtered cards or all */}
      <div className="mt-4 grid min-h-[80vh] w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10 overflow-y-auto">
        {(filteredPlaces ?? showPlaces)?.length ? (
          (filteredPlaces ?? showPlaces)?.map((place, index) => (
            <CardPlaces
              key={index}
              {...place}
              handleDeletePlace={() => FunctiondeletePlace(place.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center">Nenhum local encontrado.</p>
        )}
      </div>
    </section>
  )
}
