'use client'

import { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/name-adm'
import { getInfoCity } from '@/services/routes/getInfoCity'

export const SectionCity = () => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [infoCity, setInfoCity] = useState<DataInfoCityDTO | null>(null)
  const [form, setForm] = useState({
    name: '',
    location: '',
    photoURLs: [],
    description: '',
    instagram: '',
    adminId: '',
  })

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewURL = URL.createObjectURL(file)
      setBannerPreview(previewURL)
      // Update form whit new photo
      setForm((prev) => ({ ...prev, photoURL: previewURL }))
    }
  }

  useEffect(() => {
    const fecthCityInfo = async () => {
      const city = await getInfoCity()
      setInfoCity(city)
      setForm({
        name: city.name,
        location: city.location,
        photoURLs: city.photoURL,
        description: city.description,
        instagram: city.instagram ?? '',
        adminId: city.adminId,
      })
    }
    fecthCityInfo()
  }, [])

  return (
    <section className="flex w-full flex-col justify-center gap-6 px-4 py-6 max-lg:w-full">
      <div className="max-lg:hidden">
        <NameAdminstrative />
      </div>

      <form action="">
        {/* Banner */}
        <div className="relative max-h-[300px] w-full overflow-hidden rounded-xl border">
          {bannerPreview || infoCity?.photoURL ? (
            <img
              src={(bannerPreview || infoCity?.photoURL) ?? undefined}
              alt="Banner da cidade"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              Sem imagem disponível
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
            title=""
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Clique no banner para alterar</p>

        {/* Form */}
        <div className="mt-4 flex justify-between gap-6 max-md:flex-col">
          <div className="flex w-full flex-col gap-4">
            {/* Name */}
            <div className="flex w-full flex-col">
              <label htmlFor="city" className="text-[1.2rem] font-medium text-primargreen">
                Nome da cidade
              </label>
              <input
                id="city"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                placeholder="Ex: Arraial - City"
                className="focus:ring-primarygreen rounded border border-gray-300 p-2 text-primargreen focus:outline-none focus:ring-2"
              />
            </div>

            {/* Instagram */}
            <div className="flex w-full flex-col">
              <label htmlFor="instagram" className="text-[1.2rem] font-medium text-primargreen">
                Instagram
              </label>
              <input
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                id="instagram"
                type="text"
                placeholder="@arraialcity"
                className="focus:ring-primarygreen rounded border border-gray-300 p-2 text-primargreen focus:outline-none focus:ring-2"
              />
            </div>

            {/* Location */}
            <div className="flex w-full flex-col">
              <label htmlFor="location" className="text-[1.2rem] font-medium text-primargreen">
                Localização
              </label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                id="location"
                type="text"
                placeholder="Ex: Rua Central, 123 - Cidade, CE"
                className="focus:ring-primarygreen rounded border border-gray-300 p-2 text-primargreen focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Descprition */}
          <div className="mt-2 flex w-full flex-col">
            <label htmlFor="description" className="text-[1.2rem] font-medium text-primargreen">
              Descrição
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="focus:ring-primarygreen min-h-[120px] resize-none rounded border border-gray-300 p-4 text-primargreen focus:outline-none focus:ring-2"
              placeholder="Descreva aqui sua cidade..."
            />
          </div>
        </div>

        {/* Botão */}
        <div className="mt-5 flex w-full items-center justify-center">
          <button className="w-[50%] rounded-[5.97px] bg-primargreen p-3 text-[1.1rem] font-[700] text-white max-md:w-full">
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </form>
    </section>
  )
}
