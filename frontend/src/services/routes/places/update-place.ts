import { api } from '@/config/axios'

export const updatePlace = async (id: string, data: any) => {
  try {
    const formData = new FormData()

    for (const key in data) {
      if (key === 'photoURLs' && data[key]) {
        data[key].forEach((file: File) => {
          formData.append('photoURLs', file)
        })
      } else {
        formData.append(key, data[key])
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
