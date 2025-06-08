import { api } from '@/config/axios'

export const getAllPlaces = async () => {
  try {
    const response = await api.get('/places')
    console.log('Resposta da API', response.data)
    return response.data
  } catch (error) {
    console.log('Error ao Pegar todas os Lugares', error)
  }
}
