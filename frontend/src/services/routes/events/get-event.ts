import { api } from '@/config/axios'

export const getEvent = async (id: string) => {
  try {
    const response = await api.get(`/event/${id}`)
    console.log('Resposta da API', response.data)
    return response
  } catch (error) {
    console.log('Falha ao pegar', error)
  }
}
