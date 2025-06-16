import { api } from '@/config/axios'
import { dataEventDTO } from '@/dto/event/data-create-event-DTO'

export const createEvent = async (data: dataEventDTO) => {
  try {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof dataEventDTO]

      if (key === 'photoURLs' && Array.isArray(value)) {
        for (const file of value) {
          formData.append('photoURLs', file)
        }
        continue
      }

      if (value instanceof Date) {
        formData.append(key, value.toISOString())
      } else if (typeof value === 'boolean') {
        formData.append(key, String(value))
      } else if (value != null) {
        formData.append(key, String(value))
      }
    }

    const response = await api.post('/event/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    console.log('Resposta da API:', response.data.admin)
    return response
  }catch (error) {
    console.log("Falha ao Criar", error);
    
  }
}
