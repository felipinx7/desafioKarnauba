import { api } from '@/config/axios'

export const DeletePlace = async (id: string) => {
  try {
    const { data } = await api.delete(`/place/delete/${id}`)
    console.log('Dados da API', data)
    return data
    return data
  } catch (error) {
    console.log(error)
  }
}
