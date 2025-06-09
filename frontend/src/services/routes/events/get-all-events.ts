import { api } from '@/config/axios'

export const getAllEvents = async () => {
  try {
    const response = await api.get('/events')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return null
  }
}
