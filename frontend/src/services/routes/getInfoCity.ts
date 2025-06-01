import { api } from '@/config/axios'

export const getInfoCity = async () => {
  try {
    const { data } = await api.get('/city')
    const city = data
    console.log('dados da API', city)
    return city
  } catch (error) {
    console.log('Error', error)
  }
}
