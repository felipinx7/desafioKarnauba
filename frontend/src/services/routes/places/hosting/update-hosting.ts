import { api } from '@/config/axios'
import { HostingDTO } from '@/dto/places/data-places-DTO'

export const updateHosting = async (id: string, data: HostingDTO) => {
  try {
    const formData = new FormData()

    for (const key in data) {
      const typedKey = key as keyof HostingDTO

      if (typedKey === 'photoURLs' && data[typedKey]) {
        (data[typedKey] as File[]).forEach((file: File) => {
          formData.append('photoURLs', file)
        })
      } else {
        const value = data[typedKey]

        if (value !== undefined && value !== null) {
          const stringValue =
            typeof value === 'object' ? JSON.stringify(value) : String(value)

          formData.append(typedKey, stringValue)
        }
      }
    }

    const response = await api.put(`/place/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Local Atualizado com sucesso!', response.data)
    return response.data
  } catch (error) {
    console.log('Falha ao Atualizar', error)
  }
}
