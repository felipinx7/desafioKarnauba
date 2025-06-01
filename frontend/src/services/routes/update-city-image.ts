import { api } from "@/config/axios"

export const updateCityImage = async (id: string, file: File) => {
  try {
    const formData = new FormData()
    formData.append('photo', file)

    const response = await api.put(`/city/update/photo/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log("Imagem atualizada com sucesso!", response.data)
    return response.data
  } catch (error) {
    console.log("Falha ao enviar a imagem", error)
    throw error
  }
}
