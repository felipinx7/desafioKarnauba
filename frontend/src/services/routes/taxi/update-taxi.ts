import { api } from '@/config/axios'

export const updateTaxi = async (id: string) => {
  try {
    const response = await api.put(`/taxi-driver/${id}`)
    return response
  } catch (error) {
    console.log('Falha ao Atualizar o Taxista', error)
  }
}
