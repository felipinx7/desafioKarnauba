'use client'

import { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/header-info-adm'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { dataTaxi, taxiSchema } from '@/schemas/taxi-schema'
import { IconClosed } from '@/assets/icons/icone-closed'
import { formatPhoneNumber } from '@/utils/formatPhone'
import { CardTaxi } from '../components/layouts/card-taxi'
import { CreateTaxi } from '@/services/routes/taxi/create-taxi'
import { GetAllTaxi } from '@/services/routes/taxi/get-all-taxi'
import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'
import { deleteTaxi } from '@/services/routes/taxi/delete-taxi'

export const SectionTaxi = () => {
  const [valuePhone, setValuePhone] = useState('')
  const [isVisibility, setIsVisibility] = useState(false)
  const [showTaxi, setShowTaxi] = useState<dataInfoTaxi[]>([]) // array vazio inicial
  const [filteredTaxi, setFilteredTaxi] = useState<dataInfoTaxi[]>([]) // array vazio inicial
  const [searchTerm, setSearchTerm] = useState('')

  const handleVisibility = () => setIsVisibility((prev) => !prev)

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<dataTaxi>({
    resolver: zodResolver(taxiSchema),
  })

  async function fetchTaxis() {
    const responseTaxis = await GetAllTaxi()
    const taxis = responseTaxis?.data ?? []
    setShowTaxi(taxis)
  }

  async function onSubmit(data: dataTaxi) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('phone', data.phone)
    formData.append('workingDescription', data.workingDescription)

    if (data.photoURLs) {
      formData.append('photo', data.photoURLs)
    }

    await CreateTaxi(formData)

    reset()
    setValuePhone('')
    setIsVisibility(false)
    await fetchTaxis()
  }

  useEffect(() => {
    fetchTaxis()
  }, [])

  const handleFilter = () => {
    if (!searchTerm.trim()) {
      setFilteredTaxi([])
      return
    }
    const filtered = showTaxi.filter((taxi) =>
      taxi.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTaxi(filtered)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValuePhone(formatted)
    setValue('phone', formatted)
  }

  const handleDeleteTaxi = async (id: string) => {
    await deleteTaxi(id)
    setShowTaxi((prev) => prev.filter((taxi) => taxi.id !== id))
    setFilteredTaxi((prev) => prev.filter((taxi) => taxi.id !== id))
  }

  const taxisToShow = filteredTaxi.length > 0 ? filteredTaxi : showTaxi
  console.log('DADOS DA TAXI TO SHOW', taxisToShow)

  return (
    <section className="w-[calc(100%-20%)]">
      <div className="max-lg:hidden">
        <NameAdminstrative SibeBarMobile={false} />
      </div>

      <div className="relative mt-6 w-[80%] max-lg:w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquise pelo nome do taxista"
          className="w-full rounded-[1rem] bg-primarygray p-5 outline-none focus:border-2 focus:border-primargreen"
        />
        <button
          onClick={handleFilter}
          className="absolute right-2 top-1.5 rounded-[1rem] bg-primargreen p-3.5 font-bold text-white"
        >
          Buscar
        </button>
      </div>

      <button
        onClick={handleVisibility}
        className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
      >
        Adicionar um Táxi
      </button>

      <div
        className={`${
          isVisibility ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Novo Táxi</h2>
              <button
                onClick={handleVisibility}
                type="button"
                className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
              >
                <IconClosed />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Foto do motorista ou do carro
              </label>
              <div className="relative flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                <Controller
                  name="photoURLs"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex h-full w-full items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          console.log('IMAGE DATA', file)
                          if (file) {
                            field.onChange(file)
                          }
                        }}
                      />
                      <span>Clique para enviar imagem</span>
                    </div>
                  )}
                />
              </div>
              {errors.photoURLs && (
                <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Ex: João Taxi"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  {...register('phone')}
                  type="text"
                  value={valuePhone}
                  maxLength={15}
                  onChange={handleChange}
                  placeholder="(99) 99999-9999"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                {...register('workingDescription')}
                placeholder="Descreva o horário e local de atendimento"
                rows={3}
                className="w-full resize-none rounded border border-gray-300 p-2 text-sm"
              />
              {errors.workingDescription && (
                <p className="text-sm text-red-500">{errors.workingDescription.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded bg-primargreen px-4 py-2 font-semibold text-white transition"
              >
                Cadastrar Táxi
              </button>
            </div>
          </form>
        </article>
      </div>

      <div className="mt-4 grid min-h-[80vh] w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10 overflow-y-auto">
        {taxisToShow.map((taxi) => (
          <CardTaxi
            key={taxi.id}
            id={taxi.id}
            name={taxi.name}
            photoURLs={taxi.photoURLs}
            phone={taxi.phone}
            onDelete={() => handleDeleteTaxi(taxi.id)}
            workingDescription={taxi.workingDescription}
          />
        ))}
      </div>
    </section>
  )
}
