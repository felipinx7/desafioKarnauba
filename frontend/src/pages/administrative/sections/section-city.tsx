'use client'

import { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/header-info-adm'
import { getInfoCity } from '@/services/routes/city/get-info-city'
import { updateCity } from '@/services/routes/city/update-city'
import { DataInfoCityDTO } from '@/dto/city/data-info-city-DTO'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { backgroundloginpage } from '@/assets/image'
import { updateCityImage } from '@/services/routes/city/update-city-image'
import Image from 'next/image'

export const SectionCity = () => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [photourl, setPhotoUrl] = useState<string | null>()
  const [infoCity, setInfoCity] = useState<DataInfoCityDTO | null>(null)
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    instagram: '',
    adminId: '',
  })
  // Revogar URL local para liberar memória
  useEffect(() => {
    return () => {
      if (bannerPreview && bannerPreview.startsWith('blob:')) {
        URL.revokeObjectURL(bannerPreview)
      }
    }
  }, [bannerPreview])

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Revoke preview anterior para não vazar memória
      if (bannerPreview && bannerPreview.startsWith('blob:')) {
        URL.revokeObjectURL(bannerPreview)
      }
      const previewURL = URL.createObjectURL(file)
      setBannerPreview(previewURL)
      setBannerFile(file)
    }
  }

  const fetchCityInfo = async () => {
    const city = await getInfoCity()
    setInfoCity(city)
    setForm({
      name: city.name,
      location: city.location,
      description: city.description,
      instagram: city.instagram ?? '',
      adminId: city.adminId,
    })

    const firstPhotoUrl = city.photos && city.photos.length > 0 ? city.photos[0].url : ''
    const photoURL = baseUrlPhoto('city', firstPhotoUrl)
    setPhotoUrl(photoURL)

    if (firstPhotoUrl) {
      setBannerPreview(photoURL)
      setBannerFile(null) // Limpa o arquivo local, pois usamos URL remota
    } else {
      setBannerPreview(null)
      setBannerFile(null)
    }
  }

  useEffect(() => {
    fetchCityInfo()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!infoCity) return

    const updatedFields = new FormData()

    if (form.name !== infoCity.name) updatedFields.append('name', form.name)
    if (form.location !== infoCity.location) updatedFields.append('location', form.location)
    if (form.description !== infoCity.description)
      updatedFields.append('description', form.description)
    if (form.instagram !== (infoCity.instagram ?? ''))
      updatedFields.append('instagram', form.instagram)
    if (bannerFile) updatedFields.append('photo', bannerFile)

    if ([...updatedFields.keys()].length === 0) {
      alert('Nenhuma alteração detectada.')
      return
    }

    try {
      await updateCity(updatedFields)
      await updateCityImage(infoCity?.photos[0].id, bannerFile)
      alert('Cidade atualizada com sucesso!')

      // Atualiza o estado e o preview com os dados novos do servidor
      await fetchCityInfo()
    } catch (error) {
      alert('Erro ao atualizar a cidade.', error)
    }
  }

  return (
    <section className="flex w-full flex-col justify-center gap-6 px-4 py-6 max-lg:w-full">
      <div className="max-lg:hidden">
        <NameAdminstrative />
      </div>

      <form onSubmit={onSubmit}>
        {/* Banner */}
        <div className="relative max-h-[300px] w-full overflow-hidden rounded-xl border">
          <Image
            src={photourl ? photourl : backgroundloginpage}
            width={200}
            height={200}
            alt="Banner da cidade"
            className="h-full w-full object-cover"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Clique no banner para alterar</p>

        {/* Campos */}
        <div className="mt-4 flex justify-between gap-6 max-md:flex-col">
          {/* ... campos do formulário ... */}
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-[1.2rem] font-medium text-primargreen">Nome da cidade</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded border border-gray-300 p-2 text-primargreen"
                placeholder="Ex: Arraial"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[1.2rem] font-medium text-primargreen">Instagram</label>
              <input
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="rounded border border-gray-300 p-2 text-primargreen"
                placeholder="@arraial"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[1.2rem] font-medium text-primargreen">Localização</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="rounded border border-gray-300 p-2 text-primargreen"
                placeholder="Ex: Rua Central, 123"
              />
            </div>
          </div>

          <div className="mt-2 flex w-full flex-col">
            <label className="text-[1.2rem] font-medium text-primargreen">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-[120px] resize-none rounded border border-gray-300 p-4 text-primargreen"
              placeholder="Descreva aqui sua cidade..."
            />
          </div>
        </div>

        <div className="mt-5 flex w-full items-center justify-center">
          <button
            type="submit"
            className="w-[50%] rounded-[5.97px] bg-primargreen p-3 text-[1.1rem] font-[700] text-white max-md:w-full"
          >
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </form>
    </section>
  )
}
