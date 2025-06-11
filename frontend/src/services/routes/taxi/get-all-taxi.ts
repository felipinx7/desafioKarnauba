import { api } from '@/config/axios'

export const GetAllTaxi = async () => {
  try {
    const response = await api.get(`/taxi-drivers`)
    console.log('Sucesso ao pegar todos os taxistas', response)
    return response
  } catch (error) {
    console.log('Erro ao pegar os taxista', error)
  }
}
